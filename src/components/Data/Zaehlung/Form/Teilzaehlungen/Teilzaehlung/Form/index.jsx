import { useState, useEffect, useContext } from 'react'
import { observer } from 'mobx-react-lite'
import styled from '@emotion/styled'
import IconButton from '@mui/material/IconButton'
import { FaRegTrashAlt, FaChartLine } from 'react-icons/fa'
import { Q } from '@nozbe/watermelondb'
import { combineLatest, of as $of } from 'rxjs'
import { uniqBy } from 'es-toolkit'

import { MobxStoreContext } from '../../../../../../../mobxStoreContext.js'
import { TextField } from '../../../../../../shared/TextField.jsx'
import { TextFieldNonUpdatable } from '../../../../../../shared/TextFieldNonUpdatable.jsx'
import { Checkbox2States } from '../../../../../../shared/Checkbox2States.jsx'
import { SelectCreatable } from '../../../../../../shared/SelectCreatable.jsx'
import { ConflictList } from '../../../../../../shared/ConflictList/index.jsx'
import { HistoryButton } from '../../../../../../shared/HistoryButton.jsx'
import { ifIsNumericAsNumber } from '../../../../../../../utils/ifIsNumericAsNumber.js'
import { teilkulturSort } from '../../../../../../../utils/teilkulturSort.js'
import { teilkulturLabelFromTeilkultur } from '../../../../../../../utils/teilkulturLabelFromTeilkultur.js'
import { PrognoseMenu } from './PrognoseMenu.jsx'
import { ErrorBoundary } from '../../../../../../shared/ErrorBoundary.jsx'
import { exists } from '../../../../../../../utils/exists.js'

import {
  container,
  teilkulturClass,
  anzahl,
  other,
  auspflanzbereit,
  last,
  caseConflictTitle,
  rev,
  conflictListContainer,
  deletedContainer,
} from './index.module.css'

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

