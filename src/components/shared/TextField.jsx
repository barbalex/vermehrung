import React, { useState, useCallback, useEffect } from 'react'
import Input from '@mui/material/Input'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import styled from '@emotion/styled'
import { observer } from 'mobx-react-lite'

const StyledFormControl = styled(FormControl)`
  padding-bottom: 19px !important;
  > div:before {
    border-bottom-color: rgba(0, 0, 0, 0.1) !important;
  }
`
const StyledInputLabel = styled(InputLabel)`
  font-weight: ${(props) => props['data-weight']} !important;
`

export const TextField = observer(
  ({
    value,
    label,
    labelWeight = 400,
    name,
    type = 'text',
    multiLine = false,
    disabled = false,
    hintText = '',
    helperText = '',
    error,
    saveToDb,
    schrinkLabel = true,
  }) => {
    const [stateValue, setStateValue] = useState(
      value || value === 0 ? value : '',
    )
    useEffect(() => {
      setStateValue(value || value === 0 ? value : '')
    }, [value])
    const onChange = useCallback(
      (event) => setStateValue(event.target.value),
      [],
    )

    const onKeyPress = useCallback(
      (event) => {
        if (event.key === 'Enter') {
          saveToDb(event)
        }
      },
      [saveToDb],
    )

    // once schrink is set, need to manually control ist
    // schrink if value exists or schrinkLabel was passed
    const schrink = schrinkLabel || !!value || value === 0

    return (
      <StyledFormControl
        fullWidth
        disabled={disabled}
        error={!!error}
        aria-describedby={`${label}ErrorText`}
        variant="standard"
      >
        <StyledInputLabel
          htmlFor={label}
          shrink={schrink}
          data-weight={labelWeight}
        >
          {label}
        </StyledInputLabel>
        <Input
          id={label}
          name={name}
          value={stateValue}
          type={type}
          multiline={multiLine}
          onChange={onChange}
          onBlur={saveToDb}
          onKeyPress={onKeyPress}
          placeholder={hintText}
        />
        {!!error && (
          <FormHelperText id={`${label}ErrorText`}>{error}</FormHelperText>
        )}
        {!!helperText && (
          <FormHelperText id={`${label}HelperText`}>
            {helperText}
          </FormHelperText>
        )}
      </StyledFormControl>
    )
  },
)
