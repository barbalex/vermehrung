import teilkulturLabelFromTeilkultur from './teilkulturLabelFromTeilkultur'

// TODO: only show Teilkultur when necessary
const createDataArrayForRevComparison = ({ row, revRow, store }) => {
  const zaehlung = row.zaehlung_id ? store.zaehlungs.get(row.zaehlung_id) : {}
  const kulturOption = store.kultur_options.get(zaehlung?.kultur_id) ?? {}
  console.log('createDataArrayForRevComparison', { row, kulturOption })
  const {
    tk,
    tz_teilkultur_id,
    tz_anzahl_mutterpflanzen,
    tz_andere_menge,
    tz_auspflanzbereit_beschreibung,
    tz_bemerkungen,
  } = kulturOption
  const rowTeilkultur = row.teilkultur_id
    ? store.teilkulturs.get(row.teilkultur_id)
    : {}
  const revRowTeilkultur = revRow.teilkultur_id
    ? store.teilkulturs.get(revRow.teilkultur_id)
    : {}

  return [
    {
      valueInRow: row?.zaehlung_id,
      valueInRev: revRow?.zaehlung_id,
      label: 'Zaehlung ID',
    },
    ...(tk && tz_teilkultur_id
      ? [
          {
            valueInRow: teilkulturLabelFromTeilkultur(rowTeilkultur),
            valueInRev: teilkulturLabelFromTeilkultur(revRowTeilkultur),
            label: 'Teilkultur',
          },
        ]
      : []),
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
    ...(tz_anzahl_mutterpflanzen
      ? [
          {
            valueInRow: row?.anzahl_mutterpflanzen,
            valueInRev: revRow?.anzahl_mutterpflanzen,
            label: 'Anzahl Mutterpflanzen',
          },
        ]
      : []),
    ...(tz_andere_menge
      ? [
          {
            valueInRow: row?.andere_menge,
            valueInRev: revRow?.andere_menge,
            label: 'Andere Menge',
          },
        ]
      : []),
    ...(tz_auspflanzbereit_beschreibung
      ? [
          {
            valueInRow: row?.auspflanzbereit_beschreibung,
            valueInRev: revRow?.auspflanzbereit_beschreibung,
            label: 'Auspflanzbereit Beschreibung',
          },
        ]
      : []),
    ...(tz_bemerkungen
      ? [
          {
            valueInRow: row?.bemerkungen,
            valueInRev: revRow?.bemerkungen,
            label: 'bemerkungen',
          },
        ]
      : []),
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
}

export default createDataArrayForRevComparison
