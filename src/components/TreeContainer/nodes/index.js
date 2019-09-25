import memoizeOne from 'memoize-one'

import sort from '../sort'
import allParentNodesAreOpen from '../allParentNodesAreOpen'

import buildArtFolder from './art/folder'
import buildArtArt from './art'

import buildArtSammlungFolder from './art/sammlung/folder'
import buildArtSammlung from './art/sammlung'
import buildArtSammlungAusLieferungFolder from './art/sammlung/auslieferung/folder'
import buildArtSammlungLieferungAusLieferung from './art/sammlung/auslieferung'

import buildArtKulturFolder from './art/kultur/folder'
import buildArtKultur from './art/kultur'
import buildArtKulturAufgabeFolder from './art/kultur/aufgabe/folder'
import buildArtKulturAufgabeAufgabe from './art/kultur/aufgabe'
import buildArtKulturZaehlungFolder from './art/kultur/zaehlung/folder'
import buildArtKulturZaehlungZaehlung from './art/kultur/zaehlung'
import buildArtKulturAusLieferungFolder from './art/kultur/auslieferung/folder'
import buildArtKulturLieferungAusLieferung from './art/kultur/auslieferung'
import buildArtKulturAnLieferungFolder from './art/kultur/anlieferung/folder'
import buildArtKulturLieferungAnLieferung from './art/kultur/anlieferung'

import buildGartenFolder from './garten/folder'
import buildGartenGarten from './garten'
import buildGartenKulturFolder from './garten/kultur/folder'
import buildGartenKultur from './garten/kultur'
import buildGartenKulturTeilkulturFolder from './garten/kultur/teilkultur/folder'
import buildGartenKulturTeilkulturTeilkultur from './garten/kultur/teilkultur'
import buildGartenKulturAufgabeFolder from './garten/kultur/aufgabe/folder'
import buildGartenKulturAufgabeAufgabe from './garten/kultur/aufgabe'
import buildGartenKulturZaehlungFolder from './garten/kultur/zaehlung/folder'
import buildGartenKulturZaehlungZaehlung from './garten/kultur/zaehlung'
import buildGartenKulturAusLieferungFolder from './garten/kultur/auslieferung/folder'
import buildGartenKulturLieferungAusLieferung from './garten/kultur/auslieferung'
import buildGartenKulturAnLieferungFolder from './garten/kultur/anlieferung/folder'
import buildGartenKulturLieferungAnLieferung from './garten/kultur/anlieferung'

import buildHerkunftFolder from './herkunft/folder'
import buildHerkunftHerkunft from './herkunft'
import buildHerkunftSammlungFolder from './herkunft/sammlung/folder'
import buildHerkunftSammlungSammlung from './herkunft/sammlung'
import buildHerkunftSammlungAusLieferungFolder from './herkunft/sammlung/auslieferung/folder'
import buildHerkunftSammlungausLieferungLieferung from './herkunft/sammlung/auslieferung'

import buildLieferungFolder from './lieferung/folder'
import buildLieferungLieferung from './lieferung'

import buildTeilkulturFolder from './teilkultur/folder'
import buildTeilkulturTeilkultur from './teilkultur'

import buildZaehlungFolder from './zaehlung/folder'
import buildZaehlungZaehlung from './zaehlung'

import buildAufgabeFolder from './aufgabe/folder'
import buildAufgabeAufgabe from './aufgabe'

