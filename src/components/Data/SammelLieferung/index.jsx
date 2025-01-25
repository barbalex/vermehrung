import React, {
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
import { Lieferschein } from './Lieferschein/index.jsx'
import { ErrorBoundary } from '../../shared/ErrorBoundary.jsx'
import { Spinner } from '../../shared/Spinner.jsx'
import { SammelLieferungConflict as Conflict } from './Conflict.jsx'
import { SammelLieferungFormTitleChooser as FormTitle } from './FormTitle/index.jsx'
import { SammelLieferungForm as Form } from './Form/index.jsx'
import { SammelLieferungHistory as History } from './History/index.jsx'
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

export const SammelLieferung = observer(
  ({
    filter: showFilter = false,
    id = '99999999-9999-9999-9999-999999999999',
    lieferung,
  }) => {
    const store = useContext(MobxStoreContext)

    const { filter, isPrint, online, db, initialDataQueried } = store

    const observable = useMemo(
      () =>
        showFilter ? $of(filter.sammel_lieferung)
        : initialDataQueried ? db.get('sammel_lieferung').findAndObserve(id)
        : $of({}),
      [db, filter.sammel_lieferung, id, initialDataQueried, showFilter],
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
            lieferung={lieferung}
            printPreview={printPreview}
            setPrintPreview={setPrintPreview}
            showHistory={showHistory}
            setShowHistory={setShowHistory}
          />
          {printPreview ?
            <Lieferschein row={row} />
          : <SplitPaneContainer>
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
          }
        </Container>
      </ErrorBoundary>
    )
  },
)
