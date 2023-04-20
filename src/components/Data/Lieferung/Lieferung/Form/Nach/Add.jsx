import { useCallback, useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import IconButton from '@mui/material/IconButton'
import styled from '@emotion/styled'

import ErrorBoundary from '../../../../../shared/ErrorBoundary'

const StyledButton = styled(IconButton)`
  margin-bottom: 19px;
`

const Add = ({ saveToDb, disabled }) => {
  const [typeDialogOpen, setTypeDialogOpen] = useState()
  const [gardenDialogOpen, setGardenDialogOpen] = useState()

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
        disabled={disabled}
      >
        <FaPlus />
      </StyledButton>
    </ErrorBoundary>
  )
}

export default Add
