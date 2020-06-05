import memoizeOne from 'memoize-one'

import sort from '../sort'
import allParentNodesAreOpen from '../allParentNodesAreOpen'

import buildSammelLieferungSammelLieferung from './sammelLieferung'
import buildSammelLieferungLieferungFolder from './sammelLieferung/lieferung/folder'
import buildSammelLieferungLieferungLieferung from './sammelLieferung/lieferung'

import buildTeilkulturTeilkultur from './teilkultur'

import buildZaehlungZaehlung from './zaehlung'

import buildSammlungSammlung from './sammlung'
import buildSammlungHerkunftFolder from './sammlung/herkunft/folder'
import buildSammlungHerkunftHerkunft from './sammlung/herkunft'
import buildSammlungAusLieferungFolder from './sammlung/auslieferung/folder'
import buildSammlungAusLieferungLieferung from './sammlung/auslieferung'
import buildSammlungAusLieferungKulturFolder from './sammlung/auslieferung/kultur/folder'
import buildSammlungAusLieferungKulturKultur from './sammlung/auslieferung/kultur'
import buildSammlungAusLieferungKulturZaehlungFolder from './sammlung/auslieferung/kultur/zaehlung/folder'
import buildSammlungAusLieferungKulturZaehlungZaehlung from './sammlung/auslieferung/kultur/zaehlung'
import buildSammlungAusLieferungKulturEventFolder from './sammlung/auslieferung/kultur/event/folder'
import buildSammlungAusLieferungKulturEventEvent from './sammlung/auslieferung/kultur/event'
import buildSammlungAusLieferungKulturAusLieferungFolder from './sammlung/auslieferung/kultur/auslieferung/folder'
import buildSammlungAusLieferungKulturAusLieferungLieferung from './sammlung/auslieferung/kultur/auslieferung'
import buildSammlungAusLieferungKulturAnLieferungFolder from './sammlung/auslieferung/kultur/anlieferung/folder'
import buildSammlungAusLieferungKulturAnLieferungLieferung from './sammlung/auslieferung/kultur/anlieferung'

