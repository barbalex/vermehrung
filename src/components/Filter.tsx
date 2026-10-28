import { useState, Suspense, lazy } from 'react'
import { useAtomValue } from 'jotai'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'

const Art = lazy(async () => ({
  default: (await import('./Data/Art/index.tsx')).Art,
}))
const Event = lazy(async () => ({
  default: (await import('./Data/Event/index.tsx')).Event,
}))
const Garten = lazy(async () => ({
  default: (await import('./Data/Garten/index.tsx')).Garten,
}))
const Herkunft = lazy(async () => ({
  default: (await import('./Data/Herkunft/index.tsx')).Herkunft,
}))
const Kultur = lazy(async () => ({
  default: (await import('./Data/Kultur/index.tsx')).Kultur,
}))
const Lieferung = lazy(async () => ({
  default: (await import('./Data/Lieferung/index.tsx')).LieferungContainer,
}))
const SammelLieferung = lazy(async () => ({
  default: (await import('./Data/SammelLieferung/index.tsx')).SammelLieferung,
}))
const Person = lazy(async () => ({
  default: (await import('./Data/Person/index.tsx')).Person,
}))
const Sammlung = lazy(async () => ({
  default: (await import('./Data/Sammlung/index.tsx')).Sammlung,
}))
const Teilkultur = lazy(async () => ({
  default: (await import('./Data/Teilkultur/index.tsx')).Teilkultur,
}))
const Zaehlung = lazy(async () => ({
  default: (await import('./Data/Zaehlung/index.tsx')).Zaehlung,
}))
import { ErrorBoundary } from './shared/ErrorBoundary.tsx'
import { activeFormAtom } from '../store/index.ts'
import { Fallback } from './shared/Fallback.tsx'

import styles from './Filter.module.css'

export const Filter = () => {
  const activeFormPassed = useAtomValue(activeFormAtom)
  // root is a possible value, but MUI wants one of the tabs
  const activeForm = activeFormPassed === 'root' ? 'art' : activeFormPassed
  // ensure list views are directed to correct filter
  // use exact match or garten will become gart
  // see: https://stackoverflow.com/a/447258/712005
  const activeTabFromActiveForm = activeForm
    ? activeForm
        .replace(/^events$/, 'event')
        .replace(/^herkuenfte$/, 'herkunft')
        .replace(/^gaerten$/, 'garten')
        .replace(/^arten$/, 'art')
        .replace(/^kulturen$/, 'kultur')
        .replace(/^lieferungen$/, 'lieferung')
        .replace(/^sammelLieferungen$/, 'sammel_lieferung')
        .replace(/^personen$/, 'person')
        .replace(/^sammlungen$/, 'sammlung')
        .replace(/^teilkulturen$/, 'teilkultur')
        .replace(/^zaehlungen$/, 'zaehlung')
    : // fallback if no form is active
      'art'
  const [activeTab, setActiveTab] = useState(activeTabFromActiveForm)

  const onChangeTab = (event: unknown, value: string) => setActiveTab(value)

  const formObject: Record<string, import('react').ReactElement> = {
    art: <Art filter />,
    event: <Event filter />,
    herkunft: <Herkunft filter />,
    garten: <Garten filter />,
    kultur: <Kultur filter />,
    lieferung: <Lieferung filter lieferung={undefined} />,
    sammel_lieferung: <SammelLieferung filter />,
    person: <Person filter />,
    sammlung: <Sammlung filter />,
    teilkultur: <Teilkultur filter />,
    zaehlung: <Zaehlung filter />,
  }
  const form = formObject[activeTab]
  const titleObject: Record<string, string> = {
    art: 'Art Filter',
    event: 'Event Filter',
    garten: 'Garten Filter',
    herkunft: 'Herkunft Filter',
    kultur: 'Kultur Filter',
    lieferung: 'Lieferung Filter',
    sammel_lieferung: 'Sammel-Lieferung Filter',
    person: 'Person Filter',
    sammlung: 'Sammlung Filter',
    teilkultur: 'TeilKultur Filter',
    zaehlung: 'Zählung Filter',
  }

  return (
    <ErrorBoundary>
      <div className={styles.container}>
        <div className={styles.titleRow}>
          <div className={styles.title} data-id="form-title">
            {titleObject[activeTab]}
          </div>
          <Tabs
            value={activeTab}
            onChange={onChangeTab}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="auto"
            className={styles.tabs}
          >
            <Tab className={styles.tab} label="Art" value="art" data-id="art" />
            <Tab
              className={styles.tab}
              label="Herkunft"
              value="herkunft"
              data-id="herkunft"
            />
            <Tab
              className={styles.tab}
              label="Sammlung"
              value="sammlung"
              data-id="sammlung"
            />
            <Tab
              className={styles.tab}
              label="Garten"
              value="garten"
              data-id="garten"
            />
            <Tab
              className={styles.tab}
              label="Kultur"
              value="kultur"
              data-id="kultur"
            />
            <Tab
              className={styles.tab}
              label="Teilkultur"
              value="teilkultur"
              data-id="teilkultur"
            />
            <Tab
              className={styles.tab}
              label="Zählung"
              value="zaehlung"
              data-id="zaehlung"
            />
            <Tab
              className={styles.tab}
              label="Lieferung"
              value="lieferung"
              data-id="lieferung"
            />
            <Tab
              className={styles.tab}
              label="Sammel-Lieferung"
              value="sammel_lieferung"
              data-id="sammel_lieferung"
            />
            <Tab
              className={styles.tab}
              label="Event"
              value="event"
              data-id="event"
            />
            <Tab
              className={styles.tab}
              label="Person"
              value="person"
              data-id="person"
            />
          </Tabs>
        </div>
        <Suspense fallback={<Fallback />}>{form}</Suspense>
      </div>
    </ErrorBoundary>
  )
}
