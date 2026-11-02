import { useEffect, useMemo, useRef } from 'react'
import { debounce } from 'es-toolkit'

// drop-in for use-debounce's useDebouncedCallback, built on es-toolkit:
// the debounced identity stays stable across renders (so it can be handed
// to observables/effects), while always invoking the latest fn
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
