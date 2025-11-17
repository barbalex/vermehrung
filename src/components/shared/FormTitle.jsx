// seems not used
import { useContext } from 'react'
import { observer } from 'mobx-react-lite'

import { MobxStoreContext } from '../../mobxStoreContext.js'

import {
  container,
  titleClass,
  symbols,
  filterNumbers,
} from './FormTitle.module.css'

export const FormTitle = observer(
  ({ title, table, rowsLength, rowsFilteredLength, filter }) => {
    const store = useContext(StoreContext)
    const { filtered, show } = store.filter

    const titleText = filter ? `${title} Filter` : title

    return (
      <div className={container}>
        <div className={titleClass}>{titleText}</div>
        {table && (
          <div className={symbols}>
            {(show || filtered) && (
              <div
                className={filterNumbers}
                title="Anzahl gefiltert/total"
              >{`${rowsFilteredLength}/${rowsLength}`}</div>
            )}
          </div>
        )}
      </div>
    )
  },
)
