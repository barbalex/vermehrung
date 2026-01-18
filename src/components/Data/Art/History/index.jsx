import { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import gql from 'graphql-tag'
import Slider from 'react-slick'
import { useQuery } from 'urql'

import { checkForOnlineError } from '../../../../utils/checkForOnlineError.js'
import { Spinner } from '../../../shared/Spinner.jsx'
import { Row } from './Row.jsx'
import { MobxStoreContext } from '../../../../mobxStoreContext.js'

import styles from './index.module.css'

const artRevQuery = gql`
  query artRevForHistoryQuery($rev: [String!]) {
    art_rev(where: { _rev: { _in: $rev } }) {
      id
      __typename
      art_id
      ae_id
      set
      apflora_av
      apflora_ap
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

export const ArtHistory = observer(
  ({ row, rawRow, historyTakeoverCallback }) => {
    const store = useContext(MobxStoreContext)

    const priorRevisions = row?._revisions?.slice(1) ?? []
    const [{ error, data, fetching }] = useQuery({
      query: artRevQuery,
      variables: {
        rev: priorRevisions,
      },
    })
    error && checkForOnlineError({ error, store })

    const revRowsUnsorted = data?.art_rev ?? []
    const revRows = revRowsUnsorted.sort((a, b) => b._depth - a._depth)

    if (fetching) {
      return <Spinner message="lade Versionen" />
    }

    if (error) {
      return <div className={styles.errorContainer}>{error.message}</div>
    }

    return (
      <div className={styles.container}>
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
