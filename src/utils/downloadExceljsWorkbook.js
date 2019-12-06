import fileSaver from 'file-saver'
import format from 'date-fns/format'

/**
 * this function cann be used from higher up
 * that is why it _can_ recieve a workbook
 */
export default async ({ store, fileName, workbook }) => {
  let buffer
  try {
    buffer = await workbook.xlsx.writeBuffer()
  } catch (error) {
    return store.enqueNotification({
      message: error.message,
      options: {
        variant: 'error',
      },
    })
  }
  const file = `${fileName}_${format(new Date(), 'yyyy-MM-dd_HH-mm-ss')}`
  fileSaver.saveAs(
    new Blob([buffer], { type: 'application/octet-stream' }),
    `${file}.xlsx`,
  )
}
