import React from 'react'
import styled from '@emotion/styled'
import { observer } from 'mobx-react-lite'

import FormTitle from './FormTitle'
import constants from '../../utils/constants'

const Container = styled.div`
  width: 100%;
  height: calc(
    100vh - ${constants.appBarHeight}px - ${constants.titleRowHeight}px
  );
  ul {
    margin-top: 0;
  }
  p,
  li {
    margin-bottom: 0;
  }
  h1,
  h3,
  h4,
  ol {
    margin-bottom: 10px;
  }
  h2 {
    margin-top: 10px;
    margin-bottom: 10px;
  }
`
const DokuDate = styled.p`
  margin-bottom: 15px !important;
  color: grey;
`
const Body = styled.div`
  overflow-y: auto;
  height: calc(
    100vh - ${constants.appBarHeight}px - ${constants.titleRowHeight}px
  );
  padding: 25px;
`

const DokuComponent = ({ frontmatter, html, location }) => (
  <Container>
    <FormTitle location={location} />
    <Body>
      <h1>{frontmatter.title}</h1>
      <DokuDate>{frontmatter.date}</DokuDate>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </Body>
  </Container>
)

export default observer(DokuComponent)
