import React, { useState, useCallback } from 'react'
import Input from '@material-ui/core/Input'
import { FaSearch, FaTimes } from 'react-icons/fa'
import styled from 'styled-components'

const Container = styled.div`
  border-radius: 3px;
  background-color: #5f00d4;
  margin-right: 5px;
  width: 220px;
  display: flex;
  :hover {
    background-color: #640dce;
  }
`
const SearchIcon = styled(FaSearch)`
  margin: auto 5px;
`
const DelIcon = styled(FaTimes)`
  margin: auto 5px;
  opacity: ${props => (props['data-active'] ? 1 : 0.4)};
  cursor: ${props => (props['data-active'] ? 'pointer' : 'default')};
`
const StyledInput = styled(Input)`
  input {
    color: white;
  }
  :before,
  :after {
    border-bottom: none !important;
  }
`

export default () => {
  const [val, setVal] = useState('')

  const onChange = useCallback(event => setVal(event.target.value))
  const onBlur = useCallback(event =>
    console.log('search ', event.target.value),
  )
  const onClickDel = useCallback(() => setVal(''))
  const onKeyPress = useCallback(event => {
    if (event.key === 'Enter') {
      console.log('search ', event.target.value)
    }
  })

  return (
    <Container>
      <SearchIcon />
      <StyledInput
        value={val}
        type="text"
        onChange={onChange}
        onBlur={onBlur}
        onKeyPress={onKeyPress}
        placeholder="suchen"
      />
      <DelIcon data-active={!!val} onClick={onClickDel} />
    </Container>
  )
}
