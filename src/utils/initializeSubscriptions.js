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
import { kultur_qkModelPrimitives } from '../models/kultur_qkModel.base'
import { kultur_qk_choosenModelPrimitives } from '../models/kultur_qk_choosenModel.base'
import { lieferungModelPrimitives } from '../models/lieferungModel.base'
import { lieferung_fileModelPrimitives } from '../models/lieferung_fileModel.base'
import { personModelPrimitives } from '../models/personModel.base'
import { person_fileModelPrimitives } from '../models/person_fileModel.base'
import { person_optionModelPrimitives } from '../models/person_optionModel.base'
import { sammel_lieferungModelPrimitives } from '../models/sammel_lieferungModel.base'
import { sammlungModelPrimitives } from '../models/sammlungModel.base'
import { sammlung_fileModelPrimitives } from '../models/sammlung_fileModel.base'
import { teilkulturModelPrimitives } from '../models/teilkulturModel.base'
import { teilzaehlungModelPrimitives } from '../models/teilzaehlungModel.base'
import { user_roleModelPrimitives } from '../models/user_roleModel.base'
import { zaehlungModelPrimitives } from '../models/zaehlungModel.base'

import processSubscriptionResult from './processSubscriptionResult'

const onError = ({ error }) => {
  console.log('subscribeHerkunft, onError:', error)
}

