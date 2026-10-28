import { useState, useEffect } from 'react'
import { useAtomValue } from 'jotai'
import IconButton from '@mui/material/IconButton'
import { FaRegTrashAlt } from 'react-icons/fa'
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
} from '../../../../../../../store/index.ts'
import { insertTeilkulturRev } from '../../../../../../../modules/insertRev.ts'
import { TextField } from '../../../../../../shared/TextField.tsx'
import { TextFieldNonUpdatable } from '../../../../../../shared/TextFieldNonUpdatable.tsx'
import { Checkbox2States } from '../../../../../../shared/Checkbox2States.tsx'
import { SelectCreatable } from '../../../../../../shared/SelectCreatable.tsx'
import { ConflictList } from '../../../../../../shared/ConflictList/index.tsx'
import { HistoryButton } from '../../../../../../shared/HistoryButton.tsx'
import { ifIsNumericAsNumber } from '../../../../../../../utils/ifIsNumericAsNumber.ts'
import { teilkulturSort } from '../../../../../../../utils/teilkulturSort.ts'
import { teilkulturLabelFromTeilkultur } from '../../../../../../../utils/teilkulturLabelFromTeilkultur.ts'
import { ErrorBoundary } from '../../../../../../shared/ErrorBoundary.tsx'
import { exists } from '../../../../../../../utils/exists.ts'

import styles from './index.module.css'

