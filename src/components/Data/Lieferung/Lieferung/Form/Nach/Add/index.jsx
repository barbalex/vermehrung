import { useCallback, useState, useContext } from 'react'
import { FaPlus } from 'react-icons/fa'
import IconButton from '@mui/material/IconButton'
import { v1 as uuidv1 } from 'uuid'
import { observer } from 'mobx-react-lite'

import styled from '@emotion/styled'

import ErrorBoundary from '../../../../../../shared/ErrorBoundary.jsx'
import storeContext from '../../../../../../../storeContext'
import TypeDialog from './TypeDialog'
import ChooseDialog from './ChooseDialog'

const StyledButton = styled(IconButton)`
  margin-bottom: 19px;
`

const Add = ({ disabled, lieferung, herkunft }) => {
  const store = useContext(storeContext)
  const { insertKulturRev } = store

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
  const onChangeGarden = useCallback(
    async (option) => {
      const gartenId = option.value
      setGardenDialogOpen(false)
      // erstellt die Kultur (mit: Art, Herkunft, aktiv = ja, Zwischenlager wie gewählt)
      const id = uuidv1()
      await insertKulturRev({
        values: {
          kultur_id: id,
          art_id: lieferung.art_id,
          garten_id: gartenId,
          zwischenlager: kulturType === 'zwischenlager',
          herkunft_id: herkunft?.id,
        },
        nonavigate: true,
      })
      setTimeout(async () => {
        // setzt die nach-Kultur
        await lieferung.edit({ field: 'nach_kultur_id', value: id, store })
      }, 1000)
    },
    [herkunft?.id, insertKulturRev, kulturType, lieferung, store],
  )

  const add = useCallback(() => {
    setTypeDialogOpen(true)
  }, [])

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

export default observer(Add)
