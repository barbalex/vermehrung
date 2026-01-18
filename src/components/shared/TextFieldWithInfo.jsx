// seems not in use
import { useState, useEffect } from 'react'
import Input from '@mui/material/Input'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'

import { InfoWithPopover } from './InfoWithPopover.jsx'

import textFieldStyles from './TextField.module.css'
import styles from './TextFieldWithInfo.module.css'

export const TextFieldWithInfo = ({
  value: propsValue,
  label,
  name,
  type = 'text',
  multiLine = false,
  disabled = false,
  hintText = '',
  popover,
  saveToDb,
  error,
}) => {
  const [stateValue, setStateValue] = useState(
    propsValue || propsValue === 0 ? propsValue : '',
  )
  const onChange = (event) => setStateValue(event.target.value)
  useEffect(() => {
    setStateValue(propsValue || propsValue === 0 ? propsValue : '')
  }, [propsValue])

  const onKeyPress = (event) => {
    if (event.key === 'Enter') {
      saveToDb(event)
    }
  }

  return (
    <FormControl
      fullWidth
      disabled={disabled}
      error={!!error}
      aria-describedby={`${label}ErrorText`}
      variant="standard"
      className={textFieldStyles.formControl}
    >
      <InputLabel htmlFor={label}>{label}</InputLabel>
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
        endAdornment={
          <InfoWithPopover>
            <div className={styles.popoverContentRow}>{popover}</div>
          </InfoWithPopover>
        }
      />
      {!!error && (
        <FormHelperText id={`${label}ErrorText`}>{error}</FormHelperText>
      )}
    </FormControl>
  )
}
