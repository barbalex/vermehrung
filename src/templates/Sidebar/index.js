import React, { useContext } from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react-lite'

import { StoreContext } from '../../models/reactUtils'
import MenuItems from './MenuItems'

const Menu = styled.div`
  height: calc(100vh - 64px);
  overflow-y: auto;
`

const Sidebar = ({ items }) => {
  const store = useContext(StoreContext)
  const { sidebarWidth } = store

  if (sidebarWidth === 0) return null
  return (
    <Menu>
      <MenuItems items={items} />
    </Menu>
  )
}

export default observer(Sidebar)
