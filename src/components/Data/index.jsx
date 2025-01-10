import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import last from 'lodash/last'
import isUuid from 'is-uuid'

import { Art } from './Art/index.jsx'
import { Arten } from './Arten/index.jsx'
import { Event } from './Event/index.jsx'
import { Events } from './Events/index.jsx'
import { Herkunft } from './Herkunft/index.jsx'
import { Herkuenfte } from './Herkuenfte/index.jsx'
import { Sammlung } from './Sammlung/index.jsx'
import { Sammlungen } from './Sammlungen/index.jsx'
import Garten from './Garten/index.jsx'
import Gaerten from './Gaerten/index.jsx'
import Kultur from './Kultur/index.jsx'
import Kulturen from './Kulturen/index.jsx'
import { LieferungContainer as Lieferung } from './Lieferung/index.jsx'
import Lieferungen from './Lieferungen/index.jsx'
import { SammelLieferung } from './SammelLieferung/index.jsx'
import SammelLieferungen from './SammelLieferungen/index.jsx'
import Person from './Person/index.jsx'
import Personen from './Personen/index.jsx'
import Zaehlung from './Zaehlung/index.jsx'
import Zaehlungen from './Zaehlungen/index.jsx'
import Teilkultur from './Teilkultur/index.jsx'
import Teilkulturen from './Teilkulturen/index.jsx'
import Root from './Root/index.jsx'
import { MobxStoreContext } from '../../mobxStoreContext.js'

const Data = () => {
  const store = useContext(MobxStoreContext)
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
