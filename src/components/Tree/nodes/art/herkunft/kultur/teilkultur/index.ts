import { teilkulturLabelFromTeilkultur } from '../../../../../../../utils/teilkulturLabelFromTeilkultur.ts'

export const buildArtHerkunftKulturTeilkultur = ({
  teilkultur,
  teilkulturIndex,
  kulturId,
  kulturIndex,
  herkunft,
  herkunftIndex,
  artId,
  artIndex,
}: {
  teilkultur: import('../../../../../../../dbModel.ts').Teilkultur
  teilkulturIndex: number
  kulturId: string
  kulturIndex: number
  herkunft: import('../../../../../../../dbModel.ts').Herkunft
  herkunftIndex: number
  artId: string
  artIndex: number
}) => ({
  nodeType: 'table',
  menuTitle: 'Teilkultur',
  table: 'teilkultur',
  id: `${artId}/${herkunft.id}/${kulturId}/${teilkultur.id}`,
  label: teilkulturLabelFromTeilkultur({ teilkultur }),
  url: [
    'Arten',
    artId,
    'Herkuenfte',
    herkunft.id,
    'Kulturen',
    kulturId,
    'Teilkulturen',
    teilkultur.id,
  ],
  sort: [1, artIndex, 1, herkunftIndex, 2, kulturIndex, 1, teilkulturIndex],
  hasChildren: false,
})
