import {
  store,
  activeNodeArrayAtom,
  setActiveNodeArray,
} from '../../../store/index.ts'
import { teilkulturLabelFromTeilkultur } from '../../../utils/teilkulturLabelFromTeilkultur.ts'

import styles from '../Arten/Row.module.css'

export const TeilkulturRow = ({ style, index, rows }) => {
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
      <div>{teilkulturLabelFromTeilkultur({ teilkultur: row })}</div>
    </div>
  )
}
