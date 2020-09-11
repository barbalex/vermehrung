import React, { useContext, useMemo } from 'react'
import { observer } from 'mobx-react-lite'
import gql from 'graphql-tag'
import styled from 'styled-components'
import Slider from 'react-slick'

import { useQuery, StoreContext } from '../../../../models/reactUtils'
import checkForOnlineError from '../../../../utils/checkForOnlineError'
import Spinner from '../../../shared/Spinner'
import Row from './Row'

const sammelLieferungRevQuery = gql`
  query sammelLieferungRevForHistoryQuery($rev: [String!]) {
    sammel_lieferung_rev(where: { _rev: { _in: $rev } }) {
      id
      __typename
      sammel_lieferung_id
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
      person_id
      person {
        id
        __typename
        name
      }
      von_sammlung_id
      sammlung {
        id
        __typename
        datum
        herkunft {
          id
          __typename
          nr
        }
        person {
          id
          __typename
          name
        }
      }
      von_kultur_id
      kulturByVonKulturId {
        id
        __typename
        garten {
          id
          __typename
          person {
            id
            __typename
            name
            ort
          }
        }
      }
      datum
      nach_kultur_id
      kulturByNachKulturId {
        id
        __typename
        garten {
          id
          __typename
          person {
            id
            __typename
            name
            ort
          }
        }
      }
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
const ErrorContainer = styled.div`
  padding: 25px;
`

const sliderSettings = {
  dots: true,
  infinite: false,
}

const SammelLieferungHistory = ({ row, historyTakeoverCallback }) => {
  const store = useContext(StoreContext)

  // need to use this query to ensure that the person's name is queried
  const { error, loading } = useQuery(sammelLieferungRevQuery, {
    variables: {
      rev: row._revisions,
    },
  })
  error && checkForOnlineError(error)

  // need to grab store object to ensure this remains up to date
  const revRows = useMemo(
    () =>
      [...store.sammel_lieferung_revs.values()]
        .filter((v) => row?._revisions?.includes(v._rev) ?? true)
        .filter((r) => r._rev !== row._rev)
        .sort((a, b) => b._depth - a._depth) || {},
    [row._rev, row._revisions, store.sammel_lieferung_revs],
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

export default observer(SammelLieferungHistory)
