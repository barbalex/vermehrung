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
import { kulturFelder as kulturFelderFragment } from '../../../utils/fragments'

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

const SettingsZaehlungen = ({ aufgabeResult }) => {
  const client = useApolloClient()
  const store = useContext(storeContext)
  const { enqueNotification } = store

  const { error, loading, refetch } = aufgabeResult
  const kulturId = get(aufgabeResult, 'data.aufgabe[0].kultur.id')
  const { ag_datum, ag_teilkultur_id, ag_geplant, ag_person_id } =
    get(aufgabeResult, 'data.aufgabe[0].kultur.kultur_felder') || {}

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
      refetch()
    },
    [refetch, kulturId],
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
          <Title>Felder für Aufgaben wählen:</Title>
          <MenuItem>
            <FormControlLabel
              value={
                ag_teilkultur_id === null
                  ? 'false'
                  : ag_teilkultur_id.toString()
              }
              control={
                <Radio
                  color="primary"
                  checked={ag_teilkultur_id}
                  onClick={saveToDb}
                  name="ag_teilkultur_id"
                />
              }
              label="Teilkultur"
              labelPlacement="end"
            />
          </MenuItem>
          <MenuItem>
            <FormControlLabel
              value={ag_person_id === null ? 'false' : ag_person_id.toString()}
              control={
                <Radio
                  color="primary"
                  checked={ag_person_id}
                  onClick={saveToDb}
                  name="ag_person_id"
                />
              }
              label="Wer"
              labelPlacement="end"
            />
          </MenuItem>
          <MenuItem>
            <FormControlLabel
              value={ag_datum === null ? 'false' : ag_datum.toString()}
              control={
                <Radio
                  color="primary"
                  checked={ag_datum}
                  onClick={saveToDb}
                  name="ag_datum"
                />
              }
              label="Datum"
              labelPlacement="end"
            />
          </MenuItem>
          <MenuItem>
            <FormControlLabel
              value={ag_geplant === null ? 'false' : ag_geplant.toString()}
              control={
                <Radio
                  color="primary"
                  checked={ag_geplant}
                  onClick={saveToDb}
                  name="ag_geplant"
                />
              }
              label="geplant"
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
