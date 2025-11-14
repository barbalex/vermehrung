import { useContext, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { first as first$ } from 'rxjs/operators'

import { MobxStoreContext } from '../../../mobxStoreContext.js'

import { container } from '../Arten/Row.module.css'

export const SammelLieferungRow = observer(({ style, index, rows }) => {
  const store = useContext(MobxStoreContext)
  const { activeNodeArray, setActiveNodeArray } = store.tree

  const row = rows[index]

  const onClickRow = () => setActiveNodeArray([...activeNodeArray, row.id])

  const [label, setLabel] = useState('')
  useEffect(() => {
    let isActive = true
    row.label
      .pipe(first$())
      .toPromise()
      .then((label) => {
        if (!isActive) return

        setLabel(label)
      })

    return () => {
      isActive = false
    }
  }, [row.label])

  return (
    <div
      className={container}
      key={row.id}
      onClick={onClickRow}
      style={style}
    >
      <div>{label}</div>
    </div>
  )
})
