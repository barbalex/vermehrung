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
import ErrorBoundary from 'react-error-boundary'
import IconButton from '@material-ui/core/IconButton'
import { IoMdInformationCircleOutline } from 'react-icons/io'

import storeContext from '../../../storeContext'
import firebaseContext from '../../../firebaseContext'
import Select from '../../shared/Select'
import TextField from '../../shared/TextField'
import Date from '../../shared/Date'
import Checkbox2States from '../../shared/Checkbox2States'
import FormTitle from '../../shared/FormTitle'
import FilterTitle from '../../shared/FilterTitle'
import queryFromTable from '../../../utils/queryFromTable'
import exists from '../../../utils/exists'
import ifIsNumericAsNumber from '../../../utils/ifIsNumericAsNumber'
import {
  art as artFragment,
  lieferung as lieferungFragment,
  personOption as personOptionFragment,
} from '../../../utils/fragments'
import types from '../../../store/Filter/simpleTypes'
import Files from '../Files'
import updateLieferung from './updateLieferung'
import updateLieferungArtId from './updateLieferungArtId'
import Settings from './Settings'
import AddButton from './AddButton'
import DeleteButton from './DeleteButton'

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${props => (props.showfilter ? '#fff3e0' : 'unset')};
`
const TitleContainer = styled.div`
  background-color: rgba(74, 20, 140, 0.1);
  flex-shrink: 0;
  display: flex;
  @media print {
    display: none !important;
  }
  height: 48px;
  justify-content: space-between;
  padding 0 10px;
`
const Title = styled.div`
  font-weight: bold;
  margin-top: auto;
  margin-bottom: auto;
`
const TitleSymbols = styled.div`
  display: flex;
  margin-top: auto;
  margin-bottom: auto;
`
const TitleFilterNumbers = styled.div`
  cursor: default;
  user-select: none;
  padding: 0 5px;
  margin-top: auto;
  margin-bottom: auto;
  min-width: 48px;
  text-align: center;
`
const FieldsContainer = styled.div`
  padding: 10px;
  overflow: auto !important;
  height: 100%;
`
const TitleRow = styled.div`
  background-color: rgba(248, 243, 254, 1);
  flex-shrink: 0;
  display: flex;
  height: 40px;
  justify-content: space-between;
  margin-left: -10px;
  margin-right: -10px;
  margin-bottom: 10px;
  padding: 0 10px;
  position: sticky;
  top: -10px;
  z-index: 1;
  &:first-of-type {
    margin-top: -10px;
  }
`
const FieldRow = styled.div`
  display: flex;
  justify-content: space-between;
  > div:not(:last-of-type) {
    padding-right: 8px;
  }
  > div > button {
    margin-top: 8px;
  }
`
const Herkunft = styled.div`
  height: 54px;
  user-select: none;
`
const HerkunftLabel = styled.div`
  color: rgb(0, 0, 0, 0.54);
  font-size: 12px;
  padding-bottom: 2px;
`

const lieferungQuery = gql`
  query LieferungQueryForLieferungLieferung(
    $id: bigint!
    $isFiltered: Boolean!
    $filter: lieferung_bool_exp!
  ) {
    lieferung(where: { id: { _eq: $id } }) {
      ...LieferungFields
      sammlung {
        id
        herkunft {
          id
          nr
          lokalname
          gemeinde
        }
      }
      kulturByVonKulturId {
        id
        art_id
        herkunft_id
        herkunft {
          id
          nr
          lokalname
          gemeinde
        }
      }
      kulturByNachKulturId {
        id
        art_id
        herkunft_id
        herkunft {
          id
          nr
          lokalname
          gemeinde
        }
      }
    }
    rowsUnfiltered: lieferung @include(if: $isFiltered) {
      id
    }
    rowsFiltered: lieferung(where: $filter) @include(if: $isFiltered) {
      id
    }
  }
  ${lieferungFragment}
