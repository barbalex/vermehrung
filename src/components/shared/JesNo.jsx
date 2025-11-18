import { useState, useEffect } from 'react'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormLabel from '@mui/material/FormLabel'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import FormControlLabel from '@mui/material/FormControlLabel'

import { toStringIfPossible } from '../../utils/toStringIfPossible.js'
import { container, formControl, formLabel, radio } from './JesNo.module.css'

const dataSource = [
  {
    value: true,
    label: 'Ja',
  },
  {
    value: false,
    label: 'Nein',
  },
]

export const JesNo = ({
  value: valuePassed,
  label,
  name,
  error,
  helperText = '',
  saveToDb,
}) => {
  const [stateValue, setStateValue] = useState(valuePassed)
  useEffect(() => {
    setStateValue(valuePassed)
  }, [valuePassed])

  const onClickButton = (event) => {
    /**
     * if clicked element is active value: set null
     * Problem: does not work on change event on RadioGroup
     * because that only fires on changes
     * Solution: do this in click event of button
     */
    const targetValue = event.target.value === 'true'
    if (targetValue === stateValue) {
      // an already active option was clicked
      // set value null
      setStateValue(null)
      const fakeEvent = {
        target: {
          value: null,
          name,
        },
      }
      return saveToDb(fakeEvent)
    }
  }

  const onChangeGroup = (event) => {
    // group only changes if value changes
    const targetValue = event.target.value
    // values are passed as strings > need to convert
    const newValue = targetValue === 'true'
    setStateValue(newValue)
    const fakeEvent = {
      target: {
        value: newValue,
        name,
      },
    }
    saveToDb(fakeEvent)
  }

  const valueSelected =
    stateValue !== null && stateValue !== undefined ?
      toStringIfPossible(stateValue)
    : ''

  return (
    <div className={container}>
      <FormControl
        component="fieldset"
        error={!!error}
        aria-describedby={`${label}ErrorText`}
        variant="standard"
        className={formControl}
      >
        <FormLabel
          component="legend"
          className={formLabel}
        >
          {label}
        </FormLabel>
        <RadioGroup
          aria-label={label}
          value={valueSelected}
          onChange={onChangeGroup}
        >
          {dataSource.map((e, index) => (
            <FormControlLabel
              key={index}
              value={toStringIfPossible(e.value)}
              control={
                <Radio
                  color="primary"
                  className={radio}
                />
              }
              label={e.label}
              onClick={onClickButton}
            />
          ))}
        </RadioGroup>
        {!!error && (
          <FormHelperText id={`${label}ErrorText`}>{error}</FormHelperText>
        )}
        {!!helperText && (
          <FormHelperText id={`${label}HelperText`}>
            {helperText}
          </FormHelperText>
        )}
      </FormControl>
    </div>
  )
}
