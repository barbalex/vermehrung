import { useContext } from 'react'
import { observer } from 'mobx-react-lite'

import { MobxStoreContext } from '../../../mobxStoreContext.js'
import { teilkulturLabelFromTeilkultur } from '../../../utils/teilkulturLabelFromTeilkultur.js'

import { container } from '../Arten/Row.module.css'

export const TeilkulturRow = observer(({ style, index, rows }) => {
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
      <div>{teilkulturLabelFromTeilkultur({ teilkultur: row })}</div>
    </div>
  )
})
