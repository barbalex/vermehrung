import { bedarfLabelFromBedarf } from '../../../../../../../utils/bedarfLabelFromBedarf.ts'

export const buildArtHerkunftKulturBedarf = ({
  bedarf,
  bedarfIndex,
  kulturId,
  kulturIndex,
  herkunft,
  herkunftIndex,
  artId,
  artIndex,
}: {
  bedarf: import('../../../../../../../dbModel.ts').Bedarf
  bedarfIndex: number
  kulturId: string
  kulturIndex: number
  herkunft: import('../../../../../../../dbModel.ts').Herkunft
  herkunftIndex: number
  artId: string
  artIndex: number
}) => ({
  nodeType: 'table',
  menuTitle: 'Bedarf',
  table: 'bedarf',
  id: `${artId}/${herkunft.id}/${kulturId}/${bedarf.id}`,
  label: bedarfLabelFromBedarf({ bedarf }),
  url: [
    'Arten',
    artId,
    'Herkuenfte',
    herkunft.id,
    'Kulturen',
    kulturId,
    'Bedarf',
    bedarf.id,
  ],
  sort: [1, artIndex, 1, herkunftIndex, 2, kulturIndex, 5, bedarfIndex],
  hasChildren: false,
})
