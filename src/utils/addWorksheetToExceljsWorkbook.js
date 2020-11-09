import getDataArrayFromExportObjects from './getDataArrayFromExportObjects'

const addWorksheetToExceljsWorkbook = ({
  workbook,
  title,
  data: dataPassed,
}) => {
  let data = dataPassed
  if (data.length === 0) {
    data = [{ 'keine Daten': 'Es gibt keine Daten' }]
  }
  const dataArray = getDataArrayFromExportObjects(data)
  const numberOfColumns =
    dataArray && dataArray[0] && dataArray[0].length ? dataArray[0].length : 0
  const worksheet = workbook.addWorksheet(title || 'Daten', {
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
  })
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

export default addWorksheetToExceljsWorkbook
