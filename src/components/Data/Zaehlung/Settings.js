import React, { useContext, useCallback, useState } from 'react'
import { observer } from 'mobx-react-lite'
import gql from 'graphql-tag'
import { useApolloClient } from '@apollo/react-hooks'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Radio from '@material-ui/core/Radio'
import { FaCog, FaFrown } from 'react-icons/fa'
import { IoMdInformationCircleOutline } from 'react-icons/io'
import ErrorBoundary from 'react-error-boundary'
import get from 'lodash/get'
import styled from 'styled-components'

import storeContext from '../../../storeContext'
import { kulturFelder as kulturFelderFragment } from '../../../utils/fragments'

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

const SettingsZaehlungen = ({ zaehlungResult }) => {
  const client = useApolloClient()
  const store = useContext(storeContext)
  const { enqueNotification } = store

  const { data, error, loading, refetch: refetchZaehlung } = zaehlungResult
  const zaehlung = get(data, 'zaehlung', [{}])[0]
  const { z_geplant, z_bemerkungen } =
    get(zaehlung, 'kultur.kultur_felder') || {}
  const kulturId = zaehlung.kultur_id

  const saveToDb = useCallback(
    async event => {
      const field = event.target.name
      const value = event.target.value === 'true'
      try {
        await client.mutate({
          mutation: gql`
              mutation update_kultur_felder(
                $kulturId: Int!
              ) {
                update_kultur_felder(
                  where: { kultur_id: { _eq: $kulturId } }
                  _set: {
                    ${field}: ${!value}
                  }
                ) {
                  affected_rows
                  returning {
                    ...KulturFelderFields
                  }
                }
              }
              ${kulturFelderFragment}
            `,
          variables: {
            kulturId,
          },
        })
      } catch (error) {
        return enqueNotification({
          message: error.message,
          options: {
            variant: 'error',
          },
        })
      }
      refetchZaehlung()
    },
    [refetchZaehlung, client, kulturId, enqueNotification],
  )
  const onClickFrown = useCallback(() => {
    enqueNotification({
      message: error.message,
      options: {
        variant: 'error',
      },
    })
  }, [enqueNotification, error])
  const openSettingsDocs = useCallback(() => {
    setAnchorEl(null)
    typeof window !== 'undefined' &&
      window.open(
        'https://vermehrung.apflora.ch/Dokumentation/Benutzer/Felder-blenden',
      )
  }, [])

  const [anchorEl, setAnchorEl] = useState(null)
  const onClose = useCallback(() => setAnchorEl(null), [])
  const onClickConfig = useCallback(
    event => setAnchorEl(event.currentTarget),
    [],
  )

  if (error) {
    return (
      <IconButton
        aria-label="Felder wählen"
        aria-owns={anchorEl ? 'long-menu' : null}
        aria-haspopup="true"
        title={error.message}
        onClick={onClickFrown}
      >
        <FaFrown />
      </IconButton>
    )
  }
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
      {!loading && (
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
              value={z_geplant === true ? 'true' : 'false'}
              control={
                <Radio
                  color="primary"
                  checked={z_geplant}
                  onClick={saveToDb}
                  name="z_geplant"
                />
              }
              label="geplant"
              labelPlacement="end"
            />
          </MenuItem>
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
      )}
    </ErrorBoundary>
  )
}

export default observer(SettingsZaehlungen)
