import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react-lite'
import { IoMdInformationCircleOutline } from 'react-icons/io'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'
import IconButton from '@material-ui/core/IconButton'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import get from 'lodash/get'

import { useQuery } from '../../../../models/reactUtils'
import Qk from './Qk'
import Choose from './Choose'
import appBaseUrl from '../../../../utils/appBaseUrl'
import ErrorBoundary from '../../../shared/ErrorBoundary'

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

const KulturQk = ({ kultur }) => {
  const [open, setOpen] = useState(false)

  const [tab, setTab] = useState('qk')
  const onChangeTab = useCallback((event, value) => setTab(value), [])

  const {
    data: dataKulturQk,
    loading: loadingKulturQk,
    error: errorKulturQk,
    query: queryKulturQk,
  } = useQuery(
    (store) =>
      store.queryKultur_qk({
        order_by: [{ sort: 'asc_nulls_last' }, { name: 'asc_nulls_first' }],
      }),
    undefined,
    { fetchPolicy: 'no-cache' },
  )

  const {
    data: dataKulturQkChoosen,
    loading: loadingKulturQkChoosen,
    error: errorKulturQkChoosen,
    query: queryKulturQkChoosen,
  } = useQuery(
    (store) =>
      store.queryKultur_qk_choosen({ where: { id: { _eq: kultur.id } } }),
    undefined,
    { fetchPolicy: 'no-cache' },
  )

  const loading = loadingKulturQk || loadingKulturQkChoosen
  const error = errorKulturQk || errorKulturQkChoosen

  const allQks = dataKulturQk?.kultur_qk ?? []
  const qks = allQks.filter(
    (qk) =>
      !!(dataKulturQkChoosen?.kultur_qk_choosen ?? []).find(
        (no) => no.qk_name === qk.name,
      ),
  )
  const qkNameQueries = Object.fromEntries(
    allQks.map((n) => [
      n.name,
      !!(get(dataKulturQkChoosen, 'kultur_qk_choosen') || []).find(
        (no) => no.qk_name === n.name,
      ),
    ]),
  )

  const qkCount = loading ? '...' : allQks.length
  const kulturQkCount = loading
    ? '...'
    : (get(dataKulturQkChoosen, 'kultur_qk_choosen') || []).length

  const openDocs = useCallback((e) => {
    e.stopPropagation()
    const url = `${appBaseUrl()}Dokumentation/Qualitaets-Kontrollen`
    if (typeof window !== 'undefined') {
      if (window.matchMedia('(display-mode: standalone)').matches) {
        return window.open(url, '_blank', 'toolbar=no')
      }
      window.open(url)
    }
  }, [])
  const onClickToggle = useCallback(
    (e) => {
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
              label={`auswählen${
                qkCount ? ` (${kulturQkCount}/${qkCount})` : ''
              }`}
              value="waehlen"
              data-id="waehlen"
            />
          </StyledTabs>
          <Body>
            {tab === 'qk' ? (
              <Qk kultur={kultur} qkNameQueries={qkNameQueries} qks={qks} />
            ) : (
              <Choose refetchTab={queryKulturQkChoosen.refetch} />
            )}
          </Body>
        </>
      )}
    </ErrorBoundary>
  )
}

export default observer(KulturQk)
