import { useState, useEffect, useMemo } from 'react'
import { useAtomValue } from 'jotai'
import { Allotment } from 'allotment'
import { of as $of } from 'rxjs'

import {
  dbAtom,
  filterShowAtom,
  filterTeilkulturAtom,
  initialDataQueriedAtom,
  onlineAtom,
} from '../../../store/index.js'
import { ErrorBoundary } from '../../shared/ErrorBoundary.jsx'
import { Spinner } from '../../shared/Spinner.jsx'
import { TeilkulturConflict as Conflict } from './Conflict.jsx'
import { TeilkulturFormTitleChooser as FormTitle } from './FormTitle/index.jsx'
import { TeilkulturForm as Form } from './Form/index.jsx'
import { TeilkulturHistory as History } from './History/index.jsx'
import { useObservable } from '../../../utils/useObservable.js'

import artStyles from '../Art/index.module.css'

export const Teilkultur = ({
  filter: showFilter = false,
  id = '99999999-9999-9999-9999-999999999999',
}) => {
  const db = useAtomValue(dbAtom)
  const online = useAtomValue(onlineAtom)
  const filterShow = useAtomValue(filterShowAtom)
  const teilkulturFilter = useAtomValue(filterTeilkulturAtom)
  const initialDataQueried = useAtomValue(initialDataQueriedAtom)

  // removing useMemo causes: Maximum update depth exceeded
  const observable = useMemo(
    () =>
      showFilter
        ? $of(teilkulturFilter)
        : initialDataQueried
          ? db.get('teilkultur').findAndObserve(id)
          : $of({}),
    [db, teilkulturFilter, id, initialDataQueried, showFilter],
  )
  const row = useObservable(observable)

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

  if (!row || !Object.keys(row ?? {}).length) return <Spinner />
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