export const TeilzaehlungForm = observer(
  ({
    id,
    kulturId,
    activeConflict,
    setActiveConflict,
    showHistory,
    setShowHistory,
  }) => {
    const store = useContext(MobxStoreContext)
    const {
      insertTeilkulturRev,
      errors,
      unsetError,
      online,
      filter,
      db,
      initialDataQueried,
    } = store

    const [dataState, setDataState] = useState({
      teilkulturWerte: [],
      kulturOption: undefined,
      row: undefined,
    })
    const { teilkulturWerte, kulturOption, row } = dataState

    useEffect(() => {
      const teilkulturDelQuery =
        filter.teilkultur._deleted === false ? Q.where('_deleted', false)
        : filter.teilkultur._deleted === true ? Q.where('_deleted', true)
        : Q.or(
            Q.where('_deleted', false),
            Q.where('_deleted', true),
            Q.where('_deleted', null),
          )
      const teilkultursObservable = db
        .get('teilkultur')
        .query(teilkulturDelQuery, Q.where('kultur_id', kulturId))
        .observeWithColumns(['name'])
      const kulturOptionObservable =
        kulturId ? db.get('kultur_option').findAndObserve(kulturId) : $of(null)
      const tzObservable =
        initialDataQueried ? db.get('teilzaehlung').findAndObserve(id) : $of({})
      const combinedObservables = combineLatest([
        teilkultursObservable,
        kulturOptionObservable,
        tzObservable,
      ])
      const subscription = combinedObservables.subscribe(
        async ([teilkulturs, kulturOption, teilzaehlung]) => {
          let teilkultur
          try {
            teilkultur = await row.teilkultur.fetch()
          } catch {}
          const teilkultursIncludingChoosen = uniqBy(
            [...teilkulturs, ...(teilkultur ? [teilkultur] : [])],
            (e) => e.id,
          )
          const teilkulturWerte = teilkultursIncludingChoosen
            .sort(teilkulturSort)
            .map((tk) => ({
              value: tk.id,
              label: teilkulturLabelFromTeilkultur({ teilkultur: tk }),
              link: ['Teilkulturen', tk.id],
            }))
          setDataState({ teilkulturWerte, kulturOption, row: teilzaehlung })
        },
      )

      return () => subscription?.unsubscribe?.()
    }, [
      db,
      filter.teilkultur._deleted,
      id,
      kulturId,
      row?.teilkultur,
      row?.teilkultur_id,
      initialDataQueried,
    ])

    const [openPrognosis, setOpenPrognosis] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null)

    const onClosePrognosis = (event, reason) => {
      if (reason === 'escapeKeyDown') {
        setAnchorEl(null)
      }
    }

    const onClickPrognosis = (event) => {
      setOpenPrognosis(true)
      setAnchorEl(event.currentTarget)
    }

    const {
      tk,
      tz_teilkultur_id,
      tz_andere_menge,
      tz_auspflanzbereit_beschreibung,
      tz_bemerkungen,
    } = kulturOption ?? {}

    const onCreateNewTeilkultur = async ({ name }) => {
      const teilkultur_id = await insertTeilkulturRev({
        noNavigateInTree: true,
        values: {
          name,
          kultur_id: kulturId,
        },
      })
      row.edit({ field: 'teilkultur_id', value: teilkultur_id, store })
    }

    useEffect(() => {
      unsetError('teilzaehlung')
    }, [id, unsetError])

    const saveToDb = (event) => {
      const field = event.target.name
      let value = ifIsNumericAsNumber(event.target.value)
      if (event.target.value === undefined) value = null
      if (event.target.value === '') value = null
      const previousValue = ifIsNumericAsNumber(row[field])
      // only update if value has changed
      if (value === previousValue) return

      row.edit({ field, value, store })
    }

    const onClickDelete = () => row.delete({ store })

    const showDeleted = row?._deleted || filter.teilzaehlung._deleted !== false

    const anzahl_jungpflanzen =
      (
        exists(row?.anzahl_pflanzen) &&
        exists(row?.anzahl_auspflanzbereit) &&
        exists(row?.anzahl_mutterpflanzen)
      ) ?
        row?.anzahl_pflanzen -
        row?.anzahl_auspflanzbereit -
        row?.anzahl_mutterpflanzen
      : null

    if (!row || !Object.keys(row ?? {})) return null

    return (
      <ErrorBoundary>
        <div className={container}>
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
            <div className={teilkulturClass}>
              <SelectCreatable
                key={`${row.id}${row.teilkultur_id}teilkultur_id`}
                row={row}
                field="teilkultur_id"
                label="Teilkultur"
                options={teilkulturWerte}
                error={errors?.teilzaehlung?.teilkultur_id}
                onCreateNew={onCreateNewTeilkultur}
              />
            </div>
          )}
          <div className={anzahl}>
            <TextField
              key={`${row.id}anzahl_pflanzen`}
              labelWeight={700}
              name="anzahl_pflanzen"
              label="Anzahl Pflanzen"
              value={row.anzahl_pflanzen}
              saveToDb={saveToDb}
              error={errors?.teilzaehlung?.anzahl_pflanzen}
              type="number"
            />
          </div>
          <div className={anzahl}>
            <TextField
              key={`${row.id}anzahl_auspflanzbereit`}
              name="anzahl_auspflanzbereit"
              label="Anzahl auspflanz-bereit"
              value={row.anzahl_auspflanzbereit}
              saveToDb={saveToDb}
              error={errors?.teilzaehlung?.anzahl_auspflanzbereit}
              type="number"
            />
          </div>
          <div className={anzahl}>
            <TextField
              key={`${row.id}anzahl_mutterpflanzen`}
              name="anzahl_mutterpflanzen"
              label="Anzahl Mutter-Pflanzen"
              value={row.anzahl_mutterpflanzen}
              saveToDb={saveToDb}
              error={errors?.teilzaehlung?.anzahl_mutterpflanzen}
              type="number"
            />
          </div>
          <div className={anzahl}>
            <TextFieldNonUpdatable
              key={`${row.id}anzahl_jungpflanzen`}
              label="Anzahl Jungpflanzen"
              schrinkLabel={true}
              value={anzahl_jungpflanzen}
              type="number"
              message="Wird berechnet aus: Anzahl Pflanzen - auspflanzbereit - Mutterpflanzen"
            />
          </div>
          {tz_andere_menge && (
            <div className={other}>
              <TextField
                key={`${row.id}andere_menge`}
                name="andere_menge"
                label={`Andere Menge (z.B. "3 Zwiebeln")`}
                labelWeight={700}
                value={row.andere_menge}
                saveToDb={saveToDb}
                error={errors?.teilzaehlung?.andere_menge}
                type="text"
              />
            </div>
          )}
          {tz_auspflanzbereit_beschreibung && (
            <div className={auspflanzbereit}>
              <TextField
                key={`${row.id}auspflanzbereit_beschreibung`}
                name="auspflanzbereit_beschreibung"
                label="Beschreibung auspflanzbereite Pflanzen (z.B. Topfgrösse)"
                labelWeight={700}
                value={row.auspflanzbereit_beschreibung}
                saveToDb={saveToDb}
                error={errors?.teilzaehlung?.auspflanzbereit_beschreibung}
                type="text"
              />
            </div>
          )}
          {tz_bemerkungen && (
            <div className={last}>
              <TextField
                key={`${row.id}bemerkungen`}
                name="bemerkungen"
                label="Bemerkungen"
                labelWeight={700}
                value={row.bemerkungen}
                saveToDb={saveToDb}
                error={errors?.teilzaehlung?.bemerkungen}
                multiLine
              />
            </div>
          )}
          <div>
            <HistoryButton
              id={id}
              table="teilzaehlung"
              showHistory={showHistory}
              setShowHistory={setShowHistory}
            />
            {!row._deleted && (
              <IconButton
                aria-label="löschen"
                title="löschen"
                onClick={onClickDelete}
                size="large"
              >
                <FaRegTrashAlt />
              </IconButton>
            )}
            <IconButton
              aria-label="Bedarf"
              title={online ? 'Bedarf' : 'Bedarf (nur online verfügbar)'}
              onClick={onClickPrognosis}
              disabled={!online}
              size="large"
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
        </div>
      </ErrorBoundary>
    )
  },
)
