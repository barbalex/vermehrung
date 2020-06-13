import { selectFromart } from '../models/artModel.base'
import { selectFromart_qk } from '../models/art_qkModel.base'
import { selectFromart_qk_choosen } from '../models/art_qk_choosenModel.base'

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
