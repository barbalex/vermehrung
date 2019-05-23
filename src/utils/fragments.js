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
export const aeArt = gql`
  fragment AeArtFields on ae_art {
    id
    name
  }
`
export const garten = gql`
  fragment GartenFields on garten {
    id
    person_id
    x
    y
    bemerkungen
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
    x
    y
    bemerkungen
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
    garten_id
    bemerkungen
  }
`
export const kulturEvent = gql`
  fragment KulturEventFields on kultur_event {
    id
    kultur_id
    datum
    event
  }
`
export const kulturInventar = gql`
  fragment KulturInventarFields on kultur_inventar {
    id
    kultur_id
    datum
    kasten
    beet
    nr
    anzahl_pflanzen
    anz_mutter_pflanzen
    anz_nicht_auspflanzbereit
    anz_auspflanzbereit
    anz_bluehend
    bluehdatum
    instruktion
    bemerkungen
  }
`
export const lieferung = gql`
  fragment LieferungFields on lieferung {
    id
    art_id
    person_id
    typ
    zaehleinheit
    menge
    masseinheit
    von_datum
    von_sammlung_id
    von_kultur_id
    zwischenlager
    nach_datum
    nach_kultur_id
    nach_ausgepflanzt
    status
    bemerkungen
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
    user_id
    account_id
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
    zaehleinheit
    menge
    masseinheit
    bemerkungen
  }
`
export const zaehlung = gql`
  fragment ZaehlungFields on zaehlung {
    id
    kultur_id
    datum
    anzahl_pflanzen
    anz_mutter_pflanzen
    anz_nicht_auspflanzbereit
    anz_auspflanzbereit
    anz_bluehend
    bluehdatum
    instruktion
    bemerkungen
  }
`
