import { useState, useEffect } from 'react'
import { useAtomValue } from 'jotai'
import { Allotment } from 'allotment'
import { isId } from '../../../utils/isId.ts'
import { combineLatest, of as $of } from 'rxjs'
import { Q } from '@nozbe/watermelondb'

import {
  dbAtom,
  userAtom,
  activeNodeArrayAtom,
  filterLieferungAtom,
  onlineAtom,
  initialDataQueriedAtom,
} from '../../../store/index.ts'
import { Lieferung } from './Lieferung/index.tsx'
import { SammelLieferung } from '../SammelLieferung/index.tsx'

export const LieferungContainer = ({
  filter: showFilter = false,
  id: idPassed,
}: {
  filter?: boolean
  id?: string | undefined
}) => {
  const db = useAtomValue(dbAtom)
  const user = useAtomValue(userAtom)
  const activeNodeArray = useAtomValue(activeNodeArrayAtom)
  const lieferungFilter = useAtomValue(filterLieferungAtom)
  const online = useAtomValue(onlineAtom)
  const initialDataQueried = useAtomValue(initialDataQueriedAtom)

  let id = idPassed
  if (!idPassed) {
    id = showFilter
      ? '99999999-9999-9999-9999-999999999999'
      : activeNodeArray.filter((e) => isId(e)).at(-1)
  }

  const [dataState, setDataState] = useState({
    row: undefined,
    // need raw row because observable does not provoke rerendering of components
    rawRow: undefined,
    userPersonOption: undefined,
  })

  const { row, rawRow, userPersonOption } = dataState
  const { li_show_sl } = userPersonOption ?? {}

  useEffect(() => {
    const userPersonOptionsObservable = user.uid
      ? db
          ?.get<import('../../../dbModel.ts').PersonOption>('person_option')
          .query(Q.on('person', Q.where('account_id', user.uid)))
          .observeWithColumns(['li_show_sl'])
      : $of({})
    const lieferungObservable = showFilter
      ? $of(lieferungFilter)
      : initialDataQueried || !online
        ? db?.get('lieferung').findAndObserve(id)
        : $of({})
    const combinedObservables = combineLatest([
      userPersonOptionsObservable,
      lieferungObservable,
    ])
    const subscription = combinedObservables.subscribe(
      async ([userPersonOptions, lieferung]) =>
        setDataState({
          row: lieferung,
          rawRow: JSON.stringify(lieferung?._raw ?? lieferung),
          userPersonOption: userPersonOptions?.[0],
        }),
    )

    return () => subscription?.unsubscribe?.()
  }, [
    db,
    lieferungFilter,
    id,
    initialDataQueried,
    online,
    row?.sammel_lieferung,
    showFilter,
    user,
  ])

  if (row?.sammel_lieferung_id && li_show_sl) {
    // this lieferung is part of a sammel_lieferung
    // show that too
    return (
      <Allotment vertical>
        <Lieferung showFilter={showFilter} row={row} rawRow={rawRow} id={id} />
        <SammelLieferung
          showFilter={showFilter}
          id={row?.sammel_lieferung_id}
          lieferung={row}
        />
      </Allotment>
    )
  }

  return <Lieferung id={id} row={row} rawRow={rawRow} showFilter={showFilter} />
}
