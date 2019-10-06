import React, { useCallback, useContext } from 'react'
import { navigate } from 'gatsby'
import MListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import { Location } from '@reach/router'
import styled from 'styled-components'
import get from 'lodash/get'

import storeContext from '../../storeContext'

const ListItem = styled(MListItem)`
  background-color: ${props =>
    props.active === 'true' ? '#eaeaea' : 'unset'} !important;
  padding-top: 7px !important;
  padding-bottom: 7px !important;
`

const MenuItem = ({ node }) => {
  const { sidebarWidth, setSidebarWidth } = useContext(storeContext)
  const onClickMenuItem = useCallback(() => {
    navigate(`${node.frontmatter.path}/`)
    sidebarWidth && setSidebarWidth(null)
  }, [node.frontmatter.path, setSidebarWidth, sidebarWidth])

  return (
    <Location>
      {({ location }) => {
        const active = (
          `${node.frontmatter.path}` === location.pathname ||
          `${node.frontmatter.path}/` === location.pathname
        ).toString()

        return (
          <>
            <ListItem button onClick={onClickMenuItem} active={active}>
              <ListItemText onClick={onClickMenuItem}>
                {get(node, 'frontmatter.title', '(Titel fehlt)')}
              </ListItemText>
            </ListItem>
            <Divider />
          </>
        )
      }}
    </Location>
  )
}

export default MenuItem
