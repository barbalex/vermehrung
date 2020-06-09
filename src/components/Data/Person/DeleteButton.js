import React, { useContext, useState, useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'
import { FaMinus } from 'react-icons/fa'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import axios from 'axios'

import { StoreContext } from '../../../models/reactUtils'
import ErrorBoundary from '../../shared/ErrorBoundary'

const TitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding-right: 16px;
`
const Title = styled.div`
  padding: 12px 16px;
  color: rgba(0, 0, 0, 0.6);
  font-weight: 800;
  user-select: none;
`

const PersonDeleteButton = ({ row }) => {
  const store = useContext(StoreContext)
  const { addNotification, showDeleted } = store
  const {
    activeNodeArray,
    setActiveNodeArray,
    removeOpenNodeWithChildren,
  } = store.tree

  const [anchorEl, setAnchorEl] = useState(null)
  const closeMenu = useCallback(() => {
    setAnchorEl(null)
  }, [])

  const onClickDelete = useCallback(
    (event) => setAnchorEl(event.currentTarget),
    [],
  )
  const remove = useCallback(async () => {
    // delete firebase user
    if (row.account_id) {
      try {
        await axios.get(
          `https://auth.vermehrung.ch/delete-user/${row.account_id}`,
        )
      } catch (error) {
        console.log(error)
        addNotification({
          message: error.response.data,
        })
      }
    }
    row.delete()
    setAnchorEl(null)
    if (!showDeleted) {
      // need to remove openNode from openNodes
      removeOpenNodeWithChildren(activeNodeArray)
      setActiveNodeArray(activeNodeArray.slice(0, -1))
    }
  }, [
    row,
    showDeleted,
    addNotification,
    removeOpenNodeWithChildren,
    activeNodeArray,
    setActiveNodeArray,
  ])

  return (
    <ErrorBoundary>
      <IconButton
        aria-controls="menu"
        aria-haspopup="true"
        aria-label="Person löschen"
        title="Person löschen"
        onClick={onClickDelete}
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
}

export default observer(PersonDeleteButton)
