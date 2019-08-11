import React, { useState, useEffect, useCallback, useContext } from 'react'
import { observer } from 'mobx-react-lite'
import gql from 'graphql-tag'
import { useApolloClient } from '@apollo/react-hooks'
import styled from 'styled-components'
import IconButton from '@material-ui/core/IconButton'
import { FaRegTrashAlt } from 'react-icons/fa'
import ErrorBoundary from 'react-error-boundary'

import TextField from '../../../shared/TextField'
import { teilzaehlung as teilzaehlungFragment } from '../../../../utils/fragments'
import types from '../../../../store/Filter/simpleTypes'
import storeContext from '../../../../storeContext'

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`
const Ort = styled.div`
  flex-basis: 100px;
  flex-shrink: 1;
  flex-grow: 1;
  margin-right: 10px;
`
const Anzahl = styled.div`
  flex-basis: 200px;
  flex-shrink: 1;
  flex-grow: 1;
  margin-right: 10px;
`
const Other = styled.div`
  flex-basis: 250px;
  flex-shrink: 5;
  flex-grow: 10;
  margin-right: 10px;
`
const Last = styled.div`
  flex-basis: 350px;
  flex-shrink: 5;
  flex-grow: 30;
`
const TopLine = styled.div`
  background-color: rgba(74, 20, 140, 0.1);
  height: 4px;
  margin-left: -10px;
  margin-right: -10px;
  margin-bottom: 10px;
`

const mutation = gql`
  mutation deleteDataset($id: bigint!) {
    delete_teilzaehlung(where: { id: { _eq: $id } }) {
      returning {
        id
      }
    }
  }
`

const Teilzaehlung = ({
  teilzaehlung: row,
  kulturZaehlungFelder,
  index,
  refetch,
}) => {
  const client = useApolloClient()
  const store = useContext(storeContext)
  const { enqueNotification } = store

  const [errors, setErrors] = useState({})

  useEffect(() => {setErrors({})}, [row])

  const saveToDb = useCallback(
    async event => {
      const field = event.target.name
      const value = event.target.value || null
      try {
        const type = types.lieferung[field]
        let valueToSet
        if (value === undefined || value === null) {
          valueToSet = null
        } else if (['number', 'boolean'].includes(type)) {
          valueToSet = value
        } else {
          valueToSet = `"${value}"`
        }
        await client.mutate({
          mutation: gql`
              mutation update_teilzaehlung(
                $id: bigint!
              ) {
                update_teilzaehlung(
                  where: { id: { _eq: $id } }
                  _set: {
                    ${field}: ${valueToSet}
                  }
                ) {
                  affected_rows
                  returning {
                    ...TeilzaehlungFields
                  }
                }
              }
              ${teilzaehlungFragment}
            `,
          variables: {
            id: row.id,
          },
        })
      } catch (error) {
        return setErrors({ [field]: error.message })
      }
      setErrors({})
    },
    [row],
  )
  const onClickDelete = useCallback(async () => {
    try {
      await client.mutate({
        mutation,
        variables: {
          id: row.id,
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
  }, [row])

  if (!row) return null

  const {
    tz_ort,
    tz_anzahl_mutterpflanzen,
    tz_menge_beschrieben,
    tz_erscheinung,
    tz_bemerkungen,
  } = kulturZaehlungFelder

  return (
    <ErrorBoundary>
      <>
        {!!index && <TopLine />}
        <Container>
          {!!tz_ort && (
            <Ort>
              <TextField
                key={`${row.id}ort`}
                name="ort"
                label="Ort"
                value={row.ort}
                saveToDb={saveToDb}
                error={errors.ort}
                type="text"
              />
            </Ort>
          )}
          <Anzahl>
            <TextField
              key={`${row.id}anzahl_pflanzen`}
              name="anzahl_pflanzen"
              label="Anzahl Pflanzen"
              value={row.anzahl_pflanzen}
              saveToDb={saveToDb}
              error={errors.anzahl_pflanzen}
              type="number"
            />
          </Anzahl>
          <Anzahl>
            <TextField
              key={`${row.id}anzahl_auspflanzbereit`}
              name="anzahl_auspflanzbereit"
              label="Anzahl auspflanz-bereit"
              value={row.anzahl_auspflanzbereit}
              saveToDb={saveToDb}
              error={errors.anzahl_auspflanzbereit}
              type="number"
            />
          </Anzahl>
          {!!tz_anzahl_mutterpflanzen && (
            <Anzahl>
              <TextField
                key={`${row.id}anzahl_mutterpflanzen`}
                name="anzahl_mutterpflanzen"
                label="Anzahl Mutter-Pflanzen"
                value={row.anzahl_mutterpflanzen}
                saveToDb={saveToDb}
                error={errors.anzahl_mutterpflanzen}
                type="number"
              />
            </Anzahl>
          )}
          {!!tz_menge_beschrieben && (
            <Other>
              <TextField
                key={`${row.id}menge_beschrieben`}
                name="menge_beschrieben"
                label="Menge textlich beschrieben"
                value={row.menge_beschrieben}
                saveToDb={saveToDb}
                error={errors.menge_beschrieben}
                type="text"
              />
            </Other>
          )}
          {!!tz_erscheinung && (
            <Other>
              <TextField
                key={`${row.id}erscheinung`}
                name="erscheinung"
                label="Erscheinung, z.B. Verpackung"
                value={row.erscheinung}
                saveToDb={saveToDb}
                error={errors.erscheinung}
                type="text"
              />
            </Other>
          )}
          {!!tz_bemerkungen && (
            <Last>
              <TextField
                key={`${row.id}bemerkungen`}
                name="bemerkungen"
                label="Bemerkungen"
                value={row.bemerkungen}
                saveToDb={saveToDb}
                error={errors.bemerkungen}
                multiLine
              />
            </Last>
          )}
          <div>
            <IconButton
              aria-label="löschen"
              title="löschen"
              onClick={onClickDelete}
            >
              <FaRegTrashAlt />
            </IconButton>
          </div>
        </Container>
      </>
    </ErrorBoundary>
  )
}

export default observer(Teilzaehlung)
