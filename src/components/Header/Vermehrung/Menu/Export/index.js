import React, { useContext, useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'
import * as ExcelJs from 'exceljs/dist/exceljs.min.js'

import { StoreContext } from '../../../../../models/reactUtils'
import buildExceljsWorksheets from './buildExceljsWorksheets'
import buildExceljsWorksheetsForKulturBedarfsplanung from './buildExceljsWorksheetsForKulturBedarfsplanung'
import downloadExceljsWorkbook from '../../../../../utils/downloadExceljsWorkbook'

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
        buildExceljsWorksheets({ year, store })
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

  const onClose = useCallback(() => setParentAnchorEl(null), [
    setParentAnchorEl,
  ])

  return (
    <Menu
      id="menuExport"
      anchorEl={parentAnchorEl}
      open={Boolean(parentAnchorEl)}
      onClose={onClose}
    >
      <MenuItem>
        <TextField
          label="Lieferungen des Jahrs:"
          onChange={onClickLieferungenDesJahrs}
        />
      </MenuItem>
      <MenuItem onClick={onClickKulturenFuerBedarfsplanung}>
        aktueller Stand Kulturen für die Bedarfsplanung
      </MenuItem>
    </Menu>
  )
}

export default observer(SettingsOverallMenu)
