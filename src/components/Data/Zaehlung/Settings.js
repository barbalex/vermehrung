import React, { useContext, useCallback, useState } from 'react'
import { observer } from 'mobx-react-lite'
import gql from 'graphql-tag'
import { useApolloClient } from '@apollo/react-hooks'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Radio from '@material-ui/core/Radio'
import { FaCog } from 'react-icons/fa'
import { IoMdInformationCircleOutline } from 'react-icons/io'
import get from 'lodash/get'
import styled from 'styled-components'

import { StoreContext } from '../../../models/reactUtils'
import { kulturOption as kulturOptionFragment } from '../../../utils/fragments'
import appBaseUrl from '../../../utils/appBaseUrl'
import ErrorBoundary from '../../shared/ErrorBoundary'

const TitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding-right: 16px;
`
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

const SettingsZaehlungen = ({ zaehlungId }) => {
  const client = useApolloClient()
  const store = useContext(StoreContext)
  const { addNotification } = store

  const zaehlung = store.zaehlungs.get(zaehlungId)
  const { z_bemerkungen } = get(zaehlung, 'kultur.kultur_option') || {}
  const kulturId = zaehlung.kultur_id

  const saveToDb = useCallback(
    async (event) => {
      const field = event.target.name
      const value = event.target.value === 'true'
      try {
        await client.mutate({
          mutation: gql`
              mutation update_kultur_option(
                $kulturId: uuid!
              ) {
                update_kultur_option(
                  where: { id: { _eq: $kulturId } }
                  _set: {
                    ${field}: ${!value}
                  }
                ) {
                  affected_rows
                  returning {
                    ...KulturOptionFields
                  }
                }
              }
              ${kulturOptionFragment}
            `,
          variables: {
            kulturId,
          },
          refetchQueries: ['ZaehlungQueryForZaehlung'],
        })
      } catch (error) {
        return addNotification({
          message: error.message,
        })
      }
    },
    [client, kulturId, addNotification],
  )
  const openSettingsDocs = useCallback(() => {
    setAnchorEl(null)
    const url = `${appBaseUrl()}Dokumentation/Felder-blenden`
    if (typeof window !== 'undefined') {
      if (window.matchMedia('(display-mode: standalone)').matches) {
        return window.open(url, '_blank', 'toolbar=no')
      }
      window.open(url)
    }
  }, [])

  const [anchorEl, setAnchorEl] = useState(null)
  const onClose = useCallback(() => setAnchorEl(null), [])
  const onClickConfig = useCallback(
    (event) => setAnchorEl(event.currentTarget),
    [],
  )

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
          <TitleRow>
            <Title>Felder für Zählungen wählen:</Title>
            <div>
              <IconButton
                aria-label="Anleitung öffnen"
                title="Anleitung öffnen"
                onClick={openSettingsDocs}
              >
                <IoMdInformationCircleOutline />
              </IconButton>
            </div>
          </TitleRow>
          <MenuItem>
            <FormControlLabel
              value={z_bemerkungen === true ? 'true' : 'false'}
              control={
                <Radio
                  color="primary"
                  checked={z_bemerkungen}
                  onClick={saveToDb}
                  name="z_bemerkungen"
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
      }
    </ErrorBoundary>
  )
}

export default observer(SettingsZaehlungen)
