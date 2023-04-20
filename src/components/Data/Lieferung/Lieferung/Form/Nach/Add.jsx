import { useCallback } from 'react'
import { FaPlus } from 'react-icons/fa'
import IconButton from '@mui/material/IconButton'

import ErrorBoundary from '../../../../../shared/ErrorBoundary'

const Add = () => {
  const add = useCallback(() => {
    console.log('TODO:')
  }, [])

  return (
    <ErrorBoundary>
      <IconButton
        aria-label="neue Kultur in bestehendem Garten anlegen"
        title="neue Kultur in bestehendem Garten anlegen"
        onClick={add}
        size="large"
      >
        <FaPlus />
      </IconButton>
    </ErrorBoundary>
  )
}

export default Add
