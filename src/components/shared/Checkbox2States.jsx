import { useState, useEffect } from 'react'
import Checkbox from '@mui/material/Checkbox'
import FormLabel from '@mui/material/FormLabel'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import { observer } from 'mobx-react-lite'

import { container, formLabel, checkbox } from './Checkbox2States.module.css'

export const Checkbox2States = observer(
  ({ label, name, value: valuePassed, error, saveToDb }) => {
    const [stateValue, setStateValue] = useState(valuePassed)
    useEffect(() => {
      setStateValue(valuePassed)
    }, [valuePassed])

    const onClickButton = () => {
      const newValue = !stateValue
      setStateValue(newValue)
      const fakeEvent = {
        target: {
          value: newValue,
          name,
        },
      }
      saveToDb(fakeEvent)
    }

    const checked = stateValue === true

    return (
      <div className={container}>
        <FormControl
          component="fieldset"
          error={!!error}
          aria-describedby={`${label}ErrorText`}
          variant="standard"
        >
          <FormLabel
            component="legend"
            className={formLabel}
          >
            {label}
          </FormLabel>
          <Checkbox
            data-id={name}
            onClick={onClickButton}
            color="primary"
            checked={checked}
            className={checkbox}
          />
          {!!error && (
            <FormHelperText id={`${label}ErrorText`}>{error}</FormHelperText>
          )}
        </FormControl>
      </div>
    )
  },
)
