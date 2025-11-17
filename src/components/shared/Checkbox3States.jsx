// not in use
import { useState, useEffect } from 'react'
import Checkbox from '@mui/material/Checkbox'
import FormLabel from '@mui/material/FormLabel'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import styled from '@emotion/styled'
import { observer } from 'mobx-react-lite'

import { container, formLabel, checkbox } from './Checkbox2States.module.css'

const Aside = styled.div`
  position: relative;
  bottom: 20px;
  left: 28px;
`
const AsideComment = styled.span`
  padding-left: 6px;
  font-size: 0.8em;
  color: rgba(0, 0, 0, 0.54);
`

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
        <Aside>
          {asideText}
          <AsideComment>{asideComment}</AsideComment>
        </Aside>
        {!!error && (
          <FormHelperText id={`${label}ErrorText`}>{error}</FormHelperText>
        )}
      </FormControl>
    </div>
  )
}

export default observer(Checkbox3States)
