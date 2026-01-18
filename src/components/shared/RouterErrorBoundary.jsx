import { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { useRouteError } from 'react-router'
import Button from '@mui/material/Button'

import { logout } from '../../utils/logout.js'
import { MobxStoreContext } from '../../mobxStoreContext.js'

import styles from './ErrorBoundary.module.css'

const onReload = () => window.location.reload(true)

export const RouterErrorBoundary = observer(({ children }) => {
  const error = useRouteError()
  const store = useContext(MobxStoreContext)

  const onReset = () => logout({ store })

  return (
    <div className={styles.container}>
      <p>Sorry, ein Fehler ist aufgetreten:</p>
      <pre className={styles.preWrapping}>{error.message}</pre>
      <div className={styles.buttonContainer}>
        <Button
          variant="outlined"
          onClick={onReload}
          color="inherit"
          className={styles.button}
        >
          neu starten
        </Button>
      </div>
      <div className={styles.buttonContainer}>
        <Button
          variant="outlined"
          onClick={onReset}
          color="inherit"
          className={styles.button}
        >
          Cache leeren und neu starten (neue Anmeldung nötig)
        </Button>
      </div>
    </div>
  )
})
