import React, { useCallback, useState, useEffect, useContext } from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react-lite'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'
import IconButton from '@mui/material/IconButton'
import { motion, useAnimation } from 'framer-motion'
import { Q } from '@nozbe/watermelondb'
import { first as first$ } from 'rxjs/operators'
import { combineLatest } from 'rxjs'

import StoreContext from '../../../../../storeContext'
import Art from './Art'
import Select from '../../../../shared/Select'
import ErrorBoundary from '../../../../shared/ErrorBoundary'
import artsSortedFromArts from '../../../../../utils/artsSortedFromArts'
import avsSortByArt from '../../../../../utils/avsSortByArt'
import getConstants from '../../../../../utils/constants'

const constants = getConstants()

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
const Avs = styled.div`
  padding-bottom: 8px;
`

const PersonArten = ({ person }) => {
  const store = useContext(StoreContext)
  const { db, insertAvRev, filter } = store

  const [errors, setErrors] = useState({})
  useEffect(() => setErrors({}), [person])

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

  const [dataState, setDataState] = useState({ avs: [], artWerte: [] })
  const { avs, artWerte } = dataState
  const avArtIds = avs.map((v) => v.art_id)
  useEffect(() => {
    const avsObservable = person.avs
      .extend(Q.where('_deleted', false))
      .observe()
    const artsObservable = db
      .get('art')
      .query(
        Q.where(
          '_deleted',
          Q.oneOf(
            filter.art._deleted === false
              ? [false]
              : filter.art._deleted === true
              ? [true]
              : [true, false, null],
          ),
        ),
        Q.where('id', Q.notIn(avArtIds)),
      )
      .observe()
    const combinedObservables = combineLatest([avsObservable, artsObservable])
    const subscription = combinedObservables.subscribe(async ([avs, arts]) => {
      const avsSorted = await avsSortByArt(avs)
      const artsSorted = await artsSortedFromArts(arts)
      const artWerte = await Promise.all(
        artsSorted.map(async (art) => {
          let label
          try {
            label = await art.label.pipe(first$()).toPromise()
          } catch {}

          return {
            value: art.id,
            label,
          }
        }),
      )
      setDataState({ avs: avsSorted, artWerte })
    })
    return () => subscription?.unsubscribe?.()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [person.avs, avArtIds.length, db])

  const saveToDb = useCallback(
    async (event) => {
      insertAvRev({
        values: { person_id: person.id, art_id: event.target.value },
      })
      setErrors({})
    },
    [insertAvRev, person.id],
  )

  return (
    <ErrorBoundary>
      <TitleRow onClick={onClickToggle} title={open ? 'schliessen' : 'öffnen'}>
        <Title>{`Mitarbeitend bei ${avs.length} Arten`}</Title>
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
      <motion.div animate={anim} transition={{ type: 'just', duration: 0.2 }}>
        {open && (
          <>
            <Avs>
              {avs.map((av, index) => (
                <Art key={`${av.person_id}/${av.art_id}/${index}`} av={av} />
              ))}
            </Avs>
            {!!artWerte.length && (
              <Select
                name="art_id"
                value={''}
                field="art_id"
                label="Art hinzufügen"
                options={artWerte}
                saveToDb={saveToDb}
                isClearable={false}
                error={errors.art_id}
              />
            )}
          </>
        )}
      </motion.div>
    </ErrorBoundary>
  )
}

export default observer(PersonArten)
