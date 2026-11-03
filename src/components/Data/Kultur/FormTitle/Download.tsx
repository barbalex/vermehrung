import { FaDownload } from 'react-icons/fa'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'

import type { Sheet } from 'write-excel-file/browser'

import {
  store,
  exportProgressAtom,
  setExportProgress,
} from '../../../../store/index.ts'
import { buildSheetsForKultur } from './buildSheets.ts'
import { downloadSheets } from '../../../../utils/downloadSheets.ts'

export const KulturDownload = ({
  row,
  asMenu,
}: {
  row?: import('../../../../dbModel.ts').Kultur | null | undefined
  asMenu?: boolean
}) => {
  const onClickDownload = async () => {
    if (store.get(exportProgressAtom)) return
    const sheets: Sheet<Blob>[] = []
    try {
      await buildSheetsForKultur({
        kultur_id: row?.id ?? '',
        kultur_name: undefined,
        sheets,
        calledFromHigherUp: false,
      })
      await downloadSheets({ fileName: `Kultur_${row?.id}`, sheets })
    } finally {
      setExportProgress(null)
    }
  }

  if (asMenu) {
    return <MenuItem onClick={onClickDownload}>Daten herunterladen</MenuItem>
  }

  return (
    <IconButton
      aria-label="Daten herunterladen"
      title="Daten herunterladen"
      onClick={onClickDownload}
      size="large"
    >
      <FaDownload />
    </IconButton>
  )
}
