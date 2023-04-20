import { useCallback, useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import IconButton from '@mui/material/IconButton'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'

import styled from '@emotion/styled'

import ErrorBoundary from '../../../../../shared/ErrorBoundary'

const StyledButton = styled(IconButton)`
  margin-bottom: 19px;
`

const TypeDialog = ({ open, onClose, onChangeType }) => (
  <Dialog open={open} onClose={onClose}>
    <DialogTitle>Typ der Kultur wählen:</DialogTitle>
    <DialogContent>
      <FormControl>
        <RadioGroup name="type_waehlen" onChange={onChangeType}>
          <FormControlLabel
            value="zwischenlager"
            control={<Radio />}
            label="Zwischenlager"
          />
          <FormControlLabel
            value="anders"
            control={<Radio />}
            label="Andere Kultur"
          />
        </RadioGroup>
      </FormControl>
    </DialogContent>
  </Dialog>
)

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
