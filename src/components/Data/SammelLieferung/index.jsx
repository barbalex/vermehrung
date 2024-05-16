import React, { useContext, useState, useEffect, useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import styled from '@emotion/styled'
import { Allotment } from 'allotment'
import { of as $of } from 'rxjs'

import StoreContext from '../../../storeContext.js'
import Lieferschein from './Lieferschein'
import ErrorBoundary from '../../shared/ErrorBoundary.jsx'
import Spinner from '../../shared/Spinner.jsx'
import Conflict from './Conflict.jsx'
import FormTitle from './FormTitle'
import Form from './Form/index.jsx'
import History from './History/index.jsx'

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

const SammelLieferung = ({
  filter: showFilter = false,
  id = '99999999-9999-9999-9999-999999999999',
  lieferung,
}) => {
  const store = useContext(StoreContext)

  const { filter, isPrint, online, db, initialDataQueried } = store

  const [dataState, setDataState] = useState({
    row: undefined,
    // need raw row because observable does not provoke rerendering of components
    rawRow: undefined,
  })
  useEffect(() => {
    const observable = showFilter
      ? $of(filter.sammel_lieferung)
      : initialDataQueried
      ? db.get('sammel_lieferung').findAndObserve(id)
      : $of({})
    const subscription = observable.subscribe((newRow) => {
      setDataState({
        row: newRow,
        rawRow: JSON.stringify(newRow?._raw ?? newRow),
      })
    })

    return () => subscription?.unsubscribe?.()
  }, [db, filter.sammel_lieferung, id, showFilter, initialDataQueried])
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

  const [showHistory, setShowHistory] = useState(false)
  const historyTakeoverCallback = useCallback(() => setShowHistory(null), [])

  if (!row || !Object.keys(row)?.length) return <Spinner />
  if (!showFilter && filter.show) return null

  const paneIsSplit = online && (activeConflict || showHistory)

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
          </SplitPaneContainer>
        )}
      </Container>
    </ErrorBoundary>
  )
}

export default observer(SammelLieferung)
