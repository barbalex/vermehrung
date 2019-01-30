import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'

import storeContext from '../../storeContext'
import Art from './Art'
import Kultur from './Kultur'
import Garten from './Garten'
import Herkunft from './Herkunft'
import Lieferung from './Lieferung'

const Data = () => {
  const store = useContext(storeContext)
  const { activeNodeArray: url } = store.tree

  if (url.length === 1) {
    return null
  }

  if (url.length === 2 && url[0] === 'Arten') {
    return <Art />
  }
  if (url.length === 2 && url[0] === 'Gaerten') {
    return <Garten />
  }
  if (url.length === 2 && url[0] === 'Herkuenfte') {
    return <Herkunft />
  }
  if (url.length === 2 && url[0] === 'Lieferungen') {
    return <Lieferung />
  }
  if (url.length === 2 && url[0] === 'Personen') {
    return null
  }
  if (url.length === 2 && url[0] === 'Sammlungen') {
    return null
  }
  if (url.length === 2 && url[0] === 'Kulturen') {
    return <Kultur />
  }

  if (
    url.length === 2 &&
    url[0] === 'Werte-Listen' &&
    url[1] === 'Zaehleinheiten'
  ) {
    return null
  }
  if (
    url.length === 2 &&
    url[0] === 'Werte-Listen' &&
    url[1] === 'Lieferung-Status'
  ) {
    return null
  }
  if (
    url.length === 2 &&
    url[0] === 'Werte-Listen' &&
    url[1] === 'Lieferung-Typ'
  ) {
    return null
  }
  if (
    url.length === 2 &&
    url[0] === 'Werte-Listen' &&
    url[1] === 'Lieferung-Zwischenlager'
  ) {
    return null
  }
  if (
    url.length === 2 &&
    url[0] === 'Werte-Listen' &&
    url[1] === 'Masseinheiten'
  ) {
    return null
  }
  if (url.length === 2 && url[0] === 'Herkuenfte') {
    return null
  }

  if (url.length === 3 && url[0] === 'Arten') {
    return <Art />
  }
  if (url.length === 3 && url[0] === 'Gaerten') {
    return <Garten />
  }
  if (url.length === 3 && url[0] === 'Herkuenfte') {
    return <Herkunft />
  }
  if (url.length === 3 && url[0] === 'Personen' && url[2] === 'Gaerten') {
    return null
  }
  if (url.length === 3 && url[0] === 'Personen' && url[2] === 'Sammlungen') {
    return null
  }
  if (url.length === 3 && url[0] === 'Personen' && url[2] === 'Lieferungen') {
    return null
  }
  if (url.length === 3 && url[0] === 'Sammlungen' && url[2] === 'Kulturen') {
    return null
  }
  if (url.length === 3 && url[0] === 'Sammlungen' && url[2] === 'Lieferungen') {
    return null
  }
  if (url.length === 3 && url[0] === 'Kulturen') {
    return <Kultur />
  }
  if (
    url.length === 3 &&
    url[0] === 'Kulturen' &&
    url[2] === 'An-Lieferungen'
  ) {
    return null
  }
  if (
    url.length === 3 &&
    url[0] === 'Kulturen' &&
    url[2] === 'Aus-Lieferungen'
  ) {
    return null
  }
  if (url.length === 3 && url[0] === 'Kulturen' && url[2] === 'Events') {
    return null
  }
  if (url.length === 3 && url[0] === 'Kulturen' && url[2] === 'Inventare') {
    return null
  }

  if (url.length === 4 && url[0] === 'Arten' && url[2] === 'Kulturen') {
    return <Kultur />
  }
  if (url.length === 4 && url[0] === 'Arten' && url[2] === 'Sammlungen') {
    return null
  }
  if (url.length === 4 && url[0] === 'Gaerten' && url[2] === 'Kulturen') {
    return <Kultur />
  }
  if (url.length === 4 && url[0] === 'Herkuenfte' && url[2] === 'Sammlungen') {
    return null
  }
  if (url.length === 4 && url[0] === 'Personen' && url[2] === 'Gaerten') {
    return <Garten />
  }
  if (url.length === 4 && url[0] === 'Sammlungen' && url[2] === 'Herkuenfte') {
    return <Herkunft />
  }
  if (url.length === 4 && url[0] === 'Sammlungen' && url[2] === 'Kulturen') {
    return <Kultur />
  }
  if (url.length === 4 && url[0] === 'Sammlungen' && url[2] === 'Lieferungen') {
    return null
  }
  if (url.length === 4 && url[0] === 'Kulturen' && url[2] === 'Zaehlungen') {
    return null
  }
  if (
    url.length === 4 &&
    url[0] === 'Kulturen' &&
    url[2] === 'An-Lieferungen'
  ) {
    return null
  }
  if (
    url.length === 4 &&
    url[0] === 'Kulturen' &&
    url[2] === 'Aus-Lieferungen'
  ) {
    return null
  }
  if (url.length === 4 && url[0] === 'Kulturen' && url[2] === 'Events') {
    return null
  }
  if (url.length === 4 && url[0] === 'Kulturen' && url[2] === 'Inventare') {
    return null
  }

  if (url.length === 5 && url[0] === 'Arten' && url[2] === 'Kulturen') {
    return <Kultur />
  }

  if (url.length === 5 && url[0] === 'Gaerten' && url[2] === 'Kulturen') {
    return <Kultur />
  }
  if (url.length === 5 && url[0] === 'Arten' && url[2] === 'Sammlungen') {
    return null
  }
  if (url.length === 5 && url[0] === 'Herkuenfte' && url[2] === 'Sammlungen') {
    return null
  }
  if (url.length === 5 && url[0] === 'Personen' && url[2] === 'Gaerten') {
    return <Garten />
  }
  if (
    url.length === 6 &&
    url[0] === 'Personen' &&
    url[2] === 'Gaerten' &&
    url[4] === 'Kulturen'
  ) {
    return <Kultur />
  }
  return null
}

export default observer(Data)
