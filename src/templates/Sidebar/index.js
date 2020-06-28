import React, { useContext } from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'
import { observer } from 'mobx-react-lite'

import { StoreContext } from '../../models/reactUtils'
import MenuItems from './MenuItems'
import Filter from './Filter'
import getConstants from '../../utils/constants'

const constants = getConstants()

const Menu = styled.div`
  width: ${constants.sidebar.width}px;
  min-width: ${constants.sidebar.width}px;
  height: calc(100vh - 64px);
  overflow-y: auto;
  padding: 25px 0;
  border-right: 1px solid rgba(0, 0, 0, 0.12);
`
const MenuTitle = styled.div`
  padding: 0 16px;
`
const MenuTitleLink = styled(Link)`
  font-size: 21px;
  font-weight: 700;
  text-decoration: none;
  color: rgba(0, 0, 0, 0.87);
  &:hover {
    text-decoration: underline;
  }
`

const Sidebar = ({ title, titleLink, edges }) => {
  const store = useContext(StoreContext)
  const { docFilter, sidebarWidth } = store

  const items = edges
    .filter((n) => !!n && !!n.node)
    .filter((n) =>
      docFilter
        ? (n?.node?.frontmatter?.title ?? '(Titel fehlt)')
            .toLowerCase()
            .includes(docFilter.toLowerCase())
        : true,
    )

  if (sidebarWidth === 0) return null
  return (
    <Menu>
      <MenuTitle>
        <MenuTitleLink to={titleLink}>{title}</MenuTitleLink>
        <Filter />
      </MenuTitle>
      <MenuItems items={items} />
    </Menu>
  )
}

export default observer(Sidebar)
