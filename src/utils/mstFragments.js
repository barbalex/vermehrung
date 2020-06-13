import { selectFromart } from '../models/artModel.base'
import { selectFromart_qk } from '../models/art_qkModel.base'
import { selectFromart_qk_choosen } from '../models/art_qk_choosenModel.base'
import { selectFromart_file } from '../models/art_fileModel.base'
import { selectFromae_art } from '../models/ae_artModel.base'
import { selectFromav } from '../models/avModel.base'
import { selectFromevent } from '../models/eventModel.base'
import { selectFromgarten } from '../models/gartenModel.base'
import { selectFromgarten_file } from '../models/garten_fileModel.base'

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

export const AV_FRAGMENT = selectFromav().id.art_id.person_id.art().toString()

export const EVENT_FRAGMENT = selectFromevent()
  .id.kultur_id.teilkultur_id.person_id.beschreibung.geplant.datum.changed.changed_by._rev._parent_rev._revisions._depth._conflicts._deleted.kultur()
  .teilkultur()
  .person()
  .toString()

export const GARTEN_FRAGMENT = selectFromgarten()
  .id.name.person_id.strasse.plz.ort.aktiv.bemerkungen.lv95_x.lv95_y.wgs84_lat.wgs84_long.changed.changed_by._rev._parent_rev._revisions._depth._conflicts._deleted.person()
  .toString()

export const GARTEN_FILE_FRAGMENT = selectFromgarten_file().id.garten_id.file_id.file_mime_type.name.beschreibung.toString()
