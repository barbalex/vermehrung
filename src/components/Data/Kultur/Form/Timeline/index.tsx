import { useState, useEffect, lazy, Suspense } from 'react'
import { IoMdInformationCircleOutline } from 'react-icons/io'
import IconButton from '@mui/material/IconButton'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'
import { useElementWidth } from '../../../../shared/useElementWidth.ts'

import { constants } from '../../../../../utils/constants.ts'
import { Collapsible } from '../../../../shared/Collapsible.tsx'
import { ErrorBoundary } from '../../../../shared/ErrorBoundary.tsx'
import { buildKulturTimelineData as buildData } from './buildData.ts'

import styles from './index.module.css'

// recharts only loads when the timeline is expanded
const LazyChart = lazy(() =>
  import('./Chart.tsx').then((m) => ({ default: m.KulturTimelineChart })),
)

export const KulturTimeline = ({
  row,
}: {
  row: import('../../../../../dbModel.ts').Kultur | null | undefined
}) => {
  const { width, ref } = useElementWidth<HTMLElement>()
  // TODO: calc runs on every render of kultur
  // need to only run when open
  const [allData, setAllData] = useState<Record<string, unknown>[]>([])
  useEffect(() => {
    let isActive = true
    if (row)
      buildData({ row }).then((data) => {
        if (!isActive) return

        setAllData(data)
      })

    return () => {
      isActive = false
    }
  }, [row])

  const openDocs = () => {
    const url = `${constants?.getAppUri()}/Dokumentation/zeitachse-kultur`
    if (window.matchMedia('(display-mode: standalone)').matches) {
      return window.open(url, '_blank', 'toolbar=no')
    }
    window.open(url)
  }

  const isNarrow = (width ?? 0) < 1100

  const [open, setOpen] = useState(false)
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

  // need to disable animation or labels will not show on first render
  // https://github.com/recharts/recharts/issues/806
  return (
    <section
      ref={ref}
      className={styles.container}
    >
      {!allData ?
        null
      : !row || !allData.length ?
        <ErrorBoundary>
          <div className={styles.titleRow}>
            <div className={styles.title}>Zeit-Achse</div>
            <div className={styles.content}>Sorry, keine Daten verfügbar</div>
          </div>
        </ErrorBoundary>
      : <ErrorBoundary>
          <div
            className={styles.titleRow}
            onClick={
              onClickToggle as unknown as import('react').MouseEventHandler
            }
            title={open ? 'schliessen' : 'öffnen'}
            style={{ cursor: 'pointer' }}
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
                onClick={
                  onClickToggle as unknown as import('react').MouseEventHandler<HTMLButtonElement>
                }
                size="large"
              >
                {open ?
                  <FaChevronUp />
                : <FaChevronDown />}
              </IconButton>
            </div>
          </div>
          <Collapsible open={open}>
            {open && (
              <Suspense fallback={null}>
                <LazyChart
                  allData={allData}
                  isNarrow={isNarrow}
                />
              </Suspense>
            )}
          </Collapsible>
        </ErrorBoundary>
      }
    </section>
  )
}
