import { DateTime } from 'luxon'
import type { Sheet } from 'write-excel-file/browser'

import { addNotification, setExportProgress } from '../store/index.ts'
import { autoFilterFeature } from './autoFilterFeature.ts'

/**
 * this function cann be used from higher up
 * that is why it _can_ recieve sheets
 */
export const downloadSheets = async ({
  fileName,
  sheets,
}: {
  fileName: string
  sheets: Sheet<Blob>[]
}) => {
  let blob: Blob
  try {
    setExportProgress({ message: 'Excel-Datei wird erstellt' })
    const { default: writeXlsxFile } = await import('write-excel-file/browser')
    blob = await writeXlsxFile(sheets, {
      features: [autoFilterFeature],
    }).toBlob()
  } catch (error) {
    setExportProgress(null)
    return addNotification({
      message: (error as Error).message,
    })
  }
  setExportProgress(null)
  const file = `${fileName}_${DateTime.now().toFormat('yyyy-LL-dd_HH-mm-ss')}`
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = `${file}.xlsx`
  anchor.click()
  // revoke delayed: immediately after click, safari can still abort the download
  setTimeout(() => URL.revokeObjectURL(url), 10_000)
}
