import { beforeAll, describe, expect, it } from 'vitest'

import {
  type Json,
  APP_ROLES,
  assertBackendAvailable,
  getTestPerson,
  getTestPersons,
  mintToken,
  pgrst,
} from './helpers.js'

// The sync endpoint must return, per role:
// - exactly the rows the role may see (same as a direct table request)
// - geodata as GeoJSON with a crs member (the local-first store consumes
//   it verbatim; st_asgeojson would truncate the coordinates)
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

  it('delivers herkunft geodata as GeoJSON with the full field set', async () => {
    const person = await getTestPerson('manager')
    const token = mintToken('manager', person.id)

    const syncRes = await pgrst('/rpc/sync', {
      method: 'POST',
      token,
      body: { p_since: { herkunft: 0 } },
    })
    expect(syncRes.status).toBe(200)
    const rows = syncRes.data.herkunft as Json[]
    const withGeom = rows.filter((r) => r.geom_point)
    expect(withGeom.length).toBeGreaterThan(0)
    // the field set the client's watermelon schema consumes
    const expectedFields = [
      'id',
      'nr',
      'lokalname',
      'gemeinde',
      'kanton',
      'land',
      'bemerkungen',
      'geom_point',
      'lv95_x',
      'lv95_y',
      'wgs84_lat',
      'wgs84_long',
      'changed',
      'changed_by',
      '_rev',
      '_parent_rev',
      '_revisions',
      '_depth',
      '_conflicts',
      '_deleted',
    ]
    for (const row of withGeom.slice(0, 20)) {
      expect(
        Object.keys(row),
        `herkunft ${row.id} field set`,
      ).toEqual(expect.arrayContaining(expectedFields))
      const geom = row.geom_point
      // GeoJSON point with the crs member the app writes and reads back
      expect(geom.type).toBe('Point')
      expect(Array.isArray(geom.coordinates)).toBe(true)
      expect(geom.coordinates).toHaveLength(2)
      expect(geom.crs).toBeDefined()
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
