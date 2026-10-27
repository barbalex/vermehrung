import { useState, useEffect, useMemo } from 'react'
import { useAtomValue } from 'jotai'
import ImageGallery from 'react-image-gallery'
import Button from '@mui/material/Button'
import { v1 as uuidv1 } from 'uuid'
import { of as $of } from 'rxjs'

import {
  addNotification,
  apiClientAtom,
  dbAtom,
  onlineAtom,
  store,
} from '../../../store/index.js'
import { Uploader } from '../../Uploader.jsx'
import { File } from './File.jsx'
import { isImageFile } from './isImageFile.js'
import { ErrorBoundary } from '../../shared/ErrorBoundary.jsx'
import { fileSort } from '../../../utils/fileSort.js'
import { useObservable } from '../../../utils/useObservable.js'

import styles from './index.module.css'

export const Files = ({ parentTable, parent }) => {
  const online = useAtomValue(onlineAtom)

  const [lightboxIsOpen, setLightboxIsOpen] = useState(false)

  // removing useMemo causes: Maximum update depth exceeded
  const observable = useMemo(
    () => (parent.files ? parent.files.observeWithColumns(['name']) : $of([])),
    [parent.files],
  )
  const files = useObservable(observable) ?? []
  files?.sort?.(fileSort)

  const onChangeUploader = async (file) => {
    if (file) {
      file.done(async (info) => {
        const db = store.get(dbAtom)
        const newObject = {
          id: uuidv1(),
          file_id: info.uuid,
          file_mime_type: info.mimeType,
          [`${parentTable}_id`]: parent.id,
          name: info.name,
        }
        await db.write(async () => {
          const collection = db.get(`${parentTable}_file`)
          // using batch because can create from raw
          // which enables overriding watermelons own id
          await db.batch([collection.prepareCreateFromDirtyRaw(newObject)])
        })
        try {
          await store
            .get(apiClientAtom)
            .post(
              `/${parentTable}_file`,
              newObject,
              'resolution=merge-duplicates,return=minimal',
            )
        } catch (error) {
          console.log(error)
          return addNotification({
            message: error.message,
          })
        }
      })
    }
  }

  const images = files.filter((f) => isImageFile(f))
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
            id="file"
            name="file"
            onChange={onChangeUploader}
            content="test"
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
      {!!files.length && (
        <>
          <div className={styles.spacer} />
          {files.map((file) => (
            <File key={file.file_id} file={file} parent={parent} />
          ))}
        </>
      )}
    </ErrorBoundary>
  )
}
