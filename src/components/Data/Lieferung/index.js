import React, { useContext, useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'
import SplitPane from 'react-split-pane'
import isUuid from 'is-uuid'
import last from 'lodash/last'
import { combineLatest, of as $of } from 'rxjs'

import Lieferung from './Lieferung'
import SammelLieferung from '../SammelLieferung'
import { StoreContext } from '../../../models/reactUtils'
import getUserPersonOption from '../../../utils/getUserPersonOption'

const StyledSplitPane = styled(SplitPane)`
  height: calc(100vh - 64px) !important;
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

const LieferungContainer = ({ filter: showFilter, id: idPassed }) => {
  const store = useContext(StoreContext)
  const { filter, db, user } = store
  const { activeNodeArray } = store.tree
  let id = idPassed
  if (!idPassed) {
    id = showFilter
      ? '99999999-9999-9999-9999-999999999999'
      : last(activeNodeArray.filter((e) => isUuid.v1(e)))
  }

  const [dataState, setDataState] = useState({
    row: undefined,
    rawRow: undefined,
    userPersonOption: undefined,
    sammelLieferung: undefined,
  })
  useEffect(() => {
    const lieferungObservable = showFilter
      ? $of(filter.lieferung)
      : db.collections.get('lieferung').findAndObserve(id)
    const sammelLieferungObservable =
      showFilter || !row?.sammel_lieferung ? $of({}) : row.sammel_lieferung
    const combinedObservables = combineLatest([
      lieferungObservable,
      sammelLieferungObservable,
    ])
    const allSubscription = combinedObservables.subscribe(
      async ([lieferung, sammelLieferung]) => {
        const userPersonOption = await getUserPersonOption({ user, db })

        setDataState({
          row: lieferung,
          rawRow: lieferung?._raw ?? lieferung,
          userPersonOption,
          sammelLieferung,
        })
      },
    )

    return () => allSubscription.unsubscribe()
  }, [db, filter.lieferung, id, row?.sammel_lieferung, showFilter, user])
  const { row, rawRow, userPersonOption, sammelLieferung } = dataState
  const { li_show_sl } = userPersonOption ?? {}

  if (row?.sammel_lieferung_id && li_show_sl) {
    // this lieferung is part of a sammel_lieferung
    // show that too
    return (
      <StyledSplitPane split="vertical" size="50%" minSize={200}>
        <Lieferung
          showFilter={showFilter}
          row={row}
          rawRow={rawRow}
          sammelLieferung={sammelLieferung}
          id={id}
        />
        <SammelLieferung
          showFilter={showFilter}
          id={row?.sammel_lieferung_id}
          lieferung={row}
        />
      </StyledSplitPane>
    )
  }

  return (
    <Lieferung
      id={id}
      row={row}
      rawRow={rawRow}
      showFilter={showFilter}
      sammelLieferung={sammelLieferung}
    />
  )
}

export default observer(LieferungContainer)
