import { useContext, useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { first as first$ } from 'rxjs/operators'

import { MobxStoreContext } from '../../../mobxStoreContext.js'

import { container } from './Row.module.css'

export const ArtRow = observer(({ style, index, rows }) => {
  const store = useContext(MobxStoreContext)
  const { activeNodeArray, setActiveNodeArray } = store.tree

  const row = rows[index]

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
  }, [row])

  const onClickRow = () => setActiveNodeArray([...activeNodeArray, row.id])

  return (
    <div
      key={row.id}
      onClick={onClickRow}
      style={style}
      className={container}
    >
      <div>{label}</div>
    </div>
  )
})
