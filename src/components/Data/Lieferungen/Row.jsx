import {
  store,
  activeNodeArrayAtom,
  setActiveNodeArray,
} from '../../../store/index.js'
import { lieferungLabelFromLieferung } from '../../../utils/lieferungLabelFromLieferung.js'

import styles from '../Arten/Row.module.css'

export const LieferungRow = ({ style, index, rows }) => {
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
