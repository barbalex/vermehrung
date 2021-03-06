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
import { motion, useAnimation } from 'framer-motion'
import { Q } from '@nozbe/watermelondb'
import { combineLatest, of as $of } from 'rxjs'

import StoreContext from '../../../../../storeContext'
import Qk from './Qk'
import Choose from './Choose'
import getConstants from '../../../../../utils/constants'
import ErrorBoundary from '../../../../shared/ErrorBoundary'

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

const KulturQk = ({ kultur }) => {
  const store = useContext(StoreContext)
  const { db, user } = store

  const titleRowRef = useRef(null)
  const [isSticky, setIsSticky] = useState(false)
  const scrollHandler = useCallback(() => {
    const top = titleRowRef?.current?.getBoundingClientRect()?.top
    if (top < 112 && !isSticky) return setIsSticky(true)
    if (top > 112 && isSticky) setIsSticky(false)
  }, [isSticky])
  useEffect(() => {
    window.addEventListener('scroll', scrollHandler, true)
    return () => {
      window.removeEventListener('scroll', scrollHandler, true)
    }
  }, [scrollHandler])

  const [tab, setTab] = useState('qk')
  const onChangeTab = useCallback((event, value) => setTab(value), [])

  const [dataState, setDataState] = useState({
    qks: [],
    userPersonOption,
  })
  useEffect(() => {
    const userPersonOptionsObservable = user.uid
      ? db
          .get('person_option')
          .query(Q.on('person', Q.where('account_id', user.uid)))
          .observeWithColumns(['kultur_qk_choosen'])
      : $of({})
    const kulturQksObservable = db
      .get('kultur_qk')
      .query(Q.where('_deleted', false))
      .observeWithColumns(['name'])
    const combinedObservables = combineLatest([
      userPersonOptionsObservable,
      kulturQksObservable,
    ])
    const subscription = combinedObservables.subscribe(
      ([userPersonOptions, qks]) => {
        setDataState({ qks, userPersonOption: userPersonOptions?.[0] })
      },
    )

    return () => subscription.unsubscribe()
  }, [db, user.uid])
  const { qks, userPersonOption } = dataState
  const qkChoosens = qks.filter((qk) =>
    userPersonOption.kultur_qk_choosen.includes(qk.id),
  )

  const qkCount = qks.length
  const qkChoosenCount = qkChoosens.length

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

  const [open, setOpen] = useState(false)
  let anim = useAnimation()
  const onClickToggle = useCallback(
    async (e) => {
      e.stopPropagation()
      if (open) {
        const was = open
        await anim.start({ opacity: 0 })
        await anim.start({ height: 0 })
        setOpen(!was)
      } else {
        setOpen(!open)
        setTimeout(async () => {
          await anim.start({ height: 'auto' })
          await anim.start({ opacity: 1 })
        })
      }
    },
    [anim, open],
  )

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
      <motion.div animate={anim} transition={{ type: 'just', duration: 0.5 }}>
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
                  qkCount ? ` (${qkChoosenCount}/${qkCount})` : ''
                }`}
                value="waehlen"
                data-id="waehlen"
              />
            </StyledTabs>
            <Body>
              {tab === 'qk' ? (
                <Qk kultur={kultur} qkChoosens={qkChoosens} />
              ) : (
                <Choose qks={qks} />
              )}
            </Body>
          </>
        )}
      </motion.div>
    </ErrorBoundary>
  )
}

export default observer(KulturQk)
