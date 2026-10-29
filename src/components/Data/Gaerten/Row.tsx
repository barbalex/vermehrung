import { useState, useEffect } from 'react'
import { first as first$ } from 'rxjs/operators'

import {
  activeNodeArrayAtom,
  setActiveNodeArray,
  store,
} from '../../../store/index.ts'

import styles from '../Arten/Row.module.css'

export const GartenRow = ({
  style,
  index,
  rows
}: {
  style?: Record<string, unknown>
  index?: number
  rows: import('../../../dbModel.ts').Garten[]
}) => {
  const row = rows[index ?? 0]

  const [label, setLabel] = useState('')
  useEffect(() => {
    let isActive = true
    row.label
      .pipe(first$())
      .toPromise()
      .then((label: unknown) => {
        if (!isActive) return

        setLabel((label as string | undefined) ?? '')
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
