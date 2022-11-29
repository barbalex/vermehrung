import React, { useContext, useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import styled from '@emotion/styled'
import SplitPane from 'react-split-pane'
import isUuid from 'is-uuid'
import last from 'lodash/last'
import { combineLatest, of as $of } from 'rxjs'
import { Q } from '@nozbe/watermelondb'

import Lieferung from './Lieferung'
import SammelLieferung from '../SammelLieferung'
import StoreContext from '../../../storeContext'

const StyledSplitPane = styled(SplitPane)`
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
    // need raw row because observable does not provoke rerendering of components
    rawRow: undefined,
    userPersonOption: undefined,
  })
  useEffect(() => {
    const userPersonOptionsObservable = user.uid
      ? db
          .get('person_option')
          .query(Q.on('person', Q.where('account_id', user.uid)))
          .observeWithColumns(['li_show_sl'])
      : $of({})
    const lieferungObservable = showFilter
      ? $of(filter.lieferung)
      : db.get('lieferung').findAndObserve(id)
    const combinedObservables = combineLatest([
      userPersonOptionsObservable,
      lieferungObservable,
    ])
    const subscription = combinedObservables.subscribe(
      async ([userPersonOptions, lieferung]) =>
        setDataState({
          row: lieferung,
          rawRow: JSON.stringify(lieferung?._raw ?? lieferung),
          userPersonOption: userPersonOptions?.[0],
        }),
    )

    return () => subscription?.unsubscribe?.()
  }, [db, filter.lieferung, id, row?.sammel_lieferung, showFilter, user])

  const { row, rawRow, userPersonOption } = dataState
  const { li_show_sl } = userPersonOption ?? {}

  if (row?.sammel_lieferung_id && li_show_sl) {
    // this lieferung is part of a sammel_lieferung
    // show that too
    return (
      <StyledSplitPane split="vertical" size="50%" maxSize={-10}>
        <Lieferung showFilter={showFilter} row={row} rawRow={rawRow} id={id} />
        <SammelLieferung
          showFilter={showFilter}
          id={row?.sammel_lieferung_id}
          lieferung={row}
        />
      </StyledSplitPane>
    )
  }

  return <Lieferung id={id} row={row} rawRow={rawRow} showFilter={showFilter} />
}

export default observer(LieferungContainer)
