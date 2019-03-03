import React, { useState, useCallback, useContext } from 'react'
import { FaSearch, FaTimes } from 'react-icons/fa'
import styled from 'styled-components'
import gql from 'graphql-tag'
import { useQuery } from 'react-apollo-hooks'
import { navigate } from 'gatsby'
import get from 'lodash/get'
import Autosuggest from 'react-autosuggest'
import match from 'autosuggest-highlight/match'
import parse from 'autosuggest-highlight/parse'

import storeContext from '../../storeContext'

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
  }
  .react-autosuggest__input {
    width: 100%;
    border: none;
    font-size: 16px;
    padding: 5px;
    background-color: rgba(0, 0, 0, 0);
    color: white;
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
    top: 48px;
    margin-left: -23px;
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
    color: rgba(0, 0, 0, 0.8);
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

const filterSuggestionsQuery = gql`
  query filterSuggestionsQuery($filter: String!, $run: Boolean!) {
    art: art_search(args: { filter: $filter }) @include(if: $run) {
      ...ArtFields
    }
    garten: garten_search(args: { filter: $filter }) @include(if: $run) {
      ...GartenFields
      personBypersonId {
        ...PersonFields
      }
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
        name: '',
        type: 'Arten',
      },
    ],
  },
]
const autosuggestWidth = 350
const getSuggestionValue = suggestion => suggestion && suggestion.name
const shouldRenderSuggestions = value => value.trim().length > 1
const renderSectionTitle = section => <strong>{section.title}</strong>
const getSectionSuggestions = section => section.suggestions

export default () => {
  const store = useContext(storeContext)
  const { setActiveNodeArray } = store.tree
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
  const suggesionsGarten = get(data, 'garten', []).map(o => ({
    id: o.id,
    name: get(o, 'personBypersonId.name') || '(kein Name)',
    type: 'Gaerten',
  }))
  const suggesionsHerkunft = get(data, 'herkunft', []).map(o => ({
    id: o.id,
    name: `${get(o, 'nr') || '(keine Nr)'}: ${get(o, 'lokalname') ||
      '(kein Lokalname)'}`,
    type: 'Herkuenfte',
  }))
  const suggesionsKultur = get(data, 'kultur', []).map(o => ({
    id: o.id,
    name: get(o, 'gartenBygartenId.personBypersonId.name') || '(kein Name)',
    type: 'Kulturen',
  }))
  const rawSuggestions = [
    ...suggesionsArt,
    ...suggesionsGarten,
    ...suggesionsHerkunft,
  ]
  const titledSuggestions = []
  if (suggesionsArt.length) {
    titledSuggestions.push({
      title: `Arten (${suggesionsArt.length})`,
      suggestions: suggesionsArt,
    })
  }
  if (suggesionsGarten.length) {
    titledSuggestions.push({
      title: `Gärten (${suggesionsGarten.length})`,
      suggestions: suggesionsGarten,
    })
  }
  if (suggesionsHerkunft.length) {
    titledSuggestions.push({
      title: `Herkünfte (${suggesionsHerkunft.length})`,
      suggestions: suggesionsHerkunft,
    })
  }
  if (suggesionsKultur.length) {
    titledSuggestions.push({
      title: `Kulturen (${suggesionsKultur.length})`,
      suggestions: suggesionsKultur,
    })
  }
  const suggestions = rawSuggestions.length
    ? titledSuggestions
    : loadingSuggestions

  console.log('Search', { titledSuggestions })

  const onChange = useCallback(event => setVal(event.target.value))
  const onClickDel = useCallback(() => setVal(''))
  const onSuggestionSelected = useCallback((event, { suggestion }) => {
    let newActiveNodeArray
    // use suggestion.id to set url
    switch (suggestion.type) {
      case 'Arten':
      case 'Gaerten':
      case 'Herkuenfte':
      case 'Lieferungen':
      case 'Personen':
      case 'Sammlungen':
      case 'Kulturen':
        newActiveNodeArray = [suggestion.type, suggestion.id]
        break
      case 'Inventare':
      case 'Events':
      case 'Zaehlungen':
        console.log('TODO')
        break
      default: {
        // do nothing
        // TODO:
        // kultur_event, kultur_inventar and zahelungen
      }
    }
    setActiveNodeArray(newActiveNodeArray)
    navigate(`/Vermehrung/${newActiveNodeArray.join('/')}`)
    setVal('')
  })
  const inputProps = {
    value: val,
    onChange,
    type: 'search',
    placeholder: 'suchen',
    spellCheck: false,
  }
  const renderSuggestion = useCallback((suggestion, { query }) => {
    const matches = match(suggestion.name, query)
    const parts = parse(suggestion.name, matches)

    return (
      <div>
        {parts.map((part, index) => {
          return part.highlight ? (
            <strong
              key={String(index)}
              style={{ fontWeight: '500 !important' }}
            >
              {part.text}
            </strong>
          ) : (
            <span key={String(index)} style={{ fontWeight: '300 !important' }}>
              {part.text}
            </span>
          )
        })}
      </div>
    )
  })

  return (
    <Container data-autosuggestwidth={autosuggestWidth}>
      <SearchIcon />
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={() => {
          // Autosuggest wants this function
          // could maybe be used to indicate loading?
        }}
        onSuggestionsClearRequested={() => {
          // need this?
          //console.log('clear requested')
        }}
        getSuggestionValue={getSuggestionValue}
        shouldRenderSuggestions={shouldRenderSuggestions}
        onSuggestionSelected={onSuggestionSelected}
        renderSuggestion={renderSuggestion}
        multiSection={true}
        renderSectionTitle={renderSectionTitle}
        getSectionSuggestions={getSectionSuggestions}
        inputProps={inputProps}
        focusInputOnSuggestionClick={false}
      />
      <DelIcon data-active={!!val} onClick={onClickDel} />
    </Container>
  )
}
