import { useContext, useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import { IoMdInformationCircleOutline } from 'react-icons/io'
import styled from '@emotion/styled'
import { of as $of } from 'rxjs'

import { MobxStoreContext } from '../../../../../mobxStoreContext.js'
import { constants } from '../../../../../utils/constants.js'

const TitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding-right: 16px;
  user-select: none;
`
const Title = styled.div`
  padding: 12px 16px;
  color: rgba(0, 0, 0, 0.6);
  font-weight: 700;
  user-select: none;
`
const Info = styled.div`
  padding: 12px 16px;
  color: rgba(0, 0, 0, 0.4);
  user-select: none;
`

export const TeilkulturSettingsMenu = observer(
  ({ anchorEl, setAnchorEl, kulturId }) => {
    const store = useContext(MobxStoreContext)
    const { db } = store

    const [dataState, setDataState] = useState({ kulturOption: undefined })
    const { kulturOption } = dataState
    const { tk_bemerkungen } = kulturOption ?? {}

    useEffect(() => {
      const kOObservable =
        kulturId ? db.get('kultur_option').findAndObserve(kulturId) : $of({})
      const subscription = kOObservable.subscribe((kulturOption) =>
        setDataState({ kulturOption }),
      )

      return () => subscription?.unsubscribe?.()
    }, [db, kulturId])

    const saveToDb = async (event) => {
      const field = event.target.name
      const value = event.target.value === 'false'
      kulturOption.edit({ field, value, store })
    }

    const openSettingsDocs = () => {
      setAnchorEl(null)
      const url = `${constants?.getAppUri()}/Dokumentation/felder-blenden`
      if (window.matchMedia('(display-mode: standalone)').matches) {
        return window.open(url, '_blank', 'toolbar=no')
      }
      window.open(url)
    }

    const onClose = () => setAnchorEl(null)

    return (
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={onClose}
      >
        <TitleRow>
          <Title>Felder für Teilkulturen wählen:</Title>
          <div>
            <IconButton
              aria-label="Anleitung öffnen"
              title="Anleitung öffnen"
              onClick={openSettingsDocs}
              size="large"
            >
              <IoMdInformationCircleOutline />
            </IconButton>
          </div>
        </TitleRow>
        <MenuItem>
          <FormControlLabel
            value={tk_bemerkungen === true ? 'true' : 'false'}
            control={
              <Checkbox
                color="primary"
                checked={tk_bemerkungen}
                onClick={saveToDb}
                name="tk_bemerkungen"
              />
            }
            label="Bemerkungen"
            labelPlacement="end"
          />
        </MenuItem>
        <Info>
          Zwingende Felder sind nicht aufgelistet.
          <br />
          Die Wahl gilt (nur) für diese Kultur.
        </Info>
      </Menu>
    )
  },
)
