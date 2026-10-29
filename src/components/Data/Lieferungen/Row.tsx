import {
  store,
  activeNodeArrayAtom,
  setActiveNodeArray,
} from '../../../store/index.ts'
import { lieferungLabelFromLieferung } from '../../../utils/lieferungLabelFromLieferung.ts'

import styles from '../Arten/Row.module.css'

export const LieferungRow = ({
  style,
  index,
  rows
}: {
  style: Record<string, unknown>
  index: number
  rows: import('../../../dbModel.ts').Lieferung[]
}) => {
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
      <div>{lieferungLabelFromLieferung({ lieferung: row })}</div>
    </div>
  )
}
