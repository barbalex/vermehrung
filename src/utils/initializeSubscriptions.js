import {
  ART_FRAGMENT,
  ART_QK_FRAGMENT,
  ART_QK_CHOOSEN_FRAGMENT,
  ART_FILE_FRAGMENT,
  AE_ART_FRAGMENT,
  AV_FRAGMENT,
  EVENT_FRAGMENT,
  GARTEN_FRAGMENT,
  GARTEN_FILE_FRAGMENT,
  GV_FRAGMENT,
  HERKUNFT_FRAGMENT,
  HERKUNFT_FILE_FRAGMENT,
  KULTUR_FRAGMENT,
  KULTUR_QK_FRAGMENT,
  KULTUR_QK_CHOOSEN_FRAGMENT,
  KULTUR_OPTION_FRAGMENT,
  LIEFERUNG_FRAGMENT,
  LIEFERUNG_FILE_FRAGMENT,
  PERSON_FRAGMENT,
  PERSON_OPTION_FRAGMENT,
  PERSON_FILE_FRAGMENT,
  SAMMEL_LIEFERUNG_FRAGMENT,
  SAMMLUNG_FRAGMENT,
  SAMMLUNG_FILE_FRAGMENT,
  TEILKULTUR_FRAGMENT,
  TEILZAEHLUNG_FRAGMENT,
  USER_ROLE_FRAGMENT,
  ZAEHLUNG_FRAGMENT,
} from './mstFragments'

export default ({ store }) => {
  const unsubscribe = {}
  unsubscribe.ae_art = store.subscribeAe_art(undefined, AE_ART_FRAGMENT)
  unsubscribe.art = store.subscribeArt(undefined, ART_FRAGMENT)
  unsubscribe.art_file = store.subscribeArt_file(undefined, ART_FILE_FRAGMENT)
  unsubscribe.art_qk = store.subscribeArt_qk(undefined, ART_QK_FRAGMENT)
  unsubscribe.art_qk_choosen = store.subscribeArt_qk_choosen(
    undefined,
    ART_QK_CHOOSEN_FRAGMENT,
  )
  unsubscribe.av = store.subscribeAv(undefined, AV_FRAGMENT)
  unsubscribe.event = store.subscribeEvent(undefined, EVENT_FRAGMENT)
  unsubscribe.garten = store.subscribeGarten(undefined, GARTEN_FRAGMENT)
  unsubscribe.garten_file = store.subscribeGarten_file(
    undefined,
    GARTEN_FILE_FRAGMENT,
  )
  unsubscribe.gv = store.subscribeGv(undefined, GV_FRAGMENT)
  unsubscribe.herkunft = store.subscribeHerkunft(undefined, HERKUNFT_FRAGMENT)
  unsubscribe.herkunft_file = store.subscribeHerkunft_file(
    undefined,
    HERKUNFT_FILE_FRAGMENT,
  )
  unsubscribe.kultur = store.subscribeKultur(undefined, KULTUR_FRAGMENT)
  unsubscribe.kultur_file = store.subscribeKultur_file(
    undefined,
    KULTUR_OPTION_FRAGMENT,
  )
  unsubscribe.kultur_option = store.subscribeKultur_option()
  unsubscribe.kultur_qk = store.subscribeKultur_qk(
    undefined,
    KULTUR_QK_FRAGMENT,
  )
  unsubscribe.kultur_qk_choosen = store.subscribeKultur_qk_choosen(
    undefined,
    KULTUR_QK_CHOOSEN_FRAGMENT,
  )
  unsubscribe.lieferung = store.subscribeLieferung(
    undefined,
    LIEFERUNG_FRAGMENT,
  )
  unsubscribe.lieferung_file = store.subscribeLieferung_file(
    undefined,
    LIEFERUNG_FILE_FRAGMENT,
  )
  unsubscribe.person = store.subscribePerson(undefined, PERSON_FRAGMENT)
  unsubscribe.person_file = store.subscribePerson_file(
    undefined,
    PERSON_FILE_FRAGMENT,
  )
  unsubscribe.person_option = store.subscribePerson_option(
    undefined,
    PERSON_OPTION_FRAGMENT,
  )
  unsubscribe.sammel_lieferung = store.subscribeSammel_lieferung(
    undefined,
    SAMMEL_LIEFERUNG_FRAGMENT,
  )
  unsubscribe.sammlung = store.subscribeSammlung(undefined, SAMMLUNG_FRAGMENT)
  unsubscribe.sammlung_file = store.subscribeSammlung_file(
    undefined,
    SAMMLUNG_FILE_FRAGMENT,
  )
  unsubscribe.teilkultur = store.subscribeTeilkultur(
    undefined,
    TEILKULTUR_FRAGMENT,
  )
  unsubscribe.teilzaehlung = store.subscribeTeilzaehlung(
    undefined,
    TEILZAEHLUNG_FRAGMENT,
  )
  unsubscribe.user_role = store.subscribeUser_role(
    undefined,
    USER_ROLE_FRAGMENT,
  )
  unsubscribe.zaehlung = store.subscribeZaehlung(undefined, ZAEHLUNG_FRAGMENT)
  return unsubscribe
}
