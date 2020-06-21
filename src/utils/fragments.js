import gql from 'graphql-tag'

export const art = gql`
  fragment ArtFields on art {
    id
    __typename
    ae_id
    art_ae_art {
      id
      __typename
      name
    }
    changed
    changed_by
    _rev
    _parent_rev
    _revisions
    _depth
    _conflicts
    _deleted
  }
`
export const artQk = gql`
  fragment ArtQkFields on art_qk {
    id
    __typename
    name
    titel
    beschreibung
    sort
    changed
    changed_by
    _rev
    _parent_rev
    _revisions
    _depth
    _conflicts
    _deleted
  }
`
export const artQkChoosen = gql`
  fragment ArtQkChoosenFields on art_qk_choosen {
    id
    __typename
    art_id
    qk_name
    choosen
    changed
    changed_by
    _rev
    _parent_rev
    _revisions
    _depth
    _conflicts
    _deleted
  }
`
export const artFile = gql`
  fragment ArtFileFields on art_file {
    id
    art_id
    file_id
    __typename
    file_mime_type
    name
    beschreibung
  }
`
export const aeArt = gql`
  fragment AeArtFields on ae_art {
    id
    __typename
    name
    # name_deutsch
    # name_latein
  }
`
export const av = gql`
  fragment AvFields on av {
    id
    __typename
    art_id
    person_id
    changed
    changed_by
    _rev
    _parent_rev
    _revisions
    _depth
    _conflicts
    _deleted
  }
`
export const event = gql`
  fragment EventFields on event {
    id
    __typename
    kultur_id
    teilkultur_id
    person_id
    beschreibung
    geplant
    datum
    changed
    changed_by
    _rev
    _parent_rev
    _revisions
    _depth
    _conflicts
    _deleted
  }
`
export const garten = gql`
  fragment GartenFields on garten {
    id
    __typename
    name
    person_id
    person {
      id
      __typename
      name
      ort
    }
    strasse
    plz
    ort
    aktiv
    bemerkungen
    lv95_x
    lv95_y
    wgs84_lat
    wgs84_long
    changed
    changed_by
    _rev
    _parent_rev
    _revisions
    _depth
    _conflicts
    _deleted
  }
`
export const garten_rev = gql`
  fragment GartenRevFields on garten_rev {
    id
    __typename
    garten_id
    name
    person_id
    person {
      id
      __typename
      name
    }
    strasse
    plz
    ort
    geom_point
    aktiv
    bemerkungen
    changed
    changed_by
    _rev
    _parent_rev
    _revisions
    _depth
    _conflicts
    _deleted
  }
`
export const gartenTeilzaehlungSums = gql`
  fragment GartenTeilzaehlungSumsFields on garten_teilzaehlung_sums {
    garten_id
    __typename
    garten_name
    garten_person_id
    garten_person_name
    garten_strasse
    garten_plz
    garten_ort
    garten_aktiv
    garten_bemerkungen
    garten_anzahl_kulturen
    kultur_id
    kultur_art_id
    kultur_art_name
    kultur_herkunft_nr
    kultur_zwischenlager
    kultur_erhaltungskultur
    kultur_von_anzahl_individuen
    kultur_aktiv
    kultur_bemerkungen
    kultur_events_anzahl
    kultur_events_datum_beschreibung
    kultur_letzter_event_id
    kultur_letzter_event_datum
    kultur_letzter_event_beschreibung
    kultur_letzter_event_geplant
    kultur_letzter_event_person_name
    kultur_letzter_event_teilkultur_name
    kultur_letzter_event_teilkultur_ort1
    kultur_letzter_event_teilkultur_ort2
    kultur_letzter_event_teilkultur_ort3
    kultur_letzter_event_teilkultur_bemerkungen
    kultur_teilkulturen_anzahl
    kultur_teilkulturen_namen
    kultur_zaehlungen_anzahl
    kultur_anzahl_pflanzen
    kultur_anzahl_auspflanzbereit
    kultur_anzahl_mutterpflanzen
    zaehlung_id
    zaehlung_datum
    zaehlung_prognose
    zaehlung_bemerkungen
    zaehlung_anzahl_teilzaehlungen
    zaehlung_anzahl_pflanzen
    zaehlung_anzahl_auspflanzbereit
    zaehlung_anzahl_mutterpflanzen
    teilzaehlung_id
    teilzaehlung_teilkultur_name
    teilzaehlung_teilkultur_ort1
    teilzaehlung_teilkultur_ort2
    teilzaehlung_teilkultur_ort3
    teilzaehlung_teilkultur_bemerkungen
    teilzaehlung_anzahl_pflanzen
    teilzaehlung_anzahl_auspflanzbereit
    teilzaehlung_anzahl_mutterpflanzen
    teilzaehlung_andere_menge
    teilzaehlung_auspflanzbereit_beschreibung
    teilzaehlung_bemerkungen
  }
`
export const gartenFile = gql`
  fragment GartenFileFields on garten_file {
    id
    __typename
    garten_id
    file_id
    file_mime_type
    name
    beschreibung
  }
`
export const gv = gql`
  fragment GvFields on gv {
    id
    __typename
    garten_id
    person_id
    changed
    changed_by
    _rev
    _parent_rev
    _revisions
    _depth
    _conflicts
    _deleted
  }
`
export const herkunft = gql`
  fragment HerkunftFields on herkunft {
    id
    __typename
    nr
    lokalname
    gemeinde
    kanton
    land
    bemerkungen
    lv95_x
    lv95_y
    wgs84_lat
    wgs84_long
    changed
    changed_by
    _rev
    _parent_rev
    _revisions
    _depth
    _conflicts
    _deleted
  }
`
export const herkunftFile = gql`
  fragment HerkunftFileFields on herkunft_file {
    id
    __typename
    herkunft_id
    file_id
    file_mime_type
    name
    beschreibung
  }
`
export const kultur = gql`
  fragment KulturFields on kultur {
    id
    __typename
    art_id
    herkunft_id
    garten_id
    zwischenlager
    erhaltungskultur
    von_anzahl_individuen
    aktiv
    bemerkungen
    changed
    changed_by
    _rev
    _parent_rev
    _revisions
    _depth
    _conflicts
    _deleted
  }
`
export const kulturQk = gql`
  fragment KulturQkFields on kultur_qk {
    id
    __typename
    name
    titel
    beschreibung
    sort
    changed
    changed_by
    _rev
    _parent_rev
    _revisions
    _depth
    _conflicts
    _deleted
  }
`
export const kulturQkChoosen = gql`
  fragment KulturQkChoosenFields on kultur_qk_choosen {
    id
    __typename
    kultur_id
    qk_name
    choosen
    changed
    changed_by
    _rev
    _parent_rev
    _revisions
    _depth
    _conflicts
    _deleted
  }
`
export const kulturFile = gql`
  fragment KulturFileFields on kultur_file {
    id
    __typename
    kultur_id
    file_id
    file_mime_type
    name
    beschreibung
  }
`
export const kulturOption = gql`
  fragment KulturOptionFields on kultur_option {
    id
    __typename
    ev_datum
    ev_geplant
    ev_person_id
    ev_teilkultur_id
    tk
    tk_bemerkungen
    tz_andere_menge
    tz_anzahl_mutterpflanzen
    tz_auspflanzbereit_beschreibung
    tz_teilkultur_id
    tz_bemerkungen
    z_bemerkungen
    _rev
    _parent_rev
    _revisions
    _depth
    _conflicts
    _deleted
  }
`
export const lieferung = gql`
  fragment LieferungFields on lieferung {
    id
    __typename
    sammel_lieferung_id
    art_id
    person_id
    von_sammlung_id
    von_kultur_id
    datum
    nach_kultur_id
    nach_ausgepflanzt
    von_anzahl_individuen
    anzahl_pflanzen
    anzahl_auspflanzbereit
    gramm_samen
    andere_menge
    geplant
    bemerkungen
    changed
    changed_by
    _rev
    _parent_rev
    _revisions
    _depth
    _conflicts
    _deleted
  }
`
export const lieferungFile = gql`
  fragment LieferungFileFields on lieferung_file {
    id
    __typename
    lieferung_id
    file_id
    file_mime_type
    name
    beschreibung
  }
`
export const person = gql`
  fragment PersonFields on person {
    id
    __typename
    nr
    vorname
    name
    adresszusatz
    strasse
    plz
    ort
    telefon_privat
    telefon_geschaeft
    telefon_mobile
    email
    kein_email
    bemerkungen
    account_id
    user_role
    kommerziell
    info
    aktiv
    changed
    changed_by
    _rev
    _parent_rev
    _revisions
    _depth
    _conflicts
    _deleted
  }
`
export const personOption = gql`
  fragment PersonOptionFields on person_option {
    id
    __typename
    ar_name_deutsch
    ga_strasse
    ga_plz
    ga_ort
    ga_geom_point
    ga_lat_lng
    ga_aktiv
    ga_bemerkungen
    hk_kanton
    hk_land
    hk_bemerkungen
    hk_geom_point
    li_show_sl_felder
    li_show_sl
    sl_show_empty_when_next_to_li
    sl_auto_copy_edits
    tree_kultur
    tree_teilkultur
    tree_zaehlung
    tree_lieferung
    tree_event
    _rev
    _parent_rev
    _revisions
    _depth
    _conflicts
    _deleted
  }
`
export const personFile = gql`
  fragment PersonFileFields on person_file {
    id
    __typename
    person_id
    file_id
    file_mime_type
    name
    beschreibung
  }
`
export const sammelLieferung = gql`
  fragment SammelLieferungFields on sammel_lieferung {
    id
    __typename
    art_id
    person_id
    von_sammlung_id
    von_kultur_id
    datum
    nach_kultur_id
    nach_ausgepflanzt
    von_anzahl_individuen
    anzahl_pflanzen
    anzahl_auspflanzbereit
    gramm_samen
    andere_menge
    geplant
    bemerkungen
    _rev
    _parent_rev
    _revisions
    _depth
    _conflicts
    _deleted
  }
`
export const sammlung = gql`
  fragment SammlungFields on sammlung {
    id
    __typename
    art_id
    person_id
    herkunft_id
    nr
    datum
    von_anzahl_individuen
    anzahl_pflanzen
    gramm_samen
    andere_menge
    geplant
    bemerkungen
    lv95_x
    lv95_y
    wgs84_lat
    wgs84_long
    changed
    changed_by
    _rev
    _parent_rev
    _revisions
    _depth
    _conflicts
    _deleted
  }
`
export const sammlungFile = gql`
  fragment SammlungFileFields on sammlung_file {
    id
    __typename
    sammlung_id
    file_id
    file_mime_type
    name
    beschreibung
  }
`
export const teilkultur = gql`
  fragment TeilkulturFields on teilkultur {
    id
    __typename
    kultur_id
    name
    ort1
    ort2
    ort3
    bemerkungen
    changed
    changed_by
    _rev
    _parent_rev
    _revisions
    _depth
    _conflicts
    _deleted
  }
`
export const teilzaehlung = gql`
  fragment TeilzaehlungFields on teilzaehlung {
    id
    __typename
    zaehlung_id
    teilkultur_id
    anzahl_pflanzen
    anzahl_auspflanzbereit
    anzahl_mutterpflanzen
    andere_menge
    auspflanzbereit_beschreibung
    bemerkungen
    changed
    changed_by
    _rev
    _parent_rev
    _revisions
    _depth
    _conflicts
    _deleted
  }
`
export const userRole = gql`
  fragment UserRoleFields on user_role {
    id
    __typename
    name
    sort
    comment
  }
`
export const zaehlung = gql`
  fragment ZaehlungFields on zaehlung {
    id
    __typename
    kultur_id
    datum
    prognose
    bemerkungen
    changed
    changed_by
    _rev
    _parent_rev
    _revisions
    _depth
    _conflicts
    _deleted
  }
`
export const artSums = gql`
  fragment ArtSumsFields on art_sums {
    art_id
    __typename
    action
    prognose
    partitioner
    datum
    anzahl_pflanzen
    sum_anzahl_pflanzen
    anzahl_auspflanzbereit
    sum_anzahl_auspflanzbereit
    sum_anzahl_pflanzen
    sum_anzahl_auspflanzbereit
    anzahl_mutterpflanzen
    gramm_samen
    andere_menge
    auspflanzbereit_beschreibung
    bemerkungen
  }
`
export const herkunftSums = gql`
  fragment HerkunftSumsFields on herkunft_sums {
    art_id
    herkunft_id
    __typename
    action
    prognose
    partitioner
    datum
    anzahl_pflanzen
    sum_anzahl_pflanzen
    anzahl_auspflanzbereit
    sum_anzahl_auspflanzbereit
    sum_anzahl_pflanzen
    sum_anzahl_auspflanzbereit
    anzahl_mutterpflanzen
    gramm_samen
    andere_menge
    auspflanzbereit_beschreibung
    bemerkungen
  }
`
