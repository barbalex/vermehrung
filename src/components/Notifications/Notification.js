import React, { useContext, useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import { MdClose as CloseIcon } from 'react-icons/md'

import { StoreContext } from '../../models/reactUtils'

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
const StyledIconButton = styled(IconButton)`
  margin-left: 8px !important;
`
const StyledButton = styled(Button)`
  color: white !important;
  border-color: white !important;
  > span {
    text-transform: none;
  }
`
// http://hackingui.com/front-end/a-pure-css-solution-for-multiline-text-truncation/
const Message = styled.div`
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
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
    actionLabel,
    actionName,
    actionArgument,
    revertTable,
    revertId,
    revertField,
    revertValue,
    type,
  } = n

  const color = colorMap[type] ?? 'error'

  const onClickClose = useCallback(() => removeNotificationById(n.id), [
    n.id,
    removeNotificationById,
  ])
  const onClickAction = useCallback(() => {
    store?.[actionName]?.(actionArgument ?? undefined)
    if (revertTable && revertId && revertField) {
      store.updateModelValue({
        table: revertTable,
        id: revertId,
        field: revertField,
        value: revertValue,
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
    store,
  ])

  return (
    <Container data-color={color}>
      {!!title && <Title>{`${title}. Fehler-Meldung:`}</Title>}
      <Message>{message}</Message>
      {!!actionName && !!actionLabel && (
        <StyledButton onClick={onClickAction} variant="outlined">
          {actionLabel}
        </StyledButton>
      )}
      <StyledIconButton
        key="close"
        aria-label="Close"
        color="inherit"
        onClick={onClickClose}
        title="Diese Meldung schliessen"
        size="small"
      >
        <CloseIcon />
      </StyledIconButton>
    </Container>
  )
}

export default observer(Notification)
