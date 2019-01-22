import React, { useCallback } from 'react'
import { navigate } from 'gatsby'
import MListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import get from 'lodash/get'

import ErrorBoundary from '../../components/ErrorBoundary'

const BenutzerDokuMenuItem = ({ post }) => {
  const onClickMenuItem = useCallback(() =>
    navigate(`${post.frontmatter.path}/`, [post]),
  )

  return (
    <ErrorBoundary>
      <>
        <MListItem button onClick={onClickMenuItem}>
          <ListItemText onClick={onClickMenuItem}>
            {get(post, 'frontmatter.title', '(Titel fehlt)')}
          </ListItemText>
        </MListItem>
        <Divider />
      </>
    </ErrorBoundary>
  )
}

export default BenutzerDokuMenuItem
