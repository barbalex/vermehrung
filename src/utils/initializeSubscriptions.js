import { ae_artModelPrimitives } from '../models/ae_artModel.base'
import { artModelPrimitives } from '../models/artModel.base'
import { art_fileModelPrimitives } from '../models/art_fileModel.base'
import { art_qkModelPrimitives } from '../models/art_qkModel.base'
import { art_qk_choosenModelPrimitives } from '../models/art_qk_choosenModel.base'
import { avModelPrimitives } from '../models/avModel.base'
import { eventModelPrimitives } from '../models/eventModel.base'
import { gartenModelPrimitives } from '../models/gartenModel.base'
import { garten_fileModelPrimitives } from '../models/garten_fileModel.base'
import { gvModelPrimitives } from '../models/gvModel.base'
import { herkunftModelPrimitives } from '../models/herkunftModel.base'
import { herkunft_fileModelPrimitives } from '../models/herkunft_fileModel.base'
import { kulturModelPrimitives } from '../models/kulturModel.base'
import { kultur_fileModelPrimitives } from '../models/kultur_fileModel.base'
import { kultur_optionModelPrimitives } from '../models/kultur_optionModel.base'
import { lieferungModelPrimitives } from '../models/lieferungModel.base'
import { lieferung_fileModelPrimitives } from '../models/lieferung_fileModel.base'
import { personModelPrimitives } from '../models/personModel.base'
import { person_fileModelPrimitives } from '../models/person_fileModel.base'
import { sammel_lieferungModelPrimitives } from '../models/sammel_lieferungModel.base'
import { sammlungModelPrimitives } from '../models/sammlungModel.base'
import { sammlung_fileModelPrimitives } from '../models/sammlung_fileModel.base'
import { teilkulturModelPrimitives } from '../models/teilkulturModel.base'
import { teilzaehlungModelPrimitives } from '../models/teilzaehlungModel.base'
import { zaehlungModelPrimitives } from '../models/zaehlungModel.base'

import updateWmFromData from './updateWmFromData'

const onError = ({ error }) => {
  console.log('subscribeHerkunft, onError:', error)
}

