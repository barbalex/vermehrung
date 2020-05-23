import React, { useState, useEffect, useCallback, useContext } from 'react'
import { observer } from 'mobx-react-lite'
import gql from 'graphql-tag'
import { useApolloClient } from '@apollo/react-hooks'
import styled from 'styled-components'
import IconButton from '@material-ui/core/IconButton'
import { FaRegTrashAlt, FaChartLine } from 'react-icons/fa'
import get from 'lodash/get'
import md5 from 'blueimp-md5'
import { v1 as uuidv1 } from 'uuid'
import SplitPane from 'react-split-pane'

import { StoreContext } from '../../../../../models/reactUtils'
import toPgArray from '../../../../../utils/toPgArray'
import toStringIfPossible from '../../../../../utils/toStringIfPossible'
import TextField from '../../../../shared/TextField'
import Select from '../../../../shared/SelectCreatable'
import ifIsNumericAsNumber from '../../../../../utils/ifIsNumericAsNumber'
import PrognoseMenu from './PrognoseMenu'
import ErrorBoundary from '../../../../shared/ErrorBoundary'
//import Conflict from './Conflict'
import ConflictList from '../../../../shared/ConflictList'

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
const CaseConflictTitle = styled.h4`
  margin-bottom: 10px;
`
const Rev = styled.span`
  font-weight: normal;
  padding-left: 7px;
  color: rgba(0, 0, 0, 0.4);
  font-size: 0.8em;
`

