import { useState, useEffect, useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { of as $of } from 'rxjs'
import { Allotment } from 'allotment'

import { MobxStoreContext } from '../../../../../../mobxStoreContext.js'
import { ErrorBoundary } from '../../../../../shared/ErrorBoundary.jsx'
import { TeilzaehlungConflict as Conflict } from './Conflict.jsx'
import { TeilzaehlungForm as Form } from './Form/index.jsx'
import { TeilzaehlungHistory as History } from './History/index.jsx'

import styles from './index.module.css'

export const Teilzaehlung = observer(({ id, kulturId, index }) => {
  const store = useContext(MobxStoreContext)
  const { online, db, initialDataQueried } = store

  // TODO: should I subscribe to this row to rerender on updates of history?

  const [dataState, setDataState] = useState({
    row: undefined,
    // need raw row because observable does not provoke rerendering of components
    rawRow: undefined,
  })
  useEffect(() => {
    const tzObservable =
      initialDataQueried ? db.get('teilzaehlung').findAndObserve(id) : $of({})
    const subscription = tzObservable.subscribe((newRow) => {
      setDataState({
        row: newRow,
        rawRow: JSON.stringify(newRow?._raw ?? newRow),
      })
    })

    return () => subscription?.unsubscribe?.()
  }, [db, id, initialDataQueried])
  const { row, rawRow } = dataState

  const [activeConflict, setActiveConflict] = useState(null)
  const conflictDisposalCallback = () => setActiveConflict(null)
  const conflictSelectionCallback = () => setActiveConflict(null)

  // ensure that activeConflict is reset
  // when changing dataset
  useEffect(() => {
    setActiveConflict(null)
  }, [id])

  const [showHistory, setShowHistory] = useState(false)
  const historyTakeoverCallback = () => setShowHistory(null)

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
                setActiveConflict={setActiveConflict}
                showHistory={showHistory}
                setShowHistory={setShowHistory}
              />
              <Allotment.Pane visible={paneIsSplit}>
                {activeConflict ?
                  <Conflict
                    rev={activeConflict}
                    id={id}
                    row={row}
                    rawRow={rawRow}
                    conflictDisposalCallback={conflictDisposalCallback}
                    conflictSelectionCallback={conflictSelectionCallback}
                    setActiveConflict={setActiveConflict}
                  />
                : showHistory ?
                  <History
                    row={row}
                    rawRow={rawRow}
                    historyTakeoverCallback={historyTakeoverCallback}
                  />
                : null}
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
            setActiveConflict={setActiveConflict}
            showHistory={showHistory}
            setShowHistory={setShowHistory}
          />
        </div>
      </div>
    </ErrorBoundary>
  )
})
