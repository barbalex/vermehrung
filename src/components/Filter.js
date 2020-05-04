import React, { useState, useCallback, useContext } from 'react'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import styled from 'styled-components'

import Art from './Data/Art'
import Event from './Data/Event'
import Garten from './Data/Garten'
import Herkunft from './Data/Herkunft'
import Kultur from './Data/Kultur'
import Lieferung from './Data/Lieferung'
import SammelLieferung from './Data/SammelLieferung'
import Person from './Data/Person'
import Sammlung from './Data/Sammlung'
import Teilkultur from './Data/Teilkultur'
import Zaehlung from './Data/Zaehlung'
import storeContext from '../storeContext'
import ErrorBoundary from './shared/ErrorBoundary'

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
`
const Title = styled.div`
  padding: 10px 10px 0 10px;
  color: white;
  font-weight: bold;
`

export default () => {
  const { activeForm } = useContext(storeContext)
  const [activeTab, setActiveTab] = useState(activeForm || 'art')

  const onChangeTab = useCallback((event, value) => setActiveTab(value), [])

  const formObject = {
    art: <Art filter />,
    event: <Event filter />,
    herkunft: <Herkunft filter />,
    garten: <Garten filter />,
    kultur: <Kultur filter />,
    lieferung: <Lieferung filter />,
    sammelLieferung: <SammelLieferung filter />,
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
    sammelLieferung: 'Sammel-Lieferung Filter',
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
            <StyledTab label="Art" value="art" data-id="art" />
            <StyledTab label="Herkunft" value="herkunft" data-id="herkunft" />
            <StyledTab label="Sammlung" value="sammlung" data-id="sammlung" />
            <StyledTab label="Garten" value="garten" data-id="garten" />
            <StyledTab label="Kultur" value="kultur" data-id="kultur" />
            <StyledTab
              label="Teilkultur"
              value="teilkultur"
              data-id="teilkultur"
            />
            <StyledTab label="Zählung" value="zaehlung" data-id="zaehlung" />
            <StyledTab
              label="Lieferung"
              value="lieferung"
              data-id="lieferung"
            />
            <StyledTab
              label="Sammel-Lieferung"
              value="sammelLieferung"
              data-id="sammelLieferung"
            />
            <StyledTab label="Event" value="event" data-id="event" />
            <StyledTab label="Person" value="person" data-id="person" />
          </StyledTabs>
        </TitleRow>
        {form}
      </Container>
    </ErrorBoundary>
  )
}
