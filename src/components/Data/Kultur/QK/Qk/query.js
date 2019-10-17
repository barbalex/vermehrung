import gql from 'graphql-tag'

import {
  event,
  herkunft,
  kultur,
  lieferung,
  sammlung,
  teilkultur,
  teilzaehlung,
  zaehlung,
} from '../../../../../utils/fragments'

export default gql`
  query KulturQkQuery(
    $kulturId: bigint!
    $startYear: date!
    $startNextYear: date!
    $kultursWithoutVonAnzahlIndividuen: Boolean!
    $kultursWithoutGarten: Boolean!
    $kultursWithoutHerkunft: Boolean!
    $kultursWithoutZaehlungThisYear: Boolean!
    $teilkultursWithoutName: Boolean!
    $zaehlungsWithoutDatum: Boolean!
    $zaehlungsWithoutAnzahlPflanzen: Boolean!
    $zaehlungsWithoutAnzahlAuspflanzbereit: Boolean!
    $zaehlungsWithoutAnzahlMutterpflanzen: Boolean!
    $anLieferungsWithoutAnzahlPflanzen: Boolean!
    $ausLieferungsWithoutAnzahlPflanzen: Boolean!
    $anLieferungsWithoutAnzahlAuspflanzbereit: Boolean!
    $ausLieferungsWithoutAnzahlAuspflanzbereit: Boolean!
    $anLieferungsWithoutVonAnzahlIndividuen: Boolean!
    $ausLieferungsWithoutVonAnzahlIndividuen: Boolean!
    $anLieferungsWithoutVon: Boolean!
    $ausLieferungsWithoutNach: Boolean!
    $anLieferungsWithoutDatum: Boolean!
    $ausLieferungsWithoutDatum: Boolean!
    $anLieferungsWithoutPerson: Boolean!
    $ausLieferungsWithoutPerson: Boolean!
    $eventsWithoutBeschreibung: Boolean!
    $eventsWithoutDatum: Boolean!
  ) {
    anLieferungsWithoutPerson: lieferung(
      where: {
        nach_kultur_id: { _eq: $kulturId }
        person_id: { _is_null: true }
      }
      order_by: [{ datum: asc_nulls_first }, { id: asc_nulls_first }]
    ) @include(if: $anLieferungsWithoutPerson) {
      ...LieferungFields
    }
    ausLieferungsWithoutPerson: lieferung(
      where: {
        von_kultur_id: { _eq: $kulturId }
        person_id: { _is_null: true }
      }
      order_by: [{ datum: asc_nulls_first }, { id: asc_nulls_first }]
    ) @include(if: $ausLieferungsWithoutPerson) {
      ...LieferungFields
    }
    anLieferungsWithoutAnzahlPflanzen: lieferung(
      where: {
        nach_kultur_id: { _eq: $kulturId }
        anzahl_pflanzen: { _is_null: true }
      }
      order_by: [{ datum: asc_nulls_first }, { id: asc_nulls_first }]
    ) @include(if: $anLieferungsWithoutAnzahlPflanzen) {
      ...LieferungFields
    }
    ausLieferungsWithoutAnzahlPflanzen: lieferung(
      where: {
        von_kultur_id: { _eq: $kulturId }
        anzahl_pflanzen: { _is_null: true }
      }
      order_by: [{ datum: asc_nulls_first }, { id: asc_nulls_first }]
    ) @include(if: $ausLieferungsWithoutAnzahlPflanzen) {
      ...LieferungFields
    }
    anLieferungsWithoutAnzahlAuspflanzbereit: lieferung(
      where: {
        nach_kultur_id: { _eq: $kulturId }
        anzahl_auspflanzbereit: { _is_null: true }
      }
      order_by: [{ datum: asc_nulls_first }, { id: asc_nulls_first }]
    ) @include(if: $anLieferungsWithoutAnzahlAuspflanzbereit) {
      ...LieferungFields
    }
    ausLieferungsWithoutAnzahlAuspflanzbereit: lieferung(
      where: {
        von_kultur_id: { _eq: $kulturId }
        anzahl_auspflanzbereit: { _is_null: true }
      }
      order_by: [{ datum: asc_nulls_first }, { id: asc_nulls_first }]
    ) @include(if: $ausLieferungsWithoutAnzahlAuspflanzbereit) {
      ...LieferungFields
    }
    anLieferungsWithoutVonAnzahlIndividuen: lieferung(
      where: {
        nach_kultur_id: { _eq: $kulturId }
        von_anzahl_individuen: { _is_null: true }
      }
      order_by: [{ datum: asc_nulls_first }, { id: asc_nulls_first }]
    ) @include(if: $anLieferungsWithoutVonAnzahlIndividuen) {
      ...LieferungFields
    }
    ausLieferungsWithoutVonAnzahlIndividuen: lieferung(
      where: {
        von_kultur_id: { _eq: $kulturId }
        von_anzahl_individuen: { _is_null: true }
      }
      order_by: [{ datum: asc_nulls_first }, { id: asc_nulls_first }]
    ) @include(if: $ausLieferungsWithoutVonAnzahlIndividuen) {
      ...LieferungFields
    }
    anLieferungsWithoutVon: lieferung(
      where: {
        nach_kultur_id: { _eq: $kulturId }
        von_kultur_id: { _is_null: true }
        von_sammlung_id: { _is_null: true }
      }
      order_by: [{ datum: asc_nulls_first }, { id: asc_nulls_first }]
    ) @include(if: $anLieferungsWithoutVon) {
      ...LieferungFields
    }
    ausLieferungsWithoutNach: lieferung(
      where: {
        von_kultur_id: { _eq: $kulturId }
        # nas no nach
        nach_kultur_id: { _is_null: true }
        nach_ausgepflanzt: { _neq: true }
      }
      order_by: [{ datum: asc_nulls_first }, { id: asc_nulls_first }]
    ) @include(if: $ausLieferungsWithoutNach) {
      ...LieferungFields
    }
    anLieferungsWithoutDatum: lieferung(
      where: { nach_kultur_id: { _eq: $kulturId }, datum: { _is_null: true } }
      order_by: [{ datum: asc_nulls_first }, { id: asc_nulls_first }]
    ) @include(if: $anLieferungsWithoutDatum) {
      ...LieferungFields
    }
    ausLieferungsWithoutDatum: lieferung(
      where: { von_kultur_id: { _eq: $kulturId }, datum: { _is_null: true } }
      order_by: [{ datum: asc_nulls_first }, { id: asc_nulls_first }]
    ) @include(if: $ausLieferungsWithoutDatum) {
      ...LieferungFields
    }
    kultursWithoutVonAnzahlIndividuen: kultur(
      where: {
        id: { _eq: $kulturId }
        von_anzahl_individuen: { _is_null: true }
      }
      order_by: [
        { garten: { name: asc_nulls_first } }
        { herkunft: { nr: asc_nulls_first } }
      ]
    ) @include(if: $kultursWithoutVonAnzahlIndividuen) {
      ...KulturFields
      garten {
        id
        person {
          id
          name
        }
      }
      herkunft {
        id
        nr
      }
    }
    kultursWithoutGarten: kultur(
      where: { id: { _eq: $kulturId }, garten_id: { _is_null: true } }
      order_by: { herkunft: { nr: asc_nulls_first } }
    ) @include(if: $kultursWithoutGarten) {
      id
      herkunft {
        id
        nr
      }
    }
    kultursWithoutHerkunft: kultur(
      where: { id: { _eq: $kulturId }, herkunft_id: { _is_null: true } }
      order_by: { garten: { name: asc_nulls_first } }
    ) @include(if: $kultursWithoutHerkunft) {
      ...KulturFields
      garten {
        id
        person {
          id
          name
        }
      }
    }
    kultursWithoutZaehlungThisYear: kultur(
      where: {
        id: { _eq: $kulturId }
        _not: {
          zaehlungs: {
            # need _and because querying datum more than once
            _and: [
              { datum: { _gte: $startYear } }
              { datum: { _lt: $startNextYear } }
            ]
          }
        }
      }
    ) @include(if: $kultursWithoutZaehlungThisYear) {
      ...KulturFields
      garten {
        id
        person {
          id
          name
        }
      }
      herkunft {
        id
        nr
      }
    }
    teilkultursWithoutName: kultur(
      where: {
        id: { _eq: $kulturId }
        teilkulturs: { name: { _is_null: true } }
      }
      order_by: [
        { garten: { name: asc_nulls_first } }
        { herkunft: { nr: asc_nulls_first } }
      ]
    ) @include(if: $teilkultursWithoutName) {
      ...KulturFields
      garten {
        id
        person {
          id
          name
        }
      }
      herkunft {
        id
        nr
      }
      teilkulturs(where: { name: { _is_null: true } }, order_by: { id: asc }) {
        ...TeilkulturFields
      }
    }
    zaehlungsWithoutDatum: kultur(
      where: {
        id: { _eq: $kulturId }
        zaehlungs: { datum: { _is_null: true } }
      }
      order_by: [
        { garten: { name: asc_nulls_first } }
        { herkunft: { nr: asc_nulls_first } }
      ]
    ) @include(if: $zaehlungsWithoutDatum) {
      ...KulturFields
      garten {
        id
        person {
          id
          name
        }
      }
      herkunft {
        id
        nr
      }
      zaehlungs(where: { datum: { _is_null: true } }, order_by: { id: asc }) {
        ...ZaehlungFields
      }
    }
    eventsWithoutBeschreibung: kultur(
      where: {
        id: { _eq: $kulturId }
        events: { beschreibung: { _is_null: true } }
      }
      order_by: [
        { garten: { name: asc_nulls_first } }
        { herkunft: { nr: asc_nulls_first } }
      ]
    ) @include(if: $eventsWithoutBeschreibung) {
      ...KulturFields
      garten {
        id
        person {
          id
          name
        }
      }
      herkunft {
        id
        nr
      }
      events(
        where: { beschreibung: { _is_null: true } }
        order_by: { id: asc }
      ) {
        ...EventFields
      }
    }
    eventsWithoutDatum: kultur(
      where: { id: { _eq: $kulturId }, events: { datum: { _is_null: true } } }
      order_by: [
        { garten: { name: asc_nulls_first } }
        { herkunft: { nr: asc_nulls_first } }
      ]
    ) @include(if: $eventsWithoutDatum) {
      ...KulturFields
      garten {
        id
        person {
          id
          name
        }
      }
      herkunft {
        id
        nr
      }
      events(where: { datum: { _is_null: true } }, order_by: { id: asc }) {
        ...EventFields
      }
    }
    zaehlungsWithoutAnzahlPflanzen: kultur(
      where: {
        id: { _eq: $kulturId }
        zaehlungs: { teilzaehlungs: { anzahl_pflanzen: { _is_null: true } } }
      }
      order_by: [
        { garten: { name: asc_nulls_first } }
        { herkunft: { nr: asc_nulls_first } }
      ]
    ) @include(if: $zaehlungsWithoutAnzahlPflanzen) {
      ...KulturFields
      garten {
        id
        person {
          id
          name
        }
      }
      herkunft {
        id
        nr
      }
      zaehlungs(
        where: { teilzaehlungs: { anzahl_pflanzen: { _is_null: true } } }
        order_by: { datum: asc_nulls_first }
      ) {
        ...ZaehlungFields
        teilzaehlungs(
          where: { anzahl_pflanzen: { _is_null: true } }
          order_by: { id: asc }
        ) {
          ...TeilzaehlungFields
        }
      }
    }
    zaehlungsWithoutAnzahlAuspflanzbereit: kultur(
      where: {
        id: { _eq: $kulturId }
        zaehlungs: {
          teilzaehlungs: { anzahl_auspflanzbereit: { _is_null: true } }
        }
      }
      order_by: [
        { garten: { name: asc_nulls_first } }
        { herkunft: { nr: asc_nulls_first } }
      ]
    ) @include(if: $zaehlungsWithoutAnzahlAuspflanzbereit) {
      ...KulturFields
      garten {
        id
        person {
          id
          name
        }
      }
      herkunft {
        id
        nr
      }
      zaehlungs(
        where: { teilzaehlungs: { anzahl_auspflanzbereit: { _is_null: true } } }
        order_by: { datum: asc_nulls_first }
      ) {
        ...ZaehlungFields
        teilzaehlungs(
          where: { anzahl_auspflanzbereit: { _is_null: true } }
          order_by: { id: asc }
        ) {
          ...TeilzaehlungFields
        }
      }
    }
    zaehlungsWithoutAnzahlMutterpflanzen: kultur(
      where: {
        id: { _eq: $kulturId }
        zaehlungs: {
          teilzaehlungs: { anzahl_mutterpflanzen: { _is_null: true } }
        }
      }
      order_by: [
        { garten: { name: asc_nulls_first } }
        { herkunft: { nr: asc_nulls_first } }
      ]
    ) @include(if: $zaehlungsWithoutAnzahlMutterpflanzen) {
      ...KulturFields
      garten {
        id
        person {
          id
          name
        }
      }
      herkunft {
        id
        nr
      }
      zaehlungs(
        where: { teilzaehlungs: { anzahl_mutterpflanzen: { _is_null: true } } }
        order_by: { datum: asc_nulls_first }
      ) {
        ...ZaehlungFields
        teilzaehlungs(
          where: { anzahl_mutterpflanzen: { _is_null: true } }
          order_by: { id: asc }
        ) {
          ...TeilzaehlungFields
        }
      }
    }
  }
  ${event}
  ${herkunft}
  ${kultur}
  ${lieferung}
  ${sammlung}
  ${teilkultur}
  ${teilzaehlung}
  ${zaehlung}
`
