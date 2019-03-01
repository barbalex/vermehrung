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
      x
      y
      bemerkungen
      personBypersonId @include(if: $isGarten) {
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
      kultursBygartenId @include(if: $isGarten) {
        id
        art_id
        garten_id
        bemerkungen
        gartenBygartenId @include(if: $isGartenKultur) {
          id
          person_id
          x
          y
          bemerkungen
          personBypersonId {
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
      id
      ae_id
      art_ae_art @include(if: $isArt) {
        id
        name
      }
      kultursByartId @include(if: $isArt) {
        id
        art_id
        garten_id
        bemerkungen
        gartenBygartenId @include(if: $isArtKultur) {
          id
          person_id
          x
          y
          bemerkungen
          personBypersonId {
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
          personBypersonId {
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
          personBypersonId {
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
        artByartId @include(if: $isArtSammlung) {
          id
          ae_id
          art_ae_art {
            id
            name
          }
        }
        lieferungsByvonSammlungId @include(if: $isArtSammlung) {
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
          personBypersonId {
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
          lieferungTypWerteBytyp {
            id
            wert
          }
          lieferungStatusWerteBystatus {
            id
            wert
          }
          kulturBynachKulturId {
            id
            art_id
            garten_id
            bemerkungen
            gartenBygartenId {
              id
              person_id
              x
              y
              bemerkungen
              personBypersonId {
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
      id
      art_id
      garten_id
      bemerkungen
      gartenBygartenId @include(if: $isKultur) {
        id
        person_id
        x
        y
        bemerkungen
        personBypersonId {
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
      }
      kulturEventsBykulturId @include(if: $isKultur) {
        id
        datum
        event
        kultur_id
        kulturBykulturId {
          id
          art_id
          garten_id
          bemerkungen
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
        personBypersonId @include(if: $isKulturAusLieferung) {
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
        personBypersonId @include(if: $isKulturAnLieferung) {
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
      id
      nr
      lokalname
      gemeinde
      kanton
      land
      x
      y
      bemerkungen
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
          ae_id
          art_ae_art {
            id
            name
          }
        }
        lieferungsByvonSammlungId @include(if: $isHerkunftSammlung) {
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
          personBypersonId {
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
          lieferungTypWerteBytyp {
            id
            wert
          }
          lieferungStatusWerteBystatus {
            id
            wert
          }
          kulturBynachKulturId {
            id
            art_id
            garten_id
            bemerkungen
            gartenBygartenId {
              id
              person_id
              x
              y
              bemerkungen
              personBypersonId {
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
      personBypersonId @include(if: $isLieferung) {
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
      lieferungTypWerteBytyp @include(if: $isLieferung) {
        id
        wert
      }
      lieferungStatusWerteBystatus @include(if: $isLieferung) {
        id
        wert
      }
      kulturBynachKulturId @include(if: $isLieferung) {
        id
        art_id
        garten_id
        bemerkungen
        gartenBygartenId {
          id
          person_id
          x
          y
          bemerkungen
          personBypersonId {
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
      gartensBypersonId @include(if: $isPerson) {
        id
        person_id
        x
        y
        bemerkungen
        kultursBygartenId @include(if: $isPersonGarten) {
          id
          art_id
          garten_id
          bemerkungen
          artByartId {
            id
            ae_id
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
            personBypersonId {
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
            personBypersonId {
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
          id
          ae_id
          art_ae_art {
            id
            name
          }
        }
        herkunftByherkunftId @include(if: $isPersonSammlung) {
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
      }
      lieferungsBypersonId @include(if: $isPerson) {
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
        lieferungTypWerteBytyp @include(if: $isPersonLieferung) {
          id
          wert
        }
        lieferungStatusWerteBystatus @include(if: $isPersonLieferung) {
          id
          wert
        }
        kulturBynachKulturId @include(if: $isPersonLieferung) {
          id
          art_id
          garten_id
          bemerkungen
          artByartId {
            id
            ae_id
            art_ae_art {
              id
              name
            }
          }
          gartenBygartenId {
            id
            person_id
            x
            y
            bemerkungen
            personBypersonId {
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
        id
        ae_id
        art_ae_art {
          id
          name
        }
      }
      herkunftByherkunftId @include(if: $isSammlung) {
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
      personBypersonId @include(if: $isSammlung) {
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
      lieferungsByvonSammlungId @include(if: $isSammlung) {
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
        personBypersonId @include(if: $isSammlungLieferung) {
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
        lieferungTypWerteBytyp @include(if: $isSammlungLieferung) {
          id
          wert
        }
        lieferungStatusWerteBystatus @include(if: $isSammlungLieferung) {
          id
          wert
        }
        kulturBynachKulturId {
          id
          art_id
          garten_id
          bemerkungen
          gartenBygartenId @include(if: $isSammlungLieferungKultur) {
            id
            person_id
            x
            y
            bemerkungen
            personBypersonId {
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
            personBypersonId {
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
            personBypersonId {
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
`
