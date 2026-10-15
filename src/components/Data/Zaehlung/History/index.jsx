import { useEffect } from 'react'
import { useAtomValue } from 'jotai'
import gql from 'graphql-tag'
import Slider from 'react-slick'
import { useQuery } from 'urql'

import {
  activeNodeArrayAtom,
  getNavigate,
  historyRevAtom,
  store,
} from '../../../../store/index.js'

import { checkForOnlineError } from '../../../../utils/checkForOnlineError.js'
import { Spinner } from '../../../shared/Spinner.jsx'
import { ZaehlungHistoryRow as Row } from './Row.jsx'

import artStyles from '../../Art/History/index.module.css'

const zaehlungRevQuery = gql`
  query zaehlungRevForHistoryQuery($rev: [String!]) {
    zaehlung_rev(where: { _rev: { _in: $rev } }) {
      id
      __typename
      zaehlung_id
      kultur_id
      datum
      prognose
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

export const ZaehlungHistory = ({ row, rawRow, historyTakeoverCallback }) => {
  const priorRevisions = row?._revisions?.slice(1) ?? []
  const [{ error, data, fetching }] = useQuery({
    query: zaehlungRevQuery,
    variables: {
      rev: priorRevisions,
    },
  })
  error && checkForOnlineError({ error })

  const revRowsUnsorted = data?.zaehlung_rev ?? []
  const revRows = revRowsUnsorted.sort((a, b) => b._depth - a._depth)

  const historyRev = useAtomValue(historyRevAtom)

  // replace: sliding should not create a browser history entry per revision
  const navigateToRev = (rev) => {
    const url = [...store.get(activeNodeArrayAtom), 'histories', rev]
    getNavigate()?.(`/Vermehrung/${url.join('/')}`, { replace: true })
  }

  const indexOfRev = revRows.findIndex((r) => r._rev === historyRev)

  useEffect(() => {
    if (!revRows.length || historyRev !== true) return
    // the url ends with 'histories': add the rev of the newest revision
    navigateToRev(revRows[0]._rev)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [historyRev, revRows])

  if (fetching) {
    return <Spinner message="lade Versionen" />
  }

  if (error) {
    return <div className={artStyles.errorContainer}>{error.message}</div>
  }

  return (
    <div className={artStyles.container}>
      {/* keying by rev makes the shown revision a function of the url:
          the slider is remounted at the right slide whenever the url changes,
          also when it was remounted after fetching */}
      <Slider
        key={historyRev}
        initialSlide={indexOfRev > -1 ? indexOfRev : 0}
        afterChange={(index) => {
          const rev = revRows[index]?._rev
          if (rev && rev !== historyRev) navigateToRev(rev)
        }}
        {...sliderSettings}
      >
        {revRows.map((r) => (
          <Row
            key={r._rev}
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
