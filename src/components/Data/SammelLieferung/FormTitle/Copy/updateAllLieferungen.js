import updateLieferung from './updateLieferung.js'

const updateAllLieferungen = async ({ sammelLieferung, store, field }) => {
  // pass field to mark which field should be updated
  // even if it has value null
  const lieferungs = sammelLieferung.lieferungs ?? []
  //console.log('updateAllLieferungen', { sammelLieferung, lieferungs })
  let error = null
  for (const lieferung of lieferungs) {
    try {
      updateLieferung({
        lieferung,
        sammelLieferung,
        store,
        field,
      })
    } catch (err) {
      error = true
      console.log('updateAllLieferungen, error:', err)
    }
  }
  if (!error && lieferungs.length) {
    store.addNotification({
      message: 'Alle Lieferungen aktualisiert',
      type: 'info',
    })
  }
}

export default updateAllLieferungen
