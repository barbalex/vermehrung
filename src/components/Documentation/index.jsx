import React, { useEffect, useContext } from 'react'
import styled from '@emotion/styled'
import { useResizeDetector } from 'react-resize-detector'
import { Allotment } from 'allotment'
import { observer } from 'mobx-react-lite'
import { Outlet, useLocation } from 'react-router'

import ArticleList from './ArticleList/index.jsx'
import { ErrorBoundary } from '../shared/ErrorBoundary.jsx'
import { constants } from '../../utils/constants.js'
import { MobxStoreContext } from '../../mobxStoreContext.js'
import FormTitle from './FormTitle/index.jsx'

const Container = styled.div`
  height: calc(100dvh - ${constants.appBarHeight}px);
`
const SplitPaneContainer = styled.div`
  height: calc(100dvh - ${constants.appBarHeight}px);
  position: relative;
`

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

export const DokuDate = styled.p`
  margin-bottom: 15px !important;
  color: #b4b4b4;
  font-weight: 600;
`
const DokuInnerContainer = styled.div`
  padding: 0 25px 25px 25px;
`
const Doku = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  box-sizing: border-box;
  ul,
  ol {
    margin-top: 0;
    padding-inline-start: 20px;
  }
  ol {
    padding-inline-start: 25px;
  }
  p,
  li {
    margin-bottom: 3px;
    line-height: 1.5em;
  }
  h1,
  h3,
  ol {
    margin-bottom: 10px;
  }
  h2 {
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .video-responsive {
    overflow: hidden;
    padding-bottom: 56.25%;
    position: relative;
    height: 0;
  }
  .video-responsive iframe {
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    position: absolute;
  }
  td {
    text-align: right;
  }
  td,
  th {
    padding: 0 5px 0 0;
  }
`

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
      <div ref={ref}>
        {width < constants?.tree?.minimalWindowWidth ?
          path.length === 1 ?
            <Container>
              <ArticleList articles={articles} />
            </Container>
          : <Container>
              <Doku>
                <FormTitle />
                <DokuInnerContainer>
                  <Outlet />
                </DokuInnerContainer>
              </Doku>
            </Container>

        : <SplitPaneContainer>
            <Allotment>
              <Allotment.Pane preferredSize="22%">
                <ArticleList articles={articles} />
              </Allotment.Pane>
              <Doku>
                <FormTitle />
                <DokuInnerContainer>
                  <Outlet />
                </DokuInnerContainer>
              </Doku>
            </Allotment>
          </SplitPaneContainer>
        }
      </div>
    </ErrorBoundary>
  )
})

