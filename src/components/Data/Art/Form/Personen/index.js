import React, { useCallback, useState, useEffect, useContext } from 'react'
import styled from '@emotion/styled'
import { observer } from 'mobx-react-lite'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'
import IconButton from '@mui/material/IconButton'
import { motion, useAnimation } from 'framer-motion'
import { Q } from '@nozbe/watermelondb'
import { combineLatest } from 'rxjs'

import StoreContext from '../../../../../storeContext'
import Person from './Person'
import Select from '../../../../shared/Select'
import ErrorBoundary from '../../../../shared/ErrorBoundary'
import avsSortByPerson from '../../../../../utils/avsSortByPerson'
import personSort from '../../../../../utils/personSort'
import personLabelFromPerson from '../../../../../utils/personLabelFromPerson'
import constants from '../../../../../utils/constants'

const TitleRow = styled.div`
  background-color: rgba(248, 243, 254, 1);
  flex-shrink: 0;
  display: flex;
  height: ${constants.titleRowHeight}px;
  justify-content: space-between;
  margin-left: -10px;
  margin-right: -10px;
  margin-bottom: 10px;
  padding: 0 10px;
  cursor: pointer;
  user-select: none;
  position: sticky;
  top: 0;
  z-index: 1;
  &:first-of-type {
    margin-top: -10px;
  }
`
const Title = styled.div`
  font-weight: bold;
  margin-top: auto;
  margin-bottom: auto;
`
const Aven = styled.div`
  padding-bottom: 8px;
`
const StyledMotionDiv = styled(motion.div)`
  box-sizing: border-box;
`

const ArtPersonen = ({ art }) => {
  const store = useContext(StoreContext)
  const { db, insertAvRev, errors, unsetError, filter } = store

  useEffect(() => unsetError('av'), [art.id, unsetError])

  const [open, setOpen] = useState(false)
  let anim = useAnimation()
  const onClickToggle = useCallback(
    async (e) => {
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
    },
    [anim, open],
  )

  const [dataState, setDataState] = useState({
    avsSorted: [],
    personWerte: [],
  })
  useEffect(() => {
    const personsObservable = db
      .get('person')
      .query(
        Q.where(
          '_deleted',
          Q.oneOf(
            filter.person._deleted === false
              ? [false]
              : filter.person._deleted === true
              ? [true]
              : [true, false, null],
          ),
        ),
        Q.where(
          'aktiv',
          Q.oneOf(
            filter.person.aktiv === true
              ? [true]
              : filter.person.aktiv === false
              ? [false]
              : [true, false, null],
          ),
        ),
      )
      .observe()
    const avsObservable = art.avs.extend(Q.where('_deleted', false)).observe()
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
          }))
        setDataState({ avsSorted, personWerte })
      },
    )
    return () => subscription?.unsubscribe?.()
  }, [art.avs, db, filter.person._deleted, filter.person.aktiv])
  const { avsSorted, personWerte } = dataState

  const saveToDb = useCallback(
    async (event) => {
      insertAvRev({ values: { art_id: art.id, person_id: event.target.value } })
    },
    [art.id, insertAvRev],
  )

  return (
    <ErrorBoundary>
      <TitleRow onClick={onClickToggle} title={open ? 'schliessen' : 'öffnen'}>
        <Title>{`Mitarbeitende Personen (${avsSorted.length})`}</Title>
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
      </TitleRow>
      <StyledMotionDiv
        animate={anim}
        transition={{ type: 'just', duration: 0.2 }}
      >
        {open && (
          <>
            <Aven>
              {avsSorted.map((av, index) => (
                <Person key={`${av.art_id}/${av.person_id}/${index}`} av={av} />
              ))}
            </Aven>
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
      </StyledMotionDiv>
    </ErrorBoundary>
  )
}

export default observer(ArtPersonen)
