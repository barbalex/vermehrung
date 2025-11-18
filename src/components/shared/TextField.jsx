import { useState, useEffect } from 'react'
import Input from '@mui/material/Input'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'

import { formControl } from './TextField.module.css'

export const TextField = ({
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
  const onChange = (event) => setStateValue(event.target.value)

  const onKeyPress = (event) => {
    if (event.key === 'Enter') {
      saveToDb(event)
    }
  }

  // once shrink is set, need to manually control ist
  // shrink if value exists or shrinkLabel was passed
  const schrink = schrinkLabel || !!value || value === 0

  return (
    <FormControl
      fullWidth
      disabled={disabled}
      error={!!error}
      aria-describedby={`${label}ErrorText`}
      variant="standard"
      className={formControl}
    >
      <InputLabel
        htmlFor={label}
        shrink={schrink}
        style={{ fontWeight: labelWeight }}
      >
        {label}
      </InputLabel>
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
        <FormHelperText id={`${label}HelperText`}>{helperText}</FormHelperText>
      )}
    </FormControl>
  )
}
