import React, { useContext, useCallback, useState } from 'react'
import { observer } from 'mobx-react-lite'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { FaChevronRight } from 'react-icons/fa'
import styled from '@emotion/styled'

import { MobxStoreContext } from '../../../../../mobxStoreContext.js'
import { StyledMenuItem } from '../Menu.jsx'

export const HeaderAdminMenu = observer(
  ({ setParentAnchorEl: setGrandParentAnchorEl }) => {
    const store = useContext(MobxStoreContext)

    const [anchorEl, setAnchorEl] = useState(null)
    const onClickExporte = useCallback(
      (event) => setAnchorEl(event.currentTarget),
      [],
    )

    const onClickImportApData = useCallback(async () => {
      // fetch all art and apflora_ap

      // close menus
      setAnchorEl(null)
      setGrandParentAnchorEl(null)
    }, [setGrandParentAnchorEl, setAnchorEl, store])

    const onClose = useCallback(() => setAnchorEl(null), [setAnchorEl])

    return (
      <>
        <StyledMenuItem
          aria-owns={anchorEl ? 'menu' : null}
          aria-haspopup="true"
          onClick={onClickExporte}
        >
          Administration
          <FaChevronRight />
        </StyledMenuItem>
        <Menu
          id="menuExport"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={onClose}
        >
          <MenuItem onClick={onClickImportApData}>
            AP-Daten (re-)importieren (Stand: 25.1.2025)
          </MenuItem>
        </Menu>
      </>
    )
  },
)
