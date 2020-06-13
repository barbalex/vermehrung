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
  unsubscribe.person = store.subscribePerson()
  unsubscribe.person_file = store.subscribePerson_file()
  unsubscribe.person_option = store.subscribePerson_option()
  unsubscribe.sammel_lieferung = store.subscribeSammel_lieferung()
  unsubscribe.sammlung = store.subscribeSammlung()
  unsubscribe.sammlung_file = store.subscribeSammlung_file()
  unsubscribe.teilkultur = store.subscribeTeilkultur()
  unsubscribe.teilzaehlung = store.subscribeTeilzaehlung()
  unsubscribe.user_role = store.subscribeUser_role()
  unsubscribe.zaehlung = store.subscribeZaehlung(undefined, (z) =>
    z.id.kultur_id.datum.prognose.bemerkungen.changed.changed_by._rev._parent_rev._revisions._depth._conflicts._deleted.teilzaehlungs_aggregate(
      (ta) =>
        ta.aggregate((ag) =>
          ag.sum(
            (s) =>
              s.anzahl_pflanzen.anzahl_auspflanzbereit.anzahl_mutterpflanzen,
          ),
        ),
    ),
  )
  return unsubscribe
}
