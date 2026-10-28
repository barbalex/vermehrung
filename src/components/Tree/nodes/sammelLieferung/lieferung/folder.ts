export const buildSammelLieferungLieferungFolder = ({
  children,
  sammelLieferungIndex,
  sammelLieferungId,
}: {
  children: unknown[]
  sammelLieferungIndex: number
  sammelLieferungId: string
}) => ({
  nodeType: 'folder',
  menuTitle: 'Lieferungen',
  id: `${sammelLieferungId}LieferungFolder`,
  label: `Lieferungen (${children.length})`,
  url: ['Sammel-Lieferungen', sammelLieferungId, 'Lieferungen'],
  sort: [9, sammelLieferungIndex, 3],
  hasChildren: true,
  childrenCount: children.length,
})
