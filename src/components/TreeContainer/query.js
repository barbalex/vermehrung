import gql from 'graphql-tag'

const gartenFragment = gql`
  fragment GartenFields on garten {
    id
    person_id
    x
    y
    bemerkungen
  }
`
const artFragment = gql`
  fragment ArtFields on art {
    id
    ae_id
    art_ae_art {
      id
      name
    }
  }
`
const kulturFragment = gql`
  fragment KulturFields on kultur {
    id
    art_id
    garten_id
    bemerkungen
  }
`
const herkunftFragment = gql`
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
const lieferungFragment = gql`
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
const personFragment = gql`
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
  }
`
const sammlungFragment = gql`
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
const kulturInventarFragment = gql`
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
const kulturEventFragment = gql`
  fragment KulturEventFields on kultur_event {
    id
    kultur_id
    datum
    event
  }
`
const zaehlungFragment = gql`
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

export default gql`
  query TreeQuery(
    $isArt: Boolean!
    $isArtKultur: Boolean!
    $isArtSammlung: Boolean!
    $isGarten: Boolean!
    $isGartenKultur: Boolean!
    $isHerkunft: Boolean!
    $isHerkunftSammlung: Boolean!
    $isLieferung: Boolean!
    $isPerson: Boolean!
    $isPersonGarten: Boolean!
    $isPersonGartenKultur: Boolean!
    $isPersonSammlung: Boolean!
    $isPersonLieferung: Boolean!
    $isSammlung: Boolean!
    $isSammlungLieferung: Boolean!
    $isSammlungLieferungKultur: Boolean!
    $isKultur: Boolean!
    $isKulturAnLieferung: Boolean!
    $isKulturAusLieferung: Boolean!
    $isWerteListe: Boolean!
  ) {
    garten {
      ...GartenFields
      personBypersonId @include(if: $isGarten) {
        ...PersonFields
      }
      kultursBygartenId @include(if: $isGarten) {
        ...KulturFields
        gartenBygartenId @include(if: $isGartenKultur) {
          ...GartenFields
          personBypersonId {
            ...PersonFields
          }
        }
        kulturEventsBykulturId @include(if: $isGartenKultur) {
          ...KulturEventFields
        }
        kulturInventarsBykulturId @include(if: $isGartenKultur) {
          ...KulturInventarFields
        }
        zaehlungsBykulturId @include(if: $isGartenKultur) {
          ...ZaehlungFields
        }
      }
    }
    art {
      ...ArtFields
      kultursByartId @include(if: $isArt) {
        ...KulturFields
        gartenBygartenId @include(if: $isArtKultur) {
          ...GartenFields
          personBypersonId {
            ...PersonFields
          }
        }
        kulturEventsBykulturId @include(if: $isArtKultur) {
          ...KulturEventFields
        }
        kulturInventarsBykulturId @include(if: $isArtKultur) {
          ...KulturInventarFields
        }
        zaehlungsBykulturId @include(if: $isArtKultur) {
          ...ZaehlungFields
        }
        lieferungsByvonKulturId @include(if: $isArtKultur) {
          ...LieferungFields
          personBypersonId {
            ...PersonFields
          }
          lieferungTypWerteBytyp {
            id
            wert
          }
          lieferungStatusWerteBystatus {
            id
            wert
          }
        }
        lieferungsBynachKulturId @include(if: $isArtKultur) {
          ...LieferungFields
          personBypersonId {
            ...PersonFields
          }
          lieferungTypWerteBytyp {
            id
            wert
          }
          lieferungStatusWerteBystatus {
            id
            wert
          }
        }
      }
      sammlungsByartId @include(if: $isArt) {
        ...SammlungFields
        herkunftByherkunftId @include(if: $isArtSammlung) {
          ...HerkunftFields
        }
        artByartId @include(if: $isArtSammlung) {
          ...ArtFields
        }
        lieferungsByvonSammlungId @include(if: $isArtSammlung) {
          ...LieferungFields
          personBypersonId {
            ...PersonFields
          }
          lieferungTypWerteBytyp {
            id
            wert
          }
          lieferungStatusWerteBystatus {
            id
            wert
          }
          kulturBynachKulturId {
            ...KulturFields
            gartenBygartenId {
              ...GartenFields
              personBypersonId {
                ...PersonFields
              }
            }
            kulturEventsBykulturId {
              ...KulturEventFields
            }
            kulturInventarsBykulturId {
              ...KulturInventarFields
            }
            zaehlungsBykulturId {
              ...ZaehlungFields
            }
          }
        }
      }
    }
    kultur {
      ...KulturFields
      gartenBygartenId @include(if: $isKultur) {
        ...GartenFields
        personBypersonId {
          ...PersonFields
        }
      }
      kulturEventsBykulturId @include(if: $isKultur) {
        ...KulturEventFields
        kulturBykulturId {
          ...KulturFields
        }
      }
      kulturInventarsBykulturId @include(if: $isKultur) {
        ...KulturInventarFields
      }
      zaehlungsBykulturId @include(if: $isKultur) {
        ...ZaehlungFields
      }
      lieferungsByvonKulturId @include(if: $isKultur) {
        ...LieferungFields
        personBypersonId @include(if: $isKulturAusLieferung) {
          ...PersonFields
        }
        lieferungTypWerteBytyp @include(if: $isKulturAusLieferung) {
          id
          wert
        }
        lieferungStatusWerteBystatus @include(if: $isKulturAusLieferung) {
          id
          wert
        }
      }
      lieferungsBynachKulturId @include(if: $isKultur) {
        ...LieferungFields
        personBypersonId @include(if: $isKulturAnLieferung) {
          ...PersonFields
        }
        lieferungTypWerteBytyp @include(if: $isKulturAnLieferung) {
          id
          wert
        }
        lieferungStatusWerteBystatus @include(if: $isKulturAnLieferung) {
          id
          wert
        }
      }
    }
    herkunft {
      ...HerkunftFields
      sammlungsByherkunftId @include(if: $isHerkunft) {
        ...SammlungFields
        artByartId @include(if: $isHerkunftSammlung) {
          ...ArtFields
        }
        lieferungsByvonSammlungId @include(if: $isHerkunftSammlung) {
          ...LieferungFields
          personBypersonId {
            ...PersonFields
          }
          lieferungTypWerteBytyp {
            id
            wert
          }
          lieferungStatusWerteBystatus {
            id
            wert
          }
          kulturBynachKulturId {
            ...KulturFields
            gartenBygartenId {
              ...GartenFields
              personBypersonId {
                ...PersonFields
              }
            }
            kulturEventsBykulturId {
              ...KulturEventFields
            }
            kulturInventarsBykulturId {
              ...KulturInventarFields
            }
            zaehlungsBykulturId {
              ...ZaehlungFields
            }
          }
        }
      }
    }
    lieferung {
      ...LieferungFields
      personBypersonId @include(if: $isLieferung) {
        ...PersonFields
      }
      lieferungTypWerteBytyp @include(if: $isLieferung) {
        id
        wert
      }
      lieferungStatusWerteBystatus @include(if: $isLieferung) {
        id
        wert
      }
      kulturBynachKulturId @include(if: $isLieferung) {
        ...KulturFields
        gartenBygartenId {
          ...GartenFields
          personBypersonId {
            ...PersonFields
          }
        }
        kulturEventsBykulturId {
          ...KulturEventFields
        }
        kulturInventarsBykulturId {
          ...KulturInventarFields
        }
        zaehlungsBykulturId {
          ...ZaehlungFields
        }
      }
    }
    person {
      ...PersonFields
      gartensBypersonId @include(if: $isPerson) {
        ...GartenFields
        kultursBygartenId @include(if: $isPersonGarten) {
          ...KulturFields
          artByartId {
            ...ArtFields
          }
          kulturEventsBykulturId @include(if: $isPersonGartenKultur) {
            ...KulturEventFields
          }
          kulturInventarsBykulturId @include(if: $isPersonGartenKultur) {
            ...KulturInventarFields
          }
          zaehlungsBykulturId @include(if: $isPersonGartenKultur) {
            ...ZaehlungFields
          }
          lieferungsByvonKulturId @include(if: $isPersonGartenKultur) {
            ...LieferungFields
            personBypersonId {
              ...PersonFields
            }
            lieferungTypWerteBytyp {
              id
              wert
            }
            lieferungStatusWerteBystatus {
              id
              wert
            }
          }
          lieferungsBynachKulturId @include(if: $isPersonGartenKultur) {
            ...LieferungFields
            personBypersonId {
              ...PersonFields
            }
            lieferungTypWerteBytyp {
              id
              wert
            }
            lieferungStatusWerteBystatus {
              id
              wert
            }
          }
        }
      }
      sammlungsBypersonId @include(if: $isPerson) {
        ...SammlungFields
        artByartId @include(if: $isPersonSammlung) {
          ...ArtFields
        }
        herkunftByherkunftId @include(if: $isPersonSammlung) {
          ...HerkunftFields
        }
      }
      lieferungsBypersonId @include(if: $isPerson) {
        ...LieferungFields
        lieferungTypWerteBytyp @include(if: $isPersonLieferung) {
          id
          wert
        }
        lieferungStatusWerteBystatus @include(if: $isPersonLieferung) {
          id
          wert
        }
        kulturBynachKulturId @include(if: $isPersonLieferung) {
          ...KulturFields
          artByartId {
            ...ArtFields
          }
          gartenBygartenId {
            ...GartenFields
            personBypersonId {
              ...PersonFields
            }
          }
        }
      }
    }
    sammlung {
      ...SammlungFields
      artByartId @include(if: $isSammlung) {
        ...ArtFields
      }
      herkunftByherkunftId @include(if: $isSammlung) {
        ...HerkunftFields
      }
      personBypersonId @include(if: $isSammlung) {
        ...PersonFields
      }
      lieferungsByvonSammlungId @include(if: $isSammlung) {
        ...LieferungFields
        personBypersonId @include(if: $isSammlungLieferung) {
          ...PersonFields
        }
        lieferungTypWerteBytyp @include(if: $isSammlungLieferung) {
          id
          wert
        }
        lieferungStatusWerteBystatus @include(if: $isSammlungLieferung) {
          id
          wert
        }
        kulturBynachKulturId {
          ...KulturFields
          gartenBygartenId @include(if: $isSammlungLieferungKultur) {
            ...GartenFields
            personBypersonId {
              ...PersonFields
            }
          }
          kulturEventsBykulturId @include(if: $isSammlungLieferungKultur) {
            ...KulturEventFields
          }
          kulturInventarsBykulturId @include(if: $isSammlungLieferungKultur) {
            ...KulturInventarFields
          }
          zaehlungsBykulturId @include(if: $isSammlungLieferungKultur) {
            ...ZaehlungFields
          }
          lieferungsByvonKulturId @include(if: $isSammlungLieferungKultur) {
            ...LieferungFields
            personBypersonId {
              ...PersonFields
            }
            lieferungTypWerteBytyp {
              id
              wert
            }
            lieferungStatusWerteBystatus {
              id
              wert
            }
          }
          lieferungsBynachKulturId @include(if: $isSammlungLieferungKultur) {
            ...LieferungFields
            personBypersonId {
              ...PersonFields
            }
            lieferungTypWerteBytyp {
              id
              wert
            }
            lieferungStatusWerteBystatus {
              id
              wert
            }
          }
        }
      }
    }
    masseinheit_werte @include(if: $isWerteListe) {
      id
      wert
      sort
    }
    zaehleinheit_werte @include(if: $isWerteListe) {
      id
      wert
      sort
    }
    lieferung_zwischenlager_werte @include(if: $isWerteListe) {
      id
      wert
      sort
    }
    lieferung_status_werte @include(if: $isWerteListe) {
      id
      wert
      sort
    }
    lieferung_typ_werte @include(if: $isWerteListe) {
      id
      wert
      sort
    }
  }
  ${gartenFragment}
  ${artFragment}
  ${kulturFragment}
  ${herkunftFragment}
  ${lieferungFragment}
  ${personFragment}
  ${sammlungFragment}
  ${kulturInventarFragment}
  ${kulturEventFragment}
  ${zaehlungFragment}
`
