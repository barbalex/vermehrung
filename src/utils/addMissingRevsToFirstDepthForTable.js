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
import toPgArray from './toPgArray'

const fragments = {
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
}

const addMissingRevsToFirstDepthForTable = async ({ table, store }) => {
  const { gqlClient } = store

  // 1. add _rev to depth 1 without
  const response = await gqlClient
    .query(
      gql`
        query tableQuery {
          ${table}(
            where: {_depth: {_eq: 1}, _rev: {_is_null: true}}
          ) {
            ...${`${upperFirst(table)}Fields`}
          }
        }
        ${fragments[table]}
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
    tableData,
  })
  for (const dat of tableData) {
    const datWithout = { ...dat }
    delete datWithout._rev
    delete datWithout.id
    delete datWithout.changed
    delete datWithout.changed_by
    delete datWithout._revisions
    const rev = `${1}-${md5(JSON.stringify(datWithout))}`
    const newDat = {
      ...dat,
      _rev: rev,
      _revisions: toPgArray([rev]),
    }
    await gqlClient(gql``)
  }
  // 2. add _parent_rev and _revisions to depth 2 without parent_rev
}

export default addMissingRevsToFirstDepthForTable
