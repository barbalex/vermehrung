import React, { useCallback, useContext } from 'react'
import { navigate } from 'gatsby'
import MListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import { FaChevronRight, FaChevronDown } from 'react-icons/fa'
import { Location } from '@reach/router'
import styled from 'styled-components'
import get from 'lodash/get'
import isEqual from 'lodash/isEqual'

import { StoreContext } from '../../models/reactUtils'

const ListItem = styled(MListItem)`
  display: flex;
  justify-content: space-between;
  background-color: ${(props) =>
    props.active === 'true' ? '#eaeaea' : 'unset'} !important;
  padding-top: 7px !important;
  padding-bottom: 7px !important;
  padding-left: ${(props) =>
    props.ischild1 === 'true' ? '35px !important' : 'unset'};
`

const MenuItem = ({ node }) => {
  const { sidebarWidth, setSidebarWidth } = useContext(StoreContext)
  const { path, sort2 } = node.frontmatter

  const onClickMenuItem = useCallback(() => {
    navigate(`${path}/`)
    sidebarWidth && setSidebarWidth(null)
  }, [path, setSidebarWidth, sidebarWidth])

  return (
    <Location>
      {({ location }) => {
        const pathname = location.pathname.split('/').filter((a) => !!a)
        const isParent1 = sort2 === 0
        const isChild1 = sort2 > 0
        const pathSplit = path.split('/').filter((a) => !!a)
        const isParentOpen = pathSplit[1] === pathname[1]
        const isChildClosed = isChild1 && pathSplit[1] !== pathname[1]
        let active = isEqual(pathname, pathSplit)

        if (isChildClosed) return null
        return (
          <>
            <ListItem
              button
              onClick={onClickMenuItem}
              active={active.toString()}
              ischild1={isChild1.toString()}
            >
              <ListItemText onClick={onClickMenuItem}>
                {get(node, 'frontmatter.title', '(Titel fehlt)')}
              </ListItemText>
              {isParent1 && isParentOpen && <FaChevronDown />}
              {isParent1 && !isParentOpen && <FaChevronRight />}
            </ListItem>
            <Divider />
          </>
        )
      }}
    </Location>
  )
}

export default MenuItem
