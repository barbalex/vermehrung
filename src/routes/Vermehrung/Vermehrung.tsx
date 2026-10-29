import { Suspense } from 'react'
import { Allotment } from 'allotment'
import { useAtomValue } from 'jotai'

import {
  singleColumnViewAtom,
  widthInPercentOfScreenAtom,
  filterShowAtom,
  treePaneHiddenAtom,
} from '../../store/index.ts'
import { Tree } from '../../components/Tree/index.tsx'
import { Data } from '../../components/Data/index.tsx'
import { Filter } from '../../components/Filter.tsx'
import { Fallback } from '../../components/shared/Fallback.tsx'
import { ErrorBoundary } from '../../components/shared/ErrorBoundary.tsx'
import { breadcrumbsEnabled } from '../../utils/breadcrumbsEnabled.ts'

import styles from './Vermehrung.module.css'

export const Vermehrung = () => {
  const singleColumnView = useAtomValue(singleColumnViewAtom)
  const widthInPercentOfScreen = useAtomValue(widthInPercentOfScreenAtom)
  const showFilter = useAtomValue(filterShowAtom)
  const treePaneHidden = useAtomValue(treePaneHiddenAtom)

  const treeWidth = treePaneHidden
    ? 0
    : singleColumnView
      ? // if no form is active, show only tree
        '100%'
      : `${widthInPercentOfScreen}%`

  const formWidth = singleColumnView
    ? treePaneHidden
      ? '100%'
      : 0
    : `${100 - widthInPercentOfScreen}%`
  const minSizeTree = Number(treeWidth) < 30 ? Number(treeWidth) : 30
  const minSizeForm = Number(formWidth) < 30 ? Number(formWidth) : 30

  // Compute pixel defaultSizes from window.innerWidth to avoid CLS:
  // Allotment normally renders 50/50 first, then shifts to preferredSize after
  // measuring the container — this produces a large layout shift (CLS 0.245).
  // Passing defaultSizes in pixels lets Allotment position panes correctly on
  // the very first paint.
  const containerWidth = window.innerWidth
  const treeSizePx =
    treeWidth === 0
      ? 0
      : treeWidth === '100%'
        ? containerWidth
        : Math.round((widthInPercentOfScreen / 100) * containerWidth)
  const formSizePx = containerWidth - treeSizePx

  // need the key on Allotment or it would only render correctly on second render
  return (
    <div
      className={
        breadcrumbsEnabled
          ? `${styles.container} ${styles.containerWithBreadcrumbs}`
          : styles.container
      }
    >
      <Allotment
        key={`${treeWidth}/${formWidth}`}
        defaultSizes={[treeSizePx, formSizePx]}
        separator={treeWidth !== 0 && formWidth !== 0}
      >
        <Allotment.Pane
          visible={treeWidth !== 0}
          preferredSize={treeWidth}
          minSize={minSizeTree}
        >
          <Suspense fallback={<Fallback />}>
            <ErrorBoundary>
              <Tree />
            </ErrorBoundary>
          </Suspense>
        </Allotment.Pane>
        <Allotment.Pane
          visible={formWidth !== 0}
          preferredSize={formWidth}
          minSize={minSizeForm}
        >
          <Suspense fallback={<Fallback />}>
            <ErrorBoundary>{showFilter ? <Filter /> : <Data />}</ErrorBoundary>
          </Suspense>
        </Allotment.Pane>
      </Allotment>
    </div>
  )
}
