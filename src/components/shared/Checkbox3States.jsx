import { useState, useEffect } from 'react'
import Checkbox from '@mui/material/Checkbox'
import FormLabel from '@mui/material/FormLabel'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import styled from '@emotion/styled'
import { observer } from 'mobx-react-lite'

// without slight padding radio is slightly cut off!
const Container = styled.div`
  display: block;
`
const StyledFormControl = styled(FormControl)`
  padding-left: 1px !important;
`
const StyledFormLabel = styled(FormLabel)`
  padding-top: 10px !important;
  padding-bottom: 8px !important;
  font-size: 12px !important;
  cursor: text;
  user-select: none;
  pointer-events: none;
`
const StyledCheckbox = styled(Checkbox)`
  height: 2px !important;
  width: 24px;
`
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
    <Container>
      <StyledFormControl
        component="fieldset"
        error={!!error}
        aria-describedby={`${label}ErrorText`}
        variant="standard"
      >
        <StyledFormLabel component="legend">{label}</StyledFormLabel>
        <StyledCheckbox
          data-id={name}
          onClick={onClickButton}
          color="primary"
          checked={checked}
          indeterminate={indeterminate}
        />
        <Aside>
          {asideText}
          <AsideComment>{asideComment}</AsideComment>
        </Aside>
        {!!error && (
          <FormHelperText id={`${label}ErrorText`}>{error}</FormHelperText>
        )}
      </StyledFormControl>
    </Container>
  )
}

export default observer(Checkbox3States)
