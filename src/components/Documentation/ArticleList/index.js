import React from 'react'
import List from '@mui/material/List'
import styled from 'styled-components'
import { observer } from 'mobx-react-lite'
import SimpleBar from 'simplebar-react'

import Article from './Article'
import getConstants from '../../../utils/constants'

const constants = getConstants()

const Container = styled.div`
  height: calc(100vh - ${constants.appBarHeight}px);
`

const ArticleList = ({ items }) => (
  <SimpleBar
    style={{
      maxHeight: `calc(100vh - ${constants.appBarHeight}px)`,
      height: `calc(100vh - ${constants.appBarHeight}px)`,
    }}
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
