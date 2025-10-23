import { useContext, useCallback } from 'react'
import styled from '@emotion/styled'
import { DateTime } from 'luxon'
import { observer } from 'mobx-react-lite'
import { FaUndoAlt } from 'react-icons/fa'
import IconButton from '@mui/material/IconButton'

import { MobxStoreContext } from '../../mobxStoreContext.js'

// to hover and style row, see: https://stackoverflow.com/a/48109479/712005
const Value = styled.div`
  padding: 5px 0;
  &:before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    right: -1000%;
    left: -1000%;
    z-index: 1;
    ${(props) => props.bt && 'border-top: 1px solid rgba(74,20,140,0.1);'}
    border-bottom: 1px solid rgba(74,20,140,0.1);
  }
  &:after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    right: -1px;
    width: 1px;
    z-index: 2;
  }
  &:nth-child(5n + 5)::after {
    bottom: -1px;
    right: 0;
    left: -1000%;
    height: 1px;
    z-index: 3;
    width: auto;
    top: auto;
  }
  &:hover::before {
    background-color: rgba(0, 0, 0, 0.05);
  }
`
const Icon = styled.div`
  justify-self: center;
  padding: 5px 0;
`
const RevertButton = styled(IconButton)`
  z-index: 4;
`

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

  const onClickRevert = useCallback(() => {
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
  }, [
    id,
    removeQueuedQueryById,
    revertField,
    revertId,
    revertTable,
    revertValue,
    revertValues,
    store,
  ])

  return (
    <>
      <Value bt={index === 0}>{`${DateTime.fromMillis(time).toFormat(
        'yyyy.LL.dd HH.mm.ss',
      )}`}</Value>
      <Value bt={index === 0}>{revertTable}</Value>
      <Value bt={index === 0}>{revertId}</Value>
      <Value bt={index === 0}>
        {isInsert ? 'neuer Datensatz' : revertField}
      </Value>
      <Value bt={index === 0}>
        {isInsert ?
          ''
        : revertField ?
          valFromValue(revertValue)
        : JSON.parse(revertValues)}
      </Value>
      <Value bt={index === 0}>
        {isInsert ?
          ''
        : revertField ?
          valFromValue(newValue)
        : JSON.parse(newValue)}
      </Value>
      <Icon bt={index === 0}>
        <RevertButton
          title="widerrufen"
          aria-label="widerrufen"
          onClick={onClickRevert}
          size="small"
        >
          <FaUndoAlt />
        </RevertButton>
      </Icon>
    </>
  )
})
