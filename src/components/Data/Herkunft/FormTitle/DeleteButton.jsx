import React, { useContext, useState, useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import styled from '@emotion/styled'
import { FaMinus } from 'react-icons/fa'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

import { MobxStoreContext } from '../../../../mobxStoreContext.js'
import { ErrorBoundary } from '../../../shared/ErrorBoundary.jsx'

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

export const HerkunftDeleteButton = observer(({ row }) => {
  const store = useContext(MobxStoreContext)
  const { filter } = store
  const { activeNodeArray, setActiveNodeArray, removeOpenNodeWithChildren } =
    store.tree

  const [anchorEl, setAnchorEl] = useState(null)
  const closeMenu = useCallback(() => {
    setAnchorEl(null)
  }, [])

  const onClickButton = useCallback(
    (event) => setAnchorEl(event.currentTarget),
    [],
  )
  const remove = useCallback(async () => {
    await row.delete({ store })
    setAnchorEl(null)
    if (filter.herkunft._deleted === false) {
      // need to remove openNode from openNodes
      removeOpenNodeWithChildren(activeNodeArray)
      setActiveNodeArray(activeNodeArray.slice(0, -1))
    }
  }, [
    row,
    filter.herkunft._deleted,
    removeOpenNodeWithChildren,
    activeNodeArray,
    setActiveNodeArray,
    store,
  ])

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
        <TitleRow>
          <Title>Wirklich löschen?</Title>
        </TitleRow>
        <MenuItem onClick={remove}>Ja, weg damit!</MenuItem>
        <MenuItem onClick={closeMenu}>Nein, abbrechen!</MenuItem>
      </Menu>
    </ErrorBoundary>
  )
})
