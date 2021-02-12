import React, { useCallback, useState, useEffect, useContext } from 'react'
import Select from 'react-select'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import FormHelperText from '@material-ui/core/FormHelperText'
import styled from 'styled-components'

import StoreContext from '../../storeContext'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 19px;
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
const StyledInputLabel = styled(InputLabel)`
  margin-top: 5px;
  font-weight: ${(props) => props['data-weight']} !important;
`

const emptyValue = {
  value: '',
  label: '',
}

const SharedSelect = ({
  value: valuePassed,
  field = '',
  label,
  name,
  error,
  helperText,
  options,
  loading = false,
  maxHeight = null,
  isClearable = true,
  noCaret = false,
  saveToDb,
}) => {
  const store = useContext(StoreContext)
  const showFilter = store.filter.show
  const [stateValue, setStateValue] = useState(valuePassed)
  const [textValue, setTextValue] = useState('')
  useEffect(() => {
    setStateValue(valuePassed)
  }, [valuePassed])

  const onChange = useCallback(
    (option) => {
      const newValue = option ? option.value : null
      setStateValue(newValue)
      const fakeEvent = {
        target: {
          name,
          value: newValue,
        },
      }
      saveToDb(fakeEvent)
    },
    [name, saveToDb],
  )

  const onChangeText = useCallback(
    (event) => {
      const value = event.target.value
      setTextValue(value)
      const fakeEvent = {
        target: {
          name: name.replace('_id', '_name'),
          value,
        },
      }
      saveToDb(fakeEvent)
      console.log('onChangeText:', { value, name })
    },
    [name, saveToDb],
  )

  // show ... whyle options are loading
  const loadingOptions = [{ value: stateValue, label: '...' }]
  const optionsToUse = loading && valuePassed ? loadingOptions : options
  const selectValue =
    optionsToUse.find((o) => o.value === valuePassed) || emptyValue

  if (showFilter) {
    // TODO: return group to enable searching by text
    // TODO: need to adjust filter store for this to work
    return (
      <Container>
        {label && <Label>{`${label} (wählen)`}</Label>}
        <StyledSelect
          id={field}
          name={field}
          value={selectValue}
          options={optionsToUse}
          onChange={onChange}
          hideSelectedOptions
          placeholder=""
          isClearable={isClearable}
          isSearchable
          noOptionsMessage={() => '(keine)'}
          maxheight={maxHeight}
          classNamePrefix="react-select"
          nocaret={noCaret}
        />
        <StyledInputLabel htmlFor={label} shrink={true} data-weight={400}>
          {`${label} (nach Textinhalt)`}
        </StyledInputLabel>
        <Input
          id={label}
          name={name.replace('_id', '_name')}
          //value={textValue}
          type="text"
          onBlur={onChangeText}
        />
        {error && <Error>{error}</Error>}
        {!!helperText && <FormHelperText>{helperText}</FormHelperText>}
      </Container>
    )
  }

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
        isClearable={isClearable}
        isSearchable
        noOptionsMessage={() => '(keine)'}
        maxheight={maxHeight}
        classNamePrefix="react-select"
        nocaret={noCaret}
      />
      {error && <Error>{error}</Error>}
      {!!helperText && <FormHelperText>{helperText}</FormHelperText>}
    </Container>
  )
}

export default SharedSelect
