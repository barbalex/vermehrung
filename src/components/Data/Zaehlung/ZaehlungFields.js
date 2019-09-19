import React, { useContext, useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import gql from 'graphql-tag'
import { useApolloClient } from '@apollo/react-hooks'
import styled from 'styled-components'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Radio from '@material-ui/core/Radio'
import DialogContent from '@material-ui/core/DialogContent'
import ErrorBoundary from 'react-error-boundary'

import storeContext from '../../../storeContext'
import { kultur_felder as kulturFelderFragment } from '../../../utils/fragments'

const StyledDialogContent = styled(DialogContent)`
  display: flex;
  flex-direction: column;
`
const Comment = styled.div`
  padding-top: 15px;
`

const ZaehlungFields = ({ kulturFelder: row, refetch }) => {
  const client = useApolloClient()
  const store = useContext(storeContext)
  const { enqueNotification } = store

  const saveToDb = useCallback(
    async event => {
      const field = event.target.name
      const value = event.target.value === 'true'
      try {
        await client.mutate({
          mutation: gql`
              mutation update_kultur_felder(
                $id: Int!
              ) {
                update_kultur_felder(
                  where: { kultur_id: { _eq: $id } }
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
            id: row.kultur_id,
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
    [row.id],
  )

  const {
    z_bemerkungen,
    tz_teilkultur_id,
    tz_anzahl_mutterpflanzen,
    tz_andere_menge,
    tz_auspflanzbereit_beschreibung,
    tz_bemerkungen,
  } = row

  return (
    <ErrorBoundary>
      <StyledDialogContent>
        <FormControlLabel
          value={
            tz_teilkultur_id === null ? 'false' : tz_teilkultur_id.toString()
          }
          control={
            <Radio
              color="primary"
              checked={!!tz_teilkultur_id}
              onClick={saveToDb}
              name="tz_teilkultur_id"
            />
          }
          label="Teilkultur"
          labelPlacement="end"
        />
        <FormControlLabel
          value={
            tz_anzahl_mutterpflanzen === null
              ? 'false'
              : tz_anzahl_mutterpflanzen.toString()
          }
          control={
            <Radio
              color="primary"
              checked={!!tz_anzahl_mutterpflanzen}
              onClick={saveToDb}
              name="tz_anzahl_mutterpflanzen"
            />
          }
          label="Anzahl Mutterpflanzen"
          labelPlacement="end"
        />
        <FormControlLabel
          value={
            tz_andere_menge === null ? 'false' : tz_andere_menge.toString()
          }
          control={
            <Radio
              color="primary"
              checked={!!tz_andere_menge}
              onClick={saveToDb}
              name="tz_andere_menge"
            />
          }
          label={`Andere Menge (z.B. "3 Zwiebeln")`}
          labelPlacement="end"
        />
        <FormControlLabel
          value={
            tz_auspflanzbereit_beschreibung === null
              ? 'false'
              : tz_auspflanzbereit_beschreibung.toString()
          }
          control={
            <Radio
              color="primary"
              checked={!!tz_auspflanzbereit_beschreibung}
              onClick={saveToDb}
              name="tz_auspflanzbereit_beschreibung"
            />
          }
          label="Beschreibung auspflanzbereit"
          labelPlacement="end"
        />
        <FormControlLabel
          value={z_bemerkungen === null ? 'false' : z_bemerkungen.toString()}
          control={
            <Radio
              color="primary"
              checked={!!z_bemerkungen}
              onClick={saveToDb}
              name="z_bemerkungen"
            />
          }
          label="Bemerkungen zur Zählung"
          labelPlacement="end"
        />
        <FormControlLabel
          value={tz_bemerkungen === null ? 'false' : tz_bemerkungen.toString()}
          control={
            <Radio
              color="primary"
              checked={!!tz_bemerkungen}
              onClick={saveToDb}
              name="tz_bemerkungen"
            />
          }
          label="Bemerkungen zur Teil-Zählung"
          labelPlacement="end"
        />
        <Comment>
          Nicht aufgeführte Felder sind zwingend.
          <br />
          Die Wahl gilt nur für diese Kultur.
        </Comment>
      </StyledDialogContent>
    </ErrorBoundary>
  )
}

export default observer(ZaehlungFields)