const Teilzaehlung = ({
  id,
  kulturId,
  teilzaehlung: row,
  teilkulturenWerte,
  teilkulturenLoading,
  refetchTeilkulturen,
  index,
  zaehlungResult,
}) => {
  const client = useApolloClient()
  const store = useContext(StoreContext)
  const {
    addNotification,
    user,
    upsertTeilzaehlung,
    addQueuedQuery,
    online,
  } = store
  const { refetch: refetchTree } = store.tree

  const [openPrognosis, setOpenPrognosis] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const onClosePrognosis = useCallback((event, reason) => {
    if (reason === 'escapeKeyDown') {
      setAnchorEl(null)
    }
  }, [])
  const onClickPrognosis = useCallback((event) => {
    setOpenPrognosis(true)
    setAnchorEl(event.currentTarget)
  }, [])

  const { data, query: queryOfZaehlung } = zaehlungResult
  const zaehlung = get(data, 'zaehlung', [{}])[0]
  const {
    tk,
    tz_teilkultur_id,
    tz_anzahl_mutterpflanzen,
    tz_andere_menge,
    tz_auspflanzbereit_beschreibung,
    tz_bemerkungen,
  } = get(zaehlung, 'kultur.kultur_option') || {}

  const [activeConflict, setActiveConflict] = useState(null)
  const callbackAfterVerwerfen = useCallback(() => {
    setActiveConflict(null)
    queryOfZaehlung.refetch()
  }, [queryOfZaehlung])
  const callbackAfterUebernehmen = useCallback(() => {
    queryOfZaehlung.refetch()
    setActiveConflict(row?._rev ?? null)
  }, [queryOfZaehlung, row?._rev])

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

      // first build the part that will be revisioned
      const depth = row._depth + 1
      const newObject = {
        teilzaehlung_id: row.id,
        zaehlung_id: field === 'zaehlung_id' ? value : row.zaehlung_id,
        teilkultur_id: field === 'teilkultur_id' ? value : row.teilkultur_id,
        anzahl_pflanzen:
          field === 'anzahl_pflanzen' ? value : row.anzahl_pflanzen,
        anzahl_auspflanzbereit:
          field === 'anzahl_auspflanzbereit'
            ? value
            : row.anzahl_auspflanzbereit,
        anzahl_mutterpflanzen:
          field === 'anzahl_mutterpflanzen' ? value : row.anzahl_mutterpflanzen,
        andere_menge:
          field === 'andere_menge'
            ? toStringIfPossible(value)
            : row.andere_menge,
        auspflanzbereit_beschreibung:
          field === 'auspflanzbereit_beschreibung'
            ? toStringIfPossible(value)
            : row.auspflanzbereit_beschreibung,
        bemerkungen:
          field === 'bemerkungen' ? toStringIfPossible(value) : row.bemerkungen,
        prognose_von_tz:
          field === 'prognose_von_tz' ? value : row.prognose_von_tz,
        changed_by: user.email,
        _parent_rev: row._rev,
        _depth: depth,
      }
      const rev = `${depth}-${md5(JSON.stringify(newObject))}`
      // DO NOT include id in rev - or revs with same data will conflict
      newObject.id = uuidv1()
      newObject._rev = rev
      newObject.changed = new window.Date().toISOString()
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
        name: 'mutateInsert_teilzaehlung_rev_one',
        variables: JSON.stringify({
          object: newObject,
          on_conflict: {
            constraint: 'teilzaehlung_rev_pkey',
            update_columns: ['id'],
          },
        }),
        callbackQuery: 'queryTeilzaehlung',
        callbackQueryVariables: JSON.stringify({
          where: { id: { _eq: row.id } },
        }),
      })
      setTimeout(() => {
        // optimistically update store
        upsertTeilzaehlung(newObjectForStore)
        // refetch query because is not a model instance
        zaehlungResult.query.refetch()
        // TODO: no more necessary when mobx does its magic
        if (
          [
            'anzahl_pflanzen',
            'anzahl_auspflanzbereit',
            'anzahl_mutterpflanzen',
            'prognose',
          ].includes(field)
        ) {
          refetchTree()
        }
      }, 50)
    },
    [
      addQueuedQuery,
      refetchTree,
      row,
      upsertTeilzaehlung,
      user.email,
      zaehlungResult.query,
    ],
  )
  const onClickDelete = useCallback(async () => {
    try {
      await client.mutate({
        mutation: gql`
          mutation deleteTeilzaehlung($id: uuid!) {
            delete_teilzaehlung(where: { id: { _eq: $id } }) {
              returning {
                id
                __typename
              }
            }
          }
        `,
        variables: {
          id: row.id,
        },
        refetchQueries: ['TeilzaehlungenQuery'],
      })
    } catch (error) {
      return addNotification({
        message: error.message,
      })
    }
  }, [client, addNotification, row.id])

  const firstPaneWidth = activeConflict ? '50%' : '100%'
  // hide resizer when tree is hidden
  const resizerStyle = !activeConflict ? { width: 0 } : {}

  return (
    <ErrorBoundary>
      <>
        {!!index && <TopLine />}
        <Container>
          <StyledSplitPane
            split="vertical"
            size={firstPaneWidth}
            minSize={200}
            resizerStyle={resizerStyle}
          >
            {activeConflict && (
              <CaseConflictTitle>
                Aktuelle Version<Rev>{row._rev}</Rev>
              </CaseConflictTitle>
            )}
            {tk && tz_teilkultur_id && (
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
                  creatablePropertiesToPass={{ kultur_id: kulturId }}
                  creatablePropertyName="name"
                  creatableIdField="id"
                  table="teilkultur"
                  callback={refetchTeilkulturen}
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
            {tz_andere_menge && (
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
            {tz_auspflanzbereit_beschreibung && (
              <Auspflanzbereit>
                <TextField
                  key={`${row.id}auspflanzbereit_beschreibung`}
                  name="auspflanzbereit_beschreibung"
                  label="Beschreibung auspflanzbereite Pflanzen (z.B. Topfgrösse)"
                  value={row.auspflanzbereit_beschreibung}
                  saveToDb={saveToDb}
                  error={errors.auspflanzbereit_beschreibung}
                  type="text"
                />
              </Auspflanzbereit>
            )}
            {tz_bemerkungen && (
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
            {online && row._conflicts && row._conflicts.map && (
              <ConflictList
                conflicts={row._conflicts}
                activeConflict={activeConflict}
                setActiveConflict={setActiveConflict}
              />
            )}
            <div>
              <IconButton
                aria-label="löschen"
                title="löschen"
                onClick={onClickDelete}
              >
                <FaRegTrashAlt />
              </IconButton>

              <IconButton
                aria-label="Prognose"
                title="Prognose"
                onClick={onClickPrognosis}
              >
                <FaChartLine />
              </IconButton>
              {openPrognosis && (
                <PrognoseMenu
                  onClosePrognosis={onClosePrognosis}
                  anchorEl={anchorEl}
                  setAnchorEl={setAnchorEl}
                  teilzaehlung={row}
                  zaehlung={zaehlung}
                />
              )}
            </div>
          </StyledSplitPane>
        </Container>
      </>
    </ErrorBoundary>
  )
}

export default observer(Teilzaehlung)
