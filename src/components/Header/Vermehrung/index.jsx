import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import { useResizeDetector } from 'react-resize-detector'

import Account from './Account.jsx'
import { HeaderHamburgerMenu as HamburgerMenu } from './Menu/index.jsx'
import { Online } from './Online.jsx'
import { HeaderSearch } from './Search/index.jsx'
import { ErrorBoundary } from '../../shared/ErrorBoundary.jsx'
import { HeaderNavTree as NavTree } from './NavTree.jsx'
import { HeaderDocu as Docu } from './Docu.jsx'
import { HeaderFilter as Filter } from './Filter.jsx'
import { HeaderHome as Home } from './Home.jsx'
import { Menu } from '../../shared/Menu.jsx'

import { spacer } from './index.module.css'

// TODO: use media queries instead of resize detector?
export const HeaderVermehrung = () => {
  const { width, ref } = useResizeDetector()

  return (
    <ErrorBoundary>
      <AppBar
        position="fixed"
        ref={ref}
      >
        <Toolbar>
          <NavTree />
          {width < 509 ?
            <>
              <div className={spacer} />
              <Filter />
              <HeaderSearch />
              <Online />
              <Account />
              <Menu>
                <Home asMenu />
                <Docu asMenu />
                <HamburgerMenu asMenu />
              </Menu>
            </>
          : width < 557 ?
            <>
              <Home />
              <div className={spacer} />
              <Filter />
              <HeaderSearch />
              <Online />
              <Account />
              <Menu>
                <Docu asMenu />
                <HamburgerMenu asMenu />
              </Menu>
            </>
          : width < 605 ?
            <>
              <Home />
              <div className={spacer} />
              <Filter />
              <HeaderSearch />
              <Online />
              <Account />
              <HamburgerMenu />
              <Menu>
                <Docu asMenu />
              </Menu>
            </>
          : <>
              <Home />
              <div className={spacer} />
              <Docu />
              <Filter />
              <HeaderSearch />
              <Online />
              <Account />
              <HamburgerMenu />
            </>
          }
        </Toolbar>
      </AppBar>
    </ErrorBoundary>
  )
}
