import { useEffect, useMemo, useRef } from 'react'
import { debounce } from 'es-toolkit'

// drop-in for use-debounce's useDebouncedCallback, built on es-toolkit:
// the debounced identity stays stable across renders (so it can be handed
// to observables/effects), while always invoking the latest fn
//
// the useMemo is load-bearing and react compiler can NOT replace it: the
// compiler bails out of this hook entirely ("Cannot access refs during
// render" - it sees the fnRef.current read in the factory). without the
// manual memo, every render would create a new debounced function,
// discarding pending timers and handing effects/observables a new identity
export const useDebouncedCallback = <Args extends unknown[]>(
  fn: (...args: Args) => void,
  delay: number,
) => {
  const fnRef = useRef(fn)

  useEffect(() => {
    fnRef.current = fn
  })

  return useMemo(
    () => debounce((...args: Args) => fnRef.current(...args), delay),
    [delay],
  )
}
