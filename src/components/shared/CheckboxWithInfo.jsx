// not in use
import FormGroup from '@mui/material/FormGroup'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormHelperText from '@mui/material/FormHelperText'
import Checkbox from '@mui/material/Checkbox'

import { InfoWithPopover } from './InfoWithPopover.jsx'
import { Label } from './Label.jsx'

import styles from './CheckboxWithInfo.module.css'

export const CheckboxWithInfo = ({
  value = null,
  label,
  popover,
  saveToDb,
  error,
}) => {
  const onCheck = (e, val) => saveToDb(val)

  return (
    <div className={styles.container}>
      <FormControl
        component="fieldset"
        error={!!error}
        aria-describedby={`${label}ErrorText`}
        variant="standard"
        className={styles.formControl}
      >
        <FormGroup>
          <Label label={label} />
          <FormControlLabel
            control={
              <Checkbox
                checked={value}
                onChange={onCheck}
                value={label}
                color="primary"
              />
            }
            className={styles.formControlLabel}
          />
        </FormGroup>
        {!!error && (
          <FormHelperText id={`${label}ErrorText`}>{error}</FormHelperText>
        )}
      </FormControl>
      <div>
        <InfoWithPopover>{popover}</InfoWithPopover>
      </div>
    </div>
  )
}
