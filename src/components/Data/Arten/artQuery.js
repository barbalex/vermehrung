import gql from 'graphql-tag'

export default gql`
  query ArtQuery($filter: art_bool_exp!, $isFiltered: Boolean!) {
    rowsUnfiltered: art @include(if: $isFiltered) {
      id
    }
    rowsFiltered: art(where: $filter) @include(if: $isFiltered) {
      id
    }
  }
`
