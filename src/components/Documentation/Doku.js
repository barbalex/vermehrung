import React from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react-lite'

import FormTitle from './FormTitle'

const Doku = styled.div`
  width: 100%;
  padding: 25px;
  overflow-y: auto;
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

const DokuComponent = ({ frontmatter, html, mobile, location }) => {
  console.log('DokuComponent, location:', location)

  return (
    <Doku>
      <FormTitle location={location} mobile={mobile} />
      <h1>{frontmatter.title}</h1>
      <DokuDate>{frontmatter.date}</DokuDate>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </Doku>
  )
}

export default observer(DokuComponent)
