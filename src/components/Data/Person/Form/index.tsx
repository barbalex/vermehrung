import { useEffect, useState } from 'react'
import { useAtomValue } from 'jotai'
import { combineLatest, of as $of } from 'rxjs'
import { Q } from 'nitromelondb'

import {
  dbAtom,
  errorsAtom,
  filterPersonAtom,
  onlineAtom,
  setError,
  setFilterValue,
  unsetError,
} from '../../../../store/index.ts'
import { TextField } from '../../../shared/TextField.tsx'
import { Select } from '../../../shared/Select/index.tsx'
import { Checkbox2States } from '../../../shared/Checkbox2States.tsx'
import { JesNo } from '../../../shared/JesNo.tsx'
import { ifIsNumericAsNumber } from '../../../../utils/ifIsNumericAsNumber.ts'
import { Files } from '../../Files/index.tsx'
import { PersonArten as Arten } from './Arten/index.tsx'
import { PersonGaerten as Gaerten } from './Gaerten/index.tsx'
import { ConflictList } from '../../../shared/ConflictList/index.tsx'
import { exists } from '../../../../utils/exists.ts'
import { userRoleSort } from '../../../../utils/userRoleSort.ts'

import artStyles from '../../Art/Form/index.module.css'

export const PersonForm = ({
  showFilter,
  id,
  row,
  activeConflict,
  setActiveConflict,
  showHistory,
}: {
  showFilter: boolean
  id?: string | undefined
  row: import('../../../../dbModel.ts').Person | null | undefined
  activeConflict: string | null
  setActiveConflict: (val: unknown) => void
  showHistory: boolean
}) => {
  const db = useAtomValue(dbAtom)
  const online = useAtomValue(onlineAtom)
  const errors = useAtomValue(errorsAtom)
  const personFilter = useAtomValue(filterPersonAtom)

  const [dataState, setDataState] = useState<{
    userRoleWerte: { value: string; label: string | undefined }[]
    userRole: import('../../../../dbModel.ts').UserRole | undefined
  }>({ userRoleWerte: [], userRole: undefined })
  useEffect(() => {
    const personsNrCountObservable =
      showFilter || !exists(row?.nr)
        ? $of(0)
        : db
            ?.get<import('../../../../dbModel.ts').Person>('person')
            .query(Q.where('_deleted', false), Q.where('nr', row.nr))
            .observeCount()
    const userRolesObservable = db
      ?.get<import('../../../../dbModel.ts').UserRole>('user_role')
      .query()
      .observe()
    const userRoleObservable = row?.user_role
      ? row?.user_role.observe()
      : $of(undefined)
    const combinedObservables = combineLatest([
      userRolesObservable,
      personsNrCountObservable,
      userRoleObservable,
    ])
    const subscription = (
      combinedObservables as unknown as import('rxjs').Observable<
        [
          import('../../../../dbModel.ts').UserRole[] | undefined,
          number,
          import('../../../../dbModel.ts').UserRole | undefined,
        ]
      >
    ).subscribe(
      async ([userRoles, nrCount, userRole]) => {
        const userRoleWerte = [...(userRoles ?? [])]
          .sort(userRoleSort)
          .map((el) => ({
            value: el.id,
            label: el.label ?? undefined,
          }))
        if (!showFilter && nrCount > 1) {
          setError({
            path: 'person.nr',
            value: `Diese Nummer wird ${nrCount} mal verwendet. Sie sollte aber über alle Personen eindeutig sein`,
          })
        }
        setDataState({
          userRoleWerte,
          userRole,
        })
      },
    )

    return () => subscription?.unsubscribe?.()
  }, [db, row?.nr, row?.user_role, showFilter])
  const { userRoleWerte, userRole } = dataState

  useEffect(() => {
    unsetError('person')
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

    if (showFilter) {
      return setFilterValue({ table: 'person', key: field as string, value })
    }

    const previousValue = ifIsNumericAsNumber(
      (row as unknown as Record<string, unknown>)[field as string] as string | number,
    )
    // only update if value has changed
    if (value === previousValue) return
    row?.edit({ field, value })
  }

  const showDeleted = personFilter._deleted !== false || row?._deleted

  return (
    <div className={artStyles.container}>
      {(activeConflict || showHistory) && (
        <h4 className={artStyles.caseConflictTitle}>
          Aktuelle Version<span className={artStyles.rev}>{row?._rev}</span>
        </h4>
      )}
      {showDeleted && (
        <>
          {showFilter ? (
            <JesNo
              key={`${row?.id}_deleted`}
              label="gelöscht"
              name="_deleted"
              value={row?._deleted}
              saveToDb={saveToDb}
              error={errors?.person?._deleted as string | undefined}
            />
          ) : (
            <Checkbox2States
              key={`${row?.id}_deleted`}
              label="gelöscht"
              name="_deleted"
              value={row?._deleted}
              saveToDb={saveToDb}
              error={errors?.person?._deleted as string | undefined}
            />
          )}
        </>
      )}
      <Select
        key={`${row?.id}${row?.user_role_id}user_role_id`}
        name="user_role_id"
        value={row?.user_role_id ?? null}
        field="user_role_id"
        label="Rolle"
        helperText={userRole?.comment || ' '}
        options={userRoleWerte}
        saveToDb={saveToDb}
        error={errors?.person?.user_role_id as string | undefined}
      />
      <TextField
        key={`${row?.id}nr`}
        name="nr"
        label="Nr"
        value={row?.nr ?? null}
        saveToDb={saveToDb}
        error={errors?.person?.nr as string | undefined}
      />
      <TextField
        key={`${row?.id}vorname`}
        name="vorname"
        label="Vorname"
        value={row?.vorname ?? null}
        saveToDb={saveToDb}
        error={errors?.person?.vorname as string | undefined}
      />
      <TextField
        key={`${row?.id}name`}
        name="name"
        label="Nachname"
        value={row?.name ?? null}
        saveToDb={saveToDb}
        error={errors?.person?.name as string | undefined}
      />
      <TextField
        key={`${row?.id}adresszusatz`}
        name="adresszusatz"
        label="Adress-Zusatz"
        value={row?.adresszusatz ?? null}
        saveToDb={saveToDb}
        error={errors?.person?.adresszusatz as string | undefined}
      />
      <TextField
        key={`${row?.id}strasse`}
        name="strasse"
        label="Strasse"
        value={row?.strasse ?? null}
        saveToDb={saveToDb}
        error={errors?.person?.strasse as string | undefined}
      />
      <TextField
        key={`${row?.id}plz`}
        name="plz"
        label="PLZ"
        value={row?.plz ?? null}
        saveToDb={saveToDb}
        error={errors?.person?.plz as string | undefined}
        type="number"
      />
      <TextField
        key={`${row?.id}ort`}
        name="ort"
        label="Ort"
        value={row?.ort ?? null}
        saveToDb={saveToDb}
        error={errors?.person?.ort as string | undefined}
      />
      <TextField
        key={`${row?.id}telefon_privat`}
        name="telefon_privat"
        label="Telefon privat"
        value={row?.telefon_privat ?? null}
        saveToDb={saveToDb}
        error={errors?.person?.telefon_privat as string | undefined}
      />
      <TextField
        key={`${row?.id}telefon_geschaeft`}
        name="telefon_geschaeft"
        label="Telefon Geschäft"
        value={row?.telefon_geschaeft ?? null}
        saveToDb={saveToDb}
        error={errors?.person?.telefon_geschaeft as string | undefined}
      />
      <TextField
        key={`${row?.id}telefon_mobile`}
        name="telefon_mobile"
        label="Telefon mobile"
        value={row?.telefon_mobile ?? null}
        saveToDb={saveToDb}
        error={errors?.person?.telefon_mobile as string | undefined}
      />
      <TextField
        key={`${row?.id}email`}
        name="email"
        label="Email"
        value={row?.email ?? null}
        saveToDb={saveToDb}
        error={errors?.person?.email as string | undefined}
      />
      {showFilter ? (
        <JesNo
          key={`${row?.id}kein_email`}
          label="Kein Email"
          name="kein_email"
          value={row?.kein_email}
          saveToDb={saveToDb}
          error={errors?.person?.kein_email as string | undefined}
        />
      ) : (
        <Checkbox2States
          key={`${row?.id}kein_email`}
          label="Kein Email"
          name="kein_email"
          value={row?.kein_email}
          saveToDb={saveToDb}
          error={errors?.person?.kein_email as string | undefined}
        />
      )}
      {showFilter ? (
        <JesNo
          key={`${row?.id}kommerziell`}
          label="Kommerziell"
          name="kommerziell"
          value={row?.kommerziell}
          saveToDb={saveToDb}
          error={errors?.person?.kommerziell as string | undefined}
        />
      ) : (
        <Checkbox2States
          key={`${row?.id}kommerziell`}
          label="Kommerziell"
          name="kommerziell"
          value={row?.kommerziell}
          saveToDb={saveToDb}
          error={errors?.person?.kommerziell as string | undefined}
        />
      )}
      {showFilter ? (
        <JesNo
          key={`${row?.id}info`}
          label="Info"
          name="info"
          value={row?.info}
          saveToDb={saveToDb}
          error={errors?.person?.info as string | undefined}
        />
      ) : (
        <Checkbox2States
          key={`${row?.id}info`}
          label="Info"
          name="info"
          value={row?.info}
          saveToDb={saveToDb}
          error={errors?.person?.info as string | undefined}
        />
      )}
      {showFilter ? (
        <JesNo
          key={`${row?.id}aktiv`}
          label="aktiv"
          name="aktiv"
          value={row?.aktiv}
          saveToDb={saveToDb}
          error={errors?.person?.aktiv as string | undefined}
        />
      ) : (
        <Checkbox2States
          key={`${row?.id}aktiv`}
          label="aktiv"
          name="aktiv"
          value={row?.aktiv}
          saveToDb={saveToDb}
          error={errors?.person?.aktiv as string | undefined}
        />
      )}
      <TextField
        key={`${row?.id}bemerkungen`}
        name="bemerkungen"
        label="Bemerkungen"
        value={row?.bemerkungen ?? null}
        saveToDb={saveToDb}
        error={errors?.person?.bemerkungen as string | undefined}
        multiLine
      />
      {online && !showFilter && row?._conflicts?.map && (
        <ConflictList
          conflicts={row?._conflicts}
          activeConflict={activeConflict}
          setActiveConflict={setActiveConflict}
        />
      )}
      {userRole?.name === 'artverantwortlich' && <Arten person={row} />}
      {['gaertner', 'artverantwortlich'].includes(userRole?.name ?? '') && (
        <Gaerten person={row} />
      )}
      {!showFilter && row?.id && <Files parentTable="person" parent={row} />}
    </div>
  )
}