`
const sammlungQuery = gql`
  query sammlungQueryForLieferung($filter: sammlung_bool_exp!) {
    sammlung(
      where: $filter
      order_by: [
        { datum: asc_nulls_first }
        { herkunft: { nr: asc_nulls_first } }
        { person: { name: asc_nulls_first } }
      ]
    ) {
      id
      art_id
      datum
      herkunft_id
      herkunft {
        id
        nr
        lokalname
        gemeinde
      }
      person {
        id
        name
        ort
      }
    }
  }
`
const kulturQuery = gql`
  query kulturQueryForLieferung($filter: kultur_bool_exp!) {
    kultur(
      where: $filter
      order_by: [
        { garten: { person: { name: asc_nulls_first } } }
        { garten: { person: { ort: asc_nulls_first } } }
      ]
    ) {
      id
      art_id
      herkunft_id
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
const artQuery = gql`
  query artQueryForLieferung {
    art(order_by: { art_ae_art: { name: asc } }) {
      ...ArtFields
    }
  }
  ${artFragment}
`
const personQuery = gql`
  query personQueryForLieferung {
    person(order_by: [{ name: asc_nulls_first }, { ort: asc_nulls_first }]) {
      id
      name
      ort
    }
  }
`
const personOptionQuery = gql`
  query PersonOptionQueryForLieferungLieferung($account_id: string) {
    person_option(where: { person: { account_id: { _eq: $account_id } } }) {
      ...PersonOptionFields
    }
  }
  ${personOptionFragment}
`

const Lieferung = ({ showFilter, sammelLieferung = {} }) => {
  const existsSammelLieferung = !!get(sammelLieferung, 'id')
  const client = useApolloClient()
  const store = useContext(storeContext)
  const firebase = useContext(firebaseContext)

  const { filter } = store
  const { isFiltered: runIsFiltered } = filter
  const { activeNodeArray } = store.tree

  const id = showFilter
    ? 99999999999999
    : last(activeNodeArray.filter(e => !isNaN(e)))
  const isFiltered = runIsFiltered()
  const lieferungFilter = queryFromTable({ store, table: 'lieferung' })
  const { data, error, loading } = useQuery(lieferungQuery, {
    variables: { id, isFiltered, filter: lieferungFilter },
  })

  const { data: artData, error: artError, loading: artLoading } = useQuery(
    artQuery,
  )

  const {
    data: personData,
    error: personError,
    loading: personLoading,
  } = useQuery(personQuery)

  const [errors, setErrors] = useState({})

  let row
  const totalNr = get(data, 'rowsUnfiltered', []).length
  const filteredNr = get(data, 'rowsFiltered', []).length
  if (showFilter) {
    row = filter.lieferung
  } else {
    row = get(data, 'lieferung[0]') || {}
  }

  const personOptionResult = useQuery(personOptionQuery, {
    variables: { accountId: firebase.auth().User.uid },
  })
  const { li_show_sl_felder, person_id } =
    get(personOptionResult.data, 'person_option[0]') || {}

  const sammlungFilter = row.art_id
    ? { art_id: { _eq: row.art_id } }
    : { id: { _is_null: false } }
  const {
    data: sammlungData,
    error: sammlungError,
    loading: sammlungLoading,
  } = useQuery(sammlungQuery, {
    variables: { filter: sammlungFilter },
  })

  const urlLastName = activeNodeArray[activeNodeArray.length - 2]
  const isAnlieferung = urlLastName === 'An-Lieferungen'
  const isAuslieferung = urlLastName === 'Aus-Lieferungen'

  const ifNeeded = useCallback(
    field => {
      if (existsSammelLieferung && li_show_sl_felder) return true
      if (!exists(sammelLieferung[field]) || sammelLieferung[field] === false) {
        return true
      } else if (sammelLieferung[field] !== row[field]) {
        return true
      }
      return false
    },
    [existsSammelLieferung, li_show_sl_felder, row, sammelLieferung],
  )
  const ifSomeNeeded = useCallback(fields => fields.some(f => ifNeeded(f)), [
    ifNeeded,
  ])
  const ifAllNeeded = useCallback(fields => fields.every(f => ifNeeded(f)), [
    ifNeeded,
  ])

  const herkunftByKultur = isAnlieferung
    ? get(row, 'kulturByNachKulturId.herkunft')
    : get(row, 'kulturByVonKulturId.herkunft')
  const herkunftBySammlung = get(row, 'sammlung.herkunft')
  const herkunft = herkunftByKultur || herkunftBySammlung
  const herkunftQuelle = herkunftByKultur ? 'Kultur' : 'Sammlung'
  const herkunftValue = herkunft
    ? `${herkunft.nr || '(keine Nr)'}: ${herkunft.gemeinde ||
        '(keine Gemeinde)'}, ${herkunft.lokalname || '(kein Lokalname)'}`
    : ''
  const showVon =
    (!!row.art_id && !isAuslieferung) ||
    (existsSammelLieferung && ifAllNeeded(['von_sammlung_id', 'von_kultur_id']))
  const showNach =
    (herkunft && !isAnlieferung) ||
    (existsSammelLieferung &&
      ifAllNeeded(['nach_kultur_id', 'nach_ausgepflanzt']))

  // beware: art_id, herkunft_id and nach_kultur_id can be null
  let vonKulturFilter = { id: { _is_null: false } }
  // show only kulturen of art_id
  if (row.art_id) {
    vonKulturFilter = {
      art_id: { _eq: row.art_id },
    }
  }
  // show only kulturen with same herkunft
  if (row.art_id && herkunft && herkunft.id) {
    vonKulturFilter = {
      art_id: { _eq: row.art_id },
      herkunft_id: { _eq: herkunft.id },
    }
  }
  // shall not be delivered to same kultur it came from
  if (
    row.art_id &&
    herkunft &&
    herkunft.id &&
    row.nach_kultur_id &&
    // ensure set value is always shown
    row.von_kultur_id &&
    row.von_kultur_id !== row.nach_kultur_id
  ) {
    vonKulturFilter = {
      art_id: { _eq: row.art_id },
      herkunft_id: { _eq: herkunft.id },
      id: { _neq: row.nach_kultur_id },
    }
  }
  const {
    data: vonKulturData,
    error: vonKulturError,
    loading: vonKulturLoading,
  } = useQuery(kulturQuery, {
    variables: { filter: vonKulturFilter },
  })

  // only kulturen of same herkunft!
  // beware: art_id, herkunft_id and von_kultur_id can be null
  let nachKulturFilter = { id: { _is_null: false } }
  // show only kulturen of art_id
  if (row.art_id) {
    nachKulturFilter = {
      art_id: { _eq: row.art_id },
    }
  }
  // show only kulturen with same herkunft
  if (row.art_id && herkunft && herkunft.id) {
    nachKulturFilter = {
      art_id: { _eq: row.art_id },
      herkunft_id: { _eq: herkunft.id },
    }
  }
  // shall be delivered to same kultur it came from
  if (
    row.art_id &&
    herkunft &&
    herkunft.id &&
    // ensure set value is always shown
    row.von_kultur_id &&
    row.von_kultur_id !== row.nach_kultur_id
  ) {
    nachKulturFilter = {
      art_id: { _eq: row.art_id },
      herkunft_id: { _eq: herkunft.id },
      id: { _neq: row.von_kultur_id },
    }
  }
  const {
    data: nachKulturData,
    error: nachKulturError,
    loading: nachKulturLoading,
  } = useQuery(kulturQuery, {
    variables: { filter: nachKulturFilter },
  })

  useEffect(() => {
    setErrors({})
  }, [row.id])

  const vonKulturWerte = useMemo(
    () =>
      get(vonKulturData, 'kultur', []).map(el => {
        const personName = get(el, 'garten.person.name') || '(kein Name)'
        const personOrt = get(el, 'garten.person.ort') || null
        const personLabel = `${personName}${personOrt ? ` (${personOrt})` : ''}`
        const label = get(el, 'garten.name') || personLabel

        return {
          value: el.id,
          label,
        }
      }),
    [vonKulturData],
  )
  const nachKulturWerte = useMemo(
    () =>
      get(nachKulturData, 'kultur', []).map(el => {
        const personName = get(el, 'garten.person.name') || '(kein Name)'
        const personOrt = get(el, 'garten.person.ort') || null
        const personLabel = `${personName}${personOrt ? ` (${personOrt})` : ''}`
        const label = get(el, 'garten.name') || personLabel

        return {
          value: el.id,
          label,
        }
      }),
    [nachKulturData],
  )

  const sammlungWerte = useMemo(
    () =>
      get(sammlungData, 'sammlung', []).map(el => {
        const datum = el.datum || '(kein Datum)'
        const nr = get(el, 'herkunft.nr') || '(keine Nr)'
        const person = get(el, 'person.name') || '(kein Name)'
        const label = `${datum}: Herkunft ${nr}; ${person}`

        return {
          value: el.id,
          label,
        }
      }),
    [sammlungData],
  )

  const personWerte = useMemo(
    () =>
      get(personData, 'person', []).map(el => ({
        value: el.id,
        label: `${el.name || '(kein Name)'} (${el.ort || 'kein Ort'})`,
      })),
    [personData],
  )

  const artWerte = useMemo(
    () =>
      get(artData, 'art', []).map(el => ({
        value: el.id,
        label: get(el, 'art_ae_art.name') || '(kein Artname)',
      })),
    [artData],
  )

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
      if (showFilter) {
        filter.setValue({ table: 'lieferung', key: field, value })
      } else {
        let valueToSet
        if (value === null) {
          valueToSet = null
        } else if (['number', 'boolean'].includes(type)) {
          valueToSet = value
        } else {
          valueToSet = `"${value.split('"').join('\\"')}"`
        }
        // ensure Herkunft updates
        const refetchQueries = [
          'nach_kultur_id',
          'von_kultur_id',
          'von_sammlung_id',
          'art_id',
        ].includes(field)
          ? ['LieferungQueryForLieferungLieferung']
          : []
        try {
          await client.mutate({
            mutation:
              field === 'art_id'
                ? updateLieferungArtId({ field, valueToSet })
                : updateLieferung({ field, valueToSet }),
            variables: {
              id: row.id,
            },
            refetchQueries,
            optimisticResponse: {
              __typename: 'Mutation',
              updateLieferung: {
                id: row.id,
                __typename: 'Lieferung',
                content: { ...row, [field]: valueToSet },
              },
            },
          })
        } catch (error) {
          console.log(error)
          return setErrors({ [field]: error.message })
        }
        setErrors({})
      }
    },
    [client, filter, row, showFilter],
  )
  const openPlanenDocs = useCallback(() => {
    typeof window !== 'undefined' &&
      window.open('https://vermehrung.ch/Dokumentation/Planen')
  }, [])
  const openLieferungDocs = useCallback(() => {
    typeof window !== 'undefined' &&
      window.open('https://vermehrung.ch/Dokumentation/Lieferungen')
  }, [])
  const openGenVielfaldDocs = useCallback(() => {
    typeof window !== 'undefined' &&
      window.open('https://vermehrung.ch/Dokumentation/Genetische-Vielfalt')
  }, [])

  if (loading) {
    return (
      <Container>
        <FormTitle title="Lieferung" />
        <FieldsContainer>Lade...</FieldsContainer>
      </Container>
    )
  }

  const errorToShow =
    error ||
    sammlungError ||
    vonKulturError ||
    nachKulturError ||
    artError ||
    personError
  if (errorToShow) {
    return (
      <Container>
        <FormTitle title="Lieferung" />
        <FieldsContainer>{`Fehler beim Laden der Daten: ${errorToShow.message}`}</FieldsContainer>
      </Container>
    )
  }

  if (!row || (!showFilter && filter.show)) return null

  //console.log('Lieferung, row:', row)

  return (
    <ErrorBoundary>
      <Container showfilter={showFilter}>
        {showFilter ? (
          <FilterTitle
            title="Lieferung"
            table="lieferung"
            totalNr={totalNr}
            filteredNr={filteredNr}
          />
        ) : (
          <TitleContainer>
            <Title>Lieferung</Title>
            <TitleSymbols>
              <AddButton />
              <DeleteButton row={row} />
              <Settings
                personId={person_id}
                personOptionResult={personOptionResult}
              />
              <IconButton
                aria-label="Anleitung öffnen"
                title="Anleitung öffnen"
                onClick={openLieferungDocs}
              >
                <IoMdInformationCircleOutline />
              </IconButton>
              {(store.filter.show || isFiltered) && (
                <TitleFilterNumbers>{`${filteredNr}/${totalNr}`}</TitleFilterNumbers>
              )}
            </TitleSymbols>
          </TitleContainer>
        )}
        <FieldsContainer>
          {ifSomeNeeded([
            'art_id',
            'anzahl_pflanzen',
            'anzahl_auspflanzbereit',
            'gramm_samen',
            'andere_menge',
            'von_anzahl_individuen',
          ]) && (
            <>
              <TitleRow>
                <Title>was</Title>
              </TitleRow>
              {ifNeeded('art_id') && (
                <Select
                  key={`${row.id}art_id`}
                  name="art_id"
                  value={row.art_id}
                  field="art_id"
                  label="Art"
                  options={artWerte}
                  loading={artLoading}
                  saveToDb={saveToDb}
                  error={errors.art_id}
                />
              )}
              {herkunftValue && (
                <Herkunft>
                  <HerkunftLabel>{`Herkunft (berechnet aus ${herkunftQuelle})`}</HerkunftLabel>
                  {herkunftValue}
                </Herkunft>
              )}
              <FieldRow>
                {ifNeeded('anzahl_pflanzen') && (
                  <TextField
                    key={`${row.id}anzahl_pflanzen`}
                    name="anzahl_pflanzen"
                    label="Anzahl Pflanzen"
                    value={row.anzahl_pflanzen}
                    saveToDb={saveToDb}
                    error={errors.anzahl_pflanzen}
                    type="number"
                  />
                )}
                {ifNeeded('anzahl_auspflanzbereit') && (
                  <TextField
                    key={`${row.id}anzahl_auspflanzbereit`}
                    name="anzahl_auspflanzbereit"
                    label="Anzahl auspflanzbereit"
                    value={row.anzahl_auspflanzbereit}
                    saveToDb={saveToDb}
                    error={errors.anzahl_auspflanzbereit}
                    type="number"
                  />
                )}
              </FieldRow>
              <FieldRow>
                {ifNeeded('gramm_samen') && (
                  <TextField
                    key={`${row.id}gramm_samen`}
                    name="gramm_samen"
                    label="Gramm Samen"
                    value={row.gramm_samen}
                    saveToDb={saveToDb}
                    error={errors.gramm_samen}
                    type="number"
                  />
                )}
                {ifNeeded('andere_menge') && (
                  <TextField
                    key={`${row.id}andere_menge`}
                    name="andere_menge"
                    label={`Andere Menge (z.B. "3 Zwiebeln")`}
                    value={row.andere_menge}
                    saveToDb={saveToDb}
                    error={errors.andere_menge}
                    type="text"
                  />
                )}
              </FieldRow>
              {ifNeeded('von_anzahl_individuen') && (
                <FieldRow>
                  <TextField
                    key={`${row.id}von_anzahl_individuen`}
                    name="von_anzahl_individuen"
                    label="von Anzahl Individuen"
                    value={row.von_anzahl_individuen}
                    saveToDb={saveToDb}
                    error={errors.von_anzahl_individuen}
                    type="number"
                  />
                  <div>
                    <IconButton
                      aria-label="Anleitung öffnen"
                      title="Anleitung öffnen"
                      onClick={openGenVielfaldDocs}
                    >
                      <IoMdInformationCircleOutline />
                    </IconButton>
                  </div>
                </FieldRow>
              )}
            </>
          )}
          {showVon && (
            <>
              <TitleRow>
                <Title>von</Title>
              </TitleRow>
              {ifNeeded('von_sammlung_id') && (
                <Select
                  key={`${row.id}${row.von_sammlung_id}von_sammlung_id`}
                  name="von_sammlung_id"
                  value={row.von_sammlung_id}
                  field="von_sammlung_id"
                  label={`Sammlung${
                    exists(row.art_id) ? ' (nur solche derselben Art)' : ''
                  }`}
                  options={sammlungWerte}
                  loading={sammlungLoading}
                  saveToDb={saveToDb}
                  error={errors.von_sammlung_id}
                />
              )}
              {ifNeeded('von_kultur_id') && (
                <Select
                  key={`${row.id}${row.von_kultur_id}von_kultur_id`}
                  name="von_kultur_id"
                  value={row.von_kultur_id}
                  field="von_kultur_id"
                  label={`Kultur${
                    exists(row.art_id) ? ' (nur solche derselben Art)' : ''
                  }`}
                  options={vonKulturWerte}
                  loading={vonKulturLoading}
                  saveToDb={saveToDb}
                  error={errors.von_kultur_id}
                />
              )}
            </>
          )}
          {showNach && (
            <>
              <TitleRow>
                <Title>nach</Title>
              </TitleRow>
              {ifNeeded('nach_kultur_id') && (
                <Select
                  key={`${row.id}${row.nach_kultur_id}nach_kultur_id`}
                  name="nach_kultur_id"
                  value={row.nach_kultur_id}
                  field="nach_kultur_id"
                  label={`Kultur${
                    exists(row.art_id)
                      ? ` (Kulturen derselben Art und Herkunft${
                          row.von_kultur_id ? ', ohne die von-Kultur' : ''
                        })`
                      : ''
                  }`}
                  options={nachKulturWerte}
                  loading={nachKulturLoading}
                  saveToDb={saveToDb}
                  error={errors.nach_kultur_id}
                />
              )}
              {ifNeeded('nach_ausgepflanzt') && (
                <Checkbox2States
                  key={`${row.id}nach_ausgepflanzt`}
                  label="ausgepflanzt"
                  name="nach_ausgepflanzt"
                  value={row.nach_ausgepflanzt}
                  saveToDb={saveToDb}
                  error={errors.nach_ausgepflanzt}
                />
              )}
            </>
          )}
          {ifSomeNeeded(['datum', 'geplant']) && (
            <>
              <TitleRow>
                <Title>wann</Title>
              </TitleRow>
              {ifNeeded('datum') && (
                <Date
                  key={`${row.id}datum`}
                  name="datum"
                  label="Datum"
                  value={row.datum}
                  saveToDb={saveToDb}
                  error={errors.datum}
                />
              )}
              {ifNeeded('geplant') && (
                <FieldRow>
                  <Checkbox2States
                    key={`${row.id}geplant`}
                    label="Geplant"
                    name="geplant"
                    value={row.geplant}
                    saveToDb={saveToDb}
                    error={errors.geplant}
                  />
                  <div>
                    <IconButton
                      aria-label="Anleitung öffnen"
                      title="Anleitung öffnen"
                      onClick={openPlanenDocs}
                    >
                      <IoMdInformationCircleOutline />
                    </IconButton>
                  </div>
                </FieldRow>
              )}
            </>
          )}
          {ifSomeNeeded(['person_id', 'bemerkungen']) && (
            <>
              <TitleRow>
                <Title>wer</Title>
              </TitleRow>
              {ifNeeded('person_id') && (
                <Select
                  key={`${row.id}person_id`}
                  name="person_id"
                  value={row.person_id}
                  field="person_id"
                  label="Person"
                  options={personWerte}
                  loading={personLoading}
                  saveToDb={saveToDb}
                  error={errors.person_id}
                />
              )}
              {ifNeeded('bemerkungen') && (
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
              {!showFilter && <Files parentId={row.id} parent="lieferung" />}
            </>
          )}
        </FieldsContainer>
      </Container>
    </ErrorBoundary>
  )
}

export default observer(Lieferung)
