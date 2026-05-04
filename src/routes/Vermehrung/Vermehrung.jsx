import { useContext, Suspense } from 'react'
import { Allotment } from 'allotment'
import { observer } from 'mobx-react-lite'

import { MobxStoreContext } from '../../mobxStoreContext.js'
import { Tree } from '../../components/Tree/index.jsx'
import { Data } from '../../components/Data/index.jsx'
import { Filter } from '../../components/Filter.jsx'
import { Fallback } from '../../components/shared/Fallback.jsx'
import { ErrorBoundary } from '../../components/shared/ErrorBoundary.jsx'

import styles from './Vermehrung.module.css'

export const Vermehrung = observer(() => {
  const store = useContext(MobxStoreContext)
  const { activeForm, isPrint, singleColumnView, showTreeInSingleColumnView } =
    store
  const { widthInPercentOfScreen } = store.tree

  const showFilter = store.filter.show
  let treeWidth =
    singleColumnView ?
      (!showTreeInSingleColumnView && activeForm) || showFilter ?
        0
        // if no form is active, show only tree
      : '100%'
    : `${widthInPercentOfScreen}%`

  const formWidth =
    singleColumnView ?
      (!showTreeInSingleColumnView && activeForm) || showFilter ?
        '100%'
      : 0
    : `${100 - widthInPercentOfScreen}%`
  // ensure tree is invisible when printing but still exists
  // (caused errors to render form without tree while printing)
  if (isPrint) {
    treeWidth = 0
  }
  const minSizeTree = treeWidth < 30 ? treeWidth : 30
  const minSizeForm = formWidth < 30 ? formWidth : 30

  // Compute pixel defaultSizes from window.innerWidth to avoid CLS:
  // Allotment normally renders 50/50 first, then shifts to preferredSize after
  // measuring the container — this produces a large layout shift (CLS 0.245).
  // Passing defaultSizes in pixels lets Allotment position panes correctly on
  // the very first paint.
  const containerWidth = window.innerWidth
  const treeSizePx =
    treeWidth === 0 ? 0
    : treeWidth === '100%' ? containerWidth
    : Math.round((widthInPercentOfScreen / 100) * containerWidth)
  const formSizePx = containerWidth - treeSizePx

  // need the key on Allotment or it would only render correctly on second render
  return (
    <div className={styles.container}>
      <Allotment
        key={`${treeWidth}/${formWidth}`}
        defaultSizes={[treeSizePx, formSizePx]}
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
            <ErrorBoundary>
              {showFilter ?
                <Filter />
              : <Data />}
            </ErrorBoundary>
          </Suspense>
        </Allotment.Pane>
      </Allotment>
    </div>
  )
})
