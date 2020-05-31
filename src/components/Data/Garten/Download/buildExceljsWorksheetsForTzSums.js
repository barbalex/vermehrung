import addWorksheetToExceljsWorkbook from '../../../../utils/addWorksheetToExceljsWorkbook'

/**
 * this function cann be used from higher up
 * that is why it receives a workbook and _can_ recieve calledFromHigherUp
 */
export default async ({ store, garten_id, workbook }) => {
  const { addNotification } = store

  let gaertenResult
  try {
    gaertenResult = await store.queryGarten_teilzaehlung_sums({
      where: { garten_id: { _eq: garten_id } },
    })
  } catch (error) {
    return addNotification({
      message: error.message,
    })
  }
  const data = gaertenResult?.garten_teilzaehlung_sums ?? []
  for (let row of data) {
    delete row.__typename
  }
  addWorksheetToExceljsWorkbook({
    workbook,
    title: `teilzahlungen_von_garten_${garten_id}`,
    data,
  })
  return
}
