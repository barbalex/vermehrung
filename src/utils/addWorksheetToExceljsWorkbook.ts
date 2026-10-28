import type { AddWorksheetOptions, Workbook } from 'exceljs'

import { getDataArrayFromExportObjects } from './getDataArrayFromExportObjects.ts'

export const addWorksheetToExceljsWorkbook = ({
  workbook,
  title,
  data: dataPassed,
}: {
  workbook: Workbook
  title?: string
  data: Record<string, unknown>[]
}) => {
  let data = dataPassed
  if (data.length === 0) {
    data = [{ 'keine Daten': 'Es gibt keine Daten' }]
  }
  const dataArray = getDataArrayFromExportObjects(data)
  const numberOfColumns =
    dataArray && dataArray[0] && dataArray[0].length ? dataArray[0].length : 0
  // autoFilter is valid at runtime but missing from exceljs' option types
  const worksheetOptions = {
    views: [
      {
        state: 'frozen',
        xSplit: 0,
        ySplit: 1,
      },
    ],
    autoFilter: {
      from: {
        row: 1,
        column: 1,
      },
      to: {
        row: 1,
        column: numberOfColumns,
      },
    },
  }
  const worksheet = workbook.addWorksheet(
    title || 'Daten',
    worksheetOptions as Partial<AddWorksheetOptions>,
  )
  worksheet.addRows(dataArray)
  worksheet.getRow(1).fill = {
    type: 'gradient',
    gradient: 'angle',
    degree: 0,
    stops: [
      { position: 0, color: { argb: 'FFD3D3D3' } },
      { position: 1, color: { argb: 'FFD3D3D3' } },
    ],
  }
  worksheet.getRow(1).font = {
    bold: true,
  }
  worksheet.getRow(1).border = {
    bottom: {
      style: 'thin',
    },
  }
}
