import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'
import SplitPane from 'react-split-pane'

import storeContext from '../../storeContext'
import Art from './Art'
import Aufgabe from './Aufgabe'
import Herkunft from './Herkunft'
import Sammlung from './Sammlung'
import Garten from './Garten'
import Kultur from './Kultur'
import Lieferung from './Lieferung'
import SammelLieferung from './SammelLieferung'
import Person from './Person'
import Zaehlung from './Zaehlung'
import Teilkultur from './Teilkultur'

const StyledSplitPane = styled(SplitPane)`
  height: calc(100vh - 64px) !important;
  .Resizer {
    background: rgba(74, 20, 140, 0.1);
    opacity: 1;
    z-index: 1;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 7px;
    cursor: col-resize;
  }
  .Resizer:hover {
    -webkit-transition: all 0.5s ease;
    transition: all 0.5s ease;
    background-color: #fff59d !important;
  }
  .Resizer.disabled {
    cursor: not-allowed;
  }
  .Resizer.disabled:hover {
    border-color: transparent;
  }
  .Pane {
    overflow: hidden;
  }
`

const Data = () => {
  const { activeForm } = useContext(storeContext)
  //console.log('Daten, activeForm:', activeForm)

  switch (activeForm) {
    case 'art': {
      return <Art />
    }
    case 'aufgabe': {
      return <Aufgabe />
    }
    case 'garten': {
      return <Garten />
    }
    case 'herkunft': {
      return <Herkunft />
    }
    case 'kultur': {
      return <Kultur />
    }
    case 'sammel_lieferung': {
      return <SammelLieferung />
    }
    case 'lieferung': {
      return <Lieferung />
    }
    case 'person': {
      return <Person />
    }
    case 'sammlung': {
      return <Sammlung />
    }
    case 'teilkultur': {
      return <Teilkultur />
    }
    case 'zaehlung': {
      return <Zaehlung />
    }
    default:
      return null
  }
}

export default observer(Data)
