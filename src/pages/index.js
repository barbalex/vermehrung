import React from 'react'
import Typography from '@material-ui/core/Typography'
import MaterialCard from '@material-ui/core/Card'
import { graphql, Link } from 'gatsby'
import styled from 'styled-components'
import Img from 'gatsby-image'

import ErrorBoundary from '../components/ErrorBoundary'
import Layout from '../components/Layout'

const ScrollContainer = styled.div`
  height: calc(100vh - 64px);
  overflow-y: auto;
  margin-top: 64px;
`
const Container = styled.div`
  padding: 15px;
  position: relative;
  min-height: 100%;
  @media (min-width: 700px) {
    padding: 20px;
  }
  @media (min-width: 1200px) {
    padding: 25px;
  }
  @media (min-width: 1700px) {
    padding: 30px;
  }
`
const CardContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-column-gap: 15px;
  grid-row-gap: 15px;
  @media (min-width: 700px) {
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 20px;
    grid-row-gap: 20px;
  }
  @media (min-width: 1200px) {
    grid-template-columns: 1fr 1fr 1fr;
    grid-column-gap: 25px;
    grid-row-gap: 25px;
  }
  @media (min-width: 1700px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-column-gap: 30px;
    grid-row-gap: 30px;
  }
  p {
    margin-bottom: 10px !important;
  }
  p:last-of-type {
    margin-bottom: 5px !important;
    margin-top: 10px !important;
  }
`
const Card = styled(MaterialCard)`
  padding: 30px;
  background-color: rgba(255, 255, 255, 0.75) !important;
  ul {
    margin-bottom: 0;
  }
  li:last-of-type {
    margin-bottom: 0;
  }
  li {
    font-weight: 500;
  }
`
const PageTitle = styled(Typography)`
  font-size: 2em !important;
  padding-bottom: 15px;
  font-weight: 700 !important;
  text-shadow: 2px 2px 3px white, -2px -2px 3px white, 2px -2px 3px white,
    -2px 2px 3px white;
  @media (min-width: 700px) {
    padding-bottom: 20px;
  }
  @media (min-width: 1200px) {
    padding-bottom: 25px;
  }
  @media (min-width: 1700px) {
    padding-bottom: 30px;
  }
