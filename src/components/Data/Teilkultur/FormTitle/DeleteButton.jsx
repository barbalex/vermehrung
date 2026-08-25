import { useState } from 'react'
import { FaMinus } from 'react-icons/fa'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

import {
  store,
  filterTeilkulturAtom,
  activeNodeArrayAtom,
  setActiveNodeArray,
  removeOpenNodeWithChildren,
} from '../../../../store/index.js'
import { ErrorBoundary } from '../../../shared/ErrorBoundary.jsx'

import artStyles from '../../Art/FormTitle/DeleteButton.module.css'

export const TeilkulturDeleteButton = ({ row }) => {
  const [anchorEl, setAnchorEl] = useState(null)

  const closeMenu = () => setAnchorEl(null)

  const onClickButton = (event) => setAnchorEl(event.currentTarget)

  const remove = () => {
    row.delete()
    setAnchorEl(null)
    if (store.get(filterTeilkulturAtom)._deleted === false) {
      // need to remove openNode from openNodes
      const activeNodeArray = store.get(activeNodeArrayAtom)
      removeOpenNodeWithChildren(activeNodeArray)
      setActiveNodeArray(activeNodeArray.slice(0, -1))
    }
  }

  return (
    <ErrorBoundary>
      <IconButton
        aria-controls="menu"
        aria-haspopup="true"
        aria-label="Teilkultur löschen"
        title="Teilkultur löschen"
        onClick={onClickButton}
        disabled={!!row._deleted}
        size="large"
      >
        <FaMinus />
      </IconButton>
      <Menu
        id="menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={closeMenu}
      >
        <div className={artStyles.titleRow}>
          <div className={artStyles.title}>Wirklich löschen?</div>
        </div>
        <MenuItem onClick={remove}>Ja, weg damit!</MenuItem>
        <MenuItem onClick={closeMenu}>Nein, abbrechen!</MenuItem>
      </Menu>
    </ErrorBoundary>
  )
}
