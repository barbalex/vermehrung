import React, { useContext, useMemo } from 'react'
import { observer } from 'mobx-react-lite'
import gql from 'graphql-tag'
import styled from 'styled-components'
import Slider from 'react-slick'
import SimpleBar from 'simplebar-react'

import { useQuery, StoreContext } from '../../../../models/reactUtils'
import checkForOnlineError from '../../../../utils/checkForOnlineError'
import Spinner from '../../../shared/Spinner'
import Row from './Row'

const eventRevQuery = gql`
  query eventRevForHistoryQuery($rev: [String!]) {
    event_rev(where: { _rev: { _in: $rev } }) {
      id
      __typename
      event_id
      kultur_id
      kultur {
        id
        __typename
        art {
          id
          __typename
          art_ae_art {
            id
            __typename
            name
          }
        }
        garten {
          id
          __typename
          name
          person {
            id
            __typename
            name
            ort
          }
        }
      }
      teilkultur_id
      teilkultur {
        id
        __typename
        name
      }
      person_id
      person {
        id
        __typename
        name
      }
      beschreibung
      geplant
      datum
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

const KulturHistory = ({ row, historyTakeoverCallback }) => {
  const store = useContext(StoreContext)

  // need to use this query to ensure that the person's name is queried
  const { error, loading } = useQuery(eventRevQuery, {
    variables: {
      rev: row._revisions,
    },
  })
  error && checkForOnlineError(error)

  // need to grab store object to ensure this remains up to date
  const revRows = useMemo(
    () =>
      [...store.event_revs.values()]
        .filter((v) => row?._revisions?.includes(v._rev) ?? true)
        .filter((r) => r._rev !== row._rev)
        .sort((a, b) => b._depth - a._depth) || {},
    [row._rev, row._revisions, store.event_revs],
  )

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
              historyTakeoverCallback={historyTakeoverCallback}
            />
          ))}
        </Slider>
      </Container>
    </SimpleBar>
  )
}

export default observer(KulturHistory)
