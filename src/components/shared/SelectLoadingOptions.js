// @flow

/**
 * This does not work as planned:
 * It loads 8 options at mount
 * BUT DOES NOT SHOW THEM WHEN USER ENTERS FIELD
 */

import React, { useCallback, useContext } from 'react'
import AsyncSelect from 'react-select/Async'
import styled from 'styled-components'
import { observer } from 'mobx-react-lite'
import get from 'lodash/get'

import { StoreContext } from '../../models/reactUtils'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 12px;
`
const Label = styled.div`
  font-size: ${(props) => `${props.labelsize}px`};
  color: rgb(0, 0, 0, 0.54);
`
const Error = styled.div`
  font-size: 12px;
  color: red;
`
const StyledSelect = styled(AsyncSelect)`
  .react-select__control {
    background-color: rgba(0, 0, 0, 0) !important;
    border-bottom-color: rgba(0, 0, 0, 0.1);
    border-top: none;
    border-left: none;
    border-right: none;
    border-radius: 0;
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

const SelectTypable = ({
  row,
  valueLabelPath,
  field = '',
  label,
  labelSize = 12,
  error: saveToDbError,
  saveToDb,
  queryName,
  where,
  order_by,
  resultNodesName,
  resultNodesLabelName,
}) => {
  const store = useContext(StoreContext)

  const loadOptions = useCallback(
    async (inputValue, cb) => {
      let result
      try {
        result = await store[queryName]({
          where: where(inputValue),
          order_by,
          limit: 7,
        })
      } catch (error) {
        store.enqueNotification({
          message: error.message,
          options: {
            variant: 'error',
          },
        })
      }
      const options = get(result, resultNodesName, []).map((o) => ({
        value: o.id,
        label: o[resultNodesLabelName],
      }))
      cb(options)
    },
    [order_by, queryName, resultNodesLabelName, resultNodesName, store, where],
  )

  const onChange = useCallback(
    (option) => {
      const value = option && option.value ? option.value : null
      const fakeEvent = {
        target: {
          name: field,
          value,
        },
      }
      saveToDb(fakeEvent)
    },
    [field, saveToDb],
  )

  const value = {
    value: row[field] || '',
    label: get(row, valueLabelPath) || '',
  }

  return (
    <Container data-id={field}>
      {label && <Label labelsize={labelSize}>{label}</Label>}
      <StyledSelect
        id={field}
        defaultOptions
        name={field}
        onChange={onChange}
        value={value}
        hideSelectedOptions
        placeholder=""
        isClearable
        isSearchable
        // remove as can't select without typing
        nocaret
        // don't show a no options message if a value exists
        noOptionsMessage={() =>
          value.value ? null : '(Bitte Tippen für Vorschläge)'
        }
        // enable deleting typed values
        backspaceRemovesValue
        classNamePrefix="react-select"
        loadOptions={loadOptions}
        openMenuOnFocus
      />
      {saveToDbError && <Error>{saveToDbError}</Error>}
    </Container>
  )
}

export default observer(SelectTypable)
