import { useCallback, useState, useContext, useEffect } from 'react'
import styled from '@emotion/styled'
import { observer } from 'mobx-react-lite'
import { IoMdInformationCircleOutline } from 'react-icons/io'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'
import IconButton from '@mui/material/IconButton'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import { motion, useAnimation } from 'framer-motion'
import { combineLatest, of as $of } from 'rxjs'
import { Q } from '@nozbe/watermelondb'

import { Qk } from './Qk/index.jsx'
import { Choose } from './Choose/index.jsx'
import { ErrorBoundary } from '../../../../shared/ErrorBoundary.jsx'
import { MobxStoreContext } from '../../../../../mobxStoreContext.js'
import { constants } from '../../../../../utils/constants.js'

const TitleRow = styled.section`
  background-color: rgba(248, 243, 254, 1);
  flex-shrink: 0;
  display: flex !important;
  height: ${constants.titleRowHeight}px;
  justify-content: space-between !important;
  margin-left: -10px;
  margin-right: -10px;
  margin-bottom: 10px;
  padding: 0 10px;
  cursor: pointer;
  user-select: none;
  position: sticky !important;
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

export const QK = observer(({ artId }) => {
  const store = useContext(MobxStoreContext)
  const { db, user } = store

  const [tab, setTab] = useState('qk')
  const onChangeTab = useCallback((event, value) => setTab(value), [])

  const [dataState, setDataState] = useState({ qks: [], userPersonOption: {} })
  useEffect(() => {
    const userPersonOptionsObservable =
      user.uid ?
        db
          .get('person_option')
          .query(Q.on('person', Q.where('account_id', user.uid)))
          .observeWithColumns(['art_qk_choosen'])
      : $of({})
    const artQksObservable = db
      .get('art_qk')
      .query(Q.where('_deleted', false), Q.sortBy('name', Q.asc))
      .observeWithColumns(['name'])
    const combinedObservables = combineLatest([
      userPersonOptionsObservable,
      artQksObservable,
    ])
    const subscription = combinedObservables.subscribe(
      ([userPersonOptions, qks]) =>
        setDataState({
          qks,
          userPersonOption: userPersonOptions?.[0],
        }),
    )

    return () => subscription?.unsubscribe?.()
  }, [db, user.uid])
  const { qks, userPersonOption } = dataState
  const qkChoosens = qks.filter(
    (qk) => userPersonOption?.art_qk_choosen?.includes?.(qk.id) ?? false,
  )

  const qkCount = qks.length
  const qkChoosenCount = qkChoosens.length

  const openDocs = useCallback((e) => {
    e.stopPropagation()
    const url = `${constants?.getAppUri()}/Dokumentation/qualitaets-kontrollen`
    if (window.matchMedia('(display-mode: standalone)').matches) {
      return window.open(url, '_blank', 'toolbar=no')
    }
    window.open(url)
  }, [])

  const [open, setOpen] = useState(false)
  const anim = useAnimation()
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
      >
        <Title>Qualitäts-Kontrollen</Title>
        <div>
          <IconButton
            aria-label="Anleitung öffnen"
            title="Anleitung öffnen"
            onClick={openDocs}
            size="large"
          >
            <IoMdInformationCircleOutline />
          </IconButton>
          <IconButton
            aria-label={open ? 'schliessen' : 'öffnen'}
            title={open ? 'schliessen' : 'öffnen'}
            onClick={onClickToggle}
            size="large"
          >
            {open ?
              <FaChevronUp />
            : <FaChevronDown />}
          </IconButton>
        </div>
      </TitleRow>
      <motion.div
        animate={anim}
        transition={{ type: 'just', duration: 0.4 }}
      >
        {open && (
          <>
            <StyledTabs
              value={tab}
              onChange={onChangeTab}
              indicatorColor="primary"
              textColor="primary"
              centered
            >
              <Tab
                label="ausführen"
                value="qk"
                data-id="qk"
              />
              <Tab
                label={`auswählen${
                  qkCount ? ` (${qkChoosenCount}/${qkCount})` : ''
                }`}
                value="waehlen"
                data-id="waehlen"
              />
            </StyledTabs>
            <Body>
              {tab === 'qk' ?
                <Qk
                  artId={artId}
                  qkChoosens={qkChoosens}
                />
              : <Choose qks={qks} />}
            </Body>
          </>
        )}
      </motion.div>
    </ErrorBoundary>
  )
})
