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

// items fold into the more-menu (an icon button is ~48px wide),
// least needed first, as the window gets narrower
const FOLD_BELOW_WIDTH = {
  docu: 605,
  hamburgerMenu: 557,
  home: 509,
  themeChooser: 461,
  account: 413,
  online: 365,
}

export const HeaderVermehrung = () => {
  const { width, ref } = useResizeDetector()

  const fold = {
    docu: (width ?? 0) < FOLD_BELOW_WIDTH.docu,
    hamburgerMenu: (width ?? 0) < FOLD_BELOW_WIDTH.hamburgerMenu,
    home: (width ?? 0) < FOLD_BELOW_WIDTH.home,
    themeChooser: (width ?? 0) < FOLD_BELOW_WIDTH.themeChooser,
    account: (width ?? 0) < FOLD_BELOW_WIDTH.account,
    online: (width ?? 0) < FOLD_BELOW_WIDTH.online,
  }
  const anyFolded = Object.values(fold).some(Boolean)

  return (
    <ErrorBoundary>
      <AppBar position="fixed" ref={ref}>
        <Toolbar>
          <NavTree />
          {!fold.home && <Home />}
          <div className={styles.spacer} />
          {!fold.docu && <Docu />}
          <Filter />
          <HeaderSearch />
          {!fold.online && <Online />}
          {!fold.account && <Account />}
          {!fold.themeChooser && <ThemeChooser />}
          {!fold.hamburgerMenu && <HamburgerMenu />}
          {anyFolded && (
            <Menu>
              {fold.home && <Home asMenu />}
              {fold.docu && <Docu asMenu />}
              {fold.hamburgerMenu && <HamburgerMenu asMenu />}
              {fold.online && <Online asMenu />}
              {fold.account && <Account asMenu />}
              {fold.themeChooser && <ThemeChooser asMenu />}
            </Menu>
          )}
        </Toolbar>
      </AppBar>
    </ErrorBoundary>
  )
}
