// the url segment that opens an object's form: appended to the object url
// (e.g. /Vermehrung/Arten/{artId}/Art), analogous to apf2's singular
// route segments. keyed by the folder that owns the object id
export const singularOfFolder: Record<string, string> = {
  Arten: 'Art',
  Herkuenfte: 'Herkunft',
  Sammlungen: 'Sammlung',
  Gaerten: 'Garten',
  Kulturen: 'Kultur',
  Teilkulturen: 'Teilkultur',
  Zaehlungen: 'Zaehlung',
  Lieferungen: 'Lieferung',
  'An-Lieferungen': 'Lieferung',
  'Aus-Lieferungen': 'Lieferung',
  'Sammel-Lieferungen': 'Sammel-Lieferung',
  Personen: 'Person',
  Bedarf: 'Bedarf',
}

// display labels where the url segment differs from the German label
export const labelOfSingular: Record<string, string> = {
  Zaehlung: 'Zählung',
}
