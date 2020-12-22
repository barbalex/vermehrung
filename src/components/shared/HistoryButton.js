import React, { useContext, useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import { FaHistory } from 'react-icons/fa'
import IconButton from '@material-ui/core/IconButton'
import MenuItem from '@material-ui/core/MenuItem'
import styled from 'styled-components'

import StoreContext from '../../storeContext'
import ErrorBoundary from './ErrorBoundary'

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

const HistoryButton = ({ asMenu, row, showHistory, setShowHistory }) => {
  const store = useContext(StoreContext)
  const { online } = store

  const existMultipleRevisions =
    row?._revisions?.length && row?._revisions?.length > 1
  const disabled = !online || !existMultipleRevisions

  const show = useCallback(() => {
    if (disabled) return
    setShowHistory(!showHistory)
  }, [disabled, setShowHistory, showHistory])

  const title = online
    ? showHistory
      ? 'Frühere Versionen ausblenden'
      : 'Frühere Versionen anzeigen'
    : 'Frühere Versionen sind nur online verfügbar'

  if (asMenu) {
    return (
      <StyledMenuItem onClick={show} data-disabled={disabled}>
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
}

export default observer(HistoryButton)
