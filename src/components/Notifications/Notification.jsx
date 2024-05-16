import React, { useContext, useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import styled from '@emotion/styled'
import { css } from '@emotion/react'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import { MdClose as CloseIcon } from 'react-icons/md'

import StoreContext from '../../storeContext.js'

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  margin: 5px;
  padding: 10px;
  border-radius: 3px;
  background-color: ${(props) => props['data-color']};
  color: white;
  font-weight: 500;
  min-height: 18px;
  max-width: calc(100% - 10px);
  word-wrap: break-word;
`
const TextContainer = styled.div``

// http://hackingui.com/front-end/a-pure-css-solution-for-multiline-text-truncation/
const Message = styled.div`
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  font-weight: 400;
  font-size: small;
`
const Title = styled.div`
  font-weight: 500;
`

const colorMap = {
  error: '#D84315',
  success: '#00a300',
  info: '#4a148c',
  warning: 'orange',
}

const Notification = ({ notification: n }) => {
  const store = useContext(StoreContext)
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

  const onClickClose = useCallback(
    () => removeNotificationById(n.id),
    [n.id, removeNotificationById],
  )
  const onClickAction = useCallback(() => {
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
  }, [
    actionArgument,
    actionName,
    n.id,
    removeNotificationById,
    revertField,
    revertId,
    revertTable,
    revertValue,
    revertValues,
    store,
  ])

  return (
    <Container data-color={color}>
      <TextContainer>
        {!!title && <Title>{title}</Title>}
        <Message>{message}</Message>
        {!!info && <Message>{info}</Message>}
      </TextContainer>
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
    </Container>
  )
}

export default observer(Notification)
