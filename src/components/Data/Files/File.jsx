import { useContext, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { FaTimes, FaDownload } from 'react-icons/fa'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

import { MobxStoreContext } from '../../../mobxStoreContext.js'
import { TextField } from '../../shared/TextField.jsx'
import { isImageFile } from './isImageFile.js'
//import uploadcareApiSignature from '../../../utils/uploadcareApiSignature'
import { ErrorBoundary } from '../../shared/ErrorBoundary.jsx'

import {
  container,
  img,
  imgReplacement,
  delIcon,
  downloadIcon,
  spacer,
  dateiTypField,
  dateiNameField,
  beschreibungField,
  menuTitle,
} from './File.module.css'

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
      <div className={container}>
        {isImage ?
          <img
            src={`https://ucarecdn.com/${file.file_id}/-/resize/80x/-/quality/lightest/${file.name}`}
            className={img}
          />
        : <div className={imgReplacement}>...</div>}
        <div className={dateiTypField}>
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
        </div>
        <div className={spacer} />
        <div className={dateiNameField}>
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
        </div>
        <div className={spacer} />
        <div className={beschreibungField}>
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
        </div>
        <IconButton
          title="herunterladen"
          onClick={onClickDownload}
          className={downloadIcon}
        >
          <FaDownload />
        </IconButton>
        <IconButton
          title="löschen"
          aria-label="löschen"
          aria-owns={delMenuOpen ? 'delMenu' : undefined}
          aria-haspopup="true"
          onClick={(event) => setDelMenuAnchorEl(event.currentTarget)}
          className={delIcon}
        >
          <FaTimes />
        </IconButton>
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
          <h3 className={menuTitle}>löschen?</h3>
          <MenuItem onClick={onClickDelete}>ja</MenuItem>
          <MenuItem onClick={() => setDelMenuAnchorEl(null)}>nein</MenuItem>
        </Menu>
      </div>
    </ErrorBoundary>
  )
})
