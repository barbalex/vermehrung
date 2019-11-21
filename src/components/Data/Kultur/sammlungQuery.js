import gql from 'graphql-tag'

export default gql`
  query sammlungArtHerkunftQuery {
    sammlung(
      where: { art_id: { _is_null: false }, herkunft_id: { _is_null: false } }
    ) {
      id
      art_id
      herkunft_id
    }
  }
`
