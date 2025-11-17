import { useContext } from 'react'
import Switch from '@mui/material/Switch'
import { observer } from 'mobx-react-lite'

import { Label } from './Label.jsx'
import { MobxStoreContext } from '../../mobxStoreContext.js'
import { ErrorBoundary } from './ErrorBoundary.jsx'

import { container, switchClass } from './ApFilter.module.css'

export const ApFilter = observer(({ color }) => {
  const store = useContext(MobxStoreContext)
  const { apFilter, setApFilter } = store

  const onChange = () => setApFilter(!apFilter)

  return (
    <ErrorBoundary>
      <div className={container}>
        <Label
          label="nur AP"
          color={color}
        />
        <Switch
          data-id="ap-filter"
          checked={apFilter}
          onChange={onChange}
          color="primary"
          className={switchClass}
        />
      </div>
    </ErrorBoundary>
  )
})
