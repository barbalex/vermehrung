import updateLieferung from './updateLieferung'

export default async ({ sammelLieferung, lieferungs, field, store }) => {
  // pass field to mark which field should be updated
  // even if it has value null
  let error = null
  for (const l of lieferungs) {
    try {
      await updateLieferung({
        lieferungId: l.id,
        sammelLieferung,
        field,
        store,
      })
    } catch (err) {
      error = true
    }
  }
  if (!error && lieferungs.length) {
    store.addNotification({
      message: 'Alle Lieferungen aktualisiert',
      type: 'info',
    })
  }
}
