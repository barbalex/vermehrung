import { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import gql from 'graphql-tag'
import Slider from 'react-slick'
import { useQuery } from 'urql'

import { checkForOnlineError } from '../../../../../../../utils/checkForOnlineError.js'
import { Spinner } from '../../../../../../shared/Spinner.jsx'
import { MobxStoreContext } from '../../../../../../../mobxStoreContext.js'
import { TeilzaehlungHistoryRow as Row } from './Row.jsx'

import styles from './index.module.css'

const teilzaehlungRevQuery = gql`
  query teilzaehlungRevForHistoryQuery($rev: [String!]) {
    teilzaehlung_rev(where: { _rev: { _in: $rev } }) {
      id
      __typename
      teilzaehlung_id
      zaehlung_id
      teilkultur_id
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

export const TeilzaehlungHistory = observer(
  ({ row, rawRow, historyTakeoverCallback }) => {
    const store = useContext(MobxStoreContext)

    const priorRevisions = row?._revisions?.slice(1) ?? []
    const [{ error, data, fetching }] = useQuery({
      query: teilzaehlungRevQuery,
      variables: {
        rev: priorRevisions,
      },
    })
    error && checkForOnlineError({ error, store })

    const revRowsUnsorted = data?.teilzaehlung_rev ?? []
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
