import { useContext, useState, useEffect, useMemo } from 'react'
import { observer } from 'mobx-react-lite'
import styled from '@emotion/styled'
import { Allotment } from 'allotment'
import { of as $of } from 'rxjs'

import { MobxStoreContext } from '../../../mobxStoreContext.js'
import { SammlungFormTitleChooser as FormTitle } from './FormTitle/index.jsx'
import { SammlungForm as Form } from './Form/index.jsx'
import { ErrorBoundary } from '../../shared/ErrorBoundary.jsx'
import { Spinner } from '../../shared/Spinner.jsx'
import { SammlungConflict as Conflict } from './Conflict.jsx'
import { SammlungHistory as History } from './History/index.jsx'
import { useObservable } from '../../../utils/useObservable.js'

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`
const SplitPaneContainer = styled.div`
  height: 100%;
  position: relative;
`

export const Sammlung = observer(
  ({
    filter: showFilter = false,
    id = '99999999-9999-9999-9999-999999999999',
  }) => {
    const store = useContext(MobxStoreContext)
    const { filter, online, db, initialDataQueried } = store

    // removing useMemo causes: Maximum update depth exceeded
    const observable = useMemo(
      () =>
        showFilter ? $of(filter.sammlung)
        : initialDataQueried ? db.get('sammlung').findAndObserve(id)
        : $of({}),
      [db, filter.sammlung, id, initialDataQueried, showFilter],
    )
    const row = useObservable(observable)

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

    if (!row || !Object.keys(row ?? {})) return <Spinner />
    if (!showFilter && filter.show) return null

    const paneIsSplit = online && (activeConflict || showHistory)

    return (
      <ErrorBoundary>
        <Container
          style={{ backgroundColor: showFilter ? '#fff3e0' : 'unset' }}
        >
          <FormTitle
            row={row}
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
                    conflictDisposalCallback={conflictDisposalCallback}
                    conflictSelectionCallback={conflictSelectionCallback}
                    setActiveConflict={setActiveConflict}
                  />
                : showHistory ?
                  <History
                    row={row}
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
