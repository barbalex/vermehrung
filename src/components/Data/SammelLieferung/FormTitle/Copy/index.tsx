import { useState } from 'react'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { FaRegCopy } from 'react-icons/fa'

import { addNotification } from '../../../../../store/index.ts'
import { exists } from '../../../../../utils/exists.ts'
import { updateSammelLieferung } from './updateLieferung.ts'
import { updateAllSammelLieferungen } from './updateAllLieferungen.ts'
import { ErrorBoundary } from '../../../../shared/ErrorBoundary.tsx'

import styles from './index.module.css'

const sammelLieferungFields = [
  'id',
  'art_id',
  'person_id',
  'von_sammlung_id',
  'von_kultur_id',
  'datum',
  'nach_kultur_id',
  'nach_ausgepflanzt',
  'von_anzahl_individuen',
  'anzahl_pflanzen',
  'anzahl_auspflanzbereit',
  'gramm_samen',
  'andere_menge',
  'geplant',
  'bemerkungen',
  '_rev',
  '_parent_rev',
  '_revisions',
  '_depth',
  '_conflicts',
  '_deleted',
]

export const SammelLieferungCopyMenu = ({ sammelLieferung, lieferung }: { sammelLieferung: import('../../../../shared/types.ts').WmRow | null | undefined; lieferung: import('../../../../shared/types.ts').WmRow | null | undefined }) => {
  //console.log('CopySammelLieferungMenu', { sammelLieferung, lieferung })

  const [anchorEl, setAnchorEl] = useState<HTMLElement | undefined | null>(null)
  const onClose = () => setAnchorEl(null)
  const onClickConfig = (event: { target: { name?: string; value: unknown }; currentTarget?: HTMLElement; preventDefault?: () => void; stopPropagation?: () => void; key?: string }) => setAnchorEl(event.currentTarget)

  const containsData =
    Object.entries(sammelLieferung)
      .filter(
        // only accept lieferung's fields
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ([key, value]) =>
          sammelLieferungFields.filter((f) => f !== 'id').includes(key),
      )
      // only update with existing values
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .filter(([key, val]) => exists(val) && val !== false).length > 0

  const onClickActiveLieferung = async () => {
    setAnchorEl(null)
    try {
      await updateSammelLieferung({
        lieferung,
        sammelLieferung,
      })
    } catch {
      return
    }
    addNotification({
      message: 'Lieferung aktualisiert',
      type: 'info',
    })
  }

  const onClickAllLieferung = () => {
    setAnchorEl(null)
    updateAllSammelLieferungen({
      sammelLieferung,
    })
  }

  return (
    <ErrorBoundary>
      <IconButton
        aria-label="Daten kopieren"
        aria-owns={anchorEl ? 'long-menu' : null}
        aria-haspopup="true"
        title="Daten kopieren"
        onClick={onClickConfig}
        disabled={!containsData}
        size="large"
      >
        <FaRegCopy />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={onClose}
      >
        <div className={styles.titleRow}>
          <div className={styles.title}>
            Die Daten der Sammel-Lieferung kopieren:
          </div>
        </div>
        {lieferung && (
          <MenuItem onClick={onClickActiveLieferung}>
            in die links angezeigte Lieferung
          </MenuItem>
        )}
        <MenuItem onClick={onClickAllLieferung}>in alle Lieferungen</MenuItem>
      </Menu>
    </ErrorBoundary>
  )
}
