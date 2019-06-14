/**
 * for unknown reason need to set null
 * if set '' (as React wants) value is shown and set as Unknown :-(
 * setting null of cours makes react log errors
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
      // value is masked "__.__.__"
      const value = valuePassed
        .replace('_.__.__', '')
        .replace('.__.__', '')
        .replace('__.__', '')
        .replace('_.__', '')
        .replace('.__', '')
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
       * would prefer to use data-fns for this but is not yet possible, see:
       * https://github.com/date-fns/date-fns/issues/219
       *
       * Actually: moment not only parses the date. Which data-fns v2 can.
       * It also gets "3", "3.1", 3.1.17" and adds missing month / year from now
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
        format="DD.MM.YYYY"
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
