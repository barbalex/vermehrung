import { useEffect, useState, useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { FaTimes } from 'react-icons/fa'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { first as first$ } from 'rxjs/operators'

import { ErrorBoundary } from '../../../../shared/ErrorBoundary.jsx'
import { MobxStoreContext } from '../../../../../mobxStoreContext.js'

import { container, text, delIcon, menuTitle } from './Art.module.css'

export const PersonArt = observer(({ av }) => {
  const store = useContext(MobxStoreContext)

  const [delMenuAnchorEl, setDelMenuAnchorEl] = useState(null)
  const delMenuOpen = Boolean(delMenuAnchorEl)

  const onClose = () => setDelMenuAnchorEl(null)
  const onClickDeleteIcon = (event) => setDelMenuAnchorEl(event.currentTarget)

  const onClickDelete = () => {
    av.delete({ store })
    setDelMenuAnchorEl(null)
  }

  const [artLabel, setArtLabel] = useState(null)
  useEffect(() => {
    const subscription = av.art.observe().subscribe(async (art) => {
      let label
      try {
        label = await art.label.pipe(first$()).toPromise()
      } catch {}

      setArtLabel(label)
    })

    return () => subscription?.unsubscribe?.()
  }, [av.art])

  if (!av) return null
  if (!artLabel) return null

  return (
    <ErrorBoundary>
      <div className={container}>
        <div className={text}>
          <div>{artLabel}</div>
        </div>
        <IconButton
          title="löschen"
          aria-label="löschen"
          aria-owns={delMenuOpen ? 'delMenu' : undefined}
          aria-haspopup="true"
          onClick={onClickDeleteIcon}
          className={delIcon}
        >
          <FaTimes />
        </IconButton>
        <Menu
          id="delMenu"
          anchorEl={delMenuAnchorEl}
          open={delMenuOpen}
          onClose={onClose}
          PaperProps={{
            style: {
              maxHeight: 48 * 4.5,
              width: 120,
            },
          }}
        >
          <h3 className={menuTitle}>löschen?</h3>
          <MenuItem onClick={onClickDelete}>ja</MenuItem>
          <MenuItem onClick={onClose}>nein</MenuItem>
        </Menu>
      </div>
    </ErrorBoundary>
  )
})
