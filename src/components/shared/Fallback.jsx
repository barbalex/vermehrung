import CircularProgress from '@mui/material/CircularProgress'

import { spinnerContainer } from './Fallback.module.css'

export const Fallback = () => (
  <div className={spinnerContainer}>
    <CircularProgress />
  </div>
)
