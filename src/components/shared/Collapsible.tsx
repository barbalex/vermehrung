import styles from './Collapsible.module.css'

/**
 * Section that expands/collapses without measuring height: grid-template-rows
 * animates 0fr to 1fr. Content stays mounted, so closing animates too.
 * Phases run sequentially like the former framer-motion usage:
 * opening expands first, then fades in; closing fades out first, then collapses.
 */
export const Collapsible = ({
  open,
  duration = 0.2,
  className,
  children,
}: {
  open: boolean
  /** duration of one phase in seconds; the full toggle takes twice that */
  duration?: number
  className?: string
  children: import('react').ReactNode
}) => (
  <div
    className={[styles.collapsible, open ? styles.open : '', className]
      .filter(Boolean)
      .join(' ')}
    style={
      {
        '--collapsible-duration': `${duration}s`,
      } as import('react').CSSProperties
    }
  >
    <div className={styles.inner}>{children}</div>
  </div>
)
