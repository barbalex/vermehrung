import { useContext, useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import { FaChevronRight } from 'react-icons/fa'
import styled from '@emotion/styled'
import { interval, combineLatest } from 'rxjs'
import { Q } from '@nozbe/watermelondb'

import { MobxStoreContext } from '../../../../mobxStoreContext.js'
import { HeaderExportMenu as ExportMenu } from './Export/index.jsx'
import { HeaderAdminMenu as AdminMenu } from './Admin/index.jsx'

export const StyledMenuItem = styled(MenuItem)`
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
    const { filter, user, db } = store

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
    }, [db, store, user.uid])

    const onClickShowDeleted = (event) => {
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
    }

    const onClickShowActive = (event) => {
      const value = event.target.checked ? true : null
      filter.setValue({ table: 'garten', key: 'aktiv', value })
      filter.setValue({ table: 'kultur', key: 'aktiv', value })
      filter.setValue({ table: 'person', key: 'aktiv', value })
    }

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

    const onClose = () => setParentAnchorEl(null)

    const onClickUptime = () => {
      window.open('https://uptime.vermehrung.ch')
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
        <Version>Version: 1.21.13 vom 28.10.2025</Version>
        <MenuItem onClick={onClickUptime}>
          Verfügbarkeit der Server von vermehrung.ch
        </MenuItem>
      </Menu>
    )
  },
)
