import { ae_artModelPrimitives } from '../models/ae_artModel.base'
import { artModelPrimitives } from '../models/artModel.base'
import { gartenModelPrimitives } from '../models/gartenModel.base'
import { herkunftModelPrimitives } from '../models/herkunftModel.base'
import { kulturModelPrimitives } from '../models/kulturModel.base'
import { lieferungModelPrimitives } from '../models/lieferungModel.base'
import { sammlungModelPrimitives } from '../models/sammlungModel.base'
import { teilkulturModelPrimitives } from '../models/teilkulturModel.base'
import { teilzaehlungModelPrimitives } from '../models/teilzaehlungModel.base'
import { zaehlungModelPrimitives } from '../models/zaehlungModel.base'

import updateWmFromData from './updateWmFromData'

const onError = ({ error }) => {
  console.log('subscribeHerkunft, onError:', error)
}

const initializeSubscriptions = ({ store }) => {
  const unsubscribe = {}
  unsubscribe.ae_art = store.subscribeAe_art(
    undefined,
    ae_artModelPrimitives.toString(),
    (data) => {
      updateWmFromData({ data, table: 'ae_art', db: store.db })
    },
    (error) => onError({ error }),
  )
  unsubscribe.art = store.subscribeArt(
    undefined,
    artModelPrimitives.toString(),
    (data) => {
      updateWmFromData({ data, table: 'art', db: store.db })
    },
    (error) => onError({ error }),
  )
  unsubscribe.art_file = store.subscribeArt_file()
  unsubscribe.art_qk = store.subscribeArt_qk()
  unsubscribe.art_qk_choosen = store.subscribeArt_qk_choosen()
  unsubscribe.av = store.subscribeAv()
  unsubscribe.event = store.subscribeEvent()
  unsubscribe.garten = store.subscribeGarten(
    undefined,
    gartenModelPrimitives.toString(),
    (data) => {
      updateWmFromData({ data, table: 'garten', db: store.db })
    },
    (error) => onError({ error }),
  )
  unsubscribe.garten_file = store.subscribeGarten_file()
  unsubscribe.gv = store.subscribeGv()
  unsubscribe.herkunft = store.subscribeHerkunft(
    undefined,
    herkunftModelPrimitives.toString(),
    (data) => {
      updateWmFromData({ data, table: 'herkunft', db: store.db })
    },
    (error) => onError({ error }),
  )
  unsubscribe.herkunft_file = store.subscribeHerkunft_file()
  unsubscribe.kultur = store.subscribeKultur(
    undefined,
    kulturModelPrimitives.toString(),
    (data) => {
      updateWmFromData({ data, table: 'kultur', db: store.db })
    },
    (error) => onError({ error }),
  )
  unsubscribe.kultur_file = store.subscribeKultur_file()
  unsubscribe.kultur_option = store.subscribeKultur_option()
  unsubscribe.kultur_qk = store.subscribeKultur_qk()
  unsubscribe.kultur_qk_choosen = store.subscribeKultur_qk_choosen()
  unsubscribe.lieferung = store.subscribeLieferung(
    undefined,
    lieferungModelPrimitives.toString(),
    (data) => {
      updateWmFromData({ data, table: 'lieferung', db: store.db })
    },
    (error) => onError({ error }),
  )
  unsubscribe.lieferung_file = store.subscribeLieferung_file()
  unsubscribe.person = store.subscribePerson()
  unsubscribe.person_file = store.subscribePerson_file()
  unsubscribe.person_option = store.subscribePerson_option()
  unsubscribe.sammel_lieferung = store.subscribeSammel_lieferung()
  unsubscribe.sammlung = store.subscribeSammlung(
    undefined,
    sammlungModelPrimitives.toString(),
    (data) => {
      updateWmFromData({ data, table: 'sammlung', db: store.db })
    },
    (error) => onError({ error }),
  )
  unsubscribe.sammlung_file = store.subscribeSammlung_file()
  unsubscribe.teilkultur = store.subscribeTeilkultur(
    undefined,
    teilkulturModelPrimitives.toString(),
    (data) => {
      updateWmFromData({ data, table: 'teilkultur', db: store.db })
    },
    (error) => onError({ error }),
  )
  unsubscribe.teilzaehlung = store.subscribeTeilzaehlung(
    undefined,
    teilzaehlungModelPrimitives.toString(),
    (data) => {
      updateWmFromData({ data, table: 'teilzaehlung', db: store.db })
    },
    (error) => onError({ error }),
  )
  unsubscribe.user_role = store.subscribeUser_role()
  unsubscribe.zaehlung = store.subscribeZaehlung(
    undefined,
    zaehlungModelPrimitives.toString(),
    (data) => {
      updateWmFromData({ data, table: 'zaehlung', db: store.db })
    },
    (error) => onError({ error }),
  )
  return unsubscribe
}

export default initializeSubscriptions
