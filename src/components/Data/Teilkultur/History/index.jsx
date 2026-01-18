import { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import gql from 'graphql-tag'
import Slider from 'react-slick'
import { useQuery } from 'urql'

import { checkForOnlineError } from '../../../../utils/checkForOnlineError.js'
import { Spinner } from '../../../shared/Spinner.jsx'
import { MobxStoreContext } from '../../../../mobxStoreContext.js'
import { TeilkulturHistoryRow as Row } from './Row.jsx'

import artStyles from '../../Art/History/index.module.css'

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
  },
)
