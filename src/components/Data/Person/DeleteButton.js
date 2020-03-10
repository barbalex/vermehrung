import React, { useContext, useState, useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import { useApolloClient } from '@apollo/react-hooks'
import styled from 'styled-components'
import ErrorBoundary from 'react-error-boundary'
import { FaMinus } from 'react-icons/fa'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

import storeContext from '../../../storeContext'
import firebaseContext from '../../../firebaseContext'
import deleteDataset from '../../TreeContainer/Tree/delete'

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
  const client = useApolloClient()
  const store = useContext(storeContext)
  const firebase = useContext(firebaseContext)

  const [anchorEl, setAnchorEl] = useState(null)
  const closeMenu = useCallback(() => {
    setAnchorEl(null)
  }, [])

  const onClickDelete = useCallback(
    event => setAnchorEl(event.currentTarget),
    [],
  )
  const remove = useCallback(() => {
    const node = { url: ['Personen', row.id] }
    deleteDataset({ node, store, client })
    firebase
      .auth()
      .currentUser.delete()
      .catch(error => console.log(error))
  }, [client, firebase, row.id, store])

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
