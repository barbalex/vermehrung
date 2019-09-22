import gql from 'graphql-tag'

import {
  art,
  aufgabe,
  garten,
  herkunft,
  kultur,
  kulturFelder,
  lieferung,
  person,
  sammlung,
  teilkultur,
  zaehlung,
} from '../../utils/fragments'

export default gql`
  query TreeQuery(
    $artFilter: art_bool_exp!
    $aufgabeFilter: aufgabe_bool_exp!
    $gartenFilter: garten_bool_exp!
    $kulturFilter: kultur_bool_exp!
    $herkunftFilter: herkunft_bool_exp!
    $personFilter: person_bool_exp!
    $sammlungFilter: sammlung_bool_exp!
    $teilkulturFilter: teilkultur_bool_exp!
    $zaehlungFilter: zaehlung_bool_exp!
    $lieferungFilter: lieferung_bool_exp!
    $isArt: Boolean!
    $isAufgabe: Boolean!
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
    $isTeilkultur: Boolean!
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
        aufgaben(where: $aufgabeFilter, order_by: { datum: desc_nulls_first })
          @include(if: $isGartenKultur) {
          ...AufgabeFields
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
        aufgaben(where: $aufgabeFilter, order_by: { datum: desc_nulls_first })
          @include(if: $isArtKultur) {
          ...AufgabeFields
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
          person {
            ...PersonFields
          }
        }
        lieferungsByNachKulturId(
          where: $lieferungFilter
          order_by: { datum: desc_nulls_first }
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
            aufgaben(
              where: $aufgabeFilter
              order_by: { datum: desc_nulls_first }
            ) {
              ...AufgabeFields
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
    aufgabe(where: $aufgabeFilter, order_by: { aufgabe: asc_nulls_first }) {
      ...AufgabeFields
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
      art {
        ...ArtFields
      }
      garten @include(if: $isKultur) {
        ...GartenFields
        person {
          ...PersonFields
        }
      }
      aufgaben(
        where: $aufgabeFilter
        order_by: { datum: desc_nulls_first, aufgabe: asc_nulls_first }
      ) @include(if: $isKultur) {
        ...AufgabeFields
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
        person @include(if: $isKulturAusLieferung) {
          ...PersonFields
        }
      }
      lieferungsByNachKulturId(
        where: $lieferungFilter
        order_by: { datum: desc_nulls_first }
      ) @include(if: $isKultur) {
        ...LieferungFields
        person @include(if: $isKulturAnLieferung) {
          ...PersonFields
        }
      }
      kultur_felder @include(if: $isKultur) {
        ...KulturFelderFields
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
            aufgaben {
              ...AufgabeFields
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
        aufgaben {
          ...AufgabeFields
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
          art {
            ...ArtFields
          }
          aufgaben @include(if: $isPersonGartenKultur) {
            ...AufgabeFields
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
            person {
              ...PersonFields
            }
          }
          lieferungsByNachKulturId(
            where: $lieferungFilter
            order_by: { datum: desc_nulls_first }
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
          aufgaben @include(if: $isSammlungLieferungKultur) {
            ...AufgabeFields
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
  ${art}
  ${aufgabe}
  ${garten}
  ${kultur}
  ${kulturFelder}
  ${herkunft}
  ${lieferung}
  ${person}
  ${sammlung}
  ${teilkultur}
  ${zaehlung}
`
