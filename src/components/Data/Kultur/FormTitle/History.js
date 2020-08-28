import React, { useContext, useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import { FaHistory } from 'react-icons/fa'
import IconButton from '@material-ui/core/IconButton'
import MenuItem from '@material-ui/core/MenuItem'
import styled from 'styled-components'

import { StoreContext } from '../../../../models/reactUtils'
import ErrorBoundary from '../../../shared/ErrorBoundary'

const StyledMenuItem = styled(MenuItem)`
  ${(props) =>
    props['data-disabled'] && 'color: rgba(0, 0, 0, 0.54) !important;'}
  ${(props) => props['data-disabled'] && 'cursor: not-allowed !important;'}
`

const KulturHistoryButton = ({ asMenu, row }) => {
  const store = useContext(StoreContext)
  const { online } = store
  const existMultipleRevisions = (row?._revisions || []).length > 1
  const disabled = !online || !existMultipleRevisions

  const show = useCallback(() => {
    if (disabled) return
    console.log('TODO!')
  }, [disabled])

  if (asMenu) {
    return (
      <StyledMenuItem onClick={show} data-disabled={disabled}>
        Frühere Versionen anzeigen
      </StyledMenuItem>
    )
  }

  return (
    <ErrorBoundary>
      <IconButton
        aria-label="Frühere Versionen anzeigen"
        title="Frühere Versionen anzeigen"
        onClick={show}
        disabled={disabled}
      >
        <FaHistory />
      </IconButton>
    </ErrorBoundary>
  )
}

export default observer(KulturHistoryButton)
