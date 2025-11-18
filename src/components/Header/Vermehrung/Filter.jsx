import { useContext } from 'react'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import { RiFilterFill, RiFilterLine } from 'react-icons/ri'
import { MdDeleteSweep as DeleteFilterIcon } from 'react-icons/md'
import { styled } from '@mui/material/styles'
import { observer } from 'mobx-react-lite'

import { MobxStoreContext } from '../../../mobxStoreContext.js'

import { iconDiv } from './Filter.module.css'

// tried to convert this to css modules
// but mui somehow prevents the border of the button / iconButton from showing when showFilter is true
// worked neither as style props nor as classes
// cost me an hour of fighting against dragons, so I gave up

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
    const StyledIconButton = styled(IconButton)({
      border:
        showFilter ?
          '1px solid rgba(255, 255, 255, 0.5)'
        : '0 solid rgba(255, 255, 255, 0.5)',
      fontSize: '2rem',
      '&:hover': { borderWidth: 1 },
    })

    return (
      <StyledIconButton
        color="inherit"
        aria-label="Filter"
        onClick={onClickFilter}
        title="Filter"
      >
        {filtered ?
          <RiFilterFill />
        : <RiFilterLine />}
      </StyledIconButton>
    )
  }

  const StyledButton = styled(Button)({
    color: 'white',
    borderColor: 'rgba(255, 255, 255, 0.5)',
    borderWidth: showFilter ? 1 : 0,
    textTransform: 'none',
    marginRight: 34,
    height: 34,
    '&:hover': { borderWidth: 1 },
  })

  return (
    <StyledButton
      variant="outlined"
      onClick={onClickFilter}
    >
      Filter
      {filtered && (
        <div
          className={iconDiv}
          aria-label="Alle Filter entfernen"
          title="Alle Filter entfernen"
          onClick={(e) => {
            e.stopPropagation()
            empty()
          }}
        >
          <StyledDeleteFilterIcon />
        </div>
      )}
    </StyledButton>
  )
})