export const TeilzaehlungForm = ({
  id,
  kulturId,
  activeConflict,
  setActiveConflict,
  showHistory,
  setShowHistory,
}: {
  id?: string | undefined
  kulturId: string | null | undefined
  activeConflict: string | null
  setActiveConflict: (val: unknown) => void
  showHistory: boolean
  setShowHistory: (val: unknown) => void
}) => {
  const errors = useAtomValue(errorsAtom)
  const online = useAtomValue(onlineAtom)
  const db = useAtomValue(dbAtom)
  const teilkulturFilter = useAtomValue(filterTeilkulturAtom)
  const teilzaehlungFilter = useAtomValue(filterTeilzaehlungAtom)
  const initialDataQueried = useAtomValue(initialDataQueriedAtom)

  const [dataState, setDataState] = useState<{
    teilkulturWerte: { value: string; label: string | undefined; link?: string[] }[]
    kulturOption: import('../../../../../../../dbModel.ts').KulturOption | undefined
    row: import('../../../../../../../dbModel.ts').Teilzaehlung | undefined
  }>({
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
      ?.get<import('../../../../../../../dbModel.ts').Teilkultur>('teilkultur')
      .query(teilkulturDelQuery, Q.where('kultur_id', kulturId ?? ''))
      .observeWithColumns(['name'])
    const kulturOptionObservable = kulturId
      ? db?.get<import('../../../../../../../dbModel.ts').KulturOption>('kultur_option').findAndObserve(kulturId)
      : $of(null)
    const tzObservable = initialDataQueried
      ? db?.get<import('../../../../../../../dbModel.ts').Teilzaehlung>('teilzaehlung').findAndObserve(id ?? '')
      : $of({})
    const combinedObservables = combineLatest([
      teilkultursObservable,
      kulturOptionObservable,
      tzObservable,
    ])
    const subscription = (combinedObservables as unknown as import('rxjs').Observable<
        [
          import('../../../../../../../dbModel.ts').Teilkultur[],
          import('../../../../../../../dbModel.ts').KulturOption | undefined,
          import('../../../../../../../dbModel.ts').Teilzaehlung | undefined,
        ]
      >).subscribe(async ([teilkulturs, kulturOption, teilzaehlung]) => {
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

  const kulturOptionRecord = kulturOption as unknown as Record<string, unknown>
  const {
    tk,
    tz_teilkultur_id,
    tz_andere_menge,
    tz_auspflanzbereit_beschreibung,
    tz_bemerkungen,
  } = kulturOptionRecord ?? {}

  const onCreateNewTeilkultur = async ({
    name,
  }: {
    name: string
  }) => {
    const teilkultur_id = await insertTeilkulturRev({
      noNavigateInTree: true,
      values: {
        name,
        kultur_id: kulturId,
      },
    })
    row?.edit({ field: 'teilkultur_id', value: teilkultur_id })
  }

  useEffect(() => {
    unsetError('teilzaehlung')
  }, [id])

  const saveToDb = (event: {
    target: { name?: string; value: unknown }
    currentTarget?: HTMLElement
    preventDefault?: () => void
    stopPropagation?: () => void
    key?: string
  }) => {
    const field = event.target.name
    let value: string | number | null = ifIsNumericAsNumber(
      event.target.value as string | number,
    )
    if (event.target.value === undefined) value = null
    if (event.target.value === '') value = null
    const previousValue = ifIsNumericAsNumber(
      (row as unknown as Record<string, unknown>)[field as string] as string | number,
    )
    // only update if value has changed
    if (value === previousValue) return

    row?.edit({ field, value })
  }

  const onClickDelete = () => row?.delete()

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
            Aktuelle Version<span className={styles.rev}>{row?._rev}</span>
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
              error={errors?.teilzaehlung?._deleted as string | undefined}
            />
          </div>
        )}
        {!!tk && !!tz_teilkultur_id && (
          <div className={styles.teilkulturClass}>
            <SelectCreatable
              key={`${row.id}${row.teilkultur_id}teilkultur_id`}
              row={row as unknown as Record<string, unknown>}
              field="teilkultur_id"
              label="Teilkultur"
              options={teilkulturWerte}
              error={errors?.teilzaehlung?.teilkultur_id as string | undefined}
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
            error={errors?.teilzaehlung?.anzahl_pflanzen as string | undefined}
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
            error={
              errors?.teilzaehlung?.anzahl_auspflanzbereit as string | undefined
            }
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
            error={
              errors?.teilzaehlung?.anzahl_mutterpflanzen as string | undefined
            }
            type="number"
          />
        </div>
        <div className={styles.anzahl}>
          <TextFieldNonUpdatable
            key={`${row.id}anzahl_jungpflanzen`}
            label="Anzahl Jungpflanzen"
            schrinkLabel={true}
            value={anzahl_jungpflanzen as number | null}
            type="number"
            message="Wird berechnet aus: Anzahl Pflanzen - auspflanzbereit - Mutterpflanzen"
          />
        </div>
        {!!tz_andere_menge && (
          <div className={styles.other}>
            <TextField
              key={`${row.id}andere_menge`}
              name="andere_menge"
              label={`Andere Menge (z.B. "3 Zwiebeln")`}
              labelWeight={700}
              value={row.andere_menge}
              saveToDb={saveToDb}
              error={errors?.teilzaehlung?.andere_menge as string | undefined}
              type="text"
            />
          </div>
        )}
        {!!tz_auspflanzbereit_beschreibung && (
          <div className={styles.auspflanzbereit}>
            <TextField
              key={`${row.id}auspflanzbereit_beschreibung`}
              name="auspflanzbereit_beschreibung"
              label="Beschreibung auspflanzbereite Pflanzen (z.B. Topfgrösse)"
              labelWeight={700}
              value={row.auspflanzbereit_beschreibung}
              saveToDb={saveToDb}
              error={
                errors?.teilzaehlung?.auspflanzbereit_beschreibung as
                  string | undefined
              }
              type="text"
            />
          </div>
        )}
        {!!tz_bemerkungen && (
          <div className={styles.last}>
            <TextField
              key={`${row.id}bemerkungen`}
              name="bemerkungen"
              label="Bemerkungen"
              labelWeight={700}
              value={row.bemerkungen}
              saveToDb={saveToDb}
              error={errors?.teilzaehlung?.bemerkungen as string | undefined}
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
        </div>
        {online && row?._conflicts?.map && (
          <div className={styles.conflictListContainer}>
            <ConflictList
              conflicts={row?._conflicts}
              activeConflict={activeConflict}
              setActiveConflict={setActiveConflict}
            />
          </div>
        )}
      </div>
    </ErrorBoundary>
  )
}
