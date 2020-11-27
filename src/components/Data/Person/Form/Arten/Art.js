import React, { useCallback, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'
import { FaTimes } from 'react-icons/fa'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { useDatabase } from '@nozbe/watermelondb/hooks'

import ErrorBoundary from '../../../../shared/ErrorBoundary'
import artLabelFromAeArt from '../../../../../utils/artLabelFromAeArt'

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
  const [delMenuAnchorEl, setDelMenuAnchorEl] = useState(null)
  const delMenuOpen = Boolean(delMenuAnchorEl)
  const onClickNein = useCallback(() => setDelMenuAnchorEl(null), [])

  const db = useDatabase()
  const [artLabel, setArtLabel] = useState(null)
  useEffect(() => {
    const fetchArt = async () => {
      //const art = await db.collections.get('art').find(av.art_id)
      const art = await av.art.fetch()
      const ae_art = await db.collections.get('ae_art').find(art.ae_id)
      setArtLabel(artLabelFromAeArt({ ae_art }))
    }
    fetchArt()
  }, [av.art, db.collections])

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
          onClick={(event) => setDelMenuAnchorEl(event.currentTarget)}
        >
          <FaTimes />
        </DelIcon>
        <Menu
          id="delMenu"
          anchorEl={delMenuAnchorEl}
          open={delMenuOpen}
          onClose={() => setDelMenuAnchorEl(null)}
          PaperProps={{
            style: {
              maxHeight: 48 * 4.5,
              width: 120,
            },
          }}
        >
          <MenuTitle>löschen?</MenuTitle>
          <MenuItem onClick={av.delete}>ja</MenuItem>
          <MenuItem onClick={onClickNein}>nein</MenuItem>
        </Menu>
      </Container>
    </ErrorBoundary>
  )
}

export default observer(Av)
