import React from 'react'
import List from '@material-ui/core/List'
import styled from 'styled-components'
import { observer } from 'mobx-react-lite'
import SimpleBar from 'simplebar-react'

import Article from './Article'

const Container = styled.div`
  height: calc(100vh - 64px);
`

const ArticleList = ({ items }) => (
  <SimpleBar
    style={{ maxHeight: 'calc(100vh - 64px)', height: 'calc(100vh - 64px)' }}
  >
    <Container>
      <List component="nav">
        {items.map(({ node }) => (
          <Article node={node} key={node.id} />
        ))}
      </List>
    </Container>
  </SimpleBar>
)

export default observer(ArticleList)
