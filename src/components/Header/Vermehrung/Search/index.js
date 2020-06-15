import React, { useState, useCallback, useContext, useRef } from 'react'
import ReactDOM from 'react-dom'
import { FaSearch, FaTimes } from 'react-icons/fa'
import styled from 'styled-components'
import Autosuggest from 'react-autosuggest'
import match from 'autosuggest-highlight/match'
import parse from 'autosuggest-highlight/parse'
import Fuse from 'fuse.js'

import { StoreContext } from '../../../../models/reactUtils'
import exists from '../../../../utils/exists'

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
    z-index: 1200;
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

const getSuggestionValue = (suggestion) => suggestion && suggestion.name
const shouldRenderSuggestions = (value) =>
  value && value.trim && value.trim().length > 1
const renderSectionTitle = (section) => <strong>{section.title}</strong>
const getSectionSuggestions = (section) => section.suggestions

export default () => {
  if (typeof window === 'undefined') return null
  const store = useContext(StoreContext)
  const {
    searchArtSuggestions,
    searchGartenSuggestions,
    searchHerkunftSuggestions,
    searchKulturSuggestions,
    searchEventSuggestions,
    searchLieferungSuggestions,
    searchPersonSuggestions,
    searchSammlungSuggestions,
    searchZaehlungSuggestions,
  } = store
  const { setActiveNodeArray, widthEnforced } = store.tree
  const [val, setVal] = useState('')

  const [focused, setFocused] = useState(false)
  const onFocus = useCallback(() => setFocused(true), [])
  const onBlur = useCallback(() => setFocused(false), [])
  const asRef = useRef(null)

  const suggestions = []
  const artSuggestionsFuse = new Fuse(searchArtSuggestions, { keys: ['name'] })
  const artSuggestions = artSuggestionsFuse.search(val).map((o) => o.item)
  if (artSuggestions.length) {
    suggestions.push({
      title: `Arten (${artSuggestions.length})`,
      suggestions: artSuggestions,
    })
  }
  const gartenSuggestionsFuse = new Fuse(searchGartenSuggestions, {
    keys: ['name'],
  })
  const gartenSuggestions = gartenSuggestionsFuse.search(val).map((o) => o.item)
  if (gartenSuggestions.length) {
    suggestions.push({
      title: `Gärten (${gartenSuggestions.length})`,
      suggestions: gartenSuggestions,
    })
  }
  const herkunftSuggestionsFuse = new Fuse(searchHerkunftSuggestions, {
    keys: ['name'],
  })
  const herkunftSuggestions = herkunftSuggestionsFuse
    .search(val)
    .map((o) => o.item)
  if (herkunftSuggestions.length) {
    suggestions.push({
      title: `Herkünfte (${herkunftSuggestions.length})`,
      suggestions: herkunftSuggestions,
    })
  }
  const kulturSuggestionsFuse = new Fuse(searchKulturSuggestions, {
    keys: ['name'],
  })
  const kulturSuggestions = kulturSuggestionsFuse.search(val).map((o) => o.item)
  if (kulturSuggestions.length) {
    suggestions.push({
      title: `Kulturen (${kulturSuggestions.length})`,
      suggestions: kulturSuggestions,
    })
  }
  const eventSuggestionsFuse = new Fuse(searchEventSuggestions, {
    keys: ['name'],
  })
  const eventSuggestions = eventSuggestionsFuse.search(val).map((o) => o.item)
  if (eventSuggestions.length) {
    suggestions.push({
      title: `Events (${eventSuggestions.length})`,
      suggestions: eventSuggestions,
    })
  }
  const lieferungSuggestionsFuse = new Fuse(searchLieferungSuggestions, {
    keys: ['name'],
  })
  const lieferungSuggestions = lieferungSuggestionsFuse
    .search(val)
    .map((o) => o.item)
  if (lieferungSuggestions.length) {
    suggestions.push({
      title: `Lieferungen (${lieferungSuggestions.length})`,
      suggestions: lieferungSuggestions,
    })
  }
  const personSuggestionsFuse = new Fuse(searchPersonSuggestions, {
    keys: ['name'],
  })
  const personSuggestions = personSuggestionsFuse.search(val).map((o) => o.item)
  if (personSuggestions.length) {
    suggestions.push({
      title: `Personen (${personSuggestions.length})`,
      suggestions: personSuggestions,
    })
  }
  const sammlungSuggestionsFuse = new Fuse(searchSammlungSuggestions, {
    keys: ['name'],
  })
  const sammlungSuggestions = sammlungSuggestionsFuse
    .search(val)
    .map((o) => o.item)
  if (sammlungSuggestions.length) {
    suggestions.push({
      title: `Sammlungen (${sammlungSuggestions.length})`,
      suggestions: sammlungSuggestions,
    })
  }
  const zaehlungSuggestionsFuse = new Fuse(searchZaehlungSuggestions, {
    keys: ['name'],
  })
  const zaehlungSuggestions = zaehlungSuggestionsFuse
    .search(val)
    .map((o) => o.item)
  if (zaehlungSuggestions.length) {
    suggestions.push({
      title: `Zählungen (${zaehlungSuggestions.length})`,
      suggestions: zaehlungSuggestions,
    })
  }

  console.log('Search', { suggestions, val })

  const onChange = useCallback((event) => setVal(event.target.value), [])
  const onClickDel = useCallback(() => setVal(''), [])
  const onSuggestionSelected = useCallback(
    (event, { suggestion }) => {
      console.log('Search, onSuggestionSelected', { suggestion })
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
