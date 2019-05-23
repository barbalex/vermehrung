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
  display: flex;
  background-color: ${props => (props.showfilter ? '#ffd3a7' : 'unset')};
`
const Img = styled.img`
  margin-right: 5px;
  width: 80px;
  height: 45px;
  object-fit: contain;
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
                $file_id: uuid!
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
            file_id: file.file_id,
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

  console.log('File, file:', file)

  return (
    <ErrorBoundary>
      <Container>
        <Img
          src={`https://ucarecdn.com/${
            file.file_id
          }/-/resize/80x/-/quality/lightest/${file.name}`}
        />
        <TextField
          key={`${file.id}fileMimeType`}
          name="fileMimeType"
          label="Datei-Typ"
          value={file.file_mime_type}
          saveToDb={saveToDb}
          error={errors.file_mime_type}
          disabled
          schrinkLabel
        />
        <TextField
          key={`${file.id}name`}
          name="name"
          label="Datei-Name"
          value={file.name}
          saveToDb={saveToDb}
          error={errors.name}
          disabled
          schrinkLabel
        />
        <TextField
          key={`${file.id}beschreibung`}
          name="beschreibung"
          label="Beschreibung"
          value={file.beschreibung}
          saveToDb={saveToDb}
          error={errors.beschreibung}
          multiLine
          schrinkLabel
        />
      </Container>
    </ErrorBoundary>
  )
}

export default observer(File)
