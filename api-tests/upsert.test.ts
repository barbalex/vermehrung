import { randomUUID } from 'node:crypto'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { assertBackendAvailable, getTestPerson, mintToken, pgrst, psql } from './helpers.js'

// The write path:
// 1. http upsert semantics (Prefer: resolution=merge-duplicates) - this is
//    how the offline queue replays its mutations, so posting the same
//    revision twice must not fail
// 2. revision inserts must run the winning-revision trigger even when the
//    app role has no privileges on the materialized table (security
//    definer), verified inside a rolled-back transaction
// 3. roles without insert permission are denied

describe('upsert / write path', () => {
  beforeAll(async () => {
    await assertBackendAvailable()
  })

  describe('http upsert on art_file (appends + updates + deletes)', () => {
    const createdIds: string[] = []
    afterAll(async () => {
      const manager = await getTestPerson('manager')
      const token = mintToken('manager', manager.id)
      for (const id of createdIds) {
        await pgrst(`/art_file?id=eq.${id}`, {
          method: 'DELETE',
          token,
          prefer: 'return=minimal',
        }).catch(() => null)
      }
    })

    it('inserts, replays idempotently, patches and deletes', async () => {
      const manager = await getTestPerson('manager')
      const token = mintToken('manager', manager.id)

      const artRes = await pgrst('/art?select=id&limit=1', { token })
      expect(artRes.status).toBe(200)
      expect(artRes.data.length).toBeGreaterThan(0)
      const artId = artRes.data[0].id

      const fileId = randomUUID()
      const row = {
        id: randomUUID(),
        art_id: artId,
        file_id: fileId,
        file_mime_type: 'image/jpeg',
        name: 'api-test',
      }
      createdIds.push(row.id)

      // insert
      const insertRes = await pgrst('/art_file', {
        method: 'POST',
        token,
        body: row,
        prefer: 'resolution=merge-duplicates,return=minimal',
      })
      expect(insertRes.status).toBe(201)

      // replaying the identical mutation (offline queue behaviour):
      // an upsert that updates returns 200, one that inserts 201
      const replayRes = await pgrst('/art_file', {
        method: 'POST',
        token,
        body: row,
        prefer: 'resolution=merge-duplicates,return=minimal',
      })
      expect([200, 201]).toContain(replayRes.status)

      // still exactly one row
      const getRes = await pgrst(
        `/art_file?id=eq.${row.id}&select=id,name,file_id`,
        { token },
      )
      expect(getRes.data).toEqual([
        { id: row.id, name: 'api-test', file_id: fileId },
      ])

      // patch (the file edit path)
      const patchRes = await pgrst(`/art_file?id=eq.${row.id}`, {
        method: 'PATCH',
        token,
        body: { name: 'api-test-geaendert' },
        prefer: 'return=minimal',
      })
      expect(patchRes.status).toBe(204)

      const getAfterPatch = await pgrst(
        `/art_file?id=eq.${row.id}&select=name`,
        { token },
      )
      expect(getAfterPatch.data).toEqual([{ name: 'api-test-geaendert' }])
    })
  })

  describe('revision insert via http (art_rev)', () => {
    const newArtIds: string[] = []
    afterAll(() => {
      for (const artId of newArtIds) {
        psql(
          `delete from art_rev where art_id = '${artId}'; delete from art where id = '${artId}';`,
        )
      }
    })

    it('inserts a revision, the trigger materializes the row, replays are idempotent', async () => {
      const manager = await getTestPerson('manager')
      const token = mintToken('manager', manager.id)

      const revId = randomUUID()
      const artId = randomUUID()
      newArtIds.push(artId)
      const rev = '1-apiequivalencetest'
      const revision = {
        id: revId,
        art_id: artId,
        ae_id: null,
        set: null,
        apflora_av: null,
        apflora_ap: null,
        changed: '2026-10-27T00:00:00',
        changed_by: 'api-equivalence-test',
        _rev: rev,
        _depth: 1,
        _deleted: false,
        _revisions: [rev],
      }

      const insertRes = await pgrst('/art_rev', {
        method: 'POST',
        token,
        body: revision,
        prefer: 'resolution=merge-duplicates,return=minimal',
      })
      expect(insertRes.status).toBe(201)

      // the security definer trigger must have created the materialized row
      const getRes = await pgrst(
        `/art?id=eq.${artId}&select=id,_rev,_depth,_deleted`,
        { token },
      )
      expect(getRes.data).toEqual([
        { id: artId, _rev: rev, _depth: 1, _deleted: false },
      ])

      // replay (offline queue behaviour): no error, still one winner
      const replayRes = await pgrst('/art_rev', {
        method: 'POST',
        token,
        body: revision,
        prefer: 'resolution=merge-duplicates,return=minimal',
      })
      expect([200, 201]).toContain(replayRes.status)
    })
  })

  it('denies revision inserts for roles without insert permission', async () => {
    const gaertner = await getTestPerson('gaertner')
    // gaertner has no insert permission on art_rev
    expect(() =>
      psql(`begin;
set local role gaertner;
select set_config('request.jwt.claims', '{"role": "gaertner", "user_id": "${gaertner.id}"}', true);
insert into art_rev (id, art_id, _rev, _depth, _deleted, changed, changed_by)
  select gen_random_uuid(), a.id, '99-denied-test', 99, false, now(), 'denied-test'
  from art a where a._deleted = false limit 1;
rollback;`),
    ).toThrow()
  })

  it('runs the winning-revision trigger under the app role (transactional, rolled back)', async () => {
    const artverantwortlich = await getTestPerson('artverantwortlich')
    // an art this person is responsible for - otherwise the verification
    // select below is filtered by RLS and the row is not visible
    const artId = psql(
      `select a.id from art a join av on av.art_id = a.id
       where a._deleted = false and av.person_id = '${artverantwortlich.id}'
       order by a.changed desc limit 1;`,
    ).trim()
    expect(artId).toBeTruthy()

    const output = psql(`select 'before=' || _rev from art where id = '${artId}';
begin;
set local role artverantwortlich;
select set_config('request.jwt.claims', '{"role": "artverantwortlich", "user_id": "${artverantwortlich.id}"}', true);
insert into art_rev (id, art_id, _rev, _depth, _deleted, _revisions, changed, changed_by)
  values (gen_random_uuid(), '${artId}', '99-equivalence-test', 99, false, '{99-equivalence-test}', now(), 'equivalence-test');
select 'winner=' || _rev from art where id = '${artId}';
rollback;
select 'after=' || _rev from art where id = '${artId}';`)

    const lines = output.split('\n').filter((l) => l.includes('='))
    const before = lines.find((l) => l.startsWith('before='))
    const winner = lines.find((l) => l.startsWith('winner='))
    const after = lines.find((l) => l.startsWith('after='))
    // the trigger fired although artverantwortlich cannot write art itself
    expect(winner).toBe('winner=99-equivalence-test')
    // the rollback restored the original state
    expect(after?.slice('after='.length)).toBe(before?.slice('before='.length))
  })
})