import buildPersonFolder from './person/folder'
import buildPersonPerson from './person'
import buildPersonGartenFolder from './person/garten/folder'
import buildPersonGartenGarten from './person/garten'
import buildPersonGartenKulturFolder from './person/garten/kultur/folder'
import buildPersonGartenKulturKultur from './person/garten/kultur'
import buildPersonGartenKulturZaehlungFolder from './person/garten/kultur/zaehlung/folder'
import buildPersonGartenKulturZaehlungZaehlung from './person/garten/kultur/zaehlung'
import buildPersonGartenKulturAufgabeFolder from './person/garten/kultur/aufgabe/folder'
import buildPersonGartenKulturAufgabeAufgabe from './person/garten/kultur/aufgabe'
import buildPersonGartenKulturAuslieferungFolder from './person/garten/kultur/auslieferung/folder'
import buildPersonGartenKulturAuslieferungLieferung from './person/garten/kultur/auslieferung'
import buildPersonGartenKulturAnlieferungFolder from './person/garten/kultur/anlieferung/folder'
import buildPersonGartenKulturAnlieferungLieferung from './person/garten/kultur/anlieferung'
import buildPersonGartenSammlungFolder from './person/sammlung/folder'
import buildPersonGartenSammlungSammlung from './person/sammlung'
import buildPersonGartenLieferungFolder from './person/lieferung/folder'
import buildPersonGartenLieferungLieferung from './person/lieferung'

import buildSammlungFolder from './sammlung/folder'
import buildSammlungSammlung from './sammlung'
import buildSammlungHerkunftFolder from './sammlung/herkunft/folder'
import buildSammlungHerkunftHerkunft from './sammlung/herkunft'
import buildSammlungAusLieferungFolder from './sammlung/auslieferung/folder'
import buildSammlungAusLieferungLieferung from './sammlung/auslieferung'
import buildSammlungAusLieferungKulturFolder from './sammlung/auslieferung/kultur/folder'
import buildSammlungAusLieferungKulturKultur from './sammlung/auslieferung/kultur'
import buildSammlungAusLieferungKulturZaehlungFolder from './sammlung/auslieferung/kultur/zaehlung/folder'
import buildSammlungAusLieferungKulturZaehlungZaehlung from './sammlung/auslieferung/kultur/zaehlung'
import buildSammlungAusLieferungKulturAufgabeFolder from './sammlung/auslieferung/kultur/aufgabe/folder'
import buildSammlungAusLieferungKulturAufgabeAufgabe from './sammlung/auslieferung/kultur/aufgabe'
import buildSammlungAusLieferungKulturAusLieferungFolder from './sammlung/auslieferung/kultur/auslieferung/folder'
import buildSammlungAusLieferungKulturAusLieferungLieferung from './sammlung/auslieferung/kultur/auslieferung'
import buildSammlungAusLieferungKulturAnLieferungFolder from './sammlung/auslieferung/kultur/anlieferung/folder'
import buildSammlungAusLieferungKulturAnLieferungLieferung from './sammlung/auslieferung/kultur/anlieferung'

import buildKulturFolder from './kultur/folder'
import buildKulturKultur from './kultur'
import buildKulturTeilkulturFolder from './kultur/teilkultur/folder'
import buildKulturTeilkulturTeilkultur from './kultur/teilkultur'
import buildKulturZaehlungFolder from './kultur/zaehlung/folder'
import buildKulturZaehlungZaehlung from './kultur/zaehlung'
import buildKulturAnLieferungFolder from './kultur/anlieferung/folder'
import buildKulturLieferungAnLieferung from './kultur/anlieferung'
import buildKulturAusLieferungFolder from './kultur/auslieferung/folder'
import buildKulturLieferungAusLieferung from './kultur/auslieferung'
import buildKulturAufgabeFolder from './kultur/aufgabe/folder'
import buildKulturAufgabeAufgabe from './kultur/aufgabe'

