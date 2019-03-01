import React, { useContext, useState, useEffect, useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import gql from 'graphql-tag'
import { useApolloClient, useQuery } from 'react-apollo-hooks'
import styled from 'styled-components'
import get from 'lodash/get'
import sortBy from 'lodash/sortBy'
import last from 'lodash/last'
import memoizeOne from 'memoize-one'

import storeContext from '../../storeContext'
import Select from '../shared/Select'
import TextField from '../shared/TextField'
import DateFieldWithPicker from '../shared/DateFieldWithPicker'
import RadioButton from '../shared/RadioButton'
import FormTitle from '../shared/FormTitle'
import ErrorBoundary from '../ErrorBoundary'
import filterNodes from '../../utils/filterNodes'
import {
  lieferung as lieferungFragment,
  art as artFragment,
} from '../../utils/fragments'

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${props => (props.showfilter ? '#ffd3a7' : 'unset')};
`
const FieldsContainer = styled.div`
  padding: 10px;
  overflow: auto !important;
  height: 100%;
`

const query = gql`
  query LieferungQuery($id: Int!, $isFiltered: Boolean!) {
    lieferung(where: { id: { _eq: $id } }) {
      ...LieferungFields
    }
    rows: lieferung @include(if: $isFiltered) {
      ...LieferungFields
    }
    person {
      id
      name
      ort
    }
    lieferung_typ_werte {
      id
      wert
      sort
    }
    lieferung_status_werte {
      id
      wert
      sort
    }
    lieferung_zwischenlager_werte {
      id
      wert
      sort
    }
    zaehleinheit_werte {
      id
      wert
      sort
    }
    masseinheit_werte {
      id
      wert
      sort
    }
    art {
      ...ArtFields
    }
    sammlung {
      id
      art_id
      datum
      herkunftByherkunftId {
        id
        nr
      }
      personBypersonId {
        id
        name
        ort
      }
    }
    kultur {
      id
      art_id
      gartenBygartenId {
        id
        personBypersonId {
          id
          name
          ort
        }
      }
    }
  }
  ${lieferungFragment}
  ${artFragment}
`

const Lieferung = () => {
  const client = useApolloClient()
  const store = useContext(storeContext)
  const { filter } = store
  const { isFiltered, show: showFilter } = filter
  const { activeNodeArray, refetch } = store.tree
  const id = last(activeNodeArray.filter(e => !isNaN(e)))
  const { data, error, loading } = useQuery(query, {
    suspend: false,
    variables: { id, isFiltered: isFiltered() },
  })

  const [errors, setErrors] = useState({})

  const row = showFilter ? filter.lieferung : get(data, 'lieferung', [{}])[0]
  const rows = get(data, 'rows', [])
  const rowsFiltered = memoizeOne(() =>
    filterNodes({ rows, filter, table: 'lieferung' }),
  )()

  useEffect(() => setErrors({}), [row])

  let kulturWerte = get(data, 'kultur', []).filter(s => {
    // only show kulturen of same art
    if (row.art_id && s.art_id) {
      return s.art_id === row.art_id
    }
    return true
  })
  kulturWerte = sortBy(kulturWerte, s => [
    get(s, 'gartenBygartenId.personBypersonId.name'),
    get(s, 'gartenBygartenId.personBypersonId.ort'),
  ])
  kulturWerte = kulturWerte.map(el => {
    const name =
      get(el, 'gartenBygartenId.personBypersonId.name') || '(kein Name)'
    const ort = get(el, 'gartenBygartenId.personBypersonId.ort') || null
    const label = `${name}${ort ? ` (${ort})` : ''}`

    return {
      value: el.id,
      label,
    }
  })

  let sammlungWerte = get(data, 'sammlung', []).filter(s => {
    // only show sammlungen of same art
    if (row.art_id && s.art_id) {
      return s.art_id === row.art_id
    }
    return true
  })
  sammlungWerte = sortBy(sammlungWerte, s => [
    'datum',
    get(s, 'herkunftByherkunftId.nr'),
    get(s, 'personBypersonId.name'),
  ])
  sammlungWerte = sammlungWerte.map(el => {
    const datum = el.datum || '(kein Datum)'
    const nr = get(el, 'herkunftByherkunftId.nr') || '(keine Nr)'
    const person = get(el, 'personBypersonId.name') || '(kein Name)'
    const label = `${datum}: Herkunft ${nr}; ${person}`

    return {
      value: el.id,
      label,
    }
  })

  let personWerte = get(data, 'person', [])
  personWerte = personWerte.map(el => ({
    value: el.id,
    label: `${el.name || '(kein Name)'} (${el.ort || 'kein Ort'})`,
  }))
  personWerte = sortBy(personWerte, 'label')

  let artWerte = get(data, 'art', [])
  artWerte = artWerte.map(el => ({
    value: el.id,
    label: get(el, 'art_ae_art.name') || '(kein Artname)',
  }))
  artWerte = sortBy(artWerte, 'label')

  let lieferungTypWerte = get(data, 'lieferung_typ_werte', [])
  lieferungTypWerte = sortBy(lieferungTypWerte, ['sort', 'wert'])
  lieferungTypWerte = lieferungTypWerte.map(el => ({
    value: el.id,
    label: el.wert || '(kein Wert)',
  }))

  let lieferungStatusWerte = get(data, 'lieferung_status_werte', [])
  lieferungStatusWerte = sortBy(lieferungStatusWerte, ['sort', 'wert'])
  lieferungStatusWerte = lieferungStatusWerte.map(el => ({
    value: el.id,
    label: el.wert || '(kein Wert)',
  }))

  let lieferungZwischenlagerWerte = get(
    data,
    'lieferung_zwischenlager_werte',
    [],
  )
  lieferungZwischenlagerWerte = sortBy(lieferungZwischenlagerWerte, [
    'sort',
    'wert',
  ])
  lieferungZwischenlagerWerte = lieferungZwischenlagerWerte.map(el => ({
    value: el.id,
    label: el.wert || '(kein Wert)',
  }))

  let zaehleinheitWerte = get(data, 'zaehleinheit_werte', [])
  zaehleinheitWerte = sortBy(zaehleinheitWerte, ['sort', 'wert'])
  zaehleinheitWerte = zaehleinheitWerte.map(el => ({
    value: el.id,
    label: el.wert || '(kein Wert)',
  }))

  let masseinheitWerte = get(data, 'masseinheit_werte', [])
  masseinheitWerte = sortBy(masseinheitWerte, ['sort', 'wert'])
  masseinheitWerte = masseinheitWerte.map(el => ({
    value: el.id,
    label: el.wert || '(kein Wert)',
  }))

  const saveToDb = useCallback(
    async event => {
      const field = event.target.name
      const value = event.target.value || null
      if (filter.show) {
        filter.setValue({ table: 'lieferung', key: field, value })
      } else {
        try {
          await client.mutate({
            mutation: gql`
              mutation update_lieferung(
                $id: Int!
                $art_id: Int
                $person_id: Int
                $typ: Int
                $zaehleinheit: Int
                $menge: Int
                $masseinheit: Int
                $von_datum: date
                $von_sammlung_id: Int
                $von_kultur_id: Int
                $zwischenlager: Int
                $nach_datum: date
                $nach_kultur_id: Int
                $nach_ausgepflanzt: Boolean
                $status: Int
                $bemerkungen: String
              ) {
                update_lieferung(
                  where: { id: { _eq: $id } }
                  _set: {
                    art_id: $art_id
                    person_id: $person_id
                    typ: $typ
                    zaehleinheit: $zaehleinheit
                    menge: $menge
                    masseinheit: $masseinheit
                    von_datum: $von_datum
                    von_sammlung_id: $von_sammlung_id
                    von_kultur_id: $von_kultur_id
                    zwischenlager: $zwischenlager
                    nach_datum: $nach_datum
                    nach_kultur_id: $nach_kultur_id
                    nach_ausgepflanzt: $nach_ausgepflanzt
                    status: $status
                    bemerkungen: $bemerkungen
                  }
                ) {
                  affected_rows
                  returning {
                    id
                    art_id
                    person_id
                    typ
                    zaehleinheit
                    menge
                    masseinheit
                    von_datum
                    von_sammlung_id
                    von_kultur_id
                    zwischenlager
                    nach_datum
                    nach_kultur_id
                    nach_ausgepflanzt
                    status
                    bemerkungen
                  }
                }
              }
            `,
            variables: {
              id: row.id,
              art_id: field === 'art_id' ? value : row.art_id,
              person_id: field === 'person_id' ? value : row.person_id,
              typ: field === 'typ' ? value : row.typ,
              zaehleinheit: field === 'zaehleinheit' ? value : row.zaehleinheit,
              menge: field === 'menge' ? value : row.menge,
              masseinheit: field === 'masseinheit' ? value : row.masseinheit,
              von_datum: field === 'von_datum' ? value : row.von_datum,
              von_sammlung_id:
                field === 'von_sammlung_id' ? value : row.von_sammlung_id,
              von_kultur_id:
                field === 'von_kultur_id' ? value : row.von_kultur_id,
              zwischenlager:
                field === 'zwischenlager' ? value : row.zwischenlager,
              nach_datum: field === 'nach_datum' ? value : row.nach_datum,
              nach_kultur_id:
                field === 'nach_kultur_id' ? value : row.nach_kultur_id,
              nach_ausgepflanzt:
                field === 'nach_ausgepflanzt' ? value : row.nach_ausgepflanzt,
              status: field === 'status' ? value : row.status,
              bemerkungen: field === 'bemerkungen' ? value : row.bemerkungen,
            },
          })
        } catch (error) {
          return setErrors({ [field]: error.message })
        }
        setErrors({})
        refetch()
      }
    },
    [row],
  )

  if (loading) {
    return (
      <Container>
        <FormTitle title="Lieferung" />
        <FieldsContainer>Lade...</FieldsContainer>
      </Container>
    )
  }

  if (error) {
    return (
      <Container>
        <FormTitle title="Lieferung" />
        <FieldsContainer>{`Fehler beim Laden der Daten: ${
          error.message
        }`}</FieldsContainer>
      </Container>
    )
  }

  return (
    <ErrorBoundary>
      <Container showfilter={showFilter}>
        <FormTitle
          title="Lieferung"
          table="lieferung"
          rowsLength={rows.length}
          rowsFilteredLength={rowsFiltered.length}
        />
        <FieldsContainer>
          <Select
            key={`${row.id}${row.art_id}art_id`}
            name="art_id"
            value={row.art_id}
            field="art_id"
            label="Art"
            options={artWerte}
            saveToDb={saveToDb}
            error={errors.art_id}
          />
          <Select
            key={`${row.id}${row.person_id}person_id`}
            name="person_id"
            value={row.person_id}
            field="person_id"
            label="Person"
            options={personWerte}
            saveToDb={saveToDb}
            error={errors.person_id}
          />
          <Select
            key={`${row.id}${row.typ}typ`}
            name="typ"
            value={row.typ}
            field="typ"
            label="Typ"
            options={lieferungTypWerte}
            saveToDb={saveToDb}
            error={errors.typ}
          />
          <Select
            key={`${row.id}${row.status}status`}
            name="status"
            value={row.status}
            field="status"
            label="Status"
            options={lieferungStatusWerte}
            saveToDb={saveToDb}
            error={errors.status}
          />
          <Select
            key={`${row.id}${row.zaehleinheit}zaehleinheit`}
            name="zaehleinheit"
            value={row.zaehleinheit}
            field="zaehleinheit"
            label="Zähleinheit"
            options={zaehleinheitWerte}
            saveToDb={saveToDb}
            error={errors.zaehleinheit}
          />
          <TextField
            key={`${row.id}menge`}
            name="menge"
            label="Menge"
            value={row.menge}
            saveToDb={saveToDb}
            error={errors.menge}
            type="number"
          />
          <Select
            key={`${row.id}${row.masseinheit}masseinheit`}
            name="masseinheit"
            value={row.masseinheit}
            field="masseinheit"
            label="Masseinheit"
            options={masseinheitWerte}
            saveToDb={saveToDb}
            error={errors.masseinheit}
          />
          <DateFieldWithPicker
            key={`${row.id}von_datum`}
            name="von_datum"
            label="von Datum"
            value={row.von_datum}
            saveToDb={saveToDb}
            error={errors.von_datum}
          />
          <Select
            key={`${row.id}${row.von_sammlung_id}von_sammlung_id`}
            name="von_sammlung_id"
            value={row.von_sammlung_id}
            field="von_sammlung_id"
            label="von Sammlung"
            options={sammlungWerte}
            saveToDb={saveToDb}
            error={errors.von_sammlung_id}
          />
          <Select
            key={`${row.id}${row.von_kultur_id}von_kultur_id`}
            name="von_kultur_id"
            value={row.von_kultur_id}
            field="von_kultur_id"
            label="von Kultur"
            options={kulturWerte}
            saveToDb={saveToDb}
            error={errors.von_kultur_id}
          />
          <Select
            key={`${row.id}${row.zwischenlager}zwischenlager`}
            name="zwischenlager"
            value={row.zwischenlager}
            field="zwischenlager"
            label="Zwischenlager"
            options={lieferungZwischenlagerWerte}
            saveToDb={saveToDb}
            error={errors.zwischenlager}
          />
          <DateFieldWithPicker
            key={`${row.id}nach_datum`}
            name="nach_datum"
            label="nach Datum"
            value={row.nach_datum}
            saveToDb={saveToDb}
            error={errors.nach_datum}
          />
          <Select
            key={`${row.id}${row.nach_kultur_id}nach_kultur_id`}
            name="nach_kultur_id"
            value={row.nach_kultur_id}
            field="nach_kultur_id"
            label="nach Kultur"
            options={kulturWerte}
            saveToDb={saveToDb}
            error={errors.nach_kultur_id}
          />
          <RadioButton
            key={`${row.id}nach_ausgepflanzt`}
            label="Ausgepflanzt"
            name="nach_ausgepflanzt"
            value={row.nach_ausgepflanzt}
            saveToDb={saveToDb}
            error={errors.nach_ausgepflanzt}
          />
          <TextField
            key={`${row.id}bemerkungen`}
            name="bemerkungen"
            label="Bemerkungen"
            value={row.bemerkungen}
            saveToDb={saveToDb}
            error={errors.bemerkungen}
            multiLine
          />
        </FieldsContainer>
      </Container>
    </ErrorBoundary>
  )
}

export default observer(Lieferung)
