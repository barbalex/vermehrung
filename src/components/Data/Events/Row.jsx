import { useContext } from 'react'
import { observer } from 'mobx-react-lite'

import { MobxStoreContext } from '../../../mobxStoreContext.js'
import { eventLabelFromEvent } from '../../../utils/eventLabelFromEvent.js'

import { container } from '../Arten/Row.module.css'

export const EventRow = observer(({ style, index, rows }) => {
  const store = useContext(MobxStoreContext)
  const { activeNodeArray, setActiveNodeArray } = store.tree

  const row = rows[index]

  const onClickRow = () => setActiveNodeArray([...activeNodeArray, row.id])

  return (
    <div
      className={container}
      key={row.id}
      onClick={onClickRow}
      style={style}
    >
      <div>{eventLabelFromEvent({ event: row })}</div>
    </div>
  )
})
