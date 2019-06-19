import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
//import { getSnapshot } from 'mobx-state-tree'

import storeContext from '../../storeContext'
import Art from './Art'
import Kultur from './Kultur'
import Garten from './Garten'
import Herkunft from './Herkunft'
import Lieferung from './Lieferung'
import Person from './Person'
import Sammlung from './Sammlung'
import Zaehlung from './Zaehlung'
import Event from './Event'

const Data = ({ filter }) => {
  const store = useContext(storeContext)
  const { activeNodeArray: url } = store.tree

  if (url.length === 1) {
    return null
  }

  if ([2, 3].includes(url.length) && url[0] === 'Arten') {
    return <Art filter={!!filter} />
  }
  if ([2, 3].includes(url.length) && url[0] === 'Gaerten') {
    return <Garten filter={!!filter} />
  }
  if ([2, 3].includes(url.length) && url[0] === 'Herkuenfte') {
    return <Herkunft filter={!!filter} />
  }
  if (url.length === 2 && url[0] === 'Lieferungen') {
    return <Lieferung filter={!!filter} />
  }
  if ([2, 3].includes(url.length) && url[0] === 'Personen') {
    return <Person filter={!!filter} />
  }
  if ([2, 3].includes(url.length) && url[0] === 'Sammlungen') {
    return <Sammlung filter={!!filter} />
  }
  if ([2, 3].includes(url.length) && url[0] === 'Kulturen') {
    return <Kultur filter={!!filter} />
  }

  if (url.length === 4 && url[0] === 'Arten' && url[2] === 'Kulturen') {
    return <Kultur filter={!!filter} />
  }
  if (url.length === 4 && url[0] === 'Arten' && url[2] === 'Sammlungen') {
    return <Sammlung filter={!!filter} />
  }
  if (url.length === 4 && url[0] === 'Gaerten' && url[2] === 'Kulturen') {
    return <Kultur filter={!!filter} />
  }
  if (url.length === 4 && url[0] === 'Herkuenfte' && url[2] === 'Sammlungen') {
    return <Sammlung filter={!!filter} />
  }
  if (url.length === 4 && url[0] === 'Personen' && url[2] === 'Gaerten') {
    return <Garten filter={!!filter} />
  }
  if (url.length === 4 && url[0] === 'Personen' && url[2] === 'Sammlungen') {
    return <Sammlung filter={!!filter} />
  }
  if (url.length === 4 && url[0] === 'Sammlungen' && url[2] === 'Herkuenfte') {
    return <Herkunft filter={!!filter} />
  }
  if (url.length === 4 && url[0] === 'Sammlungen' && url[2] === 'Kulturen') {
    return <Kultur filter={!!filter} />
  }
  if (
    url.length === 4 &&
    url[0] === 'Sammlungen' &&
    url[2] === 'Aus-Lieferungen'
  ) {
    return <Lieferung filter={!!filter} />
  }
  if (url.length === 4 && url[0] === 'Kulturen' && url[2] === 'Zaehlungen') {
    return <Zaehlung filter={!!filter} />
  }
  if (
    url.length === 4 &&
    url[0] === 'Kulturen' &&
    url[2] === 'An-Lieferungen'
  ) {
    return <Lieferung filter={!!filter} />
  }
  if (
    url.length === 4 &&
    url[0] === 'Kulturen' &&
    url[2] === 'Aus-Lieferungen'
  ) {
    return <Lieferung filter={!!filter} />
  }
  if (url.length === 4 && url[0] === 'Kulturen' && url[2] === 'Events') {
    return <Event filter={!!filter} />
  }
  if (url.length === 4 && url[0] === 'Personen' && url[2] === 'Lieferungen') {
    return <Lieferung filter={!!filter} />
  }

  if (url.length === 5 && url[0] === 'Arten' && url[2] === 'Kulturen') {
    return <Kultur filter={!!filter} />
  }

  if (url.length === 5 && url[0] === 'Gaerten' && url[2] === 'Kulturen') {
    return <Kultur filter={!!filter} />
  }
  if (url.length === 5 && url[0] === 'Arten' && url[2] === 'Sammlungen') {
    return <Sammlung filter={!!filter} />
  }
  if (url.length === 5 && url[0] === 'Herkuenfte' && url[2] === 'Sammlungen') {
    return <Sammlung filter={!!filter} />
  }
  if (url.length === 5 && url[0] === 'Personen' && url[2] === 'Gaerten') {
    return <Garten filter={!!filter} />
  }
  if (
    url.length === 5 &&
    url[0] === 'Sammlungen' &&
    url[2] === 'Aus-Lieferungen'
  ) {
    return <Lieferung filter={!!filter} />
  }
  if (
    url.length === 6 &&
    url[0] === 'Arten' &&
    url[2] === 'Kulturen' &&
    ['An-Lieferungen', 'Aus-Lieferungen'].includes(url[4])
  ) {
    return <Lieferung filter={!!filter} />
  }
  if (
    url.length === 6 &&
    url[0] === 'Arten' &&
    url[2] === 'Sammlungen' &&
    url[4] === 'Aus-Lieferungen'
  ) {
    return <Lieferung filter={!!filter} />
  }
  if (
    url.length === 6 &&
    url[0] === 'Arten' &&
    url[2] === 'Kulturen' &&
    url[4] === 'Zaehlungen'
  ) {
    return <Zaehlung filter={!!filter} />
  }
  if (
    url.length === 6 &&
    url[0] === 'Arten' &&
    url[2] === 'Kulturen' &&
    url[4] === 'Events'
  ) {
    return <Event filter={!!filter} />
  }
  if (
    url.length === 6 &&
    url[0] === 'Gaerten' &&
    url[2] === 'Kulturen' &&
    ['An-Lieferungen', 'Aus-Lieferungen'].includes(url[4])
  ) {
    return <Lieferung filter={!!filter} />
  }
  if (
    url.length === 6 &&
    url[0] === 'Gaerten' &&
    url[2] === 'Kulturen' &&
    url[4] === 'Zaehlungen'
  ) {
    return <Zaehlung filter={!!filter} />
  }
  if (
    url.length === 6 &&
    url[0] === 'Gaerten' &&
    url[2] === 'Kulturen' &&
    url[4] === 'Events'
  ) {
    return <Event filter={!!filter} />
  }
  if (
    url.length === 6 &&
    url[0] === 'Herkuenfte' &&
    url[2] === 'Sammlungen' &&
    url[4] === 'Aus-Lieferungen'
  ) {
    return <Lieferung filter={!!filter} />
  }
  if (
    url.length === 6 &&
    url[0] === 'Personen' &&
    url[2] === 'Gaerten' &&
    url[4] === 'Kulturen'
  ) {
    return <Kultur filter={!!filter} />
  }
  if (
    url.length === 6 &&
    url[0] === 'Sammlungen' &&
    url[2] === 'Aus-Lieferungen' &&
    url[4] === 'Kulturen'
  ) {
    return <Kultur filter={!!filter} />
  }

  if (
    url.length === 7 &&
    url[0] === 'Sammlungen' &&
    url[2] === 'Aus-Lieferungen' &&
    url[4] === 'Kulturen'
  ) {
    return <Kultur filter={!!filter} />
  }
  if (
    url.length === 7 &&
    url[0] === 'Personen' &&
    url[2] === 'Gaerten' &&
    url[4] === 'Kulturen'
  ) {
    return <Kultur filter={!!filter} />
  }

  if (
    url.length === 8 &&
    url[0] === 'Personen' &&
    url[2] === 'Gaerten' &&
    url[4] === 'Kulturen' &&
    ['An-Lieferungen', 'Aus-Lieferungen'].includes(url[6])
  ) {
    return <Lieferung filter={!!filter} />
  }
  if (
    url.length === 8 &&
    url[0] === 'Personen' &&
    url[2] === 'Gaerten' &&
    url[4] === 'Kulturen' &&
    url[6] === 'Zaehlungen'
  ) {
    return <Zaehlung filter={!!filter} />
  }
  if (
    url.length === 8 &&
    url[0] === 'Personen' &&
    url[2] === 'Gaerten' &&
    url[4] === 'Kulturen' &&
    url[6] === 'Events'
  ) {
    return <Event filter={!!filter} />
  }
  if (
    url.length === 8 &&
    url[0] === 'Sammlungen' &&
    url[2] === 'Aus-Lieferungen' &&
    url[4] === 'Kulturen' &&
    ['An-Lieferungen', 'Aus-Lieferungen'].includes(url[6])
  ) {
    return <Lieferung filter={!!filter} />
  }
  if (
    url.length === 8 &&
    url[0] === 'Sammlungen' &&
    url[2] === 'Aus-Lieferungen' &&
    url[4] === 'Kulturen' &&
    url[6] === 'Zaehlungen'
  ) {
    return <Zaehlung filter={!!filter} />
  }
  if (
    url.length === 8 &&
    url[0] === 'Sammlungen' &&
    url[2] === 'Aus-Lieferungen' &&
    url[4] === 'Kulturen' &&
    url[6] === 'Events'
  ) {
    return <Event filter={!!filter} />
  }
  return null
}

export default observer(Data)
