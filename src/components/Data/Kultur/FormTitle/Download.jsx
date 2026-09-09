import { FaDownload } from 'react-icons/fa'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'

import { buildExceljsWorksheetsForKultur } from './buildExceljsWorksheets.js'
import { downloadExceljsWorkbook } from '../../../../utils/downloadExceljsWorkbook.js'

export const KulturDownload = ({ row, asMenu }) => {
  const onClickDownload = async () => {
    const { Workbook } = await import('exceljs/dist/exceljs.min.js')
    const workbook = new Workbook()
    await buildExceljsWorksheetsForKultur({
      kultur_id: row.id,
      workbook,
    })
    downloadExceljsWorkbook({ fileName: `Kultur_${row.id}`, workbook })
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
