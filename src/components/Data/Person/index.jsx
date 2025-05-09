import React, { useContext, useState, useCallback, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import styled from '@emotion/styled'
import { Allotment } from 'allotment'
import { of as $of } from 'rxjs'

import { MobxStoreContext } from '../../../mobxStoreContext.js'
import { ErrorBoundary } from '../../shared/ErrorBoundary.jsx'
import { Spinner } from '../../shared/Spinner.jsx'
import { PersonConflict as Conflict } from './Conflict.jsx'
import { PersonFormTitleChooser as FormTitle } from './FormTitle/index.jsx'
import { PersonForm as Form } from './Form/index.jsx'
import { PersonHistory as History } from './History/index.jsx'

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

export const Person = observer(
  ({
    filter: showFilter = false,
    id = '99999999-9999-9999-9999-999999999999',
  }) => {
    const store = useContext(MobxStoreContext)
    const { filter, online, db, initialDataQueried } = store
    const [dataState, setDataState] = useState({
      row: undefined,
      // need raw row because observable does not provoke rerendering of components
      rawRow: undefined,
    })
    useEffect(() => {
      const personObservable =
        showFilter ? $of(filter.person)
        : initialDataQueried ? db.get('person').findAndObserve(id)
        : $of({})
      const subscription = personObservable.subscribe((newRow) => {
        setDataState({
          row: newRow,
          rawRow: JSON.stringify(newRow?._raw ?? newRow),
        })
      })

      return () => subscription?.unsubscribe?.()
    }, [db, filter.person, id, showFilter, initialDataQueried])
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

    if (!row || !Object.keys(row ?? {})) return <Spinner />
    if (!showFilter && filter.show) return null

    const paneIsSplit = online && (activeConflict || showHistory)

    return (
      <ErrorBoundary>
        <Container showfilter={showFilter}>
          <FormTitle
            showFilter={showFilter}
            row={row}
            rawRow={rawRow}
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
  },
)
