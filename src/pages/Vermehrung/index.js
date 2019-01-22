import React from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import { ReflexContainer, ReflexSplitter, ReflexElement } from 'react-reflex'

const Container = styled.div`
  margin-top: 64px;
  min-height: calc(100vh - 64px);
`
const StyledReflexContainer = styled(ReflexContainer)`
  height: calc(100vh - 64px) !important;
`

//import AuthorList from '../../components/AuthorList'
import ErrorBoundary from '../../components/ErrorBoundary'
import Layout from '../../components/Layout'

const Index = ({ data }) => {
  return (
    <ErrorBoundary>
      <Layout>
        <Container>
          <StyledReflexContainer orientation="vertical">
            <ReflexElement
              flex={0.3}
              propagateDimensions={true}
              renderOnResizeRate={200}
              renderOnResize={true}
            >
              <p>Tree</p>
            </ReflexElement>
            <ReflexSplitter />
            <ReflexElement
              propagateDimensions={true}
              renderOnResizeRate={200}
              renderOnResize={true}
            >
              <p>Form</p>
            </ReflexElement>
          </StyledReflexContainer>
        </Container>
      </Layout>
    </ErrorBoundary>
  )
}

export default Index

export const query = graphql`
  query AuthorQuery {
    hasura {
      person {
        id
        name
      }
    }
  }
`
