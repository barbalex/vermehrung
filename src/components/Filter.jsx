import React, { useState, useCallback, useContext, Suspense } from 'react'
import { observer } from 'mobx-react-lite'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import styled from '@emotion/styled'

import { Art } from './Data/Art/index.jsx'
import { Event } from './Data/Event/index.jsx'
import { Garten } from './Data/Garten/index.jsx'
import { Herkunft } from './Data/Herkunft/index.jsx'
import { Kultur } from './Data/Kultur/index.jsx'
import { LieferungContainer as Lieferung } from './Data/Lieferung/index.jsx'
import { SammelLieferung } from './Data/SammelLieferung/index.jsx'
import { Person } from './Data/Person/index.jsx'
import { Sammlung } from './Data/Sammlung/index.jsx'
import { Teilkultur } from './Data/Teilkultur/index.jsx'
import { Zaehlung } from './Data/Zaehlung/index.jsx'
import { ErrorBoundary } from './shared/ErrorBoundary.jsx'
import { MobxStoreContext } from '../mobxStoreContext.js'
import { Fallback } from './shared/Fallback.jsx'

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #fff3e0;
`
const StyledTabs = styled(Tabs)`
  [role='tab'][aria-selected='false'],
  svg {
    color: white !important;
  }
`
const StyledTab = styled(Tab)`
  min-width: 70px !important;
  text-transform: none !important;
`
const TitleRow = styled.div`
  background-color: #e65100;
  user-select: none;
`
const Title = styled.div`
  padding: 10px 10px 0 10px;
  color: white;
  font-weight: bold;
`

export const Filter = observer(() => {
  const { activeForm: activeFormPassed } = useContext(MobxStoreContext)
  // root is a possible value, but MUI wants one of the tabs
  const activeForm = activeFormPassed === 'root' ? 'art' : activeFormPassed
  // ensure list views are directed to correct filter
  // use exact match or garten will become gart
  // see: https://stackoverflow.com/a/447258/712005
  const activeTabFromActiveForm =
    activeForm ?
      activeForm
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
      // fallback if no form is active
    : 'art'
  const [activeTab, setActiveTab] = useState(activeTabFromActiveForm)

  const onChangeTab = useCallback((event, value) => setActiveTab(value), [])

  const formObject = {
    art: <Art filter />,
    event: <Event filter />,
    herkunft: <Herkunft filter />,
    garten: <Garten filter />,
    kultur: <Kultur filter />,
    lieferung: <Lieferung filter />,
    sammel_lieferung: <SammelLieferung filter />,
    person: <Person filter />,
    sammlung: <Sammlung filter />,
    teilkultur: <Teilkultur filter />,
    zaehlung: <Zaehlung filter />,
  }
  const form = formObject[activeTab]
  const titleObject = {
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
      <Container>
        <TitleRow>
          <Title data-id="form-title">{titleObject[activeTab]}</Title>
          <StyledTabs
            value={activeTab}
            onChange={onChangeTab}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="auto"
          >
            <StyledTab
              label="Art"
              value="art"
              data-id="art"
            />
            <StyledTab
              label="Herkunft"
              value="herkunft"
              data-id="herkunft"
            />
            <StyledTab
              label="Sammlung"
              value="sammlung"
              data-id="sammlung"
            />
            <StyledTab
              label="Garten"
              value="garten"
              data-id="garten"
            />
            <StyledTab
              label="Kultur"
              value="kultur"
              data-id="kultur"
            />
            <StyledTab
              label="Teilkultur"
              value="teilkultur"
              data-id="teilkultur"
            />
            <StyledTab
              label="Zählung"
              value="zaehlung"
              data-id="zaehlung"
            />
            <StyledTab
              label="Lieferung"
              value="lieferung"
              data-id="lieferung"
            />
            <StyledTab
              label="Sammel-Lieferung"
              value="sammel_lieferung"
              data-id="sammel_lieferung"
            />
            <StyledTab
              label="Event"
              value="event"
              data-id="event"
            />
            <StyledTab
              label="Person"
              value="person"
              data-id="person"
            />
          </StyledTabs>
        </TitleRow>
        <Suspense fallback={<Fallback />}>{form}</Suspense>
      </Container>
    </ErrorBoundary>
  )
})
