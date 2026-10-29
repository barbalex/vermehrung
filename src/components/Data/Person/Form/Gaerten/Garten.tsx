import { useState, useEffect } from 'react'
import { FaTimes } from 'react-icons/fa'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { first as first$ } from 'rxjs/operators'

import { ErrorBoundary } from '../../../../shared/ErrorBoundary.tsx'

import styles from './Garten.module.css'

export const PersonGarten = ({
  gv,
}: {
  gv: import('../../../../../dbModel.ts').Gv | null | undefined
}) => {
  const [delMenuAnchorEl, setDelMenuAnchorEl] = useState<
    HTMLElement | undefined | null
  >(null)
  const delMenuOpen = Boolean(delMenuAnchorEl)

  const onClose = () => setDelMenuAnchorEl(null)
  const onClickDeleteIcon = (event: {
    target: { name?: string; value: unknown }
    currentTarget?: HTMLElement
    preventDefault?: () => void
    stopPropagation?: () => void
    key?: string
  }) => setDelMenuAnchorEl(event.currentTarget)

  const onClickDelete = () => {
    gv?.delete()
    setDelMenuAnchorEl(null)
  }

  const [gartenLabel, setGartenLabel] = useState<string | undefined | null>(
    null,
  )
  useEffect(() => {
    const gartenSubscription = gv?.garten
      .observe()
      .subscribe(async (garten: import('../../../../../dbModel.ts').Garten) => {
        let label
        try {
          label = await garten.label.pipe(first$()).toPromise()
        } catch {}

        setGartenLabel(label)
      })

    return () => gartenSubscription?.unsubscribe?.()
  }, [gv?.garten])

  if (!gv) return null
  if (!gartenLabel) return null

  return (
    <ErrorBoundary>
      <div className={styles.container}>
        <div className={styles.text}>
          <div>{gartenLabel}</div>
        </div>
        <IconButton
          title="löschen"
          aria-label="löschen"
          aria-owns={delMenuOpen ? 'delMenu' : undefined}
          aria-haspopup="true"
          onClick={onClickDeleteIcon as unknown as import('react').MouseEventHandler<HTMLElement>}
          className={styles.delIcon}
        >
          <FaTimes />
        </IconButton>
        <Menu
          id="delMenu"
          anchorEl={delMenuAnchorEl ?? null}
          open={delMenuOpen}
          onClose={onClose}
          slotProps={{
            paper: {
              style: {
                maxHeight: 48 * 4.5,
                width: 120,
              },
            },
          }}
        >
          <h3 className={styles.menuTitle}>löschen?</h3>
          <MenuItem onClick={onClickDelete as unknown as import('react').MouseEventHandler<HTMLElement>}>ja</MenuItem>
          <MenuItem onClick={onClose}>nein</MenuItem>
        </Menu>
      </div>
    </ErrorBoundary>
  )
}
