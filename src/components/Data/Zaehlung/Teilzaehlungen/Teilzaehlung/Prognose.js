import React, { useState, useEffect, useCallback, useContext } from 'react'
import { observer } from 'mobx-react-lite'
import gql from 'graphql-tag'
import { useApolloClient } from '@apollo/react-hooks'
import styled from 'styled-components'
import IconButton from '@material-ui/core/IconButton'
import { FaRegTrashAlt, FaChartLine } from 'react-icons/fa'
import ErrorBoundary from 'react-error-boundary'
import get from 'lodash/get'

import TextField from '../../../../shared/TextField'
import Select from '../../../../shared/SelectCreatable'
import { teilzaehlung as teilzaehlungFragment } from '../../../../../utils/fragments'
import ifIsNumericAsNumber from '../../../../../utils/ifIsNumericAsNumber'
import types from '../../../../../store/Filter/simpleTypes'
import storeContext from '../../../../../storeContext'

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

const Prognose = ({
  kulturId,
  teilzaehlung: row,
  zaehlungResult,
  refetchTz,
}) => {
  const client = useApolloClient()
  const store = useContext(storeContext)
  const { enqueNotification } = store
  const { refetch: refetchTree } = store.tree

  const zaehlung = get(zaehlungResult.data, 'zaehlung', [{}])[0]
  const {
    tk,
    tz_teilkultur_id,
    tz_anzahl_mutterpflanzen,
    tz_andere_menge,
    tz_auspflanzbereit_beschreibung,
    tz_bemerkungen,
  } = get(zaehlung, 'kultur.kultur_felder') || {}

  const [errors, setErrors] = useState({})

  useEffect(() => {
    setErrors({})
  }, [row.id])

  const saveToDb = useCallback(
    async event => {
      const field = event.target.name
      let value = ifIsNumericAsNumber(event.target.value)
      if (event.target.value === undefined) value = null
      if (event.target.value === '') value = null
      const type = types.lieferung[field]
      const previousValue = row[field]
      // only update if value has changed
      if (value === previousValue) return
      try {
        let valueToSet
        if (value === null) {
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
      // update tree if numbers were changed
      if (
        [
          'anzahl_pflanzen',
          'anzahl_auspflanzbereit',
          'anzahl_mutterpflanzen',
          'prognose',
          'ziel',
        ].includes(field)
      )
        refetchTree()
      setErrors({})
    },
    [client, refetchTree, row],
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
    refetchTz()
  }, [client, enqueNotification, refetchTz, row.id])
  const onClickPrognosis = useCallback(() => {
    console.log('TODO:')
  }, [])

  return (
    <ErrorBoundary>
      <>
        <Container>
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
          {tz_anzahl_mutterpflanzen && (
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
          <div>
            <IconButton
              aria-label="Prognose löschen"
              title="Prognose löschen"
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

export default observer(Prognose)
