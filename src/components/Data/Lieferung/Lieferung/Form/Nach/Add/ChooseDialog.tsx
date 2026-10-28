import { useState, useEffect } from 'react'
import { useAtomValue } from 'jotai'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import { first as first$ } from 'rxjs/operators'
import { Q } from '@nozbe/watermelondb'

import { dbAtom, filterGartenAtom } from '../../../../../../../store/index.ts'
import { gartensSortedFromGartens } from '../../../../../../../utils/gartensSortedFromGartens.ts'
import { StyledSelect } from '../../../../../../shared/Select/index.tsx'

export const LieferungAddChooseDialog = ({
  open,
  onClose,
  onChange,
  kulturType,
  lieferung,
  herkunft,
}: {
  open: boolean
  onClose: () => void
  onChange: (event: unknown) => void
  kulturType: string
  lieferung:
    import('../../../../../../shared/types.ts').WmRow | null | undefined
  herkunft: import('../../../../../../shared/types.ts').WmRow | null | undefined
}) => {
  const db = useAtomValue(dbAtom)
  const gartenFilter = useAtomValue(filterGartenAtom)

  const [gartens, setGartens] = useState([])

  useEffect(() => {
    const gartenDelQuery =
      gartenFilter._deleted === false
        ? Q.where('_deleted', false)
        : gartenFilter._deleted === true
          ? Q.where('_deleted', true)
          : Q.or(
              Q.where('_deleted', false),
              Q.where('_deleted', true),
              Q.where('_deleted', null),
            )
    const gartenAktivQuery =
      gartenFilter.aktiv === false
        ? Q.where('aktiv', false)
        : gartenFilter.aktiv === true
          ? Q.where('aktiv', true)
          : Q.or(
              Q.where('aktiv', false),
              Q.where('aktiv', true),
              Q.where('aktiv', null),
            )
    const gartensObservable = db
      ?.get<import('../../../../../../../dbModel.ts').Garten>('garten')
      .query(gartenDelQuery, gartenAktivQuery)
      .observe()
    const subscription = gartensObservable?.subscribe(async (gartens) => {
      // Zur Auswahl stehen Gärten, die noch nicht eine aktive Kultur dieser Art mit dieser Herkunft haben,
      // das je nach Wahl Zwischenlager ist oder nicht
      const gartensFiltered = []
      for (const garten of gartens) {
        const kulturs = await garten.kulturs.fetch()
        if (
          !kulturs.some(
            (k: import('../../../../../../../dbModel.ts').Kultur) =>
              k.art_id === lieferung?.art_id &&
              k.herkunft_id === herkunft?.id &&
              k.zwischenlager === (kulturType === 'zwischenlager'),
          )
        ) {
          gartensFiltered.push(garten)
        }
      }
      const gartensSorted = await gartensSortedFromGartens(gartensFiltered)
      const gartenWerte = await Promise.all(
        gartensSorted.map(async (garten) => {
          let label
          try {
            label = await garten.label.pipe(first$()).toPromise()
          } catch {}

          return {
            value: garten.id,
            label,
            inaktiv: garten.aktiv === false,
            link: ['Gaerten', garten.id],
          }
        }),
      )
      setGartens(gartenWerte)

      return () => subscription?.unsubscribe?.()
    })
  }, [
    db,
    gartenFilter._deleted,
    gartenFilter.aktiv,
    herkunft?.id,
    kulturType,
    lieferung?.art_id,
  ])

  console.log('ChooseDialog: gartens:', gartens)

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Garten wählen:</DialogTitle>
      <DialogContent>
        <StyledSelect
          options={gartens}
          onChange={onChange}
          hideSelectedOptions
          placeholder=""
          isClearable={true}
          isSearchable
          noOptionsMessage={() => '(keine)'}
          classNamePrefix="react-select"
          nocaret={false}
          // using portal because sticky headers would otherwise cover the dropdown
          styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
          menuPortalTarget={document.getElementById('root')}
        />
      </DialogContent>
    </Dialog>
  )
}
