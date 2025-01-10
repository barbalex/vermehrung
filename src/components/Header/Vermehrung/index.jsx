import React from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import styled from '@emotion/styled'
import { observer } from 'mobx-react-lite'
import { useResizeDetector } from 'react-resize-detector'

import Account from './Account.jsx'
import HamburgerMenu from './Menu/index.jsx'
import { Online } from './Online.jsx'
import Search from './Search/index.jsx'
import { ErrorBoundary } from '../../shared/ErrorBoundary.jsx'
import NavTree from './NavTree.jsx'
import Docu from './Docu.jsx'
import { HeaderFilter } from './Filter.jsx'
import { HeaderHome as Home } from './Home.jsx'
import { Menu } from '../../shared/Menu.jsx'

const Spacer = styled.div`
  flex-grow: 1;
`

export const HeaderVermehrung = observer(() => {
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
              <Spacer />
              <HeaderFilter />
              <Search />
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
              <Spacer />
              <HeaderFilter />
              <Search />
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
              <Spacer />
              <HeaderFilter />
              <Search />
              <Online />
              <Account />
              <HamburgerMenu />
              <Menu>
                <Docu asMenu />
              </Menu>
            </>
          : <>
              <Home />
              <Spacer />
              <Docu />
              <HeaderFilter />
              <Search />
              <Online />
              <Account />
              <HamburgerMenu />
            </>
          }
        </Toolbar>
      </AppBar>
    </ErrorBoundary>
  )
})
