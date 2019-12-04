import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'

import storeContext from '../../storeContext'
import Art from './Art'
import Arten from './Arten'
import Event from './Event'
import Herkunft from './Herkunft'
import Herkuenfte from './Herkuenfte'
import Sammlung from './Sammlung'
import Garten from './Garten'
import Kultur from './Kultur'
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
    case 'herkunft': {
      return <Herkunft />
    }
    case 'herkuenfte': {
      return <Herkuenfte />
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
