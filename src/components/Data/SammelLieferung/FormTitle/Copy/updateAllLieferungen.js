import { addNotification } from '../../../../../store/index.js'
import { updateSammelLieferung } from './updateLieferung.js'

export const updateAllSammelLieferungen = async ({
  sammelLieferung,
  field,
}) => {
  // pass field to mark which field should be updated
  // even if it has value null
  const lieferungs = sammelLieferung.lieferungs ?? []
  //console.log('updateAllLieferungen', { sammelLieferung, lieferungs })
  let error = null
  for (const lieferung of lieferungs) {
    try {
      updateSammelLieferung({
        lieferung,
        sammelLieferung,
        field,
      })
    } catch (err) {
      error = true
      console.log('updateAllLieferungen, error:', err)
    }
  }
  if (!error && lieferungs.length) {
    addNotification({
      message: 'Alle Lieferungen aktualisiert',
      type: 'info',
    })
  }
}
