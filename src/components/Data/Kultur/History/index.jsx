import { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import gql from 'graphql-tag'
import Slider from 'react-slick'
import { useQuery } from 'urql'

import { checkForOnlineError } from '../../../../utils/checkForOnlineError.js'
import { Spinner } from '../../../shared/Spinner.jsx'
import { MobxStoreContext } from '../../../../mobxStoreContext.js'
import { KulturHistoryRow as Row } from './Row.jsx'

import { container, errorContainer } from '../../Art/History/index.module.css'

const kulturRevQuery = gql`
  query kulturRevForHistoryQuery($rev: [String!]) {
    kultur_rev(where: { _rev: { _in: $rev } }) {
      id
      __typename
      kultur_id
      art_id
      herkunft_id
      garten_id
      zwischenlager
      erhaltungskultur
      von_anzahl_individuen
      bemerkungen
      aktiv
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

export const KulturHistory = observer(
  ({ row, rawRow, historyTakeoverCallback }) => {
    const store = useContext(MobxStoreContext)

    const priorRevisions = row?._revisions?.slice(1) ?? []
    const [{ error, data, fetching }] = useQuery({
      query: kulturRevQuery,
      variables: {
        rev: priorRevisions,
      },
    })
    error && checkForOnlineError({ error, store })

    const revRowsUnsorted = data?.kultur_rev ?? []
    const revRows = revRowsUnsorted.sort((a, b) => b._depth - a._depth)

    if (fetching) {
      return <Spinner message="lade Versionen" />
    }

    if (error) {
      return <div className={errorContainer}>{error.message}</div>
    }

    return (
      <div className={container}>
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
