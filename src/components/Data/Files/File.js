import React, { useContext, useState, useEffect, useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'
import { FaTimes, FaDownload } from 'react-icons/fa'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import upperFirst from 'lodash/upperFirst'

import { StoreContext } from '../../../models/reactUtils'
import TextField from '../../shared/TextField'
import isImageFile from './isImageFile'
//import uploadcareApiSignature from '../../../utils/uploadcareApiSignature'
import ErrorBoundary from '../../shared/ErrorBoundary'

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  background-color: ${(props) => (props.showfilter ? '#fff3e0' : 'unset')};
  width: 100%;
`
const Img = styled.img`
  margin-right: 10px;
  width: 80px;
  height: 50px;
  object-fit: contain;
  margin-bottom: 1rem;
`
const ImgReplacement = styled.div`
  min-width: 80px;
  margin-right: 10px;
  text-align: center;
  color: rgba(0, 0, 0, 0.38);
  font-size: 1rem;
  padding-top: 19px;
`
const DelIcon = styled(IconButton)`
  margin-bottom: 20px !important;
`
const DownloadIcon = styled(IconButton)`
  margin-bottom: 20px !important;
`
const Spacer = styled.div`
  min-width: 12px;
`
const DateiTypField = styled.div`
  min-width: 200px;
  flex-grow: 0;
`
const DateiNameField = styled.div`
  min-width: 215px;
  flex-grow: 0;
`
const BeschreibungField = styled.div`
  flex-grow: 1;
`
const MenuTitle = styled.h3`
  padding-top: 8px;
  padding-left: 15px;
  padding-right: 16px;
  padding-bottom: 0;
  margin-bottom: 3px;
  &:focus {
    outline: none;
  }
`

const File = ({ file, parent }) => {
  const store = useContext(StoreContext)

  const [errors, setErrors] = useState({})

  const [delMenuAnchorEl, setDelMenuAnchorEl] = React.useState(null)
  const delMenuOpen = Boolean(delMenuAnchorEl)

  useEffect(() => setErrors({}), [file])

  const onClickDelete = useCallback(() => {
    store[`mutateDelete_${parent}_file`](
      {
        where: { id: { _eq: file.id } },
      },
      undefined,
      () => {
        store[`${parent}s`].delete(file.id)
      },
    )
    store[`delete${upperFirst(parent)}FileModel`](file)
  }, [file, parent, store])
  const onClickDownload = useCallback(
    () => window.open(`https://ucarecdn.com/${file.file_id}/-/inline/no/`),
    [file],
  )

  const saveToDb = useCallback(
    async (event) => {
      const field = event.target.name
      const value = event.target.value || null
      const newObject = { ...file.toJSON(), ...{ [field]: value } }
      delete newObject.__typename
      await store[`mutateUpdate_${parent}_file`]({
        _set: newObject,
        where: { id: { _eq: file.id } },
      })
      setErrors({})
    },
    [file, parent, store],
  )

  if (!file) return null

  const isImage = isImageFile(file)

  return (
    <ErrorBoundary>
      <Container>
        {isImage ? (
          <Img
            src={`https://ucarecdn.com/${file.file_id}/-/resize/80x/-/quality/lightest/${file.name}`}
          />
        ) : (
          <ImgReplacement>...</ImgReplacement>
        )}
        <DateiTypField>
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
        </DateiTypField>
        <Spacer />
        <DateiNameField>
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
        </DateiNameField>
        <Spacer />
        <BeschreibungField>
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
        </BeschreibungField>
        <DownloadIcon title="herunterladen" onClick={onClickDownload}>
          <FaDownload />
        </DownloadIcon>
        <DelIcon
          title="löschen"
          aria-label="löschen"
          aria-owns={delMenuOpen ? 'delMenu' : undefined}
          aria-haspopup="true"
          onClick={(event) => setDelMenuAnchorEl(event.currentTarget)}
        >
          <FaTimes />
        </DelIcon>
        <Menu
          id="delMenu"
          anchorEl={delMenuAnchorEl}
          open={delMenuOpen}
          onClose={() => setDelMenuAnchorEl(null)}
          PaperProps={{
            style: {
              maxHeight: 48 * 4.5,
              width: 120,
            },
          }}
        >
          <MenuTitle>löschen?</MenuTitle>
          <MenuItem onClick={onClickDelete}>ja</MenuItem>
          <MenuItem onClick={() => setDelMenuAnchorEl(null)}>nein</MenuItem>
        </Menu>
      </Container>
    </ErrorBoundary>
  )
}

export default observer(File)
