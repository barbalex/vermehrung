import { useContext, useState } from 'react'
import { observer } from 'mobx-react-lite'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import { FaChevronRight } from 'react-icons/fa'
import styled from '@emotion/styled'

import { MobxStoreContext } from '../../../../../mobxStoreContext.js'
import { buildExceljsWorksheetsForLieferungenOfYear } from './buildExceljsWorksheetsForLieferungenOfYear.js'
import { buildExceljsWorksheetsForKulturBedarfsplanung } from './buildExceljsWorksheetsForKulturBedarfsplanung.js'
import { downloadExceljsWorkbook } from '../../../../../utils/downloadExceljsWorkbook.js'
import { StyledMenuItem } from '../Menu.jsx'

const FirstMenuItem = styled(MenuItem)`
  margin-top: -5px !important;
`

export const HeaderExportMenu = observer(
  ({ setParentAnchorEl: setGrandParentAnchorEl }) => {
    const store = useContext(MobxStoreContext)

    const [anchorEl, setAnchorEl] = useState(null)

    const onClickExporte = (event) => setAnchorEl(event.currentTarget)

    const onClickLieferungenDesJahrs = (event) => {
      const year = event.target.value
      if (year.length === 4) {
        buildExceljsWorksheetsForLieferungenOfYear({ year, store })
        setAnchorEl(null)
        setGrandParentAnchorEl(null)
      }
    }

    const onClickKulturenFuerBedarfsplanung = async () => {
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
      setAnchorEl(null)
      setGrandParentAnchorEl(null)
    }

    const onClose = () => setAnchorEl(null)

    return (
      <>
        <StyledMenuItem
          aria-owns={anchorEl ? 'menu' : null}
          aria-haspopup="true"
          onClick={onClickExporte}
        >
          Exporte
          <FaChevronRight />
        </StyledMenuItem>
        <Menu
          id="menuExport"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
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
      </>
    )
  },
)
