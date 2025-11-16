import { useContext } from 'react'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import { RiFilterFill, RiFilterLine } from 'react-icons/ri'
import { MdDeleteSweep as DeleteFilterIcon } from 'react-icons/md'
import styled from '@emotion/styled'
import { observer } from 'mobx-react-lite'

import { MobxStoreContext } from '../../../mobxStoreContext.js'

import {
  showBorder,
  button,
  iconButton,
  iconDiv,
  deleteFilterIcon,
} from './Filter.module.css'

const StyledIconButton = styled(IconButton)`
  font-size: 2rem !important;
  &:hover {
    border-width: 1px !important;
  }
`
const IconDiv = styled.div`
  svg {
    height: 34px;
    vertical-align: middle;
  }
`
const StyledDeleteFilterIcon = styled(DeleteFilterIcon)`
  cursor: pointer;
  pointer-events: auto;
  color: white;
  font-size: 1.3rem !important;
  margin-left: 10px;
`

export const HeaderFilter = observer(() => {
  const store = useContext(MobxStoreContext)
  const { filter, singleColumnView } = store
  const { show: showFilter, setShow: setShowFilter, filtered, empty } = filter

  const onClickFilter = () => setShowFilter(!showFilter)

  if (singleColumnView) {
    return (
      <StyledIconButton
        color="inherit"
        aria-label="Filter"
        onClick={onClickFilter}
        title="Filter"
        className={`${showFilter ? showBorder : ''}`}
      >
        {filtered ?
          <RiFilterFill />
        : <RiFilterLine />}
      </StyledIconButton>
    )
  }

  return (
    <Button
      variant="outlined"
      onClick={onClickFilter}
      className={`${button} ${showFilter ? showBorder : ''}`}
    >
      Filter
      {filtered && (
        <IconDiv
          aria-label="Alle Filter entfernen"
          title="Alle Filter entfernen"
          onClick={(e) => {
            e.stopPropagation()
            empty()
          }}
        >
          <StyledDeleteFilterIcon />
        </IconDiv>
      )}
    </Button>
  )
})
