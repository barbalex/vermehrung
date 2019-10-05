import gql from 'graphql-tag'

import { art as artFragment } from '../../../utils/fragments'

export default gql`
  uery ArtQkQuery($artId: bigint!, $startYear: date!, $startNextYear: date!) {
  art(where: {id: {_eq: $artId}}) {
    id
    kultursWithoutVonAnzahlIndividuen: kulturs(where: {von_anzahl_individuen: {_is_null: true}}) {
      id
    }
    kultursWithoutZaehlungInYear: kulturs(where: {_not: {zaehlungs: {_and: [{datum: {_gte: $startYear}}, {datum: {_lt: $startNextYear}}]}}}) {
      id
    }
  }
}
`
