import { useState, useContext } from 'react'
import { FaPlus } from 'react-icons/fa'
import IconButton from '@mui/material/IconButton'
import { v1 as uuidv1 } from 'uuid'
import { observer } from 'mobx-react-lite'

import { ErrorBoundary } from '../../../../../../shared/ErrorBoundary.jsx'
import { MobxStoreContext } from '../../../../../../../mobxStoreContext.js'
import { LieferungAddTypeDialog as TypeDialog } from './TypeDialog.jsx'
import { LieferungAddChooseDialog as ChooseDialog } from './ChooseDialog.jsx'

import styles from './index.module.css'

export const LieferungAdd = observer(({ disabled, lieferung, herkunft }) => {
  const store = useContext(MobxStoreContext)
  const { insertKulturRev } = store

  const [kulturType, setKulturType] = useState()
  const [typeDialogOpen, setTypeDialogOpen] = useState(false)
  const [gardenDialogOpen, setGardenDialogOpen] = useState(false)

  const onCloseTypeDialog = () => setTypeDialogOpen(false)
  const onCloseGardenDialog = () => setGardenDialogOpen(false)

  const onChangeType = (event) => {
    setKulturType(event.target.value)
    setTypeDialogOpen(false)
    setGardenDialogOpen(true)
  }

  const onChangeGarden = async (option) => {
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
  }

  const add = () => setTypeDialogOpen(true)

  return (
    <ErrorBoundary>
      <IconButton
        aria-label="in neue Kultur in bestehendem Garten liefern"
        title="in neue Kultur in bestehendem Garten liefern"
        onClick={add}
        size="large"
        disabled={disabled}
        className={styles.button}
      >
        <FaPlus />
      </IconButton>
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
})
