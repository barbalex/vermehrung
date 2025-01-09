import React, { useCallback, useContext, useMemo, useRef } from 'react'
import { FaSearch } from 'react-icons/fa'
import styled from '@emotion/styled'
import Select from 'react-select/async'
import { observer } from 'mobx-react-lite'
import Highlighter from 'react-highlight-words'
import { useDebouncedCallback } from 'use-debounce'

import StoreContext from '../../../../mobxStoreContext.js'
import buildOptions from './buildOptions.js'

const Container = styled.div`
  border-radius: 3px;
  margin-right: 5px;
  width: 250px;
  display: flex;
  justify-content: space-between;
`
const StyledSelect = styled(Select)`
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

const formatOptionLabel = ({ label }, { inputValue }) => (
  <Highlighter searchWords={[inputValue]} textToHighlight={label} />
)
const formatGroupLabel = (data) => <div>{data.label}</div>
const noOptionsMessage = () => null
const loadingMessage = () => null

const Search = () => {
  const store = useContext(StoreContext)
  const { filter, singleColumnView } = store
  const { setActiveNodeArray } = store.tree

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
      filter.setShow(false)
      setActiveNodeArray(newActiveNodeArray)
    },
    [setActiveNodeArray, filter],
  )

  const buildOptionsDebounced = useDebouncedCallback(({ cb, val }) => {
    buildOptions({ store, cb, val })
  }, 600)
  const loadOptions = useCallback(
    (val, cb) => {
      buildOptionsDebounced({ cb, val })
    },
    [buildOptionsDebounced],
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
        paddingLeft: singleColumnView ? '2px' : '25px',
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
        fontWeight: '700',
        userSelect: 'none',
        textTransform: 'none',
      }),
      input: (provided) => ({
        ...provided,
        color: 'white',
      }),
      menuList: (provided) => ({
        ...provided,
        maxHeight: 'calc(100dvh - 60px)',
      }),
      menu: (provided) => ({
        ...provided,
        maxHeight: 'calc(100dvh - 60px)',
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
    [maxWidth, singleColumnView],
  )

  return (
    <Container ref={ref}>
      {!singleColumnView && <SearchIcon />}
      <StyledSelect
        styles={customStyles}
        onChange={onChange}
        formatGroupLabel={formatGroupLabel}
        formatOptionLabel={formatOptionLabel}
        placeholder="suchen"
        noOptionsMessage={noOptionsMessage}
        loadingMessage={loadingMessage}
        classNamePrefix="react-select"
        loadOptions={loadOptions}
        isClearable
        spellCheck={false}
        aria-label="suchen"
      />
    </Container>
  )
}

export default observer(Search)
