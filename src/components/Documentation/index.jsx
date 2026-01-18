import { useEffect, useContext } from 'react'
import { useResizeDetector } from 'react-resize-detector'
import { Allotment } from 'allotment'
import { observer } from 'mobx-react-lite'
import { Outlet, useLocation } from 'react-router'

import { ArticleList } from './ArticleList/index.jsx'
import { ErrorBoundary } from '../shared/ErrorBoundary.jsx'
import { constants } from '../../utils/constants.js'
import { MobxStoreContext } from '../../mobxStoreContext.js'
import { DocumentationFormTitle as FormTitle } from './FormTitle/index.jsx'

import styles from './index.module.css'

const articles = [
  {
    title: 'Ziele',
    slug: 'ziele',
    children: [
      { title: 'Ziel 1: Herkünfte', slug: 'ziele/herkuenfte', level: 2 },
    ],
  },
  { title: 'Technische Voraussetzungen', slug: 'technische-voraussetzungen' },
  { title: 'Zeit-Achse für Arten', slug: 'zeitachse-art' },
  { title: 'Zeit-Achse für Kulturen', slug: 'zeitachse-kultur' },
  { title: 'Herkünfte', slug: 'herkuenfte' },
  { title: 'Sammlungen', slug: 'sammlungen' },
  { title: 'Kulturen', slug: 'kulturen' },
  { title: 'Zählungen', slug: 'zaehlungen' },
  { title: 'Teil-Kulturen', slug: 'teilkulturen' },
  { title: 'Lieferungen', slug: 'lieferungen' },
  { title: 'Sammel-Lieferungen', slug: 'sammel-lieferungen' },
  { title: 'Events', slug: 'events' },
  { title: 'Felder ein- und ausblenden', slug: 'felder-blenden' },
  { title: 'Ordner ein- und ausblenden', slug: 'ordner-blenden' },
  { title: 'Planen', slug: 'planen' },
  { title: 'Genetische Vielfalt', slug: 'genetische-vielfalt' },
  { title: 'Qualitäts-Kontrollen', slug: 'qualitaets-kontrollen' },
  { title: 'vermehrung erinnert sich', slug: 'gedaechtnis' },
  { title: 'Open Source', slug: 'open-source' },
  { title: 'Fehler, Ideen, Vorschläge melden', slug: 'fehler-ideen' },
  { title: 'Schnittstellen', slug: 'schnittstellen' },
  { title: 'Progressive Web App', slug: 'pwa' },
  { title: 'Offline arbeiten', slug: 'offline' },
  { title: 'Offline: Wie es funktioniert', slug: 'offline-wie' },
  { title: 'Daten-Historie', slug: 'historisierung' },
  { title: 'Verwendete Technologien', slug: 'technologien' },
  { title: 'Daten-Struktur', slug: 'struktur' },
  { title: 'Roadmap', slug: 'roadmap' },
  { title: 'Konten und Benutzerrechte', slug: 'konten' },
  { title: 'Datenschutz', slug: 'datenschutz' },
]

export const Documentation = observer(() => {
  const { pathname } = useLocation()
  const store = useContext(MobxStoreContext)
  const { docFilter, setDocsCount, setDocsFilteredCount } = store

  const { width, ref } = useResizeDetector()

  const path = pathname.split('/').filter((e) => !!e)

  useEffect(() => {
    const items = articles.filter(
      (n) => n.title?.toLowerCase?.()?.includes?.(docFilter) ?? true,
    )
    setDocsCount(articles.length)
    setDocsFilteredCount(items.length)
  }, [docFilter, setDocsCount, setDocsFilteredCount])

  return (
    <ErrorBoundary>
      <div
        ref={ref}
        className="docs"
      >
        {width < constants?.tree?.minimalWindowWidth ?
          path.length === 1 ?
            <div className={styles.container}>
              <ArticleList articles={articles} />
            </div>
          : <div className={styles.container}>
              <div className={styles.doku}>
                <FormTitle />
                <div className={styles.dokuInnerContainer}>
                  <Outlet />
                </div>
              </div>
            </div>

        : <div className={styles.splitPaneContainer}>
            <Allotment>
              <Allotment.Pane preferredSize="22%">
                <ArticleList articles={articles} />
              </Allotment.Pane>
              <div className={styles.doku}>
                <FormTitle />
                <div className={styles.dokuInnerContainer}>
                  <Outlet />
                </div>
              </div>
            </Allotment>
          </div>
        }
      </div>
    </ErrorBoundary>
  )
})
