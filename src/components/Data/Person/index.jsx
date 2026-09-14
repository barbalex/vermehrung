import { useState, useEffect } from 'react'
import { useAtomValue } from 'jotai'
import { Allotment } from 'allotment'
import { of as $of } from 'rxjs'

import {
  filterPersonAtom,
  filterShowAtom,
  onlineAtom,
  dbAtom,
  initialDataQueriedAtom,
} from '../../../store/index.js'
import { ErrorBoundary } from '../../shared/ErrorBoundary.jsx'
import { Spinner } from '../../shared/Spinner.jsx'
import { PersonConflict as Conflict } from './Conflict.jsx'
import { PersonFormTitleChooser as FormTitle } from './FormTitle/index.jsx'
import { PersonForm as Form } from './Form/index.jsx'
import { PersonHistory as History } from './History/index.jsx'

import artStyles from '../Art/index.module.css'

export const Person = ({
  filter: showFilter = false,
  id = '99999999-9999-9999-9999-999999999999',
}) => {
  const personFilter = useAtomValue(filterPersonAtom)
  const filterShow = useAtomValue(filterShowAtom)
  const online = useAtomValue(onlineAtom)
  const db = useAtomValue(dbAtom)
  const initialDataQueried = useAtomValue(initialDataQueriedAtom)
  const [dataState, setDataState] = useState({
    row: undefined,
    // need raw row because observable does not provoke rerendering of components
    rawRow: undefined,
  })
  useEffect(() => {
    const personObservable = showFilter
      ? $of(personFilter)
      : initialDataQueried
        ? db.get('person').findAndObserve(id)
        : $of({})
    const subscription = personObservable.subscribe((newRow) => {
      setDataState({
        row: newRow,
        rawRow: JSON.stringify(newRow?._raw ?? newRow),
      })
    })

    return () => subscription?.unsubscribe?.()
  }, [db, personFilter, id, showFilter, initialDataQueried])
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
          showFilter={showFilter}
          row={row}
          rawRow={rawRow}
          showHistory={showHistory}
          setShowHistory={setShowHistory}
        />
        <div className={artStyles.splitPaneContainer}>
          <Allotment key={`${activeConflict}/${showHistory}`}>
            <Form
              showFilter={showFilter}
              id={id}
              row={row}
              rawRow={rawRow}
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
                  rawRow={rawRow}
                  conflictDisposalCallback={conflictDisposalCallback}
                  conflictSelectionCallback={conflictSelectionCallback}
                  setActiveConflict={setActiveConflict}
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
