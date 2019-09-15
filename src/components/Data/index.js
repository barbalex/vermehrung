import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'

import storeContext from '../../storeContext'
import Art from './Art'
import Aufgabe from './Aufgabe'
import Event from './Event'
import Herkunft from './Herkunft'
import Sammlung from './Sammlung'
import Garten from './Garten'
import Kultur from './Kultur'
import Lieferung from './Lieferung'
import Person from './Person'
import Zaehlung from './Zaehlung'
import Teilkultur from './Teilkultur'

const Data = () => {
  const { activeForm } = useContext(storeContext)

  switch (activeForm) {
    case 'art': {
      return <Art />
    }
    case 'aufgabe': {
      return <Aufgabe />
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
    case 'kultur': {
      return <Kultur />
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
