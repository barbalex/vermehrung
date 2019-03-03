import React, { useState, useCallback } from 'react'
import Input from '@material-ui/core/Input'
import { FaSearch, FaTimes } from 'react-icons/fa'
import styled from 'styled-components'
import gql from 'graphql-tag'
import { useQuery } from 'react-apollo-hooks'

import {
  art as artFragment,
  garten as gartenFragment,
  herkunft as herkunftFragment,
  kultur as kulturFragment,
  kulturEvent as kulturEventFragment,
  kulturInventar as kulturInventarFragment,
  lieferung as lieferungFragment,
  person as personFragment,
  sammlung as sammlungFragment,
  zaehlung as zaehlungFragment,
} from '../../utils/fragments'

const Container = styled.div`
  border-radius: 3px;
  background-color: #5f00d4;
  margin-right: 5px;
  width: 220px;
  display: flex;
  :hover {
    background-color: #640dce;
  }
`
const SearchIcon = styled(FaSearch)`
  margin: auto 5px;
`
const DelIcon = styled(FaTimes)`
  margin: auto 5px;
  opacity: ${props => (props['data-active'] ? 1 : 0.4)};
  cursor: ${props => (props['data-active'] ? 'pointer' : 'default')};
`
const StyledInput = styled(Input)`
  input {
    color: white;
  }
  :before,
  :after {
    border-bottom: none !important;
  }
`

const filterSuggestionsQuery = gql`
  query filterSuggestionsQuery($filter: String!, $run: Boolean!) {
    art: art_search(args: { filter: $filter }) @include(if: $run) {
      ...ArtFields
    }
    garten: garten_search(args: { filter: $filter }) @include(if: $run) {
      ...GartenFields
    }
    herkunft: herkunft_search(args: { filter: $filter }) @include(if: $run) {
      ...HerkunftFields
    }
    kultur: kultur_search(args: { filter: $filter }) @include(if: $run) {
      ...KulturFields
      artByartId {
        ...ArtFields
      }
      gartenBygartenId {
        id
        personBypersonId {
          ...PersonFields
        }
      }
    }
    kulturEvent: kultur_event_search(args: { filter: $filter })
      @include(if: $run) {
      ...KulturEventFields
    }
    kulturInventar: kultur_inventar_search(args: { filter: $filter })
      @include(if: $run) {
      ...KulturInventarFields
    }
    lieferung: lieferung_search(args: { filter: $filter }) @include(if: $run) {
      ...LieferungFields
    }
    person: person_search(args: { filter: $filter }) @include(if: $run) {
      ...PersonFields
    }
    sammlung: sammlung_search(args: { filter: $filter }) @include(if: $run) {
      ...SammlungFields
      artByartId {
        ...ArtFields
      }
      personBypersonId {
        ...PersonFields
      }
    }
    zaehlung: zaehlung_search(args: { filter: $filter }) @include(if: $run) {
      ...ZaehlungFields
    }
  }
  ${artFragment}
  ${gartenFragment}
  ${herkunftFragment}
  ${kulturFragment}
  ${kulturEventFragment}
  ${kulturInventarFragment}
  ${lieferungFragment}
  ${personFragment}
  ${sammlungFragment}
  ${zaehlungFragment}
`

export default () => {
  const [val, setVal] = useState('')

  const onChange = useCallback(event => setVal(event.target.value))
  const onBlur = useCallback(event =>
    console.log('search ', event.target.value),
  )
  const onClickDel = useCallback(() => setVal(''))
  const onKeyPress = useCallback(event => {
    if (event.key === 'Enter') {
      console.log('search ', event.target.value)
    }
  })

  const { data, error, loading } = useQuery(filterSuggestionsQuery, {
    variables: { run: !!val, filter: val },
  })

  console.log('Search, data', data)

  return (
    <Container>
      <SearchIcon />
      <StyledInput
        value={val}
        type="text"
        onChange={onChange}
        onBlur={onBlur}
        onKeyPress={onKeyPress}
        placeholder="suchen"
      />
      <DelIcon data-active={!!val} onClick={onClickDel} />
    </Container>
  )
}
