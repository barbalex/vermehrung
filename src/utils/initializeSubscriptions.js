import { processSubscriptionResult } from './processSubscriptionResult.js'
import { removeOrtsangaben } from './removeOrtsangaben.js'
import { getAuthToken } from './getAuthToken.js'
import {
  store,
  dbAtom,
  gqlWsClientAtom,
  lastUpdatedAtom,
  incrementWsReconnectCount,
} from '../store/index.js'

// a failing subscription must provoke re-subscription, otherwise the initial
// queries never complete and all forms wait forever.
// throttled: errors often arrive in bursts
let lastResubscribeAt = 0
const onSubscriptionError = (table) => async (error) => {
  console.log(`subscribe on table ${table}, onError:`, error)
  const message = String(error?.message ?? error)
  if (message.toLowerCase().includes('jwt')) {
    // stale token: refresh it, then let SubscriptionsInitializer
    // re-subscribe (it watches authorizing and wsReconnectCount)
    await getAuthToken()
    incrementWsReconnectCount()
    return
  }
  if (Date.now() - lastResubscribeAt < 5000) return
  lastResubscribeAt = Date.now()
  setTimeout(() => incrementWsReconnectCount(), 3000)
}

export const initializeSubscriptions = ({ userRole }) => {
  const isNoGaertner = userRole !== 'gaertner'
  if (userRole === 'gaertner') {
    // need to remove some data for gaertner in case they had synced them earlier
    // implemented 2023.05.15
    // TODO: remove this in a year, 2024.06
    removeOrtsangaben({ db: store.get(dbAtom) })
  }
  console.log('initializing subscriptions, userRole:', userRole)

  const {
    ae_art: ae_art_lastUpdated,
    art: art_lastUpdated,
    art_file: art_file_lastUpdated,
    art_qk: art_qk_lastUpdated,
    av: av_lastUpdated,
    event: event_lastUpdated,
    garten: garten_lastUpdated,
    garten_file: garten_file_lastUpdated,
    gv: gv_lastUpdated,
    herkunft: herkunft_lastUpdated,
    herkunft_file: herkunft_file_lastUpdated,
    kultur: kultur_lastUpdated,
    kultur_file: kultur_file_lastUpdated,
    kultur_option: kultur_option_lastUpdated,
    kultur_qk: kultur_qk_lastUpdated,
    lieferung: lieferung_lastUpdated,
    lieferung_file: lieferung_file_lastUpdated,
    person: person_lastUpdated,
    person_file: person_file_lastUpdated,
    person_option: person_option_lastUpdated,
    sammel_lieferung: sammel_lieferung_lastUpdated,
    sammlung: sammlung_lastUpdated,
    sammlung_file: sammlung_file_lastUpdated,
    teilkultur: teilkultur_lastUpdated,
    teilzaehlung: teilzaehlung_lastUpdated,
    user_role: user_role_lastUpdated,
    zaehlung: zaehlung_lastUpdated,
  } = store.get(lastUpdatedAtom)
  const unsubscribe = {}

  // TODO:
  // resubscribe in a throttled way when _lastUpdated changes
  unsubscribe.ae_art = store.get(gqlWsClientAtom).subscribe(
    {
      query: `
        subscription AeArt($where: ae_art_bool_exp) {
          ae_art(where: $where) {
            id
            __typename
            name
            taxonomy
            changed
          }
        }
      `,
      variables: { where: { _rev_at: { _gt: ae_art_lastUpdated } } },
    },
    {
      next: (data) => {
        processSubscriptionResult({
          data: data.data.ae_art,
          table: 'ae_art',
        })
      },
      error: onSubscriptionError('ae_art'),
      complete: () => console.log('resolved ae_art'),
    },
  )
  unsubscribe.art = store.get(gqlWsClientAtom).subscribe(
    {
      query: `
        subscription Art($where: art_bool_exp) {
          art(where: $where) {
            id
            __typename
            ae_id
            set
            apflora_av
            apflora_ap
            changed
            changed_by
            _rev
            _parent_rev
            _revisions
            _depth
            _conflicts
            _deleted
          }
        }
      `,
      variables: { where: { _rev_at: { _gt: art_lastUpdated } } },
    },
    {
      next: (data) => {
        processSubscriptionResult({
          data: data.data.art,
          table: 'art',
        })
      },
      error: onSubscriptionError('art'),
      complete: () => console.log('resolved art'),
    },
  )
  unsubscribe.art_file = store.get(gqlWsClientAtom).subscribe(
    {
      query: `
        subscription ArtFile($where: art_file_bool_exp) {
          art_file(where: $where) {
            id
            __typename
            art_id
            file_id
            file_mime_type
            name
            beschreibung
            changed
            _rev_at
          }
        }
      `,
      variables: { where: { _rev_at: { _gt: art_file_lastUpdated } } },
    },
    {
      next: (data) => {
        processSubscriptionResult({
          data: data.data.art_file,
          table: 'art_file',
        })
      },
      error: onSubscriptionError('art_file'),
      complete: () => console.log('resolved art_file'),
    },
  )
  unsubscribe.art_qk = store.get(gqlWsClientAtom).subscribe(
    {
      query: `
        subscription ArtQk($where: art_qk_bool_exp) {
          art_qk(where: $where) {
            id
            __typename
            name
            titel
            beschreibung
            sort
            changed
            changed_by
            _rev
            _parent_rev
            _revisions
            _depth
            _conflicts
            _deleted
          }
        }
      `,
      variables: { where: { _rev_at: { _gt: art_qk_lastUpdated } } },
    },
    {
      next: (data) => {
        processSubscriptionResult({
          data: data.data.art_qk,
          table: 'art_qk',
        })
      },
      error: onSubscriptionError('art_qk'),
      complete: () => console.log('resolved art_qk'),
    },
  )
  unsubscribe.av = store.get(gqlWsClientAtom).subscribe(
    {
      query: `
        subscription Av($where: av_bool_exp) {
          av(where: $where) {
            id
            __typename
            art_id
            person_id
            changed
            changed_by
            _rev
            _parent_rev
            _revisions
            _depth
            _conflicts
            _deleted
          }
        }
      `,
      variables: { where: { _rev_at: { _gt: av_lastUpdated } } },
    },
    {
      next: (data) => {
        processSubscriptionResult({
          data: data.data.av,
          table: 'av',
        })
      },
      error: onSubscriptionError('av'),
      complete: () => console.log('resolved av'),
    },
  )
  unsubscribe.event = store.get(gqlWsClientAtom).subscribe(
    {
      query: `
        subscription Event($where: event_bool_exp) {
          event(where: $where) {
            id
            __typename
            kultur_id
            teilkultur_id
            person_id
            beschreibung
            geplant
            datum
            changed
            changed_by
            _rev
            _parent_rev
            _revisions
            _depth
            _conflicts
            _deleted
          }
        }
      `,
      variables: { where: { _rev_at: { _gt: event_lastUpdated } } },
    },
    {
      next: (data) => {
        processSubscriptionResult({
          data: data.data.event,
          table: 'event',
        })
      },
      error: onSubscriptionError('event'),
      complete: () => console.log('resolved event'),
    },
  )
  unsubscribe.garten = store.get(gqlWsClientAtom).subscribe(
    {
      query: `
        subscription Garten($where: garten_bool_exp) {
          garten(where: $where) {
            id
            __typename
            name
            person_id
            strasse
            plz
            ort
            aktiv
            bemerkungen
            geom_point
            lv95_x
            lv95_y
            wgs84_lat
            wgs84_long
            changed
            changed_by
            _rev
            _parent_rev
            _revisions
            _depth
            _conflicts
            _deleted
          }
        }
      `,
      variables: { where: { _rev_at: { _gt: garten_lastUpdated } } },
    },
    {
      next: (data) => {
        processSubscriptionResult({
          data: data.data.garten,
          table: 'garten',
        })
      },
      error: onSubscriptionError('garten'),
      complete: () => console.log('resolved garten'),
    },
  )
  unsubscribe.garten_file = store.get(gqlWsClientAtom).subscribe(
    {
      query: `
        subscription GartenFile($where: garten_file_bool_exp) {
          garten_file(where: $where) {
            id
            __typename
            garten_id
            file_id
            file_mime_type
            name
            beschreibung
            changed
            _rev_at
          }
        }
      `,
      variables: { where: { _rev_at: { _gt: garten_file_lastUpdated } } },
    },
    {
      next: (data) => {
        processSubscriptionResult({
          data: data.data.garten_file,
          table: 'garten_file',
        })
      },
      error: onSubscriptionError('garten_file'),
      complete: () => console.log('resolved garten_file'),
    },
  )
  unsubscribe.gv = store.get(gqlWsClientAtom).subscribe(
    {
      query: `
        subscription Gv($where: gv_bool_exp) {
          gv(where: $where) {
            id
            __typename
            garten_id
            person_id
            changed
            changed_by
            _rev
            _parent_rev
            _revisions
            _depth
            _conflicts
            _deleted
          }
        }
      `,
      variables: { where: { _rev_at: { _gt: gv_lastUpdated } } },
    },
    {
      next: (data) => {
        processSubscriptionResult({
          data: data.data.gv,
          table: 'gv',
        })
      },
      error: onSubscriptionError('gv'),
      complete: () => console.log('resolved gv'),
    },
  )
  // TODO: if user role is gaertner, do not import: lokalname, wgs84_lat, wgs84_long, lv95_x, lv95_y
  unsubscribe.herkunft = store.get(gqlWsClientAtom).subscribe(
    {
      query: `
        subscription Herkunft($where: herkunft_bool_exp) {
          herkunft(where: $where) {
            id
            __typename
            nr
            ${isNoGaertner ? 'lokalname' : ''}
            gemeinde
            kanton
            land
            bemerkungen
            ${isNoGaertner ? 'geom_point' : ''}
            ${isNoGaertner ? 'lv95_x' : ''}
            ${isNoGaertner ? 'lv95_y' : ''}
            ${isNoGaertner ? 'wgs84_lat' : ''}
            ${isNoGaertner ? 'wgs84_long' : ''}
            changed
            changed_by
            _rev
            _parent_rev
            _revisions
            _depth
            _conflicts
            _deleted
          }
        }
      `,
      variables: { where: { _rev_at: { _gt: herkunft_lastUpdated } } },
    },
    {
      next: (data) => {
        processSubscriptionResult({
          data: data.data.herkunft,
          table: 'herkunft',
        })
      },
      error: onSubscriptionError('herkunft'),
      complete: () => console.log('resolved herkunft'),
    },
  )
  unsubscribe.herkunft_file = store.get(gqlWsClientAtom).subscribe(
    {
      query: `
        subscription HerkunftFile($where: herkunft_file_bool_exp) {
          herkunft_file(where: $where) {
            id
            __typename
            herkunft_id
            file_id
            file_mime_type
            name
            beschreibung
            changed
            _rev_at
          }
        }
      `,
      variables: { where: { _rev_at: { _gt: herkunft_file_lastUpdated } } },
    },
    {
      next: (data) => {
        processSubscriptionResult({
          data: data.data.herkunft_file,
          table: 'herkunft_file',
        })
      },
      error: onSubscriptionError('herkunft_file'),
      complete: () => console.log('resolved herkunft_file'),
    },
  )
  unsubscribe.kultur = store.get(gqlWsClientAtom).subscribe(
    {
      query: `
        subscription Kultur($where: kultur_bool_exp) {
          kultur(where: $where) {
            id
            __typename
            art_id
            herkunft_id
            garten_id
            zwischenlager
            erhaltungskultur
            von_anzahl_individuen
            aktiv
            bemerkungen
            changed
            changed_by
            _rev
            _parent_rev
            _revisions
            _depth
            _conflicts
            _deleted
          }
        }
      `,
      variables: { where: { _rev_at: { _gt: kultur_lastUpdated } } },
    },
    {
      next: (data) => {
        processSubscriptionResult({
          data: data.data.kultur,
          table: 'kultur',
        })
      },
      error: onSubscriptionError('kultur'),
      complete: () => console.log('resolved kultur'),
    },
  )
  unsubscribe.kultur_file = store.get(gqlWsClientAtom).subscribe(
    {
      query: `
        subscription KulturFile($where: kultur_file_bool_exp) {
          kultur_file(where: $where) {
            id
            __typename
            kultur_id
            file_id
            file_mime_type
            name
            beschreibung
            changed
            _rev_at
          }
        }
      `,
      variables: { where: { _rev_at: { _gt: kultur_file_lastUpdated } } },
    },
    {
      next: (data) => {
        processSubscriptionResult({
          data: data.data.kultur_file,
          table: 'kultur_file',
        })
      },
      error: onSubscriptionError('kultur_file'),
      complete: () => console.log('resolved kultur_file'),
    },
  )
  unsubscribe.kultur_option = store.get(gqlWsClientAtom).subscribe(
    {
      query: `
        subscription KulturOption($where: kultur_option_bool_exp) {
          kultur_option(where: $where) {
            id
            __typename
            ev_datum
            ev_geplant
            ev_person_id
            ev_teilkultur_id
            tk
            tk_bemerkungen
            tz_andere_menge
            tz_auspflanzbereit_beschreibung
            tz_teilkultur_id
            tz_bemerkungen
            z_bemerkungen
            _rev
            _parent_rev
            _revisions
            _depth
            _conflicts
            _deleted
          }
        }
      `,
      variables: { where: { _rev_at: { _gt: kultur_option_lastUpdated } } },
    },
    {
      next: (data) => {
        processSubscriptionResult({
          data: data.data.kultur_option,
          table: 'kultur_option',
        })
      },
      error: onSubscriptionError('kultur_option'),
      complete: () => console.log('resolved kultur_option'),
    },
  )
  unsubscribe.kultur_qk = store.get(gqlWsClientAtom).subscribe(
    {
      query: `
        subscription KulturQk($where: kultur_qk_bool_exp) {
          kultur_qk(where: $where) {
            id
            __typename
            name
            titel
            beschreibung
            sort
            changed
            changed_by
            _rev
            _parent_rev
            _revisions
            _depth
            _conflicts
            _deleted
          }
        }
      `,
      variables: { where: { _rev_at: { _gt: kultur_qk_lastUpdated } } },
    },
    {
      next: (data) => {
        processSubscriptionResult({
          data: data.data.kultur_qk,
          table: 'kultur_qk',
        })
      },
      error: onSubscriptionError('kultur_qk'),
      complete: () => console.log('resolved kultur_qk'),
    },
  )
  unsubscribe.lieferung = store.get(gqlWsClientAtom).subscribe(
    {
      query: `
        subscription Lieferung($where: lieferung_bool_exp) {
          lieferung(where: $where) {
            id
            __typename
            sammel_lieferung_id
            art_id
            person_id
            von_sammlung_id
            von_kultur_id
            datum
            nach_kultur_id
            nach_ausgepflanzt
            von_anzahl_individuen
            anzahl_pflanzen
            anzahl_auspflanzbereit
            gramm_samen
            andere_menge
            geplant
            bemerkungen
            changed
            changed_by
            _rev
            _parent_rev
            _revisions
            _depth
            _conflicts
            _deleted
          }
        }
      `,
      variables: { where: { _rev_at: { _gt: lieferung_lastUpdated } } },
    },
    {
      next: (data) => {
        processSubscriptionResult({
          data: data.data.lieferung,
          table: 'lieferung',
        })
      },
      error: onSubscriptionError('lieferung'),
      complete: () => console.log('resolved lieferung'),
    },
  )
  unsubscribe.lieferung_file = store.get(gqlWsClientAtom).subscribe(
    {
      query: `
        subscription LieferungFile($where: lieferung_file_bool_exp) {
          lieferung_file(where: $where) {
            id
            __typename
            lieferung_id
            file_id
            file_mime_type
            name
            beschreibung
            changed
            _rev_at
          }
        }
      `,
      variables: { where: { _rev_at: { _gt: lieferung_file_lastUpdated } } },
    },
    {
      next: (data) => {
        processSubscriptionResult({
          data: data.data.lieferung_file,
          table: 'lieferung_file',
        })
      },
      error: onSubscriptionError('lieferung_file'),
      complete: () => console.log('resolved lieferung_file'),
    },
  )
  unsubscribe.person = store.get(gqlWsClientAtom).subscribe(
    {
      query: `
        subscription Person($where: person_bool_exp) {
          person(where: $where) {
            id
            __typename
            nr
            vorname
            name
            adresszusatz
            strasse
            plz
            ort
            telefon_privat
            telefon_geschaeft
            telefon_mobile
            email
            kein_email
            bemerkungen
            account_id
            user_role_id
            kommerziell
            info
            aktiv
            changed
            changed_by
            _rev
            _parent_rev
            _revisions
            _depth
            _conflicts
            _deleted
          }
        }
      `,
      variables: { where: { _rev_at: { _gt: person_lastUpdated } } },
    },
    {
      next: (data) => {
        processSubscriptionResult({
          data: data.data.person,
          table: 'person',
        })
      },
      error: onSubscriptionError('person'),
      complete: () => console.log('resolved person'),
    },
  )
  unsubscribe.person_file = store.get(gqlWsClientAtom).subscribe(
    {
      query: `
        subscription PersonFile($where: person_file_bool_exp) {
          person_file(where: $where) {
            id
            __typename
            person_id
            file_id
            file_mime_type
            name
            beschreibung
            changed
            _rev_at
          }
        }
      `,
      variables: { where: { _rev_at: { _gt: person_file_lastUpdated } } },
    },
    {
      next: (data) => {
        processSubscriptionResult({
          data: data.data.person_file,
          table: 'person_file',
        })
      },
      error: onSubscriptionError('person_file'),
      complete: () => console.log('resolved person_file'),
    },
  )
  unsubscribe.person_option = store.get(gqlWsClientAtom).subscribe(
    {
      query: `
        subscription PersonOption($where: person_option_bool_exp) {
          person_option(where: $where) {
            id
            __typename
            ar_name_deutsch
            ga_strasse
            ga_plz
            ga_ort
            ga_geom_point
            ga_lat_lng
            ga_aktiv
            ga_bemerkungen
            hk_kanton
            hk_land
            hk_bemerkungen
            hk_geom_point
            ku_zwischenlager
            ku_erhaltungskultur
            li_show_sl_felder
            li_show_sl
            sl_show_empty_when_next_to_li
            sl_auto_copy_edits
            tree_kultur
            tree_teilkultur
            tree_zaehlung
            tree_lieferung
            tree_event
            art_qk_choosen
            kultur_qk_choosen
            _rev
            _parent_rev
            _revisions
            _depth
            _conflicts
            _deleted
          }
        }
      `,
      variables: { where: { _rev_at: { _gt: person_option_lastUpdated } } },
    },
    {
      next: (data) => {
        processSubscriptionResult({
          data: data.data.person_option,
          table: 'person_option',
        })
      },
      error: onSubscriptionError('person_option'),
      complete: () => console.log('resolved person_option'),
    },
  )
  unsubscribe.sammel_lieferung = store.get(gqlWsClientAtom).subscribe(
    {
      query: `
        subscription SammelLieferung($where: sammel_lieferung_bool_exp) {
          sammel_lieferung(where: $where) {
            id
            __typename
            art_id
            person_id
            von_sammlung_id
            von_kultur_id
            datum
            nach_kultur_id
            nach_ausgepflanzt
            von_anzahl_individuen
            anzahl_pflanzen
            anzahl_auspflanzbereit
            gramm_samen
            andere_menge
            geplant
            bemerkungen
            _rev
            _parent_rev
            _revisions
            _depth
            _conflicts
            _deleted
          }
        }
      `,
      variables: { where: { _rev_at: { _gt: sammel_lieferung_lastUpdated } } },
    },
    {
      next: (data) => {
        processSubscriptionResult({
          data: data.data.sammel_lieferung,
          table: 'sammel_lieferung',
        })
      },
      error: onSubscriptionError('sammel_lieferung'),
      complete: () => console.log('resolved sammel_lieferung'),
    },
  )
  unsubscribe.sammlung = store.get(gqlWsClientAtom).subscribe(
    {
      query: `
        subscription Sammlung($where: sammlung_bool_exp) {
          sammlung(where: $where) {
            id
            __typename
            art_id
            person_id
            herkunft_id
            nr
            datum
            von_anzahl_individuen
            anzahl_pflanzen
            gramm_samen
            andere_menge
            geplant
            bemerkungen
            geom_point
            lv95_x
            lv95_y
            wgs84_lat
            wgs84_long
            changed
            changed_by
            _rev
            _parent_rev
            _revisions
            _depth
            _conflicts
            _deleted
          }
        }
      `,
      variables: { where: { _rev_at: { _gt: sammlung_lastUpdated } } },
    },
    {
      next: (data) => {
        processSubscriptionResult({
          data: data.data.sammlung,
          table: 'sammlung',
        })
      },
      error: onSubscriptionError('sammlung'),
      complete: () => console.log('resolved sammlung'),
    },
  )
  unsubscribe.sammlung_file = store.get(gqlWsClientAtom).subscribe(
    {
      query: `
        subscription SammlungFile($where: sammlung_file_bool_exp) {
          sammlung_file(where: $where) {
            id
            __typename
            sammlung_id
            file_id
            file_mime_type
            name
            beschreibung
            changed
            _rev_at
          }
        }
      `,
      variables: { where: { _rev_at: { _gt: sammlung_file_lastUpdated } } },
    },
    {
      next: (data) => {
        processSubscriptionResult({
          data: data.data.sammlung_file,
          table: 'sammlung_file',
        })
      },
      error: onSubscriptionError('sammlung_file'),
      complete: () => console.log('resolved sammlung_file'),
    },
  )
  unsubscribe.teilkultur = store.get(gqlWsClientAtom).subscribe(
    {
      query: `
        subscription Teilkultur($where: teilkultur_bool_exp) {
          teilkultur(where: $where) {
            id
            __typename
            kultur_id
            name
            ort1
            ort2
            ort3
            bemerkungen
            changed
            changed_by
            _rev
            _parent_rev
            _revisions
            _depth
            _conflicts
            _deleted
          }
        }
      `,
      variables: { where: { _rev_at: { _gt: teilkultur_lastUpdated } } },
    },
    {
      next: (data) => {
        processSubscriptionResult({
          data: data.data.teilkultur,
          table: 'teilkultur',
        })
      },
      error: onSubscriptionError('teilkultur'),
      complete: () => console.log('resolved teilkultur'),
    },
  )
  unsubscribe.teilzaehlung = store.get(gqlWsClientAtom).subscribe(
    {
      query: `
        subscription Teilzaehlung($where: teilzaehlung_bool_exp) {
          teilzaehlung(where: $where) {
            id
            __typename
            zaehlung_id
            teilkultur_id
            anzahl_pflanzen
            anzahl_auspflanzbereit
            anzahl_mutterpflanzen
            andere_menge
            auspflanzbereit_beschreibung
            bemerkungen
            changed
            changed_by
            _rev
            _parent_rev
            _revisions
            _depth
            _conflicts
            _deleted
          }
        }
      `,
      variables: { where: { _rev_at: { _gt: teilzaehlung_lastUpdated } } },
    },
    {
      next: (data) => {
        processSubscriptionResult({
          data: data.data.teilzaehlung,
          table: 'teilzaehlung',
        })
      },
      error: onSubscriptionError('teilzaehlung'),
      complete: () => console.log('resolved teilzaehlung'),
    },
  )
  unsubscribe.user_role = store.get(gqlWsClientAtom).subscribe(
    {
      query: `
        subscription UserRole($where: user_role_bool_exp) {
          user_role(where: $where) {
            id
            __typename
            name
            label
            sort
            comment
            changed
          }
        }
      `,
      variables: { where: { _rev_at: { _gt: user_role_lastUpdated } } },
    },
    {
      next: (data) => {
        processSubscriptionResult({
          data: data.data.user_role,
          table: 'user_role',
        })
      },
      error: onSubscriptionError('user_role'),
      complete: () => console.log('resolved user_role'),
    },
  )
  unsubscribe.zaehlung = store.get(gqlWsClientAtom).subscribe(
    {
      query: `
        subscription Zaehlung($where: zaehlung_bool_exp) {
          zaehlung(where: $where) {
            id
            __typename
            kultur_id
            datum
            prognose
            bemerkungen
            changed
            changed_by
            _rev
            _parent_rev
            _revisions
            _depth
            _conflicts
            _deleted
          }
        }
      `,
      variables: { where: { _rev_at: { _gt: zaehlung_lastUpdated } } },
    },
    {
      next: (data) => {
        processSubscriptionResult({
          data: data.data.zaehlung,
          table: 'zaehlung',
        })
      },
      error: onSubscriptionError('zaehlung'),
      complete: () => console.log('resolved zaehlung'),
    },
  )
  return unsubscribe
}
