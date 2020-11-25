import React from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import localForage from 'localforage'

const onReset = () => {
  if (typeof window !== 'undefined') {
    window.location.reload(true)
    localForage.clear()
  }
}

const ErrorFallback = ({ error }) => {
  // ISSUE:
  // watermelondb throws error when record not found
  // this can happen when data is loaded first time and url is direct link to a dataset
  console.log('ErrorBoundary', error.message)

  return null
}

const MyErrorBoundary = ({ children }) => (
  <ErrorBoundary FallbackComponent={ErrorFallback} onReset={onReset}>
    {children}
  </ErrorBoundary>
)

export default MyErrorBoundary
