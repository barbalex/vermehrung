import { useContext, useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import styled from '@emotion/styled'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

import { MobxStoreContext } from '../../../../../mobxStoreContext.js'

const TitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding-right: 16px;
  user-select: none;
`
const Title = styled.div`
  padding: 12px 16px;
  color: rgba(0, 0, 0, 0.6);
  font-weight: 700;
  user-select: none;
`

export const KulturDeleteMenu = observer(({ row, anchorEl, setAnchorEl }) => {
  const store = useContext(MobxStoreContext)
  const { filter } = store
  const { activeNodeArray, setActiveNodeArray, removeOpenNodeWithChildren } =
    store.tree

  const closeMenu = useCallback(() => {
    setAnchorEl(null)
  }, [setAnchorEl])

  const remove = useCallback(async () => {
    await row.delete({ store })
    setAnchorEl(null)
    if (filter.kultur.delete === false) {
      // need to remove openNode from openNodes
      removeOpenNodeWithChildren(activeNodeArray)
      setActiveNodeArray(activeNodeArray.slice(0, -1))
    }
  }, [
    activeNodeArray,
    filter.kultur.delete,
    removeOpenNodeWithChildren,
    row,
    setActiveNodeArray,
    setAnchorEl,
    store,
  ])

  return (
    <Menu
      id="menu"
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={closeMenu}
    >
      <TitleRow>
        <Title>Wirklich löschen?</Title>
      </TitleRow>
      <MenuItem onClick={remove}>Ja, weg damit!</MenuItem>
      <MenuItem onClick={closeMenu}>Nein, abbrechen!</MenuItem>
    </Menu>
  )
})
