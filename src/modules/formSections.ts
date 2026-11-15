import { atom, useAtomValue, type Atom } from 'jotai'

import { store } from '../store/index.ts'

// Collapsible form sections (QK, Timeline, HerkunftTimeline, Personen,
// Gaerten, Arten) expanded via the url's ?open=<slug>[,<slug>] param,
// synced by modules/searchSync.ts. Slugs are shared across forms: the
// 'timeline' of an Art form and a Kultur form is the same slug, so
// navigating between forms keeps the expanded sections expanded (the
// timelines lazy-load recharts on first expand — staying open keeps
// them warm). Absent param: all sections collapsed (the default).

/** slugs of the expanded sections; url-driven, deliberately not persisted */
export const openFormSectionsAtom = atom<string[]>([])

// cached, not created per call: the factory was invoked during render
const isOpenAtoms = new Map<string, Atom<boolean>>()
const isOpenAtom = (slug: string) => {
  let atomInstance = isOpenAtoms.get(slug)
  if (!atomInstance) {
    // a derived boolean per slug, so a toggle re-renders only its section
    atomInstance = atom((get) => get(openFormSectionsAtom).includes(slug))
    isOpenAtoms.set(slug, atomInstance)
  }
  return atomInstance
}

export const toggleFormSection = (slug: string) => {
  const current = store.get(openFormSectionsAtom)
  store.set(
    openFormSectionsAtom,
    current.includes(slug) ?
      current.filter((s) => s !== slug)
    : [...current, slug],
  )
}

/** a section's expanded state, url-backed via ?open= */
export const useFormSectionOpen = (slug: string): boolean =>
  useAtomValue(isOpenAtom(slug))
