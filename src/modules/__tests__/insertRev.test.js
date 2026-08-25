import { beforeEach, describe, expect, it } from 'vitest'

import {
  store,
  dbAtom,
  userAtom,
  activeNodeArrayAtom,
  queuedQueriesAtom,
  queueSizeAtom,
} from '../../store/index.js'
import { insertRev } from '../insertRev.js'

// Characterization tests: they lock in the exact revision objects
// insertRev builds per table. Field ORDER matters - the revision hash
// (md5 over the JSON) depends on it, and if it drifts, identical edits
// from different app versions create revision conflicts instead of
// bouncing off the server's unique constraint.

const tail = ['changed', 'changed_by', '_depth', '_parent_rev', '_deleted']

// fields as declared in insertRev's configs, id field first -
// this is the order the original per-table MST actions used
const expectedFields = {
  art: ['art_id', 'ae_id', 'set', 'apflora_av', 'apflora_ap'],
  av: ['av_id', 'art_id', 'person_id'],
  event: [
    'event_id',
    'kultur_id',
    'teilkultur_id',
    'person_id',
    'beschreibung',
    'geplant',
    'datum',
  ],
  garten: [
    'garten_id',
    'name',
    'person_id',
    'strasse',
    'plz',
    'ort',
    'geom_point',
    'aktiv',
    'bemerkungen',
  ],
  gv: ['gv_id', 'garten_id', 'person_id'],
  herkunft: [
    'herkunft_id',
    'nr',
    'lokalname',
    'gemeinde',
    'kanton',
    'land',
    'geom_point',
    'bemerkungen',
  ],
  kultur: [
    'kultur_id',
    'art_id',
    'herkunft_id',
    'garten_id',
    'zwischenlager',
    'erhaltungskultur',
    'von_anzahl_individuen',
    'bemerkungen',
    'aktiv',
  ],
  lieferung: [
    'lieferung_id',
    'sammel_lieferung_id',
    'art_id',
    'person_id',
    'von_sammlung_id',
    'von_kultur_id',
    'datum',
    'nach_kultur_id',
    'nach_ausgepflanzt',
    'von_anzahl_individuen',
    'anzahl_pflanzen',
    'anzahl_auspflanzbereit',
    'gramm_samen',
    'andere_menge',
    'geplant',
    'bemerkungen',
  ],
  person: [
    'person_id',
    'nr',
    'vorname',
    'name',
    'adresszusatz',
    'strasse',
    'plz',
    'ort',
    'telefon_privat',
    'telefon_geschaeft',
    'telefon_mobile',
    'email',
    'kein_email',
    'bemerkungen',
    'account_id',
    'user_role_id',
    'kommerziell',
    'info',
    'aktiv',
  ],
  sammel_lieferung: [
    'sammel_lieferung_id',
    'art_id',
    'person_id',
    'von_sammlung_id',
    'von_kultur_id',
    'datum',
    'nach_kultur_id',
    'nach_ausgepflanzt',
    'von_anzahl_individuen',
    'anzahl_pflanzen',
    'anzahl_auspflanzbereit',
    'gramm_samen',
    'andere_menge',
    'geplant',
    'bemerkungen',
  ],
  sammlung: [
    'sammlung_id',
    'art_id',
    'person_id',
    'herkunft_id',
    'nr',
    'datum',
    'von_anzahl_individuen',
    'anzahl_pflanzen',
    'gramm_samen',
    'andere_menge',
    'geom_point',
    'geplant',
    'bemerkungen',
  ],
  teilkultur: [
    'teilkultur_id',
    'kultur_id',
    'name',
    'ort1',
    'ort2',
    'ort3',
    'bemerkungen',
  ],
  teilzaehlung: [
    'teilzaehlung_id',
    'zaehlung_id',
    'teilkultur_id',
    'anzahl_pflanzen',
    'anzahl_auspflanzbereit',
    'anzahl_mutterpflanzen',
    'andere_menge',
    'auspflanzbereit_beschreibung',
    'bemerkungen',
    'prognose_von_tz',
  ],
  zaehlung: ['zaehlung_id', 'kultur_id', 'datum', 'prognose', 'bemerkungen'],
}

const idFields = Object.fromEntries(
  Object.entries(expectedFields).map(([table, fields]) => [table, fields[0]]),
)

const createDbMock = () => {
  const batched = []
  return {
    batched,
    write: async (fn) => fn(),
    get: (table) => ({
      prepareCreateFromDirtyRaw: (raw) => ({ table, raw }),
    }),
    batch: async (creates) => {
      batched.push(...creates)
    },
  }
}

const flushTimers = () => new Promise((resolve) => setTimeout(resolve, 0))

let dbMock

beforeEach(() => {
  dbMock = createDbMock()
  store.set(dbAtom, dbMock)
  store.set(userAtom, { uid: 'test-uid', email: 'test@example.com' })
  store.set(queuedQueriesAtom, [])
  store.set(queueSizeAtom, 0)
  store.set(activeNodeArrayAtom, ['Arten'])
})

