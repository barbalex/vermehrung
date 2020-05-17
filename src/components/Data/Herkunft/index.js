import React, { useContext, useState, useEffect, useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import gql from 'graphql-tag'
import styled from 'styled-components'
import get from 'lodash/get'
import IconButton from '@material-ui/core/IconButton'
import { IoMdInformationCircleOutline } from 'react-icons/io'
import md5 from 'blueimp-md5'
import SplitPane from 'react-split-pane'

import { useQuery, StoreContext } from '../../../models/reactUtils'
import toPgArray from '../../../utils/toPgArray'
import TextField from '../../shared/TextField'
import FormTitle from '../../shared/FormTitle'
import FilterTitle from '../../shared/FilterTitle'
import { personOption as personOptionFragment } from '../../../utils/fragments'
import queryFromTable from '../../../utils/queryFromTable'
import ifIsNumericAsNumber from '../../../utils/ifIsNumericAsNumber'
import Files from '../Files'
import DeleteButton from './DeleteButton'
import AddButton from './AddButton'
import Coordinates from '../../shared/Coordinates'
import Settings from './Settings'
import appBaseUrl from '../../../utils/appBaseUrl'
import ErrorBoundary from '../../shared/ErrorBoundary'

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${(props) => (props.showfilter ? '#fff3e0' : 'unset')};
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
const StyledSplitPane = styled(SplitPane)`
  height: calc(100vh - 64px) !important;
  .Resizer {
    background: rgba(74, 20, 140, 0.1);
    opacity: 1;
    z-index: 1;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 7px;
    cursor: col-resize;
  }
  .Resizer:hover {
    -webkit-transition: all 0.5s ease;
    transition: all 0.5s ease;
    background-color: #fff59d !important;
  }
  .Resizer.disabled {
    cursor: not-allowed;
  }
  .Resizer.disabled:hover {
    border-color: transparent;
  }
  .Pane {
    overflow: hidden;
  }
`
const Konflikte = styled.div`
  margin-bottom: 10px;
`
const Konflikt = styled.div`
  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`

const personOptionQuery = gql`
  query PersonOptionQueryForHerkunft($accountId: String) {
    person_option(where: { person: { account_id: { _eq: $accountId } } }) {
      ...PersonOptionFields
    }
  }
  ${personOptionFragment}
`

const Herkunft = ({
  filter: showFilter,
  id = '99999999-9999-9999-9999-999999999999',
}) => {
  const store = useContext(StoreContext)
  const { filter, user, upsertHerkunft, addQueuedQuery, online } = store
  const { isFiltered: runIsFiltered } = filter

  const [conflictToSolve, setConflictToSolve] = useState(null)

  const isFiltered = runIsFiltered()
  const {
    error: errorHerkunft,
    loading: loadingHerkunft,
    query: queryOfHerkunft,
  } = useQuery((store) =>
    store.queryHerkunft({
      where: { id: { _eq: id } },
    }),
  )

  const row = showFilter ? filter.herkunft : store.herkunfts.get(id)

  const { data: dataHerkunftTotalAggregate } = useQuery((store) =>
    store.queryHerkunft_aggregate(undefined, (d) =>
      d.aggregate((d) => d.count),
    ),
  )
  const totalNr = get(
    dataHerkunftTotalAggregate,
    'herkunft_aggregate.aggregate.count',
    0,
  )
  const herkunftFilter = queryFromTable({ store, table: 'herkunft' })
  const { data: dataHerkunftFilteredAggregate } = useQuery((store) =>
    store.queryHerkunft_aggregate({ where: herkunftFilter }, (d) =>
      d.aggregate((d) => d.count),
    ),
  )
  const filteredNr = get(
    dataHerkunftFilteredAggregate,
    'herkunft_aggregate.aggregate.count',
    0,
  )

  const personOptionResult = useQuery(personOptionQuery, {
    variables: { accountId: user.uid },
  })
  const { hk_kanton, hk_land, hk_bemerkungen, hk_geom_point, id: person_id } =
    get(personOptionResult.data, 'person_option[0]') || {}

  const [errors, setErrors] = useState({})
  useEffect(() => {
    setErrors({})
  }, [id])

  const saveToDb = useCallback(
    async (event) => {
      const field = event.target.name
      let value = ifIsNumericAsNumber(event.target.value)
      if (event.target.value === undefined) value = null
      if (event.target.value === '') value = null
      const previousValue = row[field]
      // only update if value has changed
      if (value === previousValue) return

      if (showFilter) {
        return filter.setValue({ table: 'herkunft', key: field, value })
      }
      // first build the part that will be revisioned
      const depth = row._depth + 1
      const newObject = {
        id: row.id,
        nr: field === 'nr' ? value.toString() : row.nr,
        lokalname: field === 'lokalname' ? value.toString() : row.lokalname,
        gemeinde: field === 'gemeinde' ? value.toString() : row.gemeinde,
        kanton: field === 'kanton' ? value.toString() : row.kanton,
        land: field === 'land' ? value.toString() : row.land,
        bemerkungen:
          field === 'bemerkungen' ? value.toString() : row.bemerkungen,
        changed: new window.Date().toISOString(),
        changed_by: user.email,
        _parent_rev: row._rev,
        _depth: depth,
      }
      const rev = `${depth}-${md5(JSON.stringify(newObject))}`
      newObject._rev = rev
      const newObjectForStore = { ...newObject }
      // convert to string as hasura does not support arrays yet
      // https://github.com/hasura/graphql-engine/pull/2243
      newObject._revisions = row._revisions
        ? toPgArray([rev, ...row._revisions])
        : toPgArray([rev])
      // do not stringify revisions for store
      // as _that_ is a real array
      newObjectForStore._revisions = row._revisions
        ? [rev, ...row._revisions]
        : [rev]
      addQueuedQuery({
        name: 'mutateInsert_herkunft_rev',
        variables: JSON.stringify({
          objects: [newObject],
          on_conflict: {
            constraint: 'herkunft_rev_pkey',
            update_columns: ['id'],
          },
        }),
        callbackQuery: 'queryHerkunft',
        callbackQueryVariables: JSON.stringify({
          where: { id: { _eq: id } },
        }),
      })
      setTimeout(() => {
        // optimistically update store
        upsertHerkunft(newObjectForStore)
        if (['nr'].includes(field)) store.tree.refetch()
      }, 50)
    },
    [
      addQueuedQuery,
      filter,
      id,
      row,
      showFilter,
      store.tree,
      upsertHerkunft,
      user.email,
    ],
  )
  const openHerkunftDocs = useCallback(() => {
    const url = `${appBaseUrl()}Dokumentation/Herkuenfte`
    if (typeof window !== 'undefined') {
      if (window.matchMedia('(display-mode: standalone)').matches) {
        return window.open(url, '_blank', 'toolbar=no')
      }
      window.open(url)
    }
  }, [])

  if (loadingHerkunft) {
    return (
      <Container>
        <FormTitle title="Herkunft" />
        <FieldsContainer>Lade...</FieldsContainer>
      </Container>
    )
  }

  if (errorHerkunft) {
    return (
      <Container>
        <FormTitle title="Herkunft" />
        <FieldsContainer>{`Fehler beim Laden der Daten: ${errorHerkunft.message}`}</FieldsContainer>
      </Container>
    )
  }

  if (!row || (!showFilter && filter.show)) return null

  const firstPaneWidth = conflictToSolve ? '50%' : '100%'

  // hide resizer when tree is hidden
  const resizerStyle = !conflictToSolve ? { width: 0 } : {}

  return (
    <ErrorBoundary>
      <Container showfilter={showFilter}>
        {showFilter ? (
          <FilterTitle
            title="Herkunft"
            table="herkunft"
            totalNr={totalNr}
            filteredNr={filteredNr}
          />
        ) : (
          <TitleContainer>
            <Title>Herkunft</Title>
            <TitleSymbols>
              <AddButton />
              <DeleteButton row={row} />
              <IconButton
                aria-label="Anleitung öffnen"
                title="Anleitung öffnen"
                onClick={openHerkunftDocs}
              >
                <IoMdInformationCircleOutline />
              </IconButton>
              <Settings
                personId={person_id}
                personOptionResult={personOptionResult}
              />
              {(store.filter.show || isFiltered) && (
                <TitleFilterNumbers>{`${filteredNr}/${totalNr}`}</TitleFilterNumbers>
              )}
            </TitleSymbols>
          </TitleContainer>
        )}
        <Container>
          <StyledSplitPane
            split="vertical"
            size={firstPaneWidth}
            minSize={200}
            resizerStyle={resizerStyle}
          >
            <FieldsContainer>
              <TextField
                key={`${row.id}nr`}
                name="nr"
                label="Nr"
                value={row.nr}
                saveToDb={saveToDb}
                error={errors.nr}
              />
              <TextField
                key={`${row.id}lokalname`}
                name="lokalname"
                label="Lokalname"
                value={row.lokalname}
                saveToDb={saveToDb}
                error={errors.lokalname}
              />
              <TextField
                key={`${row.id}gemeinde`}
                name="gemeinde"
                label="Gemeinde"
                value={row.gemeinde}
                saveToDb={saveToDb}
                error={errors.gemeinde}
              />
              {hk_kanton && (
                <TextField
                  key={`${row.id}kanton`}
                  name="kanton"
                  label="Kanton"
                  value={row.kanton}
                  saveToDb={saveToDb}
                  error={errors.kanton}
                />
              )}
              {hk_land && (
                <TextField
                  key={`${row.id}land`}
                  name="land"
                  label="Land"
                  value={row.land}
                  saveToDb={saveToDb}
                  error={errors.land}
                />
              )}
              {!showFilter && hk_geom_point && (
                <Coordinates
                  row={row}
                  refetchForm={queryOfHerkunft.refetch}
                  table="herkunft"
                />
              )}
              {hk_bemerkungen && (
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
              {online && !showFilter && row._conflicts && row._conflicts.map && (
                <Konflikte>
                  {[...row._conflicts].sort().map((c) => (
                    <Konflikt
                      key={c}
                      onClick={() =>
                        setConflictToSolve(
                          !conflictToSolve
                            ? c
                            : conflictToSolve !== c
                            ? c
                            : null,
                        )
                      }
                    >{`Konflikt mit Version ${c}`}</Konflikt>
                  ))}
                </Konflikte>
              )}
              {!showFilter && row.id && (
                <Files parentId={row.id} parent="herkunft" />
              )}
            </FieldsContainer>
            <div>{`Konflikt ${conflictToSolve}`}</div>
          </StyledSplitPane>
        </Container>
      </Container>
    </ErrorBoundary>
  )
}

export default observer(Herkunft)
