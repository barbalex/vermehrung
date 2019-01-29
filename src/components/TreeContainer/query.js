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
    $isSammlungKultur: Boolean!
    $isSammlungLieferung: Boolean!
    $isKultur: Boolean!
    $isKulturZuLieferung: Boolean!
    $isKulturAbLieferung: Boolean!
    $isKulturSammlung: Boolean!
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
        sammlungInKultursBykulturId @include(if: $isGartenKultur) {
          id
          sammlungBysammlungId {
            id
            herkunftByherkunftId {
              id
              nr
            }
            lieferungsByvonSammlungId {
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
        sammlungInKultursBykulturId @include(if: $isArtKultur) {
          id
          sammlungBysammlungId {
            id
            herkunftByherkunftId {
              id
              nr
            }
            lieferungsByvonSammlungId {
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
      }
      sammlungsByartId @include(if: $isArt) {
        id
        art_id
        herkunftByherkunftId @include(if: $isArtKultur) {
          id
          nr
        }
        artByartId @include(if: $isArtKultur) {
          id
          art_ae_art {
            id
            name
          }
        }
        datum
        sammlungInKultursBysammlungId @include(if: $isArtKultur) {
          id
          kulturBykulturId {
            id
            gartenBygartenId {
              id
              personBypersonId {
                id
                name
              }
            }
          }
        }
        lieferungsByvonSammlungId @include(if: $isArtKultur) {
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
        personBypersonId @include(if: $isKulturAbLieferung) {
          id
          name
        }
        lieferungTypWerteBytyp @include(if: $isKulturAbLieferung) {
          id
          wert
        }
        lieferungStatusWerteBystatus @include(if: $isKulturAbLieferung) {
          id
          wert
        }
        von_datum
      }
      lieferungsBynachKulturId @include(if: $isKultur) {
        id
        personBypersonId @include(if: $isKulturZuLieferung) {
          id
          name
        }
        lieferungTypWerteBytyp @include(if: $isKulturZuLieferung) {
          id
          wert
        }
        lieferungStatusWerteBystatus @include(if: $isKulturZuLieferung) {
          id
          wert
        }
        nach_datum
      }
      sammlungInKultursBykulturId @include(if: $isKultur) {
        id
        sammlungBysammlungId @include(if: $isKulturSammlung) {
          id
          herkunftByherkunftId {
            id
            nr
          }
          lieferungsByvonSammlungId {
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
        sammlungInKultursBysammlungId @include(if: $isHerkunftSammlung) {
          id
          kulturBykulturId {
            id
            gartenBygartenId {
              id
              personBypersonId {
                id
                name
              }
            }
          }
        }
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
      sammlungInKultursBysammlungId @include(if: $isSammlung) {
        id
        kulturBykulturId @include(if: $isSammlungKultur) {
          id
          gartenBygartenId {
            id
            personBypersonId {
              id
              name
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
`
