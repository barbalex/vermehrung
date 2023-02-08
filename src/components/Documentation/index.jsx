import React, { useState, useEffect, useContext } from 'react'
import styled from '@emotion/styled'
import { withResizeDetector } from 'react-resize-detector'
import SplitPane from 'react-split-pane'
import { observer } from 'mobx-react-lite'
import { Outlet, useLocation } from 'react-router-dom'

import ArticleList from './ArticleList'
import ErrorBoundary from '../shared/ErrorBoundary'
import constants from '../../utils/constants'
import StoreContext from '../../storeContext'

const Container = styled.div`
  height: calc(100vh - ${constants.appBarHeight}px);
`
const SplitPaneContainer = styled.div`
  height: calc(100vh - ${constants.appBarHeight}px);
  position: relative;
`

const StyledSplitPane = styled(SplitPane)`
  .Resizer {
    background: rgba(74, 20, 140, 0.1);
    opacity: 1;
    z-index: 1;
    box-sizing: border-box;
    width: 7px;
    cursor: col-resize;
  }
  .Resizer:hover {
    -webkit-transition: all 0.5s ease;
    transition: all 0.5s ease;
    background-color: #fff59d !important;
  }
  .Resizer.disabled {
    cursor: not-allowed;
  }
  .Resizer.disabled:hover {
    border-color: transparent;
  }
  .Pane {
    overflow: hidden;
  }
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
  { title: 'iPhone/iPad bzw. iOS', slug: 'ios' },
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
  color: grey;
`
const Doku = styled.div`
  width: 100%;
  height: 100%;
  padding: 25px;
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

const Documentation = ({ width }) => {
  const { pathname } = useLocation()
  const store = useContext(StoreContext)
  const { docFilter, setDocsCount, setDocsFilteredCount } = store

  const path = pathname.split('/').filter((e) => !!e)

  const [mobile, setMobile] = useState(false)

  useEffect(() => {
    if (width >= constants?.tree?.minimalWindowWidth && mobile) {
      setMobile(false)
    }
    if (width < constants?.tree?.minimalWindowWidth && !mobile) {
      setMobile(true)
    }
  }, [mobile, width])

  const showList =
    width < constants?.tree?.minimalWindowWidth && path.length === 1
  const showArticle =
    width < constants?.tree?.minimalWindowWidth && path.length > 1

  useEffect(() => {
    const items = articles
      .filter((n) => !!n && !!n.node)
      .filter((n) =>
        docFilter
          ? (n?.title ?? '(Titel fehlt)')
              .toLowerCase()
              .includes(docFilter.toLowerCase())
          : true,
      )
    setDocsCount(articles.length)
    setDocsFilteredCount(items.length)
  }, [docFilter, setDocsCount, setDocsFilteredCount])

  if (showList) {
    return (
      <ErrorBoundary>
        <Container>
          <ArticleList articles={articles} />
        </Container>
      </ErrorBoundary>
    )
  }

  if (showArticle) {
    return (
      <ErrorBoundary>
        <Container>
          <Doku>
            <Outlet />
          </Doku>
        </Container>
      </ErrorBoundary>
    )
  }

  return (
    <ErrorBoundary>
      <SplitPaneContainer>
        <StyledSplitPane split="vertical" size="22%" maxSize={-10}>
          <ArticleList articles={articles} />
          <Doku>
            <Outlet />
          </Doku>
        </StyledSplitPane>
      </SplitPaneContainer>
    </ErrorBoundary>
  )
}

export default withResizeDetector(observer(Documentation))
