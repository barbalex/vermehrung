export const createDataArrayForRevComparison = ({ row, revRow }: {
  row: Record<string, unknown> | null | undefined
  revRow: Record<string, unknown> | null | undefined
}) => [
  {
    valueInRow: row.ae_id,
    valueInRev: revRow.ae_id,
    label: 'Art (id)',
  },
  {
    valueInRow: row.set,
    valueInRev: revRow.set,
    label: 'Set',
  },
  {
    valueInRow: row.apflora_av,
    valueInRev: revRow.apflora_av,
    label: 'Apflora Artverantwortlich',
  },
  {
    valueInRow: row.ap,
    valueInRev: revRow.ap,
    label: 'AP',
  },
  {
    valueInRow: row?.changed,
    valueInRev: revRow?.changed,
    label: 'geändert',
  },
  {
    valueInRow: row?.changed_by,
    valueInRev: revRow?.changed_by,
    label: 'geändert von',
  },
  {
    valueInRow: row._deleted,
    valueInRev: revRow._deleted,
    label: 'gelöscht',
  },
]
