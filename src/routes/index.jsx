import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import styled from '@emotion/styled'

import { ErrorBoundary } from '../components/shared/ErrorBoundary.jsx'
import image from '../images/puls_vulg_2500.webp'
import placeholderSrc from '../images/puls_vulg_500.webp' // TODO: build small placeholder
import { ProgressiveImg } from '../components/shared/ProgressiveImg.tsx'

import {
  outerContainer,
  scrollContainer,
  container,
  cardContainer,
  card,
  pageTitle,
  cardTitle,
} from './index.module.css'

const PageTitle = styled(Typography)`
  font-size: 2em !important;
  padding-bottom: 15px;
  font-weight: 700 !important;
  text-shadow:
    2px 2px 3px white,
    -2px -2px 3px white,
    2px -2px 3px white,
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

export const Home = () => (
  <>
    <ErrorBoundary>
      <div className={outerContainer}>
        <ProgressiveImg
          src={image}
          placeholderSrc={placeholderSrc}
        />
        <div className={scrollContainer}>
          <div className={container}>
            <PageTitle
              align="center"
              variant="h6"
              color="inherit"
            >
              Bedrohte Pflanzen vermehren
            </PageTitle>
            <div className={cardContainer}>
              <Card className={card}>
                <CardTitle>Arten</CardTitle>
                Vom Aussterben bedrohte Pflanzen-Arten werden gesammelt,
                vermehrt und wieder ausgesetzt.
              </Card>
              <Card className={card}>
                <CardTitle>Herkünfte</CardTitle>
                Hier gibt es noch ursprüngliche Bestände der Arten.
              </Card>
              <Card className={card}>
                <CardTitle>Sammlungen</CardTitle>
                ...beschreiben das Sammeln an Herkunfts-Orten.
              </Card>
              <Card className={card}>
                <CardTitle>Gärten</CardTitle>
                In Gärten und Gärtnereien werden die Arten in Kultur vermehrt
                und auf das Aussetzen vorbereitet.
              </Card>
              <Card className={card}>
                <CardTitle>Kulturen</CardTitle>
                Pflanzen einer Art und einer Herkunft in einem Garten bilden
                eine Kultur.
              </Card>
              <Card className={card}>
                <CardTitle>Teil-Kulturen</CardTitle>
                {`Gärtnereien organisieren ihre Kulturen oft in Untereinheiten, wie zum Beispiel: Beete, Kästen, Reihen.`}
              </Card>
              <Card className={card}>
                <CardTitle>Lieferungen</CardTitle>
                <p>Sammlungen werden an Kulturen geliefert.</p>
                <p>
                  Aus Kulturen werden Pflanzen an andere Kulturen geliefert.
                  Oder in geeigneten Lebensräumen ausgesetzt.
                </p>
              </Card>
              <Card className={card}>
                <CardTitle>Zählungen</CardTitle>
                <p>
                  Regelmässig wird der Bestand der Kulturen erfasst und die
                  Vermehrung geplant.
                </p>
                <p>So können Sammlungen und Aussetzungen geplant werden.</p>
              </Card>
              <Card className={card}>
                <CardTitle>Events und Aufgaben</CardTitle>
                ...erleichtern Verwaltung und Dokumentation des Projekts.
              </Card>
              <Card className={card}>
                <CardTitle>Personen</CardTitle>
                Die am Projekt beteiligten. Zum Beispiel Freiwillige, die in
                ihren Gärten Kulturen pflegen.
              </Card>
              <Card className={card}>
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
              <Card className={card}>
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
            </div>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  </>
)
