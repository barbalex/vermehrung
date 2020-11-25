import { Q } from '@nozbe/watermelondb'
import isEqual from 'lodash/isEqual'

const stripTypename = (object) => {
  // eslint-disable-next-line no-unused-vars
  const { __typename, ...rest } = object
  return rest
}
const parseComplexFields = (object) =>
  stripTypename({
    ...object,
    ...(object.geom_point
      ? { geom_point: JSON.stringify(object.geom_point) }
      : {}),
    _conflicts: JSON.stringify(object._conflicts),
    _revisions: JSON.stringify(object._revisions),
  })

const updateWmFromData = async ({ data: dataPassed, table, store }) => {
  const {
    db,
    initialDataQueried,
    setInitialDataQueried,
    setLastUpdated,
  } = store
  const lastUpdatedAt = store[`lastUpdated_${table}`]
  const dataToCheck = dataPassed.filter((d) => d._rev_at > lastUpdatedAt)
  const collection = db.collections.get(table)

  const incomingIds = dataToCheck.map((d) => d.id)

  // TODO: filter by lastUpdatedAt
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
    console.log('updateWmFromData:', {
      dataToCheck: dataToCheck.length,
      dataPassed: dataPassed.length,
      /*herkunftRevAt: dataPassed?.find(
        (d) => d.id === 'ff78614e-b554-11ea-b3de-0242ac130004',
      )?._rev_at,*/
      table,
      toUpdate: objectsToUpdate.length,
      toCreate: missingIds.length,
      //objectsToUpdate,
      //objectsOfToUpdate,
      objectsOfToUpdateLength: objectsOfToUpdate.length,
      //lastUpdatedAt,
    })
    if (objectsToUpdate.length || dataToCreateObjectsFrom.length) {
      await db.batch(
        ...objectsToUpdate.map((object) => {
          const thisObjectsData = dataToCheck.find((d) => d.id === object.id)

          return object.prepareUpdate((ob) => {
            Object.keys(thisObjectsData)
              .filter((key) => !['id', '__typename'].includes(key))
              .forEach((key) => {
                if (!isEqual(ob[key], thisObjectsData[key])) {
                  ob[key] = thisObjectsData[key]
                }
              })
          })
        }),
        // prepareCreateFromDirtyRaw replaces watermelon's id with vermehrung's
        ...dataToCreateObjectsFrom.map((d) =>
          collection.prepareCreateFromDirtyRaw(parseComplexFields(d)),
        ),
      )
    }
  })
  !initialDataQueried && setInitialDataQueried(true)
  setLastUpdated({ table })
}

export default updateWmFromData
