import { useEffect, useState } from 'react'
import { first as first$ } from 'rxjs/operators'

import {
  store,
  activeNodeArrayAtom,
  setActiveNodeArray,
} from '../../../store/index.js'

import styles from '../Arten/Row.module.css'

export const SammelLieferungRow = ({ style, index, rows }) => {
  const row = rows[index]

  const onClickRow = () => {
    const activeNodeArray = store.get(activeNodeArrayAtom)
    setActiveNodeArray([...activeNodeArray, row.id])
  }

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
      className={styles.container}
      key={row.id}
      onClick={onClickRow}
      style={style}
    >
      <div>{label}</div>
    </div>
  )
}
