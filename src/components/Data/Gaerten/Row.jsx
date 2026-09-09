import { useState, useEffect } from 'react'
import { first as first$ } from 'rxjs/operators'

import {
  activeNodeArrayAtom,
  setActiveNodeArray,
  store,
} from '../../../store/index.js'

import styles from '../Arten/Row.module.css'

export const GartenRow = ({ style, index, rows }) => {
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

  const onClickRow = () =>
    setActiveNodeArray([...store.get(activeNodeArrayAtom), row.id])

  return (
    <div
      className={styles.container}
      key={row.id}
      onClick={onClickRow}
      style={{
        ...style,
        color: row?.aktiv === false ? 'rgba(0, 0, 0, 0.35)' : 'inherit',
      }}
    >
      <div>{label}</div>
    </div>
  )
}
