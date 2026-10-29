import { Q } from 'nitromelondb'
import { store, dbAtom } from '../../../../../store/index.ts'

import { addWorksheetToExceljsWorkbook } from '../../../../../utils/addWorksheetToExceljsWorkbook.ts'
import { teilzaehlungsSortByTk } from '../../../../../utils/teilzaehlungsSortByTk.ts'

/**
 * this function cnn be used from higher up
 * that is why it receives a workbook and _can_ receive calledFromHigherUp
 */
export const buildExceljsWorksheetsForTzSums = async ({
  garten_id,
  workbook,
}: {
  garten_id: string
  workbook: import('exceljs').Workbook
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

      return newZ
    }),
  )

  addWorksheetToExceljsWorkbook({
    workbook,
    title: `teilzahlungen_von_garten_${garten_id}`,
    data: teilzaehlungsData,
  })

  return
}
