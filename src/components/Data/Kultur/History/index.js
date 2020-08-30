import React, { useCallback, useContext, useMemo } from 'react'
import { observer } from 'mobx-react-lite'
import gql from 'graphql-tag'
import styled from 'styled-components'
import Slider from 'react-slick'

import { useQuery, StoreContext } from '../../../../models/reactUtils'
import checkForOnlineError from '../../../../utils/checkForOnlineError'
import Row from './Row'

const kulturRevQuery = gql`
  query kulturRevForHistoryQuery($rev: [String!]) {
    kultur_rev(where: { _rev: { _in: $rev } }) {
      id
      __typename
      kultur_id
      art_id
      art {
        id
        __typename
        art_ae_art {
          id
          __typename
          name
        }
      }
      herkunft_id
      herkunft {
        id
        __typename
        gemeinde
        lokalname
        nr
      }
      garten_id
      garten {
        id
        __typename
        name
        person {
          id
          __typename
          name
        }
      }
      zwischenlager
      erhaltungskultur
      von_anzahl_individuen
      bemerkungen
      aktiv
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
  overflow: auto !important;
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

const sliderSettings = {
  dots: true,
  infinite: false,
}

/**
 * TODO:
 * load react-slick
 * load revisions
 * present revisions in Data component in carousel
 */

const KulturHistory = ({ row }) => {
  const store = useContext(StoreContext)

  console.log('Kultur History, revisions:', row._revisions)
  // need to use this query to ensure that the person's name is queried
  const { error, loading } = useQuery(kulturRevQuery, {
    variables: {
      rev: row._revisions,
    },
  })
  error && checkForOnlineError(error)

  // need to grab store object to ensure this remains up to date
  const revRows = useMemo(
    () =>
      [...store.kultur_revs.values()]
        .filter((v) => row._revisions.includes(v._rev))
        .filter((r) => r._rev !== row._rev)
        .sort((a, b) => b._depth - a._depth) || {},
    [row._rev, row._revisions, store.kultur_revs],
  )

  const onClickUebernehmen = useCallback(() => console.log('TODO!'), [])

  if (loading) return 'Lade...'

  if (error) {
    return <Container>{error.message}</Container>
  }

  return (
    <Container>
      <Slider {...sliderSettings}>
        {revRows.map((r) => (
          <Row
            key={row._rev}
            revRow={r}
            row={row}
            onClickUebernehmen={onClickUebernehmen}
          />
        ))}
      </Slider>
    </Container>
  )
}

export default observer(KulturHistory)
