import updateLieferung from './updateLieferung'

export default async ({ sammelLieferung, field, store }) => {
  // pass field to mark which field should be updated
  // even if it has value null
  let error = null
  for (const l of sammelLieferung.lieferungs) {
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
  if (!error) {
    store.enqueNotification({
      message: 'Alle Lieferungen aktualisiert',
      options: {
        variant: 'info',
      },
    })
  }
}
