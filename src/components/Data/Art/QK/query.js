import gql from 'graphql-tag'

import { kultur, teilkultur, zaehlung } from '../../../../utils/fragments'

export default gql`
  query ArtQkQuery($artId: bigint!, $startYear: date!, $startNextYear: date!) {
    art(where: { id: { _eq: $artId } }) {
      id
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
      kultursWithoutZaehlungInYear: kulturs(
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
        zaehlungs(where: { datum: { _is_null: true } }, order_by: { id: asc }) {
          ...ZaehlungFields
        }
      }
    }
  }
  ${kultur}
  ${teilkultur}
  ${zaehlung}
`
