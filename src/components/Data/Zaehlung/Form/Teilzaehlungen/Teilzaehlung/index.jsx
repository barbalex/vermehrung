import React, { useState, useEffect, useCallback, useContext } from 'react'
import { observer } from 'mobx-react-lite'
import styled from '@emotion/styled'
import { of as $of } from 'rxjs'
import { Allotment } from 'allotment'

import StoreContext from '../../../../../../storeContext'
import ErrorBoundary from '../../../../../shared/ErrorBoundary.jsx'
import Conflict from './Conflict'
import Form from './Form'
import History from './History'

const Container = styled.div`
  position: relative;
`
const InnerContainer = styled.div`
  padding-left: 10px;
`
const SplitPaneContainer = styled.div`
  padding-left: 10px;
  height: 650px;
  position: relative;
`
const TopLine = styled.div`
  background-color: rgba(74, 20, 140, 0.1);
  height: 4px;
  margin-left: -10px;
  margin-right: -10px;
  margin-bottom: 10px;
`

const Teilzaehlung = ({ id, kulturId, index }) => {
  const store = useContext(StoreContext)
  const { online, db, initialDataQueried } = store

  // TODO: should I subscribe to this row to rerender on updates of history?

  const [dataState, setDataState] = useState({
    row: undefined,
    // need raw row because observable does not provoke rerendering of components
    rawRow: undefined,
  })
  useEffect(() => {
    const tzObservable = initialDataQueried
      ? db.get('teilzaehlung').findAndObserve(id)
      : $of({})
    const subscription = tzObservable.subscribe((newRow) => {
      setDataState({
        row: newRow,
        rawRow: JSON.stringify(newRow?._raw ?? newRow),
      })
    })

    return () => subscription?.unsubscribe?.()
  }, [db, id, initialDataQueried])
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

  const [showHistory, setShowHistory] = useState(false)
  const historyTakeoverCallback = useCallback(() => setShowHistory(null), [])

  const paneIsSplit = online && (activeConflict || showHistory)

  if (online && (activeConflict || showHistory)) {
    return (
      <ErrorBoundary>
        <Container>
          {!!index && <TopLine />}
          <SplitPaneContainer>
            <Allotment key={`${activeConflict}/${showHistory}`}>
              <Form
                id={id}
                kulturId={kulturId}
                activeConflict={activeConflict}
                setActiveConflict={setActiveConflict}
                showHistory={showHistory}
                setShowHistory={setShowHistory}
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
          </SplitPaneContainer>
        </Container>
      </ErrorBoundary>
    )
  }

  return (
    <ErrorBoundary>
      <Container>
        {!!index && <TopLine />}
        <InnerContainer>
          <Form
            id={id}
            kulturId={kulturId}
            activeConflict={activeConflict}
            setActiveConflict={setActiveConflict}
            showHistory={showHistory}
            setShowHistory={setShowHistory}
          />
        </InnerContainer>
      </Container>
    </ErrorBoundary>
  )
}

export default observer(Teilzaehlung)
