import React, { useContext, useState, useEffect, useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import gql from 'graphql-tag'
import { useApolloClient } from 'react-apollo-hooks'
import styled from 'styled-components'

import storeContext from '../../../storeContext'
import TextField from '../../shared/TextField'
import ErrorBoundary from '../../ErrorBoundary'
import { herkunftFile as herkunftFileFragment } from '../../../utils/fragments'
import types from '../../../store/Filter/simpleTypes'

const Container = styled.div`
  height: 100%;
  display: flex;
  background-color: ${props => (props.showfilter ? '#ffd3a7' : 'unset')};
`
const FieldsContainer = styled.div`
  padding: 10px;
  overflow: auto !important;
  height: 100%;
`

const File = ({ file }) => {
  const client = useApolloClient()
  const store = useContext(storeContext)
  const { refetch } = store.tree

  const [errors, setErrors] = useState({})

  useEffect(() => setErrors({}), [file])

  const saveToDb = useCallback(
    async event => {
      const field = event.target.name
      const value = event.target.value || null
      try {
        const type = types.lieferung[field]
        let valueToSet
        if (value === undefined || value === null) {
          valueToSet = null
        } else if (['number', 'boolean'].includes(type)) {
          valueToSet = value
        } else {
          valueToSet = `"${value}"`
        }
        await client.mutate({
          mutation: gql`
              mutation update_herkunft_file(
                $file_id: bigint!
              ) {
                update_herkunft_file(
                  where: { file_id: { _eq: $file_id } }
                  _set: {
                    ${field}: ${valueToSet}
                  }
                ) {
                  affected_rows
                  returning {
                    ...HerkunftFileFields
                  }
                }
              }
              ${herkunftFileFragment}
            `,
          variables: {
            file_id: file.fileId,
          },
        })
      } catch (error) {
        return setErrors({ [field]: error.message })
      }
      setErrors({})
      refetch()
    },
    [file],
  )

  if (!file) return null

  return (
    <ErrorBoundary>
      <Container>
        <FieldsContainer>
          <img
            width="20%"
            height="auto"
            src={`https://ucarecdn.com/${
              file.fileId
            }/-/resize/1000x/-/quality/lightest/${file.name}`}
          />
          <TextField
            key={`${file.id}fileMimeType`}
            name="fileMimeType"
            label="Datei-Typ"
            value={file.fileMimeType}
            saveToDb={saveToDb}
            error={errors.fileMimeType}
            disabled
          />
          <TextField
            key={`${file.id}name`}
            name="name"
            label="Datei-Name"
            value={file.name}
            saveToDb={saveToDb}
            error={errors.name}
            disabled
          />
          <TextField
            key={`${file.id}beschreibung`}
            name="beschreibung"
            label="Lokalname"
            value={file.beschreibung}
            saveToDb={saveToDb}
            error={errors.beschreibung}
          />
        </FieldsContainer>
      </Container>
    </ErrorBoundary>
  )
}

export default observer(File)
