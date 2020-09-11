import React, {
  useCallback,
  useState,
  useContext,
  useRef,
  useEffect,
} from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react-lite'
import { IoMdInformationCircleOutline } from 'react-icons/io'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'
import IconButton from '@material-ui/core/IconButton'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

import Qk from './Qk'
import Choose from './Choose'
import ErrorBoundary from '../../../../shared/ErrorBoundary'
import { StoreContext } from '../../../../../models/reactUtils'
import getConstants from '../../../../../utils/constants'

const constants = getConstants()

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
  user-select: none;
  position: sticky;
  ${(props) =>
    props['data-sticky'] && 'border-top: 1px solid rgba(0, 0, 0, 0.3);'}
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

const ApQk = ({ artId }) => {
  const store = useContext(StoreContext)
  const [open, setOpen] = useState(false)

  const [tab, setTab] = useState('qk')
  const onChangeTab = useCallback((event, value) => setTab(value), [])

  const allQkChoosens = [...store.art_qk_choosens.values()].filter(
    (q) => q.art_id === artId,
  )
  const qkChoosens = allQkChoosens.filter((qk) => qk.choosen)

  const qkCount = allQkChoosens.length
  const artQkCount = qkChoosens.length

  const openDocs = useCallback((e) => {
    e.stopPropagation()
    const url = `${constants?.appUri}/Dokumentation/Qualitaets-Kontrollen`
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

  const titleRowRef = useRef(null)
  const [isSticky, setIsSticky] = useState(false)
  const scrollHandler = useCallback(() => {
    const { top } = titleRowRef?.current?.getBoundingClientRect()
    if (top < 112 && !isSticky) return setIsSticky(true)
    if (top > 112 && isSticky) setIsSticky(false)
  }, [isSticky])
  useEffect(() => {
    window.addEventListener('scroll', scrollHandler, true)
    return () => {
      window.removeEventListener('scroll', scrollHandler, true)
    }
  }, [scrollHandler])

  return (
    <ErrorBoundary>
      <TitleRow
        onClick={onClickToggle}
        title={open ? 'schliessen' : 'öffnen'}
        ref={titleRowRef}
        data-sticky={isSticky}
      >
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
            {tab === 'qk' ? <Qk artId={artId} qks={qkChoosens} /> : <Choose />}
          </Body>
        </>
      )}
    </ErrorBoundary>
  )
}

export default observer(ApQk)
