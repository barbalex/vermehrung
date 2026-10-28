import { DateTime } from 'luxon'
import { FaUndoAlt } from 'react-icons/fa'
import IconButton from '@mui/material/IconButton'

import {
  removeQueuedQueryById,
  updateModelValue,
  updateModelValues,
} from '../../store/index.ts'

import styles from './QueuedQuery.module.css'

const valFromValue = (value: unknown): string => {
  if (value === true) return 'wahr'
  if (value === false) return 'falsch'
  return String(value ?? '(leer)')
}

export const QueuedQuery = ({
  qq,
  index,
}: {
  qq: import('../../store/index.ts').QueuedQuery
  index: number
}) => {
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
      updateModelValue({
        table: revertTable as import('../../store/index.ts').TableName,
        id: revertId as string,
        field: revertField as string,
        value: revertValue,
      })
    } else if (revertTable && revertId && revertValues) {
      updateModelValues({
        table: revertTable as import('../../store/index.ts').TableName,
        id: revertId as string,
        values: (typeof revertValues === 'string'
          ? JSON.parse(revertValues)
          : (revertValues ?? {})) as Record<string, unknown>,
      })
    }
    removeQueuedQueryById(id)
  }

  const valueStyle =
    index === 0
      ? {
          borderTop: '1px solid rgba(74,20,140,0.1)',
        }
      : {}

  return (
    <>
      <div
        className={styles.value}
        style={valueStyle}
      >{`${DateTime.fromMillis(time).toFormat('yyyy.LL.dd HH.mm.ss')}`}</div>
      <div className={styles.value} style={valueStyle}>
        {String(revertTable ?? '')}
      </div>
      <div className={styles.value} style={valueStyle}>
        {String(revertId ?? '')}
      </div>
      <div className={styles.value} style={valueStyle}>
        {isInsert ? 'neuer Datensatz' : String(revertField ?? '')}
      </div>
      <div className={styles.value} style={valueStyle}>
        {isInsert
          ? ''
          : revertField
            ? valFromValue(revertValue)
            : JSON.stringify(revertValues ?? {}, null, 2)}
      </div>
      <div className={styles.value} style={valueStyle}>
        {isInsert
          ? ''
          : revertField
            ? valFromValue(newValue)
            : String(newValue ?? '')}
      </div>
      <div className={styles.icon} style={valueStyle}>
        <IconButton
          title="widerrufen"
          aria-label="widerrufen"
          onClick={onClickRevert}
          size="small"
          className={styles.revertButton}
        >
          <FaUndoAlt />
        </IconButton>
      </div>
    </>
  )
}
