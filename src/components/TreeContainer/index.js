/**
 * This component only loads the data
 * Reason: apollo used to return no data while refreshing
 * This was bad for the tree. Very hard to build a good user experience.
 * So the data was passed as props to the Tree component.
 * Which can decide not to update nodes if the query is loading
 * but rather use the previous value
 */
import React, { useContext, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import gql from 'graphql-tag'
import styled from 'styled-components'

import Tree from './Tree'
import { StoreContext, useQuery } from '../../models/reactUtils'
import checkHasuraClaimsOnError from '../../utils/checkHasuraClaimsOnError'
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
} from '../../utils/fragments'

const ErrorContainer = styled.div`
  min-height: calc(100vh - 64px);
  padding: 15px;
`

const allDataQuery = gql`
  query AllDataQueryForTreeContainer($run: Boolean!) {
    ae_art @include(if: $run) {
      ...AeArtFields
    }
    art @include(if: $run) {
      ...ArtFields
    }
    art_file @include(if: $run) {
      ...ArtFileFields
    }
    art_qk @include(if: $run) {
      ...ArtQkFields
    }
    art_qk_choosen @include(if: $run) {
      ...ArtQkChoosenFields
    }
    av @include(if: $run) {
      ...AvFields
    }
    event @include(if: $run) {
      ...EventFields
    }
    garten @include(if: $run) {
      ...GartenFields
    }
    garten_file @include(if: $run) {
      ...GartenFileFields
    }
    gv @include(if: $run) {
      ...GvFields
    }
    herkunft @include(if: $run) {
      ...HerkunftFields
    }
    herkunft_file @include(if: $run) {
      ...HerkunftFileFields
    }
    kultur @include(if: $run) {
      ...KulturFields
    }
    kultur_file @include(if: $run) {
      ...KulturFileFields
    }
    kultur_option @include(if: $run) {
      ...KulturOptionFields
    }
    kultur_qk @include(if: $run) {
      ...KulturQkFields
    }
    kultur_qk_choosen @include(if: $run) {
      ...KulturQkChoosenFields
    }
    lieferung @include(if: $run) {
      ...LieferungFields
    }
    lieferung_file @include(if: $run) {
      ...LieferungFileFields
    }
    person @include(if: $run) {
      ...PersonFields
    }
    person_file @include(if: $run) {
      ...PersonFileFields
    }
    person_option @include(if: $run) {
      ...PersonOptionFields
    }
    sammel_lieferung @include(if: $run) {
      ...SammelLieferungFields
    }
    sammlung @include(if: $run) {
      ...SammlungFields
    }
    sammlung_file @include(if: $run) {
      ...SammlungFileFields
    }
    teilkultur @include(if: $run) {
      ...TeilkulturFields
    }
    teilzaehlung @include(if: $run) {
      ...TeilzaehlungFields
    }
    user_role @include(if: $run) {
      ...UserRoleFields
    }
    zaehlung @include(if: $run) {
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

const TreeContainer = () => {
  const store = useContext(StoreContext)
  const { setLoading, user } = store

  //const [meLoading, setMeLoading] = useState(false)
  useEffect(() => {}, [])
  const run = !store.arts.size && !!user?.uid
  const { loading, error } = useQuery(
    allDataQuery,
    {
      variables: {
        run,
      },
    },
    { fetchPolicy: 'network-only' },
  )
  console.log('TreeContainer', {
    loading,
    error,
    run,
  })

  useEffect(() => {
    if (loading !== store.loading) setLoading(loading)
  }, [loading, setLoading, store.loading])

  if (
    error &&
    !error.message.includes('Failed to fetch') &&
    !error.message.includes('JWT')
  ) {
    return <ErrorContainer>{error.message}</ErrorContainer>
  }
  if (error && error.message.includes('JWT')) {
    checkHasuraClaimsOnError({ error, store })
  }
  return <Tree />
}

export default observer(TreeContainer)
