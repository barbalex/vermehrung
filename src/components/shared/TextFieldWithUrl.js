import React, { useState, useCallback, useEffect } from 'react'
import { MdOpenInNew as OpenInNewIcon } from 'react-icons/md'
import Input from '@mui/material/Input'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import { green } from '@mui/material/colors'
import styled from 'styled-components'
import getUrls from 'get-urls'
import { observer } from 'mobx-react-lite'

const Container = styled.div`
  display: flex;
  margin-bottom: -15px;
  break-inside: avoid;
`
const StyledOpenInNewIcon = styled(OpenInNewIcon)`
  margin-top: 20px;
  cursor: pointer;
  &:hover {
    color: ${green[300]};
  }
`
const StyledFormControl = styled(FormControl)`
  padding-bottom: 19px !important;
  > div:before {
    border-bottom-color: rgba(0, 0, 0, 0.1) !important;
  }
`

const TextFieldWithUrl = ({
  value: propsValue,
  label,
  name,
  type = 'text',
  multiLine = false,
  disabled = false,
  error,
  saveToDb,
}) => {
  const [stateValue, setStateValue] = useState(
    propsValue || propsValue === 0 ? propsValue : '',
  )

  const onChange = useCallback((event) => setStateValue(event.target.value), [])
  const onOpen = useCallback(
    (e) => window.open(e.target.dataset.url, '_blank'),
    [],
  )

  useEffect(() => {
    setStateValue(propsValue || propsValue === 0 ? propsValue : '')
  }, [propsValue])

  const onKeyPress = useCallback(
    (event) => {
      if (event.key === 'Enter') {
        saveToDb(event)
      }
    },
    [saveToDb],
  )

  const urls = stateValue ? getUrls(stateValue) : []

  return (
    <Container>
      <StyledFormControl
        disabled={disabled}
        fullWidth
        error={!!error}
        aria-describedby={`${label}ErrorText`}
        variant="standard"
      >
        <InputLabel htmlFor={label}>
          {`${label} (gültige URL's beginnen mit "https://", "//" oder "www.")`}
        </InputLabel>
        <Input
          id={label}
          name={name}
          value={stateValue}
          type={type}
          multiline={multiLine}
          onChange={onChange}
          onBlur={saveToDb}
          onKeyPress={onKeyPress}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
        />
        {!!error && (
          <FormHelperText id={`${label}ErrorText`}>{error}</FormHelperText>
        )}
      </StyledFormControl>
      {Array.from(urls).map((url, index) => (
        <div key={index} title={`${url} öffnen`}>
          <StyledOpenInNewIcon onClick={onOpen} data-url={url} />
        </div>
      ))}
    </Container>
  )
}

export default observer(TextFieldWithUrl)
