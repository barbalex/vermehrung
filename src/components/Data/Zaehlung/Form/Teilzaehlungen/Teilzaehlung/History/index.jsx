import Slider from 'react-slick'

import { useApiQuery } from '../../../../../../../utils/useApiQuery.js'

import { checkForOnlineError } from '../../../../../../../utils/checkForOnlineError.js'
import { Spinner } from '../../../../../../shared/Spinner.jsx'
import { TeilzaehlungHistoryRow as Row } from './Row.jsx'

import styles from './index.module.css'

const sliderSettings = {
  dots: false,
  infinite: false,
}

export const TeilzaehlungHistory = ({
  row,
  rawRow,
  historyTakeoverCallback,
}) => {
  const priorRevisions = row?._revisions?.slice(1) ?? []
  const revPath = priorRevisions.length
    ? `/teilzaehlung_rev?_rev=in.(${priorRevisions.join(',')})&select=id,teilzaehlung_id,zaehlung_id,teilkultur_id,anzahl_pflanzen,anzahl_auspflanzbereit,anzahl_mutterpflanzen,andere_menge,auspflanzbereit_beschreibung,bemerkungen,prognose_von_tz,changed,changed_by,_rev,_parent_rev,_revisions,_depth,_deleted`
    : null
  const { error, data, fetching } = useApiQuery(revPath)
  error && checkForOnlineError({ error })

  const revRowsUnsorted = data ?? []
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
}
