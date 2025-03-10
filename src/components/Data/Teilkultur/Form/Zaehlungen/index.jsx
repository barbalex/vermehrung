import React, { useContext, useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import styled from '@emotion/styled'
import { Q } from '@nozbe/watermelondb'

import { MobxStoreContext } from '../../../../../mobxStoreContext.js'
import { teilzaehlungsSortByZaehlungTk } from '../../../../../utils/teilzaehlungsSortByZaehlungTk.js'
import { ErrorBoundary } from '../../../../shared/ErrorBoundary.jsx'
import { TeilkulturTeilzaehlung as Teilzaehlungen } from './Teilzaehlungen.jsx'
import { constants } from '../../../../../utils/constants.js'

const TitleRow = styled.div`
  background-color: rgba(248, 243, 254, 1);
  flex-shrink: 0;
  display: flex;
  height: ${constants.titleRowHeight}px;
  justify-content: space-between;
  margin-left: -10px;
  margin-right: -10px;
  ${(props) => !props['data-has-data'] && 'margin-bottom: 10px;'}
  padding: 0 10px;
  user-select: none;
  position: sticky;
  top: 0;
  z-index: 1;
`
const Title = styled.div`
  font-weight: bold;
  margin-top: auto;
  margin-bottom: auto;
`
const Rows = styled.div``

export const TeilkulturZaehlungen = observer(({ teilkultur }) => {
  const store = useContext(MobxStoreContext)
  const { db } = store

  const [teilzaehlungs, setTeilzaehlungs] = useState([])
  useEffect(() => {
    const teilzaehlungsObservable = db
      .get('teilzaehlung')
      .query(
        Q.where('_deleted', false),
        Q.on('zaehlung', Q.where('kultur_id', teilkultur.kultur_id)),
      )
      .observeWithColumns(['datum', 'beschreibung', 'geplant'])
    const subscription = teilzaehlungsObservable.subscribe(
      async (teilzaehlungs) => {
        const teilzaehlungsSorted =
          await teilzaehlungsSortByZaehlungTk(teilzaehlungs)
        setTeilzaehlungs(teilzaehlungsSorted)
      },
    )

    return () => subscription?.unsubscribe?.()
  }, [db, teilkultur.kultur_id, teilkultur.zaehlung])

  return (
    <ErrorBoundary>
      <TitleRow data-has-data={!!teilzaehlungs.length}>
        <Title>Zählungen</Title>
      </TitleRow>
      <Rows>
        {teilzaehlungs.map((tz, i) => (
          <Teilzaehlungen
            key={tz.id}
            tz={tz}
            last={i === teilzaehlungs.length - 1}
          />
        ))}
      </Rows>
    </ErrorBoundary>
  )
})
