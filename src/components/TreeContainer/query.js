import gql from 'graphql-tag'

import {
  garten,
  art,
  kultur,
  herkunft,
  lieferung,
  person,
  sammlung,
  kulturInventar,
  kulturEvent,
  zaehlung,
} from '../../utils/fragments'

export default gql`
  query TreeQuery(
    $gartenFilter: garten_bool_exp!
    $kulturFilter: kultur_bool_exp!
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
    garten(
      where: $gartenFilter
      order_by: { personBypersonId: { name: asc_nulls_first } }
    ) {
      ...GartenFields
      personBypersonId @include(if: $isGarten) {
        ...PersonFields
      }
      kultursBygartenId(
        where: $kulturFilter
        order_by: { artByartId: { art_ae_art: { name: asc_nulls_first } } }
      ) @include(if: $isGarten) {
        ...KulturFields
        artByartId {
          ...ArtFields
        }
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
      kultursByartId(
        where: $kulturFilter
        order_by: { artByartId: { art_ae_art: { name: asc_nulls_first } } }
      ) @include(if: $isArt) {
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
    kultur(where: $kulturFilter) {
      ...KulturFields
      artByartId {
        ...ArtFields
      }
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
      gartensBypersonId(
        where: $gartenFilter
        order_by: { personBypersonId: { name: asc_nulls_first } }
      ) @include(if: $isPerson) {
        ...GartenFields
        personBypersonId {
          ...PersonFields
        }
        kultursBygartenId(where: $kulturFilter) @include(if: $isPersonGarten) {
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
  ${garten}
  ${art}
  ${kultur}
  ${herkunft}
  ${lieferung}
  ${person}
  ${sammlung}
  ${kulturInventar}
  ${kulturEvent}
  ${zaehlung}
`
