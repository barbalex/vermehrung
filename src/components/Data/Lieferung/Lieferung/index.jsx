import React, { useContext, useState, useEffect, useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import styled from '@emotion/styled'
import { Allotment } from 'allotment'

import { MobxStoreContext } from '../../../../mobxStoreContext.js'
import { ErrorBoundary } from '../../../shared/ErrorBoundary.jsx'
import { Spinner } from '../../../shared/Spinner.jsx'
import Conflict from './Conflict.jsx'
import FormTitle from './FormTitle/index.jsx'
import { LierferungForm as Form } from './Form/index.jsx'
import { LieferungHistory as History } from './History/index.jsx'

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

export const Lieferung = observer(({ id, showFilter, row, rawRow }) => {
  const store = useContext(MobxStoreContext)
  const { filter, online } = store

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

  const [showHistory, setShowHistory] = useState(false)
  const historyTakeoverCallback = useCallback(() => setShowHistory(null), [])

  if (!row) return <Spinner />
  if (!showFilter && filter.show) return null

  const paneIsSplit = online && (activeConflict || showHistory)

  return (
    <ErrorBoundary>
      <Container showfilter={showFilter}>
        <FormTitle
          row={row}
          rawRow={rawRow}
          showFilter={showFilter}
          showHistory={showHistory}
          setShowHistory={setShowHistory}
        />
        <SplitPaneContainer>
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
        </SplitPaneContainer>
      </Container>
    </ErrorBoundary>
  )
})

export default Lieferung
