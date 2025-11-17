// not in use
import { useState, useEffect } from 'react'
import Checkbox from '@mui/material/Checkbox'
import FormLabel from '@mui/material/FormLabel'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import { observer } from 'mobx-react-lite'

import { container, formLabel, checkbox } from './Checkbox2States.module.css'
import { aside, asideCommentClass } from './Checkbox3States.module.css'

const Checkbox3States = ({
  label,
  name,
  value: valuePassed,
  error,
  saveToDb,
}) => {
  const [stateValue, setStateValue] = useState(valuePassed)
  useEffect(() => {
    setStateValue(valuePassed)
  }, [valuePassed])

  const onClickButton = () => {
    let newValue = null
    if (stateValue === true) newValue = false
    if (stateValue === false) newValue = null
    if (stateValue === null) newValue = true
    setStateValue(newValue)
    const fakeEvent = {
      target: {
        value: newValue,
        name,
      },
    }
    saveToDb(fakeEvent)
  }

  const indeterminate = stateValue === null
  const checked = stateValue === true
  const asideText =
    stateValue === true ? `Ja`
    : stateValue === false ? `Nein`
    : `Unbestimmt`
  const asideComment =
    stateValue === true ? `(nach nächstem Klick 'Nein')`
    : stateValue === false ? `(nach nächstem Klick 'Unbestimmt')`
    : `(nach nächstem Klick 'Ja')`

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
          indeterminate={indeterminate}
          className={checkbox}
        />
        <div className={aside}>
          {asideText}
          <span className={asideCommentClass}>{asideComment}</span>
        </div>
        {!!error && (
          <FormHelperText id={`${label}ErrorText`}>{error}</FormHelperText>
        )}
      </FormControl>
    </div>
  )
}

export default observer(Checkbox3States)
