import { useCallback, useState, useEffect } from 'react'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormLabel from '@mui/material/FormLabel'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import FormControlLabel from '@mui/material/FormControlLabel'
import styled from '@emotion/styled'
import { observer } from 'mobx-react-lite'

import { toStringIfPossible } from '../../utils/toStringIfPossible.js'

// without slight padding radio is slightly cut off!
const StyledFormControl = styled(FormControl)`
  padding-left: 1px !important;
  padding-bottom: 19px !important;
  break-inside: avoid;
`
const StyledFormLabel = styled(FormLabel)`
  padding-top: 1px !important;
  font-size: 12px !important;
  cursor: text;
  user-select: none;
  pointer-events: none;
  padding-bottom: 8px !important;
`
const StyledRadio = styled(Radio)`
  height: 2px !important;
`

export const RadioButtonGroup = observer(
  ({
    value: valuePassed,
    label,
    name,
    error,
    helperText = '',
    dataSource = [],
    saveToDb,
  }) => {
    const [stateValue, setStateValue] = useState(valuePassed)
    useEffect(() => {
      setStateValue(valuePassed)
    }, [valuePassed])

    const onClickButton = useCallback(
      (event) => {
        /**
         * if clicked element is active value: set null
         * Problem: does not work on change event on RadioGroup
         * because that only fires on changes
         * Solution: do this in click event of button
         */
        const targetValue = event.target.value
        // eslint-disable-next-line eqeqeq
        if (targetValue !== undefined && targetValue == stateValue) {
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
      },
      [stateValue, name, saveToDb],
    )
    const onChangeGroup = useCallback(
      (event) => {
        // group only changes if value changes
        const targetValue = event.target.value
        // values are passed as strings > need to convert
        const newValue =
          targetValue === 'true' ? true
          : targetValue === 'false' ? false
          : isNaN(targetValue) ? targetValue
          : +targetValue
        setStateValue(newValue)
        const fakeEvent = {
          target: {
            value: newValue,
            name,
          },
        }
        saveToDb(fakeEvent)
      },
      [name, saveToDb],
    )

    const valueSelected =
      stateValue !== null && stateValue !== undefined ?
        toStringIfPossible(stateValue)
      : ''

    return (
      <StyledFormControl
        component="fieldset"
        error={!!error}
        aria-describedby={`${label}ErrorText`}
        variant="standard"
      >
        <StyledFormLabel component="legend">{label}</StyledFormLabel>
        <RadioGroup
          aria-label={label}
          value={valueSelected}
          onChange={onChangeGroup}
        >
          {dataSource.map((e, index) => (
            <FormControlLabel
              key={index}
              value={toStringIfPossible(e.value)}
              control={<StyledRadio color="primary" />}
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
      </StyledFormControl>
    )
  },
)
