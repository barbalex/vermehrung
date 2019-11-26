import React from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'
import { graphql, useStaticQuery } from 'gatsby'
import Img from 'gatsby-image'
import get from 'lodash/get'

const Container = styled.div`
  background-color: #f8f8f8;
  font-size: 9pt;
  cursor: default;
  overflow-y: auto;
  height: 100vh;
  @media print {
    /* remove grey backgrond set for nice UI */
    background-color: #fff;
    /* with overflow auto an empty page is inserted between each page */
    overflow-y: visible;
  }
`
const PageContainer = styled.div`
  /* this part is for when page preview is shown */
  /* Divide single pages with some space and center all pages horizontally */
  /* will be removed in @media print */
  margin: 1cm auto;
  /* Define a white paper background that sticks out from the darker overall background */
  background: #fff;
  /* Show a drop shadow beneath each page */
  box-shadow: 0 4px 5px rgba(75, 75, 75, 0.2);

  display: flex;
  flex-direction: column;
  /*justify-content: space-between;*/

  /* set dimensions */
  width: 29.7cm;
  height: 21cm;
  padding: 1.5cm;

  overflow-y: visible;

  @media print {
    height: 100%;
    width: 100%;

    margin: 0 !important;
    padding: 0.5cm !important;
    overflow-y: hidden !important;
  }
`
const Title = styled.h3`
  padding-top: 15px;
  margin-bottom: 0.3rem;
`
const HeaderRow = styled.div`
  display: flex;
  font-size: small;
`
const HaederLabel = styled.div`
  flex-basis: 50px;
  flex-grow: 0;
`
const HeaderValue = styled.div``

const Lieferschein = () => {
  const imageData = useStaticQuery(graphql`
    query QueryLieferscheinImage {
      file(relativePath: { eq: "toposLogo.png" }) {
        childImageSharp {
          # Specify the image processing specifications right in the query.
          # Makes it trivial to update as your page's design changes.
          fixed(width: 500, height: 87) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `)
  const image = get(imageData, 'file.childImageSharp.fixed', {})

  return (
    <Container>
      <PageContainer className="querformat printer-content">
        {image && <Img fixed={image} />}
        <Title>Lieferschein</Title>
        <HeaderRow>
          <HaederLabel>Projekt:</HaederLabel>
          <HeaderValue>
            {
              'Zwischenvermehrung von seltenen und bedrohten Pflanzenarten im Kanton Zürich'
            }
          </HeaderValue>
        </HeaderRow>
        <HeaderRow>
          <HaederLabel>von:</HaederLabel>
          <HeaderValue>{'topos Marti & Müller AG'}</HeaderValue>
        </HeaderRow>
        <HeaderRow>
          <HaederLabel>an:</HaederLabel>
          <HeaderValue>{'Karin Sartori, Umweltatelier'}</HeaderValue>
        </HeaderRow>
        <HeaderRow>
          <HaederLabel>am:</HaederLabel>
          <HeaderValue>{'28.05.2019'}</HeaderValue>
        </HeaderRow>
      </PageContainer>
    </Container>
  )
}

export default observer(Lieferschein)
