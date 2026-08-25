import { useState, useEffect } from 'react'
import { useAtomValue } from 'jotai'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import { Q } from '@nozbe/watermelondb'

import {
  dbAtom,
  userAtom,
  filterTableAtoms,
  setFilterValue,
} from '../../../../store/index.js'
import { HeaderExportMenu as ExportMenu } from './Export/index.jsx'
import { HeaderAdminMenu as AdminMenu } from './Admin/index.jsx'
import { version as appVersion, versionDate } from '../../../../../package.json'

import styles from './Menu.module.css'

export const HeaderHamburgerMenu = ({
  anchorEl: parentAnchorEl,
  setAnchorEl: setParentAnchorEl,
}) => {
  const db = useAtomValue(dbAtom)
  const user = useAtomValue(userAtom)
  const artFilter = useAtomValue(filterTableAtoms.art)
  const eventFilter = useAtomValue(filterTableAtoms.event)
  const gartenFilter = useAtomValue(filterTableAtoms.garten)
  const herkunftFilter = useAtomValue(filterTableAtoms.herkunft)
  const kulturFilter = useAtomValue(filterTableAtoms.kultur)
  const lieferungFilter = useAtomValue(filterTableAtoms.lieferung)
  const personFilter = useAtomValue(filterTableAtoms.person)
  const sammelLieferungFilter = useAtomValue(filterTableAtoms.sammel_lieferung)
  const sammlungFilter = useAtomValue(filterTableAtoms.sammlung)
  const teilkulturFilter = useAtomValue(filterTableAtoms.teilkultur)
  const teilzaehlungFilter = useAtomValue(filterTableAtoms.teilzaehlung)
  const zaehlungFilter = useAtomValue(filterTableAtoms.zaehlung)

  const [userRole, setUserRole] = useState(null)
  useEffect(() => {
    const userRoleObservable = db
      .get('user_role')
      .query(Q.on('person', Q.where('account_id', user.uid ?? 'none')))
      .observeWithColumns(['name'])
    const subscription = userRoleObservable.subscribe(([userRole]) => {
      setUserRole(userRole)
    })

    return () => subscription?.unsubscribe?.()
  }, [db, user.uid])

  const onClickShowDeleted = (event) => {
    const value = event.target.checked ? false : null
    setFilterValue({ table: 'art', key: '_deleted', value })
    setFilterValue({ table: 'event', key: '_deleted', value })
    setFilterValue({ table: 'garten', key: '_deleted', value })
    setFilterValue({ table: 'herkunft', key: '_deleted', value })
    setFilterValue({ table: 'kultur', key: '_deleted', value })
    setFilterValue({ table: 'lieferung', key: '_deleted', value })
    setFilterValue({ table: 'person', key: '_deleted', value })
    setFilterValue({ table: 'sammel_lieferung', key: '_deleted', value })
    setFilterValue({ table: 'sammlung', key: '_deleted', value })
    setFilterValue({ table: 'teilkultur', key: '_deleted', value })
    setFilterValue({ table: 'teilzaehlung', key: '_deleted', value })
    setFilterValue({ table: 'zaehlung', key: '_deleted', value })
  }

  const onClickShowActive = (event) => {
    const value = event.target.checked ? true : null
    setFilterValue({ table: 'garten', key: 'aktiv', value })
    setFilterValue({ table: 'kultur', key: 'aktiv', value })
    setFilterValue({ table: 'person', key: 'aktiv', value })
  }

  const activeValue =
    gartenFilter.aktiv === true &&
    kulturFilter.aktiv === true &&
    personFilter.aktiv === true
  const deletedValue =
    artFilter._deleted === false &&
    eventFilter._deleted === false &&
    gartenFilter._deleted === false &&
    herkunftFilter._deleted === false &&
    kulturFilter._deleted === false &&
    lieferungFilter._deleted === false &&
    personFilter._deleted === false &&
    sammelLieferungFilter._deleted === false &&
    sammlungFilter._deleted === false &&
    teilkulturFilter._deleted === false &&
    teilzaehlungFilter._deleted === false &&
    zaehlungFilter._deleted === false

  const onClose = () => setParentAnchorEl(null)

  const onClickUptime = () => {
    window.open('https://uptime.gabriel-software.ch')
    setParentAnchorEl(null)
  }

  const isManager = userRole?.name === 'manager'

  return (
    <Menu
      id="menu"
      anchorEl={parentAnchorEl}
      open={Boolean(parentAnchorEl)}
      onClose={onClose}
    >
      <ExportMenu setParentAnchorEl={setParentAnchorEl} />
      {isManager && <AdminMenu setParentAnchorEl={setParentAnchorEl} />}
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
      <div className={styles.version}>
        Version: {appVersion} vom {versionDate}
      </div>
      <MenuItem onClick={onClickUptime}>
        Verfügbarkeit der Server von vermehrung.ch
      </MenuItem>
    </Menu>
  )
}
