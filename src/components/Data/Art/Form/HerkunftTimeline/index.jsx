import React, { useCallback, useState, useContext, useEffect } from 'react'
import styled from '@emotion/styled'
import { observer } from 'mobx-react-lite'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'
import IconButton from '@mui/material/IconButton'
import uniq from 'lodash/uniq'
import { motion, useAnimation } from 'framer-motion'
import { combineLatest } from 'rxjs'
import { Q } from '@nozbe/watermelondb'

import Pflanzen from './Pflanzen'
import ErrorBoundary from '../../../../shared/ErrorBoundary.jsx'
import StoreContext from '../../../../../storeContext.js'
import herkunftSort from '../../../../../utils/herkunftSort'
import constants from '../../../../../utils/constants'

const TitleRow = styled.section`
  background-color: rgba(248, 243, 254, 1);
  flex-shrink: 0;
  display: flex !important;
  height: ${constants.titleRowHeight}px;
  justify-content: space-between !important;
  margin-left: -10px;
  margin-right: -10px;
  margin-bottom: 10px;
  padding: 0 10px;
  cursor: pointer;
  user-select: none;
  position: sticky !important;
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
  const { db, filter } = store

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
      .query(Q.where('_deleted', false))
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
          .sort(herkunftSort)
        setHerkunfts(herkunftsSorted)
      },
    )

    return () => subscription?.unsubscribe?.()
  }, [artId, db, filter.herkunft._deleted])

  const [open, setOpen] = useState(false)
  const anim = useAnimation()
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

  return (
    <ErrorBoundary>
      <TitleRow onClick={onClickToggle} title={open ? 'schliessen' : 'öffnen'}>
        <Title>{`Zeit-Achsen ${herkunfts.length} Herkünfte`}</Title>
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
        {open &&
          herkunfts.map((herkunft) => (
            <Pflanzen key={herkunft.id} artId={artId} herkunft={herkunft} />
          ))}
      </motion.div>
    </ErrorBoundary>
  )
}

export default observer(TimelineArea)
