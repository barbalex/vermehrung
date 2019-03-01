import gql from 'graphql-tag'

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
      id
      person_id
      personBypersonId @include(if: $isGarten) {
        id
        name
      }
      kultursBygartenId @include(if: $isGarten) {
        id
        garten_id
        gartenBygartenId @include(if: $isGartenKultur) {
          id
          person_id
          personBypersonId {
            id
            name
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
      art_ae_art @include(if: $isArt) {
        id
        name
      }
      id
      ae_id
      kultursByartId @include(if: $isArt) {
        id
        garten_id
        gartenBygartenId @include(if: $isArtKultur) {
          id
          person_id
          personBypersonId {
            id
            name
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
          id
          person_id
          personBypersonId {
            id
            name
          }
          typ
          lieferungTypWerteBytyp {
            id
            wert
          }
          status
          lieferungStatusWerteBystatus {
            id
            wert
          }
          von_datum
        }
        lieferungsBynachKulturId @include(if: $isArtKultur) {
          id
          person_id
          personBypersonId {
            id
            name
          }
          typ
          lieferungTypWerteBytyp {
            id
            wert
          }
          status
          lieferungStatusWerteBystatus {
            id
            wert
          }
          nach_datum
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
          id
          nr
        }
        artByartId @include(if: $isArtSammlung) {
          id
          art_ae_art {
            id
            name
          }
        }
        lieferungsByvonSammlungId @include(if: $isArtSammlung) {
          id
          person_id
          personBypersonId {
            id
            name
          }
          typ
          lieferungTypWerteBytyp {
            id
            wert
          }
          status
          lieferungStatusWerteBystatus {
            id
            wert
          }
          von_datum
          nach_kultur_id
          kulturBynachKulturId {
            id
            garten_id
            gartenBygartenId {
              id
              person_id
              personBypersonId {
                id
                name
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
          nach_ausgepflanzt
        }
      }
    }
    kultur {
      id
      garten_id
      gartenBygartenId @include(if: $isKultur) {
        id
        person_id
        personBypersonId {
          id
          name
        }
      }
      kulturEventsBykulturId @include(if: $isKultur) {
        id
        datum
        event
        kultur_id
        kulturBykulturId {
          id
          art_id
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
        id
        person_id
        personBypersonId @include(if: $isKulturAusLieferung) {
          id
          name
        }
        typ
        lieferungTypWerteBytyp @include(if: $isKulturAusLieferung) {
          id
          wert
        }
        status
        lieferungStatusWerteBystatus @include(if: $isKulturAusLieferung) {
          id
          wert
        }
        von_datum
      }
      lieferungsBynachKulturId @include(if: $isKultur) {
        id
        person_id
        personBypersonId @include(if: $isKulturAnLieferung) {
          id
          name
        }
        typ
        lieferungTypWerteBytyp @include(if: $isKulturAnLieferung) {
          id
          wert
        }
        status
        lieferungStatusWerteBystatus @include(if: $isKulturAnLieferung) {
          id
          wert
        }
        nach_datum
      }
    }
    herkunft {
      id
      lokalname
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
          id
          art_ae_art {
            id
            name
          }
        }
        lieferungsByvonSammlungId @include(if: $isHerkunftSammlung) {
          id
          person_id
          personBypersonId {
            id
            name
          }
          typ
          lieferungTypWerteBytyp {
            id
            wert
          }
          status
          lieferungStatusWerteBystatus {
            id
            wert
          }
          von_datum
          nach_kultur_id
          kulturBynachKulturId {
            id
            garten_id
            gartenBygartenId {
              id
              person_id
              personBypersonId {
                id
                name
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
          nach_ausgepflanzt
        }
      }
    }
    lieferung {
      id
      person_id
      art_id
      personBypersonId @include(if: $isLieferung) {
        id
        name
      }
      typ
      lieferungTypWerteBytyp @include(if: $isLieferung) {
        id
        wert
      }
      status
      lieferungStatusWerteBystatus @include(if: $isLieferung) {
        id
        wert
      }
      von_datum
      von_sammlung_id
      von_kultur_id
      nach_kultur_id
      kulturBynachKulturId @include(if: $isLieferung) {
        id
        garten_id
        gartenBygartenId {
          id
          person_id
          personBypersonId {
            id
            name
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
      nach_ausgepflanzt
    }
    person {
      id
      name
      gartensBypersonId @include(if: $isPerson) {
        id
        kultursBygartenId @include(if: $isPersonGarten) {
          id
          art_id
          artByartId {
            id
            art_ae_art {
              id
              name
            }
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
            id
            person_id
            personBypersonId {
              id
              name
            }
            typ
            lieferungTypWerteBytyp {
              id
              wert
            }
            status
            lieferungStatusWerteBystatus {
              id
              wert
            }
            von_datum
          }
          lieferungsBynachKulturId @include(if: $isPersonGartenKultur) {
            id
            person_id
            personBypersonId {
              id
              name
            }
            typ
            lieferungTypWerteBytyp {
              id
              wert
            }
            status
            lieferungStatusWerteBystatus {
              id
              wert
            }
            nach_datum
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
          id
          art_ae_art {
            id
            name
          }
        }
        herkunftByherkunftId @include(if: $isPersonSammlung) {
          id
          nr
        }
      }
      lieferungsBypersonId @include(if: $isPerson) {
        id
        typ
        lieferungTypWerteBytyp @include(if: $isPersonLieferung) {
          id
          wert
        }
        status
        lieferungStatusWerteBystatus @include(if: $isPersonLieferung) {
          id
          wert
        }
        von_datum @include(if: $isPersonLieferung)
        nach_kultur_id
        kulturBynachKulturId @include(if: $isPersonLieferung) {
          id
          art_id
          artByartId {
            id
            art_ae_art {
              id
              name
            }
          }
          garten_id
          gartenBygartenId {
            id
            person_id
            personBypersonId {
              id
              name
            }
          }
        }
        nach_ausgepflanzt @include(if: $isPersonLieferung)
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
        id
        art_ae_art {
          id
          name
        }
      }
      herkunftByherkunftId @include(if: $isSammlung) {
        id
        nr
      }
      personBypersonId @include(if: $isSammlung) {
        id
        name
      }
      lieferungsByvonSammlungId @include(if: $isSammlung) {
        id
        von_datum @include(if: $isSammlungLieferung)
        person_id @include(if: $isSammlungLieferung)
        personBypersonId @include(if: $isSammlungLieferung) {
          id
          name
        }
        typ @include(if: $isSammlungLieferung)
        lieferungTypWerteBytyp @include(if: $isSammlungLieferung) {
          id
          wert
        }
        status @include(if: $isSammlungLieferung)
        lieferungStatusWerteBystatus @include(if: $isSammlungLieferung) {
          id
          wert
        }
        nach_kultur_id
        kulturBynachKulturId {
          id
          garten_id
          gartenBygartenId @include(if: $isSammlungLieferungKultur) {
            id
            person_id
            personBypersonId {
              id
              name
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
            id
            person_id
            personBypersonId {
              id
              name
            }
            typ
            lieferungTypWerteBytyp {
              id
              wert
            }
            status
            lieferungStatusWerteBystatus {
              id
              wert
            }
            von_datum
          }
          lieferungsBynachKulturId @include(if: $isSammlungLieferungKultur) {
            id
            person_id
            personBypersonId {
              id
              name
            }
            typ
            lieferungTypWerteBytyp {
              id
              wert
            }
            status
            lieferungStatusWerteBystatus {
              id
              wert
            }
            nach_datum
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
`
