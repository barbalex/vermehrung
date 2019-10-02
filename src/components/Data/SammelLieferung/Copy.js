import React, { useContext, useCallback, useState } from 'react'
import { observer } from 'mobx-react-lite'
import gql from 'graphql-tag'
import { useApolloClient } from '@apollo/react-hooks'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { FaCopy } from 'react-icons/fa'
import ErrorBoundary from 'react-error-boundary'
import get from 'lodash/get'
import styled from 'styled-components'

import storeContext from '../../../storeContext'
import { personFelder as personFelderFragment } from '../../../utils/fragments'

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

const CopySammelLieferungMenu = ({ sammelLieferung, lieferungId }) => {
  const client = useApolloClient()
  const store = useContext(storeContext)
  const { enqueNotification } = store

  const [anchorEl, setAnchorEl] = useState(null)
  const onClose = useCallback(() => setAnchorEl(null), [])
  const onClickConfig = useCallback(
    event => setAnchorEl(event.currentTarget),
    [],
  )
  const onClickActiveLieferung = useCallback(() => {
    setAnchorEl(null)
    ;('TODO:')
  }, [])
  const onClickAllLieferung = useCallback(() => {
    setAnchorEl(null)
    ;('TODO:')
  }, [])

  return (
    <ErrorBoundary>
      <IconButton
        aria-label="Daten kopieren"
        aria-owns={anchorEl ? 'long-menu' : null}
        aria-haspopup="true"
        title="Daten kopieren"
        onClick={onClickConfig}
      >
        <FaCopy />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={onClose}
      >
        <TitleRow>
          <Title>Die Daten der Sammel-Lieferung kopieren:</Title>
        </TitleRow>
        {lieferungId && (
          <MenuItem onClick={onClickActiveLieferung}>
            in die links angezeigte Lieferung
          </MenuItem>
        )}
        <MenuItem onClick={onClickAllLieferung}>in alle Lieferungen</MenuItem>
      </Menu>
    </ErrorBoundary>
  )
}

export default observer(CopySammelLieferungMenu)
