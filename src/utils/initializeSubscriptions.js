import gql from 'graphql-tag'

import processSubscriptionResult from './processSubscriptionResult'
import {
  aeArt as aeArtFragment,
  art as artFragment,
  artFile as artFileFragment,
  artQk as artQkFragment,
  av as avFragment,
  event as eventFragment,
  garten as gartenFragment,
  gartenFile as gartenFileFragment,
  gv as gvFragment,
  herkunft as herkunftFragment,
  herkunftFile as herkunftFileFragment,
  kultur as kulturFragment,
  kulturFile as kulturFileFragment,
  kulturQk as kulturQkFragment,
  kulturOption as kulturOptionFragment,
  lieferung as lieferungFragment,
  lieferungFile as lieferungFileFragment,
  person as personFragment,
  personFile as personFileFragment,
  personOption as personOptionFragment,
  sammelLieferung as sammelLieferungFragment,
  sammlung as sammlungFragment,
  sammlungFile as sammlungFileFragment,
  teilkultur as teilkulturFragment,
  teilzaehlung as teilzaehlungFragment,
  userRole as userRoleFragment,
  zaehlung as zaehlungFragment,
} from './fragments'

const initializeSubscriptions = ({ store }) => {
  const {
    ae_art_lastUpdated,
    art_lastUpdated,
    art_file_lastUpdated,
    art_qk_lastUpdated,
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
            ...AeArtFields
          }
        }
        ${aeArtFragment}
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
      error(error) {
        // if error.message contains JWT, do what?
        // re-subscribe
        console.log('subscribeAeArt, onError:', error)
        //typeof window !== 'undefined' && window.location.reload(true)
        // store.firebase.auth().signOut()
        // need to retry
        setTimeout(() => store.incrementWsReconnectCount(), 3000)
      },
    })
  unsubscribe.art = store.gqlWsClient
    .request({
      query: gql`
        subscription Art($where: art_bool_exp) {
          art(where: $where) {
            ...ArtFields
          }
        }
        ${artFragment}
      `,
      variables: { where: { _rev_at: { _gt: art_lastUpdated } } },
    })
    .subscribe({
      next(data) {
        //console.log('initializeSubscriptions, art, data:', data.data.art)
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
      query: gql`
        subscription ArtFile($where: art_file_bool_exp) {
          art_file(where: $where) {
            ...ArtFileFields
          }
        }
        ${artFileFragment}
      `,
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
      query: gql`
        subscription ArtQk($where: art_qk_bool_exp) {
          art_qk(where: $where) {
            ...ArtQkFields
          }
        }
        ${artQkFragment}
      `,
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
  unsubscribe.av = store.gqlWsClient
    .request({
      query: gql`
        subscription Av($where: av_bool_exp) {
          av(where: $where) {
            ...AvFields
          }
        }
        ${avFragment}
      `,
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
      query: gql`
        subscription Event($where: event_bool_exp) {
          event(where: $where) {
            ...EventFields
          }
        }
        ${eventFragment}
      `,
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
      query: gql`
        subscription Garten($where: garten_bool_exp) {
          garten(where: $where) {
            ...GartenFields
          }
        }
        ${gartenFragment}
      `,
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
      query: gql`
        subscription GartenFile($where: garten_file_bool_exp) {
          garten_file(where: $where) {
            ...GartenFileFields
          }
        }
        ${gartenFileFragment}
      `,
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
      query: gql`
        subscription Gv($where: gv_bool_exp) {
          gv(where: $where) {
            ...GvFields
          }
        }
        ${gvFragment}
      `,
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
      query: gql`
        subscription Herkunft($where: herkunft_bool_exp) {
          herkunft(where: $where) {
            ...HerkunftFields
          }
        }
        ${herkunftFragment}
      `,
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
      query: gql`
        subscription HerkunftFile($where: herkunft_file_bool_exp) {
          herkunft_file(where: $where) {
            ...HerkunftFileFields
          }
        }
        ${herkunftFileFragment}
      `,
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
      query: gql`
        subscription Kultur($where: kultur_bool_exp) {
          kultur(where: $where) {
            ...KulturFields
          }
        }
        ${kulturFragment}
      `,
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
      query: gql`
        subscription KulturFile($where: kultur_file_bool_exp) {
          kultur_file(where: $where) {
            ...KulturFileFields
          }
        }
        ${kulturFileFragment}
      `,
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
      query: gql`
        subscription KulturOption($where: kultur_option_bool_exp) {
          kultur_option(where: $where) {
            ...KulturOptionFields
          }
        }
        ${kulturOptionFragment}
      `,
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
      query: gql`
        subscription KulturQk($where: kultur_qk_bool_exp) {
          kultur_qk(where: $where) {
            ...KulturQkFields
          }
        }
        ${kulturQkFragment}
      `,
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
  unsubscribe.lieferung = store.gqlWsClient
    .request({
      query: gql`
        subscription Lieferung($where: lieferung_bool_exp) {
          lieferung(where: $where) {
            ...LieferungFields
          }
        }
        ${lieferungFragment}
      `,
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
      query: gql`
        subscription LieferungFile($where: lieferung_file_bool_exp) {
          lieferung_file(where: $where) {
            ...LieferungFileFields
          }
        }
        ${lieferungFileFragment}
      `,
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
      query: gql`
        subscription Person($where: person_bool_exp) {
          person(where: $where) {
            ...PersonFields
          }
        }
        ${personFragment}
      `,
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
      query: gql`
        subscription PersonFile($where: person_file_bool_exp) {
          person_file(where: $where) {
            ...PersonFileFields
          }
        }
        ${personFileFragment}
      `,
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
      query: gql`
        subscription PersonOption($where: person_option_bool_exp) {
          person_option(where: $where) {
            ...PersonOptionFields
          }
        }
        ${personOptionFragment}
      `,
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
      query: gql`
        subscription SammelLieferung($where: sammel_lieferung_bool_exp) {
          sammel_lieferung(where: $where) {
            ...SammelLieferungFields
          }
        }
        ${sammelLieferungFragment}
      `,
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
      query: gql`
        subscription Sammlung($where: sammlung_bool_exp) {
          sammlung(where: $where) {
            ...SammlungFields
          }
        }
        ${sammlungFragment}
      `,
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
      query: gql`
        subscription SammlungFile($where: sammlung_file_bool_exp) {
          sammlung_file(where: $where) {
            ...SammlungFileFields
          }
        }
        ${sammlungFileFragment}
      `,
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
      query: gql`
        subscription Teilkultur($where: teilkultur_bool_exp) {
          teilkultur(where: $where) {
            ...TeilkulturFields
          }
        }
        ${teilkulturFragment}
      `,
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
      query: gql`
        subscription Teilzaehlung($where: teilzaehlung_bool_exp) {
          teilzaehlung(where: $where) {
            ...TeilzaehlungFields
          }
        }
        ${teilzaehlungFragment}
      `,
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
      query: gql`
        subscription UserRole($where: user_role_bool_exp) {
          user_role(where: $where) {
            ...UserRoleFields
          }
        }
        ${userRoleFragment}
      `,
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
      query: gql`
        subscription Zaehlung($where: zaehlung_bool_exp) {
          zaehlung(where: $where) {
            ...ZaehlungFields
          }
        }
        ${zaehlungFragment}
      `,
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
