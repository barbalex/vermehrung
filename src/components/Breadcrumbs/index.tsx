import { useEffect, useRef, type ReactNode } from 'react'
import { useAtomValue } from 'jotai'
import MuiBreadcrumbs from '@mui/material/Breadcrumbs'
import Link from '@mui/material/Link'
import { Link as RouterLink } from 'react-router'

import { activeNodeArrayAtom } from '../../store/index.ts'
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
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // keep the current node visible when the trail overflows
    const element = scrollRef.current
    element?.scrollTo({ left: element.scrollWidth })
  }, [activeNodeArray])

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

  return (
    <div className={styles.container} ref={scrollRef}>
      <MuiBreadcrumbs separator="›" className={styles.trail} aria-label="Pfad">
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
