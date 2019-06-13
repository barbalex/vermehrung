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
    aktiv
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
    herkunft_id
    garten_id
    zwischenlager
    erhaltungskultur
    von_anzahl_individuen
    aktiv
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
    anzahl_auspflanzbereit
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
    herkunft_id
    person_id
    von_datum
    von_sammlung_id
    von_kultur_id
    nach_datum
    nach_kultur_id
    nach_ausgepflanzt
    von_anzahl_individuen
    anzahl_pflanzen
    anzahl_auspflanzbereit
    menge_beschrieben
    ausgefuehrt
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
    account_id
    kommerziell
    info
    aktiv
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
    anzahl_auspflanzbereit
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
    anzahl_auspflanzbereit
    anz_bluehend
    bluehdatum
    instruktion
    bemerkungen
  }
`
