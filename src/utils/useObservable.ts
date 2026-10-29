import { useState, useEffect } from 'react'
import type { Observable } from 'rxjs'

// idea from: https://github.com/Nozbe/withObservables/issues/16#issue-390429970
export const useObservable = <T>(
  observable: Observable<T> | undefined,
): T | undefined => {
  const [value, setValue] = useState<T | undefined>(
    (observable as unknown as { value?: T })?.value,
  )

  useEffect(() => {
    if (!observable?.subscribe) return

    const subscription = observable.subscribe({
      next: setValue,
      // an observable errors e.g. when findAndObserve hits a record that
      // is missing locally (fresh browser before the initial sync, or a
      // remotely deleted row) - without an error handler rxjs rethrows it
      // as an uncaught exception. keep the last value; the component
      // re-subscribes when its observable dependencies change
      error: (error) => console.error(error),
    })

    return () => subscription.unsubscribe()
  }, [observable, setValue])

  return value
}
