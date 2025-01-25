import { useState, useEffect } from 'react'

// idea from: https://github.com/Nozbe/withObservables/issues/16#issue-390429970
export const useObservable = (observable) => {
  const [value, setValue] = useState(observable && observable.value)

  useEffect(() => {
    if (!observable?.subscribe) return

    const subscription = observable.subscribe(setValue)

    return () => subscription.unsubscribe()
  }, [observable, setValue])

  return value
}
