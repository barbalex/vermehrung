import React, { useContext, useCallback, useState } from 'react'
import { observer } from 'mobx-react-lite'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'

import { StoreContext } from '../../../../models/reactUtils'
import ExportMenu from './Export'

const SettingsOverallMenu = ({
  anchorEl: parentAnchorEl,
  setAnchorEl: setParentAnchorEl,
}) => {
  const store = useContext(StoreContext)
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

  const onClose = useCallback(() => setParentAnchorEl(null), [
    setParentAnchorEl,
  ])

  const [anchorEl, setAnchorEl] = useState(null)
  const onClickExporte = useCallback(
    (event) => setAnchorEl(event.currentTarget),
    [],
  )

  return (
    <Menu
      id="menu"
      anchorEl={parentAnchorEl}
      open={Boolean(parentAnchorEl)}
      onClose={onClose}
    >
      <MenuItem
        aria-owns={anchorEl ? 'menu' : null}
        aria-haspopup="true"
        onClick={onClickExporte}
      >
        Exporte
      </MenuItem>
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
    </Menu>
  )
}

export default observer(SettingsOverallMenu)