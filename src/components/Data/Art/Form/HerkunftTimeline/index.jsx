import { useState, useContext, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'
import IconButton from '@mui/material/IconButton'
import { uniq } from 'es-toolkit'
import { motion, useAnimation } from 'framer-motion'
import { combineLatest } from 'rxjs'
import { Q } from '@nozbe/watermelondb'

import { Pflanzen } from './Pflanzen/index.jsx'
import { ErrorBoundary } from '../../../../shared/ErrorBoundary.jsx'
import { MobxStoreContext } from '../../../../../mobxStoreContext.js'
import { herkunftSort } from '../../../../../utils/herkunftSort.js'

import styles from './index.module.css'

export const HerkunftTimeline = observer(
  ({ artId = '99999999-9999-9999-9999-999999999999' }) => {
    const store = useContext(MobxStoreContext)
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

    return (
      <ErrorBoundary>
        <section
          onClick={onClickToggle}
          title={open ? 'schliessen' : 'öffnen'}
          className={styles.titleRow}
        >
          <div
            className={styles.title}
          >{`Zeit-Achsen ${herkunfts.length} Herkünfte`}</div>
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
        >
          {open &&
            herkunfts.map((herkunft) => (
              <Pflanzen
                key={herkunft.id}
                artId={artId}
                herkunft={herkunft}
              />
            ))}
        </motion.div>
      </ErrorBoundary>
    )
  },
)
