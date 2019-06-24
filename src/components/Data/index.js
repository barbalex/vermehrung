import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'

import storeContext from '../../storeContext'
import Art from './Art'
import Herkunft from './Herkunft'
import Sammlung from './Sammlung'
import Garten from './Garten'
import Kultur from './Kultur'
import Lieferung from './Lieferung'
import Person from './Person'
import Zaehlung from './Zaehlung'
import Event from './Event'

const Data = () => {
  const { activeForm } = useContext(storeContext)

  switch (activeForm) {
    case 'art': {
      return <Art />
    }
    case 'herkunft': {
      return <Herkunft />
    }
    case 'sammlung': {
      return <Sammlung />
    }
    case 'garten': {
      return <Garten />
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
    case 'zaehlung': {
      return <Zaehlung />
    }
    case 'event': {
      return <Event />
    }
    default:
      return null
  }
}

export default observer(Data)
