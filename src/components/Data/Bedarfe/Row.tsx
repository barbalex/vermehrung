import {
  store,
  activeNodeArrayAtom,
  setActiveNodeArray,
} from '../../../store/index.ts'
import { bedarfLabelFromBedarf } from '../../../utils/bedarfLabelFromBedarf.ts'

import styles from '../Arten/Row.module.css'

export const BedarfRow = ({
  style,
  index,
  rows
}: {
  style?: Record<string, unknown>
  index?: number
  rows: import('../../../dbModel.ts').Bedarf[]
}) => {
  const row = rows[index ?? 0]

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
