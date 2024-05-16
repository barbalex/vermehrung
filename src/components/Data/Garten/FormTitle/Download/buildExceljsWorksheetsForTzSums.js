import { Q } from '@nozbe/watermelondb'

import addWorksheetToExceljsWorkbook from '../../../../../utils/addWorksheetToExceljsWorkbook.js'
import teilzaehlungsSortByTk from '../../../../../utils/teilzaehlungsSortByTk.js'

/**
 * this function cann be used from higher up
 * that is why it receives a workbook and _can_ recieve calledFromHigherUp
 */
const buildExceljsWorksheetsForTzSums = async ({
  store,
  garten_id,
  workbook,
}) => {
  const { db } = store

  let teilzaehlungs = []
  try {
    teilzaehlungs = await db
      .get('teilzaehlung')
      .query(
        Q.experimentalNestedJoin('zaehlung', 'kultur'),
        Q.on('zaehlung', Q.on('kultur', 'garten_id', garten_id)),
        Q.where('_deleted', false),
      )
      .fetch()
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

export default buildExceljsWorksheetsForTzSums
