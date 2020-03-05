import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react-lite'
import { IoMdInformationCircleOutline } from 'react-icons/io'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'
import IconButton from '@material-ui/core/IconButton'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import ErrorBoundary from 'react-error-boundary'
import { useQuery } from '@apollo/react-hooks'
import get from 'lodash/get'

import Qk from './Qk'
import Choose from './Choose'
import queryQk from './queryQk'

const TitleRow = styled.div`
  background-color: rgba(237, 230, 244, 1);
  flex-shrink: 0;
  display: flex;
  height: 48px;
  justify-content: space-between;
  margin-left: -10px;
  margin-right: -10px;
  margin-bottom: 10px;
  padding: 0 10px;
  cursor: pointer;
  position: sticky;
  top: -10px;
  z-index: 1;
  &:first-of-type {
    margin-top: -10px;
  }
`
const Title = styled.div`
  font-weight: bold;
  margin-top: auto;
  margin-bottom: auto;
`
const StyledTabs = styled(Tabs)`
  margin-top: -10px;
`
const Body = styled.div`
  padding: 10px 0;
`

const ApQk = ({ art }) => {
  const [open, setOpen] = useState(false)

  const [tab, setTab] = useState('qk')
  const onChangeTab = useCallback((event, value) => setTab(value), [])

  const { data, loading, error, refetch } = useQuery(queryQk, {
    variables: { artId: art.id },
    fetchPolicy: 'no-cache',
  })
  const allQks = get(data, 'art_qk') || []
  const qks = allQks.filter(
    qk =>
      !!(get(data, 'art_qk_choosen') || []).find(no => no.qk_name === qk.name),
  )
  const qkNameQueries = Object.fromEntries(
    allQks.map(n => [
      n.name,
      !!(get(data, 'art_qk_choosen') || []).find(no => no.qk_name === n.name),
    ]),
  )

  const qkCount = loading ? '...' : allQks.length
  const artQkCount = loading
    ? '...'
    : (get(data, 'art_qk_choosen') || []).length

  const openDocs = useCallback(e => {
    e.stopPropagation()
    typeof window !== 'undefined' &&
      window.open('https://vermehrung.ch/Dokumentation/Qualitaets-Kontrollen')
  }, [])
  const onClickToggle = useCallback(
    e => {
      e.stopPropagation()
      setOpen(!open)
    },
    [open],
  )

  if (error) return `Fehler: ${error.message}`
  return (
    <ErrorBoundary>
      <TitleRow onClick={onClickToggle} title={open ? 'schliessen' : 'öffnen'}>
        <Title>Qualitäts-Kontrollen</Title>
        <div>
          <IconButton
            aria-label="Anleitung öffnen"
            title="Anleitung öffnen"
            onClick={openDocs}
          >
            <IoMdInformationCircleOutline />
          </IconButton>
          <IconButton
            aria-label={open ? 'schliessen' : 'öffnen'}
            title={open ? 'schliessen' : 'öffnen'}
            onClick={onClickToggle}
          >
            {open ? <FaChevronUp /> : <FaChevronDown />}
          </IconButton>
        </div>
      </TitleRow>
      {open && (
        <>
          <StyledTabs
            value={tab}
            onChange={onChangeTab}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="ausführen" value="qk" data-id="qk" />
            <Tab
              label={`auswählen${qkCount ? ` (${artQkCount}/${qkCount})` : ''}`}
              value="waehlen"
              data-id="waehlen"
            />
          </StyledTabs>
          <Body>
            {tab === 'qk' ? (
              <Qk art={art} qkNameQueries={qkNameQueries} qks={qks} />
            ) : (
              <Choose refetchTab={refetch} />
            )}
          </Body>
        </>
      )}
    </ErrorBoundary>
  )
}

export default observer(ApQk)
