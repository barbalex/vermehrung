import React, { useCallback, useContext } from 'react'
import { FaSearch } from 'react-icons/fa'
import styled from 'styled-components'
import AsyncSelect from 'react-select/Async'
import Fuse from 'fuse.js'

import { StoreContext } from '../../../../models/reactUtils'
import exists from '../../../../utils/exists'

// TODO: use https://material-ui.com/components/autocomplete/#grouped

const Container = styled.div`
  border-radius: 3px;
  margin-right: 5px;
  width: 250px;
  display: flex;
  justify-content: space-between;
`
const StyledSelect = styled(AsyncSelect)`
  width: 100%;
  .react-select__control {
    background-color: rgba(0, 0, 0, 0) !important;
    border-bottom-color: rgba(0, 0, 0, 0.1);
    border-top: none;
    border-left: none;
    border-right: none;
    border-radius: 0;
    /*min-height: 36px !important;
    height: 36px !important;*/
  }
  .react-select__control:hover {
    border-bottom-width: 2px;
    background-color: #4a148c !important;
  }
  .react-select__control:focus-within {
    border-bottom-color: #4a148c !important;
    box-shadow: none;
  }
  .react-select__value-container {
    padding-left: 0;
  }
  .react-select__option--is-focused {
    background-color: rgba(74, 20, 140, 0.1) !important;
  }
  .react-select__dropdown-indicator {
    display: none;
  }
  .react-select__indicator-separator {
    display: none;
  }
`
const OldUpSelect = styled(AsyncSelect)`
  width: 100%;
  .react-select__clear-indicator {
    /* ability to hide caret when not enough space */
    padding-right: ${(props) => (props.nocaret ? '0' : '8px')};
  }
`

