import React, { useContext, useState, useEffect, useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import styled from '@emotion/styled'
import { Allotment } from 'allotment'
import { of as $of } from 'rxjs'

import { MobxStoreContext } from '../../../mobxStoreContext.js'
import { ErrorBoundary } from '../../shared/ErrorBoundary.jsx'
import { Spinner } from '../../shared/Spinner.jsx'
import { HerkunftConflict as Conflict } from './Conflict.jsx'
import { HerkunftFormTitleChooser as FormTitle } from './FormTitle/index.jsx'
import { HerkunftForm as Form } from './Form/index.jsx'
import { HerkunftHistory as History } from './History/index.jsx'

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

export const Herkunft = observer(
  ({
    filter: showFilter = false,
    id = '99999999-9999-9999-9999-999999999999',
  }) => {
    const store = useContext(MobxStoreContext)
    const { filter, online, db, initialDataQueried } = store

    const [row, setRow] = useState(null)
    // need raw row because observable does not provoke rerendering of components
    const [rawRow, setRawRow] = useState(null)
    // TODO: extend to all forms
    // Problem if user opens url with id of a dataset that does not yet exist
    // because it still needs to be synced
    // Uncaught Diagnostic error: Record herkunft#baa5e4f0-3877-11eb-be32-f734f6afd51d not found
    // => need to wait for sync to be finished
    useEffect(() => {
      const observable =
        showFilter ? $of(filter.herkunft)
        : initialDataQueried ? db.get('herkunft').findAndObserve(id)
        : $of({})
      const subscription = observable.subscribe((newRow) => {
        setRow(newRow)
        setRawRow(JSON.stringify(newRow?._raw ?? newRow))
      })

      return () => subscription?.unsubscribe?.()
    }, [db, filter.herkunft, id, showFilter, initialDataQueried])

    const [activeConflict, setActiveConflict] = useState(null)
    const conflictDisposalCallback = useCallback(
      () => setActiveConflict(null),
      [],
    )
    const conflictSelectionCallback = useCallback(
      async () => setActiveConflict(null),
      [],
    )
    // ensure that activeConflict is reset
    // when changing dataset
    useEffect(() => {
      setActiveConflict(null)
    }, [id])

    const [showHistory, setShowHistory] = useState(false)
    const historyTakeoverCallback = useCallback(() => setShowHistory(null), [])

    if (!row || !Object.keys(row ?? {})) return <Spinner />
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
            activeConflict={activeConflict}
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
  },
)
