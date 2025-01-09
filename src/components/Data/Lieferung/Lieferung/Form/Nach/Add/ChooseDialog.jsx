import { useState, useEffect, useContext } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import { first as first$ } from 'rxjs/operators'
import { Q } from '@nozbe/watermelondb'
import { observer } from 'mobx-react-lite'

import { MobxStoreContext } from '../../../../../../../mobxStoreContext.js'
import { gartensSortedFromGartens } from '../../../../../../../utils/gartensSortedFromGartens.js'
import { StyledSelect } from '../../../../../../shared/Select/index.jsx'

const ChooseDialog = ({
  open,
  onClose,
  onChange,
  kulturType,
  lieferung,
  herkunft,
}) => {
  const store = useContext(MobxStoreContext)
  const { db, filter } = store

  const [gartens, setGartens] = useState([])

  useEffect(() => {
    const gartenDelQuery =
      filter.garten._deleted === false ? Q.where('_deleted', false)
      : filter.garten._deleted === true ? Q.where('_deleted', true)
      : Q.or(
          Q.where('_deleted', false),
          Q.where('_deleted', true),
          Q.where('_deleted', null),
        )
    const gartenAktivQuery =
      filter.garten.aktiv === false ? Q.where('aktiv', false)
      : filter.garten.aktiv === true ? Q.where('aktiv', true)
      : Q.or(
          Q.where('aktiv', false),
          Q.where('aktiv', true),
          Q.where('aktiv', null),
        )
    const gartensObservable = db
      .get('garten')
      .query(gartenDelQuery, gartenAktivQuery)
      .observe()
    const subscription = gartensObservable.subscribe(async (gartens) => {
      // Zur Auswahl stehen Gärten, die noch nicht eine aktive Kultur dieser Art mit dieser Herkunft haben,
      // das je nach Wahl Zwischenlager ist oder nicht
      const gartensFiltered = []
      for (const garten of gartens) {
        const kulturs = await garten.kulturs.fetch()
        if (
          !kulturs.some(
            (k) =>
              k.art_id === lieferung.art_id &&
              k.herkunft_id === herkunft.id &&
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
    filter.garten._deleted,
    filter.garten.aktiv,
    herkunft?.id,
    kulturType,
    lieferung.art_id,
  ])

  console.log('ChooseDialog: gartens:', gartens)

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
    >
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

export default observer(ChooseDialog)
