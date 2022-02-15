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
import Garten from './Garten'
import Select from '../../../../shared/Select'
import ErrorBoundary from '../../../../shared/ErrorBoundary'
import gartensSortedFromGartens from '../../../../../utils/gartensSortedFromGartens'
import gvsSortByGarten from '../../../../../utils/gvsSortByGarten'
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
const Gvs = styled.div`
  padding-bottom: 8px;
`

const PersonArten = ({ person }) => {
  const store = useContext(StoreContext)
  const { insertGvRev, db, filter } = store

  const [errors, setErrors] = useState({})
  useEffect(() => setErrors({}), [person.id])

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

  const [dataState, setDataState] = useState({ gvs: [], gartenWerte: [] })
  const { gvs, gartenWerte } = dataState
  const gvGartenIds = gvs.map((v) => v.garten_id)
  useEffect(() => {
    const gvsObservable = person.gvs
      .extend(Q.where('_deleted', false))
      .observe()
    const gartensObservable = db
      .get('garten')
      .query(
        Q.where(
          '_deleted',
          Q.oneOf(
            filter.garten._deleted === false
              ? [false]
              : filter.garten._deleted === true
              ? [true]
              : [true, false, null],
          ),
        ),
        Q.where(
          'aktiv',
          Q.oneOf(
            filter.garten.aktiv === true
              ? [true]
              : filter.garten.aktiv === false
              ? [false]
              : [true, false, null],
          ),
        ),
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

  const saveToDb = useCallback(
    async (event) => {
      insertGvRev({
        values: { garten_id: event.target.value, person_id: person.id },
      })
      setErrors({})
    },
    [insertGvRev, person.id],
  )

  return (
    <ErrorBoundary>
      <TitleRow onClick={onClickToggle} title={open ? 'schliessen' : 'öffnen'}>
        <Title>{`Mitarbeitend bei ${gvs.length} Gärten`}</Title>
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
            <Gvs>
              {gvs.map((gv, index) => (
                <Garten
                  key={`${gv.person_id}/${gv.garten_id}/${index}`}
                  gv={gv}
                />
              ))}
            </Gvs>
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

export default observer(PersonArten)
