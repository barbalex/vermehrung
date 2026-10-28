import { useState, useEffect } from 'react'
import type { Observable } from 'rxjs'

// idea from: https://github.com/Nozbe/withObservables/issues/16#issue-390429970
export const useObservable = <T,>(
  observable: Observable<T> | undefined,
): T | undefined => {
  const [value, setValue] = useState<T | undefined>(
    (observable as unknown as { value?: T })?.value,
  )

  useEffect(() => {
    if (!observable?.subscribe) return

    const subscription = observable.subscribe(setValue)

    return () => subscription.unsubscribe()
  }, [observable, setValue])

  return value
}
