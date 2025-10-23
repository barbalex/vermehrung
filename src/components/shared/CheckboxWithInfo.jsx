import FormGroup from '@mui/material/FormGroup'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormHelperText from '@mui/material/FormHelperText'
import Checkbox from '@mui/material/Checkbox'
import styled from '@emotion/styled'
import { observer } from 'mobx-react-lite'

import { InfoWithPopover } from './InfoWithPopover.jsx'
import { Label } from './Label.jsx'

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  div {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
`
// without slight padding radio is slightly cut off!
const StyledFormControl = styled(FormControl)`
  padding-left: 1px !important;
  padding-bottom: 15px !important;
`
const StyledFormControlLabel = styled(FormControlLabel)`
  margin-top: -10px;
`

export const CheckboxWithInfo = ({
  value = null,
  label,
  popover,
  saveToDb,
  error,
}) => {
  const onCheck = (e, val) => saveToDb(val)

  return (
    <Container>
      <StyledFormControl
        component="fieldset"
        error={!!error}
        aria-describedby={`${label}ErrorText`}
        variant="standard"
      >
        <FormGroup>
          <Label label={label} />
          <StyledFormControlLabel
            control={
              <Checkbox
                checked={value}
                onChange={onCheck}
                value={label}
                color="primary"
              />
            }
          />
        </FormGroup>
        {!!error && (
          <FormHelperText id={`${label}ErrorText`}>{error}</FormHelperText>
        )}
      </StyledFormControl>
      <div>
        <InfoWithPopover>{popover}</InfoWithPopover>
      </div>
    </Container>
  )
}
