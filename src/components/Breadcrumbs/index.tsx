import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react'
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

// shared by the enter and exit animations; must stay in sync with the
// delayed unmount in Breadcrumbs
const ANIM_DURATION = 700

// reduced-motion users get no movement at all
const animDuration = () =>
  matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : ANIM_DURATION

// a removed crumb kept mounted while it fades and collapses, so the trail
// slides instead of jumping - same behavior as ps's breadcrumbs.
// The divider comes along so the trail reads continuously while it slides.
const ExitingCrumb = ({ crumb }: { crumb: Crumb }) => {
  const ref = useRef<HTMLSpanElement>(null)

  useLayoutEffect(() => {
    const element = ref.current
    if (!element) return

    // freeze the measured footprint so flex shrink, the automatic minimum
    // size and content-box width cannot fight the animation
    element.style.boxSizing = 'border-box'
    element.style.flexShrink = '0'
    element.style.minWidth = '0px'

    // margins are left alone on purpose: the first-of-type margin-right
    // transfers to the next crumb when this one unmounts
    const animation = element.animate(
      [
        { width: `${element.offsetWidth}px`, opacity: 1 },
        { width: '0px', opacity: 0 },
      ],
      { duration: animDuration(), easing: 'ease-in-out', fill: 'forwards' },
    )
    return () => animation.cancel()
  }, [])

  return (
    <span
      className={styles.exitingItem}
      ref={ref}
    >
      <span className={styles.divider} />
      <span className={styles.exitingLabel}>{crumb.label}</span>
    </span>
  )
}

// one live crumb: the current node (plain text) or a link to its list.
// The wrapper span gives every crumb a stable element across the
// link/current flip, so React never remounts a crumb that stays.
// New crumbs (enter) fade in and grow from zero width so the trail
// extends smoothly - the counterpart to ExitingCrumb's collapse.
const CrumbItem = ({
  crumb,
  isCurrent,
  enter,
}: {
  crumb: Crumb
  isCurrent: boolean
  enter: boolean
}) => {
  const ref = useRef<HTMLSpanElement>(null)

  useLayoutEffect(() => {
    if (!enter) return
    const element = ref.current
    if (!element) return

    // box-sizing/min-width so the box can start at zero despite the
    // content and the automatic minimum size; fill stays 'none' - row
    // labels resolve asynchronously and change the natural width
    element.style.boxSizing = 'border-box'
    element.style.minWidth = '0px'
    const width = element.offsetWidth
    const animation = element.animate(
      [
        { width: '0px', opacity: 0 },
        { width: `${width}px`, opacity: 1 },
      ],
      { duration: animDuration(), easing: 'ease-in-out' },
    )
    return () => animation.cancel()
  }, [enter])

  return (
    <span
      className={styles.item}
      ref={ref}
    >
      {isCurrent ?
        <span className={styles.current}>{crumb.label}</span>
      : <Link
          component={RouterLink}
          to={`/Vermehrung/${crumb.url.join('/')}`}
          underline="hover"
        >
          {crumb.label}
        </Link>}
    </span>
  )
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

  // keep removed crumbs mounted (with their label) while they fade and
  // collapse; the diff runs during render so removed crumbs never miss a
  // frame. Keys are positional, so a path change at some level removes all
  // the deeper crumbs at once - exactly the ones that should animate out.
  // prevKeys is captured first: crumbs without one are new and grow in.
  const [exitingCrumbs, setExitingCrumbs] = useState<Crumb[]>([])
  const prevCrumbsRef = useRef<Crumb[]>(crumbs)
  const prevKeys = new Set(prevCrumbsRef.current.map((crumb) => crumb.key))
  if (prevCrumbsRef.current !== crumbs) {
    const currentKeys = new Set(crumbs.map((crumb) => crumb.key))
    const removed = prevCrumbsRef.current.filter(
      (crumb) => !currentKeys.has(crumb.key),
    )
    prevCrumbsRef.current = crumbs
    if (removed.length) {
      setExitingCrumbs((prev) => [...prev, ...removed])
      for (const crumb of removed) {
        setTimeout(() => {
          setExitingCrumbs((prev) =>
            prev.filter((c) => c.key !== crumb.key),
          )
        }, ANIM_DURATION)
      }
    }
  }

  return (
    <div
      className={
        treePaneHidden ?
          `${styles.container} ${styles.containerWithoutSeparator}`
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
        {crumbs.map((crumb, index) => (
          <CrumbItem
            key={crumb.key}
            crumb={crumb}
            isCurrent={index === crumbs.length - 1}
            enter={!prevKeys.has(crumb.key)}
          />
        ))}
      </MuiBreadcrumbs>
      {/* exiting crumbs render to the right of the trail, where the removed
          ones came from; the live trail slides right as they collapse */}
      {exitingCrumbs.map((crumb) => (
        <ExitingCrumb
          key={`exiting-${crumb.key}`}
          crumb={crumb}
        />
      ))}
    </div>
  )
}
