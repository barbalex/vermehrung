import gql from 'graphql-tag'

export const art = gql`
  fragment ArtFields on art {
    id
    ae_id
    art_ae_art {
      id
      name
    }
  }
`
export const artQk = gql`
  fragment ArtQkFields on art_qk {
    name
    titel
    beschreibung
    sort
  }
`
export const artQkChoosen = gql`
  fragment ArtQkChoosenFields on art_qk_choosen {
    art_id
    qk_name
  }
`
export const artFile = gql`
  fragment ArtFileFields on art_file {
    art_id
    file_id
    file_mime_type
    name
    beschreibung
  }
`
export const aeArt = gql`
  fragment AeArtFields on ae_art {
    id
    name
    # name_deutsch
    # name_latein
  }
`
export const event = gql`
  fragment EventFields on event {
    id
    kultur_id
    teilkultur_id
    person_id
    beschreibung
    geplant
    datum
  }
`
export const garten = gql`
  fragment GartenFields on garten {
    id
    name
    person_id
    strasse
    plz
    ort
    aktiv
    bemerkungen
    computed {
      id
      lv95_x
      lv95_y
      wgs84_lat
      wgs84_long
    }
  }
`
export const gartenFile = gql`
  fragment GartenFileFields on garten_file {
    garten_id
    file_id
    file_mime_type
    name
    beschreibung
  }
`
export const herkunft = gql`
  fragment HerkunftFields on herkunft {
    id
    nr
    lokalname
    gemeinde
    kanton
    land
    bemerkungen
    computed {
      id
      lv95_x
      lv95_y
      wgs84_lat
      wgs84_long
    }
  }
`
export const herkunftFile = gql`
  fragment HerkunftFileFields on herkunft_file {
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
    art_id
    herkunft_id
    garten_id
    zwischenlager
    erhaltungskultur
    von_anzahl_individuen
    aktiv
    bemerkungen
  }
`
export const kulturQk = gql`
  fragment KulturQkFields on kultur_qk {
    name
    titel
    beschreibung
    sort
  }
`
export const kulturQkChoosen = gql`
  fragment KulturQkChoosenFields on kultur_qk_choosen {
    kultur_id
    qk_name
  }
`
export const kulturFile = gql`
  fragment KulturFileFields on kultur_file {
    kultur_id
    file_id
    file_mime_type
    name
    beschreibung
  }
`
export const kulturFelder = gql`
  fragment KulturFelderFields on kultur_felder {
    kultur_id
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
  }
`
export const lieferung = gql`
  fragment LieferungFields on lieferung {
    id
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
  }
`
export const lieferungFile = gql`
  fragment LieferungFileFields on lieferung_file {
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
    nr
    name
    adresszusatz
    strasse
    plz
    ort
    telefon_privat
    telefon_geschaeft
    telefon_mobile
    fax_privat
    fax_geschaeft
    email
    kein_email
    bemerkungen
    account_id
    kommerziell
    info
    aktiv
  }
`
export const personFelder = gql`
  fragment PersonFelderFields on person_felder {
    person_id
    ar_name_deutsch
    ga_strasse
    ga_plz
    ga_ort
    ga_geom_point
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
  }
`
export const personFile = gql`
  fragment PersonFileFields on person_file {
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
  }
`
export const sammlung = gql`
  fragment SammlungFields on sammlung {
    id
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
  }
`
export const sammlungFile = gql`
  fragment SammlungFileFields on sammlung_file {
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
    kultur_id
    name
    bemerkungen
  }
`
export const teilzaehlung = gql`
  fragment TeilzaehlungFields on teilzaehlung {
    id
    zaehlung_id
    teilkultur_id
    anzahl_pflanzen
    anzahl_auspflanzbereit
    anzahl_mutterpflanzen
    andere_menge
    auspflanzbereit_beschreibung
    bemerkungen
  }
`
export const zaehlung = gql`
  fragment ZaehlungFields on zaehlung {
    id
    kultur_id
    datum
    ziel
    prognose
    bemerkungen
  }
`
export const artSums = gql`
  fragment ArtSumsFields on art_sums {
    art_id
    action
    geplant
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
    action
    geplant
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
