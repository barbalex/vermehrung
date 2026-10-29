import { useEffect, useState } from 'react'
import { useAtomValue } from 'jotai'
import IconButton from '@mui/material/IconButton'
import { FaPlus } from 'react-icons/fa'
import { combineLatest, of as $of } from 'rxjs'
import { Q } from '@nozbe/watermelondb'

import { dbAtom } from '../../../../../store/index.ts'
import { insertTeilzaehlungRev } from '../../../../../modules/insertRev.ts'
import { TeilzaehlungenRows } from './TeilzaehlungenRows.tsx'
import { TeilzaehlungenSettings as Settings } from './Settings.tsx'
import { ErrorBoundary } from '../../../../shared/ErrorBoundary.tsx'
import { teilzaehlungsSortByTk } from '../../../../../utils/teilzaehlungsSortByTk.ts'

import styles from './index.module.css'

export const Teilzaehlungen = ({
  zaehlung,
}: {
  zaehlung: import('../../../../../dbModel.ts').Zaehlung | null | undefined
}) => {
  const db = useAtomValue(dbAtom)

  const kulturId = zaehlung?.kultur_id

  const [dataState, setDataState] = useState<{
    teilzaehlungs: import('../../../../../dbModel.ts').Teilzaehlung[]
    kulturOption: import('../../../../../dbModel.ts').KulturOption | undefined
  }>({ teilzaehlungs: [], kulturOption: undefined })
  useEffect(() => {
    const teilzaehlungsObservable = zaehlung?.teilzaehlungs
      ? zaehlung?.teilzaehlungs.extend(Q.where('_deleted', false))?.observe()
      : $of([])
    const kulturOptionObservable = kulturId
      ? db
          ?.get<import('../../../../../dbModel.ts').KulturOption>(
            'kultur_option',
          )
          .find(kulturId)
      : $of({})
    const combinedObservables = combineLatest([
      teilzaehlungsObservable,
      kulturOptionObservable,
    ])
    const subscription = (
      combinedObservables as unknown as import('rxjs').Observable<
        [
          import('../../../../../dbModel.ts').Teilzaehlung[],
          import('../../../../../dbModel.ts').KulturOption | undefined,
        ]
      >
    ).subscribe(
      async ([tzs, kulturOption]) => {
        const teilzaehlungs = await teilzaehlungsSortByTk(tzs)
        setDataState({ teilzaehlungs, kulturOption })
      },
    )

    return () => subscription?.unsubscribe?.()
  }, [
    db,
    kulturId,
    zaehlung?.kultur_option,
    zaehlung?.teilkulturs,
    zaehlung?.teilzaehlungs,
  ])
  const { teilzaehlungs, kulturOption } = dataState

  const { tk } = kulturOption ?? {}

  const showNew = teilzaehlungs.length === 0 || tk
  const title = tk ? 'Teil-Zählungen' : 'Mengen'

  return (
    <ErrorBoundary>
      <div className={styles.titleRow}>
        <div className={styles.titleClass}>{title}</div>
        <div>
          {kulturId && <Settings kulturId={kulturId} />}
          {showNew && (
            <IconButton
              aria-label="Neu"
              title="Neue Teil-Zählung"
              onClick={
                  insertTeilzaehlungRev as unknown as import('react').MouseEventHandler
                }
              size="large"
            >
              <FaPlus />
            </IconButton>
          )}
        </div>
      </div>
      <TeilzaehlungenRows kulturId={kulturId} teilzaehlungs={teilzaehlungs} />
    </ErrorBoundary>
  )
}
