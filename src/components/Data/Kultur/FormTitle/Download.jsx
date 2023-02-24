import React, { useContext, useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import { FaDownload } from 'react-icons/fa'
import IconButton from '@mui/material/IconButton'
// see: https://github.com/guyonroche/exceljs/issues/313
import * as ExcelJs from 'exceljs/dist/exceljs.min.js'
import MenuItem from '@mui/material/MenuItem'

import StoreContext from '../../../../storeContext'
import buildExceljsWorksheets from './buildExceljsWorksheets'
import downloadExceljsWorkbook from '../../../../utils/downloadExceljsWorkbook'

const Download = ({ row, asMenu }) => {
  const store = useContext(StoreContext)

  const onClickDownload = useCallback(async () => {
    const workbook = new ExcelJs.Workbook()
    await buildExceljsWorksheets({ store, kultur_id: row.id, workbook })
    downloadExceljsWorkbook({ store, fileName: `Kultur_${row.id}`, workbook })
  }, [row.id, store])

  if (asMenu) {
    return <MenuItem onClick={onClickDownload}>Daten herunterladen</MenuItem>
  }

  return (
    <IconButton
      aria-label="Daten herunterladen"
      title="Daten herunterladen"
      onClick={onClickDownload}
      size="large">
      <FaDownload />
    </IconButton>
  );
}

export default observer(Download)
