import { useAtomValue } from 'jotai'
import Switch from '@mui/material/Switch'

import { Label } from './Label.tsx'
import { apFilterAtom, setApFilter } from '../../store/index.ts'
import { ErrorBoundary } from './ErrorBoundary.tsx'

import styles from './ApFilter.module.css'

export const ApFilter = ({ color }) => {
  const apFilter = useAtomValue(apFilterAtom)

  const onChange = () => setApFilter(!apFilter)

  return (
    <ErrorBoundary>
      <div className={styles.container}>
        <Label label="nur AP" color={color} />
        <Switch
          data-id="ap-filter"
          checked={apFilter}
          onChange={onChange}
          color="primary"
          className={styles.switchClass}
        />
      </div>
    </ErrorBoundary>
  )
}
