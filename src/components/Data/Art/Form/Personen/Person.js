import React, { useCallback, useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'
import { FaTimes } from 'react-icons/fa'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

import ErrorBoundary from '../../../../shared/ErrorBoundary'
import personLabelFromPerson from '../../../../../utils/personLabelFromPerson'

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

const Av = ({ av }) => {
  const [delMenuAnchorEl, setDelMenuAnchorEl] = React.useState(null)
  const delMenuOpen = Boolean(delMenuAnchorEl)

  const onClose = useCallback(() => setDelMenuAnchorEl(null), [])
  const onClickIcon = useCallback(
    (event) => setDelMenuAnchorEl(event.currentTarget),
    [],
  )

  const [personLabel, setPersonLabel] = useState(null)
  useEffect(() => {
    const personSubscription = av.person.observe().subscribe(async (person) => {
      setPersonLabel(personLabelFromPerson({ person }))
    })
    return () => personSubscription.unsubscribe()
  }, [av.person])

  if (!av) return null
  if (!personLabel) return null

  return (
    <ErrorBoundary>
      <Container>
        <Text>
          <div>{personLabel}</div>
        </Text>
        <DelIcon
          title="löschen"
          aria-label="löschen"
          aria-owns={delMenuOpen ? 'delMenu' : undefined}
          aria-haspopup="true"
          onClick={onClickIcon}
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
          <MenuItem onClick={av.delete}>ja</MenuItem>
          <MenuItem onClick={onClose}>nein</MenuItem>
        </Menu>
      </Container>
    </ErrorBoundary>
  )
}

export default observer(Av)
