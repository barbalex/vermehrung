import React from 'react'
import get from 'lodash/get'

const LieferungForLieferschein = ({ lieferung: l }) => {
  const art = l.art_id
    ? get(l, 'art.art_ae_art.name', '(kein Name)')
    : '(keine Art gewählt)'
  const herkunft = l.herkunft_id
    ? `${get(l, 'kulturByVonKulturId.herkunft.nr')} (${get(
        l,
        'kulturByVonKulturId.herkunft.gemeinde',
        '(keine Gemeinde)',
      )}, ${get(
        l,
        'kulturByVonKulturId.herkunft.lokalname',
        '(kein Lokalname)',
      )})`
    : '(keine Herkunft)'
  const was = 'TODO:'
  const bemerkungen = 'TODO:'
}

export default LieferungForLieferschein
