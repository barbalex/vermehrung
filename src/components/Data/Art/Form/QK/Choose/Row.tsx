import { useState, useEffect } from 'react'
import { useAtomValue } from 'jotai'
import Checkbox from '@mui/material/Checkbox'
import { combineLatest, of as $of } from 'rxjs'
import { Q } from 'nitromelondb'

import { dbAtom, userAtom } from '../../../../../../store/index.ts'

import styles from './Row.module.css'

export const Row = ({
  qk,
}: {
  qk: import('../../../../../../dbModel.ts').ArtQk | null | undefined
}) => {
  const db = useAtomValue(dbAtom)
  const user = useAtomValue(userAtom)

  const [dataState, setDataState] = useState<{
    userPersonOption:
      | import('../../../../../../dbModel.ts').PersonOption
      | undefined
    artQkChoosen: string[]
  }>({ userPersonOption: undefined, artQkChoosen: [] })
  const { userPersonOption, artQkChoosen } = dataState

  useEffect(() => {
    const userPersonOptionsObservable = user.uid
      ? db
          ?.get<import('../../../../../../dbModel.ts').PersonOption>(
            'person_option',
          )
          .query(Q.on('person', Q.where('account_id', user.uid)))
          .observeWithColumns(['art_qk_choosen'])
      : $of({})
    const combinedObservables = combineLatest([userPersonOptionsObservable])
    const subscription = (
      combinedObservables as unknown as import('rxjs').Observable<
        [
          import('../../../../../../dbModel.ts').PersonOption[] | undefined,
        ]
      >
    ).subscribe(([userPersonOptions]) =>
      setDataState({
        userPersonOption: userPersonOptions?.[0],
        artQkChoosen: userPersonOptions?.[0]?.art_qk_choosen ?? [],
      }),
    )

    return () => subscription?.unsubscribe?.()
  }, [db, user.uid])

  const checked = artQkChoosen.includes(qk?.id ?? '')

  const onChange = (event: {
    target: { name?: string; value: unknown; checked?: boolean }
    currentTarget?: HTMLElement
    preventDefault?: () => void
    stopPropagation?: () => void
    key?: string
  }) => {
    const newValue = event.target.checked
      ? [...artQkChoosen, qk?.id ?? '']
      : artQkChoosen.filter((id) => id !== qk?.id)

    userPersonOption?.edit({
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
