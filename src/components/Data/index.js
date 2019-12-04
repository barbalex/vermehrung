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
import SammelLieferung from './SammelLieferung'
import Person from './Person'
import Zaehlung from './Zaehlung'
import Teilkultur from './Teilkultur'

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
    case 'lieferung': {
      return <Lieferung />
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
    case 'zaehlung': {
      return <Zaehlung />
    }
    default:
      return null
  }
}

export default observer(Data)
