import { useState, useEffect, useContext } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import { first as first$ } from 'rxjs/operators'
import { Q } from '@nozbe/watermelondb'
import { observer } from 'mobx-react-lite'

import storeContext from '../../../../../../../storeContext'
import gartensSortedFromGartens from '../../../../../../../utils/gartensSortedFromGartens'
import { StyledSelect } from '../../../../../../shared/Select'

const ChooseDialog = ({
  open,
  onClose,
  onChange,
  kulturType,
  lieferung,
  herkunft,
}) => {
  const store = useContext(storeContext)
  const { db, filter } = store

  const [gartens, setGartens] = useState([])

  useEffect(() => {
    const gartensObservable = db
      .get('garten')
      .query(
        // Zur Auswahl stehen Gärten, die noch nicht eine aktive Kultur dieser Art mit dieser Herkunft haben,
        // das je nach Wahl Zwischenlager ist oder nicht
        Q.where(
          '_deleted',
          Q.oneOf(
            filter.garten._deleted === false
              ? [false]
              : filter.garten._deleted === true
              ? [true]
              : [true, false, null],
          ),
        ),
        Q.where(
          'aktiv',
          Q.oneOf(
            filter.garten.aktiv === true
              ? [true]
              : filter.garten.aktiv === false
              ? [false]
              : [true, false, null],
          ),
        ),
      )
      .observe()
    const subscription = gartensObservable.subscribe(async (gartens) => {
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

export default observer(ChooseDialog)
