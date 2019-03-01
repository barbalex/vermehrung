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
          id
          datum
          event
        }
        kulturInventarsBykulturId @include(if: $isGartenKultur) {
          id
          datum
          kasten
          beet
          nr
        }
        zaehlungsBykulturId @include(if: $isGartenKultur) {
          id
          datum
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
          id
          datum
          event
        }
        kulturInventarsBykulturId @include(if: $isArtKultur) {
          id
          datum
          kasten
          beet
          nr
        }
        zaehlungsBykulturId @include(if: $isArtKultur) {
          id
          datum
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
              id
              datum
              event
            }
            kulturInventarsBykulturId {
              id
              datum
              kasten
              beet
              nr
            }
            zaehlungsBykulturId {
              id
              datum
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
        id
        datum
        event
        kultur_id
        kulturBykulturId {
          ...KulturFields
        }
      }
      kulturInventarsBykulturId @include(if: $isKultur) {
        id
        datum
        kasten
        beet
        nr
      }
      zaehlungsBykulturId @include(if: $isKultur) {
        id
        datum
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
              id
              datum
              event
            }
            kulturInventarsBykulturId {
              id
              datum
              kasten
              beet
              nr
            }
            zaehlungsBykulturId {
              id
              datum
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
          id
          datum
          event
        }
        kulturInventarsBykulturId {
          id
          datum
          kasten
          beet
          nr
        }
        zaehlungsBykulturId {
          id
          datum
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
            id
            datum
            event
          }
          kulturInventarsBykulturId @include(if: $isPersonGartenKultur) {
            id
            datum
            kasten
            beet
            nr
          }
          zaehlungsBykulturId @include(if: $isPersonGartenKultur) {
            id
            datum
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
            id
            datum
            event
          }
          kulturInventarsBykulturId @include(if: $isSammlungLieferungKultur) {
            id
            datum
            kasten
            beet
            nr
          }
          zaehlungsBykulturId @include(if: $isSammlungLieferungKultur) {
            id
            datum
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
`
