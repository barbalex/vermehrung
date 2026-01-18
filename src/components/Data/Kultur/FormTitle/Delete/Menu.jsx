import { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

import { MobxStoreContext } from '../../../../../mobxStoreContext.js'

import artStyles from '../../../Art/FormTitle/DeleteButton.module.css'

export const KulturDeleteMenu = observer(({ row, anchorEl, setAnchorEl }) => {
  const store = useContext(MobxStoreContext)
  const { filter } = store
  const { activeNodeArray, setActiveNodeArray, removeOpenNodeWithChildren } =
    store.tree

  const closeMenu = () => setAnchorEl(null)

  const remove = async () => {
    await row.delete({ store })
    setAnchorEl(null)
    if (filter.kultur.delete === false) {
      // need to remove openNode from openNodes
      removeOpenNodeWithChildren(activeNodeArray)
      setActiveNodeArray(activeNodeArray.slice(0, -1))
    }
  }

  return (
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
  )
})
