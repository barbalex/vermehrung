import styles from './Label.module.css'

export const Label = ({ label, color }: { label: string; color?: string }) => (
  <div className={styles.labelClass} style={color ? { color } : undefined}>
    {label}
  </div>
)
