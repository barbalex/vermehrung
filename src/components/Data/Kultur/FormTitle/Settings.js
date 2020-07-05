import React, { useContext, useCallback, useState } from 'react'
import { observer } from 'mobx-react-lite'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Radio from '@material-ui/core/Radio'
import { FaCog } from 'react-icons/fa'
import { IoMdInformationCircleOutline } from 'react-icons/io'
import styled from 'styled-components'

import { StoreContext } from '../../../../models/reactUtils'
import ErrorBoundary from '../../../shared/ErrorBoundary'
import getConstants from '../../../../utils/constants'

const constants = getConstants()

const Title = styled.div`
  padding: 12px 16px;
  color: rgba(0, 0, 0, 0.6);
  font-weight: 800;
  user-select: none;
`
const Info = styled.div`
  padding: 12px 16px;
  color: rgba(0, 0, 0, 0.4);
  user-select: none;
`

const SettingsKultur = ({ kulturId }) => {
  const store = useContext(StoreContext)

  const kulturOption = store.kultur_options.get(kulturId) ?? {}
  const { tk } = kulturOption

  const saveToDb = useCallback(
    async (event) => {
      const field = event.target.name
      const value = event.target.value === 'false'
      kulturOption.edit({ field, value })
    },
    [kulturOption],
  )

  const [anchorEl, setAnchorEl] = useState(null)

  const onClose = useCallback(() => setAnchorEl(null), [])
  const onClickConfig = useCallback(
    (event) => setAnchorEl(event.currentTarget),
    [],
  )
  const openOptionDocs = useCallback(() => {
    setAnchorEl(null)
    const url = `${constants?.appUri}/Dokumentation/Teilkulturen`
    if (typeof window !== 'undefined') {
      if (window.matchMedia('(display-mode: standalone)').matches) {
        return window.open(url, '_blank', 'toolbar=no')
      }
      window.open(url)
    }
  }, [])

  return (
    <ErrorBoundary>
      <IconButton
        aria-label="Felder wählen"
        aria-owns={anchorEl ? 'long-menu' : null}
        aria-haspopup="true"
        title="Felder wählen"
        onClick={onClickConfig}
      >
        <FaCog />
      </IconButton>
      {
        <Menu
          id="long-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={onClose}
        >
          <Title>Optionen für diese Kultur:</Title>
          <MenuItem>
            <FormControlLabel
              value={tk === true ? 'true' : 'false'}
              control={
                <Radio
                  color="primary"
                  checked={tk}
                  onClick={saveToDb}
                  name="tk"
                />
              }
              label="Mit Teil-Kulturen arbeiten"
              labelPlacement="end"
            />
            <div>
              <IconButton
                aria-label="Anleitung öffnen"
                title="Anleitung öffnen"
                onClick={openOptionDocs}
              >
                <IoMdInformationCircleOutline />
              </IconButton>
            </div>
          </MenuItem>
          <Info>Die Wahl gilt (nur) für diese Kultur.</Info>
        </Menu>
      }
    </ErrorBoundary>
  )
}

export default observer(SettingsKultur)
