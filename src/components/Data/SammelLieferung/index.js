import React, { useContext, useState, useEffect, useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'
import SplitPane from 'react-split-pane'
import { useDatabase } from '@nozbe/watermelondb/hooks'

import { StoreContext } from '../../../models/reactUtils'
import Lieferschein from './Lieferschein'
import ErrorBoundary from '../../shared/ErrorBoundary'
import Spinner from '../../shared/Spinner'
import Conflict from './Conflict'
import FormTitle from './FormTitle'
import Form from './Form'
import History from './History'

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${(props) => (props.showfilter ? '#fff3e0' : 'unset')};
`
const StyledSplitPane = styled(SplitPane)`
  height: calc(100vh - 64px - 48px) !important;
  .Resizer {
    background: rgba(74, 20, 140, 0.1);
    opacity: 1;
    z-index: 1;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 7px;
    cursor: col-resize;
  }
  .Resizer:hover {
    -webkit-transition: all 0.5s ease;
    transition: all 0.5s ease;
    background-color: #fff59d !important;
  }
  .Resizer.disabled {
    cursor: not-allowed;
  }
  .Resizer.disabled:hover {
    border-color: transparent;
  }
  .Pane {
    overflow: hidden;
  }
`

const SammelLieferung = ({
  filter: showFilter,
  id = '99999999-9999-9999-9999-999999999999',
  lieferungId,
}) => {
  const store = useContext(StoreContext)

  const { filter, isPrint, online } = store

  const db = useDatabase()
  const [row, setRow] = useState(null)
  useEffect(() => {
    let subscription
    if (showFilter) {
      setRow(filter.sammel_lieferung)
    } else {
      subscription = db.collections
        .get('sammel_lieferung')
        .findAndObserve(id)
        .subscribe(setRow)
    }
    return () => {
      if (subscription) subscription.unsubscribe()
    }
  }, [db.collections, filter.sammel_lieferung, id, showFilter])

  const [activeConflict, setActiveConflict] = useState(null)
  const conflictDisposalCallback = useCallback(
    () => setActiveConflict(null),
    [],
  )
  const conflictSelectionCallback = useCallback(
    () => setActiveConflict(null),
    [],
  )
  // ensure that activeConflict is reset
  // when changing dataset
  useEffect(() => {
    setActiveConflict(null)
  }, [id])

  // setting initial value like this is necessary
  // because during printing page Vermehrung re-renders without tree
  const [printPreview, setPrintPreview] = useState(isPrint && !printPreview)

  const [showHistory, setShowHistory] = useState(null)
  const historyTakeoverCallback = useCallback(() => setShowHistory(null), [])

  if (!row) return <Spinner />
  if (!showFilter && filter.show) return null

  const paneIsSplit = online && (activeConflict || showHistory)

  const firstPaneWidth = paneIsSplit ? '50%' : '100%'
  // hide resizer when tree is hidden
  const resizerStyle = !paneIsSplit ? { width: 0 } : {}

  return (
    <ErrorBoundary>
      <Container showfilter={showFilter}>
        <FormTitle
          showFilter={showFilter}
          row={row}
          lieferungId={lieferungId}
          printPreview={printPreview}
          setPrintPreview={setPrintPreview}
          showHistory={showHistory}
          setShowHistory={setShowHistory}
        />
        {printPreview ? (
          <Lieferschein row={row} />
        ) : (
          <Container>
            <StyledSplitPane
              split="vertical"
              size={firstPaneWidth}
              minSize={200}
              resizerStyle={resizerStyle}
            >
              <Form
                showFilter={showFilter}
                id={id}
                row={row}
                activeConflict={activeConflict}
                setActiveConflict={setActiveConflict}
                showHistory={showHistory}
              />
              <>
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
              </>
            </StyledSplitPane>
          </Container>
        )}
      </Container>
    </ErrorBoundary>
  )
}

export default observer(SammelLieferung)
