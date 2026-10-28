import { useEffect, useRef } from 'react'
import md5 from 'blueimp-md5'
import { FileUploaderRegular, defineLocale } from '@uploadcare/react-uploader'
import '@uploadcare/react-uploader/core.css'

import { addNotification } from '../store/index.ts'
import { locale } from './Uploader/locale.ts'

// the hand-maintained german translation lags the library's key set
// eslint-disable-next-line @typescript-eslint/no-explicit-any
defineLocale('de', locale as any)

const secret = import.meta.env.UPLOADCARE_SECRET_KEY

// a fresh signature per upload. the old widget computed it once on page
// load, so uploads failed after the signature expired 30 minutes in
const secureUploadsSignatureResolver = () => {
  const expire = Math.round(new Date().getTime() / 1000) + 60 * 30
  return Promise.resolve({
    secureSignature: md5(`${secret}${expire}`),
    secureExpire: String(expire),
  })
}

// upload care's uploader crashes reading the header of zero-byte files
// (RangeError in DataView.getUint16) before anything else runs - capture
// file selections on the way in and stop empty files: both the file
// dialog and drag-and-drop onto the drop zone
const useEmptyFileGuard = () => {
  useEffect(() => {
    const hasEmptyFile = (files: FileList | null) =>
      Array.from(files ?? []).some((f) => f.size === 0)
    const reject = () => addNotification({ message: 'Die Datei ist leer' })
    const blockEmptyFiles = (e: Event) => {
      const target = e.target as HTMLInputElement | null
      if (target?.type !== 'file') return
      if (!hasEmptyFile(target.files)) return
      e.preventDefault()
      e.stopImmediatePropagation()
      target.value = ''
      reject()
    }
    const blockEmptyDrops = (e: Event) => {
      const dropEvent = e as DragEvent
      if (!dropEvent.dataTransfer) return
      if (!hasEmptyFile(dropEvent.dataTransfer.files)) return
      e.preventDefault()
      e.stopImmediatePropagation()
      reject()
    }
    document.addEventListener('change', blockEmptyFiles, true)
    document.addEventListener('drop', blockEmptyDrops, true)
    return () => {
      document.removeEventListener('change', blockEmptyFiles, true)
      document.removeEventListener('drop', blockEmptyDrops, true)
    }
  }, [])
}

// the uploader follows the OS color scheme by default - App.jsx sets
// uc-dark/uc-light on <html> so it follows the app theme instead, and
// the brand purple comes from the --uc-primary overrides in index.css
export const Uploader = ({
  onFileUploadSuccess,
  onFileUploadFailed,
}: {
  onFileUploadSuccess: (info: unknown) => void
  onFileUploadFailed: (info: unknown) => void
}) => {
  useEmptyFileGuard()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const apiRef = useRef<any>(null)

  // the summary modal ("1 Datei hochgeladen") expects the user to click
  // 'Abgeschlossen', and the finished upload stays in the list - so the
  // next upload starts from that list instead of the drop zone. close
  // the modal after a beat and clear the list, like the old widget did
  const onCommonUploadSuccess = () => {
    setTimeout(() => {
      // getAPI is not part of the published types but exists at runtime
      const api = apiRef.current?.getAPI?.()
      api?.doneFlow?.()
      api?.removeAllFiles?.()
    }, 3000)
  }

  return (
    <FileUploaderRegular
      className="uploader"
      apiRef={apiRef}
      pubkey={import.meta.env.VITE_UPLOADCARE_PUBLIC_KEY}
      ctxName="vermehrung"
      multiple={false}
      // 'effects' is a valid uploadcare config key the react types lag behind
      {...({ effects: 'crop' } as { effects?: string })}
      imageShrink="2400x1600"
      removeCopyright
      localeName="de"
      secureUploadsSignatureResolver={secureUploadsSignatureResolver}
      onFileUploadSuccess={onFileUploadSuccess}
      onFileUploadFailed={onFileUploadFailed}
      onCommonUploadSuccess={onCommonUploadSuccess}
    />
  )
}
