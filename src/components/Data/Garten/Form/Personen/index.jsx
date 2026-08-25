import { useState, useEffect } from 'react'
import { useAtomValue } from 'jotai'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'
import IconButton from '@mui/material/IconButton'
import { motion, useAnimation } from 'framer-motion'
import { Q } from '@nozbe/watermelondb'
import { combineLatest, of as $of } from 'rxjs'

import { dbAtom, filterPersonAtom } from '../../../../../store/index.js'
import { insertGvRev } from '../../../../../modules/insertRev.js'
import { GartenPerson as Person } from './Person.jsx'
import { Select } from '../../../../shared/Select/index.jsx'
import { ErrorBoundary } from '../../../../shared/ErrorBoundary.jsx'
import { gvsSortByPerson } from '../../../../../utils/gvsSortByPerson.js'
import { personSort } from '../../../../../utils/personSort.js'
import { personLabelFromPerson } from '../../../../../utils/personLabelFromPerson.js'

import styles from './index.module.css'

export const GartenPersonen = ({ garten }) => {
  const db = useAtomValue(dbAtom)
  const personFilter = useAtomValue(filterPersonAtom)

  const [errors, setErrors] = useState({})
  useEffect(() => setErrors({}), [garten.id])

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

  const [dataState, setDataState] = useState({
    gvsSorted: [],
    personWerte: [],
  })
  useEffect(() => {
    const delQuery =
      personFilter._deleted === false
        ? Q.where('_deleted', false)
        : personFilter._deleted === true
          ? Q.where('_deleted', true)
          : Q.or(
              Q.where('_deleted', false),
              Q.where('_deleted', true),
              Q.where('_deleted', null),
            )
    const aktivQuery =
      personFilter.aktiv === false
        ? Q.where('aktiv', false)
        : personFilter.aktiv === true
          ? Q.where('aktiv', true)
          : Q.or(
              Q.where('aktiv', false),
              Q.where('aktiv', true),
              Q.where('aktiv', null),
            )
    const personsObservable = db
      .get('person')
      .query(delQuery, aktivQuery)
      .observe()
    const gvsObservable = garten?.gvs
      ? garten.gvs.extend(Q.where('_deleted', false)).observe()
      : $of([])
    const combinedObservables = combineLatest([
      gvsObservable,
      personsObservable,
    ])
    const subscription = combinedObservables.subscribe(
      async ([gvs, persons]) => {
        const gvsSorted = await gvsSortByPerson(gvs)
        const gvPersonIds = gvsSorted.map((v) => v.person_id)
        const personWerte = persons
          .filter((a) => !gvPersonIds.includes(a.id))
          .sort(personSort)
          .map((el) => ({
            value: el.id,
            label: personLabelFromPerson({ person: el }),
            inaktiv: el.aktiv === false,
          }))

        setDataState({ gvsSorted, personWerte })
      },
    )
    return () => subscription?.unsubscribe?.()
  }, [db, personFilter, garten?.gvs])
  const { gvsSorted, personWerte } = dataState

  const saveToDb = (event) => {
    insertGvRev({
      values: { person_id: event.target.value, garten_id: garten.id },
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
        >{`Mitarbeitende Personen (${gvsSorted.length})`}</div>
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
            <div className={styles.aven}>
              {gvsSorted.map((gv, index) => (
                <Person
                  key={`${gv.garten_id}/${gv.person_id}/${index}`}
                  gv={gv}
                />
              ))}
            </div>
            {!!personWerte.length && (
              <Select
                name="person_id"
                value={''}
                field="person_id"
                label="Person hinzufügen"
                options={personWerte}
                saveToDb={saveToDb}
                isClearable={false}
                error={errors.person_id}
              />
            )}
          </>
        )}
      </motion.div>
    </ErrorBoundary>
  )
}
