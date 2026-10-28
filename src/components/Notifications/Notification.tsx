import { css } from '@emotion/react'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import { MdClose as CloseIcon } from 'react-icons/md'

import {
  removeNotificationById,
  removeQueuedQueryById,
  updateModelValue,
  updateModelValues,
} from '../../store/index.ts'

import styles from './Notification.module.css'

const colorMap = {
  error: '#D84315',
  success: '#00a300',
  info: '#4a148c',
  warning: 'orange',
}

export const Notification = ({
  notification: n,
}: {
  notification: import('../../store/index.ts').Notification & {
    revertTable?: string
    revertId?: string
    revertField?: string
    revertValue?: unknown
    revertValues?: Record<string, unknown>
  }
}) => {
  const {
    title,
    message,
    info,
    actionLabel,
    actionName,
    actionArgument,
    revertTable,
    revertId,
    revertField,
    revertValue,
    revertValues,
    type,
  } = n

  const color = colorMap[type as keyof typeof colorMap] ?? 'error'

  const onClickClose = () => removeNotificationById(n.id)

  const onClickAction = () => {
    // formerly: store?.[actionName]?.(actionArgument)
    if (actionName === 'removeQueuedQueryById') {
      if (actionArgument) removeQueuedQueryById(actionArgument)
    }
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
          : revertValues) as Record<string, unknown>,
      })
    }
    removeNotificationById(n.id)
  }

  return (
    <div className={styles.container} style={{ backgroundColor: color }}>
      <div className={styles.text}>
        {!!title && <div className={styles.titleClass}>{title}</div>}
        <div className={styles.messageClass}>{message}</div>
        {!!info && <div className={styles.messageClass}>{info}</div>}
      </div>
      {!!actionName && !!actionLabel && (
        <Button
          onClick={onClickAction}
          variant="outlined"
          css={css`
            color: white !important;
            border-color: white !important;
            margin-left: 10px;
            > span {
              text-transform: none;
            }
          `}
        >
          {actionLabel}
        </Button>
      )}
      <IconButton
        key="close"
        aria-label="Close"
        color="inherit"
        onClick={onClickClose}
        title="Diese Meldung schliessen"
        size="small"
        css={css`
          margin-left: 8px !important;
        `}
      >
        <CloseIcon />
      </IconButton>
    </div>
  )
}
