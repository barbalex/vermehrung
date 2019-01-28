import uniqBy from 'lodash/uniqBy'

import sort from '../sort'
import allParentNodesExist from '../allParentNodesExist'
import allParentNodesAreOpen from '../allParentNodesAreOpen'

import buildArtFolder from './art/folder'
import buildArtArt from './art'

import buildArtSammlungFolder from './art/sammlung/folder'
import buildArtSammlung from './art/sammlung'
import buildArtSammlungLieferungFolder from './art/sammlung/lieferung/folder'
import buildArtSammlungLieferungLieferung from './art/sammlung/lieferung'

import buildArtKulturFolder from './art/kultur/folder'
import buildArtKultur from './art/kultur'
import buildArtKulturEventFolder from './art/kultur/event/folder'
import buildArtKulturEventEvent from './art/kultur/event'
import buildArtKulturZaehlungFolder from './art/kultur/zaehlung/folder'
import buildArtKulturZaehlungZaehlung from './art/kultur/zaehlung'
import buildArtKulturInventarFolder from './art/kultur/inventar/folder'
import buildArtKulturInventarInventar from './art/kultur/inventar'
import buildArtKulturAbLieferungFolder from './art/kultur/ablieferung/folder'
import buildArtKulturLieferungAbLieferung from './art/kultur/ablieferung'
import buildArtKulturZuLieferungFolder from './art/kultur/zulieferung/folder'
import buildArtKulturLieferungZuLieferung from './art/kultur/zulieferung'

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
import buildGartenKulturAbLieferungFolder from './garten/kultur/ablieferung/folder'
import buildGartenKulturLieferungAbLieferung from './garten/kultur/ablieferung'
import buildGartenKulturZuLieferungFolder from './garten/kultur/zulieferung/folder'
import buildGartenKulturLieferungZuLieferung from './garten/kultur/zulieferung'

import buildHerkunftFolder from './herkunft/folder'
import buildHerkunftHerkunft from './herkunft'
import buildHerkunftSammlungFolder from './herkunft/sammlung/folder'
import buildHerkunftSammlungSammlung from './herkunft/sammlung'
import buildHerkunftSammlungLieferungFolder from './herkunft/sammlung/lieferung/folder'
import buildHerkunftSammlungLieferungLieferung from './herkunft/sammlung/lieferung'

import buildLieferungFolder from './lieferung/folder'
import buildLieferungLieferung from './lieferung'

import buildPersonFolder from './person/folder'
import buildPersonPerson from './person'
import buildPersonGartenFolder from './person/garten/folder'
import buildPersonGartenGarten from './person/garten'
import buildPersonGartenKulturFolder from './person/garten/kultur/folder'
import buildPersonGartenKulturKultur from './person/garten/kultur'
import buildPersonGartenSammlungFolder from './person/sammlung/folder'
import buildPersonGartenSammlungSammlung from './person/sammlung'
import buildPersonGartenLieferungFolder from './person/lieferung/folder'
import buildPersonGartenLieferungLieferung from './person/lieferung'

import buildSammlungFolder from './sammlung/folder'
import buildSammlungSammlung from './sammlung'
import buildSammlungKulturFolder from './sammlung/kultur/folder'
import buildSammlungKulturKultur from './sammlung/kultur'
import buildSammlungLieferungFolder from './sammlung/lieferung/folder'
import buildSammlungLieferungLieferung from './sammlung/lieferung'

import buildKulturFolder from './kultur/folder'
import buildKulturKultur from './kultur'
import buildKulturEventFolder from './kultur/event/folder'
import buildKulturEventEvent from './kultur/event'
import buildKulturZaehlungFolder from './kultur/zaehlung/folder'
import buildKulturZaehlungZaehlung from './kultur/zaehlung'
import buildKulturInventarFolder from './kultur/inventar/folder'
import buildKulturInventarInventar from './kultur/inventar'
import buildKulturAbLieferungFolder from './kultur/ablieferung/folder'
import buildKulturLieferungAbLieferung from './kultur/ablieferung'
import buildKulturZuLieferungFolder from './kultur/zulieferung/folder'
import buildKulturLieferungZuLieferung from './kultur/zulieferung'

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

const compare = (a, b) => {
  // sort a before, if it has no value at this index
  if (a !== 0 && !a) return -1
  // sort a after if b has no value at this index
  if (b !== 0 && !b) return 1
  // sort a before if its value is smaller
  return a - b
}

