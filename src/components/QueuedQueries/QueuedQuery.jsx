import { useContext } from 'react'
import { DateTime } from 'luxon'
import { observer } from 'mobx-react-lite'
import { FaUndoAlt } from 'react-icons/fa'
import IconButton from '@mui/material/IconButton'

import { MobxStoreContext } from '../../mobxStoreContext.js'

import { value, icon, revertButton } from './QueuedQuery.module.css'

const valFromValue = (value) => {
  if (value === true) return 'wahr'
  if (value === false) return 'falsch'
  return value ?? '(leer)'
}

export const QueuedQuery = observer(({ qq, index }) => {
  const store = useContext(MobxStoreContext)
  const { removeQueuedQueryById } = store
  const {
    id,
    time,
    revertTable,
    revertId,
    revertField,
    revertValue,
    revertValues,
    newValue,
    isInsert,
  } = qq

  const onClickRevert = () => {
    if (revertTable && revertId && revertField) {
      store.updateModelValue({
        table: revertTable,
        id: revertId,
        field: revertField,
        value: revertValue,
      })
    } else if (revertTable && revertId && revertValues) {
      store.updateModelValues({
        table: revertTable,
        id: revertId,
        values: JSON.parse(revertValues),
      })
    }
    removeQueuedQueryById(id)
  }

  const valueStyle =
    index === 0 ?
      {
        borderTop: '1px solid rgba(74,20,140,0.1)',
      }
    : {}

  return (
    <>
      <div
        className={value}
        style={valueStyle}
      >{`${DateTime.fromMillis(time).toFormat('yyyy.LL.dd HH.mm.ss')}`}</div>
      <div
        className={value}
        style={valueStyle}
      >
        {revertTable}
      </div>
      <div
        className={value}
        style={valueStyle}
      >
        {revertId}
      </div>
      <div
        className={value}
        style={valueStyle}
      >
        {isInsert ? 'neuer Datensatz' : revertField}
      </div>
      <div
        className={value}
        style={valueStyle}
      >
        {isInsert ?
          ''
        : revertField ?
          valFromValue(revertValue)
        : JSON.parse(revertValues)}
      </div>
      <div
        className={value}
        style={valueStyle}
      >
        {isInsert ?
          ''
        : revertField ?
          valFromValue(newValue)
        : JSON.parse(newValue)}
      </div>
      <div
        className={icon}
        style={valueStyle}
      >
        <IconButton
          title="widerrufen"
          aria-label="widerrufen"
          onClick={onClickRevert}
          size="small"
          className={revertButton}
        >
          <FaUndoAlt />
        </IconButton>
      </div>
    </>
  )
})
