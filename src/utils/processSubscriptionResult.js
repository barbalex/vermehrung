import { Q } from '@nozbe/watermelondb'
import isEqual from 'lodash/isEqual'

import parseComplexFieldsForWm from './parseComplexFieldsForWm'

const stripTypename = (object) => {
  // eslint-disable-next-line no-unused-vars
  const { __typename, ...rest } = object
  return rest
}

// TODO: do this in worker?
const processSubscriptionResult = async ({
  data: dataToCheck,
  table,
  store,
}) => {
  const {
    db,
    setInitiallyQueried,
    setLastUpdated,
    setInitiallyQuerying,
  } = store
  if (!dataToCheck.length) {
    setInitiallyQueried({ table })
    return
  }
  setInitiallyQuerying(table)

  const collection = db.collections.get(table)
  const incomingIds = dataToCheck.map((d) => d.id)

  try {
    await db.action(async () => {
      const objectsOfToUpdate = await db.collections
        .get(table)
        .query(Q.where('id', Q.oneOf(incomingIds)))
        .fetch()
      const objectsOfIncoming = await db.collections
        .get(table)
        .query(Q.where('id', Q.oneOf(incomingIds)))
        .fetch()
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
      console.log('processSubscriptionResult:', {
        dataToCheck: dataToCheck.length,
        table,
        toUpdate: objectsToUpdate.length,
        toCreate: missingIds.length,
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
      setInitiallyQueried({ table })
    })
  } catch (error) {
    console.log('Error in processSubscriptionResult > db.action:', error)
  }
}

export default processSubscriptionResult