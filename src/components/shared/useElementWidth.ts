import { useCallback, useEffect, useState } from 'react'

/**
 * Observes an element's content-box width via ResizeObserver.
 * Handles elements that mount late (conditional rendering).
 * width is undefined until the first observation fires.
 */
export const useElementWidth = <T extends HTMLElement>() => {
  const [element, setElement] = useState<T | null>(null)
  const [width, setWidth] = useState<number>()

  useEffect(() => {
    if (!element) return
    const observer = new ResizeObserver(([entry]) => {
      setWidth(entry?.contentRect.width)
    })
    observer.observe(element)
    return () => observer.disconnect()
  }, [element])

  // stable callback ref, so React only calls it when the element really changes
  const ref = useCallback((node: T | null) => setElement(node), [])

  return { width, ref }
}
