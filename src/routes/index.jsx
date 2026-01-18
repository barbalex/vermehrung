import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'

import { ErrorBoundary } from '../components/shared/ErrorBoundary.jsx'
import image from '../images/puls_vulg_2500.webp'
import placeholderSrc from '../images/puls_vulg_500.webp' // TODO: build small placeholder
import { ProgressiveImg } from '../components/shared/ProgressiveImg.tsx'

import styles from './index.module.css'

export const Home = () => (
  <>
    <ErrorBoundary>
      <div className={styles.outerContainer}>
        <ProgressiveImg
          src={image}
          placeholderSrc={placeholderSrc}
        />
        <div className={styles.scrollContainer}>
          <div className={styles.container}>
            <Typography
              align="center"
              variant="h6"
              color="inherit"
              className={styles.pageTitle}
            >
              Bedrohte Pflanzen vermehren
            </Typography>
            <div className={styles.cardContainer}>
              <Card className={styles.card}>
                <h3 className={styles.cardTitle}>Arten</h3>
                Vom Aussterben bedrohte Pflanzen-Arten werden gesammelt,
                vermehrt und wieder ausgesetzt.
              </Card>
              <Card className={styles.card}>
                <h3 className={styles.cardTitle}>Herkünfte</h3>
                Hier gibt es noch ursprüngliche Bestände der Arten.
              </Card>
              <Card className={styles.card}>
                <h3 className={styles.cardTitle}>Sammlungen</h3>
                ...beschreiben das Sammeln an Herkunfts-Orten.
              </Card>
              <Card className={styles.card}>
                <h3 className={styles.cardTitle}>Gärten</h3>
                In Gärten und Gärtnereien werden die Arten in Kultur vermehrt
                und auf das Aussetzen vorbereitet.
              </Card>
              <Card className={styles.card}>
                <h3 className={styles.cardTitle}>Kulturen</h3>
                Pflanzen einer Art und einer Herkunft in einem Garten bilden
                eine Kultur.
              </Card>
              <Card className={styles.card}>
                <h3 className={styles.cardTitle}>Teil-Kulturen</h3>
                {`Gärtnereien organisieren ihre Kulturen oft in Untereinheiten, wie zum Beispiel: Beete, Kästen, Reihen.`}
              </Card>
              <Card className={styles.card}>
                <h3 className={styles.cardTitle}>Lieferungen</h3>
                <p>Sammlungen werden an Kulturen geliefert.</p>
                <p>
                  Aus Kulturen werden Pflanzen an andere Kulturen geliefert.
                  Oder in geeigneten Lebensräumen ausgesetzt.
                </p>
              </Card>
              <Card className={styles.card}>
                <h3 className={styles.cardTitle}>Zählungen</h3>
                <p>
                  Regelmässig wird der Bestand der Kulturen erfasst und die
                  Vermehrung geplant.
                </p>
                <p>So können Sammlungen und Aussetzungen geplant werden.</p>
              </Card>
              <Card className={styles.card}>
                <h3 className={styles.cardTitle}>Events und Aufgaben</h3>
                ...erleichtern Verwaltung und Dokumentation des Projekts.
              </Card>
              <Card className={styles.card}>
                <h3 className={styles.cardTitle}>Personen</h3>
                Die am Projekt beteiligten. Zum Beispiel Freiwillige, die in
                ihren Gärten Kulturen pflegen.
              </Card>
              <Card className={styles.card}>
                <h3 className={styles.cardTitle}>
                  Wer organisiert das Projekt?
                </h3>
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
              <Card className={styles.card}>
                <h3 className={styles.cardTitle}>Interessiert?</h3>
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
