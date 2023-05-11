import processSubscriptionResult from './processSubscriptionResult'

const initializeSubscriptions = ({ store, userRole }) => {
  const isNoGaertner = userRole !== 'gaertner'
  console.log('initializing subscriptions', { userRole, isNoGaertner })

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
  unsubscribe.ae_art = store.gqlWsClient.subscribe(
    {
      query: `
        subscription AeArt($where: ae_art_bool_exp) {
          ae_art(where: $where) {
            id
            __typename
            name
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
          store,
        })
      },
      error: (error) => {
        // if error.message contains JWT, do what?
        // re-subscribe
        console.log('subscribeAeArt, onError:', error)
        // signOut()
        // need to retry
        setTimeout(() => store.incrementWsReconnectCount(), 3000)
      },
      complete: () => console.log('resolved ae_art'),
    },
  )
  unsubscribe.art = store.gqlWsClient.subscribe(
    {
      query: `
        subscription Art($where: art_bool_exp) {
          art(where: $where) {
            id
            __typename
            ae_id
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
          store,
        })
      },
      error: (error) => console.log('subscribeArt, onError:', error),
      complete: () => console.log('resolved art'),
    },
  )
  unsubscribe.art_file = store.gqlWsClient.subscribe(
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
          store,
        })
      },
      error: (error) => console.log('subscribeArtFile, onError:', error),
      complete: () => console.log('resolved art_file'),
    },
  )
  unsubscribe.art_qk = store.gqlWsClient.subscribe(
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
          store,
        })
      },
      error: (error) => console.log('subscribeArtQk, onError:', error),
      complete: () => console.log('resolved art_qk'),
    },
  )
  unsubscribe.av = store.gqlWsClient.subscribe(
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
          store,
        })
      },
      error: (error) => console.log('subscribeAv, onError:', error),
      complete: () => console.log('resolved av'),
    },
  )
  unsubscribe.event = store.gqlWsClient.subscribe(
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
          store,
        })
      },
      error: (error) => console.log('subscribeEvent, onError:', error),
      complete: () => console.log('resolved event'),
    },
  )
  unsubscribe.garten = store.gqlWsClient.subscribe(
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
          store,
        })
      },
      error: (error) => console.log('subscribeGarten, onError:', error),
      complete: () => console.log('resolved garten'),
    },
  )
  unsubscribe.garten_file = store.gqlWsClient.subscribe(
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
          store,
        })
      },
      error: (error) => console.log('subscribeGartenFile, onError:', error),
      complete: () => console.log('resolved garten_file'),
    },
  )
  unsubscribe.gv = store.gqlWsClient.subscribe(
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
          store,
        })
      },
      error: (error) => console.log('subscribeGv, onError:', error),
      complete: () => console.log('resolved gv'),
    },
  )
  // TODO: if user role is gaertner, do not import: lokalname, wgs84_lat, wgs84_long, lv95_x, lv95_y
  unsubscribe.herkunft = store.gqlWsClient.subscribe(
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
          store,
        })
      },
      error: (error) => console.log('subscribeHerkunft, onError:', error),
      complete: () => console.log('resolved herkunft'),
    },
  )
  unsubscribe.herkunft_file = store.gqlWsClient.subscribe(
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
          store,
        })
      },
      error: (error) => console.log('subscribeHerkunftFile, onError:', error),
      complete: () => console.log('resolved herkunft_file'),
    },
  )
  unsubscribe.kultur = store.gqlWsClient.subscribe(
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
          store,
        })
      },
      error: (error) => console.log('subscribeKultur, onError:', error),
      complete: () => console.log('resolved kultur'),
    },
  )
  unsubscribe.kultur_file = store.gqlWsClient.subscribe(
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
          store,
        })
      },
      error: (error) => console.log('subscribeKulturFile, onError:', error),
      complete: () => console.log('resolved kultur_file'),
    },
  )
  unsubscribe.kultur_option = store.gqlWsClient.subscribe(
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
          store,
        })
      },
      error: (error) => console.log('subscribeKulturOption, onError:', error),
      complete: () => console.log('resolved kultur_option'),
    },
  )
  unsubscribe.kultur_qk = store.gqlWsClient.subscribe(
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
          store,
        })
      },
      error: (error) => console.log('subscribeKulturQk, onError:', error),
      complete: () => console.log('resolved kultur_qk'),
    },
  )
  unsubscribe.lieferung = store.gqlWsClient.subscribe(
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
          store,
        })
      },
      error: (error) => console.log('subscribeLieferung, onError:', error),
      complete: () => console.log('resolved lieferung'),
    },
  )
  unsubscribe.lieferung_file = store.gqlWsClient.subscribe(
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
          store,
        })
      },
      error: (error) => console.log('subscribeLieferungFile, onError:', error),
      complete: () => console.log('resolved lieferung_file'),
    },
  )
  unsubscribe.person = store.gqlWsClient.subscribe(
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
          store,
        })
      },
      error: (error) => console.log('subscribePerson, onError:', error),
      complete: () => console.log('resolved person'),
    },
  )
  unsubscribe.person_file = store.gqlWsClient.subscribe(
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
          store,
        })
      },
      error: (error) => console.log('subscribePersonFile, onError:', error),
      complete: () => console.log('resolved person_file'),
    },
  )
  unsubscribe.person_option = store.gqlWsClient.subscribe(
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
          store,
        })
      },
      error: (error) => console.log('subscribePersonOption, onError:', error),
      complete: () => console.log('resolved person_option'),
    },
  )
  unsubscribe.sammel_lieferung = store.gqlWsClient.subscribe(
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
          store,
        })
      },
      error: (error) =>
        console.log('subscribeSammelLieferung, onError:', error),
      complete: () => console.log('resolved sammel_lieferung'),
    },
  )
  unsubscribe.sammlung = store.gqlWsClient.subscribe(
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
          store,
        })
      },
      error: (error) => console.log('subscribeSammlung, onError:', error),
      complete: () => console.log('resolved sammlung'),
    },
  )
  unsubscribe.sammlung_file = store.gqlWsClient.subscribe(
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
          store,
        })
      },
      error: (error) => console.log('subscribeSammlungFile, onError:', error),
      complete: () => console.log('resolved sammlung_file'),
    },
  )
  unsubscribe.teilkultur = store.gqlWsClient.subscribe(
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
          store,
        })
      },
      error: (error) => console.log('subscribeTeilkultur, onError:', error),
      complete: () => console.log('resolved teilkultur'),
    },
  )
  unsubscribe.teilzaehlung = store.gqlWsClient.subscribe(
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
          store,
        })
      },
      error: (error) => console.log('subscribeTeilzaehlung, onError:', error),
      complete: () => console.log('resolved teilzaehlung'),
    },
  )
  unsubscribe.user_role = store.gqlWsClient.subscribe(
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
          store,
        })
      },
      error: (error) => console.log('subscribeUserRole, onError:', error),
      complete: () => console.log('resolved user_role'),
    },
  )
  unsubscribe.zaehlung = store.gqlWsClient.subscribe(
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
          store,
        })
      },
      error: (error) => console.log('subscribeZaehlung, onError:', error),
      complete: () => console.log('resolved zaehlung'),
    },
  )
  return unsubscribe
}

export default initializeSubscriptions