export default ({ store, data, loading }) => {
  const openNodes = store.tree.openNodes.sort(sort)
  let artArtNodes

  let nodes = [
    ...buildArtFolder({ data, loading }),
    ...buildGartenFolder({ data, loading }),
    ...buildHerkunftFolder({ data, loading }),
    ...buildLieferungFolder({ data, loading }),
    ...buildPersonFolder({ data, loading }),
    ...buildSammlungFolder({ data, loading }),
    ...buildKulturFolder({ data, loading }),
    ...buildWerteListenFolder({ data, loading }),
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
      artArtNodes = buildArtArt({
        nodes,
        data,
      })
      nodes = [...nodes, ...artArtNodes]
    }
    if (url.length === 1 && url[0] === 'Gaerten') {
      nodes = [
        ...nodes,
        ...buildGartenGarten({
          nodes,
          data,
        }),
      ]
    }
    if (url.length === 1 && url[0] === 'Herkuenfte') {
      nodes = [
        ...nodes,
        ...buildHerkunftHerkunft({
          nodes,
          data,
        }),
      ]
    }
    if (url.length === 1 && url[0] === 'Lieferungen') {
      nodes = [
        ...nodes,
        ...buildLieferungLieferung({
          nodes,
          data,
        }),
      ]
    }
    if (url.length === 1 && url[0] === 'Personen') {
      nodes = [
        ...nodes,
        ...buildPersonPerson({
          nodes,
          data,
        }),
      ]
    }
    if (url.length === 1 && url[0] === 'Sammlungen') {
      nodes = [
        ...nodes,
        ...buildSammlungSammlung({
          nodes,
          data,
        }),
      ]
    }
    if (url.length === 1 && url[0] === 'Kulturen') {
      nodes = [
        ...nodes,
        ...buildKulturKultur({
          nodes,
          data,
        }),
      ]
    }
    if (url.length === 1 && url[0] === 'Werte-Listen') {
      nodes = [
        ...nodes,
        ...buildWLMasseinheitFolder({
          data,
          loading,
        }),
        ...buildWLZaehleinheitFolder({
          data,
          loading,
        }),
        ...buildWLLieferungTypFolder({
          data,
          loading,
        }),
        ...buildWLLieferungStatusFolder({
          data,
          loading,
        }),
        ...buildWLLieferungZwischenlagerFolder({
          data,
          loading,
        }),
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
        ...buildSammlungKulturFolder({
          nodes,
          url,
          data,
          loading,
        }),
        ...buildSammlungLieferungFolder({
          nodes,
          url,
          data,
          loading,
        }),
      ]
    }
    if (url.length === 2 && url[0] === 'Kulturen') {
      console.log(
        'todo',
        buildKulturZaehlungFolder({
          nodes,
          url,
          data,
          loading,
        }),
      )
      nodes = [
        ...nodes,
        ...buildKulturZaehlungFolder({
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
    if (url.length === 3 && url[0] === 'Sammlungen' && url[2] === 'Kulturen') {
      nodes = [
        ...nodes,
        ...buildSammlungKulturKultur({
          nodes,
          data,
          url,
        }),
      ]
    }
    if (
      url.length === 3 &&
      url[0] === 'Sammlungen' &&
      url[2] === 'Lieferungen'
    ) {
      nodes = [
        ...nodes,
        ...buildSammlungLieferungLieferung({
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
        ...buildArtKulturAbLieferungFolder({
          nodes,
          url,
          data,
          loading,
        }),
        ...buildArtKulturZuLieferungFolder({
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
        ...buildArtSammlungLieferungFolder({
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
        ...buildGartenKulturAbLieferungFolder({
          nodes,
          url,
          data,
          loading,
        }),
        ...buildGartenKulturZuLieferungFolder({
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
        ...buildHerkunftSammlungLieferungFolder({
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
      url[4] === 'Ab-Lieferungen'
    ) {
      nodes = [
        ...nodes,
        ...buildArtKulturLieferungAbLieferung({
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
      url[4] === 'Zu-Lieferungen'
    ) {
      nodes = [
        ...nodes,
        ...buildArtKulturLieferungZuLieferung({
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
      url[4] === 'Ab-Lieferungen'
    ) {
      nodes = [
        ...nodes,
        ...buildGartenKulturLieferungAbLieferung({
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
      url[4] === 'Zu-Lieferungen'
    ) {
      nodes = [
        ...nodes,
        ...buildGartenKulturLieferungZuLieferung({
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
      url[4] === 'Lieferungen'
    ) {
      nodes = [
        ...nodes,
        ...buildArtSammlungLieferungLieferung({
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
      url[4] === 'Lieferungen'
    ) {
      nodes = [
        ...nodes,
        ...buildHerkunftSammlungLieferungLieferung({
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
  })

  nodes = nodes.filter(n => allParentNodesExist(nodes, n))
  /**
   * There is something weird happening when filtering data
   * that leads to duplicate nodes
   * Need to solve that but in the meantime use uniqBy
   */
  nodes = uniqBy(nodes, n => n.url.join())

  /**
   * As all nodes are now in one flat list,
   * we need to sort them
   *
   * This is the sorting algorithm:
   *
   * compare the sort array value in the nodes
   * to determine sorting
   *
   * compare arrays element by element, starting with first
   * if a has no value at this index (> a is folder), sort a before b
   * if b has no value at this index (> b is folder), sort a after b
   * if a is smaller than b, sort a before b
   * if both array elements at this index are same,
   * compare values at next index
   *
   * see: stackoverflow.com/questions/13211709/javascript-sort-array-by-multiple-number-fields
   */
  return nodes.sort(
    (a, b) =>
      compare(a.sort[0], b.sort[0]) ||
      compare(a.sort[1], b.sort[1]) ||
      compare(a.sort[2], b.sort[2]) ||
      compare(a.sort[3], b.sort[3]) ||
      compare(a.sort[4], b.sort[4]) ||
      compare(a.sort[5], b.sort[5]) ||
      compare(a.sort[6], b.sort[6]) ||
      compare(a.sort[7], b.sort[7]) ||
      compare(a.sort[8], b.sort[8]) ||
      compare(a.sort[9], b.sort[9]) ||
      compare(a.sort[10], b.sort[10]),
  )
}
