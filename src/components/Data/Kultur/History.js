import React, { useCallback, useContext } from 'react'
import { observer } from 'mobx-react-lite'
import gql from 'graphql-tag'

import { useQuery, StoreContext } from '../../../models/reactUtils'
import checkForOnlineError from '../../../utils/checkForOnlineError'

const kulturRevQuery = gql`
  query kulturRevForConflictQuery($id: uuid!, $rev: String!) {
    kultur_rev(where: { kultur_id: { _eq: $id }, _rev: { _eq: $rev } }) {
      id
      __typename
      kultur_id
      art_id
      art {
        id
        __typename
        art_ae_art {
          id
          __typename
          name
        }
      }
      herkunft_id
      herkunft {
        id
        __typename
        gemeinde
        lokalname
        nr
      }
      garten_id
      garten {
        id
        __typename
        name
        person {
          id
          __typename
          name
        }
      }
      zwischenlager
      erhaltungskultur
      von_anzahl_individuen
      bemerkungen
      aktiv
      changed
      changed_by
      _rev
      _parent_rev
      _depth
      _deleted
    }
  }
`

const KulturHistory = ({ row, setShowHistory }) => {
  const store = useContext(StoreContext)
  const { user, addNotification } = store

  // need to use this query to ensure that the person's name is queried
  const { error, loading } = useQuery(kulturRevQuery, {
    variables: {
      id: row.id,
    },
  })
  error && checkForOnlineError(error)

  const onClickSchliessen = useCallback(() => setShowHistory(false), [
    setShowHistory,
  ])

  return <div>Das ist noch eine Baustelle</div>
}

export default observer(KulturHistory)
