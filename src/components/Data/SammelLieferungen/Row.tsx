import { useEffect, useState } from 'react'
import { first as first$ } from 'rxjs/operators'

import {
  store,
  activeNodeArrayAtom,
  setActiveNodeArray,
} from '../../../store/index.ts'

import styles from '../Arten/Row.module.css'

export const SammelLieferungRow = ({
  style,
  index,
  rows
}: {
  style?: Record<string, unknown>
  index?: number
  rows: import('../../../dbModel.ts').SammelLieferung[]
}) => {
  const row = rows[index ?? 0]

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
      .then((label: unknown) => {
        if (!isActive) return

        setLabel((label as string | undefined) ?? '')
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
