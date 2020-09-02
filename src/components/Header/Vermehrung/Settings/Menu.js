import React, { useContext, useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Radio from '@material-ui/core/Radio'
import styled from 'styled-components'

import { StoreContext } from '../../../../models/reactUtils'

const TitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  user-select: none;
`
const Title = styled.div`
  padding: 12px 16px;
  color: rgba(0, 0, 0, 0.6);
  font-weight: 800;
  user-select: none;
`

const SettingsOverallMenu = ({ anchorEl, setAnchorEl }) => {
  const store = useContext(StoreContext)
  const { showDeleted, setShowDeleted, filter } = store

  const onClickShowDeleted = useCallback(
    async (event) => {
      const value = event.target.value === 'false' ? true : null
      console.log('Menu, onClickShowDeleted', {
        value,
        eventValue: event.target.value,
      })
      filter.setValue({ table: 'art', key: 'deleted', value })
      filter.setValue({ table: 'event', key: 'deleted', value })
      filter.setValue({ table: 'garten', key: 'deleted', value })
      filter.setValue({ table: 'herkunft', key: 'deleted', value })
      filter.setValue({ table: 'kultur', key: 'deleted', value })
      filter.setValue({ table: 'lieferung', key: 'deleted', value })
      filter.setValue({ table: 'person', key: 'deleted', value })
      filter.setValue({ table: 'sammel_lieferung', key: 'deleted', value })
      filter.setValue({ table: 'sammlung', key: 'deleted', value })
      filter.setValue({ table: 'teilkultur', key: 'deleted', value })
      filter.setValue({ table: 'teilzaehlung', key: 'deleted', value })
      filter.setValue({ table: 'zaehlung', key: 'deleted', value })
      //setShowDeleted(value)
    },
    [filter],
  )
  const onClickShowActive = useCallback(
    async (event) => {
      const value = event.target.value === 'false' ? true : null
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
    filter.art._deleted === true &&
    filter.event.aktiv === true &&
    filter.garten.aktiv === true &&
    filter.herkunft.aktiv === true &&
    filter.kultur.aktiv === true &&
    filter.lieferung.aktiv === true &&
    filter.person.aktiv === true &&
    filter.sammel_lieferung.aktiv === true &&
    filter.sammlung.aktiv === true &&
    filter.teilkultur.aktiv === true &&
    filter.teilzaehlung.aktiv === true &&
    filter.zaehlung.aktiv === true

  const onClose = useCallback(() => setAnchorEl(null), [setAnchorEl])

  console.log('Menu', { filter, deletedValue })

  return (
    <Menu
      id="menu"
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={onClose}
    >
      <TitleRow>
        <Title>Optionen wählen:</Title>
      </TitleRow>
      <MenuItem>
        <FormControlLabel
          value={deletedValue === true ? 'true' : 'false'}
          control={
            <Radio
              color="primary"
              checked={deletedValue}
              onClick={onClickShowDeleted}
            />
          }
          label="Gelöschte Datensätze verbergen"
          labelPlacement="end"
        />
      </MenuItem>
      <MenuItem>
        <FormControlLabel
          value={activeValue === true ? 'true' : 'false'}
          control={
            <Radio
              color="primary"
              checked={activeValue}
              onClick={onClickShowActive}
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
