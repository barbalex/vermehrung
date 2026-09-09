import { useState } from 'react'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { FaDownload } from 'react-icons/fa'

import { buildExceljsWorksheetsForDaten } from './buildExceljsWorksheetsForDaten.js'
import { buildExceljsWorksheetsForTzSums } from './buildExceljsWorksheetsForTzSums.js'
import { downloadExceljsWorkbook } from '../../../../../utils/downloadExceljsWorkbook.js'
import { ErrorBoundary } from '../../../../shared/ErrorBoundary.jsx'

import styles from './index.module.css'

export const GartenDownload = ({ gartenId }) => {
  const onClickData = async () => {
    const { Workbook } = await import('exceljs/dist/exceljs.min.js')
    const workbook = new Workbook()
    await buildExceljsWorksheetsForDaten({
      garten_id: gartenId,
      workbook,
    })
    downloadExceljsWorkbook({
      fileName: `Garten_${gartenId}_rohdaten`,
      workbook,
    })
    setAnchorEl(null)
  }

  const onClickTzSums = async () => {
    const { Workbook } = await import('exceljs/dist/exceljs.min.js')
    const workbook = new Workbook()
    await buildExceljsWorksheetsForTzSums({
      garten_id: gartenId,
      workbook,
    })
    downloadExceljsWorkbook({
      fileName: `Garten_${gartenId}_teilzaehlungen_summen`,
      workbook,
    })
    setAnchorEl(null)
  }

  const [anchorEl, setAnchorEl] = useState(null)
  const onClose = () => setAnchorEl(null)
  const onClickOpenMenu = (event) => setAnchorEl(event.currentTarget)

  return (
    <ErrorBoundary>
      <IconButton
        aria-label="Daten herunterladen"
        aria-owns={anchorEl ? 'long-menu' : null}
        aria-haspopup="true"
        title="Daten herunterladen"
        onClick={onClickOpenMenu}
        size="large"
      >
        <FaDownload />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={onClose}
      >
        <div className={styles.titleRow}>
          <div className={styles.title}>herunterladen:</div>
        </div>
        <MenuItem onClick={onClickData}>{`(Roh-)Daten`}</MenuItem>
        <MenuItem
          onClick={onClickTzSums}
        >{`Auswertung der Teil-Zählungen`}</MenuItem>
      </Menu>
    </ErrorBoundary>
  )
}