const initializeSubscriptions = ({ store }) => {
  const {
    lastUpdated_ae_art,
    subscribeAe_art,
    lastUpdated_art,
    lastUpdated_art_file,
    subscribeArt_file,
    lastUpdated_art_qk,
    subscribeArt_qk,
    lastUpdated_art_qk_choosen,
    subscribeArt_qk_choosen,
    subscribeAv,
    lastUpdated_av,
    subscribeArt,
    lastUpdated_event,
    subscribeEvent,
    lastUpdated_garten,
    subscribeGarten,
    lastUpdated_garten_file,
    subscribeGarten_file,
    subscribeGv,
    lastUpdated_gv,
    lastUpdated_herkunft,
    subscribeHerkunft,
    lastUpdated_herkunft_file,
    subscribeHerkunft_file,
    lastUpdated_kultur,
    subscribeKultur,
    lastUpdated_kultur_file,
    subscribeKultur_file,
    lastUpdated_kultur_option,
    subscribeKultur_option,
    lastUpdated_lieferung,
    subscribeLieferung,
    lastUpdated_lieferung_file,
    subscribeLieferung_file,
    lastUpdated_person,
    subscribePerson,
    lastUpdated_person_file,
    subscribePerson_file,
    lastUpdated_sammel_lieferung,
    subscribeSammel_lieferung,
    lastUpdated_sammlung,
    subscribeSammlung,
    lastUpdated_sammlung_file,
    subscribeSammlung_file,
    lastUpdated_teilkultur,
    subscribeTeilkultur,
    lastUpdated_teilzaehlung,
    subscribeTeilzaehlung,
    lastUpdated_zaehlung,
    subscribeZaehlung,
  } = store
  const unsubscribe = {}
  unsubscribe.ae_art = subscribeAe_art(
    { where: { _rev_at: { _gt: lastUpdated_ae_art } } },
    ae_artModelPrimitives.toString(),
    (data) => updateWmFromData({ data, table: 'ae_art', store }),
    (error) => onError({ error }),
  )
  unsubscribe.art = subscribeArt(
    { where: { _rev_at: { _gt: lastUpdated_art } } },
    artModelPrimitives.toString(),
    (data) => updateWmFromData({ data, table: 'art', store }),
    (error) => onError({ error }),
  )
  unsubscribe.art_file = subscribeArt_file(
    { where: { _rev_at: { _gt: lastUpdated_art_file } } },
    art_fileModelPrimitives.toString(),
    (data) => updateWmFromData({ data, table: 'art_file', store }),
    (error) => onError({ error }),
  )
  unsubscribe.art_qk = subscribeArt_qk(
    { where: { _rev_at: { _gt: lastUpdated_art_qk } } },
    art_qkModelPrimitives.toString(),
    (data) => updateWmFromData({ data, table: 'art_qk', store }),
    (error) => onError({ error }),
  )
  unsubscribe.art_qk_choosen = subscribeArt_qk_choosen(
    { where: { _rev_at: { _gt: lastUpdated_art_qk_choosen } } },
    art_qk_choosenModelPrimitives.toString(),
    (data) => updateWmFromData({ data, table: 'art_qk_choosen', store }),
    (error) => onError({ error }),
  )
  unsubscribe.av = subscribeAv(
    { where: { _rev_at: { _gt: lastUpdated_av } } },
    avModelPrimitives.toString(),
    (data) => updateWmFromData({ data, table: 'av', store }),
    (error) => onError({ error }),
  )
  unsubscribe.event = subscribeEvent(
    { where: { _rev_at: { _gt: lastUpdated_event } } },
    eventModelPrimitives.toString(),
    (data) => updateWmFromData({ data, table: 'event', store }),
    (error) => onError({ error }),
  )
  unsubscribe.garten = subscribeGarten(
    { where: { _rev_at: { _gt: lastUpdated_garten } } },
    gartenModelPrimitives.toString(),
    (data) => updateWmFromData({ data, table: 'garten', store }),
    (error) => onError({ error }),
  )
  unsubscribe.garten_file = subscribeGarten_file(
    { where: { _rev_at: { _gt: lastUpdated_garten_file } } },
    garten_fileModelPrimitives.toString(),
    (data) => updateWmFromData({ data, table: 'garten_file', store }),
    (error) => onError({ error }),
  )
  unsubscribe.gv = subscribeGv(
    { where: { _rev_at: { _gt: lastUpdated_gv } } },
    gvModelPrimitives.toString(),
    (data) => updateWmFromData({ data, table: 'gv', store }),
    (error) => onError({ error }),
  )
  unsubscribe.herkunft = subscribeHerkunft(
    { where: { _rev_at: { _gt: lastUpdated_herkunft } } },
    herkunftModelPrimitives.toString(),
    (data) => updateWmFromData({ data, table: 'herkunft', store }),
    (error) => onError({ error }),
  )
  unsubscribe.herkunft_file = subscribeHerkunft_file(
    { where: { _rev_at: { _gt: lastUpdated_herkunft_file } } },
    herkunft_fileModelPrimitives.toString(),
    (data) => updateWmFromData({ data, table: 'herkunft_file', store }),
    (error) => onError({ error }),
  )
  unsubscribe.kultur = subscribeKultur(
    { where: { _rev_at: { _gt: lastUpdated_kultur } } },
    kulturModelPrimitives.toString(),
    (data) => updateWmFromData({ data, table: 'kultur', store }),
    (error) => onError({ error }),
  )
  unsubscribe.kultur_file = subscribeKultur_file(
    { where: { _rev_at: { _gt: lastUpdated_kultur_file } } },
    kultur_fileModelPrimitives.toString(),
    (data) => updateWmFromData({ data, table: 'kultur_file', store }),
    (error) => onError({ error }),
  )
  unsubscribe.kultur_option = subscribeKultur_option(
    { where: { _rev_at: { _gt: lastUpdated_kultur_option } } },
    kultur_optionModelPrimitives.toString(),
    (data) => updateWmFromData({ data, table: 'kultur_option', store }),
    (error) => onError({ error }),
  )
  unsubscribe.kultur_qk = store.subscribeKultur_qk()
  unsubscribe.kultur_qk_choosen = store.subscribeKultur_qk_choosen()
  unsubscribe.lieferung = subscribeLieferung(
    { where: { _rev_at: { _gt: lastUpdated_lieferung } } },
    lieferungModelPrimitives.toString(),
    (data) => updateWmFromData({ data, table: 'lieferung', store }),
    (error) => onError({ error }),
  )
  unsubscribe.lieferung_file = subscribeLieferung_file(
    { where: { _rev_at: { _gt: lastUpdated_lieferung_file } } },
    lieferung_fileModelPrimitives.toString(),
    (data) => updateWmFromData({ data, table: 'lieferung_file', store }),
    (error) => onError({ error }),
  )
  unsubscribe.person = subscribePerson(
    { where: { _rev_at: { _gt: lastUpdated_person } } },
    personModelPrimitives.toString(),
    (data) => updateWmFromData({ data, table: 'person', store }),
    (error) => onError({ error }),
  )
  unsubscribe.person_file = subscribePerson_file(
    { where: { _rev_at: { _gt: lastUpdated_person_file } } },
    person_fileModelPrimitives.toString(),
    (data) => updateWmFromData({ data, table: 'person_file', store }),
    (error) => onError({ error }),
  )
  unsubscribe.person_option = store.subscribePerson_option()
  unsubscribe.sammel_lieferung = subscribeSammel_lieferung(
    { where: { _rev_at: { _gt: lastUpdated_sammel_lieferung } } },
    sammel_lieferungModelPrimitives.toString(),
    (data) => updateWmFromData({ data, table: 'sammel_lieferung', store }),
    (error) => onError({ error }),
  )
  unsubscribe.sammlung = subscribeSammlung(
    { where: { _rev_at: { _gt: lastUpdated_sammlung } } },
    sammlungModelPrimitives.toString(),
    (data) => updateWmFromData({ data, table: 'sammlung', store }),
    (error) => onError({ error }),
  )
  unsubscribe.sammlung_file = subscribeSammlung_file(
    { where: { _rev_at: { _gt: lastUpdated_sammlung_file } } },
    sammlung_fileModelPrimitives.toString(),
    (data) => updateWmFromData({ data, table: 'sammlung_file', store }),
    (error) => onError({ error }),
  )
  unsubscribe.teilkultur = subscribeTeilkultur(
    { where: { _rev_at: { _gt: lastUpdated_teilkultur } } },
    teilkulturModelPrimitives.toString(),
    (data) => updateWmFromData({ data, table: 'teilkultur', store }),
    (error) => onError({ error }),
  )
  unsubscribe.teilzaehlung = subscribeTeilzaehlung(
    { where: { _rev_at: { _gt: lastUpdated_teilzaehlung } } },
    teilzaehlungModelPrimitives.toString(),
    (data) => updateWmFromData({ data, table: 'teilzaehlung', store }),
    (error) => onError({ error }),
  )
  unsubscribe.user_role = store.subscribeUser_role()
  unsubscribe.zaehlung = subscribeZaehlung(
    { where: { _rev_at: { _gt: lastUpdated_zaehlung } } },
    zaehlungModelPrimitives.toString(),
    (data) => updateWmFromData({ data, table: 'zaehlung', store }),
    (error) => onError({ error }),
  )
  return unsubscribe
}

export default initializeSubscriptions
