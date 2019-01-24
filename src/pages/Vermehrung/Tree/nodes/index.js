import uniqBy from 'lodash/uniqBy'
//import get from 'lodash/get'

import sort from '../sort'
import allParentNodesExist from '../allParentNodesExist'
import allParentNodesAreOpen from '../allParentNodesAreOpen'
import buildArtFolder from './art/artFolder'
import buildArtArt from './art/art'
import buildArtSammlungFolder from './art/sammlung/folder'
import buildArtSammlung from './art/sammlung'
import buildArtKulturFolder from './art/kultur/folder'
import buildArtKultur from './art/kultur'
import buildGartenFolder from './garten/gartenFolder'
import buildGartenGarten from './garten/garten'
import buildHerkunftFolder from './herkunft/herkunftFolder'
import buildHerkunftHerkunft from './herkunft/herkunft'
import buildLieferungFolder from './lieferung/lieferungFolder'
import buildLieferungLieferung from './lieferung/lieferung'
import buildPersonFolder from './person/personFolder'
import buildPersonPerson from './person/person'
import buildWerteListenFolder from './werteListen/werteListenFolder'
import buildWLMasseinheitFolder from './werteListen/masseinheitFolder'
import buildWLMasseinheitMasseinheit from './werteListen/masseinheit'
import buildWLZaehleinheitFolder from './werteListen/zaehleinheitFolder'
import buildWLZaehleinheitZaehleinheit from './werteListen/zaehleinheit'
import buildWLLieferungTypFolder from './werteListen/lieferungTypFolder'
import buildWLLieferungTypTyp from './werteListen/lieferungTyp'
import buildWLLieferungStatusFolder from './werteListen/lieferungStatusFolder'
import buildWLLieferungStatusStatus from './werteListen/lieferungStatus'
import buildWLLieferungZwischenlagerFolder from './werteListen/lieferungZwischenlagerFolder'
import buildWLLieferungZwischenlagerZwischenlager from './werteListen/lieferungZwischenlager'

const compare = (a, b) => {
  // sort a before, if it has no value at this index
  if (a !== 0 && !a) return -1
  // sort a after if b has no value at this index
  if (b !== 0 && !b) return 1
  // sort a before if its value is smaller
  return a - b
}

export default ({ store, data }) => {
  /*
  const masseinheitWerte = get(data, 'hasura.masseinheit_werte', [])
  const zaehleinheitWerte = get(data, 'hasura.zaehleinheit_werte', [])
  const lieferungZwischenlagerWerte = get(
    data,
    'hasura.lieferung_zwischenlager_werte',
    [],
  )
  const lieferungStatusWerte = get(data, 'hasura.lieferung_status_werte', [])
  const lieferungTypWerte = get(data, 'hasura.lieferung_typ_werte', [])
  */

  let openNodes = store.tree.openNodes.sort(sort)

  let nodes = [
    ...buildArtFolder(),
    ...buildGartenFolder(),
    ...buildHerkunftFolder(),
    ...buildLieferungFolder(),
    ...buildPersonFolder(),
    ...buildWerteListenFolder(),
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
      nodes = [
        ...nodes,
        ...buildArtArt({
          nodes,
          data,
        }),
      ]
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
    if (url.length === 1 && url[0] === 'Werte-Listen') {
      nodes = [
        ...nodes,
        ...buildWLMasseinheitFolder({
          nodes,
          data,
        }),
        ...buildWLZaehleinheitFolder({
          nodes,
          data,
        }),
        ...buildWLLieferungTypFolder({
          nodes,
          data,
        }),
        ...buildWLLieferungStatusFolder({
          nodes,
          data,
        }),
        ...buildWLLieferungZwischenlagerFolder({
          nodes,
          data,
        }),
      ]
    }

    if (url.length === 2 && url[0] === 'Arten') {
      nodes = [
        ...nodes,
        ...buildArtSammlungFolder({
          nodes,
          url,
        }),
        ...buildArtKulturFolder({
          nodes,
          url,
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
