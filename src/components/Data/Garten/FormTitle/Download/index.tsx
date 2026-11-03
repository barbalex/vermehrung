import { useState } from 'react'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { FaDownload } from 'react-icons/fa'

import type { Sheet } from 'write-excel-file/browser'

import {
  store,
  exportProgressAtom,
  setExportProgress,
} from '../../../../../store/index.ts'
import { buildSheetsForDaten } from './buildSheetsForDaten.ts'
import { buildSheetsForTzSums } from './buildSheetsForTzSums.ts'
import { downloadSheets } from '../../../../../utils/downloadSheets.ts'
import { ErrorBoundary } from '../../../../shared/ErrorBoundary.tsx'

import styles from './index.module.css'

export const GartenDownload = ({
  gartenId,
}: {
  gartenId: string | undefined
}) => {
  const onClickData = async () => {
    if (store.get(exportProgressAtom)) return
    const sheets: Sheet<Blob>[] = []
    try {
      await buildSheetsForDaten({
        garten_id: gartenId ?? '',
        sheets,
        calledFromHigherUp: false,
      })
      await downloadSheets({
        fileName: `Garten_${gartenId}_rohdaten`,
        sheets,
      })
    } finally {
      setExportProgress(null)
    }
    setAnchorEl(null)
  }

  const onClickTzSums = async () => {
    if (store.get(exportProgressAtom)) return
    const sheets: Sheet<Blob>[] = []
    try {
      await buildSheetsForTzSums({
        garten_id: gartenId ?? '',
        sheets,
      })
      await downloadSheets({
        fileName: `Garten_${gartenId}_teilzaehlungen_summen`,
        sheets,
      })
    } finally {
      setExportProgress(null)
    }
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
