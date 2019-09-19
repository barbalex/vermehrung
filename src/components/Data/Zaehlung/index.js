import React, {
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react'
import { observer } from 'mobx-react-lite'
import gql from 'graphql-tag'
import { useApolloClient, useQuery } from '@apollo/react-hooks'
import styled from 'styled-components'
import get from 'lodash/get'
import last from 'lodash/last'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'
import ErrorBoundary from 'react-error-boundary'

import storeContext from '../../../storeContext'
import Select from '../../shared/Select'
import TextField from '../../shared/TextField'
import Checkbox2States from '../../shared/Checkbox2States'
import DateFieldWithPicker from '../../shared/DateFieldWithPicker'
import FormTitle from '../../shared/FormTitle'
import FilterTitle from '../../shared/FilterTitle'
import {
  zaehlung as zaehlungFragment,
  kulturFelder as kulturFelderFragment,
} from '../../../utils/fragments'
import types from '../../../store/Filter/simpleTypes'
import queryFromTable from '../../../utils/queryFromTable'
import Teilzaehlungen from './Teilzaehlungen'
import ZaehlungFields from './ZaehlungFields'

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${props => (props.showfilter ? '#fff3e0' : 'unset')};
`
const FieldsContainer = styled.div`
  padding: 10px;
  overflow: auto !important;
  height: 100%;
`
const StyledDialog = styled(Dialog)`
  overflow-y: hidden;
  .MuiDialog-paper {
    overflow-y: hidden;
  }
`

const query = gql`
  query ZaehlungQuery(
    $id: bigint!
    $isFiltered: Boolean!
    $filter: zaehlung_bool_exp!
  ) {
    zaehlung(where: { id: { _eq: $id } }) {
      ...ZaehlungFields
      kultur {
        id
        art_id
        kultur_felders {
          ...KulturFelderFields
        }
      }
    }
    rowsUnfiltered: zaehlung @include(if: $isFiltered) {
      id
    }
    rowsFiltered: zaehlung(where: $filter) @include(if: $isFiltered) {
      id
    }
  }
  ${zaehlungFragment}
  ${kulturFelderFragment}
`
const kulturQuery = gql`
  query kulturQuery($filter: kultur_bool_exp!) {
    kultur(
      where: $filter
      order_by: [
        { garten: { person: { name: asc_nulls_first } } }
        { garten: { person: { ort: asc_nulls_first } } }
      ]
    ) {
      id
      art_id
      garten {
        id
        name
        person {
          id
          name
          ort
        }
      }
    }
  }
`

const Zaehlung = ({ filter: showFilter }) => {
  const client = useApolloClient()
  const store = useContext(storeContext)
  const { filter } = store
  const { isFiltered: runIsFiltered } = filter
  const { activeNodeArray, refetch } = store.tree
  const id = showFilter
    ? 99999999999999
    : last(activeNodeArray.filter(e => !isNaN(e)))

  const isFiltered = runIsFiltered()
  const zaehlungFilter = queryFromTable({ store, table: 'zaehlung' })
  const { data, error, loading, refetch: refetchQuery } = useQuery(query, {
    variables: { id, isFiltered, filter: zaehlungFilter },
  })

  const [zaehlungFieldsDialogOpen, setZaehlungFieldsDialogOpen] = useState(
    false,
  )
  const closeZaehlungFieldsDialog = useCallback(
    () => setZaehlungFieldsDialogOpen(false),
    [],
  )
  const onClickChooseFields = useCallback(
    () => setZaehlungFieldsDialogOpen(true),
    [],
  )

  const [errors, setErrors] = useState({})

  let row
  const totalNr = get(data, 'rowsUnfiltered', []).length
  const filteredNr = get(data, 'rowsFiltered', []).length
  if (showFilter) {
    row = filter.zaehlung
  } else {
    row = get(data, 'zaehlung', [{}])[0]
  }

  const artId = get(row, 'kultur.art_id')
  const kulturFilter = artId
    ? { art_id: { _eq: artId } }
    : { id: { _is_null: false } }
  const {
    data: kulturData,
    error: kulturError,
    loading: kulturLoading,
  } = useQuery(kulturQuery, {
    variables: {
      filter: kulturFilter,
    },
  })

  useEffect(() => {
    setErrors({})
  }, [row.id])

  const kulturWerte = useMemo(
    () =>
      get(kulturData, 'kultur', []).map(el => {
        const personName = get(el, 'garten.person.name') || '(kein Name)'
        const personOrt = get(el, 'garten.person.ort') || null
        const personLabel = `${personName}${personOrt ? ` (${personOrt})` : ''}`
        const label = el.garten.name || personLabel

        return {
          value: el.id,
          label,
        }
      }),
    [kulturLoading],
  )

  const saveToDb = useCallback(
    async event => {
      const field = event.target.name
      let value = event.target.value || null
      if (event.target.value === false) value = false
      if (event.target.value === 0) value = 0
      const type = types.zaehlung[field]
      if (showFilter) {
        let valueToSet = value
        if (value === '') {
          valueToSet = null
        } else if (['number'].includes(type)) {
          valueToSet = +value
        }
        filter.setValue({ table: 'zaehlung', key: field, value: valueToSet })
      } else {
        try {
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
              mutation update_zaehlung(
                $id: bigint!
              ) {
                update_zaehlung(
                  where: { id: { _eq: $id } }
                  _set: {
                  ${field}: ${valueToSet}
                  }
                ) {
                  affected_rows
                  returning {
                    ...ZaehlungFields
                  }
                }
              }
              ${zaehlungFragment}
            `,
            variables: {
              id: row.id,
            },
          })
        } catch (error) {
          return setErrors({ [field]: error.message })
        }
        setErrors({})
        refetch()
      }
    },
    [row.id],
  )

  if (loading) {
    return (
      <Container>
        <FormTitle title="Zaehlung" />
        <FieldsContainer>Lade...</FieldsContainer>
      </Container>
    )
  }

  const errorToShow = error || kulturError
  if (errorToShow) {
    return (
      <Container>
        <FormTitle title="Zaehlung" />
        <FieldsContainer>{`Fehler beim Laden der Daten: ${errorToShow.message}`}</FieldsContainer>
      </Container>
    )
  }

  if (!row || (!showFilter && filter.show)) return null

  const kulturFelder = showFilter ? {} : row.kultur.kultur_felders[0]
  const z_bemerkungen = showFilter
    ? true
    : get(row, 'kultur.kultur_felders[0].z_bemerkungen')

  return (
    <ErrorBoundary>
      <>
        <Container showfilter={showFilter}>
          {showFilter ? (
            <FilterTitle
              title="Zählung"
              table="zaehlung"
              totalNr={totalNr}
              filteredNr={filteredNr}
            />
          ) : (
            <FormTitle
              title="Zählung"
              table="zaehlung"
              rowsLength={totalNr}
              rowsFilteredLength={filteredNr}
              filter={showFilter}
            />
          )}
          <FieldsContainer>
            <Select
              key={`${row.id}${row.kultur_id}kultur_id`}
              name="kultur_id"
              value={row.kultur_id}
              field="kultur_id"
              label="Kultur"
              options={kulturWerte}
              loading={kulturLoading}
              saveToDb={saveToDb}
              error={errors.kultur_id}
            />
            <DateFieldWithPicker
              key={`${row.id}datum`}
              name="datum"
              label="Datum"
              value={row.datum}
              saveToDb={saveToDb}
              error={errors.datum}
            />
            <Checkbox2States
              key={`${row.id}geplant`}
              label="geplant"
              name="geplant"
              value={row.geplant}
              saveToDb={saveToDb}
              error={errors.geplant}
            />
            {!!z_bemerkungen && (
              <TextField
                key={`${row.id}bemerkungen`}
                name="bemerkungen"
                label="Bemerkungen"
                value={row.bemerkungen}
                saveToDb={saveToDb}
                error={errors.bemerkungen}
                multiLine
              />
            )}
            {!showFilter && (
              <>
                <Teilzaehlungen row={row} kulturFelder={kulturFelder} />

                <Button variant="outlined" onClick={onClickChooseFields}>
                  Felder wählen
                </Button>
              </>
            )}
          </FieldsContainer>
        </Container>
        <StyledDialog
          open={zaehlungFieldsDialogOpen}
          onClose={closeZaehlungFieldsDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {'Felder für Zählungen dieser Kultur wählen:'}
          </DialogTitle>
          <ZaehlungFields kulturFelder={kulturFelder} refetch={refetchQuery} />
          <DialogActions>
            <Button onClick={closeZaehlungFieldsDialog}>schliessen</Button>
          </DialogActions>
        </StyledDialog>
      </>
    </ErrorBoundary>
  )
}

export default observer(Zaehlung)
