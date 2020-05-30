import gql from 'graphql-tag'

import addWorksheetToExceljsWorkbook from '../../../../utils/addWorksheetToExceljsWorkbook'
import { gartenTeilzaehlungSums as gartenTeilzaehlungSumsFragment } from '../../../../utils/fragments'

/**
 * this function cann be used from higher up
 * that is why it receives a workbook and _can_ recieve calledFromHigherUp
 */
export default async ({ client, store, garten_id, workbook }) => {
  const { addNotification } = store

  let gaertenResult
  try {
    gaertenResult = await client.query({
      query: gql`
        query GetGartenTzSums($id: uuid!) {
          garten_teilzaehlung_sums(where: { garten_id: { _eq: $id } }) {
            ...GartenTeilzaehlungSumsFields
          }
        }
        ${gartenTeilzaehlungSumsFragment}
      `,
      variables: {
        id: garten_id,
      },
    })
  } catch (error) {
    return addNotification({
      message: error.message,
    })
  }
  const data = gaertenResult?.data?.garten_teilzaehlung_sums ?? []
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
