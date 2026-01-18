import { useState } from 'react'
import Input from '@mui/material/Input'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'

import textFieldStyles from './TextField.module.css'

const inputProps = { tabIndex: -1 }

export const TextFieldNonUpdatable = ({
  label,
  value = '',
  message = 'Dieser Wert ist nicht veränderbar',
  schrinkLabel = false,
}) => {
  const [error, setError] = useState(null)
  const onChange = () => {
    setError(message)
    // can fire after component was unmounted...
    setTimeout(() => setError(null), 10000)
  }

  // once shrink is set, need to manually control it
  // shrink if value exists or shrinkLabel was passed
  const schrink = schrinkLabel || !!value || value === 0

  return (
    <FormControl
      error={!!error}
      fullWidth
      aria-describedby={`${label}-helper`}
      variant="standard"
      className={textFieldStyles.formControl}
    >
      <InputLabel
        htmlFor={label}
        shrink={schrink}
      >
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
    </FormControl>
  )
}
