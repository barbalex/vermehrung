export const createDataArrayForBedarfRevComparison = ({ row, revRow }: {
  row: Record<string, unknown> | null | undefined
  revRow: Record<string, unknown> | null | undefined
}) => [
  {
    valueInRow: row?.kultur_id,
    valueInRev: revRow?.kultur_id,
    label: 'Kultur (id)',
  },
  {
    valueInRow: row?.person_id,
    valueInRev: revRow?.person_id,
    label: 'Person (id)',
  },
  {
    valueInRow: row?.jahr,
    valueInRev: revRow?.jahr,
    label: 'Jahr',
  },
  {
    valueInRow: row?.beschreibung,
    valueInRev: revRow?.beschreibung,
    label: 'Beschreibung',
  },
  {
    valueInRow: row?.bemerkungen,
    valueInRev: revRow?.bemerkungen,
    label: 'Bemerkungen',
  },
  {
    valueInRow: row?.neues_material,
    valueInRev: revRow?.neues_material,
    label: 'Neues Material',
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
    valueInRow: row?._deleted,
    valueInRev: revRow?._deleted,
    label: 'gelöscht',
  },
]
