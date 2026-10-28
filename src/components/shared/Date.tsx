import { useState, useEffect } from 'react'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import FormHelperText from '@mui/material/FormHelperText'
import { DateTime } from 'luxon'
import DatePicker from 'react-datepicker'

import type { SaveToDbFn } from './types.ts'

import styles from './Date.module.css'
import './Date.css'

const dateFormat = [
  'dd.MM.yyyy',
  'd.MM.yyyy',
  'd.M.yyyy',
  'dd.M.yyyy',
  'dd.MM.yy',
  'd.MM.yy',
  'd.M.yy',
  'dd.M.yy',
  'd.M',
  'd.MM',
  'dd.M',
  'dd.MM',
  'd',
  'dd',
]

export const DateField = ({
  value: valuePassed,
  name,
  label,
  saveToDb,
  error,
  popperPlacement = 'bottom',
}: {
  value: string | null
  name: string
  label: string
  saveToDb: SaveToDbFn
  error?: string | boolean | null
  popperPlacement?: string
}) => {
  const [stateValue, setStateValue] = useState(valuePassed)
  useEffect(() => {
    setStateValue(valuePassed)
  }, [valuePassed])

  const onChangeDatePicker = (date: Date | null) => {
    const newValue =
      date === null ? null : DateTime.fromJSDate(date).toFormat('yyyy-LL-dd')
    setStateValue(newValue)
    saveToDb({
      target: {
        value: newValue,
        name,
      },
    })
  }

  const isValid =
    stateValue !== null ? DateTime.fromSQL(stateValue).isValid : false
  const selected =
    isValid && stateValue !== null && stateValue !== ''
      ? DateTime.fromSQL(stateValue as string).toJSDate()
      : null

  // for popperPlacement see https://github.com/Hacker0x01/react-datepicker/issues/1246#issuecomment-361833919
  return (
    <FormControl
      variant="standard"
      className={`date-field ${styles.formControl}`}
    >
      <InputLabel
        htmlFor={name}
        className={styles.labelClass}
      >
        {label}
      </InputLabel>
      <DatePicker
        id={name}
        selected={selected}
        onChange={
          onChangeDatePicker as unknown as (
            date: Date | null,
            event?: unknown,
          ) => void
        }
        dateFormat={dateFormat}
        popperPlacement={popperPlacement as 'bottom' | 'top' | 'left' | 'right'}
        className={styles.datePicker}
      />
      {!!error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  )
}
