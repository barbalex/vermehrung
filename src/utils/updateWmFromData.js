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

const updateWm = async ({ data, table, db }) => {
  console.log('updateWmFromData:', {
    data,
    table,
    db,
  })
  const collection = db.collections.get(table)

  const incomingIds = data.map((d) => d.id)

  await db.action(async () => {
    const objectsOfIncoming = await db.collections
      .get(table)
      .query(Q.where('id', Q.oneOf(incomingIds)))
      .fetch()
    const existingIds = objectsOfIncoming.map((d) => d.id)
    const missingIds = incomingIds.filter((d) => !existingIds.includes(d))
    const dataToCreateObjectsFrom = data.filter((d) =>
      missingIds.includes(d.id),
    )
    // only if remote changed after local
    const objectsToUpdate = objectsOfIncoming.filter((o) => {
      const dat = stripTypename(data.find((d) => d.id === o.id))
      //if (!dat?.changed) return true
      //return o.changed < dat.changed
      return !Object.entries(dat).every(([key, value]) =>
        isEqual(value, o[key]),
      )
    })
    console.log('updateWmFromData:', {
      data: data.length,
      table,
      toUpdate: objectsToUpdate.length,
      toCreate: missingIds.length,
      objectsToUpdate,
    })
    if (objectsToUpdate.length || dataToCreateObjectsFrom.length) {
      await db.batch(
        ...objectsToUpdate.map((object) => {
          const thisObjectsData = data.find((d) => d.id === object.id)

          return object.prepareUpdate((ob) => {
            Object.keys(thisObjectsData)
              .filter((key) => !['id', '__typename'].includes(key))
              .forEach((key) => {
                if (ob[key] !== thisObjectsData[key]) {
                  ob[key] = thisObjectsData[key]
                }
              })
          })
        }),
        ...dataToCreateObjectsFrom.map((d) =>
          collection.prepareCreateFromDirtyRaw(parseComplexFields(d)),
        ),
      )
    }
  })
}

export default updateWm