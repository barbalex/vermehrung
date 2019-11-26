import React from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'
import { graphql, useStaticQuery } from 'gatsby'
import Img from 'gatsby-image'
import get from 'lodash/get'

const Container = styled.div`
  background-color: #eee;
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
        <h3>Lieferschein</h3>
        <p>
          Projekt: Zwischenvermehrung von seltenen und bedrohten Pflanzenarten
          im Kanton Zürich
        </p>
      </PageContainer>
    </Container>
  )
}

export default observer(Lieferschein)