describe('insertRev', () => {
  it.each(Object.keys(expectedFields))(
    '%s: queues a correctly shaped revision',
    async (table) => {
      await insertRev(table)
      expect(store.get(queuedQueriesAtom)).toHaveLength(1)
      const query = store.get(queuedQueriesAtom)[0]
      const idField = idFields[table]

      expect(query.name).toBe(`mutateInsert_${table}_rev_one`)
      expect(query.revertTable).toBe(table)
      expect(query.revertField).toBe('_deleted')
      expect(query.revertValue).toBe(true)
      expect(query.revertId).toEqual(expect.any(String))
      // matches the former MST actions: sammlung never set isInsert
      expect(query.isInsert).toBe(table === 'sammlung' ? false : true)

      const { object, on_conflict } = JSON.parse(query.variables)
      expect(on_conflict.constraint).toBe(`${table}_rev_pkey`)
      expect(on_conflict.update_columns).toEqual(['id'])

      // field order: JSON.stringify drops undefined values (as did the
      // former MST actions), so only keys with values are present:
      // id field, fixed defaults, the filled tail - the hash only ever
      // saw those
      const fixedDefaults = {
        garten: ['aktiv'],
        kultur: ['aktiv'],
        person: ['aktiv'],
      }
      expect(Object.keys(object)).toEqual([
        idField,
        ...(fixedDefaults[table] ?? []),
        'changed',
        'changed_by',
        '_depth',
        '_deleted',
        '_rev',
        'id',
        '_revisions',
      ])

      // revision structure
      expect(object[idField]).toBe(query.revertId)
      expect(object._depth).toBe(1)
      expect(object._deleted).toBe(false)
      expect(object._parent_rev).toBeUndefined()
      expect(object.changed_by).toBe('test@example.com')
      expect(object._rev).toMatch(/^1-[0-9a-f]{32}$/)
      expect(object._revisions).toBe(`{"${object._rev}"}`)

      // the local store object: id moved from <table>_id, real revisions array
      // kultur and person additionally create their option row
      const extraRows = { kultur: 1, person: 1 }
      expect(dbMock.batched).toHaveLength(1 + (extraRows[table] ?? 0))
      const { table: createdTable, raw } = dbMock.batched[0]
      expect(createdTable).toBe(table)
      expect(raw.id).toBe(query.revertId)
      expect(raw).not.toHaveProperty(idField)
      expect(raw._revisions).toEqual(JSON.stringify([object._rev]))
    },
  )

  it('kultur and person additionally create their option row', async () => {
    await insertRev('kultur')
    expect(dbMock.batched.map((c) => c.table)).toEqual([
      'kultur',
      'kultur_option',
    ])
    expect(dbMock.batched[1].raw).toEqual({
      id: dbMock.batched[1].raw.id,
    })

    dbMock.batched.length = 0
    await insertRev('person')
    expect(dbMock.batched.map((c) => c.table)).toEqual([
      'person',
      'person_option',
    ])
  })

  it('fixed defaults are set as in the former actions', async () => {
    await insertRev('garten')
    const garten = dbMock.batched[0].raw
    expect(garten.aktiv).toBe(true)
    expect(garten.name).toBeUndefined()

    await insertRev('kultur')
    expect(dbMock.batched[0].raw.aktiv).toBe(true)

    await insertRev('person')
    expect(dbMock.batched[0].raw.aktiv).toBe(true)
  })

  it('passed values override defaults but keep their field position', async () => {
    await insertRev('garten', { values: { name: 'Testgarten' } })
    const object = JSON.parse(store.get(queuedQueriesAtom)[0].variables).object
    expect(object.name).toBe('Testgarten')
    // name keeps its declared position (second field)
    expect(Object.keys(object)[1]).toBe('name')
  })

  it('with all fields set, the full declared order is preserved', async () => {
    // this pins the order the md5 revision hash is computed over:
    // declared fields first, then the fixed tail
    await insertRev('art', {
      values: {
        ae_id: 'ae-1',
        set: 'set-1',
        apflora_av: 'av-1',
        apflora_ap: true,
      },
    })
    const object = JSON.parse(store.get(queuedQueriesAtom)[0].variables).object
    expect(Object.keys(object)).toEqual([
      'art_id',
      'ae_id',
      'set',
      'apflora_av',
      'apflora_ap',
      'changed',
      'changed_by',
      '_depth',
      '_deleted',
      '_rev',
      'id',
      '_revisions',
    ])
  })

  it('navigates to the new row for navigating tables', async () => {
    await insertRev('art')
    await flushTimers()
    const activeNodeArray = store.get(activeNodeArrayAtom)
    const newId = store.get(queuedQueriesAtom)[0].revertId
    expect(activeNodeArray.at(-1)).toBe(newId)
    expect(activeNodeArray).toEqual(['Arten', newId])
  })

  it('replaces a trailing uuid instead of appending', async () => {
    // a real uuid v1 - isUuid.v1 checks the format
    const existingId = '30a4d580-a09b-11f1-84f4-b56867089bcb'
    store.set(activeNodeArrayAtom, ['Arten', existingId])
    await insertRev('art')
    await flushTimers()
    const activeNodeArray = store.get(activeNodeArrayAtom)
    const newId = store.get(queuedQueriesAtom)[0].revertId
    expect(activeNodeArray).toEqual(['Arten', newId])
  })

  it('does not navigate for non-navigating tables', async () => {
    await insertRev('av')
    await insertRev('gv')
    await insertRev('teilzaehlung')
    await flushTimers()
    expect(store.get(activeNodeArrayAtom)).toEqual(['Arten'])
  })

  it('respects noNavigate args', async () => {
    await insertRev('kultur', { nonavigate: true })
    await insertRev('teilkultur', { noNavigateInTree: true })
    await flushTimers()
    expect(store.get(activeNodeArrayAtom)).toEqual(['Arten'])
  })

  it('throws for unknown tables', async () => {
    await expect(insertRev('nope')).rejects.toThrow('unknown table')
  })
})
