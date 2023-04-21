import lieferungLabelFromLieferung from '../../../../../../utils/lieferungLabelFromLieferung'

const artSammlungAuslieferungNodes = ({
  lieferung,
  lieferungIndex,
  sammlungId,
  sammlungIndex,
  artId,
  artIndex,
}) => ({
  nodeType: 'table',
  menuTitle: 'Lieferung',
  table: 'lieferung',
  id: `${artId}${sammlungId}${lieferung.id}`,
  label: lieferungLabelFromLieferung({ lieferung }),
  url: [
    'Arten',
    artId,
    'Sammlungen',
    sammlungId,
    'Aus-Lieferungen',
    lieferung.id,
  ],
  sort: [1, artIndex, 2, sammlungIndex, 1, lieferungIndex],
  hasChildren: false,
  mono: true,
})

export default artSammlungAuslieferungNodes
