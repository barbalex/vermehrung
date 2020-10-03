import { selectFromart } from '../models/artModel.base'
import { selectFromart_qk } from '../models/art_qkModel.base'
import { selectFromart_qk_choosen } from '../models/art_qk_choosenModel.base'
import { selectFromart_file } from '../models/art_fileModel.base'
import { selectFromae_art } from '../models/ae_artModel.base'
import { selectFromav } from '../models/avModel.base'
import { selectFromevent } from '../models/eventModel.base'
import { selectFromgarten } from '../models/gartenModel.base'
import { selectFromgarten_file } from '../models/garten_fileModel.base'
import { selectFromgv } from '../models/gvModel.base'
import { selectFromherkunft } from '../models/herkunftModel.base'
import { selectFromherkunft_file } from '../models/herkunft_fileModel.base'
import { selectFromkultur } from '../models/kulturModel.base'
import { selectFromkultur_qk } from '../models/kultur_qkModel.base'
import { selectFromkultur_qk_choosen } from '../models/kultur_qk_choosenModel.base'
import { selectFromkultur_file } from '../models/kultur_fileModel.base'
import { selectFromkultur_option } from '../models/kultur_optionModel.base'
import { selectFromlieferung } from '../models/lieferungModel.base'
import { selectFromlieferung_file } from '../models/lieferung_fileModel.base'
import { selectFromperson } from '../models/personModel.base'
import { selectFromperson_option } from '../models/person_optionModel.base'
import { selectFromperson_file } from '../models/person_fileModel.base'
import { selectFromsammel_lieferung } from '../models/sammel_lieferungModel.base'
import { selectFromsammlung } from '../models/sammlungModel.base'
import { selectFromsammlung_file } from '../models/sammlung_fileModel.base'
import { selectFromteilkultur } from '../models/teilkulturModel.base'
import { selectFromteilzaehlung } from '../models/teilzaehlungModel.base'
import { selectFromuser_role } from '../models/user_roleModel.base'
import { selectFromzaehlung } from '../models/zaehlungModel.base'

let AE_ART_FRAGMENT
let ART_FILE_FRAGMENT
let ART_FRAGMENT
let ART_QK_CHOOSEN_FRAGMENT
let ART_QK_FRAGMENT
let ART_SUMS_FRAGMENT
let AV_FRAGMENT
let EVENT_FRAGMENT
let GARTEN_FILE_FRAGMENT
let GARTEN_FRAGMENT
let GV_FRAGMENT
let HERKUNFT_FILE_FRAGMENT
let HERKUNFT_FRAGMENT
let KULTUR_FILE_FRAGMENT
let KULTUR_FRAGMENT
let KULTUR_OPTION_FRAGMENT
let KULTUR_QK_CHOOSEN_FRAGMENT
let KULTUR_QK_FRAGMENT
let LIEFERUNG_FILE_FRAGMENT
let LIEFERUNG_FRAGMENT
let PERSON_FILE_FRAGMENT
let PERSON_FRAGMENT
let PERSON_OPTION_FRAGMENT
let SAMMEL_LIEFERUNG_FRAGMENT
let SAMMLUNG_FILE_FRAGMENT
let SAMMLUNG_FRAGMENT
let TEILKULTUR_FRAGMENT
let TEILZAEHLUNG_FRAGMENT
let USER_ROLE_FRAGMENT
let ZAEHLUNG_FRAGMENT

ART_FRAGMENT = selectFromart()
  .id.ae_id.changed.changed_by._rev._parent_rev._revisions._depth._conflicts._deleted.art_ae_art()
  .kulturs(() => KULTUR_FRAGMENT)
  .lieferungs(() => LIEFERUNG_FRAGMENT)
  .sammel_lieferungs(() => SAMMEL_LIEFERUNG_FRAGMENT)
  .toString()

ART_QK_FRAGMENT = selectFromart_qk()
  .id.name.titel.beschreibung.sort.changed.changed_by._rev._parent_rev._revisions._depth._conflicts._deleted.art_qk_choosen()
  .toString()

ART_QK_CHOOSEN_FRAGMENT = selectFromart_qk_choosen()
  .id.art_id.qk_name.choosen.changed.changed_by._rev._parent_rev._revisions._depth._conflicts._deleted.art_qk()
  .toString()

ART_FILE_FRAGMENT = selectFromart_file().id.art_id.file_id.file_mime_type.name.beschreibung.toString()

AE_ART_FRAGMENT = selectFromae_art().id.name.ae_art_art().toString()

AV_FRAGMENT = selectFromav().id.art_id.person_id.changed.changed_by._rev._parent_rev._revisions._depth._conflicts._deleted.toString()

