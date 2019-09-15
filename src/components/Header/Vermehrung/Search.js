import React, { useState, useCallback, useContext } from 'react'
import { FaSearch, FaTimes } from 'react-icons/fa'
import styled from 'styled-components'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { navigate } from 'gatsby'
import get from 'lodash/get'
import Autosuggest from 'react-autosuggest'
import match from 'autosuggest-highlight/match'
import parse from 'autosuggest-highlight/parse'
import moment from 'moment'

import storeContext from '../../../storeContext'
import queryFromTable from '../../../utils/queryFromTable'

import {
  art as artFragment,
  garten as gartenFragment,
  herkunft as herkunftFragment,
  kultur as kulturFragment,
  event as eventFragment,
  lieferung as lieferungFragment,
  person as personFragment,
  sammlung as sammlungFragment,
  zaehlung as zaehlungFragment,
} from '../../../utils/fragments'

const formatDatum = datum =>
  datum ? moment(datum, 'YYYY-MM-DD').format('YYYY.MM.DD') : '(kein Datum)'

const Container = styled.div`
  border-radius: 3px;
  background-color: #5f00d4;
  margin-right: 5px;
  width: 250px;
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
    /*background-color: rgb(251, 248, 255);*/
    font-family: Helvetica, sans-serif;
    font-size: 14px;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    z-index: 2;
    max-height: calc(100vh - 60px);
    overflow-y: auto;
    box-shadow: 3px 3px 3px rgba(74, 20, 140, 0.1);
  }
  .react-autosuggest__suggestions-list {
    margin: 0;
    padding: 0;
    list-style-type: none;
  }
  .react-autosuggest__suggestion {
    cursor: pointer;
    margin-top: 2px;
    margin-bottom: 2px;
    padding: 0 20px;
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
    padding: 5px 0 0 10px;
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
  query filterSuggestionsQuery(
    $filter: String!
    $run: Boolean!
    $personFilter: person_bool_exp!
    $gartenFilter: garten_bool_exp!
    $kulturFilter: kultur_bool_exp!
  ) {
    art: art_search(args: { filter: $filter }) @include(if: $run) {
      ...ArtFields
    }
    garten: garten_search(args: { filter: $filter }, where: $gartenFilter)
      @include(if: $run) {
      ...GartenFields
      person {
        ...PersonFields
      }
    }
    herkunft: herkunft_search(args: { filter: $filter }) @include(if: $run) {
      ...HerkunftFields
    }
    kultur: kultur_search(args: { filter: $filter }, where: $kulturFilter)
      @include(if: $run) {
      ...KulturFields
      art {
        ...ArtFields
      }
      garten {
        id
        person {
          ...PersonFields
        }
      }
    }
    event: event_search(args: { filter: $filter }) @include(if: $run) {
      ...EventFields
      kultur {
        ...KulturFields
      }
    }
    lieferung: lieferung_search(args: { filter: $filter }) @include(if: $run) {
      ...LieferungFields
    }
    person: person_search(args: { filter: $filter }, where: $personFilter)
      @include(if: $run) {
      ...PersonFields
    }
    sammlung: sammlung_search(args: { filter: $filter }) @include(if: $run) {
      ...SammlungFields
      art {
        ...ArtFields
      }
      person {
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
  ${eventFragment}
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
const shouldRenderSuggestions = value =>
  value && value.trim && value.trim().length > 1
const renderSectionTitle = section => <strong>{section.title}</strong>
const getSectionSuggestions = section => section.suggestions

export default () => {
  const store = useContext(storeContext)
  const { setActiveNodeArray, addOpenNodes } = store.tree
  const [val, setVal] = useState('')

  const { data } = useQuery(filterSuggestionsQuery, {
    variables: {
      run: !!val,
      filter: val,
      personFilter: queryFromTable({ store, table: 'person' }),
      gartenFilter: queryFromTable({ store, table: 'garten' }),
      kulturFilter: queryFromTable({ store, table: 'kultur' }),
    },
  })

  const suggestionsArt = get(data, 'art', []).map(o => ({
    id: o.id,
    name: get(o, 'art_ae_art.name') || '(kein Artname)',
    type: 'Arten',
  }))
  const suggestionsGarten = get(data, 'garten', []).map(o => ({
    id: o.id,
    name: o.name || `(${get(o, 'person.name') || 'kein Name'})`,
    type: 'Gaerten',
  }))
  const suggestionsHerkunft = get(data, 'herkunft', []).map(o => ({
    id: o.id,
    name: `${get(o, 'nr') || '(keine Nr)'}: ${get(o, 'lokalname') ||
      '(kein Lokalname)'}`,
    type: 'Herkuenfte',
  }))
  const suggestionsKultur = get(data, 'kultur', []).map(o => ({
    id: o.id,
    name: get(o, 'garten.person.name') || '(kein Name)',
    type: 'Kulturen',
  }))
  const suggestionsEvent = get(data, 'event', []).map(o => ({
    id: o.id,
    name: `${formatDatum(o.datum)}: ${get(o, 'event') ||
      '(nicht beschrieben)'}`,
    type: 'Events',
    parent: o.kultur_id,
  }))
  const suggestionsLieferung = get(data, 'lieferung', []).map(o => ({
    id: o.id,
    name: o.von_datum
      ? moment(o.von_datum, 'YYYY-MM-DD').format('YYYY.MM.DD')
      : '(kein von-Datum)',
    type: 'Lieferungen',
  }))
  const suggestionsPerson = get(data, 'person', []).map(o => ({
    id: o.id,
    name: get(o, 'name') || '(kein Name)',
    type: 'Personen',
  }))
  const suggestionsSammlung = get(data, 'sammlung', []).map(o => ({
    id: o.id,
    name: `${get(o, 'nr') || '(keine Nr)'}: ${formatDatum(o.datum)}`,
    type: 'Sammlungen',
  }))
  const suggestionsZaehlung = get(data, 'zaehlung', []).map(o => ({
    id: o.id,
    name: formatDatum(o.datum),
    type: 'Zaehlungen',
    parent: o.kultur_id,
  }))
  const rawSuggestions = [
    ...suggestionsArt,
    ...suggestionsGarten,
    ...suggestionsHerkunft,
    ...suggestionsKultur,
    ...suggestionsEvent,
    ...suggestionsLieferung,
    ...suggestionsPerson,
    ...suggestionsSammlung,
    ...suggestionsZaehlung,
  ]
  const titledSuggestions = []
  if (suggestionsArt.length) {
    titledSuggestions.push({
      title: `Arten (${suggestionsArt.length})`,
      suggestions: suggestionsArt,
    })
  }
  if (suggestionsGarten.length) {
    titledSuggestions.push({
      title: `Gärten (${suggestionsGarten.length})`,
      suggestions: suggestionsGarten,
    })
  }
  if (suggestionsHerkunft.length) {
    titledSuggestions.push({
      title: `Herkünfte (${suggestionsHerkunft.length})`,
      suggestions: suggestionsHerkunft,
    })
  }
  if (suggestionsKultur.length) {
    titledSuggestions.push({
      title: `Kulturen (${suggestionsKultur.length})`,
      suggestions: suggestionsKultur,
    })
  }
  if (suggestionsEvent.length) {
    titledSuggestions.push({
      title: `Events (${suggestionsEvent.length})`,
      suggestions: suggestionsEvent,
    })
  }
  if (suggestionsLieferung.length) {
    titledSuggestions.push({
      title: `Lieferungen (${suggestionsLieferung.length})`,
      suggestions: suggestionsLieferung,
    })
  }
  if (suggestionsPerson.length) {
    titledSuggestions.push({
      title: `Personen (${suggestionsPerson.length})`,
      suggestions: suggestionsPerson,
    })
  }
  if (suggestionsSammlung.length) {
    titledSuggestions.push({
      title: `Sammlungen (${suggestionsSammlung.length})`,
      suggestions: suggestionsSammlung,
    })
  }
  if (suggestionsZaehlung.length) {
    titledSuggestions.push({
      title: `Zählungen (${suggestionsZaehlung.length})`,
      suggestions: suggestionsZaehlung,
    })
  }
  const suggestions = rawSuggestions.length
    ? titledSuggestions
    : loadingSuggestions

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
      case 'Events':
      case 'Zaehlungen':
        newActiveNodeArray = [
          'Kulturen',
          suggestion.parent,
          suggestion.type,
          suggestion.id,
        ]
        break
      default: {
        // do nothing
      }
    }
    store.filter.setShow(false)
    setActiveNodeArray(newActiveNodeArray)
    setVal('')
    navigate(`/Vermehrung/${newActiveNodeArray.join('/')}`)
    // build open nodes
    const newOpenNodes = newActiveNodeArray.map((n, index) =>
      newActiveNodeArray.slice(0, index + 1),
    )
    addOpenNodes(newOpenNodes)
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

  //console.log('Search, val', val)

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
