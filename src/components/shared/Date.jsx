import { useState, useEffect } from 'react'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import FormHelperText from '@mui/material/FormHelperText'
import { DateTime } from 'luxon'
import DatePicker from 'react-datepicker'

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
}) => {
  const [stateValue, setStateValue] = useState(valuePassed)
  useEffect(() => {
    setStateValue(valuePassed)
  }, [valuePassed])

  const onChangeDatePicker = (date) => {
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

  const isValid = DateTime.fromSQL(stateValue).isValid
  const selected = isValid ? new Date(DateTime.fromSQL(stateValue)) : null

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
        onChange={onChangeDatePicker}
        dateFormat={dateFormat}
        popperPlacement={popperPlacement}
        className={styles.datePicker}
      />
      {!!error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  )
}
