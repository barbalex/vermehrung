import Slider from 'react-slick'
import { useQuery } from 'urql'
import gql from 'graphql-tag'

import { checkForOnlineError } from '../../../../utils/checkForOnlineError.js'
import { Spinner } from '../../../shared/Spinner.jsx'
import { HerkunftHistoryRow as Row } from './Row.jsx'

import artStyles from '../../Art/History/index.module.css'

const herkunftRevQuery = gql`
  query herkunftRevForHistoryQuery($rev: [String!]) {
    herkunft_rev(where: { _rev: { _in: $rev } }) {
      id
      __typename
      bemerkungen
      gemeinde
      geom_point
      herkunft_id
      kanton
      land
      lokalname
      nr
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

const sliderSettings = {
  dots: false,
  infinite: false,
}

export const HerkunftHistory = ({ row, rawRow, historyTakeoverCallback }) => {
  const priorRevisions = row?._revisions?.slice(1) ?? []
  const [{ error, data, fetching }] = useQuery({
    query: herkunftRevQuery,
    variables: {
      rev: priorRevisions,
    },
  })
  error && checkForOnlineError({ error })

  const revRowsUnsorted = data?.herkunft_rev ?? []
  const revRows = revRowsUnsorted.sort((a, b) => b._depth - a._depth)

  if (fetching) {
    return <Spinner message="lade Versionen" />
  }

  if (error) {
    return <div className={artStyles.errorContainer}>{error.message}</div>
  }

  return (
    <div className={artStyles.container}>
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
    </div>
  )
}
