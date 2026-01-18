// seems not used
import { useContext } from 'react'
import { observer } from 'mobx-react-lite'

import { MobxStoreContext } from '../../mobxStoreContext.js'

import styles from './FormTitle.module.css'

export const FormTitle = observer(
  ({ title, table, rowsLength, rowsFilteredLength, filter }) => {
    const store = useContext(StoreContext)
    const { filtered, show } = store.filter

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
  },
)
