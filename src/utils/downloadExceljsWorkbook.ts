import { DateTime } from 'luxon'
import type { Workbook } from 'exceljs'

import { addNotification } from '../store/index.ts'

/**
 * this function cann be used from higher up
 * that is why it _can_ recieve a workbook
 */
export const downloadExceljsWorkbook = async ({
  fileName,
  workbook,
}: {
  fileName: string
  workbook: Workbook
}) => {
  let buffer: ArrayBuffer
  try {
    buffer = await workbook.xlsx.writeBuffer()
  } catch (error) {
    return addNotification({
      message: (error as Error).message,
    })
  }
  const file = `${fileName}_${DateTime.now().toFormat('yyyy-LL-dd_HH-mm-ss')}`
  const blob = new Blob([buffer], { type: 'application/octet-stream' })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = `${file}.xlsx`
  anchor.click()
  // revoke delayed: immediately after click, safari can still abort the download
  setTimeout(() => URL.revokeObjectURL(url), 10_000)
}
