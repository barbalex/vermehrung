import { useState, useEffect, useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'
import IconButton from '@mui/material/IconButton'
import { motion, useAnimation } from 'framer-motion'
import { Q } from '@nozbe/watermelondb'
import { first as first$ } from 'rxjs/operators'
import { combineLatest } from 'rxjs'

import { MobxStoreContext } from '../../../../../mobxStoreContext.js'
import { PersonGarten as Garten } from './Garten.jsx'
import { Select } from '../../../../shared/Select/index.jsx'
import { ErrorBoundary } from '../../../../shared/ErrorBoundary.jsx'
import { gartensSortedFromGartens } from '../../../../../utils/gartensSortedFromGartens.js'
import { gvsSortByGarten } from '../../../../../utils/gvsSortByGarten.js'

import { titleRow, title, gvsClass, motionDiv } from './index.module.css'

export const PersonGaerten = observer(({ person }) => {
  const store = useContext(MobxStoreContext)
  const { insertGvRev, db, filter } = store

  const [errors, setErrors] = useState({})
  useEffect(() => setErrors({}), [person.id])

  const [open, setOpen] = useState(false)
  const anim = useAnimation()
  const onClickToggle = async (e) => {
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
    const gvsObservable = person.gvs
      .extend(Q.where('_deleted', false))
      .observe()
    const gartenDelQuery =
      filter.garten._deleted === false ? Q.where('_deleted', false)
      : filter.garten._deleted === true ? Q.where('_deleted', true)
      : Q.or(
          Q.where('_deleted', false),
          Q.where('_deleted', true),
          Q.where('_deleted', null),
        )
    const gartenAktivQuery =
      filter.garten.aktiv === false ? Q.where('aktiv', false)
      : filter.garten.aktiv === true ? Q.where('aktiv', true)
      : Q.or(
          Q.where('aktiv', false),
          Q.where('aktiv', true),
          Q.where('aktiv', null),
        )
    const gartensObservable = db
      .get('garten')
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
  }, [
    person.gvs,
    gvGartenIds.length,
    db,
    filter.garten._deleted,
    filter.garten.aktiv,
  ])

  const saveToDb = (event) => {
    insertGvRev({
      values: { garten_id: event.target.value, person_id: person.id },
    })
    setErrors({})
  }

  return (
    <ErrorBoundary>
      <section
        onClick={onClickToggle}
        title={open ? 'schliessen' : 'öffnen'}
        className={titleRow}
      >
        <div className={title}>{`Mitarbeitend bei ${gvs.length} Gärten`}</div>
        <div>
          <IconButton
            aria-label={open ? 'schliessen' : 'öffnen'}
            title={open ? 'schliessen' : 'öffnen'}
            onClick={onClickToggle}
            size="large"
          >
            {open ?
              <FaChevronUp />
            : <FaChevronDown />}
          </IconButton>
        </div>
      </section>
      <motion.div
        animate={anim}
        transition={{ type: 'just', duration: 0.2 }}
        className={motionDiv}
      >
        {open && (
          <>
            <div className={gvsClass}>
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
})
