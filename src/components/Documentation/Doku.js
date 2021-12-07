import React from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react-lite'
import SimpleBar from 'simplebar-react'

import FormTitle from './FormTitle'
import getConstants from '../../utils/constants'

const constants = getConstants()

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
  height: calc(
    100vh - ${constants.appBarHeight}px - ${constants.titleRowHeight}px
  );
  padding: 25px;
`

const DokuComponent = ({ frontmatter, html, location }) => (
  <Container>
    <FormTitle location={location} />
    <SimpleBar style={{ maxHeight: '100%', height: '100%' }}>
      <Body>
        <h1>{frontmatter.title}</h1>
        <DokuDate>{frontmatter.date}</DokuDate>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </Body>
    </SimpleBar>
  </Container>
)

export default observer(DokuComponent)
