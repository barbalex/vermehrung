/**
 * This component only loads the data
 * Reason: apollo used to return no data while refreshing
 * This was bad for the tree. Very hard to build a good user experience.
 * So the data was passed as props to the Tree component.
 * Which can decide not to update nodes if the query is loading
 * but rather use the previous value
 */
import React from 'react'
import { observer } from 'mobx-react-lite'

import Tree from './Tree'

const TreeContainer = () => {
  //const [meLoading, setMeLoading] = useState(false)
  /*useEffect(() => {}, [])
  const run = !store.arts.size && !!user?.uid
  const { loading, error } = useQuery(
    allDataQuery,
    {
      variables: {
        run,
      },
    },
    { fetchPolicy: 'network-only' },
  )
  console.log('TreeContainer', {
    loading,
    error,
    run,
  })

  useEffect(() => {
    if (loading !== store.loading) setLoading(loading)
  }, [loading, setLoading, store.loading])

  if (
    error &&
    !error.message.includes('Failed to fetch') &&
    !error.message.includes('JWT')
  ) {
    return <ErrorContainer>{error.message}</ErrorContainer>
  }
  if (error && error.message.includes('JWT')) {
    checkAuthOnError({ error, store })
  }*/
  return <Tree />
}

export default observer(TreeContainer)
