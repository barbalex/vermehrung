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
  query ArtQkQuery(
    $artId: uuid!
    $startYear: date!
    $startNextYear: date!
    $sammlungsWithoutNr: Boolean!
    $sammlungsWithoutHerkunft: Boolean!
    $sammlungsWithoutPerson: Boolean!
    $sammlungsWithoutDatum: Boolean!
    $sammlungsWithoutAnzahlPflanzen: Boolean!
    $sammlungsWithoutVonAnzahlIdividuen: Boolean!
    $kultursWithoutVonAnzahlIndividuen: Boolean!
    $kultursWithoutGarten: Boolean!
    $kultursWithoutHerkunft: Boolean!
    $kultursWithoutZaehlungThisYear: Boolean!
    $teilkultursWithoutName: Boolean!
    $zaehlungsWithoutDatum: Boolean!
    $zaehlungsWithoutAnzahlPflanzen: Boolean!
    $zaehlungsWithoutAnzahlAuspflanzbereit: Boolean!
    $zaehlungsWithoutAnzahlMutterpflanzen: Boolean!
    $lieferungsWithoutAnzahlPflanzen: Boolean!
    $lieferungsWithoutAnzahlAuspflanzbereit: Boolean!
    $lieferungsWithoutVonAnzahlIndividuen: Boolean!
    $lieferungsWithoutVon: Boolean!
    $lieferungsWithoutNach: Boolean!
    $lieferungsWithoutDatum: Boolean!
    $lieferungsWithoutPerson: Boolean!
    $eventsWithoutBeschreibung: Boolean!
    $eventsWithoutDatum: Boolean!
  ) {
    sammlungsWithoutNr: sammlung(
      where: { art_id: { _eq: $artId }, nr: { _is_null: true } }
      order_by: [{ datum: asc_nulls_first }, { nr: asc_nulls_first }]
    ) @include(if: $sammlungsWithoutNr) {
      ...SammlungFields
      herkunft {
        ...HerkunftFields
      }
    }
    sammlungsWithoutHerkunft: sammlung(
      where: { art_id: { _eq: $artId }, herkunft_id: { _is_null: true } }
      order_by: [{ datum: asc_nulls_first }, { nr: asc_nulls_first }]
    ) @include(if: $sammlungsWithoutHerkunft) {
      ...SammlungFields
      herkunft {
        ...HerkunftFields
      }
    }
    sammlungsWithoutPerson: sammlung(
      where: { art_id: { _eq: $artId }, person_id: { _is_null: true } }
      order_by: [{ datum: asc_nulls_first }, { nr: asc_nulls_first }]
    ) @include(if: $sammlungsWithoutPerson) {
      ...SammlungFields
      herkunft {
        ...HerkunftFields
      }
    }
    sammlungsWithoutDatum: sammlung(
      where: { art_id: { _eq: $artId }, datum: { _is_null: true } }
      order_by: [{ datum: asc_nulls_first }, { nr: asc_nulls_first }]
    ) @include(if: $sammlungsWithoutDatum) {
      ...SammlungFields
      herkunft {
        ...HerkunftFields
      }
    }
    sammlungsWithoutAnzahlPflanzen: sammlung(
      where: { art_id: { _eq: $artId }, anzahl_pflanzen: { _is_null: true } }
      order_by: [{ datum: asc_nulls_first }, { nr: asc_nulls_first }]
    ) @include(if: $sammlungsWithoutAnzahlPflanzen) {
      ...SammlungFields
      herkunft {
        ...HerkunftFields
      }
    }
    sammlungsWithoutVonAnzahlIdividuen: sammlung(
      where: {
        art_id: { _eq: $artId }
        von_anzahl_individuen: { _is_null: true }
      }
      order_by: [{ datum: asc_nulls_first }, { nr: asc_nulls_first }]
    ) @include(if: $sammlungsWithoutVonAnzahlIdividuen) {
      ...SammlungFields
      herkunft {
        ...HerkunftFields
      }
    }
    lieferungsWithoutPerson: lieferung(
      where: { art_id: { _eq: $artId }, person_id: { _is_null: true } }
      order_by: [{ datum: asc_nulls_first }, { id: asc_nulls_first }]
    ) @include(if: $lieferungsWithoutPerson) {
      ...LieferungFields
    }
    lieferungsWithoutAnzahlPflanzen: lieferung(
      where: { art_id: { _eq: $artId }, anzahl_pflanzen: { _is_null: true } }
      order_by: [{ datum: asc_nulls_first }, { id: asc_nulls_first }]
    ) @include(if: $lieferungsWithoutAnzahlPflanzen) {
      ...LieferungFields
    }
    lieferungsWithoutAnzahlAuspflanzbereit: lieferung(
      where: {
        art_id: { _eq: $artId }
        anzahl_auspflanzbereit: { _is_null: true }
      }
      order_by: [{ datum: asc_nulls_first }, { id: asc_nulls_first }]
    ) @include(if: $lieferungsWithoutAnzahlAuspflanzbereit) {
      ...LieferungFields
    }
    lieferungsWithoutVonAnzahlIndividuen: lieferung(
      where: {
        art_id: { _eq: $artId }
        von_anzahl_individuen: { _is_null: true }
      }
      order_by: [{ datum: asc_nulls_first }, { id: asc_nulls_first }]
    ) @include(if: $lieferungsWithoutVonAnzahlIndividuen) {
      ...LieferungFields
    }
    lieferungsWithoutVon: lieferung(
      where: {
        art_id: { _eq: $artId }
        von_kultur_id: { _is_null: true }
        von_sammlung_id: { _is_null: true }
      }
      order_by: [{ datum: asc_nulls_first }, { id: asc_nulls_first }]
    ) @include(if: $lieferungsWithoutVon) {
      ...LieferungFields
    }
    lieferungsWithoutNach: lieferung(
      where: {
        art_id: { _eq: $artId }
        # has von
        _or: [
          { von_kultur_id: { _is_null: false } }
          { von_sammlung_id: { _is_null: false } }
        ]
        # nas no nach
        nach_kultur_id: { _is_null: true }
        nach_ausgepflanzt: { _neq: true }
      }
      order_by: [{ datum: asc_nulls_first }, { id: asc_nulls_first }]
    ) @include(if: $lieferungsWithoutNach) {
      ...LieferungFields
    }
    lieferungsWithoutDatum: lieferung(
      where: { art_id: { _eq: $artId }, datum: { _is_null: true } }
      order_by: [{ datum: asc_nulls_first }, { id: asc_nulls_first }]
    ) @include(if: $lieferungsWithoutDatum) {
      ...LieferungFields
    }
    kultursWithoutVonAnzahlIndividuen: kultur(
      where: {
        art_id: { _eq: $artId }
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
      where: { art_id: { _eq: $artId }, garten_id: { _is_null: true } }
      order_by: { herkunft: { nr: asc_nulls_first } }
    ) @include(if: $kultursWithoutGarten) {
      id
      herkunft {
        id
        nr
      }
    }
    kultursWithoutHerkunft: kultur(
      where: { art_id: { _eq: $artId }, herkunft_id: { _is_null: true } }
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
        art_id: { _eq: $artId }
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
        art_id: { _eq: $artId }
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
        art_id: { _eq: $artId }
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
        art_id: { _eq: $artId }
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
      where: { art_id: { _eq: $artId }, events: { datum: { _is_null: true } } }
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
        art_id: { _eq: $artId }
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
        art_id: { _eq: $artId }
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
        art_id: { _eq: $artId }
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
