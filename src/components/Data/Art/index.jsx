import React, {
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react'
import { observer } from 'mobx-react-lite'
import { useObservable, useObservableEagerState } from 'observable-hooks'
import { switchMap as switchMap$, map as map$ } from 'rxjs/operators'
import styled from '@emotion/styled'
import { Allotment } from 'allotment'
import { of as $of } from 'rxjs'

import { MobxStoreContext } from '../../../mobxStoreContext.js'
import { ErrorBoundary } from '../../shared/ErrorBoundary.jsx'
import { Spinner } from '../../shared/Spinner.jsx'
import { ArtConflict as Conflict } from './Conflict.jsx'
import { ArtFormTitle as FormTitle } from './FormTitle/index.jsx'
import { ArtForm as Form } from './Form/index.jsx'
import { ArtHistory as History } from './History/index.jsx'

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

export const Art = observer(
  ({
    filter: showFilter = false,
    id = '99999999-9999-9999-9999-999999999999',
  }) => {
    const store = useContext(MobxStoreContext)
    const { filter, online, db, initialDataQueried } = store

    // const row = useObservableEagerState(
    //   useObservable(
    //     (input$) =>
    //       input$.pipe(
    //         switchMap$((id) =>
    //           showFilter ? $of(filter.art)
    //           : initialDataQueried ? db.get('art').findAndObserve(id)
    //           : $of({}),
    //         ),
    //       ),
    //     [id, filter.art, initialDataQueried, showFilter],
    //   ),
    // )

    // get one out of list
    // const row = useObservableEagerState(
    //   useObservable(
    //     (inputs$) =>
    //       inputs$.pipe(
    //         switchMap$((id) =>
    //           showFilter ? $of(filter.art)
    //           : initialDataQueried ? db.get('art').findAndObserve(id)
    //           : $of({}),
    //         ),
    //         map$((posts) => posts[0]),
    //       ),
    //     [id, filter.art, initialDataQueried, showFilter],
    //   ),
    // )

    // how to get by id according to: https://github.com/Nozbe/withObservables/issues/16#issuecomment-2081446530
    // TODO: returns {}
    // const row = useObservableEagerState(
    //   useObservable(
    //     (input$) =>
    //       switchMap$(([id]) =>
    //         showFilter ? $of(filter.art)
    //         : initialDataQueried ? db.get('art').findAndObserve(id)
    //         : $of({}),
    //       )(input$),
    //     [id, filter.art, initialDataQueried, showFilter],
    //   ),
    // )
    // simplified, works (but not for filter)
    // const row = useObservableEagerState(
    //   useObservable(
    //     (input$) =>
    //       switchMap$(([id]) => db.get('art').findAndObserve(id))(input$),
    //     [id, filter.art, initialDataQueried, showFilter],
    //   ),
    // )

    // simplified, works (but errors before initialDataQueried, because record can not be found)
    // const row = useObservableEagerState(
    //   useObservable(
    //     (input$) =>
    //       switchMap$(([id]) =>
    //         showFilter ? $of(filter.art) : db.get('art').findAndObserve(id),
    //       )(input$),
    //     [id, filter.art, initialDataQueried, showFilter],
    //   ),
    // )
    // catching error. Would need to re-render component to get record after initialDataQueried
    // works but not elegant
    // let row
    // try {
    //   row = useObservableEagerState(
    //     useObservable(
    //       (input$) =>
    //         switchMap$(([id]) =>
    //           showFilter ? $of(filter.art) : db.get('art').findAndObserve(id),
    //         )(input$),
    //       [id, filter.art, initialDataQueried, showFilter],
    //     ),
    //   )
    // } catch (error) {
    //   console.error('Art, error:', error)
    //   setTimeout(() => window.location.reload(), 1000)
    // }
    // returns only {}. Why?
    // const row = useObservableEagerState(
    //   useObservable(
    //     (input$) =>
    //       switchMap$(([id]) =>
    //         showFilter ? $of(filter.art)
    //         : initialDataQueried ? db.get('art').findAndObserve(id)
    //         : $of({}),
    //       )(input$),
    //     [id, filter.art, initialDataQueried, showFilter],
    //   ),
    // )

    // how to get by id according to: https://github.com/Nozbe/withObservables/issues/16#issuecomment-2133203789
    // TODO: returns {}
    // const row = useObservableEagerState(
    //   useObservable(
    //     (input$) =>
    //       input$.pipe(
    //         switchMap$(([id]) =>
    //           showFilter ? $of(filter.art)
    //           : initialDataQueried ? db.get('art').findAndObserve(id)
    //           : $of({}),
    //         ),
    //       ),
    //     [id, filter.art, initialDataQueried, showFilter],
    //   ),
    // )

    const [row, setRow] = useState(null)
    // need raw row because observable does not provoke rerendering of components
    const [rawRow, setRawRow] = useState(null)
    useEffect(() => {
      const observable =
        showFilter ? $of(filter.art)
        : initialDataQueried ? db.get('art').findAndObserve(id)
        : $of({})
      const subscription = observable.subscribe((newRow) => {
        setRow(newRow)
        setRawRow(JSON.stringify(newRow?._raw ?? newRow))
      })
      return () => subscription?.unsubscribe?.()
    }, [db, filter.art, id, initialDataQueried, showFilter])

    console.log('Art', { row, initialDataQueried, showFilter })

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

    if (!row || !Object.keys(row ?? {}).length) return <Spinner />
    if (!showFilter && filter.show) return null

    const paneIsSplit = online && (activeConflict || showHistory)

    //console.log('Art, row:', row)

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
  },
)
