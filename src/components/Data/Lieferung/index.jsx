import { useContext, useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { Allotment } from 'allotment'
import isUuid from 'is-uuid'
import { combineLatest, of as $of } from 'rxjs'
import { Q } from '@nozbe/watermelondb'

import { Lieferung } from './Lieferung/index.jsx'
import { SammelLieferung } from '../SammelLieferung/index.jsx'
import { MobxStoreContext } from '../../../mobxStoreContext.js'

export const LieferungContainer = observer(
  ({ filter: showFilter = false, id: idPassed }) => {
    const store = useContext(MobxStoreContext)
    const { filter, db, user, initialDataQueried } = store
    const { activeNodeArray } = store.tree
    let id = idPassed
    if (!idPassed) {
      id =
        showFilter ?
          '99999999-9999-9999-9999-999999999999'
        : activeNodeArray.filter((e) => isUuid.v1(e)).at(-1)
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
      const userPersonOptionsObservable =
        user.uid ?
          db
            .get('person_option')
            .query(Q.on('person', Q.where('account_id', user.uid)))
            .observeWithColumns(['li_show_sl'])
        : $of({})
      const lieferungObservable =
        showFilter ? $of(filter.lieferung)
        : initialDataQueried ? db.get('lieferung').findAndObserve(id)
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
      filter.lieferung,
      id,
      initialDataQueried,
      row?.sammel_lieferung,
      showFilter,
      user,
    ])

    if (row?.sammel_lieferung_id && li_show_sl) {
      // this lieferung is part of a sammel_lieferung
      // show that too
      return (
        <Allotment vertical>
          <Lieferung
            showFilter={showFilter}
            row={row}
            rawRow={rawRow}
            id={id}
          />
          <SammelLieferung
            showFilter={showFilter}
            id={row?.sammel_lieferung_id}
            lieferung={row}
          />
        </Allotment>
      )
    }

    return (
      <Lieferung
        id={id}
        row={row}
        rawRow={rawRow}
        showFilter={showFilter}
      />
    )
  },
)
