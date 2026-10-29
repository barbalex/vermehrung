import { useState, useEffect } from 'react'
import { useAtomValue } from 'jotai'
import { Q } from 'nitromelondb'
import { first as first$ } from 'rxjs/operators'
import { combineLatest } from 'rxjs'
import { uniqBy } from 'es-toolkit'

import {
  dbAtom,
  errorsAtom,
  filterKulturAtom,
  filterSammlungAtom,
} from '../../../../store/index.ts'
import { Select } from '../../../shared/Select/index.tsx'
import { Checkbox2States } from '../../../shared/Checkbox2States.tsx'
import { JesNo } from '../../../shared/JesNo.tsx'
import { exists } from '../../../../utils/exists.ts'
import { kultursSortedFromKulturs } from '../../../../utils/kultursSortedFromKulturs.ts'

import wannStyles from '../../Lieferung/Lieferung/Form/Wann.module.css'

export const SammelLieferungNach = ({
  showFilter,
  row,
  ifNeeded,
  saveToDb,
  herkunft,
}: {
  showFilter: boolean
  row: import('../../../../dbModel.ts').SammelLieferung | null | undefined
  ifNeeded: (field: string) => boolean
  saveToDb: (event: { target: { name?: string; value: unknown } }) => void
  herkunft: import('../../../../dbModel.ts').Herkunft | null | undefined
}) => {
  const db = useAtomValue(dbAtom)
  const errors = useAtomValue(errorsAtom)
  const kulturFilter = useAtomValue(filterKulturAtom)
  const sammlungFilter = useAtomValue(filterSammlungAtom)

  const [dataState, setDataState] = useState<{
    nachKulturWerte: {
      value: string
      label: string | undefined
      inaktiv?: boolean
      link?: string[]
    }[]
  }>({ nachKulturWerte: [] })
  useEffect(() => {
    const kulturDelQuery =
      kulturFilter._deleted === false
        ? Q.where('_deleted', false)
        : kulturFilter._deleted === true
          ? Q.where('_deleted', true)
          : Q.or(
              Q.where('_deleted', false),
              Q.where('_deleted', true),
              Q.where('_deleted', null),
            )
    const sammlungDelQuery =
      sammlungFilter._deleted === false
        ? Q.where('_deleted', false)
        : sammlungFilter._deleted === true
          ? Q.where('_deleted', true)
          : Q.or(
              Q.where('_deleted', false),
              Q.where('_deleted', true),
              Q.where('_deleted', null),
            )
    // BEWARE: need to include inactive kulturs
    const kultursObservable = db?.get('kultur').query(kulturDelQuery).observe()
    const sammlungsObservable = db
      ?.get<import('../../../../dbModel.ts').Sammlung>('sammlung')
      .query(sammlungDelQuery)
      .observe()
    const combinedObservables = combineLatest([
      kultursObservable,
      sammlungsObservable,
    ])
    const subscription = (combinedObservables as unknown as import('rxjs').Observable<
        [import('../../../../dbModel.ts').Kultur[]]
      >).subscribe(async ([kulturs]) => {
      const kultursFiltered = kulturs
        // show only kulturen of art_id
        .filter((k) => {
          if (row?.art_id) return k.art_id === row.art_id
          return true
        })
        // show only kulturen with same herkunft
        .filter((k) => {
          if (herkunft?.id) return k.herkunft_id === herkunft.id
          return true
        })
        // shall not be delivered to same kultur it came from
        .filter((k) => {
          if (
            row?.von_kultur_id &&
            row?.von_kultur_id !== row?.nach_kultur_id
          ) {
            return k.id !== row.von_kultur_id
          }
          return true
        })
      let kultur
      try {
        kultur = await db?.get('kultur').find(row?.von_kultur_id as string)
      } catch {}
      const kultursIncludingChoosen = uniqBy(
        [...kultursFiltered, ...(kultur && !showFilter ? [kultur] : [])],
        (e) => e.id,
      )
      const kultursSorted = await kultursSortedFromKulturs(
        kultursIncludingChoosen as unknown as import('../../../../dbModel.ts').Kultur[],
      )
      const nachKulturWerte = await Promise.all(
        kultursSorted.map(async (el) => {
          let label
          try {
            label = await el.label.pipe(first$()).toPromise()
          } catch {}

          return {
            value: el.id,
            label,
            inaktiv: el.aktiv === false,
            link: ['Kulturen', el.id],
          }
        }),
      )

      setDataState({
        nachKulturWerte,
      })
    })

    return () => subscription?.unsubscribe?.()
  }, [
    db,
    kulturFilter,
    sammlungFilter,
    herkunft?.id,
    row?.art_id,
    row?.nach_kultur_id,
    row?.von_kultur_id,
    showFilter,
  ])
  const { nachKulturWerte } = dataState

  return (
    <>
      <div
        className={wannStyles.titleRow}
        style={{
          backgroundColor: showFilter
            ? 'var(--filter-bg-alt)'
            : 'var(--form-bg)',
        }}
      >
        <div className={wannStyles.title}>nach</div>
      </div>
      {ifNeeded('nach_kultur_id') && (
        <Select
          key={`${row?.id}${row?.nach_kultur_id}nach_kultur_id`}
          name="nach_kultur_id"
          value={row?.nach_kultur_id ?? null}
          field="nach_kultur_id"
          label={`Kultur${
            exists(row?.art_id)
              ? ` (Kulturen derselben Art und Herkunft${
                  row?.von_kultur_id ? ', ohne die von-Kultur' : ''
                })`
              : ''
          }`}
          options={nachKulturWerte}
          saveToDb={saveToDb}
          error={errors?.sammel_lieferung?.nach_kultur_id as string | undefined}
        />
      )}
      {ifNeeded('nach_ausgepflanzt') && (
        <>
          {showFilter ? (
            <JesNo
              key={`${row?.id}nach_ausgepflanzt`}
              label="Ausgepflanzt"
              name="nach_ausgepflanzt"
              value={row?.nach_ausgepflanzt}
              saveToDb={saveToDb}
              error={
                errors?.sammel_lieferung?.nach_ausgepflanzt as
                  string | undefined
              }
            />
          ) : (
            <Checkbox2States
              key={`${row?.id}nach_ausgepflanzt`}
              label="Ausgepflanzt"
              name="nach_ausgepflanzt"
              value={row?.nach_ausgepflanzt}
              saveToDb={saveToDb}
              error={
                errors?.sammel_lieferung?.nach_ausgepflanzt as
                  string | undefined
              }
            />
          )}
        </>
      )}
    </>
  )
}
