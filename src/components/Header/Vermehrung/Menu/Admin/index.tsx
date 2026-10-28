import { useState } from 'react'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import LinearProgress from '@mui/material/LinearProgress'
import { FaChevronRight } from 'react-icons/fa'
import styled from '@emotion/styled'
import { store, apiClientAtom, dbAtom } from '../../../../../store/index.ts'

import styles from '../Menu.module.css'

// keep styled due to @mui
const StyledOtherMenuItem = styled(MenuItem)`
  .MuiLinearProgress-bar {
    transition: none;
  }
`

function delay(time: number) {
  return new Promise((resolve) => setTimeout(resolve, time))
}

export const HeaderAdminMenu = ({
  setParentAnchorEl: setGrandParentAnchorEl,
}: {
  setParentAnchorEl: (el: HTMLElement | null) => void
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | undefined | null>(null)
  const onClickExporte = (event: { currentTarget: HTMLElement }) =>
    setAnchorEl(event.currentTarget)

  const [progress, setProgress] = useState(0)
  const onClickImportApData = async () => {
    const db = store.get(dbAtom)

    // fetch all art and apflora_ap
    const arts = await db
      ?.get<import('../../../../../dbModel.ts').Art>('art')
      .query()
      .fetch()
    const apfloraAps = ((await store
      .get(apiClientAtom)
      ?.get('/apflora_ap?select=id,ae_id,ap,av')) ?? []) as {
      ae_id?: string | null
      ap?: boolean | null
      av?: string | null
    }[]
    for (const [index, art] of (arts ?? []).entries()) {
      // find corresponding apflora_ap using ae_id
      const apfloraAp = apfloraAps.find(
        (apfloraAp: { ae_id?: string | null }) => apfloraAp.ae_id === art.ae_id,
      )
      if (!apfloraAp) {
        if (art.apflora_ap) {
          await art.edit({ field: 'apflora_ap', value: false })
        }
        if (art.apflora_av) {
          await art.edit({ field: 'apflora_av', value: null })
        }
        continue
      }
      if (art.apflora_ap !== apfloraAp.ap) {
        await art.edit({ field: 'apflora_ap', value: apfloraAp.ap })
      }
      if (art.apflora_av !== apfloraAp.av) {
        await art.edit({ field: 'apflora_av', value: apfloraAp.av })
      }
      setProgress(((index + 1) / (arts?.length ?? 1)) * 100)
      // ensure edits don't happen too fast
      await delay(50)
    }

    // close menus
    setAnchorEl(null)
    setGrandParentAnchorEl(null)
    // ensure full numbers are shown
    // was setTimeout(window.location.reload(), 500) - which reloaded
    // immediately instead of after the delay
    setTimeout(() => window.location.reload(), 500)
  }

  const onClose = () => setAnchorEl(null)

  return (
    <>
      <MenuItem
        aria-owns={anchorEl ? 'menu' : undefined}
        aria-haspopup="true"
        onClick={onClickExporte}
        className={styles.menuItem}
      >
        Administration
        <FaChevronRight />
      </MenuItem>
      <Menu
        id="menuExport"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={onClose}
      >
        <StyledOtherMenuItem onClick={onClickImportApData}>
          <div>
            AP-Daten (re-)importieren (Stand: 25.1.2025)
            {progress > 0 && (
              <LinearProgress variant="determinate" value={progress} />
            )}
          </div>
        </StyledOtherMenuItem>
      </Menu>
    </>
  )
}
