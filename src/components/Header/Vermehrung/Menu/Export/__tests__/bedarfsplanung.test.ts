import { Database } from 'nitromelondb'
import LokiJSAdapter from 'nitromelondb/adapters/lokijs'
import { expect, it } from 'vitest'
import type { Sheet } from 'write-excel-file/browser'

import {
  Bedarf,
  Garten,
  Kultur,
  Lieferung,
  Teilzaehlung,
  Zaehlung,
} from '../../../../../../dbModel.ts'
import { schema } from '../../../../../../dbSchema/schema.ts'
import { dbAtom, store } from '../../../../../../store/index.ts'
import { buildSheetsForKulturBedarfsplanung } from '../buildSheetsForKulturBedarfsplanung.ts'

it('exports the newest actual outgoing delivery even when only Andere Mengen was recorded', async () => {
  const db = new Database({
    adapter: new LokiJSAdapter({
      schema,
      useWebWorker: false,
      useIncrementalIndexedDB: false,
    }),
    modelClasses: [Bedarf, Garten, Kultur, Lieferung, Teilzaehlung, Zaehlung],
  })
  await db.write(async () => {
    const delivery = (fields: Partial<Lieferung>) =>
      db.get('lieferung').prepareCreateFromDirtyRaw({
        von_kultur_id: 'k',
        datum: '2026-11-01',
        geplant: false,
        _deleted: false,
        ...fields,
      })
    await db.batch(
      db
        .get('garten')
        .prepareCreateFromDirtyRaw({ id: 'g', aktiv: true, _deleted: false }),
      db.get('kultur').prepareCreateFromDirtyRaw({
        id: 'k',
        garten_id: 'g',
        aktiv: true,
        _deleted: false,
      }),
      delivery({ datum: '2026-04-01', andere_menge: '3 Töpfe' }),
      delivery({ datum: '2025-08-01', anzahl_pflanzen: 12 }),
      delivery({ geplant: true, anzahl_pflanzen: 20 }),
      delivery({ _deleted: true, anzahl_pflanzen: 4 }),
      delivery({
        von_kultur_id: null,
        nach_kultur_id: 'k',
        anzahl_pflanzen: 8,
      }),
    )
  })
  const previousDb = store.get(dbAtom)
  const sheets: Sheet<Blob>[] = []
  try {
    store.set(dbAtom, db)
    await buildSheetsForKulturBedarfsplanung({ sheets })
  } finally {
    store.set(dbAtom, previousDb)
  }
  const [header, values] = sheets[0].data
  const row = Object.fromEntries(
    header.map((cell, i) => [
      cell && typeof cell === 'object' && 'value' in cell ? cell.value : cell,
      values[i],
    ]),
  )
  expect(row).toMatchObject({
    letzte_lieferung_datum: '2026.04.01',
    letzte_lieferung_anzahl_pflanzen: '',
    letzte_lieferung_andere_mengen: '3 Töpfe',
    auslieferungen_seit_letzter_zaehlung_anzahl_pflanzen: 12,
    anlieferungen_seit_letzter_zaehlung_anzahl_pflanzen: 8,
  })
})
