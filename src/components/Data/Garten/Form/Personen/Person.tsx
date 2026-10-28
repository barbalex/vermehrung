import { useState, useEffect } from 'react'
import { FaTimes } from 'react-icons/fa'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

import { ErrorBoundary } from '../../../../shared/ErrorBoundary.tsx'
import { personLabelFromPerson } from '../../../../../utils/personLabelFromPerson.ts'

import styles from './Person.module.css'

export const GartenPerson = ({ gv }: { gv: import('../../../../shared/types.ts').WmRow | null | undefined }) => {
  const [personLabel, setPersonLabel] = useState<string | null>(null)
  useEffect(() => {
    const personSubscription = gv?.person
      .observe()
      .subscribe((person: import('../../../../../dbModel.ts').Person) => setPersonLabel(personLabelFromPerson({ person })))

    return () => personSubscription?.unsubscribe?.()
  }, [gv?.person])

  const [delMenuAnchorEl, setDelMenuAnchorEl] = useState<EventTarget & HTMLButtonElement | null>(null)
  const delMenuOpen = Boolean(delMenuAnchorEl)

  const onClickDelete = () => gv?.delete()

  if (!gv) return null

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
          onClick={(event) => setDelMenuAnchorEl(event.currentTarget)}
          className={styles.delIcon}
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
          <h3 className={styles.menuTitle}>löschen?</h3>
          <MenuItem onClick={onClickDelete}>ja</MenuItem>
          <MenuItem onClick={() => setDelMenuAnchorEl(null)}>nein</MenuItem>
        </Menu>
      </div>
    </ErrorBoundary>
  )
}
