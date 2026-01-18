import { useContext, useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { FaTimes } from 'react-icons/fa'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

import { MobxStoreContext } from '../../../../../mobxStoreContext.js'
import { ErrorBoundary } from '../../../../shared/ErrorBoundary.jsx'
import { personLabelFromPerson } from '../../../../../utils/personLabelFromPerson.js'

import styles from './Person.module.css'

export const GartenPerson = observer(({ gv }) => {
  const store = useContext(MobxStoreContext)

  const [personLabel, setPersonLabel] = useState(null)
  useEffect(() => {
    const personSubscription = gv.person
      .observe()
      .subscribe((person) => setPersonLabel(personLabelFromPerson({ person })))

    return () => personSubscription?.unsubscribe?.()
  }, [gv.person])

  const [delMenuAnchorEl, setDelMenuAnchorEl] = useState(null)
  const delMenuOpen = Boolean(delMenuAnchorEl)

  const onClickDelete = () => gv.delete({ store })

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
})
