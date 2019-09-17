import React, { useState, useEffect, useCallback, useContext } from 'react'
import { observer } from 'mobx-react-lite'
import gql from 'graphql-tag'
import { useApolloClient } from '@apollo/react-hooks'
import styled from 'styled-components'
import IconButton from '@material-ui/core/IconButton'
import { FaRegTrashAlt } from 'react-icons/fa'
import ErrorBoundary from 'react-error-boundary'

import TextField from '../../../shared/TextField'
import Select from '../../../shared/Select'
import { teilzaehlung as teilzaehlungFragment } from '../../../../utils/fragments'
import types from '../../../../store/Filter/simpleTypes'
import storeContext from '../../../../storeContext'

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`
const Teilkultur = styled.div`
  flex-basis: 230px;
  flex-shrink: 1;
  flex-grow: 1;
  margin-right: 10px;
`
const Anzahl = styled.div`
  flex-basis: 170px;
  flex-shrink: 0;
  flex-grow: 1;
  margin-right: 10px;
`
const Other = styled.div`
  flex-basis: 250px;
  flex-shrink: 5;
  flex-grow: 2;
  margin-right: 10px;
`
const Auspflanzbereit = styled.div`
  flex-basis: 350px;
  flex-shrink: 2;
  flex-grow: 30;
  margin-right: 10px;
`
const Last = styled.div`
  flex-basis: 350px;
  flex-shrink: 2;
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
  teilkulturenWerte,
  teilkulturenLoading,
  index,
  refetch,
}) => {
  const client = useApolloClient()
  const store = useContext(storeContext)
  const { enqueNotification } = store

  const [errors, setErrors] = useState({})

  useEffect(() => {
    setErrors({})
  }, [row.id])

  const saveToDb = useCallback(
    async event => {
      const field = event.target.name
      let value = event.target.value || null
      if (event.target.value === false) value = false
      if (event.target.value === 0) value = 0
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
    [row.id],
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
  }, [row.id])

  if (!row) return null

  const {
    tz_teilkultur_id,
    tz_anzahl_mutterpflanzen,
    tz_andere_menge,
    tz_auspflanzbereit_beschreibung,
    tz_bemerkungen,
  } = kulturZaehlungFelder

  return (
    <ErrorBoundary>
      <>
        {!!index && <TopLine />}
        <Container>
          {!!tz_teilkultur_id && (
            <Teilkultur>
              <Select
                key={`${row.id}teilkultur_id`}
                name="teilkultur_id"
                value={row.teilkultur_id}
                field="teilkultur_id"
                label="Teilkultur"
                options={teilkulturenWerte}
                loading={teilkulturenLoading}
                saveToDb={saveToDb}
                error={errors.teilkultur_id}
              />
            </Teilkultur>
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
          {!!tz_andere_menge && (
            <Other>
              <TextField
                key={`${row.id}andere_menge`}
                name="andere_menge"
                label={`Andere Menge (z.B. "3 Zwiebeln")`}
                value={row.andere_menge}
                saveToDb={saveToDb}
                error={errors.andere_menge}
                type="text"
              />
            </Other>
          )}
          {!!tz_auspflanzbereit_beschreibung && (
            <Auspflanzbereit>
              <TextField
                key={`${row.id}auspflanzbereit_beschreibung`}
                name="auspflanzbereit_beschreibung"
                label="Beschreibung auspflanzbereit"
                value={row.auspflanzbereit_beschreibung}
                saveToDb={saveToDb}
                error={errors.auspflanzbereit_beschreibung}
                type="text"
              />
            </Auspflanzbereit>
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
