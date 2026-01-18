import CircularProgress from '@mui/material/CircularProgress'

import styles from './Fallback.module.css'

export const Fallback = () => (
  <div className={styles.spinnerContainer}>
    <CircularProgress />
  </div>
)
