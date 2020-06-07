import React, { useContext, useCallback, useState } from 'react'
import { observer } from 'mobx-react-lite'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Radio from '@material-ui/core/Radio'
import { FaCog } from 'react-icons/fa'
import styled from 'styled-components'

import { StoreContext } from '../../../models/reactUtils'
import ErrorBoundary from '../../shared/ErrorBoundary'

const TitleRow = styled.div`
  display: flex;
  justify-content: space-between;
`
const Title = styled.div`
  padding: 12px 16px;
  color: rgba(0, 0, 0, 0.6);
  font-weight: 800;
  user-select: none;
`
const Icon = styled(FaCog)`
  color: white;
`

const SettingsOverall = () => {
  const store = useContext(StoreContext)
  const { showDeleted, setShowDeleted, setHideInactive, hideInactive } = store

  const onClickShowDeleted = useCallback(
    async (event) => {
      const value = event.target.value === 'false'
      setShowDeleted(value)
    },
    [setShowDeleted],
  )
  const onClickShowActive = useCallback(
    async (event) => {
      const value = event.target.value === 'false'
      setHideInactive(value)
    },
    [setHideInactive],
  )

  const [anchorEl, setAnchorEl] = useState(null)
  const onClose = useCallback(() => setAnchorEl(null), [])
  const onClickConfig = useCallback(
    (event) => setAnchorEl(event.currentTarget),
    [],
  )

  return (
    <ErrorBoundary>
      <IconButton
        aria-label="Optionen wählen"
        aria-owns={anchorEl ? 'long-menu' : null}
        aria-haspopup="true"
        title="Optionen wählen"
        onClick={onClickConfig}
      >
        <Icon />
      </IconButton>
      {
        <Menu
          id="long-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={onClose}
        >
          <TitleRow>
            <Title>Optionen wählen:</Title>
          </TitleRow>
          <MenuItem>
            <FormControlLabel
              value={showDeleted === true ? 'true' : 'false'}
              control={
                <Radio
                  color="primary"
                  checked={!showDeleted}
                  onClick={onClickShowDeleted}
                />
              }
              label="Gelöschte Datensätze verbergen"
              labelPlacement="end"
            />
          </MenuItem>
          <MenuItem>
            <FormControlLabel
              value={hideInactive === true ? 'true' : 'false'}
              control={
                <Radio
                  color="primary"
                  checked={hideInactive}
                  onClick={onClickShowActive}
                />
              }
              label="Inaktive Gärten, Kulturen und Personen verbergen"
              labelPlacement="end"
            />
          </MenuItem>
        </Menu>
      }
    </ErrorBoundary>
  )
}

export default observer(SettingsOverall)
