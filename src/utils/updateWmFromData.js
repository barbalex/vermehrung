import { Q } from '@nozbe/watermelondb'
import isEqual from 'lodash/isEqual'

import parseComplexFieldsForWm from './parseComplexFieldsForWm'

const stripTypename = (object) => {
  // eslint-disable-next-line no-unused-vars
  const { __typename, ...rest } = object
  return rest
}

// TODO: do this in worker?
const updateWmFromData = async ({ data: dataToCheck, table, store }) => {
  const {
    db,
    initialDataQueried,
    setInitialDataQueried,
    setLastUpdated,
  } = store
  /*console.log('updateWmFromData:', {
    dataToCheck: dataToCheck.length,
    table,
    lastUpdatedAt: store[`lastUpdated_${table}`],
  })*/
  if (!dataToCheck.length) return

  const collection = db.collections.get(table)
  const incomingIds = dataToCheck.map((d) => d.id)

  try {
    await db.action(async () => {
      console.log('updateWmFromData 1', {
        dataToCheck,
        table,
        store,
        incomingIds,
        collections: db.collections,
      })
      const objectsOfToUpdate = await db.collections
        .get(table)
        .query(Q.where('id', Q.oneOf(incomingIds)))
        .fetch()
      console.log('updateWmFromData 2')
      const objectsOfIncoming = await db.collections
        .get(table)
        .query(Q.where('id', Q.oneOf(incomingIds)))
        .fetch()
      console.log('updateWmFromData 3')
      const existingIds = objectsOfIncoming.map((d) => d.id)
      const missingIds = incomingIds.filter((d) => !existingIds.includes(d))
      const dataToCreateObjectsFrom = dataToCheck.filter((d) =>
        missingIds.includes(d.id),
      )
      // only if remote changed after local
      const objectsToUpdate = objectsOfToUpdate.filter((o) => {
        const dat = stripTypename(dataToCheck.find((d) => d.id === o.id))
        //if (!dat?.changed) return true
        //return o.changed < dat.changed
        return !Object.entries(dat).every(([key, value]) =>
          isEqual(value, o[key]),
        )
      })
      console.log('updateWmFromData:', {
        dataToCheck: dataToCheck.length,
        /*herkunftRevAt: dataToCheck?.find(
          (d) => d.id === 'ff78614e-b554-11ea-b3de-0242ac130004',
        )?._rev_at,*/
        table,
        toUpdate: objectsToUpdate.length,
        toCreate: missingIds.length,
        objectsOfToUpdateLength: objectsOfToUpdate.length,
      })
      if (objectsToUpdate.length || dataToCreateObjectsFrom.length) {
        await db.batch(
          ...objectsToUpdate.map((object) => {
            const thisObjectsData = dataToCheck.find((d) => d.id === object.id)

            return object.prepareUpdate((ob) => {
              Object.keys(thisObjectsData)
                .filter((key) => !['id', '__typename', '_rev_at'].includes(key))
                .forEach((key) => {
                  if (!isEqual(ob[key], thisObjectsData[key])) {
                    ob[key] = thisObjectsData[key]
                  }
                })
            })
          }),
          // prepareCreateFromDirtyRaw replaces watermelon's id with vermehrung's
          ...dataToCreateObjectsFrom.map((d) =>
            collection.prepareCreateFromDirtyRaw(parseComplexFieldsForWm(d)),
          ),
        )
      }
      setLastUpdated({ table })
    })
  } catch (error) {
    console.log('Error in updateWmFromData > db.action:', error)
  }
  !initialDataQueried && setInitialDataQueried(true)
}

export default updateWmFromData
