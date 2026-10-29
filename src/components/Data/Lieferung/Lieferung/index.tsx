import { useState, useEffect } from 'react'
import { useAtomValue } from 'jotai'
import { Allotment } from 'allotment'

import {
  activeNodeArrayAtom,
  filterShowAtom,
  getNavigate,
  historyRevAtom,
  onlineAtom,
  store,
} from '../../../../store/index.ts'
import { ErrorBoundary } from '../../../shared/ErrorBoundary.tsx'
import { Spinner } from '../../../shared/Spinner.tsx'
import { LieferungConflict as Conflict } from './Conflict.tsx'
import { LieferungTitleChooser as FormTitle } from './FormTitle/index.tsx'
import { LierferungForm as Form } from './Form/index.tsx'
import { LieferungHistory as History } from './History/index.tsx'

import artStyles from '../../Art/index.module.css'

export const Lieferung = ({
  id,
  showFilter,
  row,
  rawRow,
}: {
  id?: string | undefined
  showFilter?: boolean
  row: import('../../../../dbModel.ts').Lieferung | null | undefined
  rawRow: string | null | undefined
}) => {
  const online = useAtomValue(onlineAtom)
  const filterShow = useAtomValue(filterShowAtom)

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

  if (!row) return <Spinner />
  if (!showFilter && filterShow) return null

  const paneIsSplit = online && (activeConflict || showHistory)

  return (
    <ErrorBoundary>
      <div
        className={artStyles.container}
        style={{ backgroundColor: showFilter ? 'var(--filter-bg)' : 'unset' }}
      >
        <FormTitle
          row={row}
          showFilter={showFilter ?? false}
          showHistory={showHistory}
        />
        <div className={artStyles.splitPaneContainer}>
          <Allotment key={`${activeConflict}/${showHistory}`}>
            <Form
              showFilter={showFilter ?? false}
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

export default Lieferung