EVENT_FRAGMENT = selectFromevent().id.kultur_id.teilkultur_id.person_id.beschreibung.geplant.datum.changed.changed_by._rev._parent_rev._revisions._depth._conflicts._deleted.toString()

GARTEN_FRAGMENT = selectFromgarten()
  .id.name.person_id.strasse.plz.ort.aktiv.bemerkungen.lv95_x.lv95_y.wgs84_lat.wgs84_long.changed.changed_by._rev._parent_rev._revisions._depth._conflicts._deleted.kulturs(
    () => KULTUR_FRAGMENT,
  )
  .toString()

GARTEN_FILE_FRAGMENT = selectFromgarten_file().id.garten_id.file_id.file_mime_type.name.beschreibung.toString()

GV_FRAGMENT = selectFromgv().id.garten_id.person_id.changed.changed_by._rev._parent_rev._revisions._depth._conflicts._deleted.toString()

HERKUNFT_FRAGMENT = selectFromherkunft()
  .id.nr.lokalname.gemeinde.kanton.land.bemerkungen.lv95_x.lv95_y.wgs84_lat.wgs84_long.changed.changed_by._rev._parent_rev._revisions._depth._conflicts._deleted.kulturs(
    () => KULTUR_FRAGMENT,
  )
  .toString()

HERKUNFT_FILE_FRAGMENT = selectFromherkunft_file().id.herkunft_id.file_id.file_mime_type.name.beschreibung.toString()

KULTUR_FRAGMENT = selectFromkultur()
  .id.art_id.herkunft_id.garten_id.zwischenlager.erhaltungskultur.von_anzahl_individuen.aktiv.bemerkungen.changed.changed_by._rev._parent_rev._revisions._depth._conflicts._deleted.lieferungsByNachKulturId(
    () => LIEFERUNG_FRAGMENT,
  )
  .lieferungsByVonKulturId(() => LIEFERUNG_FRAGMENT)
  .sammelLieferungsByNachKulturId(() => SAMMEL_LIEFERUNG_FRAGMENT)
  .sammel_lieferungs(() => SAMMEL_LIEFERUNG_FRAGMENT)
  .zaehlungs(() => ZAEHLUNG_FRAGMENT)
  .toString()

KULTUR_QK_FRAGMENT = selectFromkultur_qk().id.name.titel.beschreibung.sort.changed.changed_by._rev._parent_rev._revisions._depth._conflicts._deleted.toString()

KULTUR_QK_CHOOSEN_FRAGMENT = selectFromkultur_qk_choosen()
  .id.kultur_id.qk_name.choosen.changed.changed_by._rev._parent_rev._revisions._depth._conflicts._deleted.kultur_qk()
  .toString()

KULTUR_FILE_FRAGMENT = selectFromkultur_file().id.kultur_id.file_id.file_mime_type.name.beschreibung.toString()

KULTUR_OPTION_FRAGMENT = selectFromkultur_option().id.ev_datum.ev_geplant.ev_person_id.ev_teilkultur_id.tk.tk_bemerkungen.tz_andere_menge.tz_anzahl_mutterpflanzen.tz_auspflanzbereit_beschreibung.tz_teilkultur_id.tz_bemerkungen.z_bemerkungen._rev._parent_rev._revisions._depth._conflicts._deleted.toString()

LIEFERUNG_FRAGMENT = selectFromlieferung()
  .id.sammel_lieferung_id.art_id.person_id.von_sammlung_id.von_kultur_id.datum.nach_kultur_id.nach_ausgepflanzt.von_anzahl_individuen.anzahl_pflanzen.anzahl_auspflanzbereit.gramm_samen.andere_menge.geplant.bemerkungen.changed.changed_by._rev._parent_rev._revisions._depth._conflicts._deleted.kulturByNachKulturId(
    () => KULTUR_FRAGMENT,
  )
  .kulturByVonKulturId(() => KULTUR_FRAGMENT)
  .sammel_lieferung(() => SAMMEL_LIEFERUNG_FRAGMENT)
  .toString()

LIEFERUNG_FILE_FRAGMENT = selectFromlieferung_file().id.lieferung_id.file_id.file_mime_type.name.beschreibung.toString()

PERSON_FRAGMENT = selectFromperson()
  .id.nr.vorname.name.adresszusatz.strasse.plz.ort.telefon_privat.telefon_geschaeft.telefon_mobile.email.kein_email.bemerkungen.account_id.user_role.kommerziell.info.aktiv.changed.changed_by._rev._parent_rev._revisions._depth._conflicts._deleted.lieferungs(
    () => LIEFERUNG_FRAGMENT,
  )
  .sammel_lieferungs(() => SAMMEL_LIEFERUNG_FRAGMENT)
  .toString()

