export const createDataArrayForPersonRevComparison = ({
  row: rowPassed,
  revRow,
}) => {
  // need to use raw values here
  const row = rowPassed._raw

  return [
    {
      valueInRow: row.user_role_id,
      valueInRev: revRow.user_role_id,
      label: 'Rolle (id)',
    },
    {
      valueInRow: row?.nr,
      valueInRev: revRow?.nr,
      label: 'Nr',
    },
    {
      valueInRow: row?.vorname,
      valueInRev: revRow?.vorname,
      label: 'Vorname',
    },
    {
      valueInRow: row?.name,
      valueInRev: revRow?.name,
      label: 'Nachname',
    },
    {
      valueInRow: row?.adresszusatz,
      valueInRev: revRow?.adresszusatz,
      label: 'Adresszusatz',
    },
    { valueInRow: row?.strasse, valueInRev: revRow?.strasse, label: 'Strasse' },
    {
      valueInRow: row?.plz,
      valueInRev: revRow?.plz,
      label: 'PLZ',
    },
    { valueInRow: row?.ort, valueInRev: revRow?.ort, label: 'Ort' },
    {
      valueInRow: row?.telefon_privat,
      valueInRev: revRow?.telefon_privat,
      label: 'Telefon privat',
    },
    {
      valueInRow: row?.telefon_geschaeft,
      valueInRev: revRow?.telefon_geschaeft,
      label: 'Telefon Geschäft',
    },
    {
      valueInRow: row?.telefon_mobile,
      valueInRev: revRow?.telefon_mobile,
      label: 'Telefon mobile',
    },
    {
      valueInRow: row?.email,
      valueInRev: revRow?.email,
      label: 'Email',
    },
    {
      valueInRow: row?.kein_email == true,
      valueInRev: revRow?.kein_email == true,
      label: 'Kein Email',
    },
    {
      valueInRow: row?.kommerziell == true,
      valueInRev: revRow?.kommerziell == true,
      label: 'kommerziell',
    },
    {
      valueInRow: row?.info == true,
      valueInRev: revRow?.info == true,
      label: 'info',
    },
    {
      valueInRow: row?.aktiv == true,
      valueInRev: revRow?.aktiv == true,
      label: 'aktiv',
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
}
