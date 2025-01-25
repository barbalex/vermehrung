import React, { useContext, useCallback, useMemo } from 'react'
import { observer } from 'mobx-react-lite'
import { FaHistory } from 'react-icons/fa'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'
import styled from '@emotion/styled'
import { of as $of } from 'rxjs'

import { MobxStoreContext } from '../../mobxStoreContext.js'
import { ErrorBoundary } from './ErrorBoundary.jsx'
import { useObservable } from '../../utils/useObservable.js'

const StyledMenuItem = styled(MenuItem)`
  ${(props) =>
    props['data-disabled'] && 'color: rgba(0, 0, 0, 0.54) !important;'}
  ${(props) => props['data-disabled'] && 'cursor: not-allowed !important;'}
`
const StyledIconButton = styled(IconButton)`
  box-sizing: border-box;
  ${(props) =>
    props['data-active'] && 'background-color: rgba(0, 0, 0, 0.04) !important;'}
  ${(props) =>
    props['data-active'] &&
    'box-shadow:inset 0px 0px 0px 1px rgba(0, 0, 0, 0.04);'}
`

export const HistoryButton = observer(
  ({ asMenu, id, showHistory, setShowHistory, table }) => {
    const store = useContext(MobxStoreContext)
    const { online, db, initialDataQueried } = store

    const observable = useMemo(
      () =>
        id && initialDataQueried ? db.get(table).findAndObserve(id) : $of(null),
      [db, id, initialDataQueried, table],
    )
    const row = useObservable(observable)

    const existMultipleRevisions =
      row?._revisions?.length && row?._revisions?.length > 1
    const disabled = !online || !existMultipleRevisions

    const show = useCallback(() => {
      if (disabled) return
      setShowHistory(!showHistory)
    }, [disabled, setShowHistory, showHistory])

    const title =
      online ?
        showHistory ? 'Frühere Versionen ausblenden'
        : 'Frühere Versionen anzeigen'
      : 'Frühere Versionen sind nur online verfügbar'

    if (asMenu) {
      return (
        <StyledMenuItem
          onClick={show}
          data-disabled={disabled}
        >
          {title}
        </StyledMenuItem>
      )
    }

    return (
      <ErrorBoundary>
        <StyledIconButton
          aria-label={title}
          title={title}
          onClick={show}
          disabled={disabled}
          data-active={showHistory}
        >
          <FaHistory />
        </StyledIconButton>
      </ErrorBoundary>
    )
  },
)
