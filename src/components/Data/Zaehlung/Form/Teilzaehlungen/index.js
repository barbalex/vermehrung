import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'
import IconButton from '@material-ui/core/IconButton'
import { FaPlus } from 'react-icons/fa'
import { combineLatest, of as $of } from 'rxjs'

import StoreContext from '../../../../../storeContext'
import TeilzaehlungenRows from './TeilzaehlungenRows'
import Settings from './Settings'
import ErrorBoundary from '../../../../shared/ErrorBoundary'
import teilzaehlungsSortByTk from '../../../../../utils/teilzaehlungsSortByTk'
import teilkulturLabelFromTeilkultur from '../../../../../utils/teilkulturLabelFromTeilkultur'
import teilkulturSort from '../../../../../utils/teilkulturSort'

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
  position: sticky;
  ${(props) =>
    props['data-sticky'] && 'border-top: 1px solid rgba(0, 0, 0, 0.3);'}
  top: -10px;
  z-index: 1;
  user-select: none;
`
const Title = styled.div`
  font-weight: bold;
  margin-top: auto;
  margin-bottom: auto;
`

const Teilzaehlungen = ({ zaehlung }) => {
  const store = useContext(StoreContext)
  const { insertTeilzaehlungRev, db } = store

  const kulturId = zaehlung.kultur_id

  const [dataState, setDataState] = useState({
    teilzaehlungs: [],
    teilkulturWerte: [],
    kulturOption: undefined,
  })
  useEffect(() => {
    const teilzaehlungsObservable = zaehlung.teilzaehlungs.observe()
    const teilkultursObservable = zaehlung.teilkulturs.observe()
    const kulturOptionObservable = kulturId
      ? db.get('kultur_option').find(kulturId)
      : $of({})
    const combinedObservables = combineLatest([
      teilzaehlungsObservable,
      teilkultursObservable,
      kulturOptionObservable,
    ])
    const subscription = combinedObservables.subscribe(
      async ([tzs, teilkulturs, kulturOption]) => {
        const teilzaehlungs = await teilzaehlungsSortByTk(tzs)
        const teilkulturWerte = teilkulturs.sort(teilkulturSort).map((tk) => ({
          value: tk.id,
          label: teilkulturLabelFromTeilkultur({ teilkultur: tk }),
        }))
        setDataState({ teilzaehlungs, kulturOption, teilkulturWerte })
      },
    )
    return () => subscription.unsubscribe()
  }, [
    db,
    kulturId,
    zaehlung.kultur_option,
    zaehlung.teilkulturs,
    zaehlung.teilzaehlungs,
  ])
  const { teilzaehlungs, teilkulturWerte, kulturOption } = dataState

  const { tk } = kulturOption ?? {}

  const onClickNew = useCallback(() => {
    insertTeilzaehlungRev()
  }, [insertTeilzaehlungRev])

  const showNew = teilzaehlungs.length === 0 || tk
  const title = tk ? 'Teil-Zählungen' : 'Mengen'

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
      <TitleRow ref={titleRowRef} data-sticky={isSticky}>
        <Title>{title}</Title>
        <div>
          {kulturId && <Settings kulturOption={kulturOption} />}
          {showNew && (
            <IconButton
              aria-label="Neu"
              title="Neue Teil-Zählung"
              onClick={onClickNew}
            >
              <FaPlus />
            </IconButton>
          )}
        </div>
      </TitleRow>
      <TeilzaehlungenRows
        kulturId={kulturId}
        teilzaehlungs={teilzaehlungs}
        teilkulturWerte={teilkulturWerte}
        kulturOption={kulturOption}
      />
    </ErrorBoundary>
  )
}

export default observer(Teilzaehlungen)
