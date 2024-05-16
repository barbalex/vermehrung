import lieferungLabelFromLieferung from '../../../../../../utils/lieferungLabelFromLieferung.js'

const herkunftSammlungAuslieferungNodes = ({
  lieferung,
  lieferungIndex,
  sammlungId,
  sammlungIndex,
  herkunftId,
  herkunftIndex,
}) => ({
  nodeType: 'table',
  menuTitle: 'Aus-Lieferung',
  table: 'lieferung',
  id: `${herkunftId}${sammlungId}${lieferung.id}`,
  label: lieferungLabelFromLieferung({ lieferung }),
  url: [
    'Herkuenfte',
    herkunftId,
    'Sammlungen',
    sammlungId,
    'Aus-Lieferungen',
    lieferung.id,
  ],
  sort: [2, herkunftIndex, 2, sammlungIndex, 1, lieferungIndex],
  hasChildren: false,
})

export default herkunftSammlungAuslieferungNodes
