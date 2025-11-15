import { useContext, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { FaMinus } from 'react-icons/fa'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

import { MobxStoreContext } from '../../../../mobxStoreContext.js'
import { ErrorBoundary } from '../../../shared/ErrorBoundary.jsx'

import { titleRow, title } from '../../Art/FormTitle/DeleteButton.module.css'

export const HerkunftDeleteButton = observer(({ row }) => {
  const store = useContext(MobxStoreContext)
  const { filter } = store
  const { activeNodeArray, setActiveNodeArray, removeOpenNodeWithChildren } =
    store.tree

  const [anchorEl, setAnchorEl] = useState(null)
  const closeMenu = () => setAnchorEl(null)
  const onClickButton = (event) => setAnchorEl(event.currentTarget)

  const remove = async () => {
    await row.delete({ store })
    setAnchorEl(null)
    if (filter.herkunft._deleted === false) {
      // need to remove openNode from openNodes
      removeOpenNodeWithChildren(activeNodeArray)
      setActiveNodeArray(activeNodeArray.slice(0, -1))
    }
  }

  return (
    <ErrorBoundary>
      <IconButton
        aria-controls="menu"
        aria-haspopup="true"
        aria-label="Herkunft löschen"
        title="Herkunft löschen"
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
        <div className={titleRow}>
          <div className={title}>Wirklich löschen?</div>
        </div>
        <MenuItem onClick={remove}>Ja, weg damit!</MenuItem>
        <MenuItem onClick={closeMenu}>Nein, abbrechen!</MenuItem>
      </Menu>
    </ErrorBoundary>
  )
})
