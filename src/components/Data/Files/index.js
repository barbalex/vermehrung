import React, {
  useContext,
  useCallback,
  useState,
  useRef,
  useEffect,
} from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'
import Lightbox from 'react-image-lightbox'
import Button from '@material-ui/core/Button'
import { v1 as uuidv1 } from 'uuid'
import { useDatabase } from '@nozbe/watermelondb/hooks'

import { StoreContext } from '../../../models/reactUtils'
import Uploader from '../../Uploader'
import File from './File'
import 'react-image-lightbox/style.css'
import isImageFile from './isImageFile'
import ErrorBoundary from '../../shared/ErrorBoundary'
import fileSort from '../../../utils/fileSort'

const TitleRow = styled.div`
  background-color: rgba(237, 230, 244, 1);
  flex-shrink: 0;
  display: flex;
  height: 48px;
  justify-content: space-between;
  margin-left: -10px;
  margin-right: -10px;
  ${(props) => props['data-margin-bottom'] && 'margin-bottom: 15px;'}
  padding: 0 10px;
  user-select: none;
  position: sticky;
  ${(props) =>
    props['data-sticky'] && 'border-top: 1px solid rgba(0, 0, 0, 0.3);'}
  top: -10px;
  z-index: 1;
`
const Title = styled.div`
  font-weight: bold;
  margin-top: auto;
  margin-bottom: auto;
`
// center buttons
const Buttons = styled.div`
  margin-top: 7px;
`
const Spacer = styled.div`
  height: 10px;
`
const LightboxButton = styled(Button)`
  margin-left: 10px !important;
  text-transform: none !important;
  border: none !important;
`
const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const Files = ({ parentTable, parent }) => {
  const store = useContext(StoreContext)
  const { online } = store

  const [imageIndex, setImageIndex] = useState(0)
  const [lightboxIsOpen, setLightboxIsOpen] = useState(false)

  const db = useDatabase()
  // use object with two keys to only render once on setting
  const [files, setEvent] = useState([])
  useEffect(() => {
    const subscription = parent.files
      .observeWithColumns(['name'])
      .subscribe((files) => setEvent(files.sort(fileSort)))
    return () => subscription.unsubscribe()
  }, [db.collections, parent.files])

  const onChangeUploader = useCallback(
    (file) => {
      if (file) {
        file.done(async (info) => {
          const newObject = {
            id: uuidv1(),
            file_id: info.uuid,
            file_mime_type: info.mimeType,
            [`${parentTable}_id`]: parent.id,
            name: info.name,
          }
          await db.action(async () => {
            const collection = db.get(`${parentTable}_file`)
            // using batch because can create from raw
            // which enables overriding watermelons own id
            await db.batch([collection.prepareCreateFromDirtyRaw(newObject)])
          })
          await store[`mutateInsert_${parentTable}_file_one`]({
            object: newObject,
            on_conflict: {
              constraint: `${parentTable}_file_pkey`,
              update_columns: ['id'],
            },
          })
        })
      }
    },
    [db, parent.id, parentTable, store],
  )

  const images = files.filter((f) => isImageFile(f))
  const imageUrls = images.map(
    (f) =>
      `https://ucarecdn.com/${f.file_id}/-/resize/1200x/-/quality/lightest/${f.name}`,
  )
  const onClickLightboxButton = useCallback(() => setLightboxIsOpen(true), [])
  const onCloseLightboxRequest = useCallback(() => setLightboxIsOpen(false), [])
  const onMovePrevImageRequest = useCallback(
    () => setImageIndex((imageIndex + images.length - 1) % images.length),
    [imageIndex, images.length],
  )
  const onMoveNextImageRequest = useCallback(
    () => setImageIndex((imageIndex + 1) % images.length),
    [imageIndex, images.length],
  )

  const titleRowRef = useRef(null)
  const [isSticky, setIsSticky] = useState(false)
  const scrollHandler = useCallback(() => {
    const { top } = titleRowRef?.current?.getBoundingClientRect()
    if (top < 112 && !isSticky) return setIsSticky(true)
    if (top > 112 && isSticky) setIsSticky(false)
  }, [isSticky])
  useEffect(() => {
    window.addEventListener('scroll', scrollHandler, true)
    return () => {
      window.removeEventListener('scroll', scrollHandler, true)
    }
  }, [scrollHandler])

  if (!online) {
    return (
      <ErrorBoundary>
        <TitleRow data-online={online} ref={titleRowRef} data-sticky={isSticky}>
          <Title>Dateien</Title>
          <Content>Sorry, nur online verfügbar</Content>
        </TitleRow>
      </ErrorBoundary>
    )
  }

  return (
    <ErrorBoundary>
      <TitleRow
        data-online={online}
        data-margin-bottom={!!files.length}
        ref={titleRowRef}
        data-sticky={isSticky}
      >
        <Title>Dateien</Title>
        <Buttons>
          <Uploader
            id="file"
            name="file"
            onChange={onChangeUploader}
            content="test"
          />
          {!!images.length && (
            <LightboxButton
              color="primary"
              variant="outlined"
              onClick={onClickLightboxButton}
            >
              Bilder in Gallerie öffnen
            </LightboxButton>
          )}
        </Buttons>
      </TitleRow>
      {lightboxIsOpen && (
        <Lightbox
          mainSrc={imageUrls[imageIndex]}
          nextSrc={imageUrls[(imageIndex + 1) % images.length]}
          prevSrc={imageUrls[(imageIndex + images.length - 1) % images.length]}
          onCloseRequest={onCloseLightboxRequest}
          onMovePrevRequest={onMovePrevImageRequest}
          onMoveNextRequest={onMoveNextImageRequest}
          imageTitle={images[imageIndex].name || ''}
          imageCaption={images[imageIndex].beschreibung || ''}
          wrapperClassName="lightbox"
          nextLabel="Nächstes Bild"
          prevLabel="Voriges Bild"
        />
      )}
      {!!files.length && (
        <>
          <Spacer />
          {files.map((file) => (
            <File key={file.file_id} file={file} parent={parent} />
          ))}
        </>
      )}
    </ErrorBoundary>
  )
}

export default observer(Files)
