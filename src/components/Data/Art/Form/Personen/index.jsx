import { useState, useEffect, useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'
import IconButton from '@mui/material/IconButton'
import { motion, useAnimation } from 'framer-motion'
import { Q } from '@nozbe/watermelondb'
import { combineLatest } from 'rxjs'
import { of as $of } from 'rxjs'

import { MobxStoreContext } from '../../../../../mobxStoreContext.js'
import { Person } from './Person.jsx'
import { Select } from '../../../../shared/Select/index.jsx'
import { ErrorBoundary } from '../../../../shared/ErrorBoundary.jsx'
import { avsSortByPerson } from '../../../../../utils/avsSortByPerson.js'
import { personSort } from '../../../../../utils/personSort.js'
import { personLabelFromPerson } from '../../../../../utils/personLabelFromPerson.js'

import { titleRow, title, aven, motionDiv } from './index.module.css'

export const Personen = observer(({ art }) => {
  const store = useContext(MobxStoreContext)
  const { db, insertAvRev, errors, unsetError, filter } = store

  useEffect(() => unsetError('av'), [art.id, unsetError])

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
    avsSorted: [],
    personWerte: [],
  })
  useEffect(() => {
    const delQuery =
      filter.person?._deleted === false ? Q.where('_deleted', false)
      : filter.person?._deleted === true ? Q.where('_deleted', true)
      : Q.or(
          Q.where('_deleted', false),
          Q.where('_deleted', true),
          Q.where('_deleted', null),
        )
    const aktivQuery =
      filter.person?.aktiv === false ? Q.where('aktiv', false)
      : filter.person?.aktiv === true ? Q.where('aktiv', true)
      : Q.or(
          Q.where('aktiv', false),
          Q.where('aktiv', true),
          Q.where('aktiv', null),
        )
    const personsObservable = db
      .get('person')
      .query(delQuery, aktivQuery)
      .observe()
    const avsObservable =
      art.avs ? art.avs.extend(Q.where('_deleted', false)).observe() : $of([])
    const combinedObservables = combineLatest([
      personsObservable,
      avsObservable,
    ])
    const subscription = combinedObservables.subscribe(
      async ([persons, avs]) => {
        const avsSorted = await avsSortByPerson(avs)
        const avPersonIds = avsSorted.map((v) => v.person_id)
        const personWerte = persons
          .filter((a) => !avPersonIds.includes(a.id))
          .sort(personSort)
          .map((el) => ({
            value: el.id,
            label: personLabelFromPerson({ person: el }),
            inaktiv: el.aktiv === false,
          }))
        setDataState({ avsSorted, personWerte })
      },
    )
    return () => subscription?.unsubscribe?.()
  }, [art.avs, db, filter.person._deleted, filter.person.aktiv])
  const { avsSorted, personWerte } = dataState

  const saveToDb = (event) =>
    insertAvRev({ values: { art_id: art.id, person_id: event.target.value } })

  return (
    <ErrorBoundary>
      <section
        onClick={onClickToggle}
        title={open ? 'schliessen' : 'öffnen'}
        className={titleRow}
      >
        <div
          className={title}
        >{`Mitarbeitende Personen (${avsSorted.length})`}</div>
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
            <div className={aven}>
              {avsSorted.map((av, index) => (
                <Person
                  key={`${av.art_id}/${av.person_id}/${index}`}
                  av={av}
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
                error={errors?.av?.person_id}
              />
            )}
          </>
        )}
      </motion.div>
    </ErrorBoundary>
  )
})
