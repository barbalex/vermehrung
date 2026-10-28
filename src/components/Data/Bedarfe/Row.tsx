import {
  store,
  activeNodeArrayAtom,
  setActiveNodeArray,
} from '../../../store/index.ts'
import { bedarfLabelFromBedarf } from '../../../utils/bedarfLabelFromBedarf.ts'

import styles from '../Arten/Row.module.css'

export const BedarfRow = ({ style, index, rows }) => {
  const row = rows[index]

  const onClickRow = () =>
    setActiveNodeArray([...store.get(activeNodeArrayAtom), row.id])

  return (
    <div
      className={styles.container}
      key={row.id}
      onClick={onClickRow}
      style={style}
    >
      <div>{bedarfLabelFromBedarf({ bedarf: row })}</div>
    </div>
  )
}