const customStyles = {
  option: (provided) => ({
    ...provided,
    color: 'rgba(0,0,0,0.8)',
    fontSize: '0.8em',
    paddingTop: '3px',
    paddingBottom: '3px',
  }),
  groupHeading: (provided) => ({
    ...provided,
    lineHeight: '1em',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    color: 'rgba(0, 0, 0, 0.8)',
    fontWeight: '800',
    userSelect: 'none',
    textTransform: 'none',
  }),
  input: (provided) => ({
    ...provided,
    color: 'white',
  }),
  menu: (provided) => ({
    ...provided,
    maxHeight: 'calc(100vh - 60px)',
    left: '-30px',
    width: '250px',
    marginTop: 0,
  }),
  menuList: (provided) => ({
    ...provided,
    maxHeight: 'calc(100vh - 60px)',
  }),
}
const SearchIcon = styled(FaSearch)`
  margin: auto 5px;
`
const threshold = 0.4

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
  const { widthEnforced, setActiveNodeArray } = store.tree

  const onChange = useCallback(
    (option) => {
      if (!option) return
      let newActiveNodeArray
      // use option.value to set url
      switch (option?.type) {
        case 'Arten':
        case 'Gaerten':
        case 'Herkuenfte':
        case 'Lieferungen':
        case 'Personen':
        case 'Sammlungen':
        case 'Kulturen':
          newActiveNodeArray = [option?.type, option?.value]
          break
        case 'Events': {
          if (option?.parent) {
            newActiveNodeArray = [
              'Kulturen',
              option?.parent,
              option?.type,
              option?.value,
            ]
          } else if (!option.parent) {
            newActiveNodeArray = [option?.type, option?.value]
          }
          break
        }
        case 'Zaehlungen': {
          if (option?.parent) {
            newActiveNodeArray = [
              'Kulturen',
              option?.parent,
              option?.type,
              option?.value,
            ]
          } else if (!option.parent) {
            newActiveNodeArray = [option?.type, option?.value]
          }
          break
        }
        default: {
          // do nothing
        }
      }
      store.filter.setShow(false)
      //console.log('Search', { newActiveNodeArray, option })
      setActiveNodeArray(newActiveNodeArray)
    },
    [setActiveNodeArray, store.filter],
  )

  const loadOptions = useCallback(
    (val, cb) => {
      const options = []
      const artSuggestionsFuse = new Fuse(searchArtSuggestions, {
        keys: ['label'],
        threshold,
      })
      const artSuggestions = artSuggestionsFuse.search(val).map((o) => o.item)
      console.log('Search, artSuggestions:', artSuggestions)
      if (artSuggestions.length) {
        options.push({
          label: `Arten (${artSuggestions.length})`,
          options: artSuggestions,
        })
      }
      const gartenSuggestionsFuse = new Fuse(searchGartenSuggestions, {
        keys: ['label'],
        threshold,
      })
      const gartenSuggestions = gartenSuggestionsFuse
        .search(val)
        .map((o) => o.item)
      if (gartenSuggestions.length) {
        options.push({
          label: `Gärten (${gartenSuggestions.length})`,
          options: gartenSuggestions,
        })
      }
      const herkunftSuggestionsFuse = new Fuse(searchHerkunftSuggestions, {
        keys: ['label'],
        threshold,
      })
      const herkunftSuggestions = herkunftSuggestionsFuse
        .search(val)
        .map((o) => o.item)
      if (herkunftSuggestions.length) {
        options.push({
          label: `Herkünfte (${herkunftSuggestions.length})`,
          options: herkunftSuggestions,
        })
      }
      const kulturSuggestionsFuse = new Fuse(searchKulturSuggestions, {
        keys: ['label'],
        threshold,
      })
      const kulturSuggestions = kulturSuggestionsFuse
        .search(val)
        .map((o) => o.item)
      if (kulturSuggestions.length) {
        options.push({
          label: `Kulturen (${kulturSuggestions.length})`,
          options: kulturSuggestions,
        })
      }
      const eventSuggestionsFuse = new Fuse(searchEventSuggestions, {
        keys: ['label'],
        threshold,
      })
      const eventSuggestions = eventSuggestionsFuse
        .search(val)
        .map((o) => o.item)
      if (eventSuggestions.length) {
        options.push({
          label: `Events (${eventSuggestions.length})`,
          options: eventSuggestions,
        })
      }
      const lieferungSuggestionsFuse = new Fuse(searchLieferungSuggestions, {
        keys: ['label'],
        threshold,
      })
      const lieferungSuggestions = lieferungSuggestionsFuse
        .search(val)
        .map((o) => o.item)
      if (lieferungSuggestions.length) {
        options.push({
          label: `Lieferungen (${lieferungSuggestions.length})`,
          options: lieferungSuggestions,
        })
      }
      const personSuggestionsFuse = new Fuse(searchPersonSuggestions, {
        keys: ['label'],
        threshold,
      })
      const personSuggestions = personSuggestionsFuse
        .search(val)
        .map((o) => o.item)
      if (personSuggestions.length) {
        options.push({
          label: `Personen (${personSuggestions.length})`,
          options: personSuggestions,
        })
      }
      const sammlungSuggestionsFuse = new Fuse(searchSammlungSuggestions, {
        keys: ['label'],
        threshold,
      })
      const sammlungSuggestions = sammlungSuggestionsFuse
        .search(val)
        .map((o) => o.item)
      if (sammlungSuggestions.length) {
        options.push({
          label: `Sammlungen (${sammlungSuggestions.length})`,
          options: sammlungSuggestions,
        })
      }
      const zaehlungSuggestionsFuse = new Fuse(searchZaehlungSuggestions, {
        keys: ['label'],
        threshold,
      })
      const zaehlungSuggestions = zaehlungSuggestionsFuse
        .search(val)
        .map((o) => o.item)
      if (zaehlungSuggestions.length) {
        options.push({
          label: `Zählungen (${zaehlungSuggestions.length})`,
          options: zaehlungSuggestions,
        })
      }
      cb(options)
    },
    [
      searchArtSuggestions,
      searchEventSuggestions,
      searchGartenSuggestions,
      searchHerkunftSuggestions,
      searchKulturSuggestions,
      searchLieferungSuggestions,
      searchPersonSuggestions,
      searchSammlungSuggestions,
      searchZaehlungSuggestions,
    ],
  )

  return (
    <Container>
      {!exists(widthEnforced) && <SearchIcon />}
      <StyledSelect
        styles={customStyles}
        onChange={onChange}
        formatGroupLabel={(data) => <div>{data.label}</div>}
        placeholder="suchen"
        spellCheck={false}
        noOptionsMessage={() => null}
        classNamePrefix="react-select"
        loadOptions={loadOptions}
        isClearable
      />
    </Container>
  )
}
