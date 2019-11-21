import gql from 'graphql-tag'

export default gql`
  query sammlungArtHerkunftQuery {
    sammlung_art_herkunft_combos {
      art_id
      herkunft_id
    }
  }
`
