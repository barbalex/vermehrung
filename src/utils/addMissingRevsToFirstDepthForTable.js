/**
 * never used
 * because rev do not exist for originally imported data which is why
 * they are not found
 */
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
} from './fragments.js'
import toPgArray from './toPgArray.js'

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
    const revisions = toPgArray([rev])
    await gqlClient
      .mutation(
        gql`
      mutation MyQuery {
        update_herkunft_by_pk(
          pk_columns: { id: "${dat.id}" }
          _set: { _rev: "${rev}", _revisions: "${revisions}" }
        ) {
          id
        }
      }
    `,
      )
      .toPromise()
    await gqlClient
      .mutation(
        gql`
        mutation MyQuery {
  update_herkunft_rev(
    where: {herkunft_id: {_eq: "${dat.id}"}, _depth: {_eq: 1}}
    _set: { _rev: "${rev}", _revisions: "${revisions}" }
    ) {
      returning {
        id
      }
    }
  }`,
      )
      .toPromise()
  }
  // 2. add _parent_rev and _revisions to depth 2 without parent_rev
}

export default addMissingRevsToFirstDepthForTable
