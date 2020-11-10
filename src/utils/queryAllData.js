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
import removeSurplusNotRevModels from './removeSurplusNotRevModels'
import checkForOnlineError from './checkForOnlineError'

const allDataQuery = gql`
  query AllDataQueryForTreeContainer {
    ae_art {
      ...AeArtFields
    }
    art {
      ...ArtFields
    }
    art_file {
      ...ArtFileFields
    }
    art_qk {
      ...ArtQkFields
    }
    art_qk_choosen {
      ...ArtQkChoosenFields
    }
    av {
      ...AvFields
    }
    event {
      ...EventFields
    }
    garten {
      ...GartenFields
    }
    garten_file {
      ...GartenFileFields
    }
    gv {
      ...GvFields
    }
    herkunft {
      ...HerkunftFields
    }
    herkunft_file {
      ...HerkunftFileFields
    }
    kultur {
      ...KulturFields
    }
    kultur_file {
      ...KulturFileFields
    }
    kultur_option {
      ...KulturOptionFields
    }
    kultur_qk {
      ...KulturQkFields
    }
    kultur_qk_choosen {
      ...KulturQkChoosenFields
    }
    lieferung {
      ...LieferungFields
    }
    lieferung_file {
      ...LieferungFileFields
    }
    person {
      ...PersonFields
    }
    person_file {
      ...PersonFileFields
    }
    person_option {
      ...PersonOptionFields
    }
    sammel_lieferung {
      ...SammelLieferungFields
    }
    sammlung {
      ...SammlungFields
    }
    sammlung_file {
      ...SammlungFileFields
    }
    teilkultur {
      ...TeilkulturFields
    }
    teilzaehlung {
      ...TeilzaehlungFields
    }
    user_role {
      ...UserRoleFields
    }
    zaehlung {
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
  const { setInitialDataQueried } = store
  let data
  try {
    data = await store.query(allDataQuery, undefined, {
      fetchPolicy: 'network-only',
    })
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
  removeSurplusNotRevModels({ store, data })
  setInitialDataQueried(true)
  // TODO:
  // remove data with _deleted flag?
}

export default queryAllData
