import { useCallback } from 'react'
import { FaPlus } from 'react-icons/fa'
import IconButton from '@mui/material/IconButton'
import styled from '@emotion/styled'

import ErrorBoundary from '../../../../../shared/ErrorBoundary'

const StyledButton = styled(IconButton)`
  /* height: 48px; */
  margin-bottom: 19px;
`

const Add = () => {
  const add = useCallback(() => {
    console.log('TODO:')
  }, [])

  return (
    <ErrorBoundary>
      <StyledButton
        aria-label="neuer Kultur in bestehendem Garten liefern"
        title="neuer Kultur in bestehendem Garten liefern"
        onClick={add}
        size="large"
      >
        <FaPlus />
      </StyledButton>
    </ErrorBoundary>
  )
}

export default Add
