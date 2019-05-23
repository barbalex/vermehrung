import React, { useContext, useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import gql from 'graphql-tag'
import { useApolloClient, useQuery } from 'react-apollo-hooks'
import styled from 'styled-components'
import get from 'lodash/get'

import storeContext from '../../../storeContext'
import ErrorBoundary from '../../ErrorBoundary'
import { herkunftFile as herkunftFileFragment } from '../../../utils/fragments'
import Uploader from '../../Uploader'
import File from './File'

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${props => (props.showfilter ? '#ffd3a7' : 'unset')};
`

const queryObject = {
  herkunft: gql`
    query FileQuery($parentId: uuid!) {
      herkunft_file(where: { herkunft_id: { _eq: $parentId } }) {
        ...HerkunftFileFields
      }
    }
    ${herkunftFileFragment}
  `,
}

const Files = ({ parentId, parent }) => {
  const client = useApolloClient()
  const store = useContext(storeContext)

  const query = queryObject[parent]
  const { data, error, loading } = useQuery(query, {
    variables: { parentId },
  })

  const files = get(data, parent, [{}])

  const onClickUpload = useCallback(() => {
    // TODO
  }, [parentId])

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
        {files.map(file => (
          <File key={file.fileId} file={file} />
        ))}
        <Uploader
          id="file"
          name="file"
          onChange={file => {
            console.log('File changed: ', file)

            if (file) {
              file.progress(info =>
                console.log('File progress: ', info.progress),
              )
              file.done(info => console.log('File uploaded: ', info))
            }
          }}
          onUploadComplete={info => console.log('Upload completed:', info)}
        />
      </Container>
    </ErrorBoundary>
  )
}

export default observer(Files)
