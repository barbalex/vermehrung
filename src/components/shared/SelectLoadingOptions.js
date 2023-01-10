import React, { useCallback, useContext, useState, useEffect } from 'react'
import AsyncSelect from 'react-select/async'
import styled from '@emotion/styled'
import { observer } from 'mobx-react-lite'
import { of as $of } from 'rxjs'

import StoreContext from '../../storeContext'
import artLabelFromAeArt from '../../utils/artLabelFromAeArt'

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
    border-bottom-color: #4a148c !important;
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

const SelectLoadingOptions = ({
  field = '',
  label,
  labelSize = 12,
  row,
  saveToDb,
  error: saveToDbError,
  modelFilter = () => true,
  labelTable,
  labelField,
}) => {
  const store = useContext(StoreContext)
  const { db } = store

  const [stateValue, setStateValue] = useState({
    value: row[field] || '',
    label: '',
  })
  useEffect(() => {
    const observable =
      labelTable && row[field]
        ? db.get(labelTable).findAndObserve(row[field])
        : $of({})
    const subscription = observable.subscribe((record) =>
      setStateValue({
        value: row[field] || '',
        label: record[labelField] ?? '',
      }),
    )

    return () => subscription?.unsubscribe?.()
  }, [db, field, labelField, labelTable, row])

  const loadOptions = useCallback(
    (inputValue, cb) => {
      const data = modelFilter(inputValue).slice(0, 7)
      const options = data.map((o) => {
        return {
          value: o.id,
          label: artLabelFromAeArt({ ae_art: o }),
        }
      })
      cb(options)
    },
    [modelFilter],
  )

  const onChange = useCallback(
    (option) => {
      const value = option && option.value ? option.value : null
      setStateValue(value ?? '')
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

  return (
    <Container data-id={field}>
      {label && <Label labelsize={labelSize}>{label}</Label>}
      <StyledSelect
        id={field}
        defaultOptions
        name={field}
        onChange={onChange}
        value={stateValue}
        hideSelectedOptions
        placeholder=""
        isClearable
        isSearchable
        // remove as can't select without typing
        nocaret
        // don't show a no options message if a value exists
        noOptionsMessage={() =>
          stateValue.value ? null : '(Bitte Tippen für Vorschläge)'
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

export default observer(SelectLoadingOptions)
