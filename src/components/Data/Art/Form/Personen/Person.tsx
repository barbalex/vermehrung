import { useState, useEffect } from 'react'
import { FaTimes } from 'react-icons/fa'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

import { ErrorBoundary } from '../../../../shared/ErrorBoundary.tsx'
import { personLabelFromPerson } from '../../../../../utils/personLabelFromPerson.ts'

import styles from './Person.module.css'

export const Person = ({ av }: { av: import('../../../../shared/types.ts').WmRow | null | undefined }) => {
  const [delMenuAnchorEl, setDelMenuAnchorEl] = useState<HTMLElement | undefined | null>(null)
  const delMenuOpen = Boolean(delMenuAnchorEl)

  const onClose = () => setDelMenuAnchorEl(null)
  const onClickDeleteIcon = (event: { target: { name?: string; value: unknown }; currentTarget?: HTMLElement; preventDefault?: () => void; stopPropagation?: () => void; key?: string }) => setDelMenuAnchorEl(event.currentTarget)
  const onClickDelete = () => {
    av?.delete()
    setDelMenuAnchorEl(null)
  }

  const [personLabel, setPersonLabel] = useState<string | null>(null)
  useEffect(() => {
    const subscription = av?.person.observe().subscribe((person: import('../../../../../dbModel.ts').Person) => {
      setPersonLabel(personLabelFromPerson({ person }))
    })
    return () => subscription?.unsubscribe?.()
  }, [av?.person])

  if (!av) return null
  if (!personLabel) return null

  return (
    <ErrorBoundary>
      <div className={styles.container}>
        <div className={styles.text}>
          <div>{personLabel}</div>
        </div>
        <IconButton
          title="löschen"
          aria-label="löschen"
          aria-owns={delMenuOpen ? 'delMenu' : undefined}
          aria-haspopup="true"
          onClick={onClickDeleteIcon}
          className={styles.delIcon}
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
          <h3 className={styles.menuTitle}>löschen?</h3>
          <MenuItem onClick={onClickDelete}>ja</MenuItem>
          <MenuItem onClick={onClose}>nein</MenuItem>
        </Menu>
      </div>
    </ErrorBoundary>
  )
}
