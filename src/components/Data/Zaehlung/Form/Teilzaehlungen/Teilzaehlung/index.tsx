import { useState, useEffect } from 'react'
import { useAtomValue } from 'jotai'
import { of as $of } from 'rxjs'
import { Allotment } from 'allotment'

import {
  onlineAtom,
  dbAtom,
  initialDataQueriedAtom,
} from '../../../../../../store/index.ts'
import { ErrorBoundary } from '../../../../../shared/ErrorBoundary.tsx'
import { TeilzaehlungConflict as Conflict } from './Conflict.tsx'
import { TeilzaehlungForm as Form } from './Form/index.tsx'
import { TeilzaehlungHistory as History } from './History/index.tsx'

import styles from './index.module.css'

export const Teilzaehlung = ({
  id,
  kulturId,
  index,
}: {
  id: string
  kulturId?: string | undefined
  index: number
}) => {
  const online = useAtomValue(onlineAtom)
  const db = useAtomValue(dbAtom)
  const initialDataQueried = useAtomValue(initialDataQueriedAtom)

  // TODO: should I subscribe to this row to rerender on updates of history?

  const [dataState, setDataState] = useState<{
    row: import('../../../../../../dbModel.ts').Teilzaehlung | undefined
    // need raw row because observable does not provoke rerendering of components
    rawRow: string | undefined
  }>({ row: undefined, rawRow: undefined })
  useEffect(() => {
    const tzObservable = initialDataQueried
      ? db
          ?.get<import('../../../../../../dbModel.ts').Teilzaehlung>(
            'teilzaehlung',
          )
          .findAndObserve(id)
      : $of(undefined)
    const subscription = (
      tzObservable as unknown as import('rxjs').Observable<
        import('../../../../../../dbModel.ts').Teilzaehlung | undefined
      >
    )?.subscribe((newRow) => {
      setDataState({
        row: newRow,
        rawRow: JSON.stringify(newRow?._raw ?? newRow),
      })
    })

    return () => subscription?.unsubscribe?.()
  }, [db, id, initialDataQueried])
  const { row, rawRow } = dataState

  const [activeConflict, setActiveConflict] = useState<string | null>(null)
  const conflictDisposalCallback = () => setActiveConflict(null)
  const conflictSelectionCallback = () => setActiveConflict(null)

  // ensure that activeConflict is reset
  // when changing dataset
  useEffect(() => {
    setActiveConflict(null)
  }, [id])

  const [showHistory, setShowHistory] = useState(false)
  const historyTakeoverCallback = () => setShowHistory(false)

  const paneIsSplit = online && (activeConflict || showHistory)

  if (online && (activeConflict || showHistory)) {
    return (
      <ErrorBoundary>
        <div className={styles.container}>
          {!!index && <div className={styles.topLine} />}
          <div className={styles.splitPaneContainer}>
            <Allotment key={`${activeConflict}/${showHistory}`}>
              <Form
                id={id}
                kulturId={kulturId}
                activeConflict={activeConflict}
                setActiveConflict={
                  setActiveConflict as unknown as never
                }
                showHistory={showHistory}
                setShowHistory={
                  setShowHistory as unknown as never
                }
              />
              <Allotment.Pane visible={!!paneIsSplit}>
                {activeConflict ? (
                  <Conflict
                    rev={activeConflict}
                    id={id}
                    row={row}
                    conflictDisposalCallback={conflictDisposalCallback}
                    conflictSelectionCallback={conflictSelectionCallback}
                    setActiveConflict={
                  setActiveConflict as unknown as never
                }
                  />
                ) : showHistory ? (
                  <History
                    row={row}
                    rawRow={rawRow}
                    historyTakeoverCallback={historyTakeoverCallback}
                  />
                ) : null}
              </Allotment.Pane>
            </Allotment>
          </div>
        </div>
      </ErrorBoundary>
    )
  }

  return (
    <ErrorBoundary>
      <div className={styles.container}>
        {!!index && <div className={styles.topLine} />}
        <div className={styles.innerContainer}>
          <Form
            id={id}
            kulturId={kulturId}
            activeConflict={activeConflict}
            setActiveConflict={
                  setActiveConflict as unknown as never
                }
            showHistory={showHistory}
            setShowHistory={
                  setShowHistory as unknown as never
                }
          />
        </div>
      </div>
    </ErrorBoundary>
  )
}
