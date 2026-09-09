import { useState, useEffect } from 'react'
import { useAtomValue } from 'jotai'
import Checkbox from '@mui/material/Checkbox'
import { combineLatest, of as $of } from 'rxjs'
import { Q } from '@nozbe/watermelondb'

import { userAtom, dbAtom } from '../../../../../../store/index.js'
import styles from './Row.module.css'

export const ChooseKulturQkRow = ({ qk }) => {
  const user = useAtomValue(userAtom)
  const db = useAtomValue(dbAtom)

  const [dataState, setDataState] = useState({
    userPersonOption: undefined,
    kulturQkChoosen: [],
  })
  const { userPersonOption, kulturQkChoosen } = dataState

  useEffect(() => {
    const userPersonOptionsObservable = user.uid
      ? db
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
  }, [db, user])

  const checked = kulturQkChoosen.includes(qk.id)

  const onChange = () => {
    const newValue = event.target.checked
      ? [...kulturQkChoosen, qk.id]
      : kulturQkChoosen.filter((id) => id !== qk.id)

    userPersonOption.edit({
      field: 'kultur_qk_choosen',
      value: newValue,
    })
  }

  if (!kulturQkChoosen) return null

  return (
    <div className={styles.row}>
      <div className={styles.check}>
        <Checkbox checked={checked} onChange={onChange} color="primary" />
      </div>
      <div className={styles.titel}>{qk.titel}</div>
      <div className={styles.beschreibung}>{qk.beschreibung}</div>
    </div>
  )
}
