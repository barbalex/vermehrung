import { useContext, useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { Allotment } from 'allotment'

import { MobxStoreContext } from '../../../../mobxStoreContext.js'
import { ErrorBoundary } from '../../../shared/ErrorBoundary.jsx'
import { Spinner } from '../../../shared/Spinner.jsx'
import { LieferungConflict as Conflict } from './Conflict.jsx'
import { LieferungTitleChooser as FormTitle } from './FormTitle/index.jsx'
import { LierferungForm as Form } from './Form/index.jsx'
import { LieferungHistory as History } from './History/index.jsx'

import artStyles from '../../Art/index.module.css'

export const Lieferung = observer(({ id, showFilter, row, rawRow }) => {
  const store = useContext(MobxStoreContext)
  const { filter, online } = store

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

  if (!row) return <Spinner />
  if (!showFilter && filter.show) return null

  const paneIsSplit = online && (activeConflict || showHistory)

  return (
    <ErrorBoundary>
      <div
        className={artStyles.container}
        style={{ backgroundColor: showFilter ? '#fff3e0' : 'unset' }}
      >
        <FormTitle
          row={row}
          rawRow={rawRow}
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
              rawRow={rawRow}
              activeConflict={activeConflict}
              setActiveConflict={setActiveConflict}
              showHistory={showHistory}
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
})

export default Lieferung
