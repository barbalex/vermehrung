import React, { useContext } from 'react'
import Button from '@material-ui/core/Button'
import styled from 'styled-components'

import ErrorBoundary from './shared/ErrorBoundary'
import { StoreContext } from '../models/reactUtils'

const QueuedQuery = ({ qq }) => {
  const store = useContext(StoreContext)
  const {
    id,
    time,
    name,
    variables,
    callbackQuery,
    callbackQueryVariables,
    revertTable,
    revertId,
    revertField,
    revertValue,
    revertValues,
  } = qq

  return <ErrorBoundary></ErrorBoundary>
}

export default QueuedQuery
