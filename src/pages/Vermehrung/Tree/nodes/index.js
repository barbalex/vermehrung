import uniqBy from 'lodash/uniqBy'
//import get from 'lodash/get'

import sort from '../sort'
import allParentNodesExist from '../allParentNodesExist'
import buildArtFolder from './artFolder'
import buildGartenFolder from './gartenFolder'
import buildHerkunftFolder from './herkunftFolder'
import buildLieferungFolder from './lieferungFolder'
import buildPersonFolder from './personFolder'
import buildWerteListenFolder from './werteListenFolder'

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
  const gaerten = get(data, 'hasura.garten', [])
  const arten = get(data, 'hasura.ae_art', [])
  const herkuenfte = get(data, 'hasura.herkunft', [])
  const lieferungen = get(data, 'hasura.lieferung', [])
  const personen = get(data, 'hasura.person', [])
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

  const openNodes = store.tree.openNodes
    .toJSON()
    // need to sort so folders are added in correct order
    // because every lower folder gets previous nodes passed
    .sort(sort)

  let nodes = [
    buildArtFolder(),
    buildGartenFolder(),
    buildHerkunftFolder(),
    buildLieferungFolder(),
    buildPersonFolder(),
    buildWerteListenFolder(),
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
  openNodes.forEach(nodeUrl => {})

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
