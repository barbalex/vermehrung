export default ({ store }) => {
  const unsubscribe = {}
  unsubscribe.ae_art = store.subscribeAe_art(
    undefined,
    (a) => a.id.name,
    () => !store.aeArtLoaded && store.setAeArtLoaded(true),
  )
  unsubscribe.art = store.subscribeArt(
    { where: store.artFilter },
    undefined,
    () => !store.artLoaded && store.setArtLoaded(true),
  )
  unsubscribe.art_file = store.subscribeArt_file(
    undefined,
    undefined,
    () => !store.artFileLoaded && store.setArtFileLoaded(true),
  )
  unsubscribe.art_qk = store.subscribeArt_qk(
    undefined,
    undefined,
    () => !store.artQkLoaded && store.setArtQkLoaded(true),
  )
  unsubscribe.art_qk_choosen = store.subscribeArt_qk_choosen(
    undefined,
    undefined,
    () => !store.artQkChoosenLoaded && store.setArtQkChoosenLoaded(true),
  )
  unsubscribe.av = store.subscribeAv(
    undefined,
    undefined,
    () => !store.avLoaded && store.setAvLoaded(true),
  )
  unsubscribe.event = store.subscribeEvent(
    { where: store.eventFilter },
    undefined,
    () => !store.eventLoaded && store.setEventLoaded(true),
  )
  unsubscribe.garten = store.subscribeGarten(
    { where: store.gartenFilter },
    undefined,
    () => !store.gartenLoaded && store.setGartenLoaded(true),
  )
  unsubscribe.garten_file = store.subscribeGarten_file(
    undefined,
    undefined,
    () => !store.gartenFileLoaded && store.setGartenFileLoaded(true),
  )
  unsubscribe.gv = store.subscribeGv(
    undefined,
    undefined,
    () => !store.gvLoaded && store.setGvLoaded(true),
  )
  unsubscribe.herkunft = store.subscribeHerkunft(
    { where: store.herkunftFilter },
    undefined,
    () => !store.herkunftLoaded && store.setHerkunftLoaded(true),
  )
  unsubscribe.herkunft_file = store.subscribeHerkunft_file(
    undefined,
    undefined,
    () => !store.herkunftFileLoaded && store.setHerkunftFileLoaded(true),
  )
  unsubscribe.kultur = store.subscribeKultur(
    { where: store.kulturFilter },
    undefined,
    () => !store.kulturLoaded && store.setKulturLoaded(true),
  )
  unsubscribe.kultur_file = store.subscribeKultur_file(
    undefined,
    undefined,
    () => !store.kulturFileLoaded && store.setKulturFileLoaded(true),
  )
  unsubscribe.kultur_option = store.subscribeKultur_option(
    undefined,
    undefined,
    () => !store.kulturOptionLoaded && store.setKulturOptionLoaded(true),
  )
  unsubscribe.kultur_qk = store.subscribeKultur_qk(
    undefined,
    undefined,
    () => !store.kulturQkLoaded && store.setKulturQkLoaded(true),
  )
  unsubscribe.kultur_qk_choosen = store.subscribeKultur_qk_choosen(
    undefined,
    undefined,
    () => !store.kulturQkChoosenLoaded && store.setKulturQkChoosenLoaded(true),
  )
  unsubscribe.lieferung = store.subscribeLieferung(
    { where: store.lieferungFilter },
    undefined,
    () => !store.lieferungLoaded && store.setLieferungLoaded(true),
  )
  unsubscribe.lieferung_file = store.subscribeLieferung_file(
    undefined,
    undefined,
    () => !store.lieferungFileLoaded && store.setLieferungFileLoaded(true),
  )
  unsubscribe.person = store.subscribePerson(
    { where: store.personFilter },
    undefined,
    () => !store.personLoaded && store.setPersonLoaded(true),
  )
  unsubscribe.person_file = store.subscribePerson_file(
    undefined,
    undefined,
    () => !store.personFileLoaded && store.setPersonFileLoaded(true),
  )
  unsubscribe.person_option = store.subscribePerson_option(
    undefined,
    undefined,
    () => !store.personOptionLoaded && store.setPersonOptionLoaded(true),
  )
  unsubscribe.sammel_lieferung = store.subscribeSammel_lieferung(
    { where: store.sammelLieferungFilter },
    undefined,
    () => !store.sammelLieferungLoaded && store.setSammelLieferungLoaded(true),
  )
  unsubscribe.sammlung = store.subscribeSammlung(
    { where: store.sammlungFilter },
    undefined,
    () => !store.sammlungLoaded && store.setSammlungLoaded(true),
  )
  unsubscribe.sammlung_file = store.subscribeSammlung_file(
    undefined,
    undefined,
    () => !store.sammlungFileLoaded && store.setSammlungFileLoaded(true),
  )
  unsubscribe.teilkultur = store.subscribeTeilkultur(
    undefined,
    undefined,
    () => !store.teilkulturLoaded && store.setTeilkulturLoaded(true),
  )
  unsubscribe.teilzaehlung = store.subscribeTeilzaehlung(
    undefined,
    undefined,
    () => !store.teilzaehlungLoaded && store.setTeilzaehlungLoaded(true),
  )
  unsubscribe.user_role = store.subscribeUser_role(
    undefined,
    undefined,
    () => !store.userRoleLoaded && store.setUserRoleLoaded(true),
  )
  unsubscribe.zaehlung = store.subscribeZaehlung(
    { where: store.zaehlungFilter },
    (z) =>
      z.id.kultur_id.datum.prognose.bemerkungen.changed.changed_by._rev._parent_rev._revisions._depth._conflicts._deleted.teilzaehlungs_aggregate(
        (ta) =>
          ta.aggregate((ag) =>
            ag.sum(
              (s) =>
                s.anzahl_pflanzen.anzahl_auspflanzbereit.anzahl_mutterpflanzen,
            ),
          ),
      ),
    () => !store.zaehlungLoaded && store.setZaehlungLoaded(true),
  )
  return unsubscribe
}
