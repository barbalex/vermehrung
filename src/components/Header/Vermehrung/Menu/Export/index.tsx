import { useState } from 'react'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import { FaChevronRight } from 'react-icons/fa'

import { buildExceljsWorksheetsForLieferungenOfYear } from './buildExceljsWorksheetsForLieferungenOfYear.ts'
import { buildExceljsWorksheetsForKulturBedarfsplanung } from './buildExceljsWorksheetsForKulturBedarfsplanung.ts'
import { downloadExceljsWorkbook } from '../../../../../utils/downloadExceljsWorkbook.ts'

import menuStyles from '../Menu.module.css'
import styles from './index.module.css'

export const HeaderExportMenu = ({
  setParentAnchorEl: setGrandParentAnchorEl,
}: {
  setParentAnchorEl: (el: HTMLElement | null) => void
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | undefined | null>(null)

  const onClickExporte = (event: { currentTarget: HTMLElement }) =>
    setAnchorEl(event.currentTarget)

  const onClickLieferungenDesJahrs = (event: {
    target: { value: string }
  }) => {
    const year = event.target.value
    if (year.length === 4) {
      buildExceljsWorksheetsForLieferungenOfYear({ year })
      setAnchorEl(null)
      setGrandParentAnchorEl(null)
    }
  }

  const onClickKulturenFuerBedarfsplanung = async () => {
    const { Workbook } = await import('exceljs/dist/exceljs.min.js')
    const workbook = new Workbook()
    await buildExceljsWorksheetsForKulturBedarfsplanung({
      workbook,
    })
    downloadExceljsWorkbook({
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
        aria-owns={anchorEl ? 'menu' : undefined}
        aria-haspopup="true"
        onClick={onClickExporte}
        className={menuStyles.menuItem}
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
        <MenuItem className={styles.firstMenuItem}>
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
}
