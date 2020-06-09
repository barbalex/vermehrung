import React, { useState, useCallback, useContext, useRef } from 'react'
import ReactDOM from 'react-dom'
import { FaSearch, FaTimes } from 'react-icons/fa'
import styled from 'styled-components'
import Autosuggest from 'react-autosuggest'
import match from 'autosuggest-highlight/match'
import parse from 'autosuggest-highlight/parse'
import moment from 'moment'

import { StoreContext, useQuery } from '../../../../models/reactUtils'
import exists from '../../../../utils/exists'
import filterSuggestionsQuery from './filterSuggestionsQuery'

const formatDatum = (datum) =>
  datum ? moment(datum, 'YYYY-MM-DD').format('YYYY.MM.DD') : '(kein Datum)'

const Container = styled.div`
  border-radius: 3px;
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
`
const SearchIcon = styled(FaSearch)`
  margin: auto 5px;
`
const DelIcon = styled(FaTimes)`
  margin: auto 5px;
  opacity: ${(props) => (props['data-active'] ? 1 : 0.4)};
  cursor: ${(props) => (props['data-active'] ? 'pointer' : 'default')};
`

const loadingSuggestions = [
  {
    title: 'Lade Daten...',
    suggestions: [
      {
        id: 'none',
        name: '',
        type: 'Arten',
      },
    ],
  },
]
const getSuggestionValue = (suggestion) => suggestion && suggestion.name
const shouldRenderSuggestions = (value) =>
  value && value.trim && value.trim().length > 1
const renderSectionTitle = (section) => <strong>{section.title}</strong>
const getSectionSuggestions = (section) => section.suggestions

export default () => {
  if (typeof window === 'undefined') return null
  const store = useContext(StoreContext)
  const { personFilter, gartenFilter, kulturFilter } = store
  const { setActiveNodeArray, widthEnforced } = store.tree
  const [val, setVal] = useState('')

  const [focused, setFocused] = useState(false)
  const onFocus = useCallback(() => setFocused(true), [])
  const onBlur = useCallback(() => setFocused(false), [])
  const asRef = useRef(null)

  const { data } = useQuery(filterSuggestionsQuery, {
    variables: {
      run: !!val,
      filter: val,
      personFilter,
      gartenFilter,
      kulturFilter,
    },
  })

  const suggestionsArt = (data?.art ?? []).map((o) => ({
    id: o.id,
    name: o?.art_ae_art?.name ?? '(kein Artname)',
    type: 'Arten',
  }))
  const suggestionsGarten = (data?.garten ?? []).map((o) => ({
    id: o.id,
    name: o.name || `(${o?.person?.name ?? 'kein Name'})`,
    type: 'Gaerten',
  }))
  const suggestionsHerkunft = (data?.herkunft ?? []).map((o) => ({
    id: o.id,
    name: `${o?.nr ?? '(keine Nr)'}: ${o?.gemeinde ?? '(keine Gemeinde)'}, ${
      o?.lokalname ?? '(kein Lokalname)'
    }`,
    type: 'Herkuenfte',
  }))
  const suggestionsKultur = (data?.kultur ?? []).map((o) => ({
    id: o.id,
    name: o?.garten?.person?.name ?? '(kein Name)',
    type: 'Kulturen',
  }))
  const suggestionsEvent = (data?.event ?? []).map((o) => ({
    id: o.id,
    name: `${formatDatum(o.datum)}: ${
      o?.beschreibung ?? '(nicht beschrieben)'
    }`,
    type: 'Events',
    parent: o.kultur_id,
  }))
  const suggestionsLieferung = (data?.lieferung ?? []).map((o) => ({
    id: o.id,
    name: o.datum
      ? moment(o.datum, 'YYYY-MM-DD').format('YYYY.MM.DD')
      : '(kein Datum)',
    type: 'Lieferungen',
  }))
  const suggestionsPerson = (data?.person ?? []).map((o) => ({
    id: o.id,
    name: o?.name ?? '(kein Name)',
    type: 'Personen',
  }))
  const suggestionsSammlung = (data?.sammlung ?? []).map((o) => ({
    id: o.id,
    name: `${o?.nr ?? '(keine Nr)'}: ${formatDatum(o.datum)}`,
    type: 'Sammlungen',
  }))
  const suggestionsZaehlung = (data?.zaehlung ?? []).map((o) => ({
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

  const onChange = useCallback((event) => setVal(event.target.value), [])
  const onClickDel = useCallback(() => setVal(''), [])
  const onSuggestionSelected = useCallback(
    (event, { suggestion }) => {
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
    },
    [setActiveNodeArray, store.filter],
  )
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
  }, [])

  // see: https://github.com/moroshko/react-autosuggest/issues/699#issuecomment-568798287
  const renderSuggestionsContainerPopper = useCallback(
    ({ containerProps, children }) => {
      if (focused && suggestions.length) {
        const inputCoords = asRef.current
          ? asRef.current.input.getBoundingClientRect()
          : {}
        const style = {
          position: 'absolute',
          left: inputCoords.left - 29 + window.scrollX, // adding scrollX and scrollY to get the coords wrt document instead of viewport
          top: inputCoords.top + 34 + window.scrollY,
          overflowY: 'auto',
          zIndex: 3,
          boxShadow: '3px 3px 3px rgba(74, 20, 140, 0.1)',
          width: inputCoords.width + 57,
          border: '1px solid #4a148c',
          backgroundColor: '#fff',
          fontFamily: 'Helvetica, sans-serif',
          fontSize: '14px',
          borderBottomLeftRadius: '4px',
          borderBottomRightRadius: '4px',
          maxHeight: 'calc(100vh - 60px)',
        }
        return ReactDOM.createPortal(
          <div {...containerProps} style={style}>
            {children}
          </div>,
          document.body,
        )
      }
      return null
    },
    [focused, suggestions.length],
  )

  return (
    <Container>
      {!exists(widthEnforced) && <SearchIcon />}
      <div onFocus={onFocus} onBlur={onBlur}>
        <Autosuggest
          ref={asRef}
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
          renderSuggestionsContainer={renderSuggestionsContainerPopper}
          multiSection={true}
          renderSectionTitle={renderSectionTitle}
          getSectionSuggestions={getSectionSuggestions}
          inputProps={inputProps}
          focusInputOnSuggestionClick={false}
        />
      </div>
      <DelIcon data-active={!!val} onClick={onClickDel} />
    </Container>
  )
}
