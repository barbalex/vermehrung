import { Q } from '@nozbe/watermelondb'
import type { Model } from '@nozbe/watermelondb'
import { isEqual } from 'es-toolkit'

import {
  store,
  dbAtom,
  setInitiallyQueried,
  setLastUpdated,
  setInitiallyQuerying,
  type TableName,
} from '../store/index.ts'
import { parseComplexFieldsForWm } from './parseComplexFieldsForWm.ts'
import { isUnflushedRev } from '../modules/revAggregation.ts'
import type { Row } from './apiTypes.ts'

const stripTypename = (object: Row): Row => {
  const { __typename, ...rest } = object
  return rest
}

// TODO: do this in worker?
export const processSubscriptionResult = async ({
  data: dataToCheck,
  table,
  lastUpdatedValue,
}: {
  data: Row[]
  table: TableName
  lastUpdatedValue?: number
}) => {
  const db = store.get(dbAtom)
  if (!db) return
  if (!dataToCheck.length) {
    setInitiallyQueried({ table })
    setLastUpdated({ table, val: lastUpdatedValue })
    return
  }
  setInitiallyQuerying(table)

  const collection = db.get(table)
  const incomingIds = dataToCheck.map((d) => d.id)

  let objectsOfToUpdate: Model[] = []
  try {
    objectsOfToUpdate = await db
      .get(table)
      .query(Q.where('id', Q.oneOf(incomingIds)))
      .fetch()
  } catch {}
  let objectsOfIncoming: Model[] = []
  try {
    objectsOfIncoming = await db
      .get(table)
      .query(Q.where('id', Q.oneOf(incomingIds)))
      .fetch()
  } catch {}
  const existingIds = objectsOfIncoming.map((d) => d.id)
  const missingIds = incomingIds.filter((d) => !existingIds.includes(d))
  const dataToCreateObjectsFrom = dataToCheck.filter((d) =>
    missingIds.includes(d.id),
  )
  // only if remote changed after local
  const objectsToUpdate = objectsOfToUpdate.filter((o) => {
    // never overwrite rows with unflushed local edits: their revision
    // has not reached the server yet, so the sync data is stale for
    // them. the flush + the following sync reconcile the row
    if (isUnflushedRev(table, o.id)) return false
    const dat = stripTypename(
      dataToCheck.find((d) => d.id === o.id) ?? { id: '' },
    )
    return !Object.entries(dat).every(([key, value]) =>
      isEqual(value, (o as unknown as Record<string, unknown>)[key]),
    )
  })
  console.log('processSubscriptionResult:', {
    table,
    toUpdate: objectsToUpdate.length,
    toCreate: missingIds.length,
  })

  // use a timeout to stagger the imports
  // reason: indexedDB creates indexes right after a table was imported
  // need to stagger imports to keep ui responsive between them
  setTimeout(async () => {
    try {
      await db.write(async () => {
        if (objectsToUpdate.length || dataToCreateObjectsFrom.length) {
          // single array, not a spread: the initial sync imports > 10k
          // rows per table and a spread would blow the call stack
          await db.batch([
            ...objectsToUpdate.map((object) => {
              const thisObjectsData = (dataToCheck.find(
                (d) => d.id === object.id,
              ) ?? {}) as Record<string, unknown>

              return object.prepareUpdate((ob: Model) => {
                Object.keys(thisObjectsData)
                  .filter((key) => !['id', '__typename'].includes(key))
                  .forEach((key) => {
                    const obRecord = ob as unknown as Record<string, unknown>
                    if (!isEqual(obRecord[key], thisObjectsData[key])) {
                      obRecord[key] = thisObjectsData[key]
                    }
                  })
              })
            }),
            // prepareCreateFromDirtyRaw replaces watermelon's id with vermehrung's
            ...dataToCreateObjectsFrom.map((d) =>
              collection.prepareCreateFromDirtyRaw(
                parseComplexFieldsForWm(d as Record<string, unknown>),
              ),
            ),
          ])
          setInitiallyQueried({ table })
        }
        setInitiallyQueried({ table })
      })
    } catch (error) {
      console.log('Error in processSubscriptionResult > db.action:', error)
      setInitiallyQueried({ table })
    }
  })
  setLastUpdated({ table, val: lastUpdatedValue })
}
