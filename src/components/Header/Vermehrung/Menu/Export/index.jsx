import React, { useContext, useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import styled from '@emotion/styled'

import { MobxStoreContext } from '../../../../../mobxStoreContext.js'
import buildExceljsWorksheetsForLieferungenOfYear from './buildExceljsWorksheetsForLieferungenOfYear.js'
import { buildExceljsWorksheetsForKulturBedarfsplanung } from './buildExceljsWorksheetsForKulturBedarfsplanung.js'
import { downloadExceljsWorkbook } from '../../../../../utils/downloadExceljsWorkbook.js'

const FirstMenuItem = styled(MenuItem)`
  margin-top: -5px !important;
`

export const HeaderExportMenu = observer(
  ({
    anchorEl: parentAnchorEl,
    setAnchorEl: setParentAnchorEl,
    setParentAnchorEl: setGrandParentAnchorEl,
  }) => {
    const store = useContext(MobxStoreContext)

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
      const { Workbook } = await import('exceljs/dist/exceljs.min.js')
      const workbook = new Workbook()
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
  },
)
