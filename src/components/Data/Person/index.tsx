import { useState, useEffect } from 'react'
import { useAtomValue } from 'jotai'
import { Allotment } from 'allotment'
import { of as $of } from 'rxjs'

import {
  activeNodeArrayAtom,
  dbAtom,
  filterPersonAtom,
  filterShowAtom,
  getNavigate,
  historyRevAtom,
  initialDataQueriedAtom,
  onlineAtom,
  store,
} from '../../../store/index.ts'
import { ErrorBoundary } from '../../shared/ErrorBoundary.tsx'
import { Spinner } from '../../shared/Spinner.tsx'
import { PersonConflict as Conflict } from './Conflict.tsx'
import { PersonFormTitleChooser as FormTitle } from './FormTitle/index.tsx'
import { PersonForm as Form } from './Form/index.tsx'
import { PersonHistory as History } from './History/index.tsx'

import artStyles from '../Art/index.module.css'

export const Person = ({
  filter: showFilter = false,
  id = '99999999-9999-9999-9999-999999999999',
}: {
  filter?: boolean
  id?: string | undefined
}) => {
  const personFilter = useAtomValue(filterPersonAtom)
  const filterShow = useAtomValue(filterShowAtom)
  const online = useAtomValue(onlineAtom)
  const db = useAtomValue(dbAtom)
  const initialDataQueried = useAtomValue(initialDataQueriedAtom)
  const [dataState, setDataState] = useState<{
    row: import('../../../dbModel.ts').Person | undefined
    // need raw row because observable does not provoke rerendering of components
  }>({ row: undefined })
  useEffect(() => {
    const personObservable = showFilter
      ? $of(undefined)
      : initialDataQueried || !online
        ? db
            ?.get<import('../../../dbModel.ts').Person>('person')
            .findAndObserve(id as string)
        : $of(undefined)
    const subscription = (
      personObservable as unknown as import('rxjs').Observable<
        import('../../../dbModel.ts').Person | undefined
      >
    )?.subscribe((newRow) => {
      setDataState({ row: newRow })
    })

    return () => subscription?.unsubscribe?.()
  }, [db, personFilter, id, showFilter, initialDataQueried, online])
  const { row } = dataState

  const [activeConflict, setActiveConflict] = useState<string | null>(null)
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

  if (!row || !Object.keys(row ?? {}).length) return <Spinner />
  if (!showFilter && filterShow) return null

  const paneIsSplit = online && (activeConflict || showHistory)

  return (
    <ErrorBoundary>
      <div
        className={artStyles.container}
        style={{ backgroundColor: showFilter ? 'var(--filter-bg)' : 'unset' }}
      >
        <FormTitle
          showFilter={showFilter}
          row={row}
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
