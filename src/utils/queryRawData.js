import gql from 'graphql-tag'

import {
  aeArt,
  art,
  artFile,
  artQk,
  artQkChoosen,
  av,
  event,
  garten,
  gartenFile,
  gv,
  herkunft,
  herkunftFile,
  kultur,
  kulturFile,
  kulturOption,
  kulturQk,
  kulturQkChoosen,
  lieferung,
  lieferungFile,
  person,
  personFile,
  personOption,
  sammelLieferung,
  sammlung,
  sammlungFile,
  teilkultur,
  teilzaehlung,
  userRole,
  zaehlung,
} from './fragments'
import getAuthToken from './getAuthToken'
import checkForOnlineError from './checkForOnlineError'
import updateWmFromData from './updateWmFromData'
import { tables } from '../dbSchema/schema'

const allDataQuery = gql`
  query AllDataQueryForTreeContainer($revAt: numeric) {
    ae_art(where: { _rev_at: { _gt: $revAt } }) {
      ...AeArtFields
    }
    art(where: { _rev_at: { _gt: $revAt } }) {
      ...ArtFields
    }
    art_file(where: { _rev_at: { _gt: $revAt } }) {
      ...ArtFileFields
    }
    art_qk(where: { _rev_at: { _gt: $revAt } }) {
      ...ArtQkFields
    }
    art_qk_choosen(where: { _rev_at: { _gt: $revAt } }) {
      ...ArtQkChoosenFields
    }
    av(where: { _rev_at: { _gt: $revAt } }) {
      ...AvFields
    }
    event(where: { _rev_at: { _gt: $revAt } }) {
      ...EventFields
    }
    garten(where: { _rev_at: { _gt: $revAt } }) {
      ...GartenFields
    }
    garten_file(where: { _rev_at: { _gt: $revAt } }) {
      ...GartenFileFields
    }
    gv(where: { _rev_at: { _gt: $revAt } }) {
      ...GvFields
    }
    herkunft(where: { _rev_at: { _gt: $revAt } }) {
      ...HerkunftFields
    }
    herkunft_file(where: { _rev_at: { _gt: $revAt } }) {
      ...HerkunftFileFields
    }
    kultur(where: { _rev_at: { _gt: $revAt } }) {
      ...KulturFields
    }
    kultur_file(where: { _rev_at: { _gt: $revAt } }) {
      ...KulturFileFields
    }
    kultur_option(where: { _rev_at: { _gt: $revAt } }) {
      ...KulturOptionFields
    }
    kultur_qk(where: { _rev_at: { _gt: $revAt } }) {
      ...KulturQkFields
    }
    kultur_qk_choosen(where: { _rev_at: { _gt: $revAt } }) {
      ...KulturQkChoosenFields
    }
    lieferung(where: { _rev_at: { _gt: $revAt } }) {
      ...LieferungFields
    }
    lieferung_file(where: { _rev_at: { _gt: $revAt } }) {
      ...LieferungFileFields
    }
    person(where: { _rev_at: { _gt: $revAt } }) {
      ...PersonFields
    }
    person_file(where: { _rev_at: { _gt: $revAt } }) {
      ...PersonFileFields
    }
    person_option(where: { _rev_at: { _gt: $revAt } }) {
      ...PersonOptionFields
    }
    sammel_lieferung(where: { _rev_at: { _gt: $revAt } }) {
      ...SammelLieferungFields
    }
    sammlung(where: { _rev_at: { _gt: $revAt } }) {
      ...SammlungFields
    }
    sammlung_file(where: { _rev_at: { _gt: $revAt } }) {
      ...SammlungFileFields
    }
    teilkultur(where: { _rev_at: { _gt: $revAt } }) {
      ...TeilkulturFields
    }
    teilzaehlung(where: { _rev_at: { _gt: $revAt } }) {
      ...TeilzaehlungFields
    }
    user_role(where: { _rev_at: { _gt: $revAt } }) {
      ...UserRoleFields
    }
    zaehlung(where: { _rev_at: { _gt: $revAt } }) {
      ...ZaehlungFields
    }
  }
  ${aeArt}
  ${art}
  ${artFile}
  ${artQk}
  ${artQkChoosen}
  ${av}
  ${event}
  ${garten}
  ${gartenFile}
  ${gv}
  ${herkunft}
  ${herkunftFile}
  ${kultur}
  ${kulturFile}
  ${kulturOption}
  ${kulturQk}
  ${kulturQkChoosen}
  ${lieferung}
  ${lieferungFile}
  ${person}
  ${personFile}
  ${personOption}
  ${sammelLieferung}
  ${sammlung}
  ${sammlungFile}
  ${teilkultur}
  ${teilzaehlung}
  ${userRole}
  ${zaehlung}
`

const queryRawData = async ({ store }) => {
  const { online, db, lastUpdatedAt: revAt, rawQglClient } = store
  if (!online) {
    return
  }
  // query only newer than store.lastUpdatedAt
  let data
  //console.log('queryRawData', { changed, lastUpdatedAt })
  //const now = Date.now()/1000
  try {
    data = await rawQglClient.request(allDataQuery, { revAt })
  } catch (error) {
    if (error && error.message.includes('JWT')) {
      console.log('queryRawData, will get new auth token')
      await getAuthToken({ store })
    } else {
      checkForOnlineError(error)
    }
    return
  }
  console.log('queryRawData', { data, revAt })
  //store.setLastUpdatedAt(now)
  const tableNames = tables.map((t) => t.name)
  for (const table of tableNames) {
    console.log('queryRawData', {
      table,
      dataTable: data[table],
      dataTableLengthExists: !!data[table].length,
    })
    !!data[table].length &&
      (await updateWmFromData({ data: data[table], table, db }))
  }
  // TODO:
  // remove data with _deleted flag?
}

export default queryRawData
