import React from 'react'
import List from '@mui/material/List'
import styled from '@emotion/styled'
import { observer } from 'mobx-react-lite'

import Article from './Article'
import constants from '../../../utils/constants'

const Container = styled.div`
  height: calc(100vh - ${constants.appBarHeight}px);
  overflow-y: auto;
`

const ArticleList = ({ items }) => (
  <Container>
    <List component="nav" dense>
      {items.map(({ node }) => (
        <Article node={node} key={node.id} />
      ))}
    </List>
  </Container>
)

export default observer(ArticleList)
