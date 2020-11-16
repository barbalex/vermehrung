/* eslint-disable no-unused-vars */
import { ZAEHLUNG_FRAGMENT } from './mstFragments'
import { sanitizedRaw } from '@nozbe/watermelondb/RawRecord'
import { Q } from '@nozbe/watermelondb'
//import isEqual from 'lodash/isEqual'

import { ae_artModelPrimitives } from '../models/ae_artModel.base'
import { herkunftModelPrimitives } from '../models/HerkunftModel.base'
import { sammlungModelPrimitives } from '../models/sammlungModel.base'

const stripTypename = (object) => {
  const { __typename, ...rest } = object
  return rest
}
const parseComplexFields = (object) =>
  stripTypename({
    ...object,
    geom_point: JSON.stringify(object.geom_point),
    _conflicts: JSON.stringify(object._conflicts),
    _revisions: JSON.stringify(object._revisions),
  })

const onData = async ({ data, table, db }) => {
  const collection = db.collections.get(table)

  const incomingIds = data.map((d) => d.id)
  const incomingIdsDeleted = data.filter((d) => d._deleted).map((d) => d.id)
  //const incomingIdsNotDeleted = data.filter((d) => !d._deleted).map((d) => d.id)

  db.action(async () => {
    const objectsToUpdate = await db.collections
      .get(table)
      .query(Q.where('id', Q.oneOf(incomingIds)))
    /*const objectsToUndelete = await db.collections
      .get(table)
      .query(
        Q.and(
          Q.where('id', Q.oneOf(incomingIdsNotDeleted)),
          Q.where('deleted', true),
        ),
      )*/
    const objectsToDelete = await db.collections
      .get(table)
      .query(
        Q.and(
          Q.where('id', Q.oneOf(incomingIdsDeleted)),
          Q.where('deleted', false),
        ),
      )
    const existingIds = objectsToUpdate.map((d) => d.id)
    const missingIds = incomingIds.filter((d) => !existingIds.includes(d))
    const dataToCreateObjectsFrom = data.filter((d) =>
      missingIds.includes(d.id),
    )
    console.log('subscribe, onData:', {
      data: data.length,
      table,
      toUpdate: objectsToUpdate.length,
      toDelete: objectsToDelete.length,
      toCreate: missingIds.length,
    })
    await db.batch(
      ...objectsToUpdate.map((object) => {
        object.id === 'ff78614e-b554-11ea-b3de-0242ac130004' &&
          console.log({
            object,
            data,
          })
        const thisObjectsData = stripTypename(
          data.find((d) => d.id === object.id),
        )
        return object.prepareUpdate(() => thisObjectsData)
      }),
      ...dataToCreateObjectsFrom.map((d) =>
        collection.prepareCreateFromDirtyRaw(parseComplexFields(d)),
      ),
    )
    // now run deletes
    // not possible earlier for newly created
    // dont know how to undelete objectsToUndelete
    // see: https://github.com/Nozbe/WatermelonDB/issues/864
    await db.batch(
      ...objectsToDelete.map((object) => object.prepareMarkAsDeleted()),
    )
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
