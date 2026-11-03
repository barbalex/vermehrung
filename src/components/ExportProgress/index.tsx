import { useAtomValue } from 'jotai'
import LinearProgress from '@mui/material/LinearProgress'
import Paper from '@mui/material/Paper'

import { exportProgressAtom } from '../../store/index.ts'

import styles from './index.module.css'

export const ExportProgress = () => {
  const progress = useAtomValue(exportProgressAtom)

  if (!progress) return null

  const hasTotal = !!progress.total

  return (
    <Paper
      className={styles.container}
      elevation={4}
    >
      <div className={styles.message}>{progress.message}</div>
      {hasTotal ?
        <LinearProgress
          variant="determinate"
          value={((progress.done ?? 0) / (progress.total ?? 1)) * 100}
        />
      : <LinearProgress />}
      {hasTotal && (
        <div className={styles.count}>
          {progress.done ?? 0} / {progress.total}
        </div>
      )}
    </Paper>
  )
}
