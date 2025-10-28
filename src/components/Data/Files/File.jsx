import { useContext, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import styled from '@emotion/styled'
import { FaTimes, FaDownload } from 'react-icons/fa'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

import { MobxStoreContext } from '../../../mobxStoreContext.js'
import { TextField } from '../../shared/TextField.jsx'
import { isImageFile } from './isImageFile.js'
//import uploadcareApiSignature from '../../../utils/uploadcareApiSignature'
import { ErrorBoundary } from '../../shared/ErrorBoundary.jsx'

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

export const File = observer(({ file, parent }) => {
  const store = useContext(MobxStoreContext)
  const { errors, unsetError } = store

  const [delMenuAnchorEl, setDelMenuAnchorEl] = useState(null)
  const delMenuOpen = Boolean(delMenuAnchorEl)

  useEffect(() => unsetError(`${parent}_file`), [file, parent, unsetError])

  // TODO: need to add delete to all file models
  const onClickDelete = () => file.delete({ store })
  const onClickDownload = () =>
    window.open(`https://ucarecdn.com/${file.file_id}/-/inline/no/`)

  const saveToDb = async (event) => {
    const field = event.target.name
    const value = event.target.value || null
    // TODO: need to add edit to all file models
    await file.edit({ field, value, store })
    unsetError(`${parent}_file`)
  }

  if (!file) return null

  const isImage = isImageFile(file)

  return (
    <ErrorBoundary>
      <Container>
        {isImage ?
          <Img
            src={`https://ucarecdn.com/${file.file_id}/-/resize/80x/-/quality/lightest/${file.name}`}
          />
        : <ImgReplacement>...</ImgReplacement>}
        <DateiTypField>
          <TextField
            key={`${file.id}fileMimeType`}
            name="fileMimeType"
            label="Datei-Typ"
            value={file.file_mime_type}
            saveToDb={saveToDb}
            error={errors[`${parent}_file`]?.file_mime_type}
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
            error={errors[`${parent}_file`]?.name}
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
            error={errors[`${parent}_file`]?.beschreibung}
            multiLine
            schrinkLabel
          />
        </BeschreibungField>
        <DownloadIcon
          title="herunterladen"
          onClick={onClickDownload}
        >
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
})
