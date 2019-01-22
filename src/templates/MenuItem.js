import React, { useCallback } from 'react'
import { navigate } from 'gatsby'
import MListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import { Location } from '@reach/router'
import styled from 'styled-components'
import get from 'lodash/get'

import ErrorBoundary from '../components/ErrorBoundary'

const ListItem = styled(MListItem)`
  background-color: ${props =>
    props.active === 'true' ? '#eaeaea' : 'unset'} !important;
`

const TechnDokuMenuItem = ({ post }) => {
  const onClickMenuItem = useCallback(
    () => navigate(`${post.frontmatter.path}/`),
    [post],
  )

  return (
    <Location>
      {({ location }) => {
        const active = (
          `${post.frontmatter.path}/` === location.pathname
        ).toString()

        return (
          <ErrorBoundary>
            <>
              <ListItem button onClick={onClickMenuItem} active={active}>
                <ListItemText onClick={onClickMenuItem}>
                  {get(post, 'frontmatter.title', '(Titel fehlt)')}
                </ListItemText>
              </ListItem>
              <Divider />
            </>
          </ErrorBoundary>
        )
      }}
    </Location>
  )
}

export default TechnDokuMenuItem
