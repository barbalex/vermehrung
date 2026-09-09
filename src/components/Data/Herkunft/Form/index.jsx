import { useEffect, useState } from 'react'
import { useAtomValue } from 'jotai'
import { combineLatest, of as $of } from 'rxjs'
import { Q } from '@nozbe/watermelondb'

import {
  filterHerkunftAtom,
  onlineAtom,
  errorsAtom,
  setError,
  unsetError,
  dbAtom,
  userAtom,
  setFilterValue,
} from '../../../../store/index.js'
import { TextField } from '../../../shared/TextField.jsx'
import { Checkbox2States } from '../../../shared/Checkbox2States.jsx'
import { JesNo } from '../../../shared/JesNo.jsx'
import { ifIsNumericAsNumber } from '../../../../utils/ifIsNumericAsNumber.js'
import { exists } from '../../../../utils/exists.js'
import { Files } from '../../Files/index.jsx'
import { Coordinates } from '../../../shared/Coordinates.jsx'
import { ConflictList } from '../../../shared/ConflictList/index.jsx'

import artStyles from '../../Art/Form/index.module.css'

export const HerkunftForm = ({
  showFilter,
  id,
  row,
  rawRow,
  activeConflict,
  setActiveConflict,
  showHistory,
}) => {
  const herkunftFilter = useAtomValue(filterHerkunftAtom)
  const online = useAtomValue(onlineAtom)
  const errors = useAtomValue(errorsAtom)
  const db = useAtomValue(dbAtom)
  const user = useAtomValue(userAtom)

  const [dataState, setDataState] = useState({
    userPersonOption: undefined,
  })
  useEffect(() => {
    const userPersonOptionsObservable = user.uid
      ? db
          .get('person_option')
          .query(Q.on('person', Q.where('account_id', user.uid)))
          .observeWithColumns([
            'hk_kanton',
            'hk_land',
            'hk_bemerkungen',
            'hk_geom_point',
          ])
      : $of({})
    const delQuery =
      herkunftFilter._deleted === false
        ? Q.where('_deleted', false)
        : herkunftFilter._deleted === true
          ? Q.where('_deleted', true)
          : Q.or(
              Q.where('_deleted', false),
              Q.where('_deleted', true),
              Q.where('_deleted', null),
            )
    const herkunftsNrCountObservable =
      showFilter || !exists(row?.nr)
        ? $of(0)
        : db
            .get('herkunft')
            .query(delQuery, Q.where('nr', row.nr))
            .observeCount()
    const combinedObservables = combineLatest([
      userPersonOptionsObservable,
      herkunftsNrCountObservable,
    ])
    const subscription = combinedObservables.subscribe(
      async ([userPersonOptions, nrCount]) => {
        if (!showFilter && nrCount > 1) {
          setError({
            path: 'herkunft.nr',
            value: `Diese Nummer wird ${nrCount} mal verwendet. Sie sollte aber über alle Herkünfte eindeutig sein`,
          })
        }
        setDataState({
          userPersonOption: userPersonOptions?.[0],
        })
      },
    )

    return () => subscription?.unsubscribe?.()
  }, [db, herkunftFilter, row.nr, showFilter, user])
  const { userPersonOption } = dataState

  const { hk_kanton, hk_land, hk_bemerkungen, hk_geom_point } =
    userPersonOption ?? {}

  useEffect(() => {
    unsetError('herkunft')
  }, [id])

  const saveToDb = async (event) => {
    const field = event.target.name
    let value = ifIsNumericAsNumber(event.target.value)
    if (event.target.value === undefined) value = null
    if (event.target.value === '') value = null

    if (showFilter) {
      return setFilterValue({ table: 'herkunft', key: field, value })
    }

    const previousValue = ifIsNumericAsNumber(row._raw[field])
    // only update if value has changed
    if (value === previousValue) return
    await row.edit({ field, value })
  }

  const showDeleted = herkunftFilter._deleted !== false || row?._deleted

  return (
    <div className={artStyles.container}>
      {(activeConflict || showHistory) && (
        <h4 className={artStyles.caseConflictTitle}>
          Aktuelle Version<span className={artStyles.rev}>{row._rev}</span>
        </h4>
      )}
      {showDeleted && (
        <>
          {showFilter ? (
            <JesNo
              key={`${row.id}_deleted`}
              label="gelöscht"
              name="_deleted"
              value={row._deleted}
              saveToDb={saveToDb}
              error={errors?.herkunft?._deleted}
            />
          ) : (
            <Checkbox2States
              key={`${row.id}_deleted`}
              label="gelöscht"
              name="_deleted"
              value={row._deleted}
              saveToDb={saveToDb}
              error={errors?.herkunft?._deleted}
            />
          )}
        </>
      )}
      <TextField
        key={`${row.id}nr`}
        name="nr"
        label="Nr"
        value={row.nr}
        saveToDb={saveToDb}
        error={errors?.herkunft?.nr}
      />
      <TextField
        key={`${row.id}lokalname`}
        name="lokalname"
        label="Lokalname"
        value={row.lokalname}
        saveToDb={saveToDb}
        error={errors?.herkunft?.lokalname}
      />
      <TextField
        key={`${row.id}gemeinde`}
        name="gemeinde"
        label="Gemeinde"
        value={row.gemeinde}
        saveToDb={saveToDb}
        error={errors?.herkunft?.gemeinde}
      />
      {hk_kanton && (
        <TextField
          key={`${row.id}kanton`}
          name="kanton"
          label="Kanton"
          value={row.kanton}
          saveToDb={saveToDb}
          error={errors?.herkunft?.kanton}
        />
      )}
      {hk_land && (
        <TextField
          key={`${row.id}land`}
          name="land"
          label="Land"
          value={row.land}
          saveToDb={saveToDb}
          error={errors?.herkunft?.land}
        />
      )}
      {!showFilter && hk_geom_point && (
        <Coordinates row={row} rawRow={rawRow} saveToDb={saveToDb} />
      )}
      {hk_bemerkungen && (
        <TextField
          key={`${row.id}bemerkungen`}
          name="bemerkungen"
          label="Bemerkungen"
          value={row.bemerkungen}
          saveToDb={saveToDb}
          error={errors?.herkunft?.bemerkungen}
          multiLine
        />
      )}
      {online && !showFilter && row?._conflicts?.map && (
        <ConflictList
          conflicts={row._conflicts}
          activeConflict={activeConflict}
          setActiveConflict={setActiveConflict}
        />
      )}
      {!showFilter && row.id && <Files parentTable="herkunft" parent={row} />}
    </div>
  )
}
