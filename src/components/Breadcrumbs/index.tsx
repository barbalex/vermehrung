import { useEffect, useRef, type ReactNode } from 'react'
import { useAtomValue } from 'jotai'
import MuiBreadcrumbs from '@mui/material/Breadcrumbs'
import Link from '@mui/material/Link'
import { Link as RouterLink } from 'react-router'

import {
  activeNodeArrayAtom,
  activeObjectNameAtom,
  treePaneHiddenAtom,
} from '../../store/index.ts'
import { labelOfSingular } from '../../utils/singularOfFolder.ts'
import { RowCrumb } from './RowCrumb.tsx'

import styles from './index.module.css'

// display labels for the folder names used in urls
const FOLDER_LABELS: Record<string, string> = {
  Arten: 'Arten',
  Herkuenfte: 'Herkünfte',
  Sammlungen: 'Sammlungen',
  Gaerten: 'Gärten',
  Kulturen: 'Kulturen',
  Teilkulturen: 'Teilkulturen',
  Zaehlungen: 'Zählungen',
  Lieferungen: 'Lieferungen',
  'An-Lieferungen': 'An-Lieferungen',
  'Aus-Lieferungen': 'Aus-Lieferungen',
  'Sammel-Lieferungen': 'Sammel-Lieferungen',
  Personen: 'Personen',
  Bedarf: 'Bedarf',
}

interface Crumb {
  key: string
  label: ReactNode
  url: string[]
}

// always-visible strip below the app bar (ps-style, as opposed to apf2's
// mobile-only bookmarks) showing the path of the active node.
// Replaces the nav buttons in the form title bars - see
// src/utils/breadcrumbsEnabled.ts
export const Breadcrumbs = () => {
  const activeNodeArray = useAtomValue(activeNodeArrayAtom)
  const objectName = useAtomValue(activeObjectNameAtom)
  const treePaneHidden = useAtomValue(treePaneHiddenAtom)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = scrollRef.current
    if (!element) return
    // always show the trail's end (the current node): scroll right on
    // every trail change (navigation, labels resolving asynchronously)
    // and on strip resizes
    const scrollToRight = () => element.scrollTo({ left: element.scrollWidth })
    scrollToRight()
    const resizeObserver = new ResizeObserver(scrollToRight)
    resizeObserver.observe(element)
    const mutationObserver = new MutationObserver(scrollToRight)
    mutationObserver.observe(element, {
      childList: true,
      subtree: true,
      characterData: true,
    })
    return () => {
      resizeObserver.disconnect()
      mutationObserver.disconnect()
    }
  }, [])

  const crumbs: Crumb[] = [{ key: 'root', label: 'Vermehrung', url: [] }]
  for (let i = 0; i < activeNodeArray.length; i += 2) {
    const folder = activeNodeArray[i]
    if (typeof folder !== 'string') continue
    crumbs.push({
      key: `folder-${i}`,
      label: FOLDER_LABELS[folder] ?? folder,
      url: activeNodeArray.slice(0, i + 1),
    })
    const id = activeNodeArray[i + 1]
    if (id !== undefined) {
      crumbs.push({
        key: `row-${i}`,
        label: (
          <RowCrumb
            folder={folder}
            parentFolder={i > 0 ? activeNodeArray[i - 1] : undefined}
            id={id}
          />
        ),
        url: activeNodeArray.slice(0, i + 2),
      })
    }
  }
  // an open object form adds its name as the last crumb
  // (the object's own crumb then links to its list)
  if (objectName) {
    crumbs.push({
      key: 'object',
      label: labelOfSingular[objectName] ?? objectName,
      url: [],
    })
  }

  return (
    <div
      className={
        treePaneHidden
          ? `${styles.container} ${styles.containerWithoutSeparator}`
          : styles.container
      }
      ref={scrollRef}
    >
      <MuiBreadcrumbs
        separator={<span className={styles.divider} />}
        className={styles.trail}
        aria-label="Pfad"
        // never collapse into the '...' element: the strip scrolls
        // horizontally and is pinned to the current node
        maxItems={100}
      >
        {crumbs.map((crumb, index) =>
          index === crumbs.length - 1 ? (
            <span key={crumb.key} className={styles.current}>
              {crumb.label}
            </span>
          ) : (
            <Link
              key={crumb.key}
              component={RouterLink}
              to={`/Vermehrung/${crumb.url.join('/')}`}
              underline="hover"
            >
              {crumb.label}
            </Link>
          ),
        )}
      </MuiBreadcrumbs>
    </div>
  )
}
