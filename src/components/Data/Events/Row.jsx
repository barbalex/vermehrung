import {
  store,
  activeNodeArrayAtom,
  setActiveNodeArray,
} from '../../../store/index.js'
import { eventLabelFromEvent } from '../../../utils/eventLabelFromEvent.js'

import styles from '../Arten/Row.module.css'

export const EventRow = ({ style, index, rows }) => {
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
      <div>{eventLabelFromEvent({ event: row })}</div>
    </div>
  )
}
