import React, { useContext, useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

import { StoreContext } from '../../../../../models/reactUtils'

const TitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding-right: 16px;
  user-select: none;
`
const Title = styled.div`
  padding: 12px 16px;
  color: rgba(0, 0, 0, 0.6);
  font-weight: 800;
  user-select: none;
`

const KulturDeleteMenu = ({ row, anchorEl, setAnchorEl }) => {
  const store = useContext(StoreContext)
  const { showDeleted } = store
  const {
    activeNodeArray,
    setActiveNodeArray,
    removeOpenNodeWithChildren,
  } = store.tree

  const closeMenu = useCallback(() => {
    setAnchorEl(null)
  }, [setAnchorEl])

  const remove = useCallback(() => {
    row.delete()
    setAnchorEl(null)
    if (!showDeleted) {
      // need to remove openNode from openNodes
      removeOpenNodeWithChildren(activeNodeArray)
      setActiveNodeArray(activeNodeArray.slice(0, -1))
    }
  }, [
    activeNodeArray,
    removeOpenNodeWithChildren,
    row,
    setActiveNodeArray,
    setAnchorEl,
    showDeleted,
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
}

export default observer(KulturDeleteMenu)