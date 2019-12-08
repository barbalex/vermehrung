import gql from 'graphql-tag'

import {
  art,
  event,
  garten,
  herkunft,
  kultur,
  kulturFelder,
  lieferung,
  sammelLieferung,
  person,
  sammlung,
  teilkultur,
  zaehlung,
} from '../../utils/fragments'

export default gql`
  query TreeQuery(
    $artFilter: art_bool_exp!
    $eventFilter: event_bool_exp!
    $gartenFilter: garten_bool_exp!
    $kulturFilter: kultur_bool_exp!
    $herkunftFilter: herkunft_bool_exp!
    $personFilter: person_bool_exp!
    $sammlungFilter: sammlung_bool_exp!
    $teilkulturFilter: teilkultur_bool_exp!
    $zaehlungFilter: zaehlung_bool_exp!
    $lieferungFilter: lieferung_bool_exp!
    $sammelLieferungFilter: sammel_lieferung_bool_exp!
    $isArt: Boolean!
    $isEvent: Boolean!
    $isArtKultur: Boolean!
    $isArtSammlung: Boolean!
    $isGarten: Boolean!
    $isGartenKultur: Boolean!
    $isHerkunft: Boolean!
    $isHerkunftSammlung: Boolean!
    $isLieferung: Boolean!
    $isSammelLieferung: Boolean!
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
    $isTeilkultur: Boolean!
    $isWerteListe: Boolean!
  ) {
    garten(
      where: $gartenFilter
      order_by: [
        { name: asc_nulls_first }
        { person: { name: asc_nulls_first } }
      ]
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
        herkunft {
          id
          nr
        }
        art {
          ...ArtFields
        }
        garten @include(if: $isGartenKultur) {
          ...GartenFields
          person {
            ...PersonFields
          }
        }
        events(
          where: $eventFilter
          order_by: { datum: desc_nulls_first, beschreibung: asc_nulls_first }
        ) @include(if: $isGartenKultur) {
          ...EventFields
        }
        zaehlungs(
          where: $zaehlungFilter
          order_by: { datum: desc_nulls_first }
        ) @include(if: $isGartenKultur) {
          ...ZaehlungFields
          teilzaehlungs_aggregate {
            aggregate {
              sum {
                anzahl_pflanzen
                anzahl_auspflanzbereit
                anzahl_mutterpflanzen
              }
            }
          }
        }
        lieferungsByVonKulturId(
          where: $lieferungFilter
          order_by: { datum: desc_nulls_first }
        ) @include(if: $isGartenKultur) {
          ...LieferungFields
        }
        lieferungsByNachKulturId(
          where: $lieferungFilter
          order_by: { datum: desc_nulls_first }
        ) @include(if: $isGartenKultur) {
          ...LieferungFields
        }
        teilkulturs(
          where: $teilkulturFilter
          order_by: { name: asc_nulls_first }
        ) @include(if: $isGartenKultur) {
          ...TeilkulturFields
          kultur {
            ...KulturFields
          }
        }
        kultur_felder @include(if: $isGartenKultur) {
          ...KulturFelderFields
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
        events(
          where: $eventFilter
          order_by: { datum: desc_nulls_first, beschreibung: asc_nulls_first }
        ) @include(if: $isArtKultur) {
          ...EventFields
        }
        zaehlungs(
          where: $zaehlungFilter
          order_by: { datum: desc_nulls_first }
        ) @include(if: $isArtKultur) {
          ...ZaehlungFields
          teilzaehlungs_aggregate {
            aggregate {
              sum {
                anzahl_pflanzen
                anzahl_auspflanzbereit
                anzahl_mutterpflanzen
              }
            }
          }
        }
        lieferungsByVonKulturId(
          where: $lieferungFilter
          order_by: { datum: desc_nulls_first }
        ) @include(if: $isArtKultur) {
          ...LieferungFields
        }
        lieferungsByNachKulturId(
          where: $lieferungFilter
          order_by: { datum: desc_nulls_first }
        ) @include(if: $isArtKultur) {
          ...LieferungFields
        }
        teilkulturs(
          where: $teilkulturFilter
          order_by: { name: asc_nulls_first }
        ) @include(if: $isArtKultur) {
          ...TeilkulturFields
          kultur {
            ...KulturFields
          }
        }
        kultur_felder @include(if: $isArtKultur) {
          ...KulturFelderFields
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
          order_by: { datum: desc_nulls_first }
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
            events(
              where: $eventFilter
              order_by: {
                datum: desc_nulls_first
                beschreibung: asc_nulls_first
              }
            ) {
              ...EventFields
            }
            zaehlungs(
              where: $zaehlungFilter
              order_by: { datum: desc_nulls_first }
            ) {
              ...ZaehlungFields
              teilzaehlungs_aggregate {
                aggregate {
                  sum {
                    anzahl_pflanzen
                    anzahl_auspflanzbereit
                    anzahl_mutterpflanzen
                  }
                }
              }
            }
          }
        }
      }
    }
    event(
      where: $eventFilter
      order_by: { datum: desc_nulls_first, beschreibung: asc_nulls_first }
    ) {
      ...EventFields
    }
    zaehlung(order_by: { datum: desc_nulls_first }) {
      ...ZaehlungFields
      teilzaehlungs_aggregate {
        aggregate {
          sum {
            anzahl_pflanzen
            anzahl_auspflanzbereit
            anzahl_mutterpflanzen
          }
        }
      }
    }
    teilkultur(where: $teilkulturFilter, order_by: { name: asc_nulls_first }) {
      ...TeilkulturFields
      kultur {
        ...KulturFields
        kultur_felder {
          tk
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
      herkunft {
        id
        nr
      }
      art {
        ...ArtFields
      }
      garten @include(if: $isKultur) {
        ...GartenFields
        person {
          ...PersonFields
        }
      }
      events(
        where: $eventFilter
        order_by: { datum: desc_nulls_first, beschreibung: asc_nulls_first }
      ) @include(if: $isKultur) {
        ...EventFields
        kultur {
          ...KulturFields
        }
      }
      teilkulturs(
        where: $teilkulturFilter
        order_by: { name: asc_nulls_first }
      ) @include(if: $isKultur) {
        ...TeilkulturFields
        kultur {
          ...KulturFields
        }
      }
      kultur_felder @include(if: $isKultur) {
        ...KulturFelderFields
      }
      zaehlungs(where: $zaehlungFilter, order_by: { datum: desc_nulls_first })
        @include(if: $isKultur) {
        ...ZaehlungFields
        teilzaehlungs_aggregate {
          aggregate {
            sum {
              anzahl_pflanzen
              anzahl_auspflanzbereit
              anzahl_mutterpflanzen
            }
          }
        }
      }
      lieferungsByVonKulturId(
        where: $lieferungFilter
        order_by: { datum: desc_nulls_first }
      ) @include(if: $isKultur) {
        ...LieferungFields
      }
      lieferungsByNachKulturId(
        where: $lieferungFilter
        order_by: { datum: desc_nulls_first }
      ) @include(if: $isKultur) {
        ...LieferungFields
      }
    }
    herkunft(
      where: $herkunftFilter
      order_by: [
        { nr: asc_nulls_first }
        { gemeinde: asc_nulls_first }
        { lokalname: asc_nulls_first }
      ]
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
          order_by: { datum: desc_nulls_first }
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
            events {
              ...EventFields
            }
            zaehlungs(
              where: $zaehlungFilter
              order_by: { datum: desc_nulls_first }
            ) {
              ...ZaehlungFields
              teilzaehlungs_aggregate {
                aggregate {
                  sum {
                    anzahl_pflanzen
                    anzahl_auspflanzbereit
                    anzahl_mutterpflanzen
                  }
                }
              }
            }
          }
        }
      }
    }
    sammel_lieferung(
      where: $sammelLieferungFilter
      order_by: { datum: desc_nulls_first }
    ) {
      ...SammelLieferungFields
      lieferungs @include(if: $isSammelLieferung) {
        ...LieferungFields
      }
      person {
        id
        name
      }
      kulturByVonKulturId {
        id
        garten {
          id
          name
          person {
            id
            name
          }
        }
      }
    }
    lieferung(where: $lieferungFilter, order_by: { datum: desc_nulls_first }) {
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
        events {
          ...EventFields
        }
        zaehlungs {
          ...ZaehlungFields
          teilzaehlungs_aggregate {
            aggregate {
              sum {
                anzahl_pflanzen
                anzahl_auspflanzbereit
                anzahl_mutterpflanzen
              }
            }
          }
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
          herkunft {
            id
            nr
          }
          art {
            ...ArtFields
          }
          events @include(if: $isPersonGartenKultur) {
            ...EventFields
          }
          zaehlungs @include(if: $isPersonGartenKultur) {
            ...ZaehlungFields
            teilzaehlungs_aggregate {
              aggregate {
                sum {
                  anzahl_pflanzen
                  anzahl_auspflanzbereit
                  anzahl_mutterpflanzen
                }
              }
            }
          }
          lieferungsByVonKulturId @include(if: $isPersonGartenKultur) {
            ...LieferungFields
          }
          lieferungsByNachKulturId(
            where: $lieferungFilter
            order_by: { datum: desc_nulls_first }
          ) @include(if: $isPersonGartenKultur) {
            ...LieferungFields
          }
          teilkulturs(
            where: $teilkulturFilter
            order_by: { name: asc_nulls_first }
          ) @include(if: $isPersonGartenKultur) {
            ...TeilkulturFields
            kultur {
              ...KulturFields
            }
          }
          kultur_felder @include(if: $isPersonGartenKultur) {
            ...KulturFelderFields
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
      lieferungs(order_by: { datum: desc_nulls_first })
        @include(if: $isSammlung) {
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
          events @include(if: $isSammlungLieferungKultur) {
            ...EventFields
          }
          zaehlungs @include(if: $isSammlungLieferungKultur) {
            ...ZaehlungFields
            teilzaehlungs_aggregate {
              aggregate {
                sum {
                  anzahl_pflanzen
                  anzahl_auspflanzbereit
                  anzahl_mutterpflanzen
                }
              }
            }
          }
          lieferungsByVonKulturId @include(if: $isSammlungLieferungKultur) {
            ...LieferungFields
          }
          lieferungsByNachKulturId @include(if: $isSammlungLieferungKultur) {
            ...LieferungFields
          }
        }
      }
    }
  }
  ${art}
  ${event}
  ${garten}
  ${kultur}
  ${kulturFelder}
  ${herkunft}
  ${lieferung}
  ${sammelLieferung}
  ${person}
  ${sammlung}
  ${teilkultur}
  ${zaehlung}
`
