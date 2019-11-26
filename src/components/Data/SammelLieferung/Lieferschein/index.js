import React from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'
import { graphql, useStaticQuery } from 'gatsby'
import { useQuery } from '@apollo/react-hooks'
import Img from 'gatsby-image'
import get from 'lodash/get'
import moment from 'moment'
import gql from 'graphql-tag'

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
  margin-bottom: 0.4rem;
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

const personQuery = gql`
  query personQueryForLieferschein($id: bigint!) {
    person(where: { id: { _eq: $id } }) {
      id
      name
      ort
    }
  }
`
const kulturQuery = gql`
  query kulturQueryForLieferschein($id: bigint!) {
    kultur(where: { id: { _eq: $id } }) {
      id
      garten {
        id
        name
        ort
      }
    }
  }
`

const Lieferschein = ({ row }) => {
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

  const {
    data: kulturData,
    error: kulturError,
    loading: kulturLoading,
  } = useQuery(kulturQuery, {
    variables: { id: row.von_kultur_id },
  })
  const von = row.von_kultur_id
    ? kulturLoading
      ? '...'
      : kulturError
      ? '(Fehler beim Laden der Daten)'
      : `${get(kulturData, 'kultur[0].garten.name') || '(kein Name)'} (${get(
          kulturData,
          'kultur[0].garten.ort',
        ) || 'kein Ort'})`
    : '(keine von-Kultur erfasst)'

  const {
    data: personData,
    error: personError,
    loading: personLoading,
  } = useQuery(personQuery, {
    variables: { id: row.person_id },
  })
  const an = row.person_id
    ? personLoading
      ? '...'
      : personError
      ? '(Fehler beim Laden der Daten für die Person)'
      : `${get(personData, 'person[0].name', '(kein Name)')} (${get(
          personData,
          'person[0].ort',
          'kein Ort',
        )})`
    : '(keine Person erfasst)'
  console.log('Lieferschein, row:', row)
  const am = row.datum
    ? moment(row.datum, 'YYYY-MM-DD').format('DD.MM.YYYY')
    : '(Kein Datum erfasst)'

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
          <HeaderValue>{von}</HeaderValue>
        </HeaderRow>
        <HeaderRow>
          <HaederLabel>an:</HaederLabel>
          <HeaderValue>{an}</HeaderValue>
        </HeaderRow>
        <HeaderRow>
          <HaederLabel>am:</HaederLabel>
          <HeaderValue>{am}</HeaderValue>
        </HeaderRow>
      </PageContainer>
    </Container>
  )
}

export default observer(Lieferschein)
