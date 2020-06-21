export default (el) => {
  const garten =
    el?.garten?.name ?? `${el?.garten?.person?.fullname ?? 'kein Name'}`
  const art = el?.art?.art_ae_art?.name ?? '(keine Art)'
  const herkunft = el?.herkunft?.nr ?? '(Herkunft ohne Nr)'

  return `${art}, von: ${herkunft}, in: ${garten}`
}
