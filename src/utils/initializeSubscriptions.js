import { ZAEHLUNG_FRAGMENT } from './mstFragments'
import { Q } from '@nozbe/watermelondb'

import { ae_artModelPrimitives } from '../models/ae_artModel.base'
import { herkunftModelPrimitives } from '../models/herkunftModel.base'
import { lieferungModelPrimitives } from '../models/lieferungModel.base'
import { sammlungModelPrimitives } from '../models/sammlungModel.base'

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

const onData = async ({ data, table, db }) => {
  const collection = db.collections.get(table)

  const incomingIds = data.map((d) => d.id)

  db.action(async () => {
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
      const dat = data.find((d) => d.id === o.id)
      if (!dat?.changed) return true
      return o.changed < dat.changed
    })
    console.log('subscribe, onData:', {
      data: data.length,
      table,
      toUpdate: objectsToUpdate.length,
      toCreate: missingIds.length,
    })
    if (objectsToUpdate.length || dataToCreateObjectsFrom.length) {
      await db.batch(
        ...objectsToUpdate.map((object) => {
          const thisObjectsData = data.find((d) => d.id === object.id)
          /*object.id === 'ff78614e-b554-11ea-b3de-0242ac130004' &&
            console.log('initializeSubscriptions, preparing update', {
              object,
              thisObjectsData,
            })*/

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

const onError = ({ error }) => {
  console.log('subscribeHerkunft, onError:', error)
}

const initializeSubscriptions = ({ store, db }) => {
  const unsubscribe = {}
  unsubscribe.ae_art = store.subscribeAe_art(
    undefined,
    ae_artModelPrimitives.toString(),
    async (data) => onData({ data, table: 'ae_art', db }),
    (error) => onError({ error }),
  )
  unsubscribe.art = store.subscribeArt()
  unsubscribe.art_file = store.subscribeArt_file()
  unsubscribe.art_qk = store.subscribeArt_qk()
  unsubscribe.art_qk_choosen = store.subscribeArt_qk_choosen()
  unsubscribe.av = store.subscribeAv()
  unsubscribe.event = store.subscribeEvent()
  unsubscribe.garten = store.subscribeGarten()
  unsubscribe.garten_file = store.subscribeGarten_file()
  unsubscribe.gv = store.subscribeGv()
  unsubscribe.herkunft = store.subscribeHerkunft(
    undefined,
    herkunftModelPrimitives.toString(),
    async (data) => onData({ data, table: 'herkunft', db }),
    (error) => onError({ error }),
  )
  unsubscribe.herkunft_file = store.subscribeHerkunft_file()
  unsubscribe.kultur = store.subscribeKultur()
  unsubscribe.kultur_file = store.subscribeKultur_file()
  unsubscribe.kultur_option = store.subscribeKultur_option()
  unsubscribe.kultur_qk = store.subscribeKultur_qk()
  unsubscribe.kultur_qk_choosen = store.subscribeKultur_qk_choosen()
  unsubscribe.lieferung = store.subscribeLieferung()
  /*(
    undefined,
    lieferungModelPrimitives.toString(),
    async (data) => onData({ data, table: 'lieferung', db }),
    (error) => onError({ error }),
  )*/
  unsubscribe.lieferung_file = store.subscribeLieferung_file()
  unsubscribe.person = store.subscribePerson()
  unsubscribe.person_file = store.subscribePerson_file()
  unsubscribe.person_option = store.subscribePerson_option()
  unsubscribe.sammel_lieferung = store.subscribeSammel_lieferung()
  unsubscribe.sammlung = store.subscribeSammlung(
    undefined,
    sammlungModelPrimitives.toString(),
    async (data) => onData({ data, table: 'sammlung', db }),
    (error) => onError({ error }),
  )
  unsubscribe.sammlung_file = store.subscribeSammlung_file()
  unsubscribe.teilkultur = store.subscribeTeilkultur()
  unsubscribe.teilzaehlung = store.subscribeTeilzaehlung()
  unsubscribe.user_role = store.subscribeUser_role()
  unsubscribe.zaehlung = store.subscribeZaehlung(undefined, ZAEHLUNG_FRAGMENT)
  return unsubscribe
}

export default initializeSubscriptions
