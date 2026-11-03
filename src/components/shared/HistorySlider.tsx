import {
  Children,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type ReactNode,
} from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

import styles from './HistorySlider.module.css'

// revision slider for the History views, replacing react-slick: one
// revision per slide, navigated by native scrolling with css scroll-snap
// (touch swipe, trackpad, wheel) plus arrow buttons and arrow keys.
// initialIndex jumps without notifying - the url already points there.
// onSlideChange fires for arrow navigation and settled user scrolling;
// arrow scrolls land on the index they already notified, so their settle
// is naturally silent
export const HistorySlider = ({
  children,
  initialIndex = 0,
  onSlideChange,
}: {
  children: ReactNode
  initialIndex?: number
  onSlideChange?: (index: number) => void
}) => {
  const trackRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(initialIndex)
  // mirrors activeIndex for the scroll listener without re-subscribing it
  const activeIndexRef = useRef(initialIndex)
  const onSlideChangeRef = useRef(onSlideChange)

  useEffect(() => {
    onSlideChangeRef.current = onSlideChange
  })

  const slideCount = Children.count(children)

  const goTo = (index: number) => {
    const slideCount = trackRef.current?.children.length ?? 0
    if (index < 0 || index >= slideCount) return
    activeIndexRef.current = index
    setActiveIndex(index)
    const track = trackRef.current
    const slide = track?.children[index] as HTMLElement | undefined
    if (track && slide) {
      const left =
        slide.getBoundingClientRect().left -
        track.getBoundingClientRect().left +
        track.scrollLeft
      track.scrollTo({ left, behavior: 'smooth' })
    }
    onSlideChangeRef.current?.(index)
  }

  useLayoutEffect(() => {
    if (initialIndex <= 0) return
    const track = trackRef.current
    const slide = track?.children[initialIndex] as HTMLElement | undefined
    if (!track || !slide) return
    const left =
      slide.getBoundingClientRect().left -
      track.getBoundingClientRect().left +
      track.scrollLeft
    track.scrollTo({ left, behavior: 'auto' })
    // mount-only: consumers remount via key when the url changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    let settleTimer: ReturnType<typeof setTimeout> | undefined
    const onScroll = () => {
      clearTimeout(settleTimer)
      // wait for the snap animation to settle before evaluating the position
      settleTimer = setTimeout(() => {
        const slideCount = track.children.length
        if (!slideCount) return
        const trackLeft = track.getBoundingClientRect().left
        const trackCenter = trackLeft + (track.clientWidth || 1) / 2
        let nearest = 0
        let nearestDistance = Infinity
        for (let i = 0; i < slideCount; i++) {
          const slide = track.children[i] as HTMLElement
          const slideCenter =
            slide.getBoundingClientRect().left + slide.offsetWidth / 2
          const distance = Math.abs(slideCenter - trackCenter)
          if (distance < nearestDistance) {
            nearestDistance = distance
            nearest = i
          }
        }
        if (activeIndexRef.current === nearest) return
        activeIndexRef.current = nearest
        setActiveIndex(nearest)
        onSlideChangeRef.current?.(nearest)
      }, 120)
    }
    track.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      clearTimeout(settleTimer)
      track.removeEventListener('scroll', onScroll)
    }
  }, [])

  const onKeyDown = (event: ReactKeyboardEvent) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      goTo(activeIndex - 1)
    }
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      goTo(activeIndex + 1)
    }
  }

  return (
    <div
      className={styles.wrapper}
      onKeyDown={onKeyDown}
    >
      {slideCount > 1 && (
        <button
          type="button"
          className={styles.previous}
          aria-label="neuere Version"
          disabled={activeIndex === 0}
          onClick={() => goTo(activeIndex - 1)}
        >
          <FaChevronLeft size={14} />
        </button>
      )}
      <div
        ref={trackRef}
        className={styles.track}
      >
        {Children.map(children, (child) => (
          <div className={styles.slide}>{child}</div>
        ))}
      </div>
      {slideCount > 1 && (
        <button
          type="button"
          className={styles.next}
          aria-label="ältere Version"
          disabled={activeIndex === slideCount - 1}
          onClick={() => goTo(activeIndex + 1)}
        >
          <FaChevronRight size={14} />
        </button>
      )}
    </div>
  )
}
