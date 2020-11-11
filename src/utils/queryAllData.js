import gql from 'graphql-tag'
import { DateTime } from 'luxon'

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
import removeSurplusNotRevModels from './removeSurplusNotRevModels'
import checkForOnlineError from './checkForOnlineError'

const allDataQuery = gql`
  query AllDataQueryForTreeContainer($changed: timestamp) {
    ae_art(where: { changed: { _gt: $changed } }) {
      ...AeArtFields
    }
    art(where: { changed: { _gt: $changed } }) {
      ...ArtFields
    }
    art_file(where: { changed: { _gt: $changed } }) {
      ...ArtFileFields
    }
    art_qk(where: { changed: { _gt: $changed } }) {
      ...ArtQkFields
    }
    art_qk_choosen(where: { changed: { _gt: $changed } }) {
      ...ArtQkChoosenFields
    }
    av(where: { changed: { _gt: $changed } }) {
      ...AvFields
    }
    event(where: { changed: { _gt: $changed } }) {
      ...EventFields
    }
    garten(where: { changed: { _gt: $changed } }) {
      ...GartenFields
    }
    garten_file {
      ...GartenFileFields
    }
    gv(where: { changed: { _gt: $changed } }) {
      ...GvFields
    }
    herkunft(where: { changed: { _gt: $changed } }) {
      ...HerkunftFields
    }
    herkunft_file {
      ...HerkunftFileFields
    }
    kultur(where: { changed: { _gt: $changed } }) {
      ...KulturFields
    }
    kultur_file {
      ...KulturFileFields
    }
    kultur_option(where: { changed: { _gt: $changed } }) {
      ...KulturOptionFields
    }
    kultur_qk(where: { changed: { _gt: $changed } }) {
      ...KulturQkFields
    }
    kultur_qk_choosen(where: { changed: { _gt: $changed } }) {
      ...KulturQkChoosenFields
    }
    lieferung(where: { changed: { _gt: $changed } }) {
      ...LieferungFields
    }
    lieferung_file {
      ...LieferungFileFields
    }
    person(where: { changed: { _gt: $changed } }) {
      ...PersonFields
    }
    person_file {
      ...PersonFileFields
    }
    person_option(where: { changed: { _gt: $changed } }) {
      ...PersonOptionFields
    }
    sammel_lieferung(where: { changed: { _gt: $changed } }) {
      ...SammelLieferungFields
    }
    sammlung(where: { changed: { _gt: $changed } }) {
      ...SammlungFields
    }
    sammlung_file {
      ...SammlungFileFields
    }
    teilkultur(where: { changed: { _gt: $changed } }) {
      ...TeilkulturFields
    }
    teilzaehlung(where: { changed: { _gt: $changed } }) {
      ...TeilzaehlungFields
    }
    user_role {
      ...UserRoleFields
    }
    zaehlung(where: { changed: { _gt: $changed } }) {
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

const queryAllData = async ({ store }) => {
  if (!store.online) {
    return
  }
  // TODO: do this in worker?
  // TODO:
  // query only newer than store.lastUpdatedAt
  const { setInitialDataQueried, lastUpdatedAt } = store
  let data
  const changed = DateTime.fromMillis(lastUpdatedAt).toISO()
  console.log('queryAllData', { changed, lastUpdatedAt })
  try {
    data = await store.query(
      allDataQuery,
      { changed },
      {
        fetchPolicy: 'network-only',
      },
    )
  } catch (error) {
    if (error && error.message.includes('JWT')) {
      console.log('queryAllData, will get new auth token')
      await getAuthToken({ store })
    } else {
      checkForOnlineError(error)
    }
    setInitialDataQueried(true)
    return
  }
  console.log('queryAllData', { data })
  removeSurplusNotRevModels({ store, data })
  setInitialDataQueried(true)
  store.setLastUpdatedAt(Date.now())
  // TODO:
  // remove data with _deleted flag?
}

export default queryAllData
