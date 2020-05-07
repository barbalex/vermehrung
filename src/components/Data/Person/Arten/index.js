import React, { useCallback, useState, useMemo, useEffect } from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react-lite'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'
import IconButton from '@material-ui/core/IconButton'
import { useApolloClient, useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import get from 'lodash/get'

import Art from './Art'
import query from './query'
import Select from '../../../shared/Select'
import ifIsNumericAsNumber from '../../../../utils/ifIsNumericAsNumber'
import ErrorBoundary from '../../../shared/ErrorBoundary'

const TitleRow = styled.div`
  background-color: rgba(237, 230, 244, 1);
  flex-shrink: 0;
  display: flex;
  height: 48px;
  justify-content: space-between;
  margin-left: -10px;
  margin-right: -10px;
  padding: 0 10px;
  cursor: pointer;
  ${(props) => props['data-open'] && 'position: sticky;'}
  top: -10px;
  z-index: 1;
  ${(props) => !props['data-open'] && 'margin-bottom: 10px;'}
  &:first-of-type {
    margin-top: -10px;
  }
`
const Title = styled.div`
  font-weight: bold;
  margin-top: auto;
  margin-bottom: auto;
`
const Content = styled.div`
  padding-bottom: 10px;
`
const AvArten = styled.div`
  padding-bottom: 8px;
`

const PersonArten = ({ personId }) => {
  const client = useApolloClient()
  const [open, setOpen] = useState(false)

  const [errors, setErrors] = useState({})
  useEffect(() => setErrors({}), [personId])

  const onClickToggle = useCallback(
    (e) => {
      e.stopPropagation()
      setOpen(!open)
    },
    [open],
  )

  const { data, error, loading } = useQuery(query, {
    variables: { personId },
  })
  const avArten = get(data, 'av_art', [])
  const artenChoosen = get(data, 'art_choosen', [])

  const artWerte = useMemo(
    () =>
      get(data, 'art_to_choose', []).map((el) => ({
        value: el.id,
        label: get(el, 'art_ae_art.name') || '(kein Artname)',
      })),
    [data],
  )

  const saveToDb = useCallback(
    async (event) => {
      const field = event.target.name
      const value = ifIsNumericAsNumber(event.target.value)
      try {
        await client.mutate({
          mutation: gql`
            mutation insert_av_art_for_person($personId: uuid!, $artId: uuid!) {
              insert_av_art(
                objects: [{ art_id: $artId, person_id: $personId }]
              ) {
                affected_rows
                returning {
                  art_id
                  person_id
                }
              }
            }
          `,
          variables: {
            personId,
            artId: value,
          },
          refetchQueries: ['ArtenForPersonQuery'],
        })
      } catch (error) {
        console.log({ error })
        return setErrors({ [field]: error.message })
      }
      setErrors({})
    },
    [client, personId],
  )

  return (
    <ErrorBoundary>
      <TitleRow
        onClick={onClickToggle}
        title={open ? 'schliessen' : 'öffnen'}
        data-open={open}
      >
        <Title>{`Arten (${loading ? '...' : artenChoosen.length})`}</Title>
        <div>
          <IconButton
            aria-label={open ? 'schliessen' : 'öffnen'}
            title={open ? 'schliessen' : 'öffnen'}
            onClick={onClickToggle}
          >
            {open ? <FaChevronUp /> : <FaChevronDown />}
          </IconButton>
        </div>
      </TitleRow>
      {open && (
        <Content>
          {loading ? (
            <AvArten>Lade Daten...</AvArten>
          ) : error ? (
            <AvArten>{`Fehler: ${error.message}`}</AvArten>
          ) : (
            <AvArten>
              {avArten.map((avArt) => (
                <Art key={`${avArt.person_id}/${avArt.art_id}`} avArt={avArt} />
              ))}
            </AvArten>
          )}
          <Select
            name="art_id"
            value={''}
            field="art_id"
            label="Art hinzufügen"
            options={artWerte}
            loading={loading}
            saveToDb={saveToDb}
            isClearable={false}
            error={errors.art_id}
          />
        </Content>
      )}
    </ErrorBoundary>
  )
}

export default observer(PersonArten)
