// @flow
import React, { useState, useCallback } from 'react'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'
import styled from 'styled-components'
import { observer } from 'mobx-react-lite'
import { navigate } from 'gatsby'

import ErrorBoundary from '../ErrorBoundary'

const Container = styled.div`
  margin-top: auto;
  margin-bottom: auto;
`
const MehrButton = styled(Button)`
  color: white !important;
  border-color: rgba(255, 255, 255, 0.5) !important;
  border-width: 0 !important;
  &:hover {
    border-width: 1px !important;
  }
`

const MyAppBar = () => {
  const [anchorEl, setAnchorEl] = useState(null)

  const onClickUserDocs = useCallback(() => {
    setAnchorEl(null)
    navigate('/Benutzer-Dokumentation/')
  })
  const onClickTechDocs = useCallback(() => {
    setAnchorEl(null)
    navigate('/Technische-Dokumentation/')
  })
  const onClickMehrButton = useCallback(event =>
    setAnchorEl(event.currentTarget),
  )
  const onClose = useCallback(() => setAnchorEl(null))

  return (
    <ErrorBoundary>
      <Container>
        <MehrButton
          variant="outlined"
          aria-label="Mehr"
          aria-owns={anchorEl ? 'long-menu' : null}
          aria-haspopup="true"
          onClick={onClickMehrButton}
        >
          Mehr
        </MehrButton>
        <Menu
          id="long-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={onClose}
        >
          <MenuItem onClick={onClickUserDocs}>Benutzer-Dokumentation</MenuItem>
          <MenuItem onClick={onClickTechDocs}>
            Technische Dokumentation
          </MenuItem>
        </Menu>
      </Container>
    </ErrorBoundary>
  )
}

export default observer(MyAppBar)
