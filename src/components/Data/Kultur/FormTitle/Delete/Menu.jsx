import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

import {
  store,
  activeNodeArrayAtom,
  filterKulturAtom,
  setActiveNodeArray,
  removeOpenNodeWithChildren,
} from '../../../../../store/index.js'

import artStyles from '../../../Art/FormTitle/DeleteButton.module.css'

export const KulturDeleteMenu = ({ row, anchorEl, setAnchorEl }) => {
  const closeMenu = () => setAnchorEl(null)

  const remove = async () => {
    await row.delete()
    setAnchorEl(null)
    const kulturFilter = store.get(filterKulturAtom)
    if (kulturFilter.delete === false) {
      // need to remove openNode from openNodes
      const activeNodeArray = store.get(activeNodeArrayAtom)
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
}
