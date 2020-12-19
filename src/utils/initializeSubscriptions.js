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
import gql from 'graphql-tag'

import processSubscriptionResult from './processSubscriptionResult'

const initializeSubscriptions = ({ store }) => {
  const {
    ae_art_lastUpdated,
    art_lastUpdated,
    art_file_lastUpdated,
    art_qk_lastUpdated,
    art_qk_choosen_lastUpdated,
    av_lastUpdated,
    event_lastUpdated,
    garten_lastUpdated,
    garten_file_lastUpdated,
    gv_lastUpdated,
    herkunft_lastUpdated,
    herkunft_file_lastUpdated,
    kultur_lastUpdated,
    kultur_file_lastUpdated,
    kultur_option_lastUpdated,
    kultur_qk_lastUpdated,
    kultur_qk_choosen_lastUpdated,
    lieferung_lastUpdated,
    lieferung_file_lastUpdated,
    person_lastUpdated,
    person_file_lastUpdated,
    person_option_lastUpdated,
    sammel_lieferung_lastUpdated,
    sammlung_lastUpdated,
    sammlung_file_lastUpdated,
    teilkultur_lastUpdated,
    teilzaehlung_lastUpdated,
    user_role_lastUpdated,
    zaehlung_lastUpdated,
  } = store
  const unsubscribe = {}

  // TODO:
  // resubscribe in a throttled way when _lastUpdated changes
  unsubscribe.ae_art = store.gqlWsClient
    .request({
      query: gql`
        subscription AeArt($where: ae_art_bool_exp) {
          ae_art(where: $where) {
            id
            name
          }
        }
      `,
      variables: { where: { _rev_at: { _gt: ae_art_lastUpdated } } },
    })
    .subscribe({
      next(data) {
        processSubscriptionResult({
          data: data.data.ae_art,
          table: 'ae_art',
          store,
        })
      },
      error: (error) => console.log('subscribeAeArt, onError:', error),
    })
  unsubscribe.art = store.gqlWsClient
    .request({
      query: `subscription Art($where: art_bool_exp) { art(where: $where) {
      ${artModelPrimitives.toString()}
    } }`,
      variables: { where: { _rev_at: { _gt: art_lastUpdated } } },
    })
    .subscribe({
      next(data) {
        processSubscriptionResult({
          data: data.data.art,
          table: 'art',
          store,
        })
      },
      error: (error) => console.log('subscribeArt, onError:', error),
    })
  unsubscribe.art_file = store.gqlWsClient
    .request({
      query: `subscription ArtFile($where: art_file_bool_exp) { art_file(where: $where) {
    ${art_fileModelPrimitives.toString()}
  } }`,
      variables: { where: { _rev_at: { _gt: art_file_lastUpdated } } },
    })
    .subscribe({
      next(data) {
        processSubscriptionResult({
          data: data.data.art_file,
          table: 'art_file',
          store,
        })
      },
      error: (error) => console.log('subscribeArtFile, onError:', error),
    })
  unsubscribe.art_qk = store.gqlWsClient
    .request({
      query: `subscription ArtQk($where: art_qk_bool_exp) { art_qk(where: $where) {
    ${art_qkModelPrimitives.toString()}
  } }`,
      variables: { where: { _rev_at: { _gt: art_qk_lastUpdated } } },
    })
    .subscribe({
      next(data) {
        processSubscriptionResult({
          data: data.data.art_qk,
          table: 'art_qk',
          store,
        })
      },
      error: (error) => console.log('subscribeArtQk, onError:', error),
    })
  unsubscribe.art_qk_choosen = store.gqlWsClient
    .request({
      query: `subscription ArtQkChoosen($where: art_qk_choosen_bool_exp) { art_qk_choosen(where: $where) {
    ${art_qk_choosenModelPrimitives.toString()}
  } }`,
      variables: { where: { _rev_at: { _gt: art_qk_choosen_lastUpdated } } },
    })
    .subscribe({
      next(data) {
        processSubscriptionResult({
          data: data.data.art_qk_choosen,
          table: 'art_qk_choosen',
          store,
        })
      },
      error: (error) => console.log('subscribeArtQkChoosen, onError:', error),
    })
  unsubscribe.av = store.gqlWsClient
    .request({
      query: `subscription Av($where: av_bool_exp) { av(where: $where) {
    ${avModelPrimitives.toString()}
  } }`,
      variables: { where: { _rev_at: { _gt: av_lastUpdated } } },
    })
    .subscribe({
      next(data) {
        processSubscriptionResult({
          data: data.data.av,
          table: 'av',
          store,
        })
      },
      error: (error) => console.log('subscribeAv, onError:', error),
    })
  unsubscribe.event = store.gqlWsClient
    .request({
      query: `subscription Event($where: event_bool_exp) { event(where: $where) {
  ${eventModelPrimitives.toString()}
} }`,
      variables: { where: { _rev_at: { _gt: event_lastUpdated } } },
    })
    .subscribe({
      next(data) {
        processSubscriptionResult({
          data: data.data.event,
          table: 'event',
          store,
        })
      },
      error: (error) => console.log('subscribeEvent, onError:', error),
    })
  unsubscribe.garten = store.gqlWsClient
    .request({
      query: `subscription Garten($where: garten_bool_exp) { garten(where: $where) {
${gartenModelPrimitives.toString()}
} }`,
      variables: { where: { _rev_at: { _gt: garten_lastUpdated } } },
    })
    .subscribe({
      next(data) {
        processSubscriptionResult({
          data: data.data.garten,
          table: 'garten',
          store,
        })
      },
      error: (error) => console.log('subscribeGarten, onError:', error),
    })
  unsubscribe.garten_file = store.gqlWsClient
    .request({
      query: `subscription GartenFile($where: garten_file_bool_exp) { garten_file(where: $where) {
${garten_fileModelPrimitives.toString()}
} }`,
      variables: { where: { _rev_at: { _gt: garten_file_lastUpdated } } },
    })
    .subscribe({
      next(data) {
        processSubscriptionResult({
          data: data.data.garten_file,
          table: 'garten_file',
          store,
        })
      },
      error: (error) => console.log('subscribeGartenFile, onError:', error),
    })
  unsubscribe.gv = store.gqlWsClient
    .request({
      query: `subscription Gv($where: gv_bool_exp) { gv(where: $where) {
    ${gvModelPrimitives.toString()}
  } }`,
      variables: { where: { _rev_at: { _gt: gv_lastUpdated } } },
    })
    .subscribe({
      next(data) {
        processSubscriptionResult({
          data: data.data.gv,
          table: 'gv',
          store,
        })
      },
      error: (error) => console.log('subscribeGv, onError:', error),
    })
  unsubscribe.herkunft = store.gqlWsClient
    .request({
      query: `subscription Herkunft($where: herkunft_bool_exp) { herkunft(where: $where) {
    ${herkunftModelPrimitives.toString()}
  } }`,
      variables: { where: { _rev_at: { _gt: herkunft_lastUpdated } } },
    })
    .subscribe({
      next(data) {
        processSubscriptionResult({
          data: data.data.herkunft,
          table: 'herkunft',
          store,
        })
      },
      error: (error) => console.log('subscribeHerkunft, onError:', error),
    })
  unsubscribe.herkunft_file = store.gqlWsClient
    .request({
      query: `subscription HerkunftFile($where: herkunft_file_bool_exp) { herkunft_file(where: $where) {
    ${herkunft_fileModelPrimitives.toString()}
  } }`,
      variables: { where: { _rev_at: { _gt: herkunft_file_lastUpdated } } },
    })
    .subscribe({
      next(data) {
        processSubscriptionResult({
          data: data.data.herkunft_file,
          table: 'herkunft_file',
          store,
        })
      },
      error: (error) => console.log('subscribeHerkunftFile, onError:', error),
    })
  unsubscribe.kultur = store.gqlWsClient
    .request({
      query: `subscription Kultur($where: kultur_bool_exp) { kultur(where: $where) {
    ${kulturModelPrimitives.toString()}
  } }`,
      variables: { where: { _rev_at: { _gt: kultur_lastUpdated } } },
    })
    .subscribe({
      next(data) {
        processSubscriptionResult({
          data: data.data.kultur,
          table: 'kultur',
          store,
        })
      },
      error: (error) => console.log('subscribeKultur, onError:', error),
    })
  unsubscribe.kultur_file = store.gqlWsClient
    .request({
      query: `subscription KulturFile($where: kultur_file_bool_exp) { kultur_file(where: $where) {
    ${kultur_fileModelPrimitives.toString()}
  } }`,
      variables: { where: { _rev_at: { _gt: kultur_file_lastUpdated } } },
    })
    .subscribe({
      next(data) {
        processSubscriptionResult({
          data: data.data.kultur_file,
          table: 'kultur_file',
          store,
        })
      },
      error: (error) => console.log('subscribeKulturFile, onError:', error),
    })
  unsubscribe.kultur_option = store.gqlWsClient
    .request({
      query: `subscription KulturOption($where: kultur_option_bool_exp) { kultur_option(where: $where) {
    ${kultur_optionModelPrimitives.toString()}
  } }`,
      variables: { where: { _rev_at: { _gt: kultur_option_lastUpdated } } },
    })
    .subscribe({
      next(data) {
        processSubscriptionResult({
          data: data.data.kultur_option,
          table: 'kultur_option',
          store,
        })
      },
      error: (error) => console.log('subscribeKulturOption, onError:', error),
    })
  unsubscribe.kultur_qk = store.gqlWsClient
    .request({
      query: `subscription KulturQk($where: kultur_qk_bool_exp) { kultur_qk(where: $where) {
    ${kultur_qkModelPrimitives.toString()}
  } }`,
      variables: { where: { _rev_at: { _gt: kultur_qk_lastUpdated } } },
    })
    .subscribe({
      next(data) {
        processSubscriptionResult({
          data: data.data.kultur_qk,
          table: 'kultur_qk',
          store,
        })
      },
      error: (error) => console.log('subscribeKulturQk, onError:', error),
    })
  unsubscribe.kultur_qk_choosen = store.gqlWsClient
    .request({
      query: `subscription KulturQkChoosen($where: kultur_qk_choosen_bool_exp) { kultur_qk_choosen(where: $where) {
    ${kultur_qk_choosenModelPrimitives.toString()}
  } }`,
      variables: { where: { _rev_at: { _gt: kultur_qk_choosen_lastUpdated } } },
    })
    .subscribe({
      next(data) {
        processSubscriptionResult({
          data: data.data.kultur_qk_choosen,
          table: 'kultur_qk_choosen',
          store,
        })
      },
      error: (error) =>
        console.log('subscribeKulturQkChoosen, onError:', error),
    })
  unsubscribe.lieferung = store.gqlWsClient
    .request({
      query: `subscription Lieferung($where: lieferung_bool_exp) { lieferung(where: $where) {
    ${lieferungModelPrimitives.toString()}
  } }`,
      variables: { where: { _rev_at: { _gt: lieferung_lastUpdated } } },
    })
    .subscribe({
      next(data) {
        processSubscriptionResult({
          data: data.data.lieferung,
          table: 'lieferung',
          store,
        })
      },
      error: (error) => console.log('subscribeLieferung, onError:', error),
    })
  unsubscribe.lieferung_file = store.gqlWsClient
    .request({
      query: `subscription LieferungFile($where: lieferung_file_bool_exp) { lieferung_file(where: $where) {
    ${lieferung_fileModelPrimitives.toString()}
  } }`,
      variables: { where: { _rev_at: { _gt: lieferung_file_lastUpdated } } },
    })
    .subscribe({
      next(data) {
        processSubscriptionResult({
          data: data.data.lieferung_file,
          table: 'lieferung_file',
          store,
        })
      },
      error: (error) => console.log('subscribeLieferungFile, onError:', error),
    })
  unsubscribe.person = store.gqlWsClient
    .request({
      query: `subscription Person($where: person_bool_exp) { person(where: $where) {
    ${personModelPrimitives.toString()}
  } }`,
      variables: { where: { _rev_at: { _gt: person_lastUpdated } } },
    })
    .subscribe({
      next(data) {
        processSubscriptionResult({
          data: data.data.person,
          table: 'person',
          store,
        })
      },
      error: (error) => console.log('subscribePerson, onError:', error),
    })
  unsubscribe.person_file = store.gqlWsClient
    .request({
      query: `subscription PersonFile($where: person_file_bool_exp) { person_file(where: $where) {
    ${person_fileModelPrimitives.toString()}
  } }`,
      variables: { where: { _rev_at: { _gt: person_file_lastUpdated } } },
    })
    .subscribe({
      next(data) {
        processSubscriptionResult({
          data: data.data.person_file,
          table: 'person_file',
          store,
        })
      },
      error: (error) => console.log('subscribePersonFile, onError:', error),
    })
  unsubscribe.person_option = store.gqlWsClient
    .request({
      query: `subscription PersonOption($where: person_option_bool_exp) { person_option(where: $where) {
    ${person_optionModelPrimitives.toString()}
  } }`,
      variables: { where: { _rev_at: { _gt: person_option_lastUpdated } } },
    })
    .subscribe({
      next(data) {
        processSubscriptionResult({
          data: data.data.person_option,
          table: 'person_option',
          store,
        })
      },
      error: (error) => console.log('subscribePersonOption, onError:', error),
    })
  unsubscribe.sammel_lieferung = store.gqlWsClient
    .request({
      query: `subscription SammelLieferung($where: sammel_lieferung_bool_exp) { sammel_lieferung(where: $where) {
    ${sammel_lieferungModelPrimitives.toString()}
  } }`,
      variables: { where: { _rev_at: { _gt: sammel_lieferung_lastUpdated } } },
    })
    .subscribe({
      next(data) {
        processSubscriptionResult({
          data: data.data.sammel_lieferung,
          table: 'sammel_lieferung',
          store,
        })
      },
      error: (error) =>
        console.log('subscribeSammelLieferung, onError:', error),
    })
  unsubscribe.sammlung = store.gqlWsClient
    .request({
      query: `subscription Sammlung($where: sammlung_bool_exp) { sammlung(where: $where) {
    ${sammlungModelPrimitives.toString()}
  } }`,
      variables: { where: { _rev_at: { _gt: sammlung_lastUpdated } } },
    })
    .subscribe({
      next(data) {
        processSubscriptionResult({
          data: data.data.sammlung,
          table: 'sammlung',
          store,
        })
      },
      error: (error) => console.log('subscribeSammlung, onError:', error),
    })
  unsubscribe.sammlung_file = store.gqlWsClient
    .request({
      query: `subscription SammlungFile($where: sammlung_file_bool_exp) { sammlung_file(where: $where) {
    ${sammlung_fileModelPrimitives.toString()}
  } }`,
      variables: { where: { _rev_at: { _gt: sammlung_file_lastUpdated } } },
    })
    .subscribe({
      next(data) {
        processSubscriptionResult({
          data: data.data.sammlung_file,
          table: 'sammlung_file',
          store,
        })
      },
      error: (error) => console.log('subscribeSammlungFile, onError:', error),
    })
  unsubscribe.teilkultur = store.gqlWsClient
    .request({
      query: `subscription Teilkultur($where: teilkultur_bool_exp) { teilkultur(where: $where) {
    ${teilkulturModelPrimitives.toString()}
  } }`,
      variables: { where: { _rev_at: { _gt: teilkultur_lastUpdated } } },
    })
    .subscribe({
      next(data) {
        processSubscriptionResult({
          data: data.data.teilkultur,
          table: 'teilkultur',
          store,
        })
      },
      error: (error) => console.log('subscribeTeilkultur, onError:', error),
    })
  unsubscribe.teilzaehlung = store.gqlWsClient
    .request({
      query: `subscription Teilzaehlung($where: teilzaehlung_bool_exp) { teilzaehlung(where: $where) {
    ${teilzaehlungModelPrimitives.toString()}
  } }`,
      variables: { where: { _rev_at: { _gt: teilzaehlung_lastUpdated } } },
    })
    .subscribe({
      next(data) {
        processSubscriptionResult({
          data: data.data.teilzaehlung,
          table: 'teilzaehlung',
          store,
        })
      },
      error: (error) => console.log('subscribeTeilzaehlung, onError:', error),
    })
  unsubscribe.user_role = store.gqlWsClient
    .request({
      query: `subscription UserRole($where: user_role_bool_exp) { user_role(where: $where) {
    ${user_roleModelPrimitives.toString()}
  } }`,
      variables: { where: { _rev_at: { _gt: user_role_lastUpdated } } },
    })
    .subscribe({
      next(data) {
        processSubscriptionResult({
          data: data.data.user_role,
          table: 'user_role',
          store,
        })
      },
      error: (error) => console.log('subscribeUserRole, onError:', error),
    })
  unsubscribe.zaehlung = store.gqlWsClient
    .request({
      query: `subscription Zaehlung($where: zaehlung_bool_exp) { zaehlung(where: $where) {
    ${zaehlungModelPrimitives.toString()}
  } }`,
      variables: { where: { _rev_at: { _gt: zaehlung_lastUpdated } } },
    })
    .subscribe({
      next(data) {
        processSubscriptionResult({
          data: data.data.zaehlung,
          table: 'zaehlung',
          store,
        })
      },
      error: (error) => console.log('subscribeZaehlung, onError:', error),
    })
  return unsubscribe
}

export default initializeSubscriptions
