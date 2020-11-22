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
import { useDatabase } from '@nozbe/watermelondb/hooks'
import { useObservableState, useObservable } from 'observable-hooks'
import { Q } from '@nozbe/watermelondb'

import { StoreContext } from '../../../../../models/reactUtils'
import TeilzaehlungenRows from './TeilzaehlungenRows'
import Settings from './Settings'
import ErrorBoundary from '../../../../shared/ErrorBoundary'
import teilzaehlungSort from '../../../../../utils/teilzaehlungSort'

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

const Teilzaehlungen = ({ zaehlungId }) => {
  const store = useContext(StoreContext)
  const { insertTeilzaehlungRev, teilzaehlungsSorted } = store

  const zaehlung = store.zaehlungs.get(zaehlungId) ?? {}
  const kulturId = zaehlung.kultur_id

  const hierarchyFilter = (r) => r.zaehlung_id === zaehlungId

  const storeRowsFiltered = teilzaehlungsSorted.filter(hierarchyFilter)

  // see: https://github.com/Nozbe/withObservables/issues/16#issuecomment-661444478
  const db = useDatabase()
  // useObservable reduces recomputation
  const teilzaehlungCollection = useObservable(() =>
    db.collections
      .get('teilzaehlung')
      .query(Q.where('zaehlung_id', zaehlungId))
      .observe(),
  )
  const teilzaehlungs = useObservableState(teilzaehlungCollection, []).sort(
    teilzaehlungSort,
  )
  console.log('Teilzaehlungen', {
    storeRowsFiltered,
    teilzaehlungs,
    zaehlungId,
  })

  const kulturOption = store.kultur_options.get(kulturId) ?? {}
  const { tk } = kulturOption

  const onClickNew = useCallback(() => {
    insertTeilzaehlungRev()
  }, [insertTeilzaehlungRev])

  const showNew = storeRowsFiltered.length === 0 || tk
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
          {kulturId && <Settings kulturId={kulturId} />}
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
      <TeilzaehlungenRows zaehlungId={zaehlungId} kulturId={kulturId} />
    </ErrorBoundary>
  )
}

export default observer(Teilzaehlungen)
