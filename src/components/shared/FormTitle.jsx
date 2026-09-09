// seems not used
import { useAtomValue } from 'jotai'

import { filterShowAtom, filterFilteredAtom } from '../../store/index.js'

import styles from './FormTitle.module.css'

export const FormTitle = ({
  title,
  table,
  rowsLength,
  rowsFilteredLength,
  filter,
}) => {
  const filtered = useAtomValue(filterFilteredAtom)
  const show = useAtomValue(filterShowAtom)

  const titleText = filter ? `${title} Filter` : title

  return (
    <div className={styles.container}>
      <div className={styles.titleClass}>{titleText}</div>
      {table && (
        <div className={styles.symbols}>
          {(show || filtered) && (
            <div
              className={styles.filterNumbers}
              title="Anzahl gefiltert/total"
            >{`${rowsFilteredLength}/${rowsLength}`}</div>
          )}
        </div>
      )}
    </div>
  )
}
