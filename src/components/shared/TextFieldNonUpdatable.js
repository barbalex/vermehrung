import React, { useState, useCallback } from 'react'
import Input from '@mui/material/Input'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import styled from 'styled-components'
import { observer } from 'mobx-react-lite'

const StyledFormControl = styled(FormControl)`
  padding-bottom: 19px !important;
  > div:before {
    border-bottom-color: rgba(0, 0, 0, 0.1) !important;
  }
`
const inputProps = { tabIndex: -1 }

const MyTextField = ({
  label,
  value = '',
  message = 'Dieser Wert ist nicht veränderbar',
  schrinkLabel = false,
}) => {
  const [error, setError] = useState(null)
  const onChange = useCallback(() => {
    setError(message)
    // can fire after component was unmounted...
    setTimeout(() => setError(null), 10000)
  }, [message])

  // once schrink is set, need to manually control it
  // schrink if value exists or schrinkLabel was passed
  const schrink = schrinkLabel || !!value || value === 0

  return (
    <StyledFormControl
      error={!!error}
      fullWidth
      aria-describedby={`${label}-helper`}
      variant="standard"
    >
      <InputLabel htmlFor={label} shrink={schrink}>
        {label}
      </InputLabel>
      <Input
        id={label}
        value={value || value === 0 ? value : ''}
        onChange={onChange}
        inputProps={inputProps}
      />
      {!!error && (
        <FormHelperText id={`${label}-helper`}>{error}</FormHelperText>
      )}
    </StyledFormControl>
  )
}

export default observer(MyTextField)
