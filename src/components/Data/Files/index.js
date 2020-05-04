import React, { useContext, useCallback, useState } from 'react'
import { observer } from 'mobx-react-lite'
import gql from 'graphql-tag'
import { useApolloClient, useQuery } from '@apollo/react-hooks'
import styled from 'styled-components'
import get from 'lodash/get'
import upperFirst from 'lodash/upperFirst'
import Lightbox from 'react-image-lightbox'
import Button from '@material-ui/core/Button'

import storeContext from '../../../storeContext'
import {
  artFile as artFileFragment,
  herkunftFile as herkunftFileFragment,
  sammlungFile as sammlungFileFragment,
  personFile as personFileFragment,
  gartenFile as gartenFileFragment,
  kulturFile as kulturFileFragment,
  lieferungFile as lieferungFileFragment,
} from '../../../utils/fragments'
import Uploader from '../../Uploader'
import File from './File'
import 'react-image-lightbox/style.css'
import isImageFile from './isImageFile'
import ErrorBoundary from '../../shared/ErrorBoundary'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${(props) => (props.showfilter ? '#fff3e0' : 'unset')};
`
const TitleRow = styled.div`
  background-color: rgba(237, 230, 244, 1);
  flex-shrink: 0;
  display: flex;
  height: 48px;
  justify-content: space-between;
  margin-left: -10px;
  margin-right: -10px;
  margin-bottom: 15px;
  padding: 0 10px;
  position: sticky;
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
  /*&:active,
  &:hover,
  &:focus {
    border: 1px solid rgba(74, 20, 140, 0.5) !important;
  }*/
`

const fragmentObject = {
  art: artFileFragment,
  herkunft: herkunftFileFragment,
  sammlung: sammlungFileFragment,
  person: personFileFragment,
  garten: gartenFileFragment,
  kultur: kulturFileFragment,
  lieferung: lieferungFileFragment,
}

const Files = ({ parentId, parent }) => {
  const client = useApolloClient()
  const store = useContext(storeContext)

  const [imageIndex, setImageIndex] = useState(0)
  const [lightboxIsOpen, setLightboxIsOpen] = useState(false)

  const fieldsName = `${upperFirst(parent)}FileFields`
  const fragment = fragmentObject[parent]
  const queryObject = {
    [parent]: gql`
    query GeneralFileQuery($parentId: bigint!) {
      ${parent}_file(
        order_by: { name: asc }
        where: { ${parent}_id: { _eq: $parentId } }
      ) {
        ...${fieldsName}
      }
    }
    ${fragment}
  `,
  }

  const query = queryObject[parent]
  const { data, error, loading } = useQuery(query, {
    variables: { parentId },
  })

  const files = get(data, `${parent}_file`, [])

  const onChangeUploader = useCallback(
    (file) => {
      if (file) {
        file.done(async (info) => {
          //console.log({ info })
          const mutation = gql`
            mutation insertFile {
              insert_${parent}_file (objects: [{
                file_id: "${info.uuid}",
                file_mime_type: "${info.mimeType}",
                ${parent}_id: ${parentId},
                name: "${info.name}"
              }]) {
                returning { ${parent}_id }
              }
            }
          `
          try {
            await client.mutate({
              mutation,
              refetchQueries: ['GeneralFileQuery'],
            })
          } catch (error) {
            return store.enqueNotification({
              message: error.message,
              options: {
                variant: 'error',
              },
            })
          }
          //console.log('File uploaded: ', { info, responce })
          // TODO: reinitiate uploader
        })
      }
    },
    [client, parent, parentId, store],
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

  if (loading) {
    return 'Lade...'
  }

  if (error) {
    return (
      <Container>{`Fehler beim Laden der Daten: ${error.message}`}</Container>
    )
  }

  return (
    <ErrorBoundary>
      <Container>
        <TitleRow>
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
            prevSrc={
              imageUrls[(imageIndex + images.length - 1) % images.length]
            }
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
        <Spacer />
        {files.map((file) => (
          <File key={file.file_id} file={file} parent={parent} />
        ))}
      </Container>
    </ErrorBoundary>
  )
}

export default observer(Files)
