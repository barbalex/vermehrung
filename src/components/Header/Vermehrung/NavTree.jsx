import React, { useCallback, useContext } from 'react'
import IconButton from '@mui/material/IconButton'
import styled from '@emotion/styled'
import { observer } from 'mobx-react-lite'

import NavTree from '../../../svg/nav_tree.svg?react'
import { MobxStoreContext } from '../../../mobxStoreContext.js'

const StyledNavTree = styled(NavTree)`
  width: 24px;
  height: 24px;
  color: white;
`
const StyledIconButton = styled(IconButton)`
  ${(props) => props['data-active'] && 'border: 1px solid #9762d9 !important;'}
`

export const HeaderNavTree = observer(() => {
  const store = useContext(MobxStoreContext)
  const {
    setShowTreeInSingleColumnView,
    showTreeInSingleColumnView,
    singleColumnView,
  } = store

  const onClickTreeMenu = useCallback(() => {
    setShowTreeInSingleColumnView(!showTreeInSingleColumnView)
  }, [setShowTreeInSingleColumnView, showTreeInSingleColumnView])

  if (!singleColumnView) return null

  return (
    <StyledIconButton
      color="inherit"
      aria-label="Navigations-Baum öffnen"
      onClick={onClickTreeMenu}
      title={
        showTreeInSingleColumnView ?
          'Navigations-Baum schliessen'
        : 'Navigations-Baum öffnen'
      }
      data-active={showTreeInSingleColumnView}
    >
      <StyledNavTree />
    </StyledIconButton>
  )
})
