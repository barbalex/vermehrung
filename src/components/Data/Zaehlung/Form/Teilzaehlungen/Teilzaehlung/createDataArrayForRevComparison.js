export const createDataArrayForTeilzaehlungRevComparison = ({
  row,
  revRow,
}) => [
  {
    valueInRow: row?.zaehlung_id,
    valueInRev: revRow?.zaehlung_id,
    label: 'Zaehlung ID',
  },
  {
    valueInRow: row.teilkultur_id,
    valueInRev: revRow.teilkultur_id,
    label: 'Teilkultur (id)',
  },
  {
    valueInRow: row?.anzahl_pflanzen,
    valueInRev: revRow?.anzahl_pflanzen,
    label: 'Anzahl Pflanzen',
  },
  {
    valueInRow: row?.anzahl_auspflanzbereit,
    valueInRev: revRow?.anzahl_auspflanzbereit,
    label: 'Anzahl auspflanzbereit',
  },
  {
    valueInRow: row?.anzahl_mutterpflanzen,
    valueInRev: revRow?.anzahl_mutterpflanzen,
    label: 'Anzahl Mutterpflanzen',
  },
  {
    valueInRow: row?.andere_menge,
    valueInRev: revRow?.andere_menge,
    label: 'Andere Menge',
  },
  {
    valueInRow: row?.auspflanzbereit_beschreibung,
    valueInRev: revRow?.auspflanzbereit_beschreibung,
    label: 'Auspflanzbereit Beschreibung',
  },
  {
    valueInRow: row?.bemerkungen,
    valueInRev: revRow?.bemerkungen,
    label: 'bemerkungen',
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
