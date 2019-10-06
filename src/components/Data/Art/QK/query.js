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
} from '../../../../utils/fragments'

export default gql`
  query ArtQkQuery($artId: bigint!, $startYear: date!, $startNextYear: date!) {
    art(where: { id: { _eq: $artId } }) {
      id
      sammlungWithoutNr: sammlungs(
        where: { nr: { _is_null: true }, art_id: { _eq: $artId } }
        order_by: [{ datum: asc_nulls_first }, { nr: asc_nulls_first }]
      ) {
        ...SammlungFields
        herkunft {
          ...HerkunftFields
        }
      }
      sammlungWithoutHerkunft: sammlungs(
        where: { herkunft_id: { _is_null: true }, art_id: { _eq: $artId } }
        order_by: [{ datum: asc_nulls_first }, { nr: asc_nulls_first }]
      ) {
        ...SammlungFields
        herkunft {
          ...HerkunftFields
        }
      }
      sammlungWithoutPerson: sammlungs(
        where: { person_id: { _is_null: true }, art_id: { _eq: $artId } }
        order_by: [{ datum: asc_nulls_first }, { nr: asc_nulls_first }]
      ) {
        ...SammlungFields
        herkunft {
          ...HerkunftFields
        }
      }
      sammlungWithoutDatum: sammlungs(
        where: { datum: { _is_null: true }, art_id: { _eq: $artId } }
        order_by: [{ datum: asc_nulls_first }, { nr: asc_nulls_first }]
      ) {
        ...SammlungFields
        herkunft {
          ...HerkunftFields
        }
      }
      sammlungWithoutAnzahlPflanzen: sammlungs(
        where: { anzahl_pflanzen: { _is_null: true }, art_id: { _eq: $artId } }
        order_by: [{ datum: asc_nulls_first }, { nr: asc_nulls_first }]
      ) {
        ...SammlungFields
        herkunft {
          ...HerkunftFields
        }
      }
      sammlungWithoutVonAnzahlIdividuen: sammlungs(
        where: {
          von_anzahl_individuen: { _is_null: true }
          art_id: { _eq: $artId }
        }
        order_by: [{ datum: asc_nulls_first }, { nr: asc_nulls_first }]
      ) {
        ...SammlungFields
        herkunft {
          ...HerkunftFields
        }
      }
      lieferungsWithoutPerson: lieferungs(
        where: { person_id: { _is_null: true }, art_id: { _eq: $artId } }
        order_by: [{ datum: asc_nulls_first }, { id: asc_nulls_first }]
      ) {
        ...LieferungFields
      }
      kultursWithoutVonAnzahlIndividuen: kulturs(
        where: { von_anzahl_individuen: { _is_null: true } }
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
      kultursWithoutGarten: kulturs(
        where: { garten_id: { _is_null: true } }
        order_by: { herkunft: { nr: asc_nulls_first } }
      ) {
        id
        herkunft {
          id
          nr
        }
      }
      kultursWithoutHerkunft: kulturs(
        where: { herkunft_id: { _is_null: true } }
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
      kultursWithoutZaehlungThisYear: kulturs(
        where: {
          _not: {
            zaehlungs: {
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
      teilkultursWithoutName: kulturs(
        where: { teilkulturs: { name: { _is_null: true } } }
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
        teilkulturs(
          where: { name: { _is_null: true } }
          order_by: { id: asc }
        ) {
          ...TeilkulturFields
        }
      }
      zaehlungsWithoutDatum: kulturs(
        where: { zaehlungs: { datum: { _is_null: true } } }
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
      eventsWithoutBeschreibung: kulturs(
        where: { events: { beschreibung: { _is_null: true } } }
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
      eventsWithoutDatum: kulturs(
        where: { events: { datum: { _is_null: true } } }
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
      zaehlungsWithoutAnzahlPflanzen: kulturs(
        where: {
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
      zaehlungsWithoutAnzahlAuspflanzbereit: kulturs(
        where: {
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
          where: {
            teilzaehlungs: { anzahl_auspflanzbereit: { _is_null: true } }
          }
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
      zaehlungsWithoutAnzahlMutterpflanzen: kulturs(
        where: {
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
          where: {
            teilzaehlungs: { anzahl_mutterpflanzen: { _is_null: true } }
          }
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