const initializeSubscriptions = ({ store }) => {
  const {
    ae_art_lastUpdated,
    subscribeAe_art,
    art_lastUpdated,
    art_file_lastUpdated,
    subscribeArt_file,
    art_qk_lastUpdated,
    subscribeArt_qk,
    art_qk_choosen_lastUpdated,
    subscribeArt_qk_choosen,
    subscribeAv,
    av_lastUpdated,
    subscribeArt,
    event_lastUpdated,
    subscribeEvent,
    garten_lastUpdated,
    subscribeGarten,
    garten_file_lastUpdated,
    subscribeGarten_file,
    subscribeGv,
    gv_lastUpdated,
    herkunft_lastUpdated,
    subscribeHerkunft,
    herkunft_file_lastUpdated,
    subscribeHerkunft_file,
    kultur_lastUpdated,
    subscribeKultur,
    kultur_file_lastUpdated,
    subscribeKultur_file,
    kultur_option_lastUpdated,
    subscribeKultur_option,
    kultur_qk_lastUpdated,
    subscribeKultur_qk,
    kultur_qk_choosen_lastUpdated,
    subscribeKultur_qk_choosen,
    lieferung_lastUpdated,
    subscribeLieferung,
    lieferung_file_lastUpdated,
    subscribeLieferung_file,
    person_lastUpdated,
    subscribePerson,
    person_file_lastUpdated,
    subscribePerson_file,
    person_option_lastUpdated,
    subscribePerson_option,
    sammel_lieferung_lastUpdated,
    subscribeSammel_lieferung,
    sammlung_lastUpdated,
    subscribeSammlung,
    sammlung_file_lastUpdated,
    subscribeSammlung_file,
    teilkultur_lastUpdated,
    subscribeTeilkultur,
    teilzaehlung_lastUpdated,
    subscribeTeilzaehlung,
    user_role_lastUpdated,
    subscribeUser_role,
    zaehlung_lastUpdated,
    subscribeZaehlung,
  } = store
  const unsubscribe = {}
  // the uncommented code uses the gqlWsClient directly, circumventing mst-gql
  // TODO:
  // switch to this method when data is queried everywhere from watermelondb
  // then ditch mst-gql
  /*
  console.log('initializeSubscriptions', {
    aeArtQuery: ae_artModelPrimitives.toString(),
  })
  unsubscribe.ae_art = store.gqlWsClient
    .request({
      query: `subscription Mine($where: ae_art_bool_exp) { ae_art(where: $where) {
        ${ae_artModelPrimitives.toString()}
      } }`,
      variables: { where: { _rev_at: { _gt: ae_art_lastUpdated } } },
    })
    .subscribe({
      next(data) {
        console.log('initializeSubscriptions, next, data:', data)
        processSubscriptionResult({ data: data.data.ae_art, table: 'ae_art', store })
      },
      error: (error) => console.log('subscribeAeArt, onError:', error),
    })*/
  unsubscribe.ae_art = subscribeAe_art(
    { where: { _rev_at: { _gt: ae_art_lastUpdated } } },
    ae_artModelPrimitives.toString(),
    (data) => processSubscriptionResult({ data, table: 'ae_art', store }),
    (error) => onError({ error }),
  )
  unsubscribe.art = subscribeArt(
    { where: { _rev_at: { _gt: art_lastUpdated } } },
    artModelPrimitives.toString(),
    (data) => processSubscriptionResult({ data, table: 'art', store }),
    (error) => onError({ error }),
  )
  unsubscribe.art_file = subscribeArt_file(
    { where: { _rev_at: { _gt: art_file_lastUpdated } } },
    art_fileModelPrimitives.toString(),
    (data) =>
      processSubscriptionResult({
        data,
        table: 'art_file',
        store,
      }),
    (error) => onError({ error }),
  )
  unsubscribe.art_qk = subscribeArt_qk(
    { where: { _rev_at: { _gt: art_qk_lastUpdated } } },
    art_qkModelPrimitives.toString(),
    (data) => processSubscriptionResult({ data, table: 'art_qk', store }),
    (error) => onError({ error }),
  )
  unsubscribe.art_qk_choosen = subscribeArt_qk_choosen(
    { where: { _rev_at: { _gt: art_qk_choosen_lastUpdated } } },
    art_qk_choosenModelPrimitives.toString(),
    (data) =>
      processSubscriptionResult({
        data,
        table: 'art_qk_choosen',
        store,
      }),
    (error) => onError({ error }),
  )
  unsubscribe.av = subscribeAv(
    { where: { _rev_at: { _gt: av_lastUpdated } } },
    avModelPrimitives.toString(),
    (data) => processSubscriptionResult({ data, table: 'av', store }),
    (error) => onError({ error }),
  )
  unsubscribe.event = subscribeEvent(
    { where: { _rev_at: { _gt: event_lastUpdated } } },
    eventModelPrimitives.toString(),
    (data) => processSubscriptionResult({ data, table: 'event', store }),
    (error) => onError({ error }),
  )
  unsubscribe.garten = subscribeGarten(
    { where: { _rev_at: { _gt: garten_lastUpdated } } },
    gartenModelPrimitives.toString(),
    (data) => processSubscriptionResult({ data, table: 'garten', store }),
    (error) => onError({ error }),
  )
  unsubscribe.garten_file = subscribeGarten_file(
    { where: { _rev_at: { _gt: garten_file_lastUpdated } } },
    garten_fileModelPrimitives.toString(),
    (data) =>
      processSubscriptionResult({
        data,
        table: 'garten_file',
        store,
      }),
    (error) => onError({ error }),
  )
  unsubscribe.gv = subscribeGv(
    { where: { _rev_at: { _gt: gv_lastUpdated } } },
    gvModelPrimitives.toString(),
    (data) => processSubscriptionResult({ data, table: 'gv', store }),
    (error) => onError({ error }),
  )
  unsubscribe.herkunft = subscribeHerkunft(
    { where: { _rev_at: { _gt: herkunft_lastUpdated } } },
    herkunftModelPrimitives.toString(),
    (data) =>
      processSubscriptionResult({
        data,
        table: 'herkunft',
        store,
      }),
    (error) => onError({ error }),
  )
  unsubscribe.herkunft_file = subscribeHerkunft_file(
    { where: { _rev_at: { _gt: herkunft_file_lastUpdated } } },
    herkunft_fileModelPrimitives.toString(),
    (data) =>
      processSubscriptionResult({
        data,
        table: 'herkunft_file',
        store,
      }),
    (error) => onError({ error }),
  )
  unsubscribe.kultur = subscribeKultur(
    { where: { _rev_at: { _gt: kultur_lastUpdated } } },
    kulturModelPrimitives.toString(),
    (data) => processSubscriptionResult({ data, table: 'kultur', store }),
    (error) => onError({ error }),
  )
  unsubscribe.kultur_file = subscribeKultur_file(
    { where: { _rev_at: { _gt: kultur_file_lastUpdated } } },
    kultur_fileModelPrimitives.toString(),
    (data) =>
      processSubscriptionResult({
        data,
        table: 'kultur_file',
        store,
      }),
    (error) => onError({ error }),
  )
  unsubscribe.kultur_option = subscribeKultur_option(
    { where: { _rev_at: { _gt: kultur_option_lastUpdated } } },
    kultur_optionModelPrimitives.toString(),
    (data) =>
      processSubscriptionResult({
        data,
        table: 'kultur_option',
        store,
      }),
    (error) => onError({ error }),
  )
  unsubscribe.kultur_qk = subscribeKultur_qk(
    { where: { _rev_at: { _gt: kultur_qk_lastUpdated } } },
    kultur_qkModelPrimitives.toString(),
    (data) =>
      processSubscriptionResult({
        data,
        table: 'kultur_qk',
        store,
      }),
    (error) => console.log('Error in subscribeKultur_qk:', error),
  )
  unsubscribe.kultur_qk_choosen = subscribeKultur_qk_choosen(
    { where: { _rev_at: { _gt: kultur_qk_choosen_lastUpdated } } },
    kultur_qk_choosenModelPrimitives.toString(),
    (data) =>
      processSubscriptionResult({
        data,
        table: 'kultur_qk_choosen',
        store,
      }),
    (error) => console.log('Error in subscribeKultur_qk_choosen:', error),
  )
  unsubscribe.lieferung = subscribeLieferung(
    { where: { _rev_at: { _gt: lieferung_lastUpdated } } },
    lieferungModelPrimitives.toString(),
    (data) =>
      processSubscriptionResult({
        data,
        table: 'lieferung',
        store,
      }),
    (error) => onError({ error }),
  )
  unsubscribe.lieferung_file = subscribeLieferung_file(
    { where: { _rev_at: { _gt: lieferung_file_lastUpdated } } },
    lieferung_fileModelPrimitives.toString(),
    (data) =>
      processSubscriptionResult({
        data,
        table: 'lieferung_file',
        store,
      }),
    (error) => onError({ error }),
  )
  unsubscribe.person = subscribePerson(
    { where: { _rev_at: { _gt: person_lastUpdated } } },
    personModelPrimitives.toString(),
    (data) => processSubscriptionResult({ data, table: 'person', store }),
    (error) => onError({ error }),
  )
  unsubscribe.person_file = subscribePerson_file(
    { where: { _rev_at: { _gt: person_file_lastUpdated } } },
    person_fileModelPrimitives.toString(),
    (data) =>
      processSubscriptionResult({
        data,
        table: 'person_file',
        store,
      }),
    (error) => onError({ error }),
  )
  unsubscribe.person_option = subscribePerson_option(
    { where: { _rev_at: { _gt: person_option_lastUpdated } } },
    person_optionModelPrimitives.toString(),
    (data) =>
      processSubscriptionResult({
        data,
        table: 'person_option',
        store,
      }),
    (error) => onError({ error }),
  )
  unsubscribe.sammel_lieferung = subscribeSammel_lieferung(
    { where: { _rev_at: { _gt: sammel_lieferung_lastUpdated } } },
    sammel_lieferungModelPrimitives.toString(),
    (data) =>
      processSubscriptionResult({
        data,
        table: 'sammel_lieferung',
        store,
      }),
    (error) => onError({ error }),
  )
  unsubscribe.sammlung = subscribeSammlung(
    { where: { _rev_at: { _gt: sammlung_lastUpdated } } },
    sammlungModelPrimitives.toString(),
    (data) =>
      processSubscriptionResult({
        data,
        table: 'sammlung',
        store,
      }),
    (error) => onError({ error }),
  )
  unsubscribe.sammlung_file = subscribeSammlung_file(
    { where: { _rev_at: { _gt: sammlung_file_lastUpdated } } },
    sammlung_fileModelPrimitives.toString(),
    (data) =>
      processSubscriptionResult({
        data,
        table: 'sammlung_file',
        store,
      }),
    (error) => onError({ error }),
  )
  unsubscribe.teilkultur = subscribeTeilkultur(
    { where: { _rev_at: { _gt: teilkultur_lastUpdated } } },
    teilkulturModelPrimitives.toString(),
    (data) =>
      processSubscriptionResult({
        data,
        table: 'teilkultur',
        store,
      }),
    (error) => onError({ error }),
  )
  unsubscribe.teilzaehlung = subscribeTeilzaehlung(
    { where: { _rev_at: { _gt: teilzaehlung_lastUpdated } } },
    teilzaehlungModelPrimitives.toString(),
    (data) =>
      processSubscriptionResult({
        data,
        table: 'teilzaehlung',
        store,
      }),
    (error) => onError({ error }),
  )
  unsubscribe.user_role = subscribeUser_role(
    { where: { _rev_at: { _gt: user_role_lastUpdated } } },
    user_roleModelPrimitives.toString(),
    (data) =>
      processSubscriptionResult({
        data,
        table: 'user_role',
        store,
      }),
    (error) => onError({ error }),
  )
  unsubscribe.zaehlung = subscribeZaehlung(
    { where: { _rev_at: { _gt: zaehlung_lastUpdated } } },
    zaehlungModelPrimitives.toString(),
    (data) =>
      processSubscriptionResult({
        data,
        table: 'zaehlung',
        store,
      }),
    (error) => onError({ error }),
  )
  return unsubscribe
}

export default initializeSubscriptions
