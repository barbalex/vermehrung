import type { Sheet } from 'write-excel-file/browser'

import { getDataArrayFromExportObjects } from './getDataArrayFromExportObjects.ts'

export const addSheetToSheets = ({
  sheets,
  title,
  data: dataPassed,
}: {
  sheets: Sheet<Blob>[]
  title?: string
  data: Record<string, unknown>[]
}) => {
  let data = dataPassed
  if (data.length === 0) {
    data = [{ 'keine Daten': 'Es gibt keine Daten' }]
  }
  const dataArray = getDataArrayFromExportObjects(data)
  sheets.push({
    sheet: title || 'Daten',
    stickyRowsCount: 1,
    data: dataArray.map((row, rowIndex) =>
      rowIndex === 0 ?
        row.map((cell) => ({
          value: cell,
          fontWeight: 'bold',
          backgroundColor: '#D3D3D3',
          bottomBorderStyle: 'thin',
        }))
      : row,
    ),
  })
}
