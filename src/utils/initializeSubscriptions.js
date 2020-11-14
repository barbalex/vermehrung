import { ZAEHLUNG_FRAGMENT } from './mstFragments'
import { sanitizedRaw } from '@nozbe/watermelondb/RawRecord'

import {
  herkunftModelPrimitives,
  //herkunftModelSelector,
} from '../models/HerkunftModel.base'

const initializeSubscriptions = ({ store, db }) => {
  const unsubscribe = {}
  unsubscribe.ae_art = store.subscribeAe_art()
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
    (data) => {
      console.log('subscribeHerkunft, onData:', { data, db })
      const collection = db.collections.get('herkunft')
      data.forEach(async (d, index) => {
        let record
        try {
          record = await collection.find(d.id)
        } catch (error) {
          record = undefined
        }
        index === 1 && console.log('subscribeHerkunft', { d, record })
        if (record) {
          //TODO: update
          db.action(async () => {
            await record.update((rc) => ({ ...rc, ...d }))
            d._deleted && record.markAsDeleted()
          })
        } else {
          //TODO: create
          db.action(async () => {
            await collection.create((record) => {
              record._raw = sanitizedRaw(d, collection.schema)
            })
            if (d._deleted) {
              record = await collection.find(d.id)
              record.markAsDeleted()
            }
          })
        }
      })
    },
    (d) => {
      console.log('subscribeHerkunft, onError:', d)
    },
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
  unsubscribe.sammlung = store.subscribeSammlung()
  unsubscribe.sammlung_file = store.subscribeSammlung_file()
  unsubscribe.teilkultur = store.subscribeTeilkultur()
  unsubscribe.teilzaehlung = store.subscribeTeilzaehlung()
  unsubscribe.user_role = store.subscribeUser_role()
  unsubscribe.zaehlung = store.subscribeZaehlung(undefined, ZAEHLUNG_FRAGMENT)
  return unsubscribe
}

export default initializeSubscriptions
