import gql from 'graphql-tag'

import {
  art as artFragment,
  lieferung as lieferungFragment,
  sammlung as sammlungFragment,
} from '../../../utils/fragments'

export default gql`
  query ArtQuery($id: bigint!, $filter: art_bool_exp!, $isFiltered: Boolean!) {
    art(where: { id: { _eq: $id } }) {
      ...ArtFields
      sammlungsDone: sammlungs(
        where: { geplant: { _eq: false }, datum: { _is_null: false } }
        order_by: { datum: asc }
      ) {
        ...SammlungFields
      }
      sammlungsPlanned: sammlungs(
        where: { geplant: { _eq: true }, datum: { _is_null: false } }
        order_by: { datum: asc }
      ) {
        ...SammlungFields
      }
      lieferungsDone: lieferungs(
        where: {
          nach_ausgepflanzt: { _eq: true }
          geplant: { _eq: false }
          datum: { _is_null: false }
        }
      ) {
        ...LieferungFields
      }
      lieferungsPlanned: lieferungs(
        where: {
          nach_ausgepflanzt: { _eq: true }
          geplant: { _eq: true }
          datum: { _is_null: false }
        }
      ) {
        ...LieferungFields
      }
    }
    rowsUnfiltered: art @include(if: $isFiltered) {
      id
    }
    rowsFiltered: art(where: $filter) @include(if: $isFiltered) {
      id
    }
  }
  ${artFragment}
  ${lieferungFragment}
  ${sammlungFragment}
`
