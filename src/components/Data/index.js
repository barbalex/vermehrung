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
import { StoreContext } from '../../models/reactUtils'
import DataProvider from '../shared/DataProvider'

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
      return (
        <DataProvider id={id} table={activeForm}>
          <Art id={id} />
        </DataProvider>
      )
    }
    case 'arten': {
      return <Arten />
    }
    case 'event': {
      return (
        <DataProvider id={id} table={activeForm}>
          <Event id={id} />
        </DataProvider>
      )
    }
    case 'events': {
      return <Events />
    }
    case 'garten': {
      return (
        <DataProvider id={id} table={activeForm}>
          <Garten id={id} />
        </DataProvider>
      )
    }
    case 'gaerten': {
      return <Gaerten />
    }
    case 'herkunft': {
      return (
        <DataProvider id={id} table={activeForm}>
          <Herkunft id={id} />
        </DataProvider>
      )
    }
    case 'herkuenfte': {
      return <Herkuenfte />
    }
    case 'kultur': {
      return (
        <DataProvider id={id} table={activeForm}>
          <Kultur id={id} />
        </DataProvider>
      )
    }
    case 'kulturen': {
      return <Kulturen />
    }
    case 'sammel_lieferung': {
      return (
        <DataProvider id={id} table={activeForm}>
          <SammelLieferung id={id} />
        </DataProvider>
      )
    }
    case 'sammelLieferungen': {
      return <SammelLieferungen />
    }
    case 'lieferung': {
      return (
        <DataProvider id={id} table={activeForm}>
          <Lieferung id={id} />
        </DataProvider>
      )
    }
    case 'lieferungen': {
      return <Lieferungen />
    }
    case 'person': {
      return (
        <DataProvider id={id} table={activeForm}>
          <Person id={id} />
        </DataProvider>
      )
    }
    case 'personen': {
      return <Personen />
    }
    case 'sammlung': {
      return (
        <DataProvider id={id} table={activeForm}>
          <Sammlung id={id} />
        </DataProvider>
      )
    }
    case 'sammlungen': {
      return <Sammlungen />
    }
    case 'teilkultur': {
      return (
        <DataProvider id={id} table={activeForm}>
          <Teilkultur id={id} />
        </DataProvider>
      )
    }
    case 'teilkulturen': {
      return <Teilkulturen />
    }
    case 'zaehlung': {
      return (
        <DataProvider id={id} table={activeForm}>
          <Zaehlung id={id} />
        </DataProvider>
      )
    }
    case 'zaehlungen': {
      return <Zaehlungen />
    }
    default:
      return null
  }
}

export default observer(Data)
