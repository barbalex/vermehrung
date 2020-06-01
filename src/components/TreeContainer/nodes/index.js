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
import buildArtKulturEventFolder from './art/kultur/event/folder'
import buildArtKulturEventEvent from './art/kultur/event'
import buildArtKulturTeilkulturFolder from './art/kultur/teilkultur/folder'
import buildArtKulturTeilkulturTeilkultur from './art/kultur/teilkultur'
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
import buildGartenKulturEventFolder from './garten/kultur/event/folder'
import buildGartenKulturEventEvent from './garten/kultur/event'
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

import buildSammelLieferungFolder from './sammelLieferung/folder'
import buildSammelLieferungSammelLieferung from './sammelLieferung'
import buildSammelLieferungLieferungFolder from './sammelLieferung/lieferung/folder'
import buildSammelLieferungLieferungLieferung from './sammelLieferung/lieferung'

import buildTeilkulturFolder from './teilkultur/folder'
import buildTeilkulturTeilkultur from './teilkultur'

import buildZaehlungFolder from './zaehlung/folder'
import buildZaehlungZaehlung from './zaehlung'

import buildEventFolder from './event/folder'
import buildEventEvent from './event'

import buildPersonFolder from './person/folder'
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
import buildSammlungAusLieferungKulturEventFolder from './sammlung/auslieferung/kultur/event/folder'
import buildSammlungAusLieferungKulturEventEvent from './sammlung/auslieferung/kultur/event'
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
import buildKulturEventFolder from './kultur/event/folder'
import buildKulturEventEvent from './kultur/event'

export default ({ store, data, loading, role }) => {
  const { userPersonOption } = store
  const openNodes = store.tree.openNodes.sort(sort)

  const {
    tree_kultur,
    tree_teilkultur,
    tree_zaehlung,
    tree_lieferung,
    tree_event,
  } = userPersonOption
  const showArtFolder = role !== 'gaertner'
  const showHerkunftFolder = role !== 'gaertner'
  const showSammlungFolder = role !== 'gaertner'
  const showKulturFolder = tree_kultur
  const showTeilkulturFolder = tree_teilkultur
  const showZaehlungFolder = tree_zaehlung
  const showLieferungFolder = tree_lieferung
  const showEventFolder = tree_event

  let nodes = [
    ...memoizeOne(() =>
      showArtFolder ? buildArtFolder({ store, loading }) : [],
    )(),
    ...memoizeOne(() => buildGartenFolder({ store, loading }))(),
    ...memoizeOne(() =>
      showHerkunftFolder ? buildHerkunftFolder({ store, loading }) : [],
    )(),
    ...memoizeOne(() =>
      showLieferungFolder ? buildLieferungFolder({ store, loading }) : [],
    )(),
    ...memoizeOne(() => buildSammelLieferungFolder({ store, loading }))(),
    ...memoizeOne(() =>
      showTeilkulturFolder ? buildTeilkulturFolder({ store, loading }) : [],
    )(),
    ...memoizeOne(() =>
      showZaehlungFolder ? buildZaehlungFolder({ store, loading }) : [],
    )(),
    ...memoizeOne(() =>
      showEventFolder ? buildEventFolder({ store, loading }) : [],
    )(),
    ...memoizeOne(() => buildPersonFolder({ store, loading }))(),
    ...memoizeOne(() =>
      showSammlungFolder ? buildSammlungFolder({ store, loading }) : [],
    )(),
    ...memoizeOne(() =>
      showKulturFolder ? buildKulturFolder({ store, loading }) : [],
    )(),
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
  let artArtNodes
  openNodes.forEach((url) => {
    //console.log('nodes, url:', url.slice())
    if (!allParentNodesAreOpen(openNodes, url)) return
    if (url.length === 1 && url[0] === 'Arten') {
      artArtNodes = memoizeOne(() =>
        buildArtArt({
          nodes,
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
    if (url.length === 1 && url[0] === 'Events') {
      nodes = [
        ...nodes,
        ...memoizeOne(() =>
          buildEventEvent({
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
    if (url.length === 1 && url[0] === 'Kulturen') {
      nodes = [
        ...nodes,
        ...memoizeOne(() =>
          buildKulturKultur({
            nodes,
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
            store,
            loading,
          }),
        )(),
        ...memoizeOne(() =>
          buildArtKulturFolder({
            nodes,
            url,
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
      ]
    }
    if (url.length === 2 && url[0] === 'Kulturen') {
      nodes = [
        ...nodes,
        ...memoizeOne(() =>
          buildKulturTeilkulturFolder({
            nodes,
            url,
            store,
            loading,
          }),
        )(),
        ...memoizeOne(() =>
          buildKulturZaehlungFolder({
            nodes,
            url,
            store,
            loading,
          }),
        )(),
        ...memoizeOne(() =>
          buildKulturAnLieferungFolder({
            nodes,
            url,
            store,
            loading,
          }),
        )(),
        ...memoizeOne(() =>
          buildKulturAusLieferungFolder({
            nodes,
            url,
            store,
            loading,
          }),
        )(),
        ...memoizeOne(() =>
          buildKulturEventFolder({
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
            store,
            url,
          }),
        )(),
      ]
    }
    if (url.length === 3 && url[0] === 'Kulturen' && url[2] === 'Events') {
      nodes = [
        ...nodes,
        ...memoizeOne(() =>
          buildKulturEventEvent({
            nodes,
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
            store,
            loading,
          }),
        )(),
        ...memoizeOne(() =>
          buildArtKulturAusLieferungFolder({
            nodes,
            url,
            store,
            loading,
          }),
        )(),
        ...memoizeOne(() =>
          buildArtKulturAnLieferungFolder({
            nodes,
            url,
            store,
            loading,
          }),
        )(),
        ...memoizeOne(() =>
          buildArtKulturEventFolder({
            nodes,
            url,
            store,
            loading,
          }),
        )(),
        ...memoizeOne(() =>
          buildArtKulturTeilkulturFolder({
            nodes,
            url,
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
            store,
            loading,
          }),
        )(),
        ...memoizeOne(() =>
          buildGartenKulturAusLieferungFolder({
            nodes,
            url,
            store,
            loading,
          }),
        )(),
        ...memoizeOne(() =>
          buildGartenKulturAnLieferungFolder({
            nodes,
            url,
            store,
            loading,
          }),
        )(),
        ...memoizeOne(() =>
          buildGartenKulturEventFolder({
            nodes,
            url,
            store,
            loading,
          }),
        )(),
        ...memoizeOne(() =>
          buildGartenKulturTeilkulturFolder({
            nodes,
            url,
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
      url[4] === 'Events'
    ) {
      nodes = [
        ...nodes,
        ...memoizeOne(() =>
          buildArtKulturEventEvent({
            nodes,
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
      url[4] === 'Teilkulturen'
    ) {
      nodes = [
        ...nodes,
        ...memoizeOne(() =>
          buildArtKulturTeilkulturTeilkultur({
            nodes,
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
      url[4] === 'Events'
    ) {
      nodes = [
        ...nodes,
        ...memoizeOne(() =>
          buildGartenKulturEventEvent({
            nodes,
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
            data,
            store,
            url,
            loading,
          }),
        )(),
        ...memoizeOne(() =>
          buildSammlungAusLieferungKulturEventFolder({
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
      url[6] === 'Events'
    ) {
      nodes = [
        ...nodes,
        ...memoizeOne(() =>
          buildSammlungAusLieferungKulturEventEvent({
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
