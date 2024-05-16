/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useState, useEffect, useContext } from 'react'
import Select from 'react-select/creatable'
import styled from '@emotion/styled'
import { observer } from 'mobx-react-lite'

import StoreContext from '../../storeContext.js'
import Link from './Select/Link.jsx'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 12px;
`
const Label = styled.div`
  font-size: 12px;
  height: 12px !important;
  color: rgb(0, 0, 0, 0.54);
`
const Error = styled.div`
  font-size: 12px;
  color: red;
`
const SelectRow = styled.div`
  display: flex;
  > div {
    width: 100%;
  }
`
const StyledSelect = styled(Select)`
  .react-select__control {
    background-color: rgba(0, 0, 0, 0) !important;
    border-bottom-color: rgba(0, 0, 0, 0.1);
    border-top: none;
    border-left: none;
    border-right: none;
    border-radius: 0;
    min-height: 36px !important;
    height: 36px !important;
  }
  .react-select__control:hover {
    border-bottom-width: 2px;
  }
  .react-select__control:focus-within {
    border-bottom-color: rgba(28, 80, 31, 1) !important;
    box-shadow: none;
  }
  .react-select__value-container {
    padding-left: 0;
  }
  .react-select__indicators {
    @media print {
      display: none;
    }
  }
  .react-select__clear-indicator {
    /* ability to hide caret when not enough space */
    padding-right: ${(props) => (props.nocaret ? '0' : '8px')};
  }
  .react-select__dropdown-indicator {
    /* ability to hide caret when not enough space */
    display: ${(props) => (props.nocaret ? 'none' : 'flex')};
  }
  .react-select__indicator-separator {
    /* ability to hide caret when not enough space */
    width: ${(props) => (props.nocaret ? '0' : '1px')};
  }
  input {
    @media print {
      padding-top: 3px;
      padding-bottom: 0;
    }
  }
  .react-select__menu,
  .react-select__menu-list {
    height: 130px;
    height: ${(props) => (props.maxheight ? `${props.maxheight}px` : 'unset')};
    /* make it open over titlerow (which needs to have z-index 1 to hide text scolling below it)*/
    z-index: 2;
  }
`

const emptyValue = {
  value: '',
  label: '',
}

const SelectCreatable = ({
  field = '',
  label,
  row,
  showFilter,
  table,
  error,
  options,
  loading = false,
  maxHeight = null,
  noCaret = false,
  onCreateNew,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  callback = () => {},
  formatCreateLabel = (val) => `"${val}" als neue Teilkultur aufnehmen`,
}) => {
  const store = useContext(StoreContext)
  const { filter } = store

  const [stateValue, setStateValue] = useState(row[field])
  useEffect(() => {
    setStateValue(row[field])
  }, [])

  const onChange = useCallback(
    (option, actionMeta) => {
      // if action is create-option
      // need to create new dataset
      if (actionMeta.action === 'create-option') {
        // 1. create new dataset
        onCreateNew({ name: option.label })
        return
      }
      const newValue = option ? option.value : null
      setStateValue(newValue)

      if (showFilter) {
        filter.setValue({ table, key: field, value: newValue })
      } else {
        row.edit({ field, value: newValue, store })
      }
      callback()
    },
    [store],
  )

  // show ... whyle options are loading
  const loadingOptions = [{ value: stateValue, label: '...' }]
  const optionsToUse = loading && stateValue ? loadingOptions : options
  const selectValue =
    optionsToUse.find((o) => o.value === stateValue) || emptyValue

  return (
    <Container>
      {label && <Label>{label}</Label>}
      <SelectRow>
        <StyledSelect
          id={field}
          name={field}
          value={selectValue}
          options={optionsToUse}
          onChange={onChange}
          hideSelectedOptions
          placeholder=""
          isClearable
          isSearchable
          noOptionsMessage={() => '(keine)'}
          maxheight={maxHeight}
          classNamePrefix="react-select"
          nocaret={noCaret}
          formatCreateLabel={formatCreateLabel}
          aria-label={label ?? ''}
        />
        {!!selectValue.link && <Link link={selectValue.link} />}
      </SelectRow>
      {error && <Error>{error}</Error>}
    </Container>
  )
}

export default observer(SelectCreatable)
