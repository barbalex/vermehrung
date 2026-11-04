import { useState } from 'react'
import { IoMdInformationCircleOutline } from 'react-icons/io'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'
import IconButton from '@mui/material/IconButton'

import { Pflanzen } from './Pflanzen/index.tsx'
import { Collapsible } from '../../../../shared/Collapsible.tsx'
import { ErrorBoundary } from '../../../../shared/ErrorBoundary.tsx'
import { constants } from '../../../../../utils/constants.ts'

import styles from './index.module.css'

export const Timeline = ({
  artId = '99999999-9999-9999-9999-999999999999',
}: {
  artId: string | null | undefined
}) => {
  const [open, setOpen] = useState(false)

  const openDocs = (e: {
    target: { name?: string; value: unknown }
    currentTarget?: HTMLElement
    preventDefault?: () => void
    stopPropagation?: () => void
    key?: string
  }) => {
    e.stopPropagation?.()
    const url = `${constants?.getAppUri()}/Dokumentation/zeitachse-art`
    if (window.matchMedia('(display-mode: standalone)').matches) {
      return window.open(url, '_blank', 'toolbar=no')
    }
    window.open(url)
  }
  const onClickToggle = (e: {
    target: { name?: string; value: unknown }
    currentTarget?: HTMLElement
    preventDefault?: () => void
    stopPropagation?: () => void
    key?: string
  }) => {
    e.stopPropagation?.()
    setOpen(!open)
  }

  return (
    <ErrorBoundary>
      <section
        onClick={onClickToggle as unknown as import('react').MouseEventHandler}
        title={open ? 'schliessen' : 'öffnen'}
        className={styles.titleRow}
      >
        <div className={styles.title}>Zeit-Achse</div>
        <div>
          <IconButton
            aria-label="Anleitung öffnen"
            title="Anleitung öffnen"
            onClick={openDocs as unknown as import('react').MouseEventHandler}
            size="large"
          >
            <IoMdInformationCircleOutline />
          </IconButton>
          <IconButton
            aria-label={open ? 'schliessen' : 'öffnen'}
            title={open ? 'schliessen' : 'öffnen'}
            onClick={
              onClickToggle as unknown as import('react').MouseEventHandler
            }
            size="large"
          >
            {open ?
              <FaChevronUp />
            : <FaChevronDown />}
          </IconButton>
        </div>
      </section>
      <Collapsible open={open}>
        <Pflanzen
          key={artId ?? ''}
          artId={artId ?? undefined}
        />
      </Collapsible>
    </ErrorBoundary>
  )
}
