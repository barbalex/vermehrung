import lieferungLabelFromLieferung from '../../../../../../../utils/lieferungLabelFromLieferung.js'

const artSammlungHerkunftAuslieferungNodes = ({
  lieferung,
  lieferungIndex,
  sammlung,
  sammlungIndex,
  herkunft,
  herkunftIndex,
  artId,
  artIndex,
}) => ({
  nodeType: 'table',
  menuTitle: 'Lieferung',
  table: 'lieferung',
  id: `${artId}${sammlung.id}${lieferung.id}`,
  label: lieferungLabelFromLieferung({ lieferung }),
  url: [
    'Arten',
    artId,
    'Herkuenfte',
    herkunft.id,
    'Sammlungen',
    sammlung.id,
    'Aus-Lieferungen',
    lieferung.id,
  ],
  sort: [1, artIndex, 1, herkunftIndex, 1, sammlungIndex, 1, lieferungIndex],
  hasChildren: false,
  mono: true,
})

export default artSammlungHerkunftAuslieferungNodes
