import React, {
  useCallback,
  useState,
  useContext,
  useRef,
  useEffect,
} from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react-lite'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'
import IconButton from '@material-ui/core/IconButton'
import uniq from 'lodash/uniq'
import { motion, useAnimation } from 'framer-motion'
import { combineLatest } from 'rxjs'
import { Q } from '@nozbe/watermelondb'

import Pflanzen from './Pflanzen'
import ErrorBoundary from '../../../../shared/ErrorBoundary'
import StoreContext from '../../../../../storeContext'
import herkunftSort from '../../../../../utils/herkunftSort'
import notDeletedQuery from '../../../../../utils/notDeletedQuery'

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

const TimelineArea = ({ artId = '99999999-9999-9999-9999-999999999999' }) => {
  const store = useContext(StoreContext)
  const { db } = store

  const [herkunfts, setHerkunfts] = useState([])
  useEffect(() => {
    const sammlungsObservable = db
      .get('sammlung')
      .query(
        Q.where('_deleted', false),
        Q.where('art_id', artId),
        Q.where('herkunft_id', Q.notEq(null)),
      )
      .observe()
    const herkunftsObservable = db
      .get('herkunft')
      .query(notDeletedQuery)
      .observe()
    const combinedObservables = combineLatest([
      sammlungsObservable,
      herkunftsObservable,
    ])
    const subscription = combinedObservables.subscribe(
      ([sammlungs, herkunfts]) => {
        const herkunftIds = uniq(sammlungs.map((s) => s.herkunft_id))
        const herkunftsSorted = herkunfts
          .filter((h) => herkunftIds.includes(h.id))
          .sort((a, b) => herkunftSort({ a, b }))
        setHerkunfts(herkunftsSorted)
      },
    )

    return () => subscription.unsubscribe()
  }, [artId, db])

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
        <Title>{`Zeit-Achsen ${herkunfts.length} Herkünfte`}</Title>
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
        {open &&
          herkunfts.map((herkunft) => (
            <Pflanzen key={herkunft.id} artId={artId} herkunft={herkunft} />
          ))}
      </motion.div>
    </ErrorBoundary>
  )
}

export default observer(TimelineArea)
