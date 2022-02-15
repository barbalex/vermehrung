import React, { useCallback, useContext, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'
import IconButton from '@mui/material/IconButton'
import { FaPlus } from 'react-icons/fa'
import { combineLatest, of as $of } from 'rxjs'
import { Q } from '@nozbe/watermelondb'

import StoreContext from '../../../../../storeContext'
import TeilzaehlungenRows from './TeilzaehlungenRows'
import Settings from './Settings'
import ErrorBoundary from '../../../../shared/ErrorBoundary'
import teilzaehlungsSortByTk from '../../../../../utils/teilzaehlungsSortByTk'
import constants from '../../../../../utils/constants'

const TitleRow = styled.div`
  background-color: rgba(248, 243, 254, 1);
  flex-shrink: 0;
  display: flex;
  height: ${constants.titleRowHeight}px;
  justify-content: space-between;
  margin-left: -10px;
  margin-right: -10px;
  margin-bottom: 10px;
  padding: 0 10px;
  position: sticky;
  top: 0;
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
    kulturOption: undefined,
  })
  useEffect(() => {
    const teilzaehlungsObservable = zaehlung.teilzaehlungs
      .extend(Q.where('_deleted', false))
      .observe()
    const kulturOptionObservable = kulturId
      ? db.get('kultur_option').find(kulturId)
      : $of({})
    const combinedObservables = combineLatest([
      teilzaehlungsObservable,
      kulturOptionObservable,
    ])
    const subscription = combinedObservables.subscribe(
      async ([tzs, kulturOption]) => {
        const teilzaehlungs = await teilzaehlungsSortByTk(tzs)
        setDataState({ teilzaehlungs, kulturOption })
      },
    )

    return () => subscription?.unsubscribe?.()
  }, [
    db,
    kulturId,
    zaehlung.kultur_option,
    zaehlung.teilkulturs,
    zaehlung.teilzaehlungs,
  ])
  const { teilzaehlungs, kulturOption } = dataState

  const { tk } = kulturOption ?? {}

  const onClickNew = useCallback(() => {
    insertTeilzaehlungRev()
  }, [insertTeilzaehlungRev])

  const showNew = teilzaehlungs.length === 0 || tk
  const title = tk ? 'Teil-Zählungen' : 'Mengen'

  return (
    <ErrorBoundary>
      <TitleRow>
        <Title>{title}</Title>
        <div>
          {kulturId && <Settings kulturId={kulturId} />}
          {showNew && (
            <IconButton
              aria-label="Neu"
              title="Neue Teil-Zählung"
              onClick={onClickNew}
              size="large"
            >
              <FaPlus />
            </IconButton>
          )}
        </div>
      </TitleRow>
      <TeilzaehlungenRows kulturId={kulturId} teilzaehlungs={teilzaehlungs} />
    </ErrorBoundary>
  )
}

export default observer(Teilzaehlungen)
