import { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { css } from '@emotion/react'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import { MdClose as CloseIcon } from 'react-icons/md'

import { MobxStoreContext } from '../../mobxStoreContext.js'

import styles from './Notification.module.css'

const colorMap = {
  error: '#D84315',
  success: '#00a300',
  info: '#4a148c',
  warning: 'orange',
}

export const Notification = observer(({ notification: n }) => {
  const store = useContext(MobxStoreContext)
  const { removeNotificationById } = store
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

  const color = colorMap[type] ?? 'error'

  const onClickClose = () => removeNotificationById(n.id)

  const onClickAction = () => {
    store?.[actionName]?.(actionArgument ?? undefined)
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
    removeNotificationById(n.id)
  }

  return (
    <div
      className={styles.container}
      style={{ backgroundColor: color }}
    >
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
})
