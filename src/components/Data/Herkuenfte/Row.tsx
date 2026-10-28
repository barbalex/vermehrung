import {
  store,
  activeNodeArrayAtom,
  setActiveNodeArray,
} from '../../../store/index.ts'
import { herkunftLabelFromHerkunft } from '../../../utils/herkunftLabelFromHerkunft.ts'

import styles from '../Arten/Row.module.css'

export const HerkunftRow = ({ style, index, rows }) => {
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
      <div>{herkunftLabelFromHerkunft({ herkunft: row })}</div>
    </div>
  )
}
