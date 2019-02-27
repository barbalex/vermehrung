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
import buildArtKulturZaehlungFolder from './art/kultur/zaehlung/folder'
import buildArtKulturZaehlungZaehlung from './art/kultur/zaehlung'
import buildArtKulturInventarFolder from './art/kultur/inventar/folder'
import buildArtKulturInventarInventar from './art/kultur/inventar'
import buildArtKulturAusLieferungFolder from './art/kultur/auslieferung/folder'
import buildArtKulturLieferungAusLieferung from './art/kultur/auslieferung'
import buildArtKulturAnLieferungFolder from './art/kultur/anlieferung/folder'
import buildArtKulturLieferungAnLieferung from './art/kultur/anlieferung'

import buildGartenFolder from './garten/folder'
import buildGartenGarten from './garten'
import buildGartenKulturFolder from './garten/kultur/folder'
import buildGartenKultur from './garten/kultur'
import buildGartenKulturEventFolder from './garten/kultur/event/folder'
import buildGartenKulturEventEvent from './garten/kultur/event'
import buildGartenKulturZaehlungFolder from './garten/kultur/zaehlung/folder'
import buildGartenKulturZaehlungZaehlung from './garten/kultur/zaehlung'
import buildGartenKulturInventarFolder from './garten/kultur/inventar/folder'
import buildGartenKulturInventarInventar from './garten/kultur/inventar'
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

import buildPersonFolder from './person/folder'
import buildPersonPerson from './person'
import buildPersonGartenFolder from './person/garten/folder'
import buildPersonGartenGarten from './person/garten'
import buildPersonGartenKulturFolder from './person/garten/kultur/folder'
import buildPersonGartenKulturKultur from './person/garten/kultur'
import buildPersonGartenKulturZaehlungFolder from './person/garten/kultur/zaehlung/folder'
import buildPersonGartenKulturZaehlungZaehlung from './person/garten/kultur/zaehlung'
import buildPersonGartenKulturInventarFolder from './person/garten/kultur/inventar/folder'
import buildPersonGartenKulturInventarInventar from './person/garten/kultur/inventar'
import buildPersonGartenKulturEventFolder from './person/garten/kultur/event/folder'
import buildPersonGartenKulturEventEvent from './person/garten/kultur/event'
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
// TODO: build SammlungKulturFolder and Kultur
import buildSammlungAusLieferungKulturFolder from './sammlung/auslieferung/kultur/folder'
import buildSammlungAusLieferungKulturKultur from './sammlung/auslieferung/kultur'
import buildSammlungAusLieferungKulturZaehlungFolder from './sammlung/auslieferung/kultur/zaehlung/folder'
import buildSammlungAusLieferungKulturZaehlungZaehlung from './sammlung/auslieferung/kultur/zaehlung'
import buildSammlungAusLieferungKulturInventarFolder from './sammlung/auslieferung/kultur/inventar/folder'
import buildSammlungAusLieferungKulturInventarInventar from './sammlung/auslieferung/kultur/inventar'
import buildSammlungAusLieferungKulturEventFolder from './sammlung/auslieferung/kultur/event/folder'
import buildSammlungAusLieferungKulturEventEvent from './sammlung/auslieferung/kultur/event'
import buildSammlungAusLieferungKulturAusLieferungFolder from './sammlung/auslieferung/kultur/auslieferung/folder'
import buildSammlungAusLieferungKulturAusLieferungLieferung from './sammlung/auslieferung/kultur/auslieferung'
import buildSammlungAusLieferungKulturAnLieferungFolder from './sammlung/auslieferung/kultur/anlieferung/folder'
import buildSammlungAusLieferungKulturAnLieferungLieferung from './sammlung/auslieferung/kultur/anlieferung'

import buildKulturFolder from './kultur/folder'
import buildKulturKultur from './kultur'
import buildKulturEventFolder from './kultur/event/folder'
import buildKulturEventEvent from './kultur/event'
import buildKulturZaehlungFolder from './kultur/zaehlung/folder'
import buildKulturZaehlungZaehlung from './kultur/zaehlung'
import buildKulturInventarFolder from './kultur/inventar/folder'
import buildKulturInventarInventar from './kultur/inventar'
import buildKulturAusLieferungFolder from './kultur/auslieferung/folder'
import buildKulturLieferungAusLieferung from './kultur/auslieferung'
import buildKulturAnLieferungFolder from './kultur/anlieferung/folder'
import buildKulturLieferungAnLieferung from './kultur/anlieferung'

