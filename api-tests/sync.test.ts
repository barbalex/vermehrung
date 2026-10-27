import { beforeAll, describe, expect, it } from 'vitest'

import {
  type Json,
  APP_ROLES,
  assertBackendAvailable,
  getTestPerson,
  getTestPersons,
  hasura,
  mintToken,
  pgrst,
} from './helpers.js'

// The sync endpoint must return, per role:
// - exactly the rows the role may see (same as a direct table request)
// - the same field values Hasura delivered (the local-first store
//   consumes them verbatim)
// - no gaertner-excluded herkunft columns

describe('sync rpc', () => {
  beforeAll(async () => {
    await assertBackendAvailable()
  })

  it('returns the same rows as direct table requests, for every role', async () => {
    for (const role of APP_ROLES) {
      const person = await getTestPerson(role)
      const token = mintToken(role, person.id)
      const syncRes = await pgrst('/rpc/sync', {
        method: 'POST',
        token,
        body: { p_since: { herkunft: 0, garten: 0, person: 0, kultur: 0 } },
      })
      expect(syncRes.status, `${role} sync status`).toBe(200)
      for (const table of ['herkunft', 'garten', 'person', 'kultur']) {
        const directRes = await pgrst(`/${table}?select=id&limit=100000`, {
          token,
        })
        const syncIds = (syncRes.data[table] as Json[]).map((r) => r.id).sort()
        const directIds = (directRes.data as Json[]).map((r) => r.id).sort()
        expect(
          syncIds,
          `${table} as ${role} (${person.id}): sync vs direct`,
        ).toEqual(directIds)
      }
    }
  })

  it('returns deltas only: an old cursor returns rows, a future one none', async () => {
    const person = await getTestPerson('manager')
    const token = mintToken('manager', person.id)
    const full = await pgrst('/rpc/sync', {
      method: 'POST',
      token,
      body: { p_since: { user_role: 0 } },
    })
    expect(full.status).toBe(200)
    expect((full.data.user_role as Json[]).length).toBeGreaterThan(0)

    const future = await pgrst('/rpc/sync', {
      method: 'POST',
      token,
      body: { p_since: { user_role: 9999999999 } },
    })
    expect(future.status).toBe(200)
    expect(future.data.user_role).toEqual([])

    // synced_at is the server-side watermark the client continues from
    expect(typeof full.data.synced_at).toBe('number')
    expect(Math.abs(Date.now() / 1000 - full.data.synced_at)).toBeLessThan(120)
  })

  it('delivers the same herkunft field values as Hasura did', async () => {
    const person = await getTestPerson('manager')
    const token = mintToken('manager', person.id)

    const hasuraRes = await hasura(
      `query {
        herkunft(where: {geom_point: {_is_null: false}}, limit: 3) {
          id nr lokalname gemeinde kanton land bemerkungen geom_point lv95_x
          lv95_y wgs84_lat wgs84_long changed changed_by _rev _parent_rev
          _revisions _depth _conflicts _deleted
        }
      }`,
      { role: 'manager', userId: person.id },
    )
    expect(hasuraRes.errors).toBeUndefined()
    const hasuraRows: Json[] = hasuraRes.data.herkunft

    const syncRes = await pgrst('/rpc/sync', {
      method: 'POST',
      token,
      body: { p_since: { herkunft: 0 } },
    })
    const byId = new Map(
      (syncRes.data.herkunft as Json[]).map((r: Json) => [r.id, r]),
    )
    expect(hasuraRows.length).toBeGreaterThan(0)
    for (const hasuraRow of hasuraRows) {
      const syncRow = byId.get(hasuraRow.id)
      expect(syncRow, `herkunft ${hasuraRow.id} present in sync`).toBeTruthy()
      // field-by-field so a diff names the drifting field
      for (const [field, value] of Object.entries(hasuraRow)) {
        expect(syncRow[field], `herkunft.${field}`).toEqual(value)
      }
    }
  })

  it('never delivers ort fields of herkunft to gaertner', async () => {
    const persons = await getTestPersons()
    const gaertners = persons.filter((p) => p.role === 'gaertner')
    expect(gaertners.length).toBeGreaterThan(0)
    for (const person of gaertners) {
      const token = mintToken('gaertner', person.id)
      const res = await pgrst('/rpc/sync', {
        method: 'POST',
        token,
        body: { p_since: { herkunft: 0 } },
      })
      expect(res.status).toBe(200)
      for (const row of res.data.herkunft as Json[]) {
        expect(
          Object.keys(row),
          `gaertner must not receive herkunft.ort fields`,
        ).not.toContain('lokalname')
        expect(Object.keys(row)).not.toContain('geom_point')
        expect(Object.keys(row)).not.toContain('lv95_x')
        expect(Object.keys(row)).not.toContain('lv95_y')
        expect(Object.keys(row)).not.toContain('wgs84_lat')
        expect(Object.keys(row)).not.toContain('wgs84_long')
      }
    }
  })
})
