import React, { useContext, useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'
import SplitPane from 'react-split-pane'
import isUuid from 'is-uuid'
import last from 'lodash/last'

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

  const [row, setRow] = useState(null)
  // need raw row because observable does not provoke rerendering of components
  const [rawRow, setRawRow] = useState(null)
  useEffect(() => {
    let subscription
    if (showFilter) {
      setRow(filter.lieferung)
    } else {
      subscription = db.collections
        .get('lieferung')
        .findAndObserve(id)
        .subscribe((newRow) => {
          setRow(newRow)
          setRawRow(JSON.stringify(newRow._raw))
        })
    }
    return () => {
      if (subscription) subscription.unsubscribe()
    }
  }, [db.collections, filter.lieferung, id, showFilter])

  // TODO:
  const sammelLieferungId =
    row?.sammel_lieferung_id ?? '99999999-9999-9999-9999-999999999999'
  // TODO: convert once sammel_lieferung is built
  const sammelLieferung = store.sammel_lieferungs.get(sammelLieferungId) || {}

  const [userPersonOption, setUserPersonOption] = useState()
  useEffect(() => {
    getUserPersonOption({ user, db }).then((o) => setUserPersonOption(o))
  }, [db, user])
  const { li_show_sl } = userPersonOption ?? {}

  //console.log('Lieferung, row:', row)

  if (
    sammelLieferungId !== '99999999-9999-9999-9999-999999999999' &&
    li_show_sl
  ) {
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
          id={sammelLieferungId}
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
