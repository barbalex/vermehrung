import React, { useState, useEffect, useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import gql from 'graphql-tag'
import { useApolloClient } from 'react-apollo-hooks'
import styled from 'styled-components'

import TextField from '../../../shared/TextField'
import ErrorBoundary from '../../../ErrorBoundary'
import { teilzaehlung as teilzaehlungFragment } from '../../../../utils/fragments'
import types from '../../../../store/Filter/simpleTypes'

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`
const Ort = styled.div`
  flex-basis: 100px;
  flex-shrink: 1;
  flex-grow: 1;
  margin-right: 8px;
`
const Anzahl = styled.div`
  flex-basis: 200px;
  flex-shrink: 1;
  flex-grow: 1;
  margin-right: 8px;
`
const Other = styled.div`
  flex-basis: 250px;
  flex-shrink: 5;
  flex-grow: 10;
  margin-right: 8px;
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

const Teilzaehlung = ({ teilzaehlung: row, index }) => {
  const client = useApolloClient()

  const [errors, setErrors] = useState({})

  useEffect(() => setErrors({}), [row])

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

  if (!row) return null

  return (
    <ErrorBoundary>
      <>
        {index && <TopLine />}
        <Container>
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
              key={`${row.id}anzahl_mutter_pflanzen`}
              name="anzahl_mutter_pflanzen"
              label="Anzahl Mutter-Pflanzen"
              value={row.anzahl_mutter_pflanzen}
              saveToDb={saveToDb}
              error={errors.anzahl_mutter_pflanzen}
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
        </Container>
      </>
    </ErrorBoundary>
  )
}

export default observer(Teilzaehlung)
