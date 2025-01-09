import React, { useCallback, useContext, useState, useEffect } from 'react'
import AsyncSelect from 'react-select/async'
import styled from '@emotion/styled'
import { observer } from 'mobx-react-lite'
import { of as $of } from 'rxjs'

import { MobxStoreContext } from '../../../../mobxStoreContext.js'

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

const taxonLabelFromAeArt = (ae_art) => {
  if (!ae_art) return '(kein Name)'

  const name = ae_art.name ?? '(kein Name)'
  const taxonomy = ae_art.taxonomy ?? '(keine Taxonomie)'

  return `${taxonomy}: ${name}`
}

export const TaxonSelect = observer(
  ({ labelSize = 12, art, saveToDb, error: saveToDbError, modelFilter }) => {
    const store = useContext(MobxStoreContext)
    const { db } = store

    const [stateValue, setStateValue] = useState({
      value: art.ae_id || '',
      label: '',
    })
    useEffect(() => {
      const observable =
        art.ae_id ? db.get('ae_art').findAndObserve(art.ae_id) : $of({})
      const subscription = observable.subscribe((record) =>
        setStateValue({
          value: art.ae_id || '',
          label: taxonLabelFromAeArt(record),
        }),
      )

      return () => subscription?.unsubscribe?.()
    }, [db, art])

    const loadOptions = useCallback(
      (inputValue, cb) => {
        const data = modelFilter(inputValue).slice(0, 7)
        const options = data.map((o) => {
          return {
            value: o.id,
            label: taxonLabelFromAeArt(o),
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
            name: 'ae_id',
            value,
          },
        }
        saveToDb(fakeEvent)
      },
      [saveToDb],
    )

    return (
      <Container data-id="ae_id">
        <Label labelsize={labelSize}>Taxon</Label>
        <StyledSelect
          id="ae_id"
          defaultOptions
          name="ae_id"
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
          // using portal because sticky headers would otherwise cover the dropdown
          styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
          menuPortalTarget={document.getElementById('root')}
          aria-label="Taxon"
        />
        {saveToDbError && <Error>{saveToDbError}</Error>}
      </Container>
    )
  },
)
