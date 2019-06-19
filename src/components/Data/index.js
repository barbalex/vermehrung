import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import loadable from '@loadable/component'

import storeContext from '../../storeContext'

const Data = () => {
  const { activeForm } = useContext(storeContext)

  switch (activeForm) {
    case 'art': {
      const Art = loadable(() => import('./Art'))
      return <Art />
    }
    case 'herkunft': {
      const Herkunft = loadable(() => import('./Herkunft'))
      return <Herkunft />
    }
    case 'sammlung': {
      const Sammlung = loadable(() => import('./Sammlung'))
      return <Sammlung />
    }
    case 'garten': {
      const Garten = loadable(() => import('./Garten'))
      return <Garten />
    }
    case 'kultur': {
      const Kultur = loadable(() => import('./Kultur'))
      return <Kultur />
    }
    case 'lieferung': {
      const Lieferung = loadable(() => import('./Lieferung'))
      return <Lieferung />
    }
    case 'person': {
      const Person = loadable(() => import('./Person'))
      return <Person />
    }
    case 'zaehlung': {
      const Zaehlung = loadable(() => import('./Zaehlung'))
      return <Zaehlung />
    }
    case 'event': {
      const Event = loadable(() => import('./Event'))
      return <Event />
    }
    default:
      return null
  }
}

export default observer(Data)
