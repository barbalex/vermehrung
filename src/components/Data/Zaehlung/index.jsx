import {
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react'
import { observer } from 'mobx-react-lite'
import styled from '@emotion/styled'
import { Allotment } from 'allotment'
import { of as $of } from 'rxjs'

import { MobxStoreContext } from '../../../mobxStoreContext.js'
import { ErrorBoundary } from '../../shared/ErrorBoundary.jsx'
import { Spinner } from '../../shared/Spinner.jsx'
import { ZaehlungConflict as Conflict } from './Conflict.jsx'
import { ZaehlungFormTitleChooser as FormTitle } from './FormTitle/index.jsx'
import { ZaehlungForm as Form } from './Form/index.jsx'
import { ZaehlungHistory as History } from './History/index.jsx'
import { useObservable } from '../../../utils/useObservable.js'

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

export const Zaehlung = observer(
  ({
    filter: showFilter = false,
    id = '99999999-9999-9999-9999-999999999999',
  }) => {
    const store = useContext(MobxStoreContext)
    const { filter, online, db, initialDataQueried } = store

    const observable = useMemo(
      () =>
        showFilter ? $of(filter.zaehlung)
        : initialDataQueried ? db.get('zaehlung').findAndObserve(id)
        : $of({}),
      [db, filter.zaehlung, id, initialDataQueried, showFilter],
    )
    const row = useObservable(observable)

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
        <>
          <Container showfilter={showFilter}>
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
        </>
      </ErrorBoundary>
    )
  },
)
