import { useState } from 'react'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { FaDownload } from 'react-icons/fa'

import { buildExceljsWorksheetsForDaten } from './buildExceljsWorksheetsForDaten.ts'
import { buildExceljsWorksheetsForTzSums } from './buildExceljsWorksheetsForTzSums.ts'
import { downloadExceljsWorkbook } from '../../../../../utils/downloadExceljsWorkbook.ts'
import { ErrorBoundary } from '../../../../shared/ErrorBoundary.tsx'

import styles from './index.module.css'

export const GartenDownload = ({
  gartenId,
}: {
  gartenId: string | undefined
}) => {
  const onClickData = async () => {
    const { Workbook } = await import('exceljs/dist/exceljs.min.js')
    const workbook = new Workbook()
    await buildExceljsWorksheetsForDaten({
      garten_id: gartenId ?? '',
      workbook,
      calledFromHigherUp: false,
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
      garten_id: gartenId ?? '',
      workbook,
    })
    downloadExceljsWorkbook({
      fileName: `Garten_${gartenId}_teilzaehlungen_summen`,
      workbook,
    })
    setAnchorEl(null)
  }

  const [anchorEl, setAnchorEl] = useState<HTMLElement | undefined | null>(null)
  const onClose = () => setAnchorEl(null)
  const onClickOpenMenu = (event: {
    target: { name?: string; value: unknown }
    currentTarget?: HTMLElement
    preventDefault?: () => void
    stopPropagation?: () => void
    key?: string
  }) => setAnchorEl(event.currentTarget)

  return (
    <ErrorBoundary>
      <IconButton
        aria-label="Daten herunterladen"
        aria-owns={anchorEl ? 'long-menu' : undefined}
        aria-haspopup="true"
        title="Daten herunterladen"
        onClick={
                  onClickOpenMenu as unknown as import('react').MouseEventHandler
                }
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
