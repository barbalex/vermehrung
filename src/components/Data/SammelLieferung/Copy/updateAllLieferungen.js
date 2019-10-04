import updateLieferung from './updateLieferung'

export default async ({ lieferungs, sammelLieferung, client, store }) => {
  let error = null
  for (const l of lieferungs) {
    try {
      await updateLieferung({
        lieferungId: l.id,
        sammelLieferung,
        client,
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
