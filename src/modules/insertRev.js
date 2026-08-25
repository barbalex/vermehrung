import { v1 as uuidv1 } from 'uuid'
import md5 from 'blueimp-md5'
import isUuid from 'is-uuid'

import {
  store,
  activeNodeArrayAtom,
  dbAtom,
  userAtom,
  addQueuedQuery,
  setActiveNodeArray,
  xxxIdInActiveNodeArrayAtoms as idAtoms,
} from '../store/index.js'

/**
 * Creates a new revision for a new row in table <table>_rev,
 * queues the mutation for the server and optimistically
 * creates the row in the local WatermelonDB.
 *
 * Replaces the 14 former MST actions insert<Table>Rev.
 * Field order matters: the revision hash (md5) is computed from
 * the JSON of the object, so order must stay stable.
 */
const configs = {
  art: {
    idField: 'art_id',
    fields: [['art_id'], ['ae_id'], ['set'], ['apflora_av'], ['apflora_ap']],
  },
  av: {
    idField: 'av_id',
    fields: [['av_id'], ['art_id'], ['person_id']],
    navigate: false,
  },
  event: {
    idField: 'event_id',
    fields: [
      ['event_id'],
      ['kultur_id', 'kulturIdInActiveNodeArray'],
      ['teilkultur_id', 'teilkulturIdInActiveNodeArray'],
      ['person_id'],
      ['beschreibung'],
      ['geplant'],
      ['datum'],
    ],
  },
  garten: {
    idField: 'garten_id',
    fields: [
      ['garten_id'],
      ['name'],
      ['person_id', 'personIdInActiveNodeArray'],
      ['strasse'],
      ['plz'],
      ['ort'],
      ['geom_point'],
      ['aktiv', null, true],
      ['bemerkungen'],
    ],
  },
  gv: {
    idField: 'gv_id',
    fields: [['gv_id'], ['garten_id'], ['person_id']],
    navigate: false,
  },
  herkunft: {
    idField: 'herkunft_id',
    fields: [
      ['herkunft_id'],
      ['nr'],
      ['lokalname'],
      ['gemeinde'],
      ['kanton'],
      ['land'],
      ['geom_point'],
      ['bemerkungen'],
    ],
  },
  kultur: {
    idField: 'kultur_id',
    fields: [
      ['kultur_id'],
      ['art_id', 'artIdInActiveNodeArray'],
      ['herkunft_id', 'herkunftIdInActiveNodeArray'],
      ['garten_id', 'gartenIdInActiveNodeArray'],
      ['zwischenlager'],
      ['erhaltungskultur'],
      ['von_anzahl_individuen'],
      ['bemerkungen'],
      ['aktiv', null, true],
    ],
    extraCollections: ['kultur_option'],
    noNavigateArg: 'nonavigate',
  },
  lieferung: {
    idField: 'lieferung_id',
    fields: [
      ['lieferung_id'],
      ['sammel_lieferung_id', 'sammelLieferungIdInActiveNodeArray'],
      ['art_id', 'artIdInActiveNodeArray'],
      ['person_id', 'personIdInActiveNodeArray'],
      ['von_sammlung_id', 'sammlungIdInActiveNodeArray'],
      ['von_kultur_id', 'kulturIdOfAusLieferungInActiveNodeArray'],
      ['datum'],
      ['nach_kultur_id', 'kulturIdOfAnLieferungInActiveNodeArray'],
      ['nach_ausgepflanzt'],
      ['von_anzahl_individuen'],
      ['anzahl_pflanzen'],
      ['anzahl_auspflanzbereit'],
      ['gramm_samen'],
      ['andere_menge'],
      ['geplant'],
      ['bemerkungen'],
    ],
  },
  person: {
    idField: 'person_id',
    fields: [
      ['person_id'],
      ['nr'],
      ['vorname'],
      ['name'],
      ['adresszusatz'],
      ['strasse'],
      ['plz'],
      ['ort'],
      ['telefon_privat'],
      ['telefon_geschaeft'],
      ['telefon_mobile'],
      ['email'],
      ['kein_email'],
      ['bemerkungen'],
      ['account_id'],
      ['user_role_id'],
      ['kommerziell'],
      ['info'],
      ['aktiv', null, true],
    ],
    extraCollections: ['person_option'],
  },
  sammel_lieferung: {
    idField: 'sammel_lieferung_id',
    fields: [
      ['sammel_lieferung_id'],
      ['art_id', 'artIdInActiveNodeArray'],
      ['person_id', 'personIdInActiveNodeArray'],
      ['von_sammlung_id', 'sammlungIdInActiveNodeArray'],
      ['von_kultur_id', 'kulturIdOfAnLieferungInActiveNodeArray'],
      ['datum'],
      ['nach_kultur_id'],
      ['nach_ausgepflanzt'],
      ['von_anzahl_individuen'],
      ['anzahl_pflanzen'],
      ['anzahl_auspflanzbereit'],
      ['gramm_samen'],
      ['andere_menge'],
      ['geplant'],
      ['bemerkungen'],
    ],
  },
  sammlung: {
    idField: 'sammlung_id',
    fields: [
      ['sammlung_id'],
      ['art_id', 'artIdInActiveNodeArray'],
      ['person_id', 'personIdInActiveNodeArray'],
      ['herkunft_id', 'herkunftIdInActiveNodeArray'],
      ['nr'],
      ['datum'],
      ['von_anzahl_individuen'],
      ['anzahl_pflanzen'],
      ['gramm_samen'],
      ['andere_menge'],
      ['geom_point'],
      ['geplant'],
      ['bemerkungen'],
    ],
    // matches the former MST action: no isInsert flag for sammlung
    isInsert: false,
  },
  teilkultur: {
    idField: 'teilkultur_id',
    fields: [
      ['teilkultur_id'],
      ['kultur_id', 'kulturIdInActiveNodeArray'],
      ['name'],
      ['ort1'],
      ['ort2'],
      ['ort3'],
      ['bemerkungen'],
    ],
    noNavigateArg: 'noNavigateInTree',
  },
  teilzaehlung: {
    idField: 'teilzaehlung_id',
    fields: [
      ['teilzaehlung_id'],
      ['zaehlung_id', 'zaehlungIdInActiveNodeArray'],
      ['teilkultur_id', 'teilkulturIdInActiveNodeArray'],
      ['anzahl_pflanzen'],
      ['anzahl_auspflanzbereit'],
      ['anzahl_mutterpflanzen'],
      ['andere_menge'],
      ['auspflanzbereit_beschreibung'],
      ['bemerkungen'],
      ['prognose_von_tz'],
    ],
    navigate: false,
  },
  zaehlung: {
    idField: 'zaehlung_id',
    fields: [
      ['zaehlung_id'],
      ['kultur_id', 'kulturIdInActiveNodeArray'],
      ['datum'],
      ['prognose'],
      ['bemerkungen'],
    ],
  },
}

