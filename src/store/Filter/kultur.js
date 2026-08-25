export const initial = {
  id: null,
  art_id: null,
  herkunft_id: null,
  garten_id: null,
  zwischenlager: null,
  erhaltungskultur: null,
  von_anzahl_individuen: null,
  aktiv: true,
  bemerkungen: null,
  _deleted: false,
}

export const empty = {
  id: null,
  art_id: null,
  herkunft_id: null,
  garten_id: null,
  zwischenlager: null,
  erhaltungskultur: null,
  von_anzahl_individuen: null,
  aktiv: true,
  bemerkungen: null,
  _deleted: false,
}

export const simpleTypes = {
  id: 'uuid',
  art_id: 'uuid',
  herkunft_id: 'uuid',
  garten_id: 'uuid',
  zwischenlager: 'boolean',
  erhaltungskultur: 'boolean',
  von_anzahl_individuen: 'number',
  aktiv: 'boolean',
  bemerkungen: 'string',
  _deleted: 'boolean',
}
