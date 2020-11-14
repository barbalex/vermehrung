import { ZAEHLUNG_FRAGMENT } from './mstFragments'
import { sanitizedRaw } from '@nozbe/watermelondb/RawRecord'
import { getSnapshot } from 'mobx-state-tree'
import isEqual from 'lodash/isEqual'

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
    async (data) => {
      console.log('subscribeHerkunft, onData:', { data, db })
      const collection = db.collections.get('herkunft')

      const preparedCreations = []
      const preparedUpdates = []
      const idsToMarkAsDeleted = []
      const recordsToMarkAsDeleted = []

      for (const dRaw of data) {
        // eslint-disable-next-line no-unused-vars
        const { __typename, ...d } = getSnapshot(dRaw)
        let record
        try {
          record = await collection.find(d.id)
        } catch (error) {
          record = undefined
        }
        if (record && !isEqual(record, d)) {
          d._deleted && recordsToMarkAsDeleted.push(record)
          preparedUpdates.push({ record, d })
        } else {
          preparedCreations.push(d)
          d._deleted && idsToMarkAsDeleted.push(d.id)
        }
      }
      await db.action(async () => {
        const preparedCreationOperations = preparedCreations.map((d) => {
          collection.prepareCreate((record) => {
            record._raw = sanitizedRaw(d, collection.schema)
          })
        })
        /*const preparredUpdateOperations = preparedUpdates.map(({ record, d }) =>
          record.prepareUpdate({ ...record, ...d }),
        )*/
        await db.batch([
          ...preparedCreationOperations,
          //...preparredUpdateOperations,
        ])
      })
      if (idsToMarkAsDeleted.length) {
        for (const id of idsToMarkAsDeleted) {
          const record = await collection.find(id)
          recordsToMarkAsDeleted.push(record)
        }
        db.action(async () => {
          const preparedOperations = recordsToMarkAsDeleted.map((record) =>
            record.prepareMarkAsDeleted(),
          )
          await db.batch(preparedOperations)
        })
      }
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
