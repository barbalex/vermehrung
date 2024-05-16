import React, { useMemo, useContext } from 'react'
import { observer } from 'mobx-react-lite'
import gql from 'graphql-tag'
import styled from '@emotion/styled'
import Slider from 'react-slick'
import { useQuery } from 'urql'

import checkForOnlineError from '../../../../utils/checkForOnlineError.js'
import Spinner from '../../../shared/Spinner'
import StoreContext from '../../../../storeContext.js'
import Row from './Row'

const sammelLieferungRevQuery = gql`
  query sammelLieferungRevForHistoryQuery($rev: [String!]) {
    sammel_lieferung_rev(where: { _rev: { _in: $rev } }) {
      id
      __typename
      sammel_lieferung_id
      art_id
      person_id
      von_sammlung_id
      von_kultur_id
      datum
      nach_kultur_id
      nach_ausgepflanzt
      von_anzahl_individuen
      anzahl_pflanzen
      anzahl_auspflanzbereit
      gramm_samen
      andere_menge
      geplant
      bemerkungen
      changed
      changed_by
      _rev
      _parent_rev
      _revisions
      _depth
      _deleted
    }
  }
`

const Container = styled.div`
  overflow-y: auto;
  padding: 0 25px;
  height: 100%;
  .slick-prev:before,
  .slick-next:before,
  .slick-dots li button:before {
    color: #4a148c;
  }
  .slick-prev {
    left: -20px;
  }
  .slick-next {
    right: -20px;
  }
  .slick-dots {
    bottom: -10px;
  }
`
const ErrorContainer = styled.div`
  padding: 25px;
`

const sliderSettings = {
  dots: false,
  infinite: false,
}

const SammelLieferungHistory = ({ row, rawRow, historyTakeoverCallback }) => {
  const store = useContext(StoreContext)

  const priorRevisions = row?._revisions?.slice(1) ?? []
  const [{ error, data, fetching }] = useQuery({
    query: sammelLieferungRevQuery,
    variables: {
      rev: priorRevisions,
    },
  })
  error && checkForOnlineError({ error, store })

  const revRowsUnsorted = useMemo(
    () => data?.sammel_lieferung_rev ?? [],
    [data?.sammel_lieferung_rev],
  )
  const revRows = revRowsUnsorted.sort((a, b) => b._depth - a._depth)

  if (fetching) {
    return <Spinner message="lade Versionen" />
  }

  if (error) {
    return <ErrorContainer>{error.message}</ErrorContainer>
  }

  return (
    <Container>
      <Slider {...sliderSettings}>
        {revRows.map((r) => (
          <Row
            key={row._rev}
            revRow={r}
            row={row}
            rawRow={rawRow}
            historyTakeoverCallback={historyTakeoverCallback}
          />
        ))}
      </Slider>
    </Container>
  )
}

export default observer(SammelLieferungHistory)
