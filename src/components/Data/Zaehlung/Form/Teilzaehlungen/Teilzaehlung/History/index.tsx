import Slider from 'react-slick'

import { useApiQuery } from '../../../../../../../utils/useApiQuery.ts'

import { checkForOnlineError } from '../../../../../../../utils/checkForOnlineError.ts'
import { Spinner } from '../../../../../../shared/Spinner.tsx'
import { TeilzaehlungHistoryRow as Row } from './Row.tsx'

import styles from './index.module.css'

const sliderSettings = {
  dots: false,
  infinite: false,
}

export const TeilzaehlungHistory = ({
  row,
  rawRow: _rawRow,
  historyTakeoverCallback,
}: {
  row: import('../../../../../../../dbModel.ts').Teilzaehlung | null | undefined
  rawRow: string | null | undefined
  historyTakeoverCallback: () => void
}) => {
  const priorRevisions = row?._revisions?.slice(1) ?? []
  const revPath = priorRevisions.length
    ? `/teilzaehlung_rev?_rev=in.(${priorRevisions.join(',')})&select=id,teilzaehlung_id,zaehlung_id,teilkultur_id,anzahl_pflanzen,anzahl_auspflanzbereit,anzahl_mutterpflanzen,andere_menge,auspflanzbereit_beschreibung,bemerkungen,prognose_von_tz,changed,changed_by,_rev,_parent_rev,_revisions,_depth,_deleted`
    : null
  const { error, data, fetching } = useApiQuery(revPath)
  if (error) checkForOnlineError({ error })

  const revRowsUnsorted =
    (data as import('../../../../../../shared/types.ts').RevRow[] | null) ?? []
  const revRows = revRowsUnsorted.sort(
    (
      a: import('../../../../../../shared/types.ts').RevRow,
      b: import('../../../../../../shared/types.ts').RevRow,
    ) => (b?._depth ?? 0) - (a?._depth ?? 0),
  )

  if (fetching) {
    return <Spinner message="lade Versionen" />
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>{(error as Error).message}</div>
    )
  }

  return (
    <div className={styles.container}>
      <Slider {...sliderSettings}>
        {revRows.map((r) => (
          <Row
            key={row?._rev}
            revRow={r}
            row={row}
            historyTakeoverCallback={historyTakeoverCallback}
          />
        ))}
      </Slider>
    </div>
  )
}
