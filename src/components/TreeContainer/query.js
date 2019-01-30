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
    $isPersonSammlung: Boolean!
    $isPersonLieferung: Boolean!
    $isSammlung: Boolean!
    $isSammlungLieferung: Boolean!
    $isKultur: Boolean!
    $isKulturAnLieferung: Boolean!
    $isKulturAusLieferung: Boolean!
    $isWerteListe: Boolean!
  ) {
    garten {
      id
      personBypersonId @include(if: $isGarten) {
        id
        name
      }
      kultursBygartenId @include(if: $isGarten) {
        id
        gartenBygartenId @include(if: $isGartenKultur) {
          id
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
        gartenBygartenId @include(if: $isArtKultur) {
          id
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
          personBypersonId {
            id
            name
          }
          lieferungTypWerteBytyp {
            id
            wert
          }
          lieferungStatusWerteBystatus {
            id
            wert
          }
          von_datum
        }
        lieferungsBynachKulturId @include(if: $isArtKultur) {
          id
          personBypersonId {
            id
            name
          }
          lieferungTypWerteBytyp {
            id
            wert
          }
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
        datum
        lieferungsByvonSammlungId @include(if: $isArtSammlung) {
          id
          personBypersonId {
            id
            name
          }
          lieferungTypWerteBytyp {
            id
            wert
          }
          lieferungStatusWerteBystatus {
            id
            wert
          }
          von_datum
          kulturBynachKulturId {
            id
            gartenBygartenId {
              id
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
      gartenBygartenId @include(if: $isKultur) {
        id
        personBypersonId {
          id
          name
        }
      }
      kulturEventsBykulturId @include(if: $isKultur) {
        id
        datum
        event
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
        personBypersonId @include(if: $isKulturAusLieferung) {
          id
          name
        }
        lieferungTypWerteBytyp @include(if: $isKulturAusLieferung) {
          id
          wert
        }
        lieferungStatusWerteBystatus @include(if: $isKulturAusLieferung) {
          id
          wert
        }
        von_datum
      }
      lieferungsBynachKulturId @include(if: $isKultur) {
        id
        personBypersonId @include(if: $isKulturAnLieferung) {
          id
          name
        }
        lieferungTypWerteBytyp @include(if: $isKulturAnLieferung) {
          id
          wert
        }
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
        artByartId @include(if: $isHerkunftSammlung) {
          id
          art_ae_art {
            id
            name
          }
        }
        datum
        lieferungsByvonSammlungId @include(if: $isHerkunftSammlung) {
          id
          personBypersonId {
            id
            name
          }
          lieferungTypWerteBytyp {
            id
            wert
          }
          lieferungStatusWerteBystatus {
            id
            wert
          }
          von_datum
          kulturBynachKulturId {
            id
            gartenBygartenId {
              id
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
      personBypersonId @include(if: $isLieferung) {
        id
        name
      }
      lieferungTypWerteBytyp @include(if: $isLieferung) {
        id
        wert
      }
      lieferungStatusWerteBystatus @include(if: $isLieferung) {
        id
        wert
      }
      von_datum
      kulturBynachKulturId @include(if: $isLieferung) {
        id
        gartenBygartenId {
          id
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
          artByartId {
            id
            art_ae_art {
              id
              name
            }
          }
        }
      }
      sammlungsBypersonId @include(if: $isPerson) {
        id
        datum
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
        lieferungTypWerteBytyp @include(if: $isPersonLieferung) {
          id
          wert
        }
        lieferungStatusWerteBystatus @include(if: $isPersonLieferung) {
          id
          wert
        }
        von_datum @include(if: $isPersonLieferung)
        kulturBynachKulturId @include(if: $isPersonLieferung) {
          id
          artByartId {
            id
            art_ae_art {
              id
              name
            }
          }
          gartenBygartenId {
            id
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
      datum
      personBypersonId @include(if: $isSammlung) {
        id
        name
      }
      lieferungsByvonSammlungId @include(if: $isSammlung) {
        id
        von_datum @include(if: $isSammlungLieferung)
        lieferungTypWerteBytyp @include(if: $isSammlungLieferung) {
          id
          wert
        }
        lieferungStatusWerteBystatus @include(if: $isSammlungLieferung) {
          id
          wert
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
