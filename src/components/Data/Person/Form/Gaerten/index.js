import React, {
  useCallback,
  useState,
  useEffect,
  useContext,
  useRef,
} from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react-lite'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'
import IconButton from '@material-ui/core/IconButton'
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

const TitleRow = styled.div`
  background-color: rgba(237, 230, 244, 1);
  flex-shrink: 0;
  display: flex;
  height: 48px;
  justify-content: space-between;
  margin-left: -10px;
  margin-right: -10px;
  margin-bottom: 10px;
  padding: 0 10px;
  cursor: pointer;
  user-select: none;
  ${(props) => props['data-open'] && 'position: sticky;'}
  ${(props) =>
    props['data-sticky'] && 'border-top: 1px solid rgba(0, 0, 0, 0.3);'}
  top: -10px;
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
    return () => subscription.unsubscribe()
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

  const titleRowRef = useRef(null)
  const [isSticky, setIsSticky] = useState(false)
  const scrollHandler = useCallback(() => {
    const { top } = titleRowRef?.current?.getBoundingClientRect()
    if (top < 112 && !isSticky) return setIsSticky(true)
    if (top > 112 && isSticky) setIsSticky(false)
  }, [isSticky])
  useEffect(() => {
    window.addEventListener('scroll', scrollHandler, true)
    return () => {
      window.removeEventListener('scroll', scrollHandler, true)
    }
  }, [scrollHandler])

  return (
    <ErrorBoundary>
      <TitleRow
        onClick={onClickToggle}
        title={open ? 'schliessen' : 'öffnen'}
        data-open={open}
        ref={titleRowRef}
        data-sticky={isSticky}
      >
        <Title>{`Mitarbeitend bei ${gvs.length} Gärten`}</Title>
        <div>
          <IconButton
            aria-label={open ? 'schliessen' : 'öffnen'}
            title={open ? 'schliessen' : 'öffnen'}
            onClick={onClickToggle}
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
