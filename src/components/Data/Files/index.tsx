import { useRef, useState, useMemo } from 'react'
import { useAtomValue } from 'jotai'
import ImageGallery from 'react-image-gallery'
import 'react-image-gallery/build/image-gallery.css'
import Button from '@mui/material/Button'
import { v7 as uuidv7 } from 'uuid'
import { of as $of } from 'rxjs'

import {
  addNotification,
  apiClientAtom,
  dbAtom,
  onlineAtom,
  store,
} from '../../../store/index.ts'
import { Uploader } from '../../Uploader.tsx'
import { File } from './File.tsx'
import { isImageFile } from './isImageFile.ts'
import { ErrorBoundary } from '../../shared/ErrorBoundary.tsx'
import { fileSort } from '../../../utils/fileSort.ts'
import { useObservable } from '../../../utils/useObservable.ts'

import styles from './index.module.css'

interface FileRow {
  id: string
  file_id: string
  file_mime_type: string | null
  name: string | null
  beschreibung: string | null
  delete?: () => void
  edit?: (args: { field?: string; value: unknown }) => void
}

export const Files = ({
  parentTable,
  parent,
}: {
  parentTable: string
  parent: { id?: string; files?: unknown } | null | undefined
}) => {
  const online = useAtomValue(onlineAtom)

  const [lightboxIsOpen, setLightboxIsOpen] = useState(false)

  // removing useMemo causes: Maximum update depth exceeded
  const observable = useMemo(
    () =>
      parent.files
        ? (
            parent.files as {
              observeWithColumns: (
                columns: string[],
              ) => import('rxjs').Observable<FileRow[]>
            }
          ).observeWithColumns(['name'])
        : $of([] as FileRow[]),
    [parent.files],
  )
  const files =
    useObservable(
      observable as unknown as import('rxjs').Observable<FileRow[]>,
    ) ?? []
  // sort a copy, not the observed array in place
  const sortedFiles = [...(files ?? [])].sort(fileSort)

  // the uploader fires the success event repeatedly for the same file
  const uploadedUuids = useRef<string[]>([])

  const onFileUploadSuccess = async (info: {
    uuid: string
    mimeType: string
    name: string
  }) => {
    if (!info) return
    if (uploadedUuids.current.includes(info.uuid)) return
    uploadedUuids.current.push(info.uuid)

    const db = store.get(dbAtom)
    const newObject: Record<string, unknown> = {
      id: uuidv7(),
      file_id: info.uuid,
      file_mime_type: info.mimeType,
      [`${parentTable}_id`]: parent.id,
      name: info.name,
    }
    await db?.write(async () => {
      const collection = db?.get(`${parentTable}_file`)
      // using batch because can create from raw
      // which enables overriding watermelons own id
      await db?.batch([collection.prepareCreateFromDirtyRaw(newObject)])
    })
    try {
      await store
        .get(apiClientAtom)
        ?.post(
          `/${parentTable}_file`,
          newObject,
          'resolution=merge-duplicates,return=minimal',
        )
    } catch (error) {
      console.log(error)
      return addNotification({
        message: (error as Error).message,
      })
    }
  }

  const onFileUploadFailed = (info: { name?: string }) => {
    addNotification({
      message: `Hochladen von ${info?.name ?? 'Datei'} fehlgeschlagen`,
    })
  }

  const images = sortedFiles.filter((f) => isImageFile(f))
  const imageObjects = images.map((f) => ({
    original: `https://ucarecdn.com/${f.file_id}/-/resize/1200x/-/quality/lightest/${f.name}`,
    thumbnail: `https://ucarecdn.com/${f.file_id}/-/resize/250x/-/quality/lightest/${f.name}`,
    fullscreen: `https://ucarecdn.com/${f.file_id}/-/resize/1800x/-/quality/lightest/${f.name}`,
    originalAlt: f.beschreibung || '',
    thumbnailAlt: f.beschreibung || '',
    description: f.beschreibung || '',
    originalTitle: f.name || '',
    thumbnailTitle: f.name || '',
  }))

  const onClickLightboxButton = () => setLightboxIsOpen(!lightboxIsOpen)

  if (!online) {
    return (
      <ErrorBoundary>
        <section className={styles.titleRow}>
          <div className={styles.title}>Dateien</div>
          <div className={styles.content}>Sorry, nur online verfügbar</div>
        </section>
      </ErrorBoundary>
    )
  }

  return (
    <ErrorBoundary>
      <section
        className={styles.titleRow}
        style={{ ...(files.length ? { marginBottom: 15 } : {}) }}
      >
        <div className={styles.title}>Dateien</div>
        <div className={styles.buttons}>
          <Uploader
            onFileUploadSuccess={
              onFileUploadSuccess as unknown as (info: unknown) => void
            }
            onFileUploadFailed={
              onFileUploadFailed as unknown as (info: unknown) => void
            }
          />
          {!!images.length && (
            <Button
              color="primary"
              variant="outlined"
              onClick={onClickLightboxButton}
              className={styles.lightboxButton}
            >
              {lightboxIsOpen
                ? 'Galerie schliessen'
                : 'Bilder in Galerie öffnen'}
            </Button>
          )}
        </div>
      </section>
      {lightboxIsOpen && (
        <>
          <div className={styles.spacer} />
          <ImageGallery items={imageObjects} showPlayButton={false} />
        </>
      )}
      {!!sortedFiles.length && (
        <>
          <div className={styles.spacer} />
          {sortedFiles.map((file) => (
            <File key={file.file_id} file={file} parent={parent} />
          ))}
        </>
      )}
    </ErrorBoundary>
  )
}
