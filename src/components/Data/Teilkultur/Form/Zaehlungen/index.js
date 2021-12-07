import React, { useContext, useState, useEffect } from 'react'
import styled from 'styled-components'
import { Q } from '@nozbe/watermelondb'

import StoreContext from '../../../../../storeContext'
import teilzaehlungsSortByZaehlungTk from '../../../../../utils/teilzaehlungsSortByZaehlungTk'
import ErrorBoundary from '../../../../shared/ErrorBoundary'
import Teilzaehlungen from './Teilzaehlungen'
import getConstants from '../../../../../utils/constants'

const constants = getConstants()

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

const TkZaehlungen = ({ teilkultur }) => {
  const store = useContext(StoreContext)
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
        const teilzaehlungsSorted = await teilzaehlungsSortByZaehlungTk(
          teilzaehlungs,
        )
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
}

export default TkZaehlungen
