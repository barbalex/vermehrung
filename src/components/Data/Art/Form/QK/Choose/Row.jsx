import { useState, useEffect } from 'react'
import { useAtomValue } from 'jotai'
import Checkbox from '@mui/material/Checkbox'
import { combineLatest, of as $of } from 'rxjs'
import { Q } from '@nozbe/watermelondb'

import { dbAtom, userAtom } from '../../../../../../store/index.js'

import styles from './Row.module.css'

export const Row = ({ qk }) => {
  const db = useAtomValue(dbAtom)
  const user = useAtomValue(userAtom)

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

  const onChange = (event) => {
    const newValue = event.target.checked
      ? [...artQkChoosen, qk.id]
      : artQkChoosen.filter((id) => id !== qk.id)

    userPersonOption.edit({
      field: 'art_qk_choosen',
      value: newValue,
    })
  }

  return (
    <div className={styles.container}>
      <div className={styles.check}>
        <Checkbox checked={checked} onChange={onChange} color="primary" />
      </div>
      <div className={styles.titel}>{qk?.titel}</div>
      {!!qk?.beschreibung && (
        <div className={styles.beschreibung}>{qk?.beschreibung}</div>
      )}
    </div>
  )
}
