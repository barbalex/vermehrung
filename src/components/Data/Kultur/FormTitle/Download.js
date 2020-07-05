import React, { useContext, useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import { FaDownload } from 'react-icons/fa'
import IconButton from '@material-ui/core/IconButton'
// see: https://github.com/guyonroche/exceljs/issues/313
import * as ExcelJs from 'exceljs/dist/exceljs.min.js'

import { StoreContext } from '../../../../models/reactUtils'
import buildExceljsWorksheets from './buildExceljsWorksheets'
import downloadExceljsWorkbook from '../../../../utils/downloadExceljsWorkbook'

const Download = ({ row }) => {
  const store = useContext(StoreContext)

  const onClickDownload = useCallback(async () => {
    const workbook = new ExcelJs.Workbook()
    await buildExceljsWorksheets({ store, kultur_id: row.id, workbook })
    downloadExceljsWorkbook({ store, fileName: `Kultur_${row.id}`, workbook })
  }, [row.id, store])

  return (
    <IconButton
      aria-label="Daten herunterladen"
      title="Daten herunterladen"
      onClick={onClickDownload}
    >
      <FaDownload />
    </IconButton>
  )
}

export default observer(Download)
