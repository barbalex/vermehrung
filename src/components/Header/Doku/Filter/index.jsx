import { useContext } from 'react'
import Input from '@mui/material/Input'
import InputAdornment from '@mui/material/InputAdornment'
import { FaTimes, FaFilter } from 'react-icons/fa'
import styled from '@emotion/styled'
import { observer } from 'mobx-react-lite'

import { MobxStoreContext } from '../../../../mobxStoreContext.js'
import { FilterNumbers as Numbers } from './Numbers.jsx'

const Container = styled.div`
  height: 100%;
  padding: 3px 6px;
  display: flex;
  border-radius: 3px;
  background-color: #6625b5 !important;
`
const StyledInput = styled(Input)`
  color: white !important;
  div hr {
    width: calc(100% - 20px) !important;
  }
  &:before,
  &:after {
    border-bottom: none !important;
  }
`
const StyledFilterIcon = styled(FaFilter)`
  pointer-events: auto;
  color: white;
`
const StyledDeleteFilterIcon = styled(FaTimes)`
  cursor: pointer;
  pointer-events: auto;
  color: ${(props) => (props['data-active'] ? 'white' : '#4a148c')};
`

export const DokuFilter = observer(() => {
  const store = useContext(MobxStoreContext)
  const { docFilter, setDocFilter, docsCount, docsFilteredCount } = store
  const onChange = (e) => setDocFilter(e.target.value)
  const onClickEmptyFilter = () => setDocFilter('')

  return (
    <Container>
      <StyledInput
        id="filterInput"
        value={docFilter}
        onChange={onChange}
        spellCheck="false"
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        placeholder="Artikel filtern"
        variant="outlined"
        startAdornment={
          <InputAdornment position="start">
            <StyledFilterIcon />
          </InputAdornment>
        }
        endAdornment={
          <InputAdornment
            position="end"
            onClick={onClickEmptyFilter}
            title="Filter entfernen"
          >
            <StyledDeleteFilterIcon data-active={!!docFilter} />
          </InputAdornment>
        }
      />
      <Numbers
        totalCount={docsCount}
        filteredCount={docsFilteredCount}
      />
    </Container>
  )
})
