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
import { personOption as personOptionFragment } from '../../../utils/fragments'
import appBaseUrl from '../../../utils/appBaseUrl'

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
const Info = styled.div`
  padding: 12px 16px;
  color: rgba(0, 0, 0, 0.4);
  user-select: none;
`

const SettingsGarten = ({ personId, personOptionResult }) => {
  const client = useApolloClient()
  const store = useContext(storeContext)
  const { enqueNotification } = store

  const { data, error, loading } = personOptionResult
  const {
    ga_strasse,
    ga_plz,
    ga_ort,
    ga_geom_point,
    ga_lat_lng,
    ga_aktiv,
    ga_bemerkungen,
  } = get(data, 'person_option[0]') || {}

  const saveToDb = useCallback(
    async (event) => {
      const field = event.target.name
      const value = event.target.value === 'true'
      try {
        await client.mutate({
          mutation: gql`
              mutation update_person_option(
                $personId: bigint!
              ) {
                update_person_option(
                  where: { person_id: { _eq: $personId } }
                  _set: {
                    ${field}: ${!value}
                  }
                ) {
                  affected_rows
                  returning {
                    ...PersonOptionFields
                  }
                }
              }
              ${personOptionFragment}
            `,
          variables: {
            personId,
          },
          refetchQueries: ['PersonOptionQueryForGarten'],
        })
      } catch (error) {
        return enqueNotification({
          message: error.message,
          options: {
            variant: 'error',
          },
        })
      }
    },
    [client, personId, enqueNotification],
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
            <Title>Felder für Gärten wählen:</Title>
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
              value={ga_strasse === true ? 'true' : 'false'}
              control={
                <Radio
                  color="primary"
                  checked={ga_strasse}
                  onClick={saveToDb}
                  name="ga_strasse"
                />
              }
              label="Strasse"
              labelPlacement="end"
            />
          </MenuItem>
          <MenuItem>
            <FormControlLabel
              value={ga_plz === true ? 'true' : 'false'}
              control={
                <Radio
                  color="primary"
                  checked={ga_plz}
                  onClick={saveToDb}
                  name="ga_plz"
                />
              }
              label="PLZ"
              labelPlacement="end"
            />
          </MenuItem>
          <MenuItem>
            <FormControlLabel
              value={ga_ort === true ? 'true' : 'false'}
              control={
                <Radio
                  color="primary"
                  checked={ga_ort}
                  onClick={saveToDb}
                  name="ga_ort"
                />
              }
              label="Ort"
              labelPlacement="end"
            />
          </MenuItem>
          <MenuItem>
            <FormControlLabel
              value={ga_geom_point === true ? 'true' : 'false'}
              control={
                <Radio
                  color="primary"
                  checked={ga_geom_point}
                  onClick={saveToDb}
                  name="ga_geom_point"
                />
              }
              label="Koordinaten"
              labelPlacement="end"
            />
          </MenuItem>
          <MenuItem>
            <FormControlLabel
              value={ga_lat_lng === true ? 'true' : 'false'}
              control={
                <Radio
                  color="primary"
                  checked={ga_lat_lng}
                  onClick={saveToDb}
                  name="ga_lat_lng"
                />
              }
              label="Längen- und Breitengrade"
              labelPlacement="end"
            />
          </MenuItem>
          <MenuItem>
            <FormControlLabel
              value={ga_aktiv === true ? 'true' : 'false'}
              control={
                <Radio
                  color="primary"
                  checked={ga_aktiv}
                  onClick={saveToDb}
                  name="ga_aktiv"
                />
              }
              label="aktiv"
              labelPlacement="end"
            />
          </MenuItem>
          <MenuItem>
            <FormControlLabel
              value={ga_bemerkungen === true ? 'true' : 'false'}
              control={
                <Radio
                  color="primary"
                  checked={ga_bemerkungen}
                  onClick={saveToDb}
                  name="ga_bemerkungen"
                />
              }
              label="Bemerkungen"
              labelPlacement="end"
            />
          </MenuItem>
          <Info>
            Zwingende Felder sind nicht aufgelistet.
            <br />
            Die Wahl gilt für alle Gärten.
          </Info>
        </Menu>
      )}
    </ErrorBoundary>
  )
}

export default observer(SettingsGarten)
