import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import last from 'lodash/last'
import isUuid from 'is-uuid'

import Art from './Art'
import Arten from './Arten'
import Event from './Event'
import Events from './Events'
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
import Personen from './Personen'
import Zaehlung from './Zaehlung'
import Zaehlungen from './Zaehlungen'
import Teilkultur from './Teilkultur'
import Teilkulturen from './Teilkulturen'
import Root from './Root'
import StoreContext from '../../storeContext.js'

const Data = () => {
  const store = useContext(StoreContext)
  const { activeForm } = store
  const { activeNodeArray } = store.tree

  const id = last(activeNodeArray.filter((e) => isUuid.v1(e)))

  switch (activeForm) {
    case 'root': {
      return <Root />
    }
    case 'art': {
      return <Art id={id} />
    }
    case 'arten': {
      return <Arten />
    }
    case 'event': {
      return <Event id={id} />
    }
    case 'events': {
      return <Events />
    }
    case 'garten': {
      return <Garten id={id} />
    }
    case 'gaerten': {
      return <Gaerten />
    }
    case 'herkunft': {
      return <Herkunft id={id} />
    }
    case 'herkuenfte': {
      return <Herkuenfte />
    }
    case 'kultur': {
      return <Kultur id={id} />
    }
    case 'kulturen': {
      return <Kulturen />
    }
    case 'sammel_lieferung': {
      return <SammelLieferung id={id} />
    }
    case 'sammelLieferungen': {
      return <SammelLieferungen />
    }
    case 'lieferung': {
      return <Lieferung id={id} />
    }
    case 'lieferungen': {
      return <Lieferungen />
    }
    case 'person': {
      return <Person id={id} />
    }
    case 'personen': {
      return <Personen />
    }
    case 'sammlung': {
      return <Sammlung id={id} />
    }
    case 'sammlungen': {
      return <Sammlungen />
    }
    case 'teilkultur': {
      return <Teilkultur id={id} />
    }
    case 'teilkulturen': {
      return <Teilkulturen />
    }
    case 'zaehlung': {
      return <Zaehlung id={id} />
    }
    case 'zaehlungen': {
      return <Zaehlungen />
    }
    default:
      return null
  }
}

export default observer(Data)
