import {
  store,
  activeNodeArrayAtom,
  setActiveNodeArray,
} from '../../../store/index.ts'
import { eventLabelFromEvent } from '../../../utils/eventLabelFromEvent.ts'

import styles from '../Arten/Row.module.css'

export const EventRow = ({
  style,
  index,
  rows
}: {
  style: Record<string, unknown>
  index: number
  rows: import('../../../dbModel.ts').Event[]
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
      <div>{eventLabelFromEvent({ event: row })}</div>
    </div>
  )
}
