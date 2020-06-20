import updateLieferung from './updateLieferung'

export default async ({ sammelLieferung, store }) => {
  // pass field to mark which field should be updated
  // even if it has value null
  const lieferungs = [...store.lieferungs.values()].filter(
    (l) => l.sammel_lieferung_id === sammelLieferung.id,
  )
  let error = null
  for (const l of lieferungs) {
    try {
      await updateLieferung({
        lieferungId: l.id,
        sammelLieferung,
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
