import { useCallback, useState, useEffect } from 'react'
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
  padding-bottom: 15px !important;
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
    const onClickButton = useCallback(() => {
      setMessage(message)
      // can fire after component was unmounted...
      setTimeout(() => setMessage(null), 10000)
    }, [message])

    const checked = stateValue === true

    return (
      <Container>
        <StyledFormControl
          component="fieldset"
          error={!!message}
          aria-describedby={`${label}MessageText`}
          variant="standard"
        >
          <StyledFormLabel component="legend">{label}</StyledFormLabel>
          <StyledCheckbox
            data-id={name}
            onClick={onClickButton}
            color="primary"
            checked={checked}
          />
          {!!message && (
            <FormHelperText id={`${label}MessageText`}>
              {message}
            </FormHelperText>
          )}
        </StyledFormControl>
      </Container>
    )
  },
)
