import gql from 'graphql-tag'

import { kultur } from '../../../../utils/fragments'

export default gql`
  query ArtQkQuery($artId: bigint!, $startYear: date!, $startNextYear: date!) {
    art(where: { id: { _eq: $artId } }) {
      id
      kultursWithoutVonAnzahlIndividuen: kulturs(
        where: { von_anzahl_individuen: { _is_null: true } }
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
    }
  }
  ${kultur}
`
