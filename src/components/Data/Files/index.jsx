import React, { useContext, useCallback, useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import styled from '@emotion/styled'
import ImageGallery from 'react-image-gallery'
import 'react-image-gallery/styles/css/image-gallery.css'
import Button from '@mui/material/Button'
import { v1 as uuidv1 } from 'uuid'
import { of as $of } from 'rxjs'

import { MobxStoreContext } from '../../../mobxStoreContext.js'
import { Uploader } from '../../Uploader.jsx'
import { File } from './File.jsx'
import { isImageFile } from './isImageFile.js'
import { ErrorBoundary } from '../../shared/ErrorBoundary.jsx'
import { fileSort } from '../../../utils/fileSort.js'
import { mutations } from '../../../utils/mutations.js'
import { constants } from '../../../utils/constants.js'

const TitleRow = styled.section`
  background-color: rgba(248, 243, 254, 1);
  flex-shrink: 0;
  display: flex !important;
  height: ${constants.titleRowHeight}px;
  justify-content: space-between !important;
  margin-left: -10px;
  margin-right: -10px;
  ${(props) => props['data-margin-bottom'] && 'margin-bottom: 15px;'}
  padding: 0 10px;
  user-select: none;
  position: sticky !important;
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

export const Files = observer(({ parentTable, parent }) => {
  const store = useContext(MobxStoreContext)
  const { online, gqlClient, addNotification, db } = store

  const [lightboxIsOpen, setLightboxIsOpen] = useState(false)

  // use object with two keys to only render once on setting
  const [files, setEvent] = useState([])
  useEffect(() => {
    const observable =
      parent.files ? parent.files.observeWithColumns(['name']) : $of([])
    const subscription = observable.subscribe((files) =>
      setEvent(files.sort(fileSort)),
    )

    return () => subscription?.unsubscribe?.()
  }, [parent.files])

  const onChangeUploader = useCallback(
    async (file) => {
      if (file) {
        file.done(async (info) => {
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
          // TODO: need to add mutations for all file-tables
          const mutation = mutations[`mutateInsert_${parentTable}_file_one`]
          const variables = {
            object: newObject,
            on_conflict: {
              constraint: `${parentTable}_file_pkey`,
              update_columns: ['id'],
            },
          }
          const response = await gqlClient
            .mutation(mutation, variables)
            .toPromise()
          if (response.error) {
            console.log(response.error)
            return addNotification({
              message: response.error.message,
            })
          }
        })
      }
    },
    [parentTable, parent.id, db, gqlClient, addNotification],
  )

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
  const onClickLightboxButton = useCallback(
    () => setLightboxIsOpen(!lightboxIsOpen),
    [lightboxIsOpen],
  )

  if (!online) {
    return (
      <ErrorBoundary>
        <TitleRow data-online={online}>
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
              {lightboxIsOpen ?
                'Galerie schliessen'
              : 'Bilder in Galerie öffnen'}
            </LightboxButton>
          )}
        </Buttons>
      </TitleRow>
      {lightboxIsOpen && (
        <>
          <Spacer />
          <ImageGallery
            items={imageObjects}
            showPlayButton={false}
          />
        </>
      )}
      {!!files.length && (
        <>
          <Spacer />
          {files.map((file) => (
            <File
              key={file.file_id}
              file={file}
              parent={parent}
            />
          ))}
        </>
      )}
    </ErrorBoundary>
  )
})
