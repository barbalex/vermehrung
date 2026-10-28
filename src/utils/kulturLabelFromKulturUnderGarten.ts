export const kulturLabelFromKulturUnderGarten = ({
  kultur,
  art,
  aeArt,
  herkunft,
}) => {
  if (!kultur) return ''

  let artLabel = 'keine Art'
  if (art && aeArt && aeArt.name) {
    artLabel = aeArt.name
  }

  let herkunftLabel = 'von: keine Herkunft'
  if (kultur.herkunft_id) {
    if (herkunft?.nr) {
      herkunftLabel = `von: ${herkunft.nr}`
    } else {
      herkunftLabel = 'von: (Herkunft ohne Nr)'
    }
  }
  const zwischenlagerLabel = kultur?.zwischenlager ? 'Zwischenlager' : undefined
  const label = [artLabel, herkunftLabel, zwischenlagerLabel]
    .filter((e) => !!e)
    .join('; ')

  return label
}
