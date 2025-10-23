import { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { FaDownload } from 'react-icons/fa'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'

import { MobxStoreContext } from '../../../../mobxStoreContext.js'
import { buildExceljsWorksheetsForKultur } from './buildExceljsWorksheets.js'
import { downloadExceljsWorkbook } from '../../../../utils/downloadExceljsWorkbook.js'

export const KulturDownload = observer(({ row, asMenu }) => {
  const store = useContext(MobxStoreContext)

  const onClickDownload = async () => {
    const { Workbook } = await import('exceljs/dist/exceljs.min.js')
    const workbook = new Workbook()
    await buildExceljsWorksheetsForKultur({
      store,
      kultur_id: row.id,
      workbook,
    })
    downloadExceljsWorkbook({ store, fileName: `Kultur_${row.id}`, workbook })
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
})
