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
    $artFilter: art_bool_exp!
    $gartenFilter: garten_bool_exp!
    $kulturFilter: kultur_bool_exp!
    $kulturEventFilter: kultur_event_bool_exp!
    $kulturInventarFilter: kultur_inventar_bool_exp!
    $herkunftFilter: herkunft_bool_exp!
    $personFilter: person_bool_exp!
    $sammlungFilter: sammlung_bool_exp!
    $zaehlungFilter: zaehlung_bool_exp!
    $lieferungFilter: lieferung_bool_exp!
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
      order_by: { person: { name: asc_nulls_first } }
    ) {
      ...GartenFields
      person @include(if: $isGarten) {
        ...PersonFields
      }
      kulturs(
        where: $kulturFilter
        order_by: { art: { art_ae_art: { name: asc_nulls_first } } }
      ) @include(if: $isGarten) {
        ...KulturFields
        art {
          ...ArtFields
        }
        garten @include(if: $isGartenKultur) {
          ...GartenFields
          person {
            ...PersonFields
          }
        }
        kultur_events(
          where: $kulturEventFilter
          #order_by: [{ datum: desc_nulls_first }, { event: asc }] errors???
          order_by: { datum: desc_nulls_first }
        ) @include(if: $isGartenKultur) {
          ...KulturEventFields
        }
        kultur_inventars(
          where: $kulturInventarFilter
          order_by: { datum: desc_nulls_first }
        ) @include(if: $isGartenKultur) {
          ...KulturInventarFields
        }
        zaehlungs(
          where: $zaehlungFilter
          order_by: { datum: desc_nulls_first }
        ) @include(if: $isGartenKultur) {
          ...ZaehlungFields
        }
      }
    }
    art(
      where: $artFilter
      order_by: { art_ae_art: { name: asc_nulls_first } }
    ) {
      ...ArtFields
      kulturs(
        where: $kulturFilter
        order_by: { art: { art_ae_art: { name: asc_nulls_first } } }
      ) @include(if: $isArt) {
        ...KulturFields
        garten @include(if: $isArtKultur) {
          ...GartenFields
          person {
            ...PersonFields
          }
        }
        kultur_events(
          where: $kulturEventFilter
          order_by: { datum: desc_nulls_first }
        ) @include(if: $isArtKultur) {
          ...KulturEventFields
        }
        kultur_inventars(
          where: $kulturInventarFilter
          order_by: { datum: desc_nulls_first }
        ) @include(if: $isArtKultur) {
          ...KulturInventarFields
        }
        zaehlungs(
          where: $zaehlungFilter
          order_by: { datum: desc_nulls_first }
        ) @include(if: $isArtKultur) {
          ...ZaehlungFields
        }
        lieferungsByVonKulturId(
          where: $lieferungFilter
          order_by: { von_datum: desc_nulls_first }
        ) @include(if: $isArtKultur) {
          ...LieferungFields
          person {
            ...PersonFields
          }
        }
        lieferungsByNachKulturId(
          where: $lieferungFilter
          order_by: { nach_datum: desc_nulls_first }
        ) @include(if: $isArtKultur) {
          ...LieferungFields
          person {
            ...PersonFields
          }
        }
      }
      sammlungs(where: $sammlungFilter, order_by: { datum: desc_nulls_first })
        @include(if: $isArt) {
        ...SammlungFields
        herkunft @include(if: $isArtSammlung) {
          ...HerkunftFields
        }
        art @include(if: $isArtSammlung) {
          ...ArtFields
        }
        lieferungs(
          where: $lieferungFilter
          order_by: { von_datum: desc_nulls_first }
        ) @include(if: $isArtSammlung) {
          ...LieferungFields
          person {
            ...PersonFields
          }
          kulturByNachKulturId {
            ...KulturFields
            garten {
              ...GartenFields
              person {
                ...PersonFields
              }
            }
            kultur_events(
              where: $kulturEventFilter
              order_by: { datum: desc_nulls_first }
            ) {
              ...KulturEventFields
            }
            kultur_inventars(
              where: $kulturInventarFilter
              order_by: { datum: desc_nulls_first }
            ) {
              ...KulturInventarFields
            }
            zaehlungs(
              where: $zaehlungFilter
              order_by: { datum: desc_nulls_first }
            ) {
              ...ZaehlungFields
            }
          }
        }
      }
    }
    kultur(
      where: $kulturFilter
      order_by: [
        { garten: { person: { name: asc_nulls_first } } }
        { art: { art_ae_art: { name: asc_nulls_first } } }
      ]
    ) {
      ...KulturFields
      art {
        ...ArtFields
      }
      garten @include(if: $isKultur) {
        ...GartenFields
        person {
          ...PersonFields
        }
      }
      kultur_events(
        where: $kulturEventFilter
        order_by: { datum: desc_nulls_first }
      ) @include(if: $isKultur) {
        ...KulturEventFields
        kultur {
          ...KulturFields
        }
      }
      kultur_inventars(
        where: $kulturInventarFilter
        order_by: { datum: desc_nulls_first }
      ) @include(if: $isKultur) {
        ...KulturInventarFields
      }
      zaehlungs(where: $zaehlungFilter, order_by: { datum: desc_nulls_first })
        @include(if: $isKultur) {
        ...ZaehlungFields
      }
      lieferungsByVonKulturId(
        where: $lieferungFilter
        order_by: { von_datum: desc_nulls_first }
      ) @include(if: $isKultur) {
        ...LieferungFields
        person @include(if: $isKulturAusLieferung) {
          ...PersonFields
        }
      }
      lieferungsByNachKulturId(
        where: $lieferungFilter
        order_by: { nach_datum: desc_nulls_first }
      ) @include(if: $isKultur) {
        ...LieferungFields
        person @include(if: $isKulturAnLieferung) {
          ...PersonFields
        }
      }
    }
    herkunft(
      where: $herkunftFilter
      order_by: [{ nr: asc_nulls_first }, { lokalname: asc_nulls_first }]
    ) {
      ...HerkunftFields
      sammlungs(where: $sammlungFilter, order_by: { datum: desc_nulls_first })
        @include(if: $isHerkunft) {
        ...SammlungFields
        art @include(if: $isHerkunftSammlung) {
          ...ArtFields
        }
        lieferungs(
          where: $lieferungFilter
          order_by: { von_datum: desc_nulls_first }
        ) @include(if: $isHerkunftSammlung) {
          ...LieferungFields
          person {
            ...PersonFields
          }
          kulturByNachKulturId {
            ...KulturFields
            garten {
              ...GartenFields
              person {
                ...PersonFields
              }
            }
            kultur_events {
              ...KulturEventFields
            }
            kultur_inventars {
              ...KulturInventarFields
            }
            zaehlungs(
              where: $zaehlungFilter
              order_by: { datum: desc_nulls_first }
            ) {
              ...ZaehlungFields
            }
          }
        }
      }
    }
    lieferung(
      where: $lieferungFilter
      order_by: { von_datum: desc_nulls_first }
    ) {
      ...LieferungFields
      person @include(if: $isLieferung) {
        ...PersonFields
      }
      kulturByNachKulturId @include(if: $isLieferung) {
        ...KulturFields
        garten {
          ...GartenFields
          person {
            ...PersonFields
          }
        }
        kultur_events {
          ...KulturEventFields
        }
        kultur_inventars {
          ...KulturInventarFields
        }
        zaehlungs {
          ...ZaehlungFields
        }
      }
    }
    person(where: $personFilter, order_by: { name: asc_nulls_first }) {
      ...PersonFields
      gartens(
        where: $gartenFilter
        order_by: { person: { name: asc_nulls_first } }
      ) @include(if: $isPerson) {
        ...GartenFields
        person {
          ...PersonFields
        }
        kulturs(
          where: $kulturFilter
          order_by: { art: { art_ae_art: { name: asc_nulls_first } } }
        ) @include(if: $isPersonGarten) {
          ...KulturFields
          art {
            ...ArtFields
          }
          kultur_events @include(if: $isPersonGartenKultur) {
            ...KulturEventFields
          }
          kultur_inventars @include(if: $isPersonGartenKultur) {
            ...KulturInventarFields
          }
          zaehlungs @include(if: $isPersonGartenKultur) {
            ...ZaehlungFields
          }
          lieferungsByVonKulturId @include(if: $isPersonGartenKultur) {
            ...LieferungFields
            person {
              ...PersonFields
            }
          }
          lieferungsByNachKulturId(
            where: $lieferungFilter
            order_by: { nach_datum: desc_nulls_first }
          ) @include(if: $isPersonGartenKultur) {
            ...LieferungFields
            person {
              ...PersonFields
            }
          }
        }
      }
      sammlungs(where: $sammlungFilter, order_by: { datum: desc_nulls_first })
        @include(if: $isPerson) {
        ...SammlungFields
        art @include(if: $isPersonSammlung) {
          ...ArtFields
        }
        herkunft @include(if: $isPersonSammlung) {
          ...HerkunftFields
        }
      }
      lieferungs @include(if: $isPerson) {
        ...LieferungFields
        kulturByNachKulturId @include(if: $isPersonLieferung) {
          ...KulturFields
          art {
            ...ArtFields
          }
          garten {
            ...GartenFields
            person {
              ...PersonFields
            }
          }
        }
      }
    }
    sammlung(where: $sammlungFilter, order_by: { datum: desc_nulls_first }) {
      ...SammlungFields
      art @include(if: $isSammlung) {
        ...ArtFields
      }
      herkunft @include(if: $isSammlung) {
        ...HerkunftFields
      }
      person @include(if: $isSammlung) {
        ...PersonFields
      }
      lieferungs @include(if: $isSammlung) {
        ...LieferungFields
        person @include(if: $isSammlungLieferung) {
          ...PersonFields
        }
        kulturByNachKulturId {
          ...KulturFields
          garten @include(if: $isSammlungLieferungKultur) {
            ...GartenFields
            person {
              ...PersonFields
            }
          }
          kultur_events @include(if: $isSammlungLieferungKultur) {
            ...KulturEventFields
          }
          kultur_inventars @include(if: $isSammlungLieferungKultur) {
            ...KulturInventarFields
          }
          zaehlungs @include(if: $isSammlungLieferungKultur) {
            ...ZaehlungFields
          }
          lieferungsByVonKulturId @include(if: $isSammlungLieferungKultur) {
            ...LieferungFields
            person {
              ...PersonFields
            }
          }
          lieferungsByNachKulturId @include(if: $isSammlungLieferungKultur) {
            ...LieferungFields
            person {
              ...PersonFields
            }
          }
        }
      }
    }
    masseinheit_werte(order_by: [{ sort: asc }, { wert: asc }])
      @include(if: $isWerteListe) {
      id
      wert
      sort
    }
    zaehleinheit_werte(order_by: [{ sort: asc }, { wert: asc }])
      @include(if: $isWerteListe) {
      id
      wert
      sort
    }
    lieferung_zwischenlager_werte(order_by: [{ sort: asc }, { wert: asc }])
      @include(if: $isWerteListe) {
      id
      wert
      sort
    }
    lieferung_status_werte(order_by: [{ sort: asc }, { wert: asc }])
      @include(if: $isWerteListe) {
      id
      wert
      sort
    }
    lieferung_typ_werte(order_by: [{ sort: asc }, { wert: asc }])
      @include(if: $isWerteListe) {
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
