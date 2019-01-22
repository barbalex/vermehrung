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

import ErrorBoundary from '../../components/ErrorBoundary'
import Layout from '../../components/Layout'
import ArtTree from './ArtTree'

const Index = ({ data, location }) => {
  const { pathname } = location

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
              <ArtTree data={data} pathname={pathname} />
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
      ae_art(where: { artByAeArt: { id: { _is_null: false } } }) {
        id
        name
        artByAeArt {
          id
          ae_id
          sammlungsByartId {
            id
            person_id
            personBypersonId {
              id
              name
            }
            sOrtBysOrtId {
              id
              name
              x
              y
              bemerkungen
            }
            kultursBysammlungId {
              id
              bemerkungen
              vOrtByvOrtId {
                id
                person_id
                personBypersonId {
                  id
                  name
                }
                x
                y
                bemerkungen
              }
              zaehlungsBykulturId {
                id
                datum
                einheit
                zaehlungEinheitWerteByeinheit {
                  id
                  text
                }
                anzahl
                bemerkungen
              }
            }
          }
        }
      }
    }
  }
`
