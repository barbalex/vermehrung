import { useMemo } from 'react'
import { useAtomValue } from 'jotai'
import { FaHistory } from 'react-icons/fa'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'
import { of as $of } from 'rxjs'

import {
  activeNodeArrayAtom,
  dbAtom,
  getNavigate,
  onlineAtom,
  initialDataQueriedAtom,
  store,
} from '../../store/index.ts'
import { ErrorBoundary } from './ErrorBoundary.tsx'
import { useObservable } from '../../utils/useObservable.ts'

import styles from './HistoryButton.module.css'

export const HistoryButton = ({
  asMenu,
  id,
  showHistory,
  setShowHistory,
  table,
}) => {
  const online = useAtomValue(onlineAtom)
  const db = useAtomValue(dbAtom)
  const initialDataQueried = useAtomValue(initialDataQueriedAtom)

  // removing useMemo causes: Maximum update depth exceeded
  const observable = useMemo(
    () =>
      id && initialDataQueried ? db.get(table).findAndObserve(id) : $of(null),
    [db, id, initialDataQueried, table],
  )
  const row = useObservable(observable)

  const existMultipleRevisions =
    row?._revisions?.length && row?._revisions?.length > 1
  const disabled = !online || !existMultipleRevisions

  const show = () => {
    if (disabled) return
    // nested forms without their own url (e.g. Teilzaehlung)
    // keep using local state
    if (setShowHistory) return setShowHistory(!showHistory)
    // history is url-driven: '/histories/<rev>' is appended to the form url
    // the rev is added by the history component once revisions were fetched
    const activeNodeArray = store.get(activeNodeArrayAtom)
    const url = showHistory
      ? activeNodeArray
      : [...activeNodeArray, 'histories']
    getNavigate()?.(`/Vermehrung/${url.join('/')}`)
  }

  const title = online
    ? showHistory
      ? 'Frühere Versionen ausblenden'
      : 'Frühere Versionen anzeigen'
    : 'Frühere Versionen sind nur online verfügbar'

  if (asMenu) {
    const style = disabled
      ? { color: 'rgba(0, 0, 0, 0.54)', cursor: 'not-allowed' }
      : {}
    return (
      <MenuItem onClick={show} style={style}>
        {title}
      </MenuItem>
    )
  }

  const style = showHistory
    ? {
        backgroundColor: 'rgba(0, 0, 0, 0.04)',
        boxShadow: 'inset 0px 0px 0px 1px rgba(0, 0, 0, 0.04)',
      }
    : {}

  return (
    <ErrorBoundary>
      <IconButton
        aria-label={title}
        title={title}
        onClick={show}
        disabled={disabled}
        style={style}
        className={styles.iconButton}
      >
        <FaHistory />
      </IconButton>
    </ErrorBoundary>
  )
}
