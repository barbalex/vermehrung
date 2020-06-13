import {
  ART_FRAGMENT,
  ART_QK_FRAGMENT,
  ART_QK_CHOOSEN_FRAGMENT,
} from './mstFragments'

export default ({ store }) => {
  const unsubscribe = {}
  unsubscribe.ae_art = store.subscribeAe_art(undefined, (a) => a.id.name)
  unsubscribe.art = store.subscribeArt(undefined, ART_FRAGMENT)
  unsubscribe.art_file = store.subscribeArt_file()
  unsubscribe.art_qk = store.subscribeArt_qk(undefined, ART_QK_FRAGMENT)
  unsubscribe.art_qk_choosen = store.subscribeArt_qk_choosen(
    undefined,
    ART_QK_CHOOSEN_FRAGMENT,
  )
  unsubscribe.av = store.subscribeAv()
  unsubscribe.event = store.subscribeEvent()
  unsubscribe.garten = store.subscribeGarten()
  unsubscribe.garten_file = store.subscribeGarten_file()
  unsubscribe.gv = store.subscribeGv()
  unsubscribe.herkunft = store.subscribeHerkunft()
  unsubscribe.herkunft_file = store.subscribeHerkunft_file()
  unsubscribe.kultur = store.subscribeKultur()
  unsubscribe.kultur_file = store.subscribeKultur_file()
  unsubscribe.kultur_option = store.subscribeKultur_option()
  unsubscribe.kultur_qk = store.subscribeKultur_qk()
  unsubscribe.kultur_qk_choosen = store.subscribeKultur_qk_choosen()
  unsubscribe.lieferung = store.subscribeLieferung()
  unsubscribe.lieferung_file = store.subscribeLieferung_file()
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
