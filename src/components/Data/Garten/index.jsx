import { useState, useEffect, useMemo } from 'react'
import { useAtomValue } from 'jotai'
import { Allotment } from 'allotment'
import { of as $of } from 'rxjs'

import {
  dbAtom,
  filterGartenAtom,
  filterShowAtom,
  initialDataQueriedAtom,
  onlineAtom,
} from '../../../store/index.js'
import { ErrorBoundary } from '../../shared/ErrorBoundary.jsx'
import { Spinner } from '../../shared/Spinner.jsx'
import { GartenConflict as Conflict } from './Conflict.jsx'
import { GartenForm as Form } from './Form/index.jsx'
import { GartenFormTitle as FormTitle } from './FormTitle/index.jsx'
import { GartenHistory as History } from './History/index.jsx'
import { useObservable } from '../../../utils/useObservable.js'

import artStyles from '../Art/index.module.css'

export const Garten = ({
  filter: showFilter = false,
  id = '99999999-9999-9999-9999-999999999999',
}) => {
  const db = useAtomValue(dbAtom)
  const online = useAtomValue(onlineAtom)
  const filterShow = useAtomValue(filterShowAtom)
  const gartenFilter = useAtomValue(filterGartenAtom)
  const initialDataQueried = useAtomValue(initialDataQueriedAtom)

  // removing useMemo causes: Maximum update depth exceeded
  const observable = useMemo(
    () => (initialDataQueried ? db.get('garten').findAndObserve(id) : $of({})),
    [db, id, initialDataQueried],
  )
  const observedRow = useObservable(observable)
  const row = showFilter ? gartenFilter : observedRow

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

  if (!row || !Object.keys(row ?? {})) return <Spinner />
  if (!showFilter && filterShow) return null

  const paneIsSplit = online && (activeConflict || showHistory)

  return (
    <ErrorBoundary>
      <div
        className={artStyles.container}
        style={{ backgroundColor: showFilter ? '#fff3e0' : 'unset' }}
      >
        <FormTitle
          row={row}
          showFilter={showFilter}
          showHistory={showHistory}
          setShowHistory={setShowHistory}
        />
        <div className={artStyles.splitPaneContainer}>
          <Allotment key={`${activeConflict}/${showHistory}`}>
            <Form
              showFilter={showFilter}
              id={id}
              row={row}
              activeConflict={activeConflict}
              setActiveConflict={setActiveConflict}
              showHistory={showHistory}
            />
            <Allotment.Pane visible={paneIsSplit}>
              {activeConflict ? (
                <Conflict
                  rev={activeConflict}
                  id={id}
                  row={row}
                  conflictDisposalCallback={conflictDisposalCallback}
                  conflictSelectionCallback={conflictSelectionCallback}
                  setActiveConflict={setActiveConflict}
                />
              ) : showHistory ? (
                <History
                  row={row}
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
