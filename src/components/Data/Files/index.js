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
    query FileQuery($parentId: Int!) {
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

  const files = get(data, `${parent}_file`, [])
  console.log('Files:', { files, data })

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
        <Uploader
          id="file"
          name="file"
          onChange={file => {
            //console.log('File changed: ', file)
            if (file) {
              file.done(async info => {
                const mutation = gql`
                  mutation insertFile {
                    insert_${parent}_file (objects: [{
                      file_id: "${info.uuid}",
                      file_mime_type: "${info.mimeType}",
                      herkunft_id: ${parentId},
                      name: "${info.name}"
                    }]) {
                      returning { ${parent}_id }
                    }
                  }
                `
                console.log('File uploaded: ', { mutation })
                let responce
                try {
                  responce = await client.mutate({
                    mutation,
                  })
                } catch (error) {
                  console.log('Error inserting dataset', error.message)
                  return store.enqueNotification({
                    message: error.message,
                    options: {
                      variant: 'error',
                    },
                  })
                }
                console.log('File uploaded: ', { info, responce })
              })
            }
          }}
        />
        {files.map(file => (
          <File key={file.file_id} file={file} />
        ))}
      </Container>
    </ErrorBoundary>
  )
}

export default observer(Files)