`
const CardTitle = styled.h3``
const MoreContainer = styled.div`
  margin-top: 80px;
  display: grid;
  grid-template-columns: 1fr;
  grid-column-gap: 15px;
  grid-row-gap: 25px;
  @media (min-width: 700px) {
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 20px;
  }
  @media (min-width: 1200px) {
    grid-template-columns: 1fr 1fr 1fr;
    grid-column-gap: 25px;
  }
  @media (min-width: 1700px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-column-gap: 30px;
  }
  p {
    padding-left: 30px;
    font-weight: 700;
    text-shadow: 2px 2px 3px white, -2px -2px 3px white, 2px -2px 3px white,
      -2px 2px 3px white;
    margin: 0;
  }
  a {
    padding-left: 30px;
    font-weight: 700;
    color: rgba(0, 0, 0, 0.8);
    text-shadow: 2px 2px 3px white, -2px -2px 3px white, 2px -2px 3px white,
      -2px 2px 3px white;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`
const MoreLink = styled(Link)`
  padding-left: 30px;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.8);
  text-shadow: 2px 2px 3px white, -2px -2px 3px white, 2px -2px 3px white,
    -2px 2px 3px white;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`

const bgImageStyle = {
  position: 'absolute',
  left: 0,
  top: 0,
  width: '100%',
  height: '100%',
  zIndex: -1,
}

const Index = ({ data }) => (
  <ErrorBoundary>
    <Layout>
      <ScrollContainer>
        <Container>
          <Img
            sizes={data.file.childImageSharp.sizes}
            fluid={data.file.childImageSharp.fluid}
            style={bgImageStyle}
          />
          <PageTitle align="center" variant="h6" color="inherit" noWrap>
            Bedrohte Pflanzen vermehren
          </PageTitle>
          <CardContainer>
            <Card>
              <CardTitle>Arten</CardTitle>
              Vom Aussterben bedrohte Pflanzen-Arten werden von Experten gezielt
              vermehrt und wieder ausgesetzt.
            </Card>
            <Card>
              <CardTitle>Herkünfte</CardTitle>
              ...sind natürliche Vorkommen. Hier werden die Arten gesammelt.
            </Card>
            <Card>
              <CardTitle>Sammlungen</CardTitle>
              ...beschreiben das Sammeln von Arten an einem Herkunfts-Ort.
            </Card>
            <Card>
              <CardTitle>Lieferungen</CardTitle>
              Sammlungen werden an Kulturen geliefert. Aus Kulturen werden
              Pflanzen zur Auswilderung geliefert. Oder an andere Kulturen.
              Lieferungen können geplant und bestellt werden.
            </Card>
            <Card>
              <CardTitle>Gärten</CardTitle>
              In Gärten und Gärtnereien werden die Arten vermehrt und auf das
              Aussetzen vorbereitet.
            </Card>
            <Card>
              <CardTitle>Kulturen</CardTitle>
              Die Pflanzen einer Art in einem Garten bilden eine Kultur.
            </Card>
            <Card>
              <CardTitle>Events</CardTitle>
              ...beschreiben Ereignisse im Rahmen der Kultur.
            </Card>
            <Card>
              <CardTitle>Inventare</CardTitle>
              In grösseren Gärtnereien wird über Kulturen und deren Beete ein
              Inventar geführt.
            </Card>
            <Card>
              <CardTitle>Zählungen</CardTitle>
              Regelmässig wird der Bestand einer Kultur erfasst. So können
              Sammlungen und Aussetzungen geplant werden
            </Card>
            <Card>
              <CardTitle>Personen</CardTitle>
              Zum Beispiel Freiwillige, welche in ihren Gärten Kulturen pflegen.
            </Card>
            <Card>
              <CardTitle>Wer organisiert das?</CardTitle>
              <a href="//toposmm.ch" target="_blank" rel="noopener noreferrer">
                Topos
              </a>
              &nbsp;im Auftrag der{' '}
              <a
                href="//aln.zh.ch/internet/baudirektion/aln/de/naturschutz/artenfoerderung/ap_fl.html"
                target="_blank"
                rel="noopener noreferrer"
              >
                Fachstelle Naturschutz des Kantons Zürich
              </a>
              .
            </Card>
            <Card>
              <CardTitle>Interessiert?</CardTitle>
              Sie haben einen Garten und würden gerne bedrohte Pflanzen
              vermehren? Fragen Sie&nbsp;
              <a
                href="//toposmm.ch/index.php?option=com_content&view=article&id=21:vegapzh1&catid=8&Itemid=115"
                target="_blank"
                rel="noopener noreferrer"
              >
                Topos
              </a>
              .<br />
              <br />
              Brauchen Sie ein Werkzeug, um Vermehrungen zu verwalten? Fragen
              Sie&nbsp;
              <a
                href="https://gabriel-software.ch/Kontakt/"
                target="_blank"
                rel="noopener noreferrer"
              >
                den Entwickler
              </a>
              .
            </Card>
          </CardContainer>
          <MoreContainer>
            <a
              href="https://gabriel-software.ch"
              target="_blank"
              rel="noopener noreferrer"
            >
              Über uns
            </a>
            <a
              href="mailto:alex@gabriel-software.ch?subject=vermehrung.apflora.ch"
              rel="noopener"
            >
              Kontakt
            </a>
            <MoreLink to="/Benutzer-Dokumentation/">
              Benutzer-Dokumentation
            </MoreLink>
            <MoreLink to="/Technische-Dokumentation/">
              Technische Dokumentation
            </MoreLink>
          </MoreContainer>
        </Container>
      </ScrollContainer>
    </Layout>
  </ErrorBoundary>
)

export default Index

export const query = graphql`
  query Query {
    file(relativePath: { eq: "puls_vulg.jpg" }) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid
        }
        sizes {
          ...GatsbyImageSharpSizes
        }
      }
    }
  }
`
