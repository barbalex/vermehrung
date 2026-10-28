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

function delay(time) {
  return new Promise((resolve) => setTimeout(resolve, time))
}

export const HeaderAdminMenu = ({
  setParentAnchorEl: setGrandParentAnchorEl,
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | undefined | null>(null)
  const onClickExporte = (event: { target: { name?: string; value: unknown }; currentTarget?: HTMLElement; preventDefault?: () => void; stopPropagation?: () => void; key?: string }) => setAnchorEl(event.currentTarget)

  const [progress, setProgress] = useState(0)
  const onClickImportApData = async () => {
    const db = store.get(dbAtom)

    // fetch all art and apflora_ap
    const arts = await db?.get('art').query().fetch()
    const apfloraAps = await store
      .get(apiClientAtom)
      ?.get('/apflora_ap?select=id,ae_id,ap,av')
    for (const [index, art] of arts?.entries()) {
      // find corresponding apflora_ap using ae_id
      const apfloraAp = apfloraAps.find(
        (apfloraAp) => apfloraAp.ae_id === art.ae_id,
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
      setProgress(((index + 1) / arts?.length) * 100)
      // ensure edits don't happen too fast
      await delay(50)
    }

    // close menus
    setAnchorEl(null)
    setGrandParentAnchorEl(null)
    // ensure full numbers are shown
    setTimeout(window.location.reload(), 500)
  }

  const onClose = () => setAnchorEl(null)

  return (
    <>
      <MenuItem
        aria-owns={anchorEl ? 'menu' : null}
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
