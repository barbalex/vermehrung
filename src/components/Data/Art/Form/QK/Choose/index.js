import React, { useContext, useState, useEffect } from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react-lite'
import sortBy from 'lodash/sortBy'
import { combineLatest, of as $of } from 'rxjs'
import { Q } from '@nozbe/watermelondb'

import RowComponent from './Row'
import StoreContext from '../../../../../../storeContext'
import ErrorBoundary from '../../../../../shared/ErrorBoundary'
import notDeletedQuery from '../../../../../../utils/notDeletedQuery'

const Container = styled.div`
  display: flex;
  flex-direction: column;
`
const FieldsContainer = styled.div`
  padding: 10px 0;
`

const ChooseQk = () => {
  const store = useContext(StoreContext)
  const { db, user } = store

  const [dataState, setDataState] = useState({ artQks: [], userPersonOption })
  useEffect(() => {
    const userPersonOptionsObservable = user.uid
      ? db
          .get('person_option')
          .query(Q.on('person', Q.where('account_id', user.uid)))
          .observeWithColumns(['ku_zwischenlager', 'ku_erhaltungskultur'])
      : $of({})
    const artQksObservable = db
      .get('art_qk')
      .query(notDeletedQuery)
      .observeWithColumns(['name'])
    const combinedObservables = combineLatest([
      userPersonOptionsObservable,
      artQksObservable,
    ])
    const subscription = combinedObservables.subscribe(
      ([userPersonOptions, artQks]) =>
        setDataState({
          artQks: sortBy(artQks, 'name'),
          userPersonOption: userPersonOptions?.[0],
        }),
    )

    return () => subscription.unsubscribe()
  }, [db, user.uid])
  const { artQks, userPersonOption } = dataState

  console.log('ArtQk choose', {
    artQks,
    userPersonOption,
  })

  return (
    <ErrorBoundary>
      <Container>
        <FieldsContainer>
          {artQks.map((row) => (
            <RowComponent
              key={row.id}
              qk={row}
              userPersonOption={userPersonOption}
            />
          ))}
        </FieldsContainer>
      </Container>
    </ErrorBoundary>
  )
}

export default observer(ChooseQk)
