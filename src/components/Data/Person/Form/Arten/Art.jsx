import React, { useCallback, useEffect, useState, useContext } from 'react'
import { observer } from 'mobx-react-lite'
import styled from '@emotion/styled'
import { FaTimes } from 'react-icons/fa'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { first as first$ } from 'rxjs/operators'

import ErrorBoundary from '../../../../shared/ErrorBoundary.jsx'
import StoreContext from '../../../../../storeContext'

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
  const store = useContext(StoreContext)

  const [delMenuAnchorEl, setDelMenuAnchorEl] = useState(null)
  const delMenuOpen = Boolean(delMenuAnchorEl)

  const onClose = useCallback(() => setDelMenuAnchorEl(null), [])
  const onClickDeleteIcon = useCallback(
    (event) => setDelMenuAnchorEl(event.currentTarget),
    [],
  )
  const onClickDelete = useCallback(() => {
    av.delete({ store })
    setDelMenuAnchorEl(null)
  }, [av, store])

  const [artLabel, setArtLabel] = useState(null)
  useEffect(() => {
    const subscription = av.art.observe().subscribe(async (art) => {
      let label
      try {
        label = await art.label.pipe(first$()).toPromise()
      } catch {}

      setArtLabel(label)
    })

    return () => subscription?.unsubscribe?.()
  }, [av.art])

  if (!av) return null
  if (!artLabel) return null

  return (
    <ErrorBoundary>
      <Container>
        <Text>
          <div>{artLabel}</div>
        </Text>
        <DelIcon
          title="löschen"
          aria-label="löschen"
          aria-owns={delMenuOpen ? 'delMenu' : undefined}
          aria-haspopup="true"
          onClick={onClickDeleteIcon}
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
          <MenuItem onClick={onClickDelete}>ja</MenuItem>
          <MenuItem onClick={onClose}>nein</MenuItem>
        </Menu>
      </Container>
    </ErrorBoundary>
  )
}

export default observer(Av)
