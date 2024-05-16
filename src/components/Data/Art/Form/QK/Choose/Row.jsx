import React, { useCallback, useContext, useState, useEffect } from 'react'
import styled from '@emotion/styled'
import { observer } from 'mobx-react-lite'
import Checkbox from '@mui/material/Checkbox'
import { combineLatest, of as $of } from 'rxjs'
import { Q } from '@nozbe/watermelondb'

import StoreContext from '../../../../../../storeContext.js'

const Row = styled.div`
  display: flex;
  padding: 5px;
  border-bottom: 1px solid #e8e8e8;
  min-height: 52px;
`
const Check = styled.div`
  padding: 0 5px;
`
const Titel = styled.div`
  padding: 0 5px;
  display: flex;
  align-items: center;
`
const Beschreibung = styled.div`
  padding: 0 5px;
  display: flex;
  align-items: center;
`

const ChooseArtQkRow = ({ qk }) => {
  const store = useContext(StoreContext)
  const { user, db } = store

  const [dataState, setDataState] = useState({
    userPersonOption: undefined,
    artQkChoosen: [],
  })
  const { userPersonOption, artQkChoosen } = dataState

  useEffect(() => {
    const userPersonOptionsObservable = user.uid
      ? db
          .get('person_option')
          .query(Q.on('person', Q.where('account_id', user.uid)))
          .observeWithColumns(['art_qk_choosen'])
      : $of({})
    const combinedObservables = combineLatest([userPersonOptionsObservable])
    const subscription = combinedObservables.subscribe(([userPersonOptions]) =>
      setDataState({
        userPersonOption: userPersonOptions?.[0],
        artQkChoosen: userPersonOptions?.[0]?.art_qk_choosen ?? [],
      }),
    )

    return () => subscription?.unsubscribe?.()
  }, [db, user.uid])

  const checked = artQkChoosen.includes(qk.id)

  const onChange = useCallback(
    (event) => {
      const newValue = event.target.checked
        ? [...artQkChoosen, qk.id]
        : artQkChoosen.filter((id) => id !== qk.id)

      userPersonOption.edit({
        field: 'art_qk_choosen',
        value: newValue,
        store,
      })
    },
    [artQkChoosen, qk.id, store, userPersonOption],
  )

  return (
    <Row>
      <Check>
        <Checkbox checked={checked} onChange={onChange} color="primary" />
      </Check>
      <Titel>{qk?.titel}</Titel>
      {!!qk?.beschreibung && <Beschreibung>{qk?.beschreibung}</Beschreibung>}
    </Row>
  )
}

export default observer(ChooseArtQkRow)
