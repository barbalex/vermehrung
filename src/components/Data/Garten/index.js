import React, { useContext, useState, useCallback, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'
import SplitPane from 'react-split-pane'

import { StoreContext } from '../../../models/reactUtils'
import ErrorBoundary from '../../shared/ErrorBoundary'
import Spinner from '../../shared/Spinner'
import Conflict from './Conflict'
import Form from './Form'
import FormTitle from './FormTitle'
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

const Garten = ({
  filter: showFilter,
  id = '99999999-9999-9999-9999-999999999999',
  row: rowPassed,
  renderEnforcer,
}) => {
  const store = useContext(StoreContext)
  const { filter, online } = store

  const row = showFilter ? filter.garten : rowPassed

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
          row={row}
          showFilter={showFilter}
          showHistory={showHistory}
          setShowHistory={setShowHistory}
        />
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
              renderEnforcer={renderEnforcer}
              activeConflict={activeConflict}
              setActiveConflict={setActiveConflict}
              showHistory={showHistory}
            />
            <>
              {online && (
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
              )}
            </>
          </StyledSplitPane>
        </Container>
      </Container>
    </ErrorBoundary>
  )
}

export default observer(Garten)
