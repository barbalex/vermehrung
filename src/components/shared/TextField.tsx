import { useState, useEffect } from 'react'
import Input from '@mui/material/Input'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'

import type { SaveToDbFn } from './types.ts'

import styles from './TextField.module.css'

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
}: {
  value: string | number | null
  label: string
  labelWeight?: number
  name: string
  type?: string
  multiLine?: boolean
  disabled?: boolean
  hintText?: string
  helperText?: string
  error?: string | boolean | null
  saveToDb: SaveToDbFn
  schrinkLabel?: boolean
}) => {
  const [stateValue, setStateValue] = useState(
    value || value === 0 ? value : '',
  )
  useEffect(() => {
    setStateValue(value || value === 0 ? value : '')
  }, [value])
  const onChange = (event: { target: { value: string } }) =>
    setStateValue(event.target.value)

  const onKeyPress = (event: {
    key: string
    target: { name?: string; value: unknown }
    preventDefault: () => void
    stopPropagation: () => void
  }) => {
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
      className={styles.formControl}
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
        onKeyPress={
          onKeyPress as unknown as import('react').KeyboardEventHandler
        }
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
