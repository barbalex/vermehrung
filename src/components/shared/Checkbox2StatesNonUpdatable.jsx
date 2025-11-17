// not in use
import { useState, useEffect } from 'react'
import Checkbox from '@mui/material/Checkbox'
import FormLabel from '@mui/material/FormLabel'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import { observer } from 'mobx-react-lite'

import { container, formLabel, checkbox } from './Checkbox2States.module.css'

export const Checkbox2StatesNonUpdatable = observer(
  ({
    label,
    name,
    value: valuePassed,
    message: messagePassed = 'Dieser Wert ist nicht veränderbar',
  }) => {
    const [stateValue, setStateValue] = useState(valuePassed)
    useEffect(() => {
      setStateValue(valuePassed)
    }, [valuePassed])

    const [message, setMessage] = useState(messagePassed)
    const onClickButton = () => {
      setMessage(message)
      // can fire after component was unmounted...
      setTimeout(() => setMessage(null), 10000)
    }

    const checked = stateValue === true

    return (
      <div className={container}>
        <FormControl
          component="fieldset"
          error={!!message}
          aria-describedby={`${label}MessageText`}
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
          {!!message && (
            <FormHelperText id={`${label}MessageText`}>
              {message}
            </FormHelperText>
          )}
        </FormControl>
      </div>
    )
  },
)
