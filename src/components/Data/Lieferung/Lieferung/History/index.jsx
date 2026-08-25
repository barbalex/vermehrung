import gql from 'graphql-tag'
import Slider from 'react-slick'
import { useQuery } from 'urql'

import { checkForOnlineError } from '../../../../../utils/checkForOnlineError.js'
import { Spinner } from '../../../../shared/Spinner.jsx'
import { LieferungHistoryRow as Row } from './Row.jsx'

import artStyles from '../../../Art/History/index.module.css'

const lieferungRevQuery = gql`
  query lieferungRevForHistoryQuery($rev: [String!]) {
    lieferung_rev(where: { _rev: { _in: $rev } }) {
      id
      __typename
      lieferung_id
      sammel_lieferung_id
      art_id
      person_id
      von_sammlung_id
      von_kultur_id
      datum
      nach_kultur_id
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

export const LieferungHistory = ({ row, rawRow, historyTakeoverCallback }) => {
  const priorRevisions = row?._revisions?.slice(1) ?? []
  const [{ error, data, fetching }] = useQuery({
    query: lieferungRevQuery,
    variables: {
      rev: priorRevisions,
    },
  })
  error && checkForOnlineError({ error })

  const revRowsUnsorted = data?.lieferung_rev ?? []
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
