import React, { useContext, useMemo } from 'react'
import { observer } from 'mobx-react-lite'
import gql from 'graphql-tag'
import styled from 'styled-components'
import Slider from 'react-slick'

import { useQuery, StoreContext } from '../../../../../../../models/reactUtils'
import checkForOnlineError from '../../../../../../../utils/checkForOnlineError'
import Spinner from '../../../../../../shared/Spinner'
import Row from './Row'

const teilzaehlungRevQuery = gql`
  query teilzaehlungRevForHistoryQuery($rev: [String!]) {
    teilzaehlung_rev(where: { _rev: { _in: $rev } }) {
      id
      __typename
      teilzaehlung_id
      zaehlung_id
      teilkultur_id
      teilkultur {
        id
        __typename
        name
        ort1
        ort2
        ort3
      }
      anzahl_pflanzen
      anzahl_auspflanzbereit
      anzahl_mutterpflanzen
      andere_menge
      auspflanzbereit_beschreibung
      bemerkungen
      prognose_von_tz
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
  dots: true,
  infinite: false,
}

const KulturHistory = ({ row, historyTakeoverCallback }) => {
  const store = useContext(StoreContext)

  // need to use this query to ensure that the person's name is queried
  const { error, loading } = useQuery(teilzaehlungRevQuery, {
    variables: {
      rev: row._revisions,
    },
  })
  error && checkForOnlineError(error)

  // need to grab store object to ensure this remains up to date
  const revRows = useMemo(
    () =>
      [...store.teilzaehlung_revs.values()]
        .filter((v) => row?._revisions?.includes(v._rev) ?? true)
        .filter((r) => r._rev !== row._rev)
        .sort((a, b) => b._depth - a._depth) || {},
    [row._rev, row._revisions, store.teilzaehlung_revs],
  )

  if (loading) {
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
            historyTakeoverCallback={historyTakeoverCallback}
          />
        ))}
      </Slider>
    </Container>
  )
}

export default observer(KulturHistory)
