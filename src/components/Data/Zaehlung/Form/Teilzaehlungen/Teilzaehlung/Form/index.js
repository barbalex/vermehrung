import React, {
  useState,
  useEffect,
  useCallback,
  useContext,
  useMemo,
} from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'
import IconButton from '@material-ui/core/IconButton'
import { FaRegTrashAlt, FaChartLine } from 'react-icons/fa'

import { StoreContext } from '../../../../../../../models/reactUtils'
import TextField from '../../../../../../shared/TextField'
import TextFieldNonUpdatable from '../../../../../../shared/TextFieldNonUpdatable'
import Checkbox2States from '../../../../../../shared/Checkbox2States'
import Select from '../../../../../../shared/SelectCreatable'
import ConflictList from '../../../../../../shared/ConflictList'
import HistoryButton from '../../../../../../shared/HistoryButton'
import ifIsNumericAsNumber from '../../../../../../../utils/ifIsNumericAsNumber'
import PrognoseMenu from './PrognoseMenu'
import ErrorBoundary from '../../../../../../shared/ErrorBoundary'
import exists from '../../../../../../../utils/exists'

const FieldContainer = styled.div`
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
const CaseConflictTitle = styled.h4`
  margin-bottom: 10px;
  flex-grow: 1;
`
const Rev = styled.span`
  font-weight: normal;
  padding-left: 7px;
  color: rgba(0, 0, 0, 0.4);
  font-size: 0.8em;
`
const ConflictListContainer = styled.div`
  align-self: center;
