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
    !props['data-online'] && 'color: rgba(0, 0, 0, 0.54) !important;'}
  ${(props) => !props['data-online'] && 'cursor: not-allowed !important;'}
`

const KulturHistoryButton = ({ asMenu, row }) => {
  const store = useContext(StoreContext)
  const { online } = store

  const show = useCallback(() => {
    if (!online) return
    console.log('TODO!')
  }, [online])

  if (asMenu) {
    return (
      <StyledMenuItem onClick={show} data-online={online}>
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
        disabled={!online}
      >
        <FaHistory />
      </IconButton>
    </ErrorBoundary>
  )
}

export default observer(KulturHistoryButton)
