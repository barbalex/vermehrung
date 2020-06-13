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

export const ART_FRAGMENT = selectFromart()
  .id.ae_id.changed.changed_by._rev._parent_rev._revisions._depth._conflicts._deleted.art_ae_art()
  .art_files()
  .art_qk_choosens()
  .art_sums()
  .avs()
  .kulturs()
  .lieferungs()
  .sammel_lieferungs()
  .sammlungs()
  .toString()

export const ART_QK_FRAGMENT = selectFromart_qk().id.name.titel.beschreibung.sort.toString()

export const ART_QK_CHOOSEN_FRAGMENT = selectFromart_qk_choosen().id.art_id.qk_name.toString()

export const ART_FILE_FRAGMENT = selectFromart_file().id.art_id.file_id.file_mime_type.name.beschreibung.toString()

export const AE_ART_FRAGMENT = selectFromae_art().id.name.toString()

export const AV_FRAGMENT = selectFromav()
  .id.art_id.person_id.art()
  .person()
  .toString()

export const EVENT_FRAGMENT = selectFromevent()
  .id.kultur_id.teilkultur_id.person_id.beschreibung.geplant.datum.changed.changed_by._rev._parent_rev._revisions._depth._conflicts._deleted.kultur()
  .teilkultur()
  .person()
  .toString()

export const GARTEN_FRAGMENT = selectFromgarten()
  .id.name.person_id.strasse.plz.ort.aktiv.bemerkungen.lv95_x.lv95_y.wgs84_lat.wgs84_long.changed.changed_by._rev._parent_rev._revisions._depth._conflicts._deleted.person()
  .garten_files()
  .toString()

export const GARTEN_FILE_FRAGMENT = selectFromgarten_file().id.garten_id.file_id.file_mime_type.name.beschreibung.toString()

export const GV_FRAGMENT = selectFromgv()
  .id.garten_id.person_id.garten()
  .person()
  .toString()

export const HERKUNFT_FRAGMENT = selectFromherkunft().id.nr.lokalname.gemeinde.kanton.land.bemerkungen.lv95_x.lv95_y.wgs84_lat.wgs84_long.changed.changed_by._rev._parent_rev._revisions._depth._conflicts._deleted.toString()

export const HERKUNFT_FILE_FRAGMENT = selectFromherkunft_file().id.herkunft_id.file_id.file_mime_type.name.beschreibung.toString()

export const KULTUR_FRAGMENT = selectFromkultur()
  .id.art_id.herkunft_id.garten_id.zwischenlager.erhaltungskultur.von_anzahl_individuen.aktiv.bemerkungen.changed.changed_by._rev._parent_rev._revisions._depth._conflicts._deleted.art()
  .herkunft()
  .garten()
  .kultur_files()
  .kultur_option()
  .toString()

export const KULTUR_QK_FRAGMENT = selectFromkultur_qk().id.name.titel.beschreibung.sort.toString()

export const KULTUR_QK_CHOOSEN_FRAGMENT = selectFromkultur_qk_choosen()
  .id.kultur_id.qk_name.kultur()
  .toString()

export const KULTUR_FILE_FRAGMENT = selectFromkultur_file()
  .id.kultur_id.file_id.file_mime_type.name.beschreibung.kultur()
  .toString()

export const KULTUR_OPTION_FRAGMENT = selectFromkultur_option()
  .id.ev_datum.ev_geplant.ev_person_id.ev_teilkultur_id.tk.tk_bemerkungen.tz_andere_menge.tz_anzahl_mutterpflanzen.tz_auspflanzbereit_beschreibung.tz_teilkultur_id.tz_bemerkungen.z_bemerkungen._rev._parent_rev._revisions._depth._conflicts._deleted.kultur()
  .toString()

export const LIEFERUNG_FRAGMENT = selectFromlieferung()
  .id.sammel_lieferung_id.art_id.person_id.von_sammlung_id.von_kultur_id.datum.nach_kultur_id.nach_ausgepflanzt.von_anzahl_individuen.anzahl_pflanzen.anzahl_auspflanzbereit.gramm_samen.andere_menge.geplant.bemerkungen.changed.changed_by._rev._parent_rev._revisions._depth._conflicts._deleted.sammel_lieferung()
  .art()
  .person()
  .sammlung()
  .kulturByVonKulturId()
  .kulturByNachKulturId()
  .lieferung_files()
  .toString()

export const LIEFERUNG_FILE_FRAGMENT = selectFromlieferung_file()
  .id.lieferung_id.file_id.file_mime_type.name.beschreibung.lieferung()
  .toString()

export const PERSON_FRAGMENT = selectFromperson()
  .id.nr.name.adresszusatz.strasse.plz.ort.telefon_privat.telefon_geschaeft.telefon_mobile.email.kein_email.bemerkungen.account_id.user_role.kommerziell.info.aktiv.changed.changed_by._rev._parent_rev._revisions._depth._conflicts._deleted.avs()
  .events()
  .gartens()
  .avs()
  .gvs()
  .lieferungs()
  .person_files()
  .person_option()
  .sammel_lieferungs()
  .sammlungs()
  .userRoleByUserRole()
  .toString()

export const PERSON_OPTION_FRAGMENT = selectFromperson_option().id.ar_name_deutsch.ga_strasse.ga_plz.ga_ort.ga_geom_point.ga_lat_lng.ga_aktiv.ga_bemerkungen.hk_kanton.hk_land.hk_bemerkungen.hk_geom_point.li_show_sl_felder.li_show_sl.sl_show_empty_when_next_to_li.sl_auto_copy_edits.tree_kultur.tree_teilkultur.tree_zaehlung.tree_lieferung.tree_event._rev._parent_rev._revisions._depth._conflicts._deleted.toString()

export const PERSON_FILE_FRAGMENT = selectFromperson_file()
  .id.person_id.file_id.file_mime_type.name.beschreibung.person()
  .toString()

export const SAMMEL_LIEFERUNG_FRAGMENT = selectFromsammel_lieferung()
  .id.art_id.person_id.von_sammlung_id.von_kultur_id.datum.nach_kultur_id.nach_ausgepflanzt.von_anzahl_individuen.anzahl_pflanzen.anzahl_auspflanzbereit.gramm_samen.andere_menge.geplant.bemerkungen._rev._parent_rev._revisions._depth._conflicts._deleted.lieferungs()
  .art()
  .person()
  .sammlung()
  .kulturByVonKulturId()
  .kulturByNachKulturId()
  .toString()