`
const DeletedContainer = styled.div`
  padding-right: 5px;
  position: relative;
  margin-top: -8px;
}
`

const TeilzaehlungForm = ({
  id,
  kulturId,
  row,
  rawRow,
  teilkulturWerte,
  activeConflict,
  setActiveConflict,
  showHistory,
  setShowHistory,
  kulturOption,
}) => {
  const store = useContext(StoreContext)
  const { insertTeilkulturRev, errors, unsetError, online, filter } = store

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

  const {
    tk,
    tz_teilkultur_id,
    tz_anzahl_mutterpflanzen,
    tz_andere_menge,
    tz_auspflanzbereit_beschreibung,
    tz_bemerkungen,
  } = kulturOption ?? {}

  const onCreateNewTeilkultur = useCallback(
    ({ name }) => {
      const teilkultur_id = insertTeilkulturRev({
        noNavigateInTree: true,
        values: {
          name,
          kultur_id: kulturId,
        },
      })
      row.edit({ field: 'teilkultur_id', value: teilkultur_id, store })
    },
    [insertTeilkulturRev, kulturId, row, store],
  )

  useEffect(() => {
    unsetError('teilzaehlung')
  }, [id, unsetError])

  const saveToDb = useCallback(
    (event) => {
      const field = event.target.name
      let value = ifIsNumericAsNumber(event.target.value)
      if (event.target.value === undefined) value = null
      if (event.target.value === '') value = null
      const previousValue = ifIsNumericAsNumber(row[field])
      // only update if value has changed
      if (value === previousValue) return

      row.edit({ field, value, store })
    },
    [row, store],
  )
  const onClickDelete = useCallback(() => {
    row.delete({ store })
  }, [row, store])

  const showDeleted = row?._deleted || filter.teilzaehlung._deleted !== false

  const anzahl_jungpflanzen = useMemo(() => {
    if (
      exists(row?.anzahl_pflanzen) &&
      exists(row?.anzahl_auspflanzbereit) &&
      exists(row?.anzahl_mutterpflanzen)
    ) {
      return (
        row?.anzahl_pflanzen -
        row?.anzahl_auspflanzbereit -
        row?.anzahl_mutterpflanzen
      )
    }
    return null
  }, [
    row?.anzahl_auspflanzbereit,
    row?.anzahl_mutterpflanzen,
    row?.anzahl_pflanzen,
  ])

  if (!row) return null

  return (
    <ErrorBoundary>
      <FieldContainer>
        {(activeConflict || showHistory) && (
          <CaseConflictTitle>
            Aktuelle Version<Rev>{row._rev}</Rev>
          </CaseConflictTitle>
        )}
        {showDeleted && (
          <DeletedContainer>
            <Checkbox2States
              key={`${row.id}_deleted`}
              label="gelöscht"
              name="_deleted"
              value={row._deleted}
              saveToDb={saveToDb}
              error={errors?.teilzaehlung?._deleted}
            />
          </DeletedContainer>
        )}
        {tk && tz_teilkultur_id && (
          <Teilkultur>
            <Select
              key={`${row.id}teilkultur_id`}
              row={row}
              rawRow={rawRow}
              field="teilkultur_id"
              label="Teilkultur"
              options={teilkulturWerte}
              error={errors?.teilzaehlung?.teilkultur_id}
              onCreateNew={onCreateNewTeilkultur}
            />
          </Teilkultur>
        )}
        <Anzahl>
          <TextField
            key={`${row.id}anzahl_pflanzen`}
            labelWeight={600}
            name="anzahl_pflanzen"
            label="Anzahl Pflanzen"
            value={row.anzahl_pflanzen}
            saveToDb={saveToDb}
            error={errors?.teilzaehlung?.anzahl_pflanzen}
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
            error={errors?.teilzaehlung?.anzahl_auspflanzbereit}
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
              error={errors?.teilzaehlung?.anzahl_mutterpflanzen}
              type="number"
            />
          </Anzahl>
        )}
        <Anzahl>
          <TextFieldNonUpdatable
            key={`${row.id}anzahl_jungpflanzen`}
            label="Anzahl Jungpflanzen"
            schrinkLabel={true}
            value={anzahl_jungpflanzen}
            type="number"
            message="Wird berechnet aus: Anzahl Pflanzen - auspflanzbereit - Mutterpflanzen"
          />
        </Anzahl>
        {tz_andere_menge && (
          <Other>
            <TextField
              key={`${row.id}andere_menge`}
              name="andere_menge"
              label={`Andere Menge (z.B. "3 Zwiebeln")`}
              labelWeight={600}
              value={row.andere_menge}
              saveToDb={saveToDb}
              error={errors?.teilzaehlung?.andere_menge}
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
              labelWeight={600}
              value={row.auspflanzbereit_beschreibung}
              saveToDb={saveToDb}
              error={errors?.teilzaehlung?.auspflanzbereit_beschreibung}
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
              labelWeight={600}
              value={row.bemerkungen}
              saveToDb={saveToDb}
              error={errors?.teilzaehlung?.bemerkungen}
              multiLine
            />
          </Last>
        )}
        <div>
          <HistoryButton
            row={row}
            showHistory={showHistory}
            setShowHistory={setShowHistory}
          />
          {!row._deleted && (
            <IconButton
              aria-label="löschen"
              title="löschen"
              onClick={onClickDelete}
            >
              <FaRegTrashAlt />
            </IconButton>
          )}
          <IconButton
            aria-label="Prognose"
            title={online ? 'Prognose' : 'Prognose (nur online verfügbar)'}
            onClick={onClickPrognosis}
            disabled={!online}
          >
            <FaChartLine />
          </IconButton>
          {openPrognosis && (
            <PrognoseMenu
              onClosePrognosis={onClosePrognosis}
              anchorEl={anchorEl}
              setAnchorEl={setAnchorEl}
              teilzaehlung={row}
            />
          )}
        </div>
        {online && row?._conflicts?.map && (
          <ConflictListContainer>
            <ConflictList
              conflicts={row._conflicts}
              activeConflict={activeConflict}
              setActiveConflict={setActiveConflict}
            />
          </ConflictListContainer>
        )}
      </FieldContainer>
    </ErrorBoundary>
  )
}

export default observer(TeilzaehlungForm)
