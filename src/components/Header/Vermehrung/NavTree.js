import React, { useCallback } from 'react'
import IconButton from '@material-ui/core/IconButton'
import NavTree from '../../../svg/nav_tree.inline.svg'
import styled from 'styled-components'
import { observer } from 'mobx-react-lite'

import getConstants from '../../../utils/constants'

const constants = getConstants()

const StyledNavTree = styled(NavTree)`
  width: 24px;
  height: 24px;
  color: white;
`

const NavTreeButton = ({ widthEnforced, setWidthEnforced }) => {
  const onClickTreeMenu = useCallback(() => {
    if (widthEnforced === 0) {
      setWidthEnforced(constants?.tree?.minimalWidth)
    }
    if (widthEnforced > 0) {
      setWidthEnforced(0)
    }
  }, [setWidthEnforced, widthEnforced])

  return (
    <IconButton
      color="inherit"
      aria-label="Navigations-Baum öffnen"
      onClick={onClickTreeMenu}
      title={
        widthEnforced === 0
          ? 'Navigations-Baum öffnen'
          : 'Navigations-Baum schliessen'
      }
    >
      <StyledNavTree />
    </IconButton>
  )
}

export default observer(NavTreeButton)
