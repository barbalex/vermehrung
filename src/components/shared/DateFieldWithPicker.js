/**
 * using both date-fns and moment.js
 * because wanted to migrate to date-fns
 * but realized that still need moment.js
 * to enalbe lazy input of date in textfield
 */
import React, { useEffect, useState, useCallback } from 'react'
import { KeyboardDatePicker } from '@material-ui/pickers'
import FormHelperText from '@material-ui/core/FormHelperText'
import moment from 'moment'
import format from 'date-fns/format'
import isValid from 'date-fns/isValid'
import styled from 'styled-components'
import { observer } from 'mobx-react-lite'

const StyledDatePicker = styled(KeyboardDatePicker)`
  padding-bottom: 19px !important;
  > div:before {
    border-bottom-color: rgba(0, 0, 0, 0.1) !important;
  }
  @media print {
    button {
      display: none;
    }
  }
`
const StyledFormHelperText = styled(FormHelperText)`
  margin-top: -10px !important;
  margin-bottom: ${props => (props.active ? '10px !important' : '0')};
`

const DateFieldWithPicker = ({
  label,
  name,
  value: propsValue,
  saveToDb,
  error,
}) => {
  const [stateValue, setStateValue] = useState(
    isValid(propsValue) ? propsValue : null,
  )
  const [internalError, setInternalError] = useState(null)

  const onChange = useCallback(
    (datePassed, valuePassed) => setStateValue(valuePassed),
    [name],
  )

  const onAccept = useCallback(
    datePassed => {
      if (!moment(datePassed).isValid()) {
        const fakeEvent = { target: { value: null, name } }
        return saveToDb(fakeEvent)
      }
      const newValue = format(new Date(datePassed), 'yyyy-MM-dd')
      const fakeEvent = { target: { value: newValue, name } }
      saveToDb(fakeEvent)
      setInternalError(null)
    },
    [name],
  )
  const onBlur = useCallback(
    event => {
      const { value: valuePassed } = event.target
      // value is masked "_._.____"
      // remove masking to enable working with moment
      const value = valuePassed
        .replace('._.____', '')
        .replace('_.____', '')
        .replace('.____', '')
        .replace('____', '')
        .replace('___', '')
        .replace('__', '')
        .replace('_', '')
      // do not change anything if there are no values
      // test validity using moment because date-fns isValid('1') is false
      if (!moment(value).isValid()) {
        if (value) setInternalError(`"${value}" ist kein zulässiges Datum`)
        const fakeEvent = { target: { value: null, name } }
        saveToDb(fakeEvent)
        return setStateValue(null)
      }

      // write a real date to db
      /**
       * create new data using moment to enable shortcutting inputs
       * moment not only parses the date. It also adds missing parts from now():
       * for instance if entering data on 01.01.2020:
       * 3      => 03.01.2020
       * 3.2    => 03.02.2020
       * 3.2.17 => 03.02.2017
       * This is great and not possible with date-fns?
       * https://github.com/date-fns/date-fns/issues/219#issuecomment-424090895
       */
      const date = new Date(moment(value, 'DD.MM.YYYY').format('YYYY-MM-DD'))
      const newValue = format(date, 'yyyy-MM-dd')
      const fakeEvent = { target: { value: newValue, name } }
      saveToDb(fakeEvent)
      setStateValue(newValue)
      setInternalError(null)
    },
    [name],
  )

  useEffect(() => {
    setStateValue(propsValue)
  }, [propsValue])
  useEffect(() => {
    setInternalError(null)
  }, [name])

  const onKeyPress = useCallback(event => {
    if (event.key === 'Enter') {
      saveToDb(event)
    }
  })

  return (
    <>
      <StyledDatePicker
        label={label}
        format="D.M.YYYY"
        value={stateValue}
        onChange={onChange}
        onAccept={onAccept}
        onBlur={onBlur}
        onKeyPress={onKeyPress}
        animateYearScrolling={false}
        mask=""
        autoOk
        clearable={true}
        clearLabel="leeren"
        // remove message because dont want it when user
        // enters only day and maybe month
        // need a value because seems that too expects one
        invalidDateMessage=" "
        cancelLabel="schliessen"
        okLabel="speichern"
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
      />
      {(!!error || internalError) && (
        <StyledFormHelperText
          id={`${label}ErrorText`}
          error
          active={error || internalError}
        >
          {error || internalError}
        </StyledFormHelperText>
      )}
    </>
  )
}

export default observer(DateFieldWithPicker)
