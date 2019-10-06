import React, { useCallback, useContext } from 'react'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import InputAdornment from '@material-ui/core/InputAdornment'
import DeleteFilterIcon from '@material-ui/icons/DeleteSweep'
import styled from 'styled-components'

import storeContext from '../../storeContext'

const StyledInput = styled(Input)`
  div hr {
    width: calc(100% - 20px) !important;
  }
  &:before {
    border-bottom-color: rgba(0, 0, 0, 0.1) !important;
  }
`
const StyledDeleteFilterIcon = styled(DeleteFilterIcon)`
  cursor: pointer;
  pointer-events: auto;
  padding-top: 5px;
  color: rgba(0, 0, 0, 0.7);
`

const Filter = () => {
  const store = useContext(storeContext)
  const { docFilter, setDocFilter } = store
  const onChange = useCallback(e => setDocFilter(e.target.value), [
    setDocFilter,
  ])
  const onClickEmptyFilter = useCallback(() => setDocFilter(''), [setDocFilter])

  return (
    <FormControl fullWidth>
      <InputLabel htmlFor="filterInput">filtern</InputLabel>
      <StyledInput
        id="filterInput"
        value={docFilter}
        onChange={onChange}
        spellCheck="false"
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        endAdornment={
          docFilter ? (
            <InputAdornment
              position="end"
              onClick={onClickEmptyFilter}
              title="Filter entfernen"
            >
              <StyledDeleteFilterIcon />
            </InputAdornment>
          ) : null
        }
      />
    </FormControl>
  )
}

export default Filter
