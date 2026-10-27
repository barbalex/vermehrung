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
} from '../../../../store/index.js'
import { ErrorBoundary } from '../../../shared/ErrorBoundary.jsx'
import { Spinner } from '../../../shared/Spinner.jsx'
import { LieferungConflict as Conflict } from './Conflict.jsx'
import { LieferungTitleChooser as FormTitle } from './FormTitle/index.jsx'
import { LierferungForm as Form } from './Form/index.jsx'
import { LieferungHistory as History } from './History/index.jsx'

import artStyles from '../../Art/index.module.css'

export const Lieferung = ({ id, showFilter, row, rawRow }) => {
  const online = useAtomValue(onlineAtom)
  const filterShow = useAtomValue(filterShowAtom)

  const [activeConflict, setActiveConflict] = useState(null)
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
          rawRow={rawRow}
          showFilter={showFilter}
          showHistory={showHistory}
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

export default Lieferung
