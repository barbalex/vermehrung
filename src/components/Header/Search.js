import React, { useState, useCallback } from 'react'
import Input from '@material-ui/core/Input'
import { FaSearch, FaTimes } from 'react-icons/fa'
import styled from 'styled-components'
import gql from 'graphql-tag'
import { useQuery } from 'react-apollo-hooks'
import { navigate } from 'gatsby'
import get from 'lodash/get'
import Autosuggest from 'react-autosuggest'

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
  width: 350px;
  display: flex;
  justify-content: space-between;
  :hover {
    background-color: #640dce;
  }
  .react-autosuggest__container {
    width: 100%;
    border-bottom: 1px solid #c6c6c6;
  }
  .react-autosuggest__input {
    width: 100%;
    border: none;
    font-size: 16px;
    padding: 5px;
    background-color: rgba(0, 0, 0, 0);
  }
  .react-autosuggest__input--focused {
    outline: none;
  }
  .react-autosuggest__input--open {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
  .react-autosuggest__suggestions-container {
    display: none;
  }
  .react-autosuggest__suggestions-container--open {
    display: block;
    position: absolute;
    top: 32px;
    width: ${props => `${props['data-autosuggestwidth']}px`};
    border: 1px solid #aaa;
    background-color: #fff;
    font-family: Helvetica, sans-serif;
    font-size: 14px;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    z-index: 2;
  }
  .react-autosuggest__suggestions-list {
    margin: 0;
    padding: 0;
    list-style-type: none;
  }
  .react-autosuggest__suggestion {
    cursor: pointer;
    padding: 5px 20px;
  }
  .react-autosuggest__suggestion--highlighted {
    background-color: #ddd;
  }
  .react-autosuggest__section-container {
    border-top: 1px dashed #ccc;
  }
  .react-autosuggest__section-container--first {
    border-top: 0;
  }
  .react-autosuggest__section-title {
    padding: 5px 0 5px 10px;
    font-size: 12px;
    color: #777;
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
  width: 100%;
  input {
    color: white;
    width: 100%;
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

const loadingSuggestions = [
  {
    title: 'Lade Daten',
    suggestions: [
      {
        id: 'none',
        name: 'Lade daten...',
        type: 'Arten',
      },
    ],
  },
]

export default () => {
  const [val, setVal] = useState('')

  const { data, error, loading } = useQuery(filterSuggestionsQuery, {
    variables: { run: !!val, filter: val },
  })

  console.log('Search, data', data)

  const suggesionsArt = get(data, 'art', []).map(o => ({
    id: o.id,
    name: get(o, 'art_ae_art.name') || '(kein Artname)',
    type: 'Arten',
  }))
  const rawSuggestions = [...suggesionsArt]
  const suggestions = rawSuggestions.length
    ? [{ title: `Arten (${suggesionsArt.length})`, suggestions: suggesionsArt }]
    : loadingSuggestions

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
  const onSuggestionSelected = useCallback((event, { suggestion }) => {
    let url
    // use suggestion.id to set url
    switch (suggestion.type) {
      case 'Arten':
      case 'Gaerten':
      case 'Herkuenfte':
      case 'Lieferungen':
      case 'Personen':
      case 'Sammlungen':
      case 'Kulturen':
        url = `/Vermehrung/${suggestion.type}/${suggestion.id}`
        break
      default: {
        // do nothing
      }
    }
    navigate(url)
    setVal('')
  })
  const inputProps = {
    value: val,
    onChange,
    type: 'search',
    placeholder: 'suchen',
    spellCheck: false,
  }

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
