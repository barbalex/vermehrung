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
import ErrorBoundary from 'react-error-boundary'
import get from 'lodash/get'
import styled from 'styled-components'

import storeContext from '../../../storeContext'
import { personFelder as personFelderFragment } from '../../../utils/fragments'

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

const SettingsGarten = ({ personId, personFelderResult }) => {
  const client = useApolloClient()
  const store = useContext(storeContext)
  const { enqueNotification } = store

  const { data, error, loading, refetch } = personFelderResult
  const {
    ga_strasse,
    ga_plz,
    ga_ort,
    ga_geom_point,
    ga_aktiv,
    ga_bemerkungen,
  } = get(data, 'person_felder[0]', {}) || {}

  const saveToDb = useCallback(
    async event => {
      const field = event.target.name
      const value = event.target.value === 'true'
      try {
        await client.mutate({
          mutation: gql`
              mutation update_person_felder(
                $personId: Int!
              ) {
                update_person_felder(
                  where: { person_id: { _eq: $personId } }
                  _set: {
                    ${field}: ${!value}
                  }
                ) {
                  affected_rows
                  returning {
                    ...PersonFelderFields
                  }
                }
              }
              ${personFelderFragment}
            `,
          variables: {
            personId,
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
      refetch()
    },
    [refetch, personId],
  )
  const onClickFrown = useCallback(() => {
    enqueNotification({
      message: error.message,
      options: {
        variant: 'error',
      },
    })
  }, [])

  const [anchorEl, setAnchorEl] = useState(null)
  const onClose = useCallback(() => setAnchorEl(null))
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
          <Title>Felder für Gärten wählen:</Title>
          <MenuItem>
            <FormControlLabel
              value={ga_strasse === null ? 'false' : ga_strasse.toString()}
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
              value={ga_plz === null ? 'false' : ga_plz.toString()}
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
              value={ga_ort === null ? 'false' : ga_ort.toString()}
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
              value={
                ga_geom_point === null ? 'false' : ga_geom_point.toString()
              }
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
              value={ga_aktiv === null ? 'false' : ga_aktiv.toString()}
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
              value={
                ga_bemerkungen === null ? 'false' : ga_bemerkungen.toString()
              }
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