export default ({ store, loading, role }) => {
  const { userPersonOption } = store
  const {
    artFolder,
    art,
    artSammlungFolder,
    artSammlung,
    artSammlungAusLieferungFolder,
    artSammlungAusLieferung,
    artKulturFolder,
    artKultur,
    artKulturEventFolder,
    artKulturEvent,
    artKulturAusLieferungFolder,
    artKulturAusLieferung,
    artKulturAnLieferungFolder,
    artKulturAnLieferung,
    artKulturTeilkulturFolder,
    artKulturTeilkultur,
    artKulturZaehlungFolder,
    artKulturZaehlung,
    eventFolder,
    event,
    gartenFolder,
    garten,
    gartenKulturEventFolder,
    gartenKulturEvent,
    gartenKulturFolder,
    gartenKultur,
    gartenKulturAnLieferungFolder,
    gartenKulturAnLieferung,
    gartenKulturAusLieferungFolder,
    gartenKulturAusLieferung,
    gartenKulturTeilkulturFolder,
    gartenKulturTeilkultur,
    gartenKulturZaehlungFolder,
    gartenKulturZaehlung,
    herkunftFolder,
    herkunft,
    herkunftSammlungFolder,
    herkunftSammlung,
    herkunftSammlungAusLieferungFolder,
    herkunftSammlungausLieferung,
    kulturFolder,
    kultur,
    kulturEventFolder,
    kulturEventEvent,
    kulturAnLieferungFolder,
    kulturLieferungAnLieferung,
    kulturAusLieferungFolder,
    kulturLieferungAusLieferung,
    kulturTeilkulturFolder,
    kulturTeilkultur,
    kulturZaehlungFolder,
    kulturZaehlung,
    lieferungFolder,
    lieferungLieferung,
    personFolder,
    personPerson,
    personGartenFolder,
    personLieferungFolder,
    personGarten,
    personGartenKulturFolder,
    personGartenKultur,
    personGartenKulturEventFolder,
    personGartenKulturEvent,
    personGartenKulturAnlieferungFolder,
    personGartenKulturAnlieferung,
    personGartenKulturAuslieferungFolder,
    personGartenKulturAuslieferung,
    personGartenKulturTeilkulturFolder,
    personGartenKulturTeilkultur,
    personGartenKulturZaehlungFolder,
    personGartenKulturZaehlung,
    personLieferung,
    personSammlungFolder,
    personSammlungSammlung,
    sammelLieferungFolder,
    sammlungFolder,
    teilkulturFolder,
    zaehlungFolder,
  } = store.tree
  const openNodes = store.tree.openNodes.sort(sort)

  const { tree_teilkultur, tree_zaehlung } = userPersonOption
  const showSammlungFolder = role !== 'gaertner'
  const showTeilkulturFolder = tree_teilkultur
  const showZaehlungFolder = tree_zaehlung

  let nodes = [
    ...artFolder,
    ...art,
    ...artSammlungFolder,
    ...artSammlung,
    ...artSammlungAusLieferungFolder,
    ...artSammlungAusLieferung,
    ...artKulturFolder,
    ...artKulturZaehlungFolder,
    ...artKulturZaehlung,
    ...artKultur,
    ...artKulturEventFolder,
    ...artKulturEvent,
    ...artKulturAusLieferungFolder,
    ...artKulturAusLieferung,
    ...artKulturAnLieferungFolder,
    ...artKulturAnLieferung,
    ...artKulturTeilkulturFolder,
    ...artKulturTeilkultur,
    ...gartenFolder,
    ...garten,
    ...gartenKulturEventFolder,
    ...gartenKulturEvent,
    ...gartenKulturFolder,
    ...gartenKultur,
    ...gartenKulturAnLieferungFolder,
    ...gartenKulturAnLieferung,
    ...gartenKulturAusLieferungFolder,
    ...gartenKulturAusLieferung,
    ...gartenKulturTeilkulturFolder,
    ...gartenKulturTeilkultur,
    ...gartenKulturZaehlungFolder,
    ...gartenKulturZaehlung,
    ...herkunftFolder,
    ...herkunft,
    ...herkunftSammlungFolder,
    ...herkunftSammlung,
    ...herkunftSammlungAusLieferungFolder,
    ...herkunftSammlungausLieferung,
    ...kulturFolder,
    ...kultur,
    ...kulturEventFolder,
    ...kulturEventEvent,
    ...kulturAnLieferungFolder,
    ...kulturLieferungAnLieferung,
    ...kulturAusLieferungFolder,
    ...kulturLieferungAusLieferung,
    ...kulturTeilkulturFolder,
    ...kulturTeilkultur,
    ...kulturZaehlungFolder,
    ...kulturZaehlung,
    ...lieferungFolder,
    ...lieferungLieferung,
    ...sammelLieferungFolder,
    ...(showTeilkulturFolder ? teilkulturFolder : []),
    ...(showZaehlungFolder ? zaehlungFolder : []),
    ...eventFolder,
    ...event,
    ...personFolder,
    ...personPerson,
    ...personGartenFolder,
    ...personGarten,
    ...personGartenKulturFolder,
    ...personGartenKultur,
    ...personGartenKulturEventFolder,
    ...personGartenKulturEvent,
    ...personGartenKulturAnlieferungFolder,
    ...personGartenKulturAnlieferung,
    ...personGartenKulturAuslieferungFolder,
    ...personGartenKulturAuslieferung,
    ...personGartenKulturTeilkulturFolder,
    ...personGartenKulturTeilkultur,
    ...personGartenKulturZaehlungFolder,
    ...personGartenKulturZaehlung,
    ...personLieferungFolder,
    ...personLieferung,
    ...personSammlungFolder,
    ...personSammlungSammlung,
    ...(showSammlungFolder ? sammlungFolder : []),
  ]

  /**
   * We ALWAYS add an array of nodes,
   * never a single one
   * not even for folders that are never more than one
   * because the function adding the nodes
   * should be able to pass none as well
   * for instance if a parent node is not open
   * or some filter is active
   */
  openNodes.forEach((url) => {
    if (!allParentNodesAreOpen(openNodes, url)) return
    if (url.length === 1 && url[0] === 'Sammel-Lieferungen') {
      nodes = [
        ...nodes,
        ...memoizeOne(() =>
          buildSammelLieferungSammelLieferung({
            nodes,
            store,
          }),
        )(),
      ]
    }
    if (url.length === 1 && url[0] === 'Zaehlungen') {
      nodes = [
        ...nodes,
        ...memoizeOne(() =>
          buildZaehlungZaehlung({
            nodes,
            store,
          }),
        )(),
      ]
    }
    if (url.length === 1 && url[0] === 'Teilkulturen') {
      nodes = [
        ...nodes,
        ...memoizeOne(() =>
          buildTeilkulturTeilkultur({
            nodes,
            store,
          }),
        )(),
      ]
    }
    if (url.length === 1 && url[0] === 'Sammlungen') {
      nodes = [
        ...nodes,
        ...memoizeOne(() =>
          buildSammlungSammlung({
            nodes,
            store,
          }),
        )(),
      ]
    }

    if (url.length === 2 && url[0] === 'Sammlungen') {
      nodes = [
        ...nodes,
        ...memoizeOne(() =>
          buildSammlungHerkunftFolder({
            nodes,
            url,
            store,
            loading,
          }),
        )(),
        ...memoizeOne(() =>
          buildSammlungAusLieferungFolder({
            nodes,
            url,
            store,
            loading,
          }),
        )(),
      ]
    }
    if (url.length === 2 && url[0] === 'Sammel-Lieferungen') {
      nodes = [
        ...nodes,
        ...memoizeOne(() =>
          buildSammelLieferungLieferungFolder({
            nodes,
            url,
            store,
            loading,
          }),
        )(),
      ]
    }

    if (
      url.length === 3 &&
      url[0] === 'Sammlungen' &&
      url[2] === 'Herkuenfte'
    ) {
      nodes = [
        ...nodes,
        ...memoizeOne(() =>
          buildSammlungHerkunftHerkunft({
            nodes,
            store,
            url,
          }),
        )(),
      ]
    }
    if (
      url.length === 3 &&
      url[0] === 'Sammlungen' &&
      url[2] === 'Aus-Lieferungen'
    ) {
      nodes = [
        ...nodes,
        ...memoizeOne(() =>
          buildSammlungAusLieferungLieferung({
            nodes,
            store,
            url,
          }),
        )(),
      ]
    }
    if (
      url.length === 3 &&
      url[0] === 'Sammel-Lieferungen' &&
      url[2] === 'Lieferungen'
    ) {
      nodes = [
        ...nodes,
        ...memoizeOne(() =>
          buildSammelLieferungLieferungLieferung({
            nodes,
            store,
            url,
          }),
        )(),
      ]
    }

    if (
      url.length === 4 &&
      url[0] === 'Sammlungen' &&
      url[2] === 'Aus-Lieferungen'
    ) {
      nodes = [
        ...nodes,
        ...memoizeOne(() =>
          buildSammlungAusLieferungKulturFolder({
            nodes,
            store,
            url,
            loading,
          }),
        )(),
      ]
    }

    if (
      url.length === 5 &&
      url[0] === 'Sammlungen' &&
      url[2] === 'Aus-Lieferungen' &&
      url[4] === 'Kulturen'
    ) {
      nodes = [
        ...nodes,
        ...memoizeOne(() =>
          buildSammlungAusLieferungKulturKultur({
            nodes,
            store,
            url,
          }),
        )(),
      ]
    }

    if (
      url.length === 6 &&
      url[0] === 'Sammlungen' &&
      url[2] === 'Aus-Lieferungen' &&
      url[4] === 'Kulturen'
    ) {
      nodes = [
        ...nodes,
        ...memoizeOne(() =>
          buildSammlungAusLieferungKulturZaehlungFolder({
            nodes,
            store,
            url,
            loading,
          }),
        )(),
        ...memoizeOne(() =>
          buildSammlungAusLieferungKulturEventFolder({
            nodes,
            store,
            url,
            loading,
          }),
        )(),
        ...memoizeOne(() =>
          buildSammlungAusLieferungKulturAusLieferungFolder({
            nodes,
            store,
            url,
            loading,
          }),
        )(),
        ...memoizeOne(() =>
          buildSammlungAusLieferungKulturAnLieferungFolder({
            nodes,
            store,
            url,
            loading,
          }),
        )(),
      ]
    }

    if (
      url.length === 7 &&
      url[0] === 'Sammlungen' &&
      url[2] === 'Aus-Lieferungen' &&
      url[4] === 'Kulturen' &&
      url[6] === 'Zaehlungen'
    ) {
      nodes = [
        ...nodes,
        ...memoizeOne(() =>
          buildSammlungAusLieferungKulturZaehlungZaehlung({
            nodes,
            store,
            url,
            loading,
          }),
        )(),
      ]
    }
    if (
      url.length === 7 &&
      url[0] === 'Sammlungen' &&
      url[2] === 'Aus-Lieferungen' &&
      url[4] === 'Kulturen' &&
      url[6] === 'Events'
    ) {
      nodes = [
        ...nodes,
        ...memoizeOne(() =>
          buildSammlungAusLieferungKulturEventEvent({
            nodes,
            store,
            url,
            loading,
          }),
        )(),
      ]
    }
    if (
      url.length === 7 &&
      url[0] === 'Sammlungen' &&
      url[2] === 'Aus-Lieferungen' &&
      url[4] === 'Kulturen' &&
      url[6] === 'Aus-Lieferungen'
    ) {
      nodes = [
        ...nodes,
        ...memoizeOne(() =>
          buildSammlungAusLieferungKulturAusLieferungLieferung({
            nodes,
            store,
            url,
            loading,
          }),
        )(),
      ]
    }
    if (
      url.length === 7 &&
      url[0] === 'Sammlungen' &&
      url[2] === 'Aus-Lieferungen' &&
      url[4] === 'Kulturen' &&
      url[6] === 'An-Lieferungen'
    ) {
      nodes = [
        ...nodes,
        ...memoizeOne(() =>
          buildSammlungAusLieferungKulturAnLieferungLieferung({
            nodes,
            store,
            url,
            loading,
          }),
        )(),
      ]
    }
  })

  return nodes
}
