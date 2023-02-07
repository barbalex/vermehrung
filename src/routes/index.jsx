import React from 'react'
import Typography from '@mui/material/Typography'
import MaterialCard from '@mui/material/Card'
import styled from '@emotion/styled'

import ErrorBoundary from '../components/shared/ErrorBoundary'
import constants from '../utils/constants'
import image from '../images/puls_vulg.jpg'
import placeholderSrc from '../images/puls_vulg.jpg' // TODO: build small placeholder
import ProgressiveImg from '../components/shared/ProgressiveImg'
import Header from '../components/Header'

const OuterContainer = styled.div`
  height: calc(100% - ${constants.appBarHeight}px);
  position: relative;
  overflow: hidden;
`
const ScrollContainer = styled.div`
  height: calc(100vh - ${constants.appBarHeight}px);
  width: 100%;
  position: absolute;
  top: 0;
  overflow-y: auto;
  /* prevent layout shift when scrollbar appears */
  scrollbar-gutter: stable;
`
const Container = styled.div`
  height: 100%;
  box-sizing: border-box;
  padding-top: 25px;
`
const CardContainer = styled.div`
  color: black !important;
  display: grid;
  grid-template-columns: 1fr;
  grid-column-gap: 15px;
  grid-row-gap: 15px;
  padding: 15px;
  @media (min-width: 700px) {
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 20px;
    grid-row-gap: 20px;
    padding: 20px;
  }
  @media (min-width: 1200px) {
    grid-template-columns: 1fr 1fr 1fr;
    grid-column-gap: 25px;
    grid-row-gap: 25px;
    padding: 25px;
  }
  @media (min-width: 1700px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-column-gap: 30px;
    grid-row-gap: 30px;
    padding: 30px;
  }
  p {
    margin-bottom: 10px !important;
  }
  p:last-of-type {
    margin-bottom: 0 !important;
    margin-top: 10px !important;
  }
`
const Card = styled(MaterialCard)`
  color: black !important;
  padding: 30px;
  background-color: rgba(255, 255, 255, 0.65) !important;
  font-weight: 500;
  ul {
    margin-bottom: 0;
  }
  li:last-of-type {
    margin-bottom: 0;
  }
  li {
    font-weight: 500;
  }
  h3 {
    margin-top: 0;
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
const CardTitle = styled.h3`
  font-weight: 700;
`

const Index = () => (
  <>
    <Header />
    <ErrorBoundary>
      <OuterContainer>
        <ProgressiveImg src={image} placeholderSrc={placeholderSrc} />
        <ScrollContainer>
          <Container>
            <PageTitle align="center" variant="h6" color="inherit">
              Bedrohte Pflanzen vermehren
            </PageTitle>
            <CardContainer>
              <Card>
                <CardTitle>Arten</CardTitle>
                Vom Aussterben bedrohte Pflanzen-Arten werden gesammelt,
                vermehrt und wieder ausgesetzt.
              </Card>
              <Card>
                <CardTitle>Herkünfte</CardTitle>
                Hier gibt es noch ursprüngliche Bestände der Arten.
              </Card>
              <Card>
                <CardTitle>Sammlungen</CardTitle>
                ...beschreiben das Sammeln an Herkunfts-Orten.
              </Card>
              <Card>
                <CardTitle>Gärten</CardTitle>
                In Gärten und Gärtnereien werden die Arten in Kultur vermehrt
                und auf das Aussetzen vorbereitet.
              </Card>
              <Card>
                <CardTitle>Kulturen</CardTitle>
                Pflanzen einer Art und einer Herkunft in einem Garten bilden
                eine Kultur.
              </Card>
              <Card>
                <CardTitle>Teil-Kulturen</CardTitle>
                {`Gärtnereien organisieren ihre Kulturen oft in Untereinheiten, wie zum Beispiel: Beete, Kästen, Reihen.`}
              </Card>
              <Card>
                <CardTitle>Lieferungen</CardTitle>
                <p>Sammlungen werden an Kulturen geliefert.</p>
                <p>
                  Aus Kulturen werden Pflanzen an andere Kulturen geliefert.
                  Oder in geeigneten Lebensräumen ausgesetzt.
                </p>
              </Card>
              <Card>
                <CardTitle>Zählungen</CardTitle>
                <p>
                  Regelmässig wird der Bestand der Kulturen erfasst und die
                  Vermehrung geplant.
                </p>
                <p>So können Sammlungen und Aussetzungen geplant werden.</p>
              </Card>
              <Card>
                <CardTitle>Events und Aufgaben</CardTitle>
                ...erleichtern Verwaltung und Dokumentation des Projekts.
              </Card>
              <Card>
                <CardTitle>Personen</CardTitle>
                Die am Projekt beteiligten. Zum Beispiel Freiwillige, die in
                ihren Gärten Kulturen pflegen.
              </Card>
              <Card>
                <CardTitle>Wer organisiert das Projekt?</CardTitle>
                <a
                  href="//toposmm.ch"
                  target="_blank"
                  rel="noopener noreferrer"
                >
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
                <p>
                  Sie haben einen Garten und möchten bedrohte Pflanzen
                  vermehren? Fragen Sie&nbsp;
                  <a
                    href="//toposmm.ch/index.php?option=com_content&view=article&id=21:vegapzh1&catid=8&Itemid=115"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Topos
                  </a>
                  .
                </p>
                <p>
                  Sie brauchen ein Werkzeug, um Vermehrungen zu verwalten?
                  Fragen Sie&nbsp;
                  <a
                    href="https://gabriel-software.ch"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Gabriel-Software
                  </a>
                  .
                </p>
              </Card>
            </CardContainer>
          </Container>
        </ScrollContainer>
      </OuterContainer>
    </ErrorBoundary>
  </>
)

export default Index
