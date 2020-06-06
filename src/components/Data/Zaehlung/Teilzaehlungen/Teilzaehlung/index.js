import React, { useState, useEffect, useCallback, useContext } from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'
import IconButton from '@material-ui/core/IconButton'
import { FaRegTrashAlt, FaChartLine } from 'react-icons/fa'
import gql from 'graphql-tag'

import { StoreContext, useQuery } from '../../../../../models/reactUtils'
import TextField from '../../../../shared/TextField'
import Select from '../../../../shared/SelectCreatable'
import ifIsNumericAsNumber from '../../../../../utils/ifIsNumericAsNumber'
import PrognoseMenu from './PrognoseMenu'
import ErrorBoundary from '../../../../shared/ErrorBoundary'
import {
  kulturOption as kulturOptionFragment,
  teilzaehlung as teilzaehlungFragment,
} from '../../../../../utils/fragments'

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

const allDataQuery = gql`
  query AllDataQueryForTeilzaehlung($id: uuid!) {
    teilzaehlung(where: { id: { _eq: $id } }) {
      ...TeilzaehlungFields
      zaehlung {
        id
        __typename
        kultur {
          id
          __typename
          kultur_option {
            ...KulturOptionFields
          }
        }
      }
    }
  }
  ${kulturOptionFragment}
  ${teilzaehlungFragment}
`

const Teilzaehlung = ({
  id,
  zaehlungId,
  kulturId,
  teilzaehlung: row,
  teilkulturenWerte,
  teilkulturenLoading,
  index,
}) => {
  const store = useContext(StoreContext)
  const { insertTeilkulturRev } = store

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

  const { error, query } = useQuery(allDataQuery, {
    variables: {
      id,
    },
  })

  useQuery((store) =>
    store.queryKultur_option({ where: { id: { _eq: kulturId } } }),
  )
  const kulturOption = store.kultur_options.get(kulturId) ?? {}
  const {
    tk,
    tz_teilkultur_id,
    tz_anzahl_mutterpflanzen,
    tz_andere_menge,
    tz_auspflanzbereit_beschreibung,
    tz_bemerkungen,
  } = kulturOption

  const onCreateNewTeilkultur = useCallback(
    ({ name }) => {
      const teilkultur_id = insertTeilkulturRev({
        noNavigateInTree: true,
        values: {
          name,
          kultur_id: kulturId,
        },
      })
      row.edit({ field: 'teilkultur_id', value: teilkultur_id })
      query.refetch()
    },
    [insertTeilkulturRev, kulturId, query, row],
  )

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

      //console.log('Teilzaehlung, saveToDb', { field, value, row })

      row.edit({ field, value })
    },
    [row],
  )
  const onClickDelete = useCallback(() => {
    row.delete()
  }, [row])

  if (error) {
    return (
      <Container>{`Fehler beim Laden der Daten: ${error.message}`}</Container>
    )
  }

  return (
    <ErrorBoundary>
      {!!index && <TopLine />}
      <Container>
        {tk && tz_teilkultur_id && (
          <Teilkultur>
            <Select
              key={`${row.id}teilkultur_id`}
              row={row}
              field="teilkultur_id"
              label="Teilkultur"
              options={teilkulturenWerte}
              loading={teilkulturenLoading}
              error={errors.teilkultur_id}
              onCreateNew={onCreateNewTeilkultur}
              callback={query.refetch}
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
              zaehlungId={zaehlungId}
            />
          )}
        </div>
      </Container>
    </ErrorBoundary>
  )
}

export default observer(Teilzaehlung)
