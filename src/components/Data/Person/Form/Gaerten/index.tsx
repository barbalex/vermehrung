import { useState, useEffect } from 'react'
import { useAtomValue } from 'jotai'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'
import IconButton from '@mui/material/IconButton'
import { motion, useAnimation } from 'framer-motion'
import { Q } from '@nozbe/watermelondb'
import { first as first$ } from 'rxjs/operators'
import { combineLatest } from 'rxjs'

import { dbAtom, filterGartenAtom } from '../../../../../store/index.ts'
import { insertGvRev } from '../../../../../modules/insertRev.ts'
import { PersonGarten as Garten } from './Garten.tsx'
import { Select } from '../../../../shared/Select/index.tsx'
import { ErrorBoundary } from '../../../../shared/ErrorBoundary.tsx'
import { gartensSortedFromGartens } from '../../../../../utils/gartensSortedFromGartens.ts'
import { gvsSortByGarten } from '../../../../../utils/gvsSortByGarten.ts'

import styles from './index.module.css'

export const PersonGaerten = ({
  person,
}: {
  person: import('../../../../shared/types.ts').WmRow | null | undefined
}) => {
  const db = useAtomValue(dbAtom)
  const gartenFilter = useAtomValue(filterGartenAtom)

  const [errors, setErrors] = useState({})
  useEffect(() => setErrors({}), [person?.id])

  const [open, setOpen] = useState(false)
  const anim = useAnimation()
  const onClickToggle = async (e: {
    target: { name?: string; value: unknown }
    currentTarget?: HTMLElement
    preventDefault?: () => void
    stopPropagation?: () => void
    key?: string
  }) => {
    e.stopPropagation()
    if (open) {
      const was = open
      await anim.start({ opacity: 0 })
      await anim.start({ height: 0 })
      setOpen(!was)
    } else {
      setOpen(!open)
      setTimeout(async () => {
        await anim.start({ height: 'auto' })
        await anim.start({ opacity: 1 })
      })
    }
  }

  const [dataState, setDataState] = useState({ gvs: [], gartenWerte: [] })
  const { gvs, gartenWerte } = dataState
  const gvGartenIds = gvs.map((v) => v.garten_id)
  useEffect(() => {
    const gvsObservable = person?.gvs
      .extend(Q.where('_deleted', false))
      .observe()
    const gartenDelQuery =
      gartenFilter._deleted === false
        ? Q.where('_deleted', false)
        : gartenFilter._deleted === true
          ? Q.where('_deleted', true)
          : Q.or(
              Q.where('_deleted', false),
              Q.where('_deleted', true),
              Q.where('_deleted', null),
            )
    const gartenAktivQuery =
      gartenFilter.aktiv === false
        ? Q.where('aktiv', false)
        : gartenFilter.aktiv === true
          ? Q.where('aktiv', true)
          : Q.or(
              Q.where('aktiv', false),
              Q.where('aktiv', true),
              Q.where('aktiv', null),
            )
    const gartensObservable = db
      ?.get<import('../../../../../dbModel.ts').Garten>('garten')
      .query(
        gartenDelQuery,
        gartenAktivQuery,
        Q.where('id', Q.notIn(gvGartenIds)),
      )
      .observe()
    const combinedObservables = combineLatest([
      gvsObservable,
      gartensObservable,
    ])
    const subscription = combinedObservables.subscribe(
      async ([gvs, gartens]) => {
        const gvsSorted = await gvsSortByGarten(gvs)
        const gartensSorted = await gartensSortedFromGartens(gartens)
        const gartenWerte = await Promise.all(
          gartensSorted.map(async (garten) => {
            let label
            try {
              label = await garten.label.pipe(first$()).toPromise()
            } catch {}

            return {
              value: garten.id,
              label,
              inaktiv: garten.aktiv === false,
              link: ['Gaerten', garten.id],
            }
          }),
        )
        setDataState({ gvs: gvsSorted, gartenWerte })
      },
    )

    return () => subscription?.unsubscribe?.()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [person?.gvs, gvGartenIds.length, db, gartenFilter])

  const saveToDb = (event: {
    target: { name?: string; value: unknown }
    currentTarget?: HTMLElement
    preventDefault?: () => void
    stopPropagation?: () => void
    key?: string
  }) => {
    insertGvRev({
      values: { garten_id: event.target.value, person_id: person?.id },
    })
    setErrors({})
  }

  return (
    <ErrorBoundary>
      <section
        onClick={onClickToggle}
        title={open ? 'schliessen' : 'öffnen'}
        className={styles.titleRow}
      >
        <div
          className={styles.title}
        >{`Mitarbeitend bei ${gvs.length} Gärten`}</div>
        <div>
          <IconButton
            aria-label={open ? 'schliessen' : 'öffnen'}
            title={open ? 'schliessen' : 'öffnen'}
            onClick={onClickToggle}
            size="large"
          >
            {open ? <FaChevronUp /> : <FaChevronDown />}
          </IconButton>
        </div>
      </section>
      <motion.div
        animate={anim}
        transition={{ type: 'just', duration: 0.2 }}
        className={styles.motionDiv}
      >
        {open && (
          <>
            <div className={styles.gvsClass}>
              {gvs.map((gv, index) => (
                <Garten
                  key={`${gv.person_id}/${gv.garten_id}/${index}`}
                  gv={gv}
                />
              ))}
            </div>
            {!!gartenWerte.length && (
              <Select
                name="garten_id"
                value={''}
                field="garten_id"
                label="Garten hinzufügen"
                options={gartenWerte}
                saveToDb={saveToDb}
                isClearable={false}
                error={errors.garten_id}
              />
            )}
          </>
        )}
      </motion.div>
    </ErrorBoundary>
  )
}
