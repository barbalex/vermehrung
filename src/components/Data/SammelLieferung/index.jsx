import React, { useContext, useState, useEffect, useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import styled from '@emotion/styled'
import SplitPane from 'react-split-pane'
import { of as $of } from 'rxjs'

import StoreContext from '../../../storeContext'
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
const SplitPaneContainer = styled.div`
  height: 100%;
  position: relative;
  background-color: ${(props) => (props.showfilter ? '#fff3e0' : 'unset')};
`
const StyledSplitPane = styled(SplitPane)`
  .Resizer {
    background: rgba(74, 20, 140, 0.1);
    opacity: 1;
    z-index: 1;
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
  lieferung,
}) => {
  const store = useContext(StoreContext)

  const { filter, isPrint, online, db } = store

  const [dataState, setDataState] = useState({
    row: undefined,
    // need raw row because observable does not provoke rerendering of components
    rawRow: undefined,
  })
  useEffect(() => {
    const observable = showFilter
      ? $of(filter.sammel_lieferung)
      : db.get('sammel_lieferung').findAndObserve(id)
    const subscription = observable.subscribe((newRow) => {
      setDataState({
        row: newRow,
        rawRow: JSON.stringify(newRow?._raw ?? newRow),
      })
    })

    return () => subscription?.unsubscribe?.()
  }, [db, filter.sammel_lieferung, id, showFilter])
  const { row, rawRow } = dataState

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
          rawRow={rawRow}
          lieferung={lieferung}
          printPreview={printPreview}
          setPrintPreview={setPrintPreview}
          showHistory={showHistory}
          setShowHistory={setShowHistory}
        />
        {printPreview ? (
          <Lieferschein row={row} rawRow={rawRow} />
        ) : (
          <SplitPaneContainer>
            <StyledSplitPane
              split="vertical"
              size={firstPaneWidth}
              maxSize={-10}
              resizerStyle={resizerStyle}
            >
              <Form
                showFilter={showFilter}
                id={id}
                row={row}
                rawRow={rawRow}
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
              </>
            </StyledSplitPane>
          </SplitPaneContainer>
        )}
      </Container>
    </ErrorBoundary>
  )
}

export default observer(SammelLieferung)