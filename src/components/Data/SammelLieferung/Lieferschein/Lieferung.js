import React, { useContext } from 'react'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import styled from 'styled-components'

import { StoreContext } from '../../../../models/reactUtils'
import artLabelFromLieferung from '../../../../utils/artLabelFromLieferung'
import herkunftLabelFromHerkunft from '../../../../utils/herkunftLabelFromHerkunft'

const StyledTableCell = styled(TableCell)`
  vertical-align: top !important;
`

const Zeile = ({ value }) => <div>{value}</div>

const LieferungForLieferschein = ({ lieferung: l }) => {
  const store = useContext(StoreContext)

  const art = artLabelFromLieferung({ lieferung: l, store })
  const vonKultur = l.von_kultur_id ? store.kulturs.get(l.von_kultur_id) : {}
  const vonKulturHerkunft = vonKultur?.herkunft_id
    ? store.herkunfts.get(vonKultur.herkunft_id)
    : undefined
  const vonSammlung = l.von_sammlung_id
    ? store.sammlungs.get(l.von_sammlung_id)
    : {}
  const vonSammlungHerkunft = vonSammlung?.herkunft_id
    ? store.herkunfts.get(vonSammlung.herkunft_id)
    : undefined
  const herkunft = vonKulturHerkunft
    ? herkunftLabelFromHerkunft({
        herkunft: vonKulturHerkunft,
      })
    : vonSammlungHerkunft
    ? herkunftLabelFromHerkunft({ herkunft: vonSammlungHerkunft })
    : ''
  const wasArray = []
  l.anzahl_pflanzen && wasArray.push(`${l.anzahl_pflanzen} Pflanzen`)
  l.anzahl_auspflanzbereit &&
    wasArray.push(`${l.anzahl_auspflanzbereit} Pflanzen auspflanzbereit`)
  l.gramm_samen && wasArray.push(`${l.gramm_samen} Gramm Samen`)
  l.von_anzahl_individuen &&
    wasArray.push(`von ${l.von_anzahl_individuen} Individuen`)
  l.andere_menge && wasArray.push(l.andere_menge)
  const bemerkungen = l.bemerkungen

  return (
    <TableRow>
      <StyledTableCell>{art}</StyledTableCell>
      <StyledTableCell>{herkunft}</StyledTableCell>
      <StyledTableCell>
        {wasArray.map((w, i) => (
          <Zeile key={i} value={w} />
        ))}
      </StyledTableCell>
      <StyledTableCell>{bemerkungen}</StyledTableCell>
    </TableRow>
  )
}

export default LieferungForLieferschein
