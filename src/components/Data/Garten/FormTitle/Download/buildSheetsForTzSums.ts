import { Q } from 'nitromelondb'
import { store, dbAtom, setExportProgress } from '../../../../../store/index.ts'
import type { Sheet } from 'write-excel-file/browser'

import { addSheetToSheets } from '../../../../../utils/addSheetToSheets.ts'
import { teilzaehlungsSortByTk } from '../../../../../utils/teilzaehlungsSortByTk.ts'

/**
 * this function cnn be used from higher up
 * that is why it receives sheets and _can_ receive calledFromHigherUp
 */
export const buildSheetsForTzSums = async ({
  garten_id,
  sheets,
}: {
  garten_id: string
  sheets: Sheet<Blob>[]
}) => {
  const db = store.get(dbAtom)

  let teilzaehlungs: import('../../../../../dbModel.ts').Teilzaehlung[] = []
  try {
    teilzaehlungs =
      (await db
        ?.get<import('../../../../../dbModel.ts').Teilzaehlung>('teilzaehlung')
        .query(
          Q.experimentalNestedJoin('zaehlung', 'kultur'),
          Q.on('zaehlung', Q.on('kultur', 'garten_id', garten_id)),
          Q.where('_deleted', false),
        )
        .fetch()) ?? []
  } catch {}
  const teilzaehlungsSorted = await teilzaehlungsSortByTk(teilzaehlungs)
  let teilzaehlungsDone = 0
  const teilzaehlungsData = await Promise.all(
    teilzaehlungsSorted.map(async (z) => {
      let teilkultur
      try {
        teilkultur = await z.teilkultur?.fetch()
      } catch {}

      const newZ = {
        id: z.id,
        zaehlung_id: z.zaehlung_id,
        teilkultur_id: z.teilkultur_id,
        teilkultur_name: teilkultur?.name ?? '',
        anzahl_pflanzen: z.anzahl_pflanzen,
        anzahl_auspflanzbereit: z.anzahl_auspflanzbereit,
        anzahl_mutterpflanzen: z.anzahl_mutterpflanzen,
        andere_menge: z.andere_menge,
        auspflanzbereit_beschreibung: z.auspflanzbereit_beschreibung,
        bemerkungen: z.bemerkungen,
      }

      teilzaehlungsDone += 1
      setExportProgress({
        message: 'Teil-Zählungen werden aufbereitet',
        done: teilzaehlungsDone,
        total: teilzaehlungsSorted.length,
      })
      return newZ
    }),
  )

  addSheetToSheets({
    sheets,
    title: `teilzahlungen_von_garten_${garten_id}`,
    data: teilzaehlungsData,
  })

  return
}
