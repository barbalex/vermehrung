import { useContext, useState } from 'react'
import { observer } from 'mobx-react-lite'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import LinearProgress from '@mui/material/LinearProgress'
import { FaChevronRight } from 'react-icons/fa'
import styled from '@emotion/styled'
import { useQuery, useClient } from 'urql'
import gql from 'graphql-tag'

import { MobxStoreContext } from '../../../../../mobxStoreContext.js'

import { menuItem } from '../Menu.module.css'

const StyledOtherMenuItem = styled(MenuItem)`
  .MuiLinearProgress-bar {
    transition: none;
  }
`

const apfloraApQuery = gql`
  query apfloraApForAdminQuery {
    apflora_ap {
      id
      ae_id
      ap
      av
    }
  }
`

function delay(time) {
  return new Promise((resolve) => setTimeout(resolve, time))
}

export const HeaderAdminMenu = observer(
  ({ setParentAnchorEl: setGrandParentAnchorEl }) => {
    const store = useContext(MobxStoreContext)
    const { db } = store
    const client = useClient()

    const [anchorEl, setAnchorEl] = useState(null)
    const onClickExporte = (event) => setAnchorEl(event.currentTarget)

    const [progress, setProgress] = useState(0)
    const onClickImportApData = async () => {
      // fetch all art and apflora_ap
      const arts = await db.get('art').query().fetch()
      const data = await client.query(apfloraApQuery).toPromise()
      const apfloraAps = data.data.apflora_ap
      for (const [index, art] of arts.entries()) {
        // find corresponding apflora_ap using ae_id
        const apfloraAp = apfloraAps.find(
          (apfloraAp) => apfloraAp.ae_id === art.ae_id,
        )
        if (!apfloraAp) {
          if (art.apflora_ap) {
            await art.edit({ field: 'apflora_ap', value: false, store })
          }
          if (art.apflora_av) {
            await art.edit({ field: 'apflora_av', value: null, store })
          }
          continue
        }
        if (art.apflora_ap !== apfloraAp.ap) {
          await art.edit({ field: 'apflora_ap', value: apfloraAp.ap, store })
        }
        if (art.apflora_av !== apfloraAp.av) {
          await art.edit({ field: 'apflora_av', value: apfloraAp.av, store })
        }
        setProgress(((index + 1) / arts.length) * 100)
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
          className={menuItem}
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
                <LinearProgress
                  variant="determinate"
                  value={progress}
                />
              )}
            </div>
          </StyledOtherMenuItem>
        </Menu>
      </>
    )
  },
)
