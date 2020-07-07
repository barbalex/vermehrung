import React, { useContext } from 'react'
import List from '@material-ui/core/List'
import styled from 'styled-components'
import { observer } from 'mobx-react-lite'

import { StoreContext } from '../../../models/reactUtils'
import Article from './Article'

const Container = styled.div`
  height: calc(100vh - 64px);
  overflow-y: auto;
`

const ArticleList = ({ items }) => {
  const store = useContext(StoreContext)
  const { sidebarWidth } = store

  if (sidebarWidth === 0) return null
  return (
    <Container>
      <List component="nav">
        {items.map(({ node }) => (
          <Article node={node} key={node.id} />
        ))}
      </List>
    </Container>
  )
}

export default observer(ArticleList)
