import React, { useContext, useCallback, useState } from 'react'
import { observer } from 'mobx-react-lite'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import * as ExcelJs from 'exceljs/dist/exceljs.min.js'
import styled from 'styled-components'
import CircularProgress from '@mui/material/CircularProgress'

import StoreContext from '../../../../../storeContext'
import buildExceljsWorksheetsForLieferungenOfYear from './buildExceljsWorksheetsForLieferungenOfYear'
import buildExceljsWorksheetsForKulturBedarfsplanung from './buildExceljsWorksheetsForKulturBedarfsplanung'
import downloadExceljsWorkbook from '../../../../../utils/downloadExceljsWorkbook'

const FirstMenuItem = styled(MenuItem)`
  margin-top: -5px !important;
`
const StyledMenuItem = styled(MenuItem)`
  min-height: 54px !important;
`
const StyledCircularProgress = styled(CircularProgress)`
  svg {
    transform: scale(0.4);
  }
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

  const [bedarfsplanungLoading, setBedarfsplanungLoading] = useState(false)
  const onClickKulturenFuerBedarfsplanung = useCallback(async () => {
    setBedarfsplanungLoading(true)
    const workbook = new ExcelJs.Workbook()
    await buildExceljsWorksheetsForKulturBedarfsplanung({
      store,
      workbook,
    })
    await downloadExceljsWorkbook({
      store,
      fileName: `kulturenFuerBedarfsplanung`,
      workbook,
    })
    setBedarfsplanungLoading(false)
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
      <StyledMenuItem onClick={onClickKulturenFuerBedarfsplanung}>
        aktueller Stand Kulturen für die Bedarfsplanung
        <>{bedarfsplanungLoading && <StyledCircularProgress />}</>
      </StyledMenuItem>
    </Menu>
  )
}

export default observer(SettingsOverallMenu)
