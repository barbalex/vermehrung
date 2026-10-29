import { useState, useEffect } from 'react'
import { useAtomValue } from 'jotai'
import { first as first$ } from 'rxjs/operators'

import {
  store,
  herkunftIdInActiveNodeArrayAtom,
  activeNodeArrayAtom,
  setActiveNodeArray,
} from '../../../store/index.ts'

import styles from '../Arten/Row.module.css'

export const SammlungRow = ({
  style,
  index,
  rows
}: {
  style?: Record<string, unknown>
  index?: number
  rows: import('../../../dbModel.ts').Sammlung[]
}) => {
  const herkunftIdInActiveNodeArray = useAtomValue(
    herkunftIdInActiveNodeArrayAtom,
  )

  const row = rows[index ?? 0]

  const [label, setLabel] = useState('')
  useEffect(() => {
    let isActive = true
    const labelObservable = herkunftIdInActiveNodeArray
      ? row.labelUnderHerkunft
      : row.label
    labelObservable
      .pipe(first$())
      .toPromise()
      .then((label: unknown) => {
        if (!isActive) return

        setLabel((label as string | undefined) ?? '')
      })

    return () => {
      isActive = false
    }
  }, [herkunftIdInActiveNodeArray, row])

  const onClickRow = () => {
    const activeNodeArray = store.get(activeNodeArrayAtom)
    setActiveNodeArray([...activeNodeArray, row.id])
  }

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
