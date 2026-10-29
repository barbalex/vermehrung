import { useState, useEffect, useMemo } from 'react'
import { useAtomValue } from 'jotai'
import { Allotment } from 'allotment'
import { of as $of } from 'rxjs'

import {
  activeNodeArrayAtom,
  dbAtom,
  filterSammelLieferungAtom,
  filterShowAtom,
  getNavigate,
  historyRevAtom,
  initialDataQueriedAtom,
  isPrintAtom,
  onlineAtom,
  store,
} from '../../../store/index.ts'
import { Lieferschein } from './Lieferschein/index.tsx'
import { ErrorBoundary } from '../../shared/ErrorBoundary.tsx'
import { Spinner } from '../../shared/Spinner.tsx'
import { SammelLieferungConflict as Conflict } from './Conflict.tsx'
import { SammelLieferungFormTitleChooser as FormTitle } from './FormTitle/index.tsx'
import { SammelLieferungForm as Form } from './Form/index.tsx'
import { SammelLieferungHistory as History } from './History/index.tsx'
import { useObservable } from '../../../utils/useObservable.ts'

import artStyles from '../Art/index.module.css'

export const SammelLieferung = ({
  filter: showFilter = false,
  id = '99999999-9999-9999-9999-999999999999',
  lieferung,
}: {
  filter?: boolean
  id?: string | undefined
  lieferung: import('../../dbModel.ts').Lieferung | null | undefined
}) => {
  const isPrint = useAtomValue(isPrintAtom)
  const online = useAtomValue(onlineAtom)
  const db = useAtomValue(dbAtom)
  const filterShow = useAtomValue(filterShowAtom)
  const sammelLieferungFilter = useAtomValue(filterSammelLieferungAtom)
  const initialDataQueried = useAtomValue(initialDataQueriedAtom)

  // removing useMemo causes: Maximum update depth exceeded
  const observable = useMemo(
    () =>
      showFilter
        ? $of(sammelLieferungFilter)
        : initialDataQueried || !online
          ? db?.get('sammel_lieferung').findAndObserve(id)
          : $of({}),
    [db, sammelLieferungFilter, id, initialDataQueried, online, showFilter],
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

  // setting initial value like this is necessary
  // because during printing page Vermehrung re-renders without tree
  const [printPreview, setPrintPreview] = useState(isPrint && !printPreview)

  // history is url-driven: the url ends with '/histories/<rev>'
  // which is not part of activeNodeArray
  const historyRev = useAtomValue(historyRevAtom)
  const showHistory = historyRev !== undefined
  const historyTakeoverCallback = () =>
    getNavigate()?.(`/Vermehrung/${store.get(activeNodeArrayAtom).join('/')}`)

  if (!row || !Object.keys(row)?.length) return <Spinner />
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
          lieferung={lieferung}
          printPreview={printPreview}
          setPrintPreview={setPrintPreview}
          showHistory={showHistory}
        />
        {printPreview ? (
          <Lieferschein row={row} />
        ) : (
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
        )}
      </div>
    </ErrorBoundary>
  )
}
