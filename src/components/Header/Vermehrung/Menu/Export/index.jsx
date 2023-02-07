import React, { useContext, useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import * as ExcelJs from 'exceljs/dist/exceljs.min.js'
import styled from '@emotion/styled'

import StoreContext from '../../../../../storeContext'
import buildExceljsWorksheetsForLieferungenOfYear from './buildExceljsWorksheetsForLieferungenOfYear'
import buildExceljsWorksheetsForKulturBedarfsplanung from './buildExceljsWorksheetsForKulturBedarfsplanung'
import downloadExceljsWorkbook from '../../../../../utils/downloadExceljsWorkbook'

const FirstMenuItem = styled(MenuItem)`
  margin-top: -5px !important;
`

const SettingsOverallMenu = ({
  anchorEl: parentAnchorEl,
  setAnchorEl: setParentAnchorEl,
  setParentAnchorEl: setGrandParentAnchorEl,
}) => {
  const store = useContext(StoreContext)

  const onClickLieferungenDesJahrs = useCallback(
    (event) => {
      const year = event.target.value
      if (year.length === 4) {
        buildExceljsWorksheetsForLieferungenOfYear({ year, store })
        setParentAnchorEl(null)
        setGrandParentAnchorEl(null)
      }
    },
    [setGrandParentAnchorEl, setParentAnchorEl, store],
  )
  const onClickKulturenFuerBedarfsplanung = useCallback(async () => {
    const workbook = new ExcelJs.Workbook()
    await buildExceljsWorksheetsForKulturBedarfsplanung({
      store,
      workbook,
    })
    downloadExceljsWorkbook({
      store,
      fileName: `kulturenFuerBedarfsplanung`,
      workbook,
    })
    setParentAnchorEl(null)
    setGrandParentAnchorEl(null)
  }, [setGrandParentAnchorEl, setParentAnchorEl, store])

  const onClose = useCallback(
    () => setParentAnchorEl(null),
    [setParentAnchorEl],
  )

  return (
    <Menu
      id="menuExport"
      anchorEl={parentAnchorEl}
      open={Boolean(parentAnchorEl)}
      onClose={onClose}
    >
      <FirstMenuItem>
        <TextField
          label="Lieferungen des Jahrs:"
          onChange={onClickLieferungenDesJahrs}
          variant="standard"
        />
      </FirstMenuItem>
      <MenuItem onClick={onClickKulturenFuerBedarfsplanung}>
        aktueller Stand Kulturen für die Bedarfsplanung
      </MenuItem>
    </Menu>
  )
}

export default observer(SettingsOverallMenu)
