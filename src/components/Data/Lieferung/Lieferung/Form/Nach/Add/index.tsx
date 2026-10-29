import { useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import IconButton from '@mui/material/IconButton'
import { v7 as uuidv7 } from 'uuid'

import { ErrorBoundary } from '../../../../../../shared/ErrorBoundary.tsx'
import { insertKulturRev } from '../../../../../../../modules/insertRev.ts'
import { LieferungAddTypeDialog as TypeDialog } from './TypeDialog.tsx'
import { LieferungAddChooseDialog as ChooseDialog } from './ChooseDialog.tsx'

import styles from './index.module.css'

export const LieferungAdd = ({
  disabled,
  lieferung,
  herkunft,
}: {
  disabled?: boolean
  lieferung: import('../../../../../../../dbModel.ts').Lieferung
  herkunft:
    | import('../../../../../../../dbModel.ts').Herkunft
    | null
    | undefined
}) => {
  const [kulturType, setKulturType] = useState<string | undefined>(undefined)
  const [typeDialogOpen, setTypeDialogOpen] = useState(false)
  const [gardenDialogOpen, setGardenDialogOpen] = useState(false)

  const onCloseTypeDialog = () => setTypeDialogOpen(false)
  const onCloseGardenDialog = () => setGardenDialogOpen(false)

  const onChangeType = (event: {
    target: { name?: string; value: unknown }
    currentTarget?: HTMLElement
    preventDefault?: () => void
    stopPropagation?: () => void
    key?: string
  }) => {
    setKulturType(event.target.value as string | undefined)
    setTypeDialogOpen(false)
    setGardenDialogOpen(true)
  }

  const onChangeGarden = async (option: { value: string }) => {
    const gartenId = option.value
    setGardenDialogOpen(false)
    // erstellt die Kultur (mit: Art, Herkunft, aktiv = ja, Zwischenlager wie gewählt)
    const id = uuidv7()
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
      await lieferung.edit({ field: 'nach_kultur_id', value: id })
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
          onChange={
            onChangeGarden as unknown as (
              option: unknown,
              actionMeta: unknown,
            ) => void
          }
          kulturType={kulturType}
          lieferung={lieferung}
          herkunft={herkunft}
        />
      )}
    </ErrorBoundary>
  )
}
