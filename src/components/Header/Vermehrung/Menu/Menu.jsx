import React, { useContext, useCallback, useState } from 'react'
import { observer } from 'mobx-react-lite'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import { FaChevronRight } from 'react-icons/fa'
import styled from '@emotion/styled'

import { MobxStoreContext } from '../../../../mobxStoreContext.js'
import { HeaderExportMenu as ExportMenu } from './Export/index.jsx'

const StyledMenuItem = styled(MenuItem)`
  display: flex !important;
  justify-content: space-between !important;
  align-items: center !important;
  svg {
    color: #4a148c;
  }
`
const Version = styled.div`
  padding: 12px 16px;
  color: rgba(0, 0, 0, 0.5);
  user-select: none;
`

export const HeaderHamburgerMenu = observer(
  ({ anchorEl: parentAnchorEl, setAnchorEl: setParentAnchorEl }) => {
    const store = useContext(MobxStoreContext)
    const { filter } = store

    const onClickShowDeleted = useCallback(
      (event) => {
        const value = event.target.checked ? false : null
        filter.setValue({ table: 'art', key: '_deleted', value })
        filter.setValue({ table: 'event', key: '_deleted', value })
        filter.setValue({ table: 'garten', key: '_deleted', value })
        filter.setValue({ table: 'herkunft', key: '_deleted', value })
        filter.setValue({ table: 'kultur', key: '_deleted', value })
        filter.setValue({ table: 'lieferung', key: '_deleted', value })
        filter.setValue({ table: 'person', key: '_deleted', value })
        filter.setValue({ table: 'sammel_lieferung', key: '_deleted', value })
        filter.setValue({ table: 'sammlung', key: '_deleted', value })
        filter.setValue({ table: 'teilkultur', key: '_deleted', value })
        filter.setValue({ table: 'teilzaehlung', key: '_deleted', value })
        filter.setValue({ table: 'zaehlung', key: '_deleted', value })
      },
      [filter],
    )
    const onClickShowActive = useCallback(
      (event) => {
        const value = event.target.checked ? true : null
        filter.setValue({ table: 'garten', key: 'aktiv', value })
        filter.setValue({ table: 'kultur', key: 'aktiv', value })
        filter.setValue({ table: 'person', key: 'aktiv', value })
      },
      [filter],
    )
    const activeValue =
      filter.garten.aktiv === true &&
      filter.kultur.aktiv === true &&
      filter.person.aktiv === true
    const deletedValue =
      filter.art._deleted === false &&
      filter.event._deleted === false &&
      filter.garten._deleted === false &&
      filter.herkunft._deleted === false &&
      filter.kultur._deleted === false &&
      filter.lieferung._deleted === false &&
      filter.person._deleted === false &&
      filter.sammel_lieferung._deleted === false &&
      filter.sammlung._deleted === false &&
      filter.teilkultur._deleted === false &&
      filter.teilzaehlung._deleted === false &&
      filter.zaehlung._deleted === false

    const onClose = useCallback(
      () => setParentAnchorEl(null),
      [setParentAnchorEl],
    )

    const [anchorEl, setAnchorEl] = useState(null)
    const onClickExporte = useCallback(
      (event) => setAnchorEl(event.currentTarget),
      [],
    )

    const onClickUptime = useCallback(() => {
      window.open('https://uptime.vermehrung.ch')
      setAnchorEl(null)
    }, [])

    return (
      <Menu
        id="menu"
        anchorEl={parentAnchorEl}
        open={Boolean(parentAnchorEl)}
        onClose={onClose}
      >
        <StyledMenuItem
          aria-owns={anchorEl ? 'menu' : null}
          aria-haspopup="true"
          onClick={onClickExporte}
        >
          Exporte
          <FaChevronRight />
        </StyledMenuItem>
        <ExportMenu
          anchorEl={anchorEl}
          setAnchorEl={setAnchorEl}
          setParentAnchorEl={setParentAnchorEl}
        />
        <MenuItem>
          <FormControlLabel
            control={
              <Checkbox
                color="primary"
                checked={deletedValue}
                onChange={onClickShowDeleted}
              />
            }
            label="Gelöschte Datensätze verbergen"
            labelPlacement="end"
          />
        </MenuItem>
        <MenuItem>
          <FormControlLabel
            control={
              <Checkbox
                color="primary"
                checked={activeValue}
                onChange={onClickShowActive}
                name="why-is-this-not-working"
              />
            }
            label="Inaktive Gärten, Kulturen und Personen verbergen"
            labelPlacement="end"
          />
        </MenuItem>
        <Version>Version: 1.19.1 vom 28.1.2025</Version>
        <MenuItem onClick={onClickUptime}>
          Verfügbarkeit der Server von vermehrung.ch
        </MenuItem>
      </Menu>
    )
  },
)