export default ({ store, data, loading }) => {
  const openNodes = store.tree.openNodes.sort(sort)
  let artArtNodes

  let nodes = [
    ...memoizeOne(() => buildArtFolder({ data, store, loading }))(),
    ...memoizeOne(() => buildGartenFolder({ data, store, loading }))(),
    ...memoizeOne(() => buildHerkunftFolder({ data, store, loading }))(),
    ...memoizeOne(() => buildLieferungFolder({ data, store, loading }))(),
    ...memoizeOne(() => buildTeilkulturFolder({ data, store, loading }))(),
    ...memoizeOne(() => buildZaehlungFolder({ data, store, loading }))(),
    ...memoizeOne(() => buildAufgabeFolder({ data, store, loading }))(),
    ...memoizeOne(() => buildPersonFolder({ data, store, loading }))(),
    ...memoizeOne(() => buildSammlungFolder({ data, store, loading }))(),
    ...memoizeOne(() => buildKulturFolder({ data, store, loading }))(),
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
  openNodes.forEach(url => {
    //console.log('nodes, url:', url.slice())
    if (!allParentNodesAreOpen(openNodes, url)) return
    if (url.length === 1 && url[0] === 'Arten') {
      artArtNodes = memoizeOne(() =>
        buildArtArt({
          nodes,
          data,
          store,
        }),
      )()
      nodes = [...nodes, ...artArtNodes]
    }
    if (url.length === 1 && url[0] === 'Gaerten') {
      nodes = [
        ...nodes,
        ...memoizeOne(() =>
          buildGartenGarten({
            nodes,
            data,
            store,
          }),
        )(),
      ]
    }
    if (url.length === 1 && url[0] === 'Herkuenfte') {
      nodes = [
        ...nodes,
        ...memoizeOne(() =>
          buildHerkunftHerkunft({
            nodes,
            data,
            store,
          }),
        )(),
      ]
    }
    if (url.length === 1 && url[0] === 'Lieferungen') {
      nodes = [
        ...nodes,
        ...memoizeOne(() =>
          buildLieferungLieferung({
            nodes,
            data,
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
            data,
            store,
          }),
        )(),
      ]
    }
    if (url.length === 1 && url[0] === 'Aufgaben') {
      nodes = [
        ...nodes,
        ...memoizeOne(() =>
          buildAufgabeAufgabe({
            nodes,
            data,
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
            data,
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
            data,
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
            data,
            store,
          }),
        )(),
      ]
    }
    if (url.length === 1 && url[0] === 'Kulturen') {
      nodes = [
        ...nodes,
        ...memoizeOne(() =>
          buildKulturKultur({
            nodes,
            data,
            store,
          }),
        )(),
      ]
    }

    if (url.length === 2 && url[0] === 'Arten') {
      nodes = [
        ...nodes,
        ...memoizeOne(() =>
          buildArtSammlungFolder({
            nodes,
            url,
            data,
            store,
            loading,
          }),
        )(),
        ...memoizeOne(() =>
          buildArtKulturFolder({
            nodes,
            url,
            data,
            store,
            loading,
          }),
        )(),
      ]
    }
    if (url.length === 2 && url[0] === 'Gaerten') {
      nodes = [
        ...nodes,
        ...memoizeOne(() =>
          buildGartenKulturFolder({
            nodes,
            url,
            data,
            store,
            loading,
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
            data,
            store,
            loading,
          }),
        )(),
        ...memoizeOne(() =>
          buildPersonGartenSammlungFolder({
            nodes,
            url,
            data,
            store,
            loading,
          }),
        )(),
        ...memoizeOne(() =>
          buildPersonGartenLieferungFolder({
            nodes,
            url,
            data,
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
            data,
            store,
            loading,
          }),
        )(),
        ...memoizeOne(() =>
          buildSammlungAusLieferungFolder({
            nodes,
            url,
            data,
            store,
            loading,
          }),
        )(),
        // TODO: build SammlungKulturFolder
      ]
    }
    if (url.length === 2 && url[0] === 'Kulturen') {
      nodes = [
        ...nodes,
        ...memoizeOne(() =>
          buildKulturTeilkulturFolder({
            nodes,
            url,
            data,
            store,
            loading,
          }),
        )(),
        ...memoizeOne(() =>
          buildKulturZaehlungFolder({
            nodes,
            url,
            data,
            store,
            loading,
          }),
        )(),
        ...memoizeOne(() =>
          buildKulturAnLieferungFolder({
            nodes,
            url,
            data,
            store,
            loading,
          }),
        )(),
        ...memoizeOne(() =>
          buildKulturAusLieferungFolder({
            nodes,
            url,
            data,
            store,
            loading,
          }),
        )(),
        ...memoizeOne(() =>
          buildKulturAufgabeFolder({
            nodes,
            url,
            data,
            store,
            loading,
          }),
        )(),
      ]
    }

    if (url.length === 2 && url[0] === 'Herkuenfte') {
      nodes = [
        ...nodes,
        ...memoizeOne(() =>
          buildHerkunftSammlungFolder({
            nodes,
            data,
            store,
            loading,
            url,
          }),
        )(),
      ]
    }

    if (url.length === 3 && url[0] === 'Arten' && url[2] === 'Kulturen') {
      nodes = [
        ...nodes,
        ...memoizeOne(() =>
          buildArtKultur({
            nodes,
            data,
            store,
            url,
          }),
        )(),
      ]
    }
    if (url.length === 3 && url[0] === 'Arten' && url[2] === 'Sammlungen') {
      nodes = [
        ...nodes,
        ...memoizeOne(() =>
          buildArtSammlung({
            nodes,
            data,
            store,
            url,
          }),
        )(),
      ]
    }
    if (url.length === 3 && url[0] === 'Gaerten' && url[2] === 'Kulturen') {
      nodes = [
        ...nodes,
        ...memoizeOne(() =>
          buildGartenKultur({
            nodes,
            data,
            store,
            url,
          }),
        )(),
      ]
    }
    if (
      url.length === 3 &&
      url[0] === 'Herkuenfte' &&
      url[2] === 'Sammlungen'
    ) {
      nodes = [
        ...nodes,
        ...memoizeOne(() =>
          buildHerkunftSammlungSammlung({
            nodes,
            data,
            store,
            url,
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
            data,
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
            data,
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
            data,
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
            data,
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
            data,
            store,
            url,
          }),
        )(),
      ]
    }
    if (url.length === 3 && url[0] === 'Kulturen' && url[2] === 'Zaehlungen') {
      nodes = [
        ...nodes,
        ...memoizeOne(() =>
          buildKulturZaehlungZaehlung({
            nodes,
            data,
            store,
            url,
          }),
        )(),
      ]
    }
    if (
      url.length === 3 &&
      url[0] === 'Kulturen' &&
      url[2] === 'Teilkulturen'
    ) {
      nodes = [
        ...nodes,
        ...memoizeOne(() =>
          buildKulturTeilkulturTeilkultur({
            nodes,
            data,
            store,
            url,
          }),
        )(),
      ]
    }
    if (
      url.length === 3 &&
      url[0] === 'Kulturen' &&
      url[2] === 'An-Lieferungen'
    ) {
      nodes = [
        ...nodes,
        ...memoizeOne(() =>
          buildKulturLieferungAnLieferung({
            nodes,
            data,
            store,
            url,
          }),
        )(),
      ]
    }
    if (
      url.length === 3 &&
      url[0] === 'Kulturen' &&
      url[2] === 'Aus-Lieferungen'
    ) {
      nodes = [
        ...nodes,
        ...memoizeOne(() =>
          buildKulturLieferungAusLieferung({
            nodes,
            data,
            store,
            url,
          }),
        )(),
      ]
    }
    if (url.length === 3 && url[0] === 'Kulturen' && url[2] === 'Aufgaben') {
      nodes = [
        ...nodes,
        ...memoizeOne(() =>
          buildKulturAufgabeAufgabe({
            nodes,
            data,
            store,
            url,
          }),
        )(),
      ]
    }

    if (url.length === 4 && url[0] === 'Arten' && url[2] === 'Kulturen') {
      nodes = [
        ...nodes,
        ...memoizeOne(() =>
          buildArtKulturZaehlungFolder({
            nodes,
            url,
            data,
            store,
            loading,
          }),
        )(),
        ...memoizeOne(() =>
          buildArtKulturAusLieferungFolder({
            nodes,
            url,
            data,
            store,
            loading,
          }),
        )(),
        ...memoizeOne(() =>
          buildArtKulturAnLieferungFolder({
            nodes,
            url,
            data,
            store,
            loading,
          }),
        )(),
        ...memoizeOne(() =>
          buildArtKulturAufgabeFolder({
            nodes,
            url,
            data,
            store,
            loading,
          }),
        )(),
      ]
    }
    if (url.length === 4 && url[0] === 'Arten' && url[2] === 'Sammlungen') {
      nodes = [
        ...nodes,
        ...memoizeOne(() =>
          buildArtSammlungAusLieferungFolder({
            nodes,
            data,
            store,
            url,
            loading,
          }),
        )(),
      ]
    }
    if (url.length === 4 && url[0] === 'Gaerten' && url[2] === 'Kulturen') {
      nodes = [
        ...nodes,
        ...memoizeOne(() =>
          buildGartenKulturZaehlungFolder({
            nodes,
            url,
            data,
            store,
            loading,
          }),
        )(),
        ...memoizeOne(() =>
          buildGartenKulturAusLieferungFolder({
            nodes,
            url,
            data,
            store,
            loading,
          }),
        )(),
        ...memoizeOne(() =>
          buildGartenKulturAnLieferungFolder({
            nodes,
            url,
            data,
            store,
            loading,
          }),
        )(),
        ...memoizeOne(() =>
          buildGartenKulturAufgabeFolder({
            nodes,
            url,
            data,
            store,
            loading,
          }),
        )(),
        ...memoizeOne(() =>
          buildGartenKulturTeilkulturFolder({
            nodes,
            url,
            data,
            store,
            loading,
          }),
        )(),
      ]
    }
    if (
      url.length === 4 &&
      url[0] === 'Herkuenfte' &&
      url[2] === 'Sammlungen'
    ) {
      nodes = [
        ...nodes,
        ...memoizeOne(() =>
          buildHerkunftSammlungAusLieferungFolder({
            nodes,
            data,
            store,
            url,
            loading,
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
            data,
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
            data,
            store,
            url,
            loading,
          }),
        )(),
      ]
    }

    if (
      url.length === 5 &&
      url[0] === 'Arten' &&
      url[2] === 'Kulturen' &&
      url[4] === 'Zaehlungen'
    ) {
      nodes = [
        ...nodes,
        ...memoizeOne(() =>
          buildArtKulturZaehlungZaehlung({
            nodes,
            data,
            store,
            url,
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
            data,
            store,
            url,
          }),
        )(),
      ]
    }
    if (
      url.length === 5 &&
      url[0] === 'Arten' &&
      url[2] === 'Kulturen' &&
      url[4] === 'Aus-Lieferungen'
    ) {
      nodes = [
        ...nodes,
        ...memoizeOne(() =>
          buildArtKulturLieferungAusLieferung({
            nodes,
            data,
            store,
            url,
          }),
        )(),
      ]
    }
    if (
      url.length === 5 &&
      url[0] === 'Arten' &&
      url[2] === 'Kulturen' &&
      url[4] === 'An-Lieferungen'
    ) {
      nodes = [
        ...nodes,
        ...memoizeOne(() =>
          buildArtKulturLieferungAnLieferung({
            nodes,
            data,
            store,
            url,
          }),
        )(),
      ]
    }
    if (
      url.length === 5 &&
      url[0] === 'Arten' &&
      url[2] === 'Kulturen' &&
      url[4] === 'Aufgaben'
    ) {
      nodes = [
        ...nodes,
        ...memoizeOne(() =>
          buildArtKulturAufgabeAufgabe({
            nodes,
            data,
            store,
            url,
          }),
        )(),
      ]
    }

    if (
      url.length === 5 &&
      url[0] === 'Gaerten' &&
      url[2] === 'Kulturen' &&
      url[4] === 'Zaehlungen'
    ) {
      nodes = [
        ...nodes,
        ...memoizeOne(() =>
          buildGartenKulturZaehlungZaehlung({
            nodes,
            data,
            store,
            url,
          }),
        )(),
      ]
    }
    if (
      url.length === 5 &&
      url[0] === 'Gaerten' &&
      url[2] === 'Kulturen' &&
      url[4] === 'Aus-Lieferungen'
    ) {
      nodes = [
        ...nodes,
        ...memoizeOne(() =>
          buildGartenKulturLieferungAusLieferung({
            nodes,
            data,
            store,
            url,
          }),
        )(),
      ]
    }
    if (
      url.length === 5 &&
      url[0] === 'Gaerten' &&
      url[2] === 'Kulturen' &&
      url[4] === 'An-Lieferungen'
    ) {
      nodes = [
        ...nodes,
        ...memoizeOne(() =>
          buildGartenKulturLieferungAnLieferung({
            nodes,
            data,
            store,
            url,
          }),
        )(),
      ]
    }
    if (
      url.length === 5 &&
      url[0] === 'Gaerten' &&
      url[2] === 'Kulturen' &&
      url[4] === 'Aufgaben'
    ) {
      nodes = [
        ...nodes,
        ...memoizeOne(() =>
          buildGartenKulturAufgabeAufgabe({
            nodes,
            data,
            store,
            url,
          }),
        )(),
      ]
    }
    if (
      url.length === 5 &&
      url[0] === 'Gaerten' &&
      url[2] === 'Kulturen' &&
      url[4] === 'Teilkulturen'
    ) {
      nodes = [
        ...nodes,
        ...memoizeOne(() =>
          buildGartenKulturTeilkulturTeilkultur({
            nodes,
            data,
            store,
            url,
          }),
        )(),
      ]
    }
    if (
      url.length === 5 &&
      url[0] === 'Arten' &&
      url[2] === 'Sammlungen' &&
      url[4] === 'Aus-Lieferungen'
    ) {
      nodes = [
        ...nodes,
        ...memoizeOne(() =>
          buildArtSammlungLieferungAusLieferung({
            nodes,
            data,
            store,
            url,
          }),
        )(),
      ]
    }
    if (
      url.length === 5 &&
      url[0] === 'Herkuenfte' &&
      url[2] === 'Sammlungen' &&
      url[4] === 'Aus-Lieferungen'
    ) {
      nodes = [
        ...nodes,
        ...memoizeOne(() =>
          buildHerkunftSammlungausLieferungLieferung({
            nodes,
            data,
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
            data,
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
            data,
            store,
            url,
          }),
        )(),
        ...memoizeOne(() =>
          buildPersonGartenKulturAufgabeFolder({
            nodes,
            data,
            store,
            url,
          }),
        )(),
        ...memoizeOne(() =>
          buildPersonGartenKulturAuslieferungFolder({
            nodes,
            data,
            store,
            url,
          }),
        )(),
        ...memoizeOne(() =>
          buildPersonGartenKulturAnlieferungFolder({
            nodes,
            data,
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
            data,
            store,
            url,
            loading,
          }),
        )(),
        ...memoizeOne(() =>
          buildSammlungAusLieferungKulturAufgabeFolder({
            nodes,
            data,
            store,
            url,
            loading,
          }),
        )(),
        ...memoizeOne(() =>
          buildSammlungAusLieferungKulturAusLieferungFolder({
            nodes,
            data,
            store,
            url,
            loading,
          }),
        )(),
        ...memoizeOne(() =>
          buildSammlungAusLieferungKulturAnLieferungFolder({
            nodes,
            data,
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
            data,
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
      url[6] === 'Aufgaben'
    ) {
      nodes = [
        ...nodes,
        ...memoizeOne(() =>
          buildPersonGartenKulturAufgabeAufgabe({
            nodes,
            data,
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
            data,
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
            data,
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
            data,
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
      url[6] === 'Aufgaben'
    ) {
      nodes = [
        ...nodes,
        ...memoizeOne(() =>
          buildSammlungAusLieferungKulturAufgabeAufgabe({
            nodes,
            data,
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
            data,
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
            data,
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
