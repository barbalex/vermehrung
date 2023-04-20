import { useCallback, useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import IconButton from '@mui/material/IconButton'

import styled from '@emotion/styled'

import ErrorBoundary from '../../../../../../shared/ErrorBoundary'
import TypeDialog from './TypeDialog'
import ChooseDialog from './ChooseDialog'

const StyledButton = styled(IconButton)`
  margin-bottom: 19px;
`

const Add = ({ saveToDb, disabled, lieferung, herkunft }) => {
  const [kulturType, setKulturType] = useState()
  const [typeDialogOpen, setTypeDialogOpen] = useState(false)
  const [gardenDialogOpen, setGardenDialogOpen] = useState(false)

  const onCloseTypeDialog = useCallback(() => setTypeDialogOpen(false), [])
  const onCloseGardenDialog = useCallback(() => setGardenDialogOpen(false), [])
  const onChangeType = useCallback((event) => {
    setKulturType(event.target.value)
    setTypeDialogOpen(false)
    setGardenDialogOpen(true)
  }, [])
  const onChangeGarden = useCallback((option) => {
    const gartenId = option.value
    setGardenDialogOpen(false)
    console.log('Add: onChangeGarden', { gartenId, option })
    // TODO: erstellt die Kultur (mit: Art, Herkunft, aktiv = ja und Zwischenlager wie gewählt)
    // TODO: setzt die nach-Kultur
  }, [])

  const add = useCallback(() => {
    setTypeDialogOpen(true)
  }, [])

  console.log('Add', { kulturType, gardenDialogOpen })

  return (
    <ErrorBoundary>
      <StyledButton
        aria-label="in neue Kultur in bestehendem Garten liefern"
        title="in neue Kultur in bestehendem Garten liefern"
        onClick={add}
        size="large"
        disabled={disabled}
      >
        <FaPlus />
      </StyledButton>
      <TypeDialog
        open={typeDialogOpen}
        onClose={onCloseTypeDialog}
        onChange={onChangeType}
      />
      {/* only show when needed to not query unneeded data */}
      {!!herkunft && !!lieferung.art_id && gardenDialogOpen && (
        <ChooseDialog
          open={gardenDialogOpen}
          onClose={onCloseGardenDialog}
          onChange={onChangeGarden}
          kulturType={kulturType}
          lieferung={lieferung}
          herkunft={herkunft}
        />
      )}
    </ErrorBoundary>
  )
}

export default Add
