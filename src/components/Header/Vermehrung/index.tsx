import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import { useResizeDetector } from 'react-resize-detector'

import Account from './Account.tsx'
import { ThemeChooser } from '../../shared/ThemeChooser.tsx'
import { HeaderHamburgerMenu as HamburgerMenu } from './Menu/index.tsx'
import { Online } from './Online.tsx'
import { HeaderSearch } from './Search/index.tsx'
import { ErrorBoundary } from '../../shared/ErrorBoundary.tsx'
import { HeaderNavTree as NavTree } from './NavTree.tsx'
import { HeaderDocu as Docu } from './Docu.tsx'
import { HeaderFilter as Filter } from './Filter.tsx'
import { HeaderHome as Home } from './Home.tsx'
import { Menu } from '../../shared/Menu.tsx'

import styles from './index.module.css'

// TODO: use media queries instead of resize detector?
export const HeaderVermehrung = () => {
  const { width, ref } = useResizeDetector()

  return (
    <ErrorBoundary>
      <AppBar position="fixed" ref={ref}>
        <Toolbar>
          <NavTree />
          {(width ?? 0) < 509 ? (
            <>
              <div className={styles.spacer} />
              <Filter />
              <HeaderSearch />
              <Online />
              <Account />
              <ThemeChooser />
              <Menu>
                <Home asMenu />
                <Docu asMenu />
                <HamburgerMenu asMenu />
              </Menu>
            </>
          ) : (width ?? 0) < 557 ? (
            <>
              <Home />
              <div className={styles.spacer} />
              <Filter />
              <HeaderSearch />
              <Online />
              <Account />
              <ThemeChooser />
              <Menu>
                <Docu asMenu />
                <HamburgerMenu asMenu />
              </Menu>
            </>
          ) : (width ?? 0) < 605 ? (
            <>
              <Home />
              <div className={styles.spacer} />
              <Filter />
              <HeaderSearch />
              <Online />
              <Account />
              <ThemeChooser />
              <HamburgerMenu />
              <Menu>
                <Docu asMenu />
              </Menu>
            </>
          ) : (
            <>
              <Home />
              <div className={styles.spacer} />
              <Docu />
              <Filter />
              <HeaderSearch />
              <Online />
              <Account />
              <ThemeChooser />
              <HamburgerMenu />
            </>
          )}
        </Toolbar>
      </AppBar>
    </ErrorBoundary>
  )
}
