import gql from 'graphql-tag'

export default gql`
  query herkunftQueryForKultur($filter: herkunft_bool_exp!) {
    herkunft(
      where: $filter
      order_by: [
        { nr: asc_nulls_first }
        { gemeinde: asc_nulls_first }
        { lokalname: asc_nulls_first }
      ]
    ) {
      id
      nr
      lokalname
      gemeinde
    }
  }
`
