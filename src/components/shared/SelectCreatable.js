/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useContext } from 'react'
import gql from 'graphql-tag'
import get from 'lodash/get'
import Select from 'react-select/creatable'
import styled from 'styled-components'
import { useApolloClient } from '@apollo/react-hooks'

import { StoreContext } from '../../models/reactUtils'

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

const SharedSelect = ({
  value,
  field = '',
  label,
  name,
  error,
  options,
  loading,
  maxHeight = null,
  noCaret = false,
  saveToDb,
  table,
  creatablePropertiesToPass = {},
  creatablePropertyName,
  creatableIdField,
  callback,
}) => {
  const client = useApolloClient()
  const store = useContext(StoreContext)
  const { addNotification } = store
  const { refetch: refetchTree } = store.tree

  const onChange = useCallback(
    async (option, actionMeta) => {
      // if action is create-option
      // need to first create new dataset
      if (actionMeta.action === 'create-option') {
        // 1. create new dataset
        let responce
        try {
          const propertiesToPass = Object.entries(creatablePropertiesToPass)
            .map(([key, value]) => `${key}: ${value}`)
            .join(', ')
          responce = await client.mutate({
            mutation: gql`
            mutation insertDatasetForSelectCreatable {
              insert_${table} (objects: [{${creatablePropertyName}: "${option.label}", ${propertiesToPass}}]) {
                returning { id }
              }
            }
          `,
          })
        } catch (error) {
          return addNotification({
            message: `Error inserting dataset: ${error.message}`,
          })
        }
        const newObject = get(responce, `data.insert_${table}.returning`, [])[0]
        if (newObject && newObject.id) {
          // 2. update value using new id
          const fakeEvent = {
            target: {
              name,
              value: newObject.id,
            },
          }
          saveToDb(fakeEvent)
        }
        !!callback && callback()
        refetchTree()
        return
      }
      // now update value
      const fakeEvent = {
        target: {
          name,
          value: option ? option.value : null,
        },
      }
      saveToDb(fakeEvent)
    },
    [
      client,
      creatableIdField,
      creatablePropertiesToPass,
      creatablePropertyName,
      addNotification,
      name,
      saveToDb,
      table,
    ],
  )

  // show ... whyle options are loading
  const loadingOptions = [{ value, label: '...' }]
  const optionsToUse = loading && value ? loadingOptions : options
  const selectValue = optionsToUse.find((o) => o.value === value) || emptyValue

  return (
    <Container>
      {label && <Label>{label}</Label>}
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
        formatCreateLabel={(val) => `"${val}" als neue Teilkultur aufnehmen`}
      />
      {error && <Error>{error}</Error>}
    </Container>
  )
}

export default SharedSelect
