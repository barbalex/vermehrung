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

import { StoreContext } from '../../../../../models/reactUtils'
import Art from './Art'
import Select from '../../../../shared/Select'
import ErrorBoundary from '../../../../shared/ErrorBoundary'
import artsSortedFromArts from '../../../../../utils/artsSortedFromArts'
import avsSortByArt from '../../../../../utils/avsSortByArt'

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
const Avs = styled.div`
  padding-bottom: 8px;
`

const PersonArten = ({ person }) => {
  const store = useContext(StoreContext)
  const { db, insertAvRev } = store

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

  const [avsSorted, setAvsSorted] = useState([])
  useEffect(() => {
    const subscription = person.avs
      .extend(Q.where('_deleted', false))
      .observe()
      .subscribe(async (avs) => {
        const _avsSorted = await avsSortByArt(avs)
        setAvsSorted(_avsSorted)
      })
    return () => subscription.unsubscribe()
  }, [person.avs])

  const avArtIds = avsSorted.map((v) => v.art_id)

  const [artWerte, setArtWerte] = useState([])
  useEffect(() => {
    const artsObservable = db.collections
      .get('art')
      .query(Q.where('_deleted', false), Q.where('id', Q.notIn(avArtIds)))
      .observe()
    const subscription = artsObservable.subscribe(async (arts) => {
      const artsSorted = await artsSortedFromArts(arts)
      const artWerte = await Promise.all(
        artsSorted.map(async (art) => {
          const label = await art.label.pipe(first$()).toPromise()

          return {
            value: art.id,
            label,
          }
        }),
      )
      setArtWerte(artWerte)
    })
    return () => subscription.unsubscribe()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [db.collections, avArtIds.length])

  const saveToDb = useCallback(
    async (event) => {
      insertAvRev({
        values: { person_id: person.id, art_id: event.target.value },
      })
      setErrors({})
    },
    [insertAvRev, person.id],
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
        <Title>{`Mitarbeitend bei ${avsSorted.length} Arten`}</Title>
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
            <Avs>
              {avsSorted.map((av) => (
                <Art key={`${av.person_id}/${av.art_id}`} av={av} />
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
