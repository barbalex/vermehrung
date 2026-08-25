import {
  store,
  activeNodeArrayAtom,
  setActiveNodeArray,
} from '../../../store/index.js'
import { personLabelFromPerson } from '../../../utils/personLabelFromPerson.js'

import styles from '../Arten/Row.module.css'

export const PersonRow = ({ style, index, rows }) => {
  const row = rows[index]

  const onClickRow = () => {
    const activeNodeArray = store.get(activeNodeArrayAtom)
    setActiveNodeArray([...activeNodeArray, row.id])
  }

  return (
    <div
      className={styles.container}
      key={row.id}
      onClick={onClickRow}
      style={{
        ...style,
        color: row?.aktiv === false ? 'rgba(0, 0, 0, 0.35)' : 'inherit',
      }}
    >
      <div>{personLabelFromPerson({ person: row })}</div>
    </div>
  )
}
