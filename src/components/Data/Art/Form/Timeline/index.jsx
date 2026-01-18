import { useState } from 'react'
import { IoMdInformationCircleOutline } from 'react-icons/io'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'
import IconButton from '@mui/material/IconButton'
import { motion, useAnimation } from 'framer-motion'

import { Pflanzen } from './Pflanzen/index.jsx'
import { ErrorBoundary } from '../../../../shared/ErrorBoundary.jsx'
import { constants } from '../../../../../utils/constants.js'

import styles from './index.module.css'

export const Timeline = ({
  artId = '99999999-9999-9999-9999-999999999999',
}) => {
  const [open, setOpen] = useState(false)

  const anim = useAnimation()

  const openDocs = (e) => {
    e.stopPropagation()
    const url = `${constants?.getAppUri()}/Dokumentation/zeitachse-art`
    if (window.matchMedia('(display-mode: standalone)').matches) {
      return window.open(url, '_blank', 'toolbar=no')
    }
    window.open(url)
  }
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
        <div className={styles.title}>Zeit-Achse</div>
        <div>
          <IconButton
            aria-label="Anleitung öffnen"
            title="Anleitung öffnen"
            onClick={openDocs}
            size="large"
          >
            <IoMdInformationCircleOutline />
          </IconButton>
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
        {open && (
          <Pflanzen
            key={artId}
            artId={artId}
          />
        )}
      </motion.div>
    </ErrorBoundary>
  )
}
