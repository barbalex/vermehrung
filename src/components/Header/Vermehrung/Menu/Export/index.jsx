import { useContext, useState } from 'react'
import { observer } from 'mobx-react-lite'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import { FaChevronRight } from 'react-icons/fa'

import { MobxStoreContext } from '../../../../../mobxStoreContext.js'
import { buildExceljsWorksheetsForLieferungenOfYear } from './buildExceljsWorksheetsForLieferungenOfYear.js'
import { buildExceljsWorksheetsForKulturBedarfsplanung } from './buildExceljsWorksheetsForKulturBedarfsplanung.js'
import { downloadExceljsWorkbook } from '../../../../../utils/downloadExceljsWorkbook.js'

import { menuItem } from '../Menu.module.css'
import { firstMenuItem } from './index.module.css'

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
        <MenuItem
          aria-owns={anchorEl ? 'menu' : null}
          aria-haspopup="true"
          onClick={onClickExporte}
          className={menuItem}
        >
          Exporte
          <FaChevronRight />
        </MenuItem>
        <Menu
          id="menuExport"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={onClose}
        >
          <MenuItem className={firstMenuItem}>
            <TextField
              label="Lieferungen des Jahrs:"
              onChange={onClickLieferungenDesJahrs}
              variant="standard"
            />
          </MenuItem>
          <MenuItem onClick={onClickKulturenFuerBedarfsplanung}>
            aktueller Stand Kulturen für die Bedarfsplanung
          </MenuItem>
        </Menu>
      </>
    )
  },
)
