import { useState, useEffect } from 'react'
import { useAtomValue } from 'jotai'
import IconButton from '@mui/material/IconButton'
import { FaRegTrashAlt, FaChartLine } from 'react-icons/fa'
import { Q } from '@nozbe/watermelondb'
import { combineLatest, of as $of } from 'rxjs'
import { uniqBy } from 'es-toolkit'

import {
  dbAtom,
  errorsAtom,
  onlineAtom,
  filterTeilkulturAtom,
  filterTeilzaehlungAtom,
  initialDataQueriedAtom,
  unsetError,
} from '../../../../../../../store/index.js'
import { insertTeilkulturRev } from '../../../../../../../modules/insertRev.js'
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

import styles from './index.module.css'

export const TeilzaehlungForm = ({
  id,
  kulturId,
  activeConflict,
  setActiveConflict,
  showHistory,
  setShowHistory,
}) => {
  const errors = useAtomValue(errorsAtom)
  const online = useAtomValue(onlineAtom)
  const db = useAtomValue(dbAtom)
  const teilkulturFilter = useAtomValue(filterTeilkulturAtom)
  const teilzaehlungFilter = useAtomValue(filterTeilzaehlungAtom)
  const initialDataQueried = useAtomValue(initialDataQueriedAtom)

  const [dataState, setDataState] = useState({
    teilkulturWerte: [],
    kulturOption: undefined,
    row: undefined,
  })
  const { teilkulturWerte, kulturOption, row } = dataState

  useEffect(() => {
    const teilkulturDelQuery =
      teilkulturFilter._deleted === false
        ? Q.where('_deleted', false)
        : teilkulturFilter._deleted === true
          ? Q.where('_deleted', true)
          : Q.or(
              Q.where('_deleted', false),
              Q.where('_deleted', true),
              Q.where('_deleted', null),
            )
    const teilkultursObservable = db
      .get('teilkultur')
      .query(teilkulturDelQuery, Q.where('kultur_id', kulturId))
      .observeWithColumns(['name'])
    const kulturOptionObservable = kulturId
      ? db.get('kultur_option').findAndObserve(kulturId)
      : $of(null)
    const tzObservable = initialDataQueried
      ? db.get('teilzaehlung').findAndObserve(id)
      : $of({})
    const combinedObservables = combineLatest([
      teilkultursObservable,
      kulturOptionObservable,
      tzObservable,
    ])
    const subscription = combinedObservables.subscribe(
      async ([teilkulturs, kulturOption, teilzaehlung]) => {
        // use the emitted teilzaehlung, not row from the closure:
        // row is undefined until the first emission and reading it here
        // makes the react compiler evaluate row.teilkultur during render
        const teilkulturRelation = teilzaehlung?.teilkultur
        let teilkultur
        if (teilkulturRelation) {
          try {
            teilkultur = await teilkulturRelation.fetch()
          } catch {}
        }
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
  }, [db, teilkulturFilter, id, kulturId, initialDataQueried])

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
    row.edit({ field: 'teilkultur_id', value: teilkultur_id })
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

    row.edit({ field, value })
  }

  const onClickDelete = () => row.delete()

  const showDeleted = row?._deleted || teilzaehlungFilter._deleted !== false

  // guard before row-dependent computations: row is undefined until the
  // first db emission and the react compiler evaluates row-property
  // dependencies during render
  if (!row || !Object.keys(row ?? {}).length) return null

  const anzahl_jungpflanzen =
    exists(row?.anzahl_pflanzen) &&
    exists(row?.anzahl_auspflanzbereit) &&
    exists(row?.anzahl_mutterpflanzen)
      ? row?.anzahl_pflanzen -
        row?.anzahl_auspflanzbereit -
        row?.anzahl_mutterpflanzen
      : null

  return (
    <ErrorBoundary>
      <div className={styles.container}>
        {(activeConflict || showHistory) && (
          <h4 className={styles.caseConflictTitle}>
            Aktuelle Version<span className={styles.rev}>{row._rev}</span>
          </h4>
        )}
        {showDeleted && (
          <div className={styles.deletedContainer}>
            <Checkbox2States
              key={`${row.id}_deleted`}
              label="gelöscht"
              name="_deleted"
              value={row._deleted}
              saveToDb={saveToDb}
              error={errors?.teilzaehlung?._deleted}
            />
          </div>
        )}
        {tk && tz_teilkultur_id && (
          <div className={styles.teilkulturClass}>
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
        <div className={styles.anzahl}>
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
        <div className={styles.anzahl}>
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
        <div className={styles.anzahl}>
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
        <div className={styles.anzahl}>
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
          <div className={styles.other}>
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
          <div className={styles.auspflanzbereit}>
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
          <div className={styles.last}>
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
          <div className={styles.conflictListContainer}>
            <ConflictList
              conflicts={row._conflicts}
              activeConflict={activeConflict}
              setActiveConflict={setActiveConflict}
            />
          </div>
        )}
      </div>
    </ErrorBoundary>
  )
}
