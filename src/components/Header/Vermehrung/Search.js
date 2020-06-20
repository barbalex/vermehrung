import React, { useCallback, useContext, useMemo, useRef } from 'react'
import { FaSearch } from 'react-icons/fa'
import styled from 'styled-components'
import AsyncSelect from 'react-select/Async'
import Fuse from 'fuse.js'
import { observer } from 'mobx-react-lite'
import Highlighter from 'react-highlight-words'

import { StoreContext } from '../../../models/reactUtils'
import exists from '../../../utils/exists'

const Container = styled.div`
  border-radius: 3px;
  margin-right: 5px;
  width: 250px;
  display: flex;
  justify-content: space-between;
`
const StyledSelect = styled(AsyncSelect)`
  width: 100%;
  .react-select__control:hover {
    background-color: #6625b5 !important;
  }
  .react-select__control:focus-within {
    background-color: #6625b5 !important;
    box-shadow: none;
  }
  .react-select__option--is-focused {
    background-color: rgba(74, 20, 140, 0.1) !important;
  }
`

const SearchIcon = styled(FaSearch)`
  margin: auto 5px;
  margin-right: -25px;
  z-index: 1;
`
const threshold = 0.4

const formatOptionLabel = ({ label }, { inputValue }) => (
  <Highlighter searchWords={[inputValue]} textToHighlight={label} />
)
const formatGroupLabel = (data) => <div>{data.label}</div>
const noOptionsMessage = () => null

const Search = () => {
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
      if (option?.val === 'none') return
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
      if (artSuggestions.length) {
        options.push({
          label: `Arten (${artSuggestions.length})`,
          options: artSuggestions,
        })
      }
      const gartenSuggestionsFuse = new Fuse(searchGartenSuggestions, {
        keys: [
          { name: 'name', weight: 1 },
          { name: 'personname', weight: 0.7 },
          { name: 'bemerkungen', weight: 0.5 },
        ],
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
        keys: [
          { name: 'nr', weight: 1 },
          { name: 'lokalname', weight: 1 },
          { name: 'gemeinde', weight: 0.7 },
          { name: 'kanton', weight: 0.5 },
          { name: 'land', weight: 0.5 },
          { name: 'bemerkungen', weight: 0.5 },
        ],
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
        keys: [
          { name: 'artname', weight: 1 },
          { name: 'gartenname', weight: 1 },
          { name: 'personname', weight: 0.7 },
          { name: 'herkunftnr', weight: 0.7 },
          { name: 'herkunftlokalname', weight: 0.7 },
          { name: 'herkunftgemeinde', weight: 0.7 },
          { name: 'bemerkungen', weight: 0.5 },
        ],
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
        keys: [
          { name: 'artname', weight: 1 },
          { name: 'personname', weight: 1 },
          { name: 'datum', weight: 1 },
          { name: 'sammlungNr', weight: 1 },
          { name: 'sammlungDatum', weight: 0.7 },
          { name: 'sammlungPerson', weight: 0.7 },
          { name: 'sammlungHerkunftNr', weight: 0.7 },
          { name: 'sammlungHerkunftLokalname', weight: 0.7 },
          { name: 'sammlungHerkunftGemeinde', weight: 0.7 },
          { name: 'vonKulturPersonName', weight: 0.7 },
          { name: 'nachKulturPersonName', weight: 0.7 },
          { name: 'ausgepflanzt', weight: 1 },
          { name: 'geplant', weight: 1 },
          { name: 'bemerkungen', weight: 0.5 },
        ],
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
      console.log('Search', { lieferungSuggestions })
      const personSuggestionsFuse = new Fuse(searchPersonSuggestions, {
        keys: [
          { name: 'nr', weight: 1 },
          { name: 'name', weight: 1 },
          { name: 'ort', weight: 0.5 },
          { name: 'email', weight: 0.5 },
          { name: 'bemerkungen', weight: 0.5 },
          { name: 'adresszusatz', weight: 0.5 },
          { name: 'strasse', weight: 0.5 },
          { name: 'plz', weight: 0.5 },
          { name: 'telefon_privat', weight: 0.5 },
          { name: 'telefon_geschaeft', weight: 0.5 },
          { name: 'telefon_mobile', weight: 0.5 },
        ],
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
        keys: [
          { name: 'artname', weight: 0.7 },
          { name: 'personname', weight: 0.7 },
          { name: 'herkunftnr', weight: 0.7 },
          { name: 'herkunftlokalname', weight: 0.7 },
          { name: 'herkunftgemeinde', weight: 0.7 },
          { name: 'nr', weight: 1 },
          { name: 'datum', weight: 1 },
          { name: 'bemerkungen', weight: 0.5 },
        ],
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
        keys: [{ name: 'datum', weight: 1 }],
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
      if (!options.length && val) {
        options.push({ val: 'none', label: '(keine Resultate)' })
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

  const ref = useRef(null)
  const ownWidth = ref?.current?.getBoundingClientRect()?.width
  const maxWidth = (ownWidth ?? 250) + 48 + 48 + 48

  const customStyles = useMemo(
    () => ({
      control: (provided) => ({
        ...provided,
        border: 'none',
        borderRadius: '3px',
        backgroundColor: 'rgba(0, 0, 0, 0)',
        marginLeft: 0,
        paddingLeft: exists(widthEnforced) ? '2px' : '25px',
      }),
      valueContainer: (provided) => ({
        ...provided,
        borderRadius: '3px',
        paddingLeft: 0,
      }),
      singleValue: (provided) => ({
        ...provided,
        color: '#ac87d0',
      }),
      option: (provided) => ({
        ...provided,
        color: 'rgba(0,0,0,0.8)',
        fontSize: '0.8em',
        paddingTop: '3px',
        paddingBottom: '3px',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
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
      menuList: (provided) => ({
        ...provided,
        overflow: 'hidden',
        maxHeight: 'calc(100vh - 60px)',
      }),
      menu: (provided) => ({
        ...provided,
        maxHeight: 'calc(100vh - 60px)',
        width: 'auto',
        maxWidth,
        marginTop: 0,
      }),
      placeholder: (provided) => ({
        ...provided,
        color: '#ac87d0',
      }),
      indicatorSeparator: (provided) => ({
        ...provided,
        display: 'none',
      }),
      dropdownIndicator: (provided) => ({
        ...provided,
        display: 'none',
      }),
      clearIndicator: (provided) => ({
        ...provided,
        color: '#ac87d0',
      }),
    }),
    [maxWidth, widthEnforced],
  )

  return (
    <Container ref={ref}>
      {!exists(widthEnforced) && <SearchIcon />}
      <StyledSelect
        styles={customStyles}
        onChange={onChange}
        formatGroupLabel={formatGroupLabel}
        formatOptionLabel={formatOptionLabel}
        placeholder="suchen"
        noOptionsMessage={noOptionsMessage}
        classNamePrefix="react-select"
        loadOptions={loadOptions}
        isClearable
        spellCheck={false}
      />
    </Container>
  )
}

export default observer(Search)
