import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'
import { graphql, useStaticQuery } from 'gatsby'
import Img from 'gatsby-image'
import moment from 'moment'
import gql from 'graphql-tag'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

import Lieferung from './Lieferung'
import { useQuery, StoreContext } from '../../../../models/reactUtils'

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
const StyledPaper = styled(Paper)`
  margin-top: 15px;
  box-shadow: none !important;
`
const StyledTable = styled(Table)`
  margin-bottom: 0;
  td,
  th {
    font-size: 0.75rem;
    padding-left: 8px;
    padding-right: 8px;
  }
  th:first-child,
  td:first-child {
    padding-left: 8px;
  }
`

const Lieferschein = ({ row }) => {
  const store = useContext(StoreContext)
  const { lieferungsSorted } = store

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
  const image = imageData?.file?.childImageSharp?.fixed ?? {}

  const vonKultur = store.kulturs.get(row.von_kultur_id) ?? {}
  const von = row.von_kultur_id
    ? `${vonKultur?.garten?.name ?? '(kein Name)'} (${
        vonKultur?.garten?.ort ?? 'kein Ort'
      })`
    : '(keine von-Kultur erfasst)'

  const person = store.persons.get(row.person_id) ?? {}
  const an = row.person_id
    ? `${person?.name ?? '(kein Name)'} (${person?.ort ?? 'kein Ort'})`
    : '(keine Person erfasst)'

  const am = row.datum
    ? moment(row.datum, 'YYYY-MM-DD').format('DD.MM.YYYY')
    : '(Kein Datum erfasst)'

  const lieferungen = lieferungsSorted.filter(
    (l) => l.sammel_lieferung_id === row.id,
  )

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
        <StyledPaper square>
          <StyledTable size="small">
            <TableHead>
              <TableRow>
                <TableCell>Art</TableCell>
                <TableCell>Herkunft</TableCell>
                <TableCell>Was</TableCell>
                <TableCell>Bemerkungen</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {lieferungen.map((l) => (
                <Lieferung key={l.id} lieferung={l} />
              ))}
            </TableBody>
          </StyledTable>
        </StyledPaper>
      </PageContainer>
    </Container>
  )
}

export default observer(Lieferschein)
