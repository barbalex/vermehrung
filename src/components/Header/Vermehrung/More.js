// no more in use
import React, { useState, useCallback } from 'react'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'
import styled from 'styled-components'
import { observer } from 'mobx-react-lite'
import { navigate } from 'gatsby'

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
const Version = styled.div`
  padding: 12px 16px;
  color: rgba(0, 0, 0, 0.87);
  user-select: none;
`

const MyAppBar = () => {
  const [anchorEl, setAnchorEl] = useState(null)

  const onClickUserDocs = useCallback(() => {
    setAnchorEl(null)
    navigate('/Dokumentation/Benutzer/')
  }, [])
  const onClickTechDocs = useCallback(() => {
    setAnchorEl(null)
    navigate('/Dokumentation/Technisch/')
  }, [])
  const onClickMehrButton = useCallback(
    event => setAnchorEl(event.currentTarget),
    [],
  )
  const onClose = useCallback(() => setAnchorEl(null), [])

  return (
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
        <MenuItem onClick={onClickTechDocs}>Technische Dokumentation</MenuItem>
        <Version>Version: 0.3.0 vom 13.09.2019</Version>
      </Menu>
    </Container>
  )
}

export default observer(MyAppBar)
