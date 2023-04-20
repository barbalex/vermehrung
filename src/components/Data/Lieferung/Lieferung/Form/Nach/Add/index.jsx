import { useCallback, useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import IconButton from '@mui/material/IconButton'

import styled from '@emotion/styled'

import ErrorBoundary from '../../../../../../shared/ErrorBoundary'
import TypeDialog from './TypeDialog'

const StyledButton = styled(IconButton)`
  margin-bottom: 19px;
`

const Add = ({ saveToDb, disabled }) => {
  const [kulturType, setKulturType] = useState()
  const [typeDialogOpen, setTypeDialogOpen] = useState(false)
  const [gardenDialogOpen, setGardenDialogOpen] = useState(false)

  const onCloseTypeDialog = useCallback(() => setTypeDialogOpen(false), [])
  const onChangeType = useCallback((event) => {
    setKulturType(event.target.value)
    setTypeDialogOpen(false)
    setGardenDialogOpen(true)
  }, [])

  const add = useCallback(() => {
    setTypeDialogOpen(true)
  }, [])

  console.log('Add', { kulturType, gardenDialogOpen })

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
      <TypeDialog
        open={typeDialogOpen}
        onClose={onCloseTypeDialog}
        onChangeType={onChangeType}
      />
    </ErrorBoundary>
  )
}

export default Add
