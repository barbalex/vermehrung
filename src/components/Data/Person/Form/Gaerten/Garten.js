import React, { useCallback, useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'
import { FaTimes } from 'react-icons/fa'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

import ErrorBoundary from '../../../../shared/ErrorBoundary'
import gartenLabelFromGarten from '../../../../../utils/gartenLabelFromGarten'

const Container = styled.div`
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  margin-left: -10px;
  margin-right: -10px;
  padding-left: 10px;
  padding-right: 13px;
  border-bottom: thin solid #0000001c;
  &:hover {
    background-color: rgba(74, 20, 140, 0.03);
  }
`
const Text = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`
const DelIcon = styled(IconButton)`
  svg {
    font-size: 1.1rem;
  }
`
const MenuTitle = styled.h3`
  padding-top: 8px;
  padding-left: 15px;
  padding-right: 16px;
  padding-bottom: 0;
  margin-bottom: 3px;
  &:focus {
    outline: none;
  }
`

const Garten = ({ gv }) => {
  const [delMenuAnchorEl, setDelMenuAnchorEl] = useState(null)
  const delMenuOpen = Boolean(delMenuAnchorEl)

  const onClose = useCallback(() => setDelMenuAnchorEl(null), [])
  const onClickDelete = useCallback(
    (event) => setDelMenuAnchorEl(event.currentTarget),
    [],
  )

  const [gartenLabel, setGartenLabel] = useState(null)
  useEffect(() => {
    const fetchGarten = async () => {
      const garten = await gv.garten.fetch()
      const person = await garten.person.fetch()
      setGartenLabel(gartenLabelFromGarten({ garten, person }))
    }
    fetchGarten()
  }, [gv.garten])

  if (!gv) return null
  if (!gartenLabel) return null

  return (
    <ErrorBoundary>
      <Container>
        <Text>
          <div>{gartenLabel}</div>
        </Text>
        <DelIcon
          title="löschen"
          aria-label="löschen"
          aria-owns={delMenuOpen ? 'delMenu' : undefined}
          aria-haspopup="true"
          onClick={onClickDelete}
        >
          <FaTimes />
        </DelIcon>
        <Menu
          id="delMenu"
          anchorEl={delMenuAnchorEl}
          open={delMenuOpen}
          onClose={onClose}
          PaperProps={{
            style: {
              maxHeight: 48 * 4.5,
              width: 120,
            },
          }}
        >
          <MenuTitle>löschen?</MenuTitle>
          <MenuItem onClick={gv.delete}>ja</MenuItem>
          <MenuItem onClick={onClose}>nein</MenuItem>
        </Menu>
      </Container>
    </ErrorBoundary>
  )
}

export default observer(Garten)
