import { useState, useEffect, useMemo } from 'react'
import { useAtomValue } from 'jotai'
import { Allotment } from 'allotment'
import { of as $of } from 'rxjs'

import {
  activeNodeArrayAtom,
  dbAtom,
  filterEventAtom,
  filterShowAtom,
  getNavigate,
  historyRevAtom,
  initialDataQueriedAtom,
  onlineAtom,
  store,
} from '../../../store/index.ts'
import { EventFormTitle as FormTitle } from './FormTitle/index.tsx'
import { ErrorBoundary } from '../../shared/ErrorBoundary.tsx'
import { Spinner } from '../../shared/Spinner.tsx'
import { EventConflict as Conflict } from './Conflict.tsx'
import { EventForm as Form } from './Form/index.tsx'
import { EventHistory as History } from './History/index.tsx'
import { useObservable } from '../../../utils/useObservable.ts'

import artStyles from '../Art/index.module.css'

export const Event = ({
  filter: showFilter = false,
  id = '99999999-9999-9999-9999-999999999999',
}: {
  filter?: boolean
  id: string | undefined
}) => {
  const db = useAtomValue(dbAtom)
  const online = useAtomValue(onlineAtom)
  const filterShow = useAtomValue(filterShowAtom)
  const eventFilter = useAtomValue(filterEventAtom)
  const initialDataQueried = useAtomValue(initialDataQueriedAtom)

  // removing useMemo causes: Maximum update depth exceeded
  const observable = useMemo(
    () =>
      showFilter
        ? $of(eventFilter)
        : initialDataQueried || !online
          ? db?.get('event').findAndObserve(id)
          : $of({}),
    [db, eventFilter, id, initialDataQueried, online, showFilter],
  )
  const row = useObservable(observable)

  const [activeConflict, setActiveConflict] = useState(null)
  // TODO: should resync
  const conflictDisposalCallback = () => setActiveConflict(null)
  const conflictSelectionCallback = () => setActiveConflict(null)
  // ensure that activeConflict is reset
  // when changing dataset
  useEffect(() => {
    setActiveConflict(null)
  }, [id])

  // history is url-driven: the url ends with '/histories/<rev>'
  // which is not part of activeNodeArray
  const historyRev = useAtomValue(historyRevAtom)
  const showHistory = historyRev !== undefined
  const historyTakeoverCallback = () =>
    getNavigate()?.(`/Vermehrung/${store.get(activeNodeArrayAtom).join('/')}`)

  if (!row || !Object.keys(row).length) return <Spinner />
  if (!showFilter && filterShow) return null

  const paneIsSplit = online && (!!activeConflict || !!showHistory)

  return (
    <ErrorBoundary>
      <div
        className={artStyles.container}
        style={{ backgroundColor: showFilter ? 'var(--filter-bg)' : 'unset' }}
      >
        <FormTitle
          row={row}
          showFilter={showFilter}
          showHistory={showHistory}
        />
        <div className={artStyles.splitPaneContainer}>
          <Allotment key={`${activeConflict}/${showHistory}`}>
            <Form
              showFilter={showFilter}
              id={id}
              row={row}
              activeConflict={activeConflict}
              setActiveConflict={
                  setActiveConflict as unknown as never
                }
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
                  setActiveConflict={
                  setActiveConflict as unknown as never
                }
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
