import { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import gql from 'graphql-tag'
import styled from '@emotion/styled'
import Slider from 'react-slick'
import { useQuery } from 'urql'

import { checkForOnlineError } from '../../../../utils/checkForOnlineError.js'
import { Spinner } from '../../../shared/Spinner.jsx'
import { MobxStoreContext } from '../../../../mobxStoreContext.js'
import { TeilkulturHistoryRow as Row } from './Row.jsx'

const teilkulturRevQuery = gql`
  query teilkulturRevForHistoryQuery($rev: [String!]) {
    teilkultur_rev(where: { _rev: { _in: $rev } }) {
      id
      __typename
      teilkultur_id
      kultur_id
      name
      ort1
      ort2
      ort3
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
  scrollbar-width: thin;
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

export const TeilkulturHistory = observer(
  ({ row, rawRow, historyTakeoverCallback }) => {
    const store = useContext(MobxStoreContext)

    const priorRevisions = row?._revisions?.slice(1) ?? []
    const [{ error, data, fetching }] = useQuery({
      query: teilkulturRevQuery,
      variables: {
        rev: priorRevisions,
      },
    })
    error && checkForOnlineError({ error, store })

    const revRowsUnsorted = data?.teilkultur_rev ?? []
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
  },
)