import buildWerteListenFolder from './werteListen/folder'
import buildWLMasseinheitFolder from './werteListen/masseinheit/folder'
import buildWLMasseinheitMasseinheit from './werteListen/masseinheit'
import buildWLZaehleinheitFolder from './werteListen/zaehleinheit/folder'
import buildWLZaehleinheitZaehleinheit from './werteListen/zaehleinheit'
import buildWLLieferungTypFolder from './werteListen/lieferungTyp/folder'
import buildWLLieferungTypTyp from './werteListen/lieferungTyp'
import buildWLLieferungStatusFolder from './werteListen/lieferungStatus/folder'
import buildWLLieferungStatusStatus from './werteListen/lieferungStatus'
import buildWLLieferungZwischenlagerFolder from './werteListen/lieferungZwischenlager/folder'
import buildWLLieferungZwischenlagerZwischenlager from './werteListen/lieferungZwischenlager'

export default ({ store, data, loading }) => {
  const openNodes = store.tree.openNodes.sort(sort)
  let artArtNodes

  let nodes = [
    ...memoizeOne(() => buildArtFolder({ data, loading }))(),
    ...memoizeOne(() => buildGartenFolder({ data, loading }))(),
    ...memoizeOne(() => buildHerkunftFolder({ data, loading }))(),
    ...memoizeOne(() => buildLieferungFolder({ data, loading }))(),
    ...memoizeOne(() => buildPersonFolder({ data, loading }))(),
    ...memoizeOne(() => buildSammlungFolder({ data, loading }))(),
    ...memoizeOne(() => buildKulturFolder({ data, loading }))(),
    ...memoizeOne(() => buildWerteListenFolder({ data, loading }))(),
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
    if (!allParentNodesAreOpen(openNodes, url)) return
    if (url.length === 1 && url[0] === 'Arten') {
      artArtNodes = memoizeOne(() =>
        buildArtArt({
          nodes,
          data,
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
          }),
        )(),
      ]
    }
    if (url.length === 1 && url[0] === 'Werte-Listen') {
      nodes = [
        ...nodes,
        ...memoizeOne(() =>
          buildWLMasseinheitFolder({
            data,
            loading,
            nodes,
          }),
        )(),
        ...memoizeOne(() =>
          buildWLZaehleinheitFolder({
            data,
            loading,
            nodes,
          }),
        )(),
        ...memoizeOne(() =>
          buildWLLieferungTypFolder({
            data,
            loading,
            nodes,
          }),
        )(),
        ...memoizeOne(() =>
          buildWLLieferungStatusFolder({
            data,
            loading,
            nodes,
          }),
        )(),
        ...memoizeOne(() =>
          buildWLLieferungZwischenlagerFolder({
            data,
            loading,
            nodes,
          }),
        )(),
      ]
    }

    if (url.length === 2 && url[0] === 'Arten') {
      nodes = [
        ...nodes,
        ...buildArtSammlungFolder({
          nodes,
          url,
          data,
          loading,
        }),
        ...buildArtKulturFolder({
          nodes,
          url,
          data,
          loading,
        }),
      ]
    }
    if (url.length === 2 && url[0] === 'Gaerten') {
      nodes = [
        ...nodes,
        ...buildGartenKulturFolder({
          nodes,
          url,
          data,
          loading,
        }),
      ]
    }
    if (url.length === 2 && url[0] === 'Personen') {
      nodes = [
        ...nodes,
        ...buildPersonGartenFolder({
          nodes,
          url,
          data,
          loading,
        }),
        ...buildPersonGartenSammlungFolder({
          nodes,
          url,
          data,
          loading,
        }),
        ...buildPersonGartenLieferungFolder({
          nodes,
          url,
          data,
          loading,
        }),
      ]
    }
    if (url.length === 2 && url[0] === 'Sammlungen') {
      nodes = [
        ...nodes,
        ...buildSammlungHerkunftFolder({
          nodes,
          url,
          data,
          loading,
        }),
        ...buildSammlungAusLieferungFolder({
          nodes,
          url,
          data,
          loading,
        }),
        // TODO: build SammlungKulturFolder
      ]
    }
    if (url.length === 2 && url[0] === 'Kulturen') {
      nodes = [
        ...nodes,
        ...buildKulturZaehlungFolder({
          nodes,
          url,
          data,
          loading,
        }),
        ...buildKulturAnLieferungFolder({
          nodes,
          url,
          data,
          loading,
        }),
        ...buildKulturAusLieferungFolder({
          nodes,
          url,
          data,
          loading,
        }),
        ...buildKulturEventFolder({
          nodes,
          url,
          data,
          loading,
        }),
        ...buildKulturInventarFolder({
          nodes,
          url,
          data,
          loading,
        }),
      ]
    }

    if (
      url.length === 2 &&
      url[0] === 'Werte-Listen' &&
      url[1] === 'Zaehleinheiten'
    ) {
      nodes = [
        ...nodes,
        ...buildWLZaehleinheitZaehleinheit({
          nodes,
          data,
        }),
      ]
    }
    if (
      url.length === 2 &&
      url[0] === 'Werte-Listen' &&
      url[1] === 'Lieferung-Status'
    ) {
      nodes = [
        ...nodes,
        ...buildWLLieferungStatusStatus({
          nodes,
          data,
        }),
      ]
    }
    if (
      url.length === 2 &&
      url[0] === 'Werte-Listen' &&
      url[1] === 'Lieferung-Typ'
    ) {
      nodes = [
        ...nodes,
        ...buildWLLieferungTypTyp({
          nodes,
          data,
        }),
      ]
    }
    if (
      url.length === 2 &&
      url[0] === 'Werte-Listen' &&
      url[1] === 'Lieferung-Zwischenlager'
    ) {
      nodes = [
        ...nodes,
        ...buildWLLieferungZwischenlagerZwischenlager({
          nodes,
          data,
        }),
      ]
    }
    if (
      url.length === 2 &&
      url[0] === 'Werte-Listen' &&
      url[1] === 'Masseinheiten'
    ) {
      nodes = [
        ...nodes,
        ...buildWLMasseinheitMasseinheit({
          nodes,
          data,
        }),
      ]
    }
    if (url.length === 2 && url[0] === 'Herkuenfte') {
      nodes = [
        ...nodes,
        ...buildHerkunftSammlungFolder({
          nodes,
          data,
          loading,
          url,
        }),
      ]
    }

    if (url.length === 3 && url[0] === 'Arten' && url[2] === 'Kulturen') {
      nodes = [
        ...nodes,
        ...buildArtKultur({
          nodes,
          data,
          url,
        }),
      ]
    }
    if (url.length === 3 && url[0] === 'Arten' && url[2] === 'Sammlungen') {
      nodes = [
        ...nodes,
        ...buildArtSammlung({
          nodes,
          data,
          url,
        }),
      ]
    }
    if (url.length === 3 && url[0] === 'Gaerten' && url[2] === 'Kulturen') {
      nodes = [
        ...nodes,
        ...buildGartenKultur({
          nodes,
          data,
          url,
        }),
      ]
    }
    if (
      url.length === 3 &&
      url[0] === 'Herkuenfte' &&
      url[2] === 'Sammlungen'
    ) {
      nodes = [
        ...nodes,
        ...buildHerkunftSammlungSammlung({
          nodes,
          data,
          url,
        }),
      ]
    }
    if (url.length === 3 && url[0] === 'Personen' && url[2] === 'Gaerten') {
      nodes = [
        ...nodes,
        ...buildPersonGartenGarten({
          nodes,
          data,
          url,
        }),
      ]
    }
    if (url.length === 3 && url[0] === 'Personen' && url[2] === 'Sammlungen') {
      nodes = [
        ...nodes,
        ...buildPersonGartenSammlungSammlung({
          nodes,
          data,
          url,
        }),
      ]
    }
    if (url.length === 3 && url[0] === 'Personen' && url[2] === 'Lieferungen') {
      nodes = [
        ...nodes,
        ...buildPersonGartenLieferungLieferung({
          nodes,
          data,
          url,
        }),
      ]
    }
    if (
      url.length === 3 &&
      url[0] === 'Sammlungen' &&
      url[2] === 'Herkuenfte'
    ) {
      nodes = [
        ...nodes,
        ...buildSammlungHerkunftHerkunft({
          nodes,
          data,
          url,
        }),
      ]
    }
    if (
      url.length === 3 &&
      url[0] === 'Sammlungen' &&
      url[2] === 'Aus-Lieferungen'
    ) {
      nodes = [
        ...nodes,
        ...buildSammlungAusLieferungLieferung({
          nodes,
          data,
          url,
        }),
      ]
    }
    if (url.length === 3 && url[0] === 'Kulturen' && url[2] === 'Zaehlungen') {
      nodes = [
        ...nodes,
        ...buildKulturZaehlungZaehlung({
          nodes,
          data,
          url,
        }),
      ]
    }
    if (
      url.length === 3 &&
      url[0] === 'Kulturen' &&
      url[2] === 'An-Lieferungen'
    ) {
      nodes = [
        ...nodes,
        ...buildKulturLieferungAnLieferung({
          nodes,
          data,
          url,
        }),
      ]
    }
    if (
      url.length === 3 &&
      url[0] === 'Kulturen' &&
      url[2] === 'Aus-Lieferungen'
    ) {
      nodes = [
        ...nodes,
        ...buildKulturLieferungAusLieferung({
          nodes,
          data,
          url,
        }),
      ]
    }
    if (url.length === 3 && url[0] === 'Kulturen' && url[2] === 'Events') {
      nodes = [
        ...nodes,
        ...buildKulturEventEvent({
          nodes,
          data,
          url,
        }),
      ]
    }
    if (url.length === 3 && url[0] === 'Kulturen' && url[2] === 'Inventare') {
      nodes = [
        ...nodes,
        ...buildKulturInventarInventar({
          nodes,
          data,
          url,
        }),
      ]
    }

    if (url.length === 4 && url[0] === 'Arten' && url[2] === 'Kulturen') {
      nodes = [
        ...nodes,
        ...buildArtKulturZaehlungFolder({
          nodes,
          url,
          data,
          loading,
        }),
        ...buildArtKulturAusLieferungFolder({
          nodes,
          url,
          data,
          loading,
        }),
        ...buildArtKulturAnLieferungFolder({
          nodes,
          url,
          data,
          loading,
        }),
        ...buildArtKulturEventFolder({
          nodes,
          url,
          data,
          loading,
        }),
        ...buildArtKulturInventarFolder({
          nodes,
          url,
          data,
          loading,
        }),
      ]
    }
    if (url.length === 4 && url[0] === 'Arten' && url[2] === 'Sammlungen') {
      nodes = [
        ...nodes,
        ...buildArtSammlungAusLieferungFolder({
          nodes,
          data,
          url,
          loading,
        }),
      ]
    }
    if (url.length === 4 && url[0] === 'Gaerten' && url[2] === 'Kulturen') {
      nodes = [
        ...nodes,
        ...buildGartenKulturZaehlungFolder({
          nodes,
          url,
          data,
          loading,
        }),
        ...buildGartenKulturAusLieferungFolder({
          nodes,
          url,
          data,
          loading,
        }),
        ...buildGartenKulturAnLieferungFolder({
          nodes,
          url,
          data,
          loading,
        }),
        ...buildGartenKulturEventFolder({
          nodes,
          url,
          data,
          loading,
        }),
        ...buildGartenKulturInventarFolder({
          nodes,
          url,
          data,
          loading,
        }),
      ]
    }
    if (
      url.length === 4 &&
      url[0] === 'Herkuenfte' &&
      url[2] === 'Sammlungen'
    ) {
      nodes = [
        ...nodes,
        ...buildHerkunftSammlungAusLieferungFolder({
          nodes,
          data,
          url,
          loading,
        }),
      ]
    }
    if (url.length === 4 && url[0] === 'Personen' && url[2] === 'Gaerten') {
      nodes = [
        ...nodes,
        ...buildPersonGartenKulturFolder({
          nodes,
          data,
          url,
          loading,
        }),
      ]
    }
    if (
      url.length === 4 &&
      url[0] === 'Sammlungen' &&
      url[2] === 'Aus-Lieferungen'
    ) {
      nodes = [
        ...nodes,
        ...buildSammlungAusLieferungKulturFolder({
          nodes,
          data,
          url,
          loading,
        }),
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
        ...buildArtKulturZaehlungZaehlung({
          nodes,
          data,
          url,
        }),
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
        ...buildSammlungAusLieferungKulturKultur({
          nodes,
          data,
          url,
        }),
      ]
    }
    if (
      url.length === 5 &&
      url[0] === 'Arten' &&
      url[2] === 'Kulturen' &&
      url[4] === 'Inventare'
    ) {
      nodes = [
        ...nodes,
        ...buildArtKulturInventarInventar({
          nodes,
          data,
          url,
        }),
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
        ...buildArtKulturLieferungAusLieferung({
          nodes,
          data,
          url,
        }),
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
        ...buildArtKulturLieferungAnLieferung({
          nodes,
          data,
          url,
        }),
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
        ...buildArtKulturEventEvent({
          nodes,
          data,
          url,
        }),
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
        ...buildGartenKulturZaehlungZaehlung({
          nodes,
          data,
          url,
        }),
      ]
    }
    if (
      url.length === 5 &&
      url[0] === 'Gaerten' &&
      url[2] === 'Kulturen' &&
      url[4] === 'Inventare'
    ) {
      nodes = [
        ...nodes,
        ...buildGartenKulturInventarInventar({
          nodes,
          data,
          url,
        }),
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
        ...buildGartenKulturLieferungAusLieferung({
          nodes,
          data,
          url,
        }),
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
        ...buildGartenKulturLieferungAnLieferung({
          nodes,
          data,
          url,
        }),
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
        ...buildGartenKulturEventEvent({
          nodes,
          data,
          url,
        }),
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
        ...buildArtSammlungLieferungAusLieferung({
          nodes,
          data,
          url,
        }),
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
        ...buildHerkunftSammlungausLieferungLieferung({
          nodes,
          data,
          url,
        }),
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
        ...buildPersonGartenKulturKultur({
          nodes,
          data,
          url,
        }),
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
        ...buildPersonGartenKulturZaehlungFolder({
          nodes,
          data,
          url,
        }),
        ...buildPersonGartenKulturInventarFolder({
          nodes,
          data,
          url,
        }),
        ...buildPersonGartenKulturEventFolder({
          nodes,
          data,
          url,
        }),
        ...buildPersonGartenKulturAuslieferungFolder({
          nodes,
          data,
          url,
        }),
        ...buildPersonGartenKulturAnlieferungFolder({
          nodes,
          data,
          url,
        }),
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
        ...buildSammlungAusLieferungKulturZaehlungFolder({
          nodes,
          data,
          url,
          loading,
        }),
        ...buildSammlungAusLieferungKulturInventarFolder({
          nodes,
          data,
          url,
          loading,
        }),
        ...buildSammlungAusLieferungKulturEventFolder({
          nodes,
          data,
          url,
          loading,
        }),
        ...buildSammlungAusLieferungKulturAusLieferungFolder({
          nodes,
          data,
          url,
          loading,
        }),
        ...buildSammlungAusLieferungKulturAnLieferungFolder({
          nodes,
          data,
          url,
          loading,
        }),
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
        ...buildPersonGartenKulturZaehlungZaehlung({
          nodes,
          data,
          url,
        }),
      ]
    }
    if (
      url.length === 7 &&
      url[0] === 'Personen' &&
      url[2] === 'Gaerten' &&
      url[4] === 'Kulturen' &&
      url[6] === 'Inventare'
    ) {
      nodes = [
        ...nodes,
        ...buildPersonGartenKulturInventarInventar({
          nodes,
          data,
          url,
        }),
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
        ...buildPersonGartenKulturEventEvent({
          nodes,
          data,
          url,
        }),
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
        ...buildPersonGartenKulturAuslieferungLieferung({
          nodes,
          data,
          url,
        }),
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
        ...buildPersonGartenKulturAnlieferungLieferung({
          nodes,
          data,
          url,
        }),
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
        ...buildSammlungAusLieferungKulturZaehlungZaehlung({
          nodes,
          data,
          url,
          loading,
        }),
      ]
    }
    if (
      url.length === 7 &&
      url[0] === 'Sammlungen' &&
      url[2] === 'Aus-Lieferungen' &&
      url[4] === 'Kulturen' &&
      url[6] === 'Inventare'
    ) {
      nodes = [
        ...nodes,
        ...buildSammlungAusLieferungKulturInventarInventar({
          nodes,
          data,
          url,
          loading,
        }),
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
        ...buildSammlungAusLieferungKulturEventEvent({
          nodes,
          data,
          url,
          loading,
        }),
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
        ...buildSammlungAusLieferungKulturAusLieferungLieferung({
          nodes,
          data,
          url,
          loading,
        }),
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
        ...buildSammlungAusLieferungKulturAnLieferungLieferung({
          nodes,
          data,
          url,
          loading,
        }),
      ]
    }
  })

  return nodes
}
