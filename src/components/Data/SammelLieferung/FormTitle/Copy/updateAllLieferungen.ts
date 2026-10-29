import { addNotification } from '../../../../../store/index.ts'
import { updateSammelLieferung } from './updateLieferung.ts'

export const updateAllSammelLieferungen = async ({
  sammelLieferung,
  field,
}: {
  sammelLieferung: import('../../../../../dbModel.ts').SammelLieferung
  field?: string
}) => {
  // pass field to mark which field should be updated
  // even if it has value null
  const lieferungs = await sammelLieferung.lieferungs.fetch()
  //console.log('updateAllLieferungen', { sammelLieferung, lieferungs })
  let error = null
  for (const lieferung of lieferungs) {
    try {
      await updateSammelLieferung({
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
