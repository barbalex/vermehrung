import addWorksheetToExceljsWorkbook from '../../../../../utils/addWorksheetToExceljsWorkbook'

/**
 * this function cann be used from higher up
 * that is why it receives a workbook and _can_ recieve calledFromHigherUp
 */
const buildExceljsWorksheetsForTzSums = async ({
  store,
  garten_id,
  workbook,
}) => {
  const { teilzaehlungsSorted } = store

  const teilzaehlungenArray = teilzaehlungsSorted.filter((t) => {
    const zaehlung = t.zaehlung_id ? store.zaehlungs.get(t.zaehlung_id) : {}
    const kultur = zaehlung.kultur_id
      ? store.kulturs.get(zaehlung.kultur_id)
      : {}
    return kultur?.garten_id === garten_id
  })
  const teilzaehlungen = teilzaehlungenArray.map((z) => {
    const teilkultur = z.teilkultur_id
      ? store.teilkulturs.get(z.teilkultur_id)
      : {}

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
  })
  addWorksheetToExceljsWorkbook({
    workbook,
    title: `teilzahlungen_von_garten_${garten_id}`,
    data: teilzaehlungen,
  })

  return
}

export default buildExceljsWorksheetsForTzSums
