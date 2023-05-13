import gql from 'graphql-tag'

export const art = gql`
  fragment ArtFields on art {
    id
    __typename
    ae_id
    set
    changed
    changed_by
    _rev
    _parent_rev
    _revisions
    _depth
    _conflicts
    _deleted
  }
`
export const artRev = gql`
  fragment ArtRevFields on art_rev {
    id
    #__typename
    art_id
    ae_id
    set
    changed
    changed_by
    _rev
    _parent_rev
    _revisions
    _depth
    _deleted
  }
`
export const artQk = gql`
  fragment ArtQkFields on art_qk {
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
`
export const artQkRev = gql`
  fragment ArtQkRevFields on art_qk_rev {
    id
    #__typename
    art_qk_id
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
    _deleted
  }
`
export const artFile = gql`
  fragment ArtFileFields on art_file {
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
`
export const aeArt = gql`
  fragment AeArtFields on ae_art {
    id
    __typename
    name
    taxonomy
    changed
  }
`
export const av = gql`
  fragment AvFields on av {
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
`
export const avRev = gql`
  fragment AvRevFields on av_rev {
    id
    av_id
    #__typename
    art_id
    person_id
    changed
    changed_by
    _rev
    _parent_rev
    _revisions
    _depth
    _deleted
  }
`
export const event = gql`
  fragment EventFields on event {
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
`
export const eventRev = gql`
  fragment EventRevFields on event_rev {
    id
    event_id
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
    _deleted
  }
`
export const garten = gql`
  fragment GartenFields on garten {
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
`
export const gartenRev = gql`
  fragment GartenRevFields on garten_rev {
    id
    garten_id
    __typename
    garten_id
    name
    person_id
    strasse
    plz
    ort
    aktiv
    bemerkungen
    geom_point
    changed
    changed_by
    _rev
    _parent_rev
    _revisions
    _depth
    _deleted
  }
`
export const gartenFile = gql`
  fragment GartenFileFields on garten_file {
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
`
export const gv = gql`
  fragment GvFields on gv {
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
`
export const gvRev = gql`
  fragment GvRevFields on gv_rev {
    id
    gv_id
    #__typename
    garten_id
    person_id
    changed
    changed_by
    _rev
    _parent_rev
    _revisions
    _depth
    _deleted
  }
`
export const herkunft = gql`
  fragment HerkunftFields on herkunft {
    id
    __typename
    nr
    lokalname
    gemeinde
    kanton
    land
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
`
export const herkunftRev = gql`
  fragment HerkunftRevFields on herkunft_rev {
    id
    #__typename
    herkunft_id # <<
    nr
    lokalname
    gemeinde
    kanton
    land
    bemerkungen
    geom_point
    changed
    changed_by
    _rev
    _parent_rev
    _revisions
    _depth # no conflicts
    _deleted
  }
`
export const herkunftFile = gql`
  fragment HerkunftFileFields on herkunft_file {
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
`
export const kultur = gql`
  fragment KulturFields on kultur {
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
`
export const kulturRev = gql`
  fragment KulturRevFields on kultur_rev {
    id
    kultur_id
    #__typename
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
    _deleted
  }
`
export const kulturQk = gql`
  fragment KulturQkFields on kultur_qk {
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
`
export const kulturQkRev = gql`
  fragment KulturQkRevFields on kultur_qk_rev {
    id
    kultur_qk_id
    #__typename
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
    _deleted
  }
`
export const kulturFile = gql`
  fragment KulturFileFields on kultur_file {
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
`
export const kulturOption = gql`
  fragment KulturOptionFields on kultur_option {
    id
    __typename
    ev_datum
    ev_geplant
    ev_person_id
    ev_teilkultur_id
    tk
    tk_bemerkungen
    tz_andere_menge
    # tz_anzahl_mutterpflanzen is not used any more
    #tz_anzahl_mutterpflanzen
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
`
export const kulturOptionRev = gql`
  fragment KulturOptionRevFields on kultur_option_rev {
    id
    kultur_id
    #__typename
    ev_datum
    ev_geplant
    ev_person_id
    ev_teilkultur_id
    tk
    tk_bemerkungen
    tz_andere_menge
    # tz_anzahl_mutterpflanzen is not used any more
    #tz_anzahl_mutterpflanzen
    tz_auspflanzbereit_beschreibung
    tz_teilkultur_id
    tz_bemerkungen
    z_bemerkungen
    _rev
    _parent_rev
    _revisions
    _depth
    _deleted
  }
`
export const lieferung = gql`
  fragment LieferungFields on lieferung {
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
`
export const lieferungRev = gql`
  fragment LieferungRevFields on lieferung_rev {
    id
    #__typename
    lieferung_id
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
    _deleted
  }
`
export const lieferungFile = gql`
  fragment LieferungFileFields on lieferung_file {
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
`
export const person = gql`
  fragment PersonFields on person {
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
`
export const personRev = gql`
  fragment PersonRevFields on person_rev {
    id
    person_id
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
    _deleted
  }
`
export const personOption = gql`
  fragment PersonOptionFields on person_option {
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
`
export const personOptionRev = gql`
  fragment PersonOptionRevFields on person_option_rev {
    id
    person_id
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
    _deleted
  }
`
export const personFile = gql`
  fragment PersonFileFields on person_file {
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
`
export const sammelLieferung = gql`
  fragment SammelLieferungFields on sammel_lieferung {
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
`
export const sammelLieferungRev = gql`
  fragment SammelLieferungRevFields on sammel_lieferung_rev {
    id
    sammel_lieferung_id
    #__typename
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
    _deleted
  }
`
export const sammlung = gql`
  fragment SammlungFields on sammlung {
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
`
export const sammlungRev = gql`
  fragment SammlungRevFields on sammlung_rev {
    id
    sammlung_id
    #__typename
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
    changed
    changed_by
    _rev
    _parent_rev
    _revisions
    _depth
    _deleted
  }
`
export const sammlungFile = gql`
  fragment SammlungFileFields on sammlung_file {
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
`
export const teilkultur = gql`
  fragment TeilkulturFields on teilkultur {
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
`
export const teilkulturRev = gql`
  fragment TeilkulturRevFields on teilkultur_rev {
    id
    teilkultur_id
    #__typename
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
    _deleted
  }
`
export const teilzaehlung = gql`
  fragment TeilzaehlungFields on teilzaehlung {
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
`
export const teilzaehlungRev = gql`
  fragment TeilzaehlungRevFields on teilzaehlung_rev {
    id
    teilzaehlung_id
    #__typename
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
    _deleted
  }
`
export const userRole = gql`
  fragment UserRoleFields on user_role {
    id
    __typename
    name
    label
    sort
    comment
    changed
  }
`
export const zaehlung = gql`
  fragment ZaehlungFields on zaehlung {
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
`
export const zaehlungRev = gql`
  fragment ZaehlungRevFields on zaehlung_rev {
    id
    zaehlung_id
    #__typename
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
    _deleted
  }
`
