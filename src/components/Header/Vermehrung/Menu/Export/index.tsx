import { useState } from 'react'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import { FaChevronRight } from 'react-icons/fa'

import type { Sheet } from 'write-excel-file/browser'

import {
  store,
  exportProgressAtom,
  setExportProgress,
} from '../../../../../store/index.ts'
import { buildSheetsForLieferungenOfYear } from './buildSheetsForLieferungenOfYear.ts'
import { buildSheetsForKulturBedarfsplanung } from './buildSheetsForKulturBedarfsplanung.ts'
import { downloadSheets } from '../../../../../utils/downloadSheets.ts'

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

  const onClickLieferungenDesJahrs = (event: { target: { value: string } }) => {
    const year = event.target.value
    if (year.length === 4) {
      if (store.get(exportProgressAtom)) return
      void buildSheetsForLieferungenOfYear({ year: Number(year) }).finally(() =>
        setExportProgress(null),
      )
      setAnchorEl(null)
      setGrandParentAnchorEl(null)
    }
  }

  const onClickKulturenFuerBedarfsplanung = async () => {
    if (store.get(exportProgressAtom)) return
    const sheets: Sheet<Blob>[] = []
    try {
      await buildSheetsForKulturBedarfsplanung({
        sheets,
      })
      await downloadSheets({
        fileName: `kulturenFuerBedarfsplanung`,
        sheets,
      })
    } finally {
      setExportProgress(null)
    }
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
