import { useContext, useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import Checkbox from '@mui/material/Checkbox'
import { combineLatest, of as $of } from 'rxjs'
import { Q } from '@nozbe/watermelondb'

import { MobxStoreContext } from '../../../../../../mobxStoreContext.js'
import { row, check, titel, beschreibung } from './Row.module.css'

export const ChooseKulturQkRow = observer(({ qk }) => {
  const store = useContext(MobxStoreContext)
  const { user, db } = store

  const [dataState, setDataState] = useState({
    userPersonOption: undefined,
    kulturQkChoosen: [],
  })
  const { userPersonOption, kulturQkChoosen } = dataState

  useEffect(() => {
    const userPersonOptionsObservable =
      user.uid ?
        db
          .get('person_option')
          .query(Q.on('person', Q.where('account_id', user.uid)))
          .observeWithColumns(['kultur_qk_choosen'])
      : $of({})
    const combinedObservables = combineLatest([userPersonOptionsObservable])
    const subscription = combinedObservables.subscribe(([userPersonOptions]) =>
      setDataState({
        userPersonOption: userPersonOptions?.[0],
        kulturQkChoosen: userPersonOptions?.[0]?.kultur_qk_choosen ?? [],
      }),
    )

    return () => subscription?.unsubscribe?.()
  }, [db, user.uid])

  const checked = kulturQkChoosen.includes(qk.id)

  const onChange = () => {
    const newValue =
      event.target.checked ?
        [...kulturQkChoosen, qk.id]
      : kulturQkChoosen.filter((id) => id !== qk.id)

    userPersonOption.edit({
      field: 'kultur_qk_choosen',
      value: newValue,
      store,
    })
  }

  if (!kulturQkChoosen) return null

  return (
    <div className={row}>
      <div className={check}>
        <Checkbox
          checked={checked}
          onChange={onChange}
          color="primary"
        />
      </div>
      <div className={titel}>{qk.titel}</div>
      <div className={beschreibung}>{qk.beschreibung}</div>
    </div>
  )
})