export const insertRev = async (table, args = {}) => {
  const config = configs[table]
  if (!config) throw new Error(`insertRev: unknown table ${table}`)

  const { idField, fields, extraCollections = [], isInsert = true } = config
  const valuesPassed = args?.values ?? {}
  const email = store.get(userAtom)?.email

  const id = uuidv1()
  const _depth = 1
  const newObject = {}
  for (const [field, idAtomKey, fixedValue] of fields) {
    if (idAtomKey) {
      newObject[field] = store.get(idAtoms[idAtomKey])
    } else {
      newObject[field] =
        field === idField ? id : (fixedValue ?? undefined)
    }
  }
  newObject.changed = new window.Date().toISOString()
  newObject.changed_by = email
  newObject._depth = _depth
  newObject._parent_rev = undefined
  newObject._deleted = false
  Object.assign(newObject, valuesPassed)

  const rev = `${_depth}-${md5(JSON.stringify(newObject))}`
  newObject._rev = rev
  newObject.id = uuidv1()
  const newObjectForStore = { ...newObject }
  newObject._revisions = `{"${rev}"}`
  newObjectForStore._revisions = JSON.stringify([rev])
  // for store: convert rev to winner
  newObjectForStore.id = newObjectForStore[idField]
  delete newObjectForStore[idField]

  addQueuedQuery({
    name: `mutateInsert_${table}_rev_one`,
    variables: JSON.stringify({
      object: newObject,
      on_conflict: {
        constraint: `${table}_rev_pkey`,
        update_columns: ['id'],
      },
    }),
    revertTable: table,
    revertId: id,
    revertField: '_deleted',
    revertValue: true,
    isInsert,
  })

  // optimistically update store
  const db = store.get(dbAtom)
  await db.write(async () => {
    const collection = db.get(table)
    // using batch because can create from raw
    // which enables overriding watermelons own id
    const creates = [collection.prepareCreateFromDirtyRaw(newObjectForStore)]
    for (const extraCollection of extraCollections) {
      creates.push(db.get(extraCollection).prepareCreateFromDirtyRaw({ id }))
    }
    await db.batch(creates)
  })

  const noNavigate =
    config.noNavigateArg ? (args?.[config.noNavigateArg] ?? false) : false
  const shouldNavigate = (config.navigate ?? true) && !noNavigate
  if (shouldNavigate) {
    const activeNodeArray = store.get(activeNodeArrayAtom)
    setTimeout(() => {
      const newActiveNodeArray =
        isUuid.v1(activeNodeArray.at(-1)) ?
          // slice if last is uuid
          [...activeNodeArray.slice(0, -1), id]
        : [...activeNodeArray, id]
      // update tree status
      setActiveNodeArray(newActiveNodeArray)
    })
  }

  return id
}

export const insertArtRev = (args) => insertRev('art', args)
export const insertAvRev = (args) => insertRev('av', args)
export const insertEventRev = (args) => insertRev('event', args)
export const insertGartenRev = (args) => insertRev('garten', args)
export const insertGvRev = (args) => insertRev('gv', args)
export const insertHerkunftRev = (args) => insertRev('herkunft', args)
export const insertKulturRev = (args) => insertRev('kultur', args)
export const insertLieferungRev = (args) => insertRev('lieferung', args)
export const insertPersonRev = (args) => insertRev('person', args)
export const insertSammelLieferungRev = (args) =>
  insertRev('sammel_lieferung', args)
export const insertSammlungRev = (args) => insertRev('sammlung', args)
export const insertTeilkulturRev = (args) => insertRev('teilkultur', args)
export const insertTeilzaehlungRev = (args) => insertRev('teilzaehlung', args)
export const insertZaehlungRev = (args) => insertRev('zaehlung', args)
