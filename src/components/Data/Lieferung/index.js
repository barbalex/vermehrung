import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'
import SplitPane from 'react-split-pane'
import { useQuery } from '@apollo/react-hooks'
import last from 'lodash/last'
import get from 'lodash/get'
import gql from 'graphql-tag'

import Lieferung from './Lieferung'
import SammelLieferung from '../SammelLieferung'
import storeContext from '../../../storeContext'
import { lieferung as lieferungFragment } from '../../../utils/fragments'

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

const lieferungQuery = gql`
  query LieferungQuery($id: bigint!, $include: Boolean!) {
    lieferung(where: { id: { _eq: $id } }) @include(if: $include) {
      ...LieferungFields
    }
  }
  ${lieferungFragment}
`

// TODO:
// if is sammel_lieferung: also show that
const LieferungContainer = ({ filter: showFilter }) => {
  const store = useContext(storeContext)
  const { activeNodeArray } = store.tree

  const lieferungId = last(activeNodeArray.filter(e => !isNaN(e)))
  const id = showFilter ? 99999999999999 : lieferungId

  const {
    data: lieferungData,
    error: lieferungError,
    loading: lieferungLoading,
  } = useQuery(lieferungQuery, {
    variables: { id, include: !!id },
  })
  const sammelLieferungId = get(
    lieferungData,
    'lieferung[0].sammel_lieferung_id',
  )
  console.log('SammelLieferung, sammelLieferungId:', sammelLieferungId)

  if (sammelLieferungId) {
    return (
      <StyledSplitPane split="vertical" size={`50%`} minSize={200}>
        <Lieferung showFilter={showFilter} />
        <SammelLieferung lieferungId={lieferungId} />
      </StyledSplitPane>
    )
  }
  return <Lieferung showFilter={showFilter} />
}

export default observer(LieferungContainer)
