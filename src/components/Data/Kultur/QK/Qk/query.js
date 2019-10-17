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
  ) {
    anLieferungsWithoutPerson: lieferung(
      where: {
        nach_kultur_id: { _eq: $kulturId }
        person_id: { _is_null: true }
      }
      order_by: [{ datum: asc_nulls_first }, { id: asc_nulls_first }]
    ) {
      ...LieferungFields
    }
    ausLieferungsWithoutPerson: lieferung(
      where: {
        von_kultur_id: { _eq: $kulturId }
        person_id: { _is_null: true }
      }
      order_by: [{ datum: asc_nulls_first }, { id: asc_nulls_first }]
    ) {
      ...LieferungFields
    }
    anLieferungsWithoutAnzahlPflanzen: lieferung(
      where: {
        nach_kultur_id: { _eq: $kulturId }
        anzahl_pflanzen: { _is_null: true }
      }
      order_by: [{ datum: asc_nulls_first }, { id: asc_nulls_first }]
    ) {
      ...LieferungFields
    }
    ausLieferungsWithoutAnzahlPflanzen: lieferung(
      where: {
        von_kultur_id: { _eq: $kulturId }
        anzahl_pflanzen: { _is_null: true }
      }
      order_by: [{ datum: asc_nulls_first }, { id: asc_nulls_first }]
    ) {
      ...LieferungFields
    }
    anLieferungsWithoutAnzahlAuspflanzbereit: lieferung(
      where: {
        nach_kultur_id: { _eq: $kulturId }
        anzahl_auspflanzbereit: { _is_null: true }
      }
      order_by: [{ datum: asc_nulls_first }, { id: asc_nulls_first }]
    ) {
      ...LieferungFields
    }
    ausLieferungsWithoutAnzahlAuspflanzbereit: lieferung(
      where: {
        von_kultur_id: { _eq: $kulturId }
        anzahl_auspflanzbereit: { _is_null: true }
      }
      order_by: [{ datum: asc_nulls_first }, { id: asc_nulls_first }]
    ) {
      ...LieferungFields
    }
    anLieferungsWithoutVonAnzahlIndividuen: lieferung(
      where: {
        nach_kultur_id: { _eq: $kulturId }
        von_anzahl_individuen: { _is_null: true }
      }
      order_by: [{ datum: asc_nulls_first }, { id: asc_nulls_first }]
    ) {
      ...LieferungFields
    }
    ausLieferungsWithoutVonAnzahlIndividuen: lieferung(
      where: {
        von_kultur_id: { _eq: $kulturId }
        von_anzahl_individuen: { _is_null: true }
      }
      order_by: [{ datum: asc_nulls_first }, { id: asc_nulls_first }]
    ) {
      ...LieferungFields
    }
    anLieferungsWithoutVon: lieferung(
      where: {
        nach_kultur_id: { _eq: $kulturId }
        von_kultur_id: { _is_null: true }
        von_sammlung_id: { _is_null: true }
      }
      order_by: [{ datum: asc_nulls_first }, { id: asc_nulls_first }]
    ) {
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
    ) {
      ...LieferungFields
    }
    anLieferungsWithoutDatum: lieferung(
      where: { nach_kultur_id: { _eq: $kulturId }, datum: { _is_null: true } }
      order_by: [{ datum: asc_nulls_first }, { id: asc_nulls_first }]
    ) {
      ...LieferungFields
    }
    ausLieferungsWithoutDatum: lieferung(
      where: { von_kultur_id: { _eq: $kulturId }, datum: { _is_null: true } }
      order_by: [{ datum: asc_nulls_first }, { id: asc_nulls_first }]
    ) {
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
    ) {
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
    ) {
      id
      herkunft {
        id
        nr
      }
    }
    kultursWithoutHerkunft: kultur(
      where: { id: { _eq: $kulturId }, herkunft_id: { _is_null: true } }
      order_by: { garten: { name: asc_nulls_first } }
    ) {
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
    ) {
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
    ) {
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
    ) {
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
    ) {
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
    ) {
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
    ) {
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
    ) {
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
    ) {
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
