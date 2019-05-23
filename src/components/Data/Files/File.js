import React, { useContext, useState, useEffect, useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import gql from 'graphql-tag'
import { useApolloClient } from 'react-apollo-hooks'
import styled from 'styled-components'
import { FaTimes } from 'react-icons/fa'
import IconButton from '@material-ui/core/IconButton'

import storeContext from '../../../storeContext'
import TextField from '../../shared/TextField'
import ErrorBoundary from '../../ErrorBoundary'
import { herkunftFile as herkunftFileFragment } from '../../../utils/fragments'
import types from '../../../store/Filter/simpleTypes'

const Container = styled.div`
  display: flex;
  flex-wrap: nowrap;
  background-color: ${props => (props.showfilter ? '#ffd3a7' : 'unset')};
  width: 100%;
`
const Img = styled.img`
  margin-right: 5px;
  width: 80px;
  height: 45px;
  object-fit: contain;
`
const ImgReplacement = styled.div`
  min-width: 80px;
  margin-right: 5px;
  text-align: center;
  color: rgba(0, 0, 0, 0.38);
  font-size: 1rem;
  padding-top: 19px;
`
const DelIcon = styled(IconButton)`
  color: red !important;
  margin-bottom: 20px !important;
`
const Spacer = styled.div`
  min-width: 10px;
`

const File = ({ file, parent, refetch }) => {
  const client = useApolloClient()
  const store = useContext(storeContext)

  const [errors, setErrors] = useState({})

  useEffect(() => setErrors({}), [file])

  const onClickDelete = useCallback(async () => {
    console.log('File', { file, parent })
    // 1. remove dataset
    try {
      await client.mutate({
        mutation: gql`
          mutation deleteDataset {
            delete_${parent}_file (where: {file_id: {_eq: "${file.file_id}"}}) {
              returning {
                id
              }
            }
          }
        `,
      })
    } catch (error) {
      console.log(error)
      return store.enqueNotification({
        message: `Die Datei konnte nicht gelöscht werden: ${error.message}`,
        options: {
          variant: 'error',
        },
      })
    }
    refetch()
    // 2. remove file
    // actually no: not secure
    // batch delete unneeded files using the api
    // https://uploadcare.com/docs/api_reference/rest/accessing_files
  }, [file])

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

  const isImage =
    file.file_mime_type &&
    (file.file_mime_type.toLowerCase().includes('jpeg') ||
      file.file_mime_type.toLowerCase().includes('png'))

  console.log('File, file:', file)

  return (
    <ErrorBoundary>
      <Container>
        {isImage ? (
          <Img
            src={`https://ucarecdn.com/${
              file.file_id
            }/-/resize/80x/-/quality/lightest/${file.name}`}
          />
        ) : (
          <ImgReplacement>...</ImgReplacement>
        )}
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
        <Spacer />
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
        <Spacer />
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
        <Spacer />
        <DelIcon title="löschen" onClick={onClickDelete}>
          <FaTimes />
        </DelIcon>
      </Container>
    </ErrorBoundary>
  )
}

export default observer(File)
