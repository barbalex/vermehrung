import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'

import storeContext from '../../storeContext'
import Art from './Art'
import Arten from './Arten'
import Event from './Event'
import Herkunft from './Herkunft'
import Herkuenfte from './Herkuenfte'
import Sammlung from './Sammlung'
import Sammlungen from './Sammlungen'
import Garten from './Garten'
import Gaerten from './Gaerten'
import Kultur from './Kultur'
import Kulturen from './Kulturen'
import Lieferung from './Lieferung'
import Lieferungen from './Lieferungen'
import SammelLieferung from './SammelLieferung'
import SammelLieferungen from './SammelLieferungen'
import Person from './Person'
import Zaehlung from './Zaehlung'
import Zaehlungen from './Zaehlungen'
import Teilkultur from './Teilkultur'
import Teilkulturen from './Teilkulturen'

const Data = () => {
  const { activeForm } = useContext(storeContext)
  //console.log('Daten, activeForm:', activeForm)

  switch (activeForm) {
    case 'art': {
      return <Art />
    }
    case 'arten': {
      return <Arten />
    }
    case 'event': {
      return <Event />
    }
    case 'garten': {
      return <Garten />
    }
    case 'gaerten': {
      return <Gaerten />
    }
    case 'herkunft': {
      return <Herkunft />
    }
    case 'herkuenfte': {
      return <Herkuenfte />
    }
    case 'kultur': {
      return <Kultur />
    }
    case 'kulturen': {
      return <Kulturen />
    }
    case 'sammel_lieferung': {
      return <SammelLieferung />
    }
    case 'sammelLieferungen': {
      return <SammelLieferungen />
    }
    case 'lieferung': {
      return <Lieferung />
    }
    case 'lieferungen': {
      return <Lieferungen />
    }
    case 'person': {
      return <Person />
    }
    case 'sammlung': {
      return <Sammlung />
    }
    case 'sammlungen': {
      return <Sammlungen />
    }
    case 'teilkultur': {
      return <Teilkultur />
    }
    case 'teilkulturen': {
      return <Teilkulturen />
    }
    case 'zaehlung': {
      return <Zaehlung />
    }
    case 'zaehlungen': {
      return <Zaehlungen />
    }
    default:
      return null
  }
}

export default observer(Data)
