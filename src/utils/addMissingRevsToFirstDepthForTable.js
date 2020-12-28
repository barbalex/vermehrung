import md5 from 'blueimp-md5'
import gql from 'graphql-tag'
import upperFirst from 'lodash/upperFirst'

import {
  art,
  herkunft,
  garten,
  sammlung,
  lieferung,
  person,
  kultur,
  zaehlung,
  teilzaehlung,
  teilkultur,
} from './fragments'

const addMissingRevsToFirstDepthForTable = async ({ table, store }) => {
  const { gqlClient } = store

  // 1. add _rev to depth 1 without
  const response = await gqlClient
    .query(
      gql`
        query tableQuery($id: uuid!, $rev: String!) {
          ${table}(
            where: {_depth: {_eq: 1}, _rev: {_is_null: true}}
          ) {
            ...${`${upperFirst(table)}Fields`}
          }
        }
        ${table}
      `,
    )
    .toPromise()
  if (response.error) {
    store.addNotification({
      message: response.error.message,
    })
    return console.log(response.error)
  }
  const tableData = response.data[table]
  console.log('addMissingRevsToFirstDepthForTable', {
    table,
    response,
    tableData,
  })
  // 2. add _parent_rev and _revisions to depth 2 without parent_rev
}

export default addMissingRevsToFirstDepthForTable
