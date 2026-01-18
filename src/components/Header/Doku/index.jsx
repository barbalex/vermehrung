import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import { FaHome } from 'react-icons/fa'
import { Link } from 'react-router'
import { useResizeDetector } from 'react-resize-detector'

import { ErrorBoundary } from '../../shared/ErrorBoundary.jsx'
import { DokuFilter } from './Filter/index.jsx'
import { constants } from '../../../utils/constants.js'

import styles from './index.module.css'

export const HeaderDoku = () => {
  const { width, ref } = useResizeDetector()
  const mobile = width && width < constants?.tree?.minimalWindowWidth

  return (
    <ErrorBoundary>
      <AppBar
        position="fixed"
        ref={ref}
      >
        <Toolbar>
          {mobile ?
            <IconButton
              color="inherit"
              aria-label="Home"
              component={Link}
              to="/"
              title="Home"
              size="large"
            >
              <FaHome />
            </IconButton>
          : <Button
              variant="outlined"
              component={Link}
              to="/"
              title="Home"
              className={styles.siteTitle}
            >
              Vermehrung
            </Button>
          }
          <div className={styles.spacer} />
          <DokuFilter />
          <Button
            variant="outlined"
            component={Link}
            to="/Vermehrung/"
            className={styles.navButton}
          >
            Daten
          </Button>
        </Toolbar>
      </AppBar>
    </ErrorBoundary>
  )
}
