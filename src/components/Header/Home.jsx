import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import { FaHome } from 'react-icons/fa'
import { Link } from 'react-router'
import { useResizeDetector } from 'react-resize-detector'

import { ErrorBoundary } from '../shared/ErrorBoundary.jsx'
import { constants } from '../../utils/constants.js'

import { siteTitle, spacer, navButton } from './Home.module.css'

export const HeaderHome = ({ location }) => {
  const { width, ref } = useResizeDetector()
  const mobile = width && width < constants?.tree?.minimalWindowWidth
  const { pathname } = location
  const isHome = pathname === '/'

  return (
    <ErrorBoundary>
      <AppBar
        position="fixed"
        ref={ref}
      >
        <Toolbar>
          {mobile ?
            isHome ?
              <div />
            : <IconButton
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
              className={siteTitle}
            >
              Vermehrung
            </Button>
          }
          <div className={spacer} />
          <Button
            variant="outlined"
            component={Link}
            to="/Dokumentation/"
            className={navButton}
          >
            Dokumentation
          </Button>
          <Button
            variant="outlined"
            component={Link}
            to="/Vermehrung/"
            className={navButton}
          >
            Daten
          </Button>
        </Toolbar>
      </AppBar>
    </ErrorBoundary>
  )
}
