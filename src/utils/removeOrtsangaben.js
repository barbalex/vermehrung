import { Q } from '@nozbe/watermelondb'

const removeOrtsangaben = async ({ db }) => {
  // need to remove some data for gaertner in case they had synced them earlier
  // TODO: remove: lokalname, geom_point, lv95_x, lv95_y, wgs84_lat, wgs84_long
  let herkunftsWithOrtsangaben = []
  try {
    herkunftsWithOrtsangaben = await db
      .get('herkunft')
      .query(
        Q.or(
          Q.where('lokalname', Q.notEq(null)),
          Q.where('geom_point', Q.notEq(null)),
        ),
      )
      .fetch()
  } catch (error) {
    console.log('error getting herkunftsWithOrtsangaben:', error)
    console.log('thus ortsangaben not removed:')
    return
  }
  if (!herkunftsWithOrtsangaben.length) return

  console.log('removing ortsangaben')

  try {
    await db.write(async () => {
      await db.batch(
        ...herkunftsWithOrtsangaben.map((object) =>
          object.prepareUpdate((ob) => {
            ob.lokalname = null
            ob.geom_point = null
            ob.lv95_x = null
            ob.lv95_y = null
            ob.wgs84_lat = null
            ob.wgs84_long = null
          }),
        ),
      )
    })
  } catch (error) {
    console.log('Error removing ortsangaben:', error)
  }
}

export default removeOrtsangaben