PERSON_OPTION_FRAGMENT = selectFromperson_option().id.ar_name_deutsch.ga_strasse.ga_plz.ga_ort.ga_geom_point.ga_lat_lng.ga_aktiv.ga_bemerkungen.hk_kanton.hk_land.hk_bemerkungen.hk_geom_point.ku_zwischenlager.ku_erhaltungskultur.li_show_sl_felder.li_show_sl.sl_show_empty_when_next_to_li.sl_auto_copy_edits.tree_kultur.tree_teilkultur.tree_zaehlung.tree_lieferung.tree_event._rev._parent_rev._revisions._depth._conflicts._deleted.toString()

PERSON_FILE_FRAGMENT = selectFromperson_file().id.person_id.file_id.file_mime_type.name.beschreibung.toString()

SAMMEL_LIEFERUNG_FRAGMENT = selectFromsammel_lieferung()
  .id.art_id.person_id.von_sammlung_id.von_kultur_id.datum.nach_kultur_id.nach_ausgepflanzt.von_anzahl_individuen.anzahl_pflanzen.anzahl_auspflanzbereit.gramm_samen.andere_menge.geplant.bemerkungen._rev._parent_rev._revisions._depth._conflicts._deleted.lieferungs(
    () => LIEFERUNG_FRAGMENT,
  )
  .kulturByVonKulturId(() => KULTUR_FRAGMENT)
  .kulturByNachKulturId(() => KULTUR_FRAGMENT)
  .toString()

SAMMLUNG_FRAGMENT = selectFromsammlung()
  .id.art_id.person_id.herkunft_id.nr.datum.von_anzahl_individuen.anzahl_pflanzen.gramm_samen.andere_menge.geplant.bemerkungen.lv95_x.lv95_y.wgs84_lat.wgs84_long.changed.changed_by._rev._parent_rev._revisions._depth._conflicts._deleted.lieferungs(
    () => LIEFERUNG_FRAGMENT,
  )
  .sammel_lieferungs(() => SAMMEL_LIEFERUNG_FRAGMENT)
  .toString()

SAMMLUNG_FILE_FRAGMENT = selectFromsammlung_file().id.sammlung_id.file_id.file_mime_type.name.beschreibung.toString()

TEILKULTUR_FRAGMENT = selectFromteilkultur().id.kultur_id.name.ort1.ort2.ort3.bemerkungen.changed.changed_by._rev._parent_rev._revisions._depth._conflicts._deleted.toString()

TEILZAEHLUNG_FRAGMENT = selectFromteilzaehlung().id.zaehlung_id.teilkultur_id.anzahl_pflanzen.anzahl_auspflanzbereit.anzahl_mutterpflanzen.andere_menge.auspflanzbereit_beschreibung.bemerkungen.changed.changed_by._rev._parent_rev._revisions._depth._conflicts._deleted.toString()

USER_ROLE_FRAGMENT = selectFromuser_role().id.name.label.sort.comment.toString()

ZAEHLUNG_FRAGMENT = selectFromzaehlung()
  .id.kultur_id.datum.prognose.bemerkungen.changed.changed_by._rev._parent_rev._revisions._depth._conflicts._deleted.teilzaehlungs_aggregate(
    (t) =>
      t.aggregate((ag) =>
        ag.sum(
          (s) => s.anzahl_pflanzen.anzahl_auspflanzbereit.anzahl_mutterpflanzen,
        ),
      ),
  )
  .toString()

export {
  AE_ART_FRAGMENT,
  ART_FILE_FRAGMENT,
  ART_FRAGMENT,
  ART_QK_CHOOSEN_FRAGMENT,
  ART_QK_FRAGMENT,
  ART_SUMS_FRAGMENT,
  AV_FRAGMENT,
  EVENT_FRAGMENT,
  GARTEN_FILE_FRAGMENT,
  GARTEN_FRAGMENT,
  GV_FRAGMENT,
  HERKUNFT_FILE_FRAGMENT,
  HERKUNFT_FRAGMENT,
  KULTUR_FILE_FRAGMENT,
  KULTUR_FRAGMENT,
  KULTUR_OPTION_FRAGMENT,
  KULTUR_QK_CHOOSEN_FRAGMENT,
  KULTUR_QK_FRAGMENT,
  LIEFERUNG_FILE_FRAGMENT,
  LIEFERUNG_FRAGMENT,
  PERSON_FILE_FRAGMENT,
  PERSON_FRAGMENT,
  PERSON_OPTION_FRAGMENT,
  SAMMEL_LIEFERUNG_FRAGMENT,
  SAMMLUNG_FILE_FRAGMENT,
  SAMMLUNG_FRAGMENT,
  TEILKULTUR_FRAGMENT,
  TEILZAEHLUNG_FRAGMENT,
  USER_ROLE_FRAGMENT,
  ZAEHLUNG_FRAGMENT,
}
