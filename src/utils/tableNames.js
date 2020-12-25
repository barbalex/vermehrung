const dictionary = {
  ae_art: 'Arten (Artliste)',
  art: 'Arten',
  art_file: 'Arten (Dateien)',
  art_qk: 'Arten (Qualitätskontrollen)',
  av: 'Arten (Mitarbeitende)',
  event: 'Events',
  garten: 'Gärten',
  garten_file: 'Gärten (Dateien)',
  gv: 'Gärten (Mitarbeitende)',
  herkunft: 'Herkunft',
  herkunft_file: 'Herkunft (Dateien)',
  kultur: 'Kulturen',
  kultur_file: 'Kulturen (Dateien)',
  kultur_option: 'Kulturen (Optionen)',
  kultur_qk: 'Kulturen (Qualitätskontrollen)',
  lieferung: 'Lieferungen',
  lieferung_file: 'Lieferungen (Dateien)',
  person: 'Personen',
  person_file: 'Personen (Dateien)',
  person_option: 'Personen (Optionen)',
  sammel_lieferung: 'Sammel-Lieferungen',
  sammlung: 'Sammlungen',
  sammlung_file: 'Sammlungen (Dateien)',
  teilkultur: 'Teilkulturen',
  teilzaehlung: 'Teilzählungen',
  user_role: 'Benutzer-Rollen',
  zaehlung: 'Zählungen',
}

const tableNames = (table) => dictionary[table] ?? table

export default tableNames
