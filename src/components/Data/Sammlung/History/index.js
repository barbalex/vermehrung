import React, { useMemo } from 'react'
import { observer } from 'mobx-react-lite'
import gql from 'graphql-tag'
import styled from 'styled-components'
import Slider from 'react-slick'
import SimpleBar from 'simplebar-react'

import { useQuery } from '../../../../models/reactUtils'
import checkForOnlineError from '../../../../utils/checkForOnlineError'
import Spinner from '../../../shared/Spinner'
import Row from './Row'

const sammlungRevQuery = gql`
  query sammlungRevForHistoryQuery($rev: [String!]) {
    sammlung_rev(where: { _rev: { _in: $rev } }) {
      id
      __typename
      sammlung_id
      art_id
      person_id
      herkunft_id
      nr
      datum
      von_anzahl_individuen
      anzahl_pflanzen
      gramm_samen
      andere_menge
      geom_point
      geplant
      bemerkungen
      changed
      changed_by
      _rev
      _parent_rev
      _depth
      _deleted
    }
  }
`

const Container = styled.div`
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

const SammlungHistory = ({ row, rawRow, historyTakeoverCallback }) => {
  const priorRevisions = row._revisions.slice(1)
  const { error, data, loading } = useQuery(sammlungRevQuery, {
    variables: {
      rev: priorRevisions,
    },
  })
  error && checkForOnlineError(error)

  const revRowsUnsorted = useMemo(() => data?.sammlung_rev ?? [], [
    data?.sammlung_rev,
  ])
  const revRows = revRowsUnsorted.sort((a, b) => b._depth - a._depth)

  if (loading) {
    return <Spinner message="lade Versionen" />
  }

  if (error) {
    return <ErrorContainer>{error.message}</ErrorContainer>
  }

  return (
    <SimpleBar style={{ maxHeight: '100%', height: '100%' }}>
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
    </SimpleBar>
  )
}

export default observer(SammlungHistory)
