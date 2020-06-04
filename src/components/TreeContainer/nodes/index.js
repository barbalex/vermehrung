import memoizeOne from 'memoize-one'

import sort from '../sort'
import allParentNodesAreOpen from '../allParentNodesAreOpen'

import buildLieferungLieferung from './lieferung'

import buildSammelLieferungSammelLieferung from './sammelLieferung'
import buildSammelLieferungLieferungFolder from './sammelLieferung/lieferung/folder'
import buildSammelLieferungLieferungLieferung from './sammelLieferung/lieferung'

import buildTeilkulturTeilkultur from './teilkultur'

import buildZaehlungZaehlung from './zaehlung'

import buildPersonPerson from './person'
import buildPersonGartenFolder from './person/garten/folder'
import buildPersonGartenGarten from './person/garten'
import buildPersonGartenKulturFolder from './person/garten/kultur/folder'
import buildPersonGartenKulturKultur from './person/garten/kultur'
import buildPersonGartenKulturZaehlungFolder from './person/garten/kultur/zaehlung/folder'
import buildPersonGartenKulturZaehlungZaehlung from './person/garten/kultur/zaehlung'
import buildPersonGartenKulturEventFolder from './person/garten/kultur/event/folder'
import buildPersonGartenKulturEventEvent from './person/garten/kultur/event'
import buildPersonGartenKulturTeilkulturFolder from './person/garten/kultur/teilkultur/folder'
import buildPersonGartenKulturTeilkulturTeilkultur from './person/garten/kultur/teilkultur'
import buildPersonGartenKulturAuslieferungFolder from './person/garten/kultur/auslieferung/folder'
import buildPersonGartenKulturAuslieferungLieferung from './person/garten/kultur/auslieferung'
import buildPersonGartenKulturAnlieferungFolder from './person/garten/kultur/anlieferung/folder'
import buildPersonGartenKulturAnlieferungLieferung from './person/garten/kultur/anlieferung'
import buildPersonGartenSammlungFolder from './person/sammlung/folder'
import buildPersonGartenSammlungSammlung from './person/sammlung'
import buildPersonGartenLieferungFolder from './person/lieferung/folder'
import buildPersonGartenLieferungLieferung from './person/lieferung'

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
    artArt,
    artSammlungFolder,
    artSammlung,
    artSammlungAusLieferungFolder,
    artSammlungAusLieferungLieferung,
    artKulturFolder,
    artKultur,
    artKulturEventFolder,
    artKulturEventEvent,
    artKulturAusLieferungFolder,
    artKulturLieferungAusLieferung,
    artKulturAnLieferungFolder,
    artKulturLieferungAnLieferung,
    artKulturTeilkulturFolder,
    artKulturTeilkulturTeilkultur,
    artKulturZaehlungFolder,
    artKulturZaehlungZaehlung,
    eventFolder,
    eventEvent,
    gartenFolder,
    gartenGarten,
    gartenKulturEventFolder,
    gartenKulturEventEvent,
    gartenKulturFolder,
    gartenKultur,
    gartenKulturAnLieferungFolder,
    gartenKulturLieferungAnLieferung,
    gartenKulturAusLieferungFolder,
    gartenKulturLieferungAusLieferung,
    gartenKulturTeilkulturFolder,
    gartenKulturTeilkulturTeilkultur,
    gartenKulturZaehlungFolder,
    gartenKulturZaehlungZaehlung,
    herkunftFolder,
    herkunftHerkunft,
    herkunftSammlungFolder,
    herkunftSammlung,
    herkunftSammlungAusLieferungFolder,
    herkunftSammlungausLieferungLieferung,
    kulturFolder,
    kulturKultur,
    kulturTeilkulturFolder,
    kulturTeilkulturTeilkultur,
    kulturZaehlungFolder,
    kulturZaehlungZaehlung,
    lieferungFolder,
    personFolder,
    sammelLieferungFolder,
    sammlungFolder,
    teilkulturFolder,
    zaehlungFolder,
  } = store.tree
  const openNodes = store.tree.openNodes.sort(sort)

  const { tree_teilkultur, tree_zaehlung, tree_lieferung } = userPersonOption
  const showSammlungFolder = role !== 'gaertner'
  const showTeilkulturFolder = tree_teilkultur
  const showZaehlungFolder = tree_zaehlung
  const showLieferungFolder = tree_lieferung

  let nodes = [
    ...artFolder,
    ...artArt,
    ...artSammlungFolder,
    ...artSammlung,
    ...artSammlungAusLieferungFolder,
    ...artSammlungAusLieferungLieferung,
    ...artKulturFolder,
    ...artKulturZaehlungFolder,
    ...artKulturZaehlungZaehlung,
    ...artKultur,
    ...artKulturEventFolder,
    ...artKulturEventEvent,
    ...artKulturAusLieferungFolder,
    ...artKulturLieferungAusLieferung,
    ...artKulturAnLieferungFolder,
    ...artKulturLieferungAnLieferung,
    ...artKulturTeilkulturFolder,
    ...artKulturTeilkulturTeilkultur,
    ...gartenFolder,
    ...gartenGarten,
    ...gartenKulturEventFolder,
    ...gartenKulturEventEvent,
    ...gartenKulturFolder,
    ...gartenKultur,
    ...gartenKulturAnLieferungFolder,
    ...gartenKulturLieferungAnLieferung,
    ...gartenKulturAusLieferungFolder,
    ...gartenKulturLieferungAusLieferung,
    ...gartenKulturTeilkulturFolder,
    ...gartenKulturTeilkulturTeilkultur,
    ...gartenKulturZaehlungFolder,
    ...gartenKulturZaehlungZaehlung,
    ...herkunftFolder,
    ...herkunftHerkunft,
    ...herkunftSammlungFolder,
    ...herkunftSammlung,
    ...herkunftSammlungAusLieferungFolder,
    ...herkunftSammlungausLieferungLieferung,
    ...kulturFolder,
    ...kulturKultur,
    ...kulturTeilkulturFolder,
    ...kulturTeilkulturTeilkultur,
    ...kulturZaehlungFolder,
    ...kulturZaehlungZaehlung,
    ...(showLieferungFolder ? lieferungFolder : []),
    ...sammelLieferungFolder,
    ...(showTeilkulturFolder ? teilkulturFolder : []),
    ...(showZaehlungFolder ? zaehlungFolder : []),
    ...eventFolder,
    ...eventEvent,
    ...personFolder,
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
    if (url.length === 1 && url[0] === 'Lieferungen') {
      nodes = [
        ...nodes,
        ...memoizeOne(() =>
          buildLieferungLieferung({
            nodes,
            store,
          }),
        )(),
      ]
    }
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
    if (url.length === 1 && url[0] === 'Personen') {
      nodes = [
        ...nodes,
        ...memoizeOne(() =>
          buildPersonPerson({
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

    if (url.length === 2 && url[0] === 'Personen') {
      nodes = [
        ...nodes,
        ...memoizeOne(() =>
          buildPersonGartenFolder({
            nodes,
            url,
            store,
            loading,
          }),
        )(),
        ...memoizeOne(() =>
          buildPersonGartenSammlungFolder({
            nodes,
            url,
            store,
            loading,
          }),
        )(),
        ...memoizeOne(() =>
          buildPersonGartenLieferungFolder({
            nodes,
            url,
            store,
            loading,
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

    if (url.length === 3 && url[0] === 'Personen' && url[2] === 'Gaerten') {
      nodes = [
        ...nodes,
        ...memoizeOne(() =>
          buildPersonGartenGarten({
            nodes,
            store,
            url,
          }),
        )(),
      ]
    }
    if (url.length === 3 && url[0] === 'Personen' && url[2] === 'Sammlungen') {
      nodes = [
        ...nodes,
        ...memoizeOne(() =>
          buildPersonGartenSammlungSammlung({
            nodes,
            store,
            url,
          }),
        )(),
      ]
    }
    if (url.length === 3 && url[0] === 'Personen' && url[2] === 'Lieferungen') {
      nodes = [
        ...nodes,
        ...memoizeOne(() =>
          buildPersonGartenLieferungLieferung({
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

    if (url.length === 4 && url[0] === 'Personen' && url[2] === 'Gaerten') {
      nodes = [
        ...nodes,
        ...memoizeOne(() =>
          buildPersonGartenKulturFolder({
            nodes,
            store,
            url,
            loading,
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
      url.length === 5 &&
      url[0] === 'Personen' &&
      url[2] === 'Gaerten' &&
      url[4] === 'Kulturen'
    ) {
      nodes = [
        ...nodes,
        ...memoizeOne(() =>
          buildPersonGartenKulturKultur({
            nodes,
            store,
            url,
          }),
        )(),
      ]
    }

    if (
      url.length === 6 &&
      url[0] === 'Personen' &&
      url[2] === 'Gaerten' &&
      url[4] === 'Kulturen'
    ) {
      nodes = [
        ...nodes,
        ...memoizeOne(() =>
          buildPersonGartenKulturZaehlungFolder({
            nodes,
            store,
            url,
          }),
        )(),
        ...memoizeOne(() =>
          buildPersonGartenKulturEventFolder({
            nodes,
            store,
            url,
          }),
        )(),
        ...memoizeOne(() =>
          buildPersonGartenKulturTeilkulturFolder({
            nodes,
            store,
            url,
          }),
        )(),
        ...memoizeOne(() =>
          buildPersonGartenKulturAuslieferungFolder({
            nodes,
            store,
            url,
          }),
        )(),
        ...memoizeOne(() =>
          buildPersonGartenKulturAnlieferungFolder({
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
      url[0] === 'Personen' &&
      url[2] === 'Gaerten' &&
      url[4] === 'Kulturen' &&
      url[6] === 'Zaehlungen'
    ) {
      nodes = [
        ...nodes,
        ...memoizeOne(() =>
          buildPersonGartenKulturZaehlungZaehlung({
            nodes,
            store,
            url,
          }),
        )(),
      ]
    }
    if (
      url.length === 7 &&
      url[0] === 'Personen' &&
      url[2] === 'Gaerten' &&
      url[4] === 'Kulturen' &&
      url[6] === 'Events'
    ) {
      nodes = [
        ...nodes,
        ...memoizeOne(() =>
          buildPersonGartenKulturEventEvent({
            nodes,
            store,
            url,
          }),
        )(),
      ]
    }
    if (
      url.length === 7 &&
      url[0] === 'Personen' &&
      url[2] === 'Gaerten' &&
      url[4] === 'Kulturen' &&
      url[6] === 'Teilkulturen'
    ) {
      nodes = [
        ...nodes,
        ...memoizeOne(() =>
          buildPersonGartenKulturTeilkulturTeilkultur({
            nodes,
            store,
            url,
          }),
        )(),
      ]
    }
    if (
      url.length === 7 &&
      url[0] === 'Personen' &&
      url[2] === 'Gaerten' &&
      url[4] === 'Kulturen' &&
      url[6] === 'Aus-Lieferungen'
    ) {
      nodes = [
        ...nodes,
        ...memoizeOne(() =>
          buildPersonGartenKulturAuslieferungLieferung({
            nodes,
            store,
            url,
          }),
        )(),
      ]
    }
    if (
      url.length === 7 &&
      url[0] === 'Personen' &&
      url[2] === 'Gaerten' &&
      url[4] === 'Kulturen' &&
      url[6] === 'An-Lieferungen'
    ) {
      nodes = [
        ...nodes,
        ...memoizeOne(() =>
          buildPersonGartenKulturAnlieferungLieferung({
            nodes,
            store,
            url,
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
