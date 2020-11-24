import sum from 'lodash/sum'

import addWorksheetToExceljsWorkbook from '../../../../utils/addWorksheetToExceljsWorkbook'
import removeMetadataFromDataset from '../../../../utils/removeMetadataFromDataset'
import artLabelFromKultur from '../../../../utils/artLabelFromKultur'
import artLabelFromLieferung from '../../../../utils/artLabelFromLieferung'
import exists from '../../../../utils/exists'

/**
 * this function cann be used from higher up
 * that is why it receives a workbook and _can_ recieve calledFromHigherUp
 */
const buildExceljsWorksheets = ({
  store,
  kultur_id,
  kultur_name,
  workbook,
  calledFromHigherUp,
}) => {
  const {
    eventsSorted,
    zaehlungsSorted,
    teilzaehlungsSorted,
    lieferungsSorted,
  } = store

  // 1. Get Kultur
  if (!calledFromHigherUp) {
    const kultur = store.kulturs.get(kultur_id)
    const art = kultur.art_id ? store.arts.get(kultur.art_id) : {}
    const aeArt = art?.ae_id ? store.ae_arts.get(art.ae_id) : {}
    const herkunft = kultur?.herkunft_id
      ? store.herkunfts.get(kultur.herkunft_id)
      : {}
    const garten = kultur?.garten_id ? store.gartens.get(kultur.garten_id) : {}

    const newK = {
      id: kultur.id,
      art_id: kultur.art_id,
      art_ae_id: aeArt?.id ?? '',
      art_ae_name: artLabelFromKultur({ kultur, store }),
      herkunft_id: kultur.herkunft_id,
      herkunft_nr: herkunft?.nr ?? '',
      herkunft_rohdaten: removeMetadataFromDataset({
        dataset: herkunft,
        foreignKeys: ['sammlungs'],
      }),
      garten_id: kultur.garten_id,
      garten_name: garten?.name ?? '',
      garten_rohdaten: removeMetadataFromDataset({
        dataset: garten,
        foreignKeys: ['kulturs', 'person'],
      }),
      zwischenlager: kultur.zwischenlager,
      erhaltungskultur: kultur.erhaltungskultur,
      von_anzahl_individuen: kultur.von_anzahl_individuen,
      bemerkungen: kultur.bemerkungen,
      aktiv: kultur.aktiv,
      changed: kultur.changed,
      changed_by: kultur.changed_by,
    }
    addWorksheetToExceljsWorkbook({
      workbook,
      title: calledFromHigherUp ? `Kultur_${kultur_id}` : 'Kultur',
      data: [newK],
    })
  }
  // 2. Get Zählungen
  const zaehlungs = zaehlungsSorted.filter((z) => z.kultur_id === kultur_id)
  const zaehlungen = zaehlungs.map((z) => {
    const newZ = {
      id: z.id,
      kultur_id: z.kultur_id,
      datum: z.datum,
      prognose: z.prognose,
      bemerkungen: z.bemerkungen,
      teilzaehlungen_anzahl: teilzaehlungsSorted
        .filter((tz) => tz.zaehlung_id === z.id)
        .map((tz) => tz.anzahl_pflanzen)
        .filter((a) => exists(a)).length,
      teilzaehlungen_anzahl_pflanzen:
        sum(
          teilzaehlungsSorted
            .filter((tz) => tz.zaehlung_id === z.id)
            .map((tz) => tz.anzahl_pflanzen)
            .filter((a) => exists(a)),
        ) ?? '',
      teilzaehlungen_anzahl_auspflanzbereit:
        sum(
          teilzaehlungsSorted
            .filter((tz) => tz.zaehlung_id === z.id)
            .map((tz) => tz.anzahl_auspflanzbereit)
            .filter((a) => exists(a)),
        ) ?? '',
      teilzaehlungen_anzahl_mutterpflanzen:
        sum(
          teilzaehlungsSorted
            .filter((tz) => tz.zaehlung_id === z.id)
            .map((tz) => tz.anzahl_mutterpflanzen)
            .filter((a) => exists(a)),
        ) ?? '',
      /*teilzaehlungen_ids: tknodes
        .filter((tk) => !!tk?.id)
        .map((tk) => tk?.id)
        .join(', '),
      teilzaehlungen_teilkulturen: tknodes
        .filter((tk) => {
          return !!tk?.teilkultur?.name
        })
        .map((tk) => {
          return tk?.teilkultur?.name
        })
        .join(', '),
      teilzaehlungen_andere_mengen: tknodes
        .filter((tk) => !!tk?.andere_menge)
        .map((tk) => tk?.andere_menge)
        .join(', '),*/
    }
    return newZ
  })
  if (zaehlungen.length) {
    addWorksheetToExceljsWorkbook({
      workbook,
      title: calledFromHigherUp
        ? `Kultur_${kultur_name}_Zaehlungen`
        : 'Zaehlungen',
      data: zaehlungen,
    })
  }
  // 3. Get Teil-Zählungen
  const teilzaehlungenArray = teilzaehlungsSorted.filter((t) => {
    const zaehlung = t.zaehlung_id ? store.zaehlungs.get(t.zaehlung_id) : {}
    return zaehlung?.kultur_id === kultur_id
  })
  const teilzaehlungen = teilzaehlungenArray.map((t) => {
    const teilkultur = t.teilkultur_id
      ? store.teilkulturs.get(t.teilkultur_id)
      : {}
    const newZ = {
      id: t.id,
      zaehlung_id: t.zaehlung_id,
      teilkultur_id: t.teilkultur_id,
      teilkultur_name: teilkultur?.name ?? '',
      anzahl_pflanzen: t.anzahl_pflanzen,
      anzahl_auspflanzbereit: t.anzahl_auspflanzbereit,
      anzahl_mutterpflanzen: t.anzahl_mutterpflanzen,
      andere_menge: t.andere_menge,
      auspflanzbereit_beschreibung: t.auspflanzbereit_beschreibung,
      bemerkungen: t.bemerkungen,
    }
    return newZ
  })
  if (teilzaehlungen.length) {
    addWorksheetToExceljsWorkbook({
      workbook,
      title: calledFromHigherUp
        ? `Kultur_${kultur_name}_Teilzaehlungen`
        : 'Teilzaehlungen',
      data: teilzaehlungen,
    })
  }
  // 4. Get An-Lieferungen
  const anlieferungenArray = lieferungsSorted.filter(
    (l) => l.nach_kultur_id === kultur_id,
  )
  const anlieferungen = anlieferungenArray.map((l) => {
    const art = l.art_id ? store.arts.get(l.art_id) : {}
    const aeArt = art?.ae_id ? store.ae_arts.get(art.ae_id) : {}
    const lieferungPerson = l.person_id ? store.persons.get(l.person_id) : {}
    const vonSammlung = l?.von_sammlung_id
      ? store.sammlungs.get(l.von_sammlung_id)
      : {}
    const vonSammlungPerson = vonSammlung?.person_id
      ? store.persons.get(vonSammlung?.person_id)
      : {}
    const vonSammlungHerkunft = vonSammlung?.herkunft_id
      ? store.herkunfts.get(vonSammlung?.herkunft_id)
      : {}
    const vonKultur = l?.kultur_id ? store.kulturs.get(l.kultur_id) : {}
    const vonKulturGarten = vonKultur?.garten_id
      ? store.gartens.get(vonKultur.garten_id)
      : {}
    const vonKulturHerkunft = vonKultur.herkunft_id
      ? store.herkunfts.get(vonKultur.herkunft_id)
      : {}
    const nachKultur = l.nach_kultur_id
      ? store.kulturs.get(l.nach_kultur_id)
      : {}
    const nachKulturGarten = nachKultur.garten_id
      ? store.gartens.get(nachKultur.garten_id)
      : {}
    const nachKulturHerkunft = nachKultur.herkunft_id
      ? store.herkunfts.get(nachKultur.herkunft_id)
      : {}
    const sammelLieferung = l.sammel_lieferung_id
      ? store.sammel_lieferungs.get(l.l.sammel_lieferung_id)
      : {}
    const newZ = {
      id: l.id,
      sammel_lieferung_id: l.sammel_lieferung_id,
      sammel_lieferung_rohdaten: removeMetadataFromDataset({
        dataset: sammelLieferung,
        foreignKeys: [
          'art',
          'garten',
          'herkunft',
          'kultur_option',
          'lieferungsByNachKulturId',
          'lieferungsByVonKulturId',
          'teilkulturs',
          'zaehlungs',
        ],
      }),
      art_id: l.art_id,
      art_ae_id: aeArt?.id ?? '',
      art_ae_name: artLabelFromLieferung({ lieferung: l, store }),
      person_id: l.person_id,
      person_name: lieferungPerson?.fullname ?? '',
      person_rohdaten: removeMetadataFromDataset({
        dataset: lieferungPerson,
        foreignKeys: [],
      }),
      von_sammlung_id: l.von_sammlung_id,
      von_sammlung_datum: vonSammlung?.datum ?? '',
      von_sammlung_herkunft_id: vonSammlung?.herkunft_id ?? '',
      von_sammlung_herkunft_nr: vonSammlungHerkunft?.nr ?? '',
      von_sammlung_person_id: vonSammlung?.person_id ?? '',
      von_sammlung_person_name: vonSammlungPerson?.fullname ?? '',
      von_sammlung_rohdaten: removeMetadataFromDataset({
        dataset: vonSammlung,
        foreignKeys: [],
      }),
      von_kultur_id: l.von_kultur_id,
      von_kultur_garten_id: vonKultur?.garten_id ?? '',
      von_kultur_garten_name: vonKulturGarten?.name ?? '',
      von_kultur_herkunft_id: vonKultur?.herkunft_id ?? '',
      von_kultur_herkunft_nr: vonKulturHerkunft?.nr ?? '',
      von_kultur_rohdaten: removeMetadataFromDataset({
        dataset: vonKultur,
        foreignKeys: [
          'art',
          'garten',
          'herkunft',
          'kultur_option',
          'lieferungsByNachKulturId',
          'lieferungsByVonKulturId',
          'teilkulturs',
          'zaehlungs',
        ],
      }),
      datum: l.datum,
      nach_kultur_id: l.nach_kultur_id,
      nach_kultur_garten_id: nachKultur?.garten_id ?? '',
      nach_kultur_garten_name: nachKulturGarten?.name ?? '',
      nach_kultur_herkunft_id: nachKultur?.herkunft_id ?? '',
      nach_kultur_herkunft_nr: nachKulturHerkunft?.nr ?? '',
      nach_kultur_rohdaten: removeMetadataFromDataset({
        dataset: nachKultur,
        foreignKeys: [
          'art',
          'garten',
          'herkunft',
          'kultur_option',
          'lieferungsByNachKulturId',
          'lieferungsByVonKulturId',
          'teilkulturs',
          'zaehlungs',
          'ausLieferungsDone',
          'ausLieferungsPlanned',
          'anLieferungsDone',
          'anLieferungsPlanned',
          'zaehlungsDone',
          'zaehlungsPlanned',
        ],
      }),
      nach_ausgepflanzt: l.nach_ausgepflanzt,
      von_anzahl_individuen: l.von_anzahl_individuen,
      anzahl_pflanzen: l.anzahl_pflanzen,
      anzahl_auspflanzbereit: l.anzahl_auspflanzbereit,
      gramm_samen: l.gramm_samen,
      andere_menge: l.andere_menge,
      geplant: l.geplant,
      bemerkungen: l.bemerkungen,
      changed: l.changed,
      changed_by: l.changed_by,
    }
    return newZ
  })
  if (anlieferungen.length) {
    addWorksheetToExceljsWorkbook({
      workbook,
      title: calledFromHigherUp
        ? `Kultur_${kultur_name}_Anlieferungen`
        : 'Anlieferungen',
      data: anlieferungen,
    })
  }
  // 5. Get Aus-Lieferungen
  const auslieferungenArray = lieferungsSorted.filter(
    (l) => l.von_kultur_id === kultur_id,
  )
  const auslieferungen = auslieferungenArray.map((l) => {
    const art = l.art_id ? store.arts.get(l.art_id) : {}
    const aeArt = art?.ae_id ? store.ae_arts.get(art.ae_id) : {}
    const lieferungPerson = l.person_id ? store.persons.get(l.person_id) : {}
    const vonSammlung = l?.von_sammlung_id
      ? store.sammlungs.get(l.von_sammlung_id)
      : {}
    const vonSammlungPerson = vonSammlung?.person_id
      ? store.persons.get(vonSammlung?.person_id)
      : {}
    const vonSammlungHerkunft = vonSammlung?.herkunft_id
      ? store.herkunfts.get(vonSammlung?.herkunft_id)
      : {}
    const vonKultur = l?.kultur_id ? store.kulturs.get(l.kultur_id) : {}
    const vonKulturGarten = vonKultur?.garten_id
      ? store.gartens.get(vonKultur.garten_id)
      : {}
    const vonKulturHerkunft = vonKultur.herkunft_id
      ? store.herkunfts.get(vonKultur.herkunft_id)
      : {}
    const nachKultur = l.nach_kultur_id
      ? store.kulturs.get(l.nach_kultur_id)
      : {}
    const nachKulturGarten = nachKultur.garten_id
      ? store.gartens.get(nachKultur.garten_id)
      : {}
    const nachKulturHerkunft = nachKultur.herkunft_id
      ? store.herkunfts.get(nachKultur.herkunft_id)
      : {}
    const sammelLieferung = l.sammel_lieferung_id
      ? store.sammel_lieferungs.get(l.l.sammel_lieferung_id)
      : {}
    const newZ = {
      id: l.id,
      sammel_lieferung_id: l.sammel_lieferung_id,
      sammel_lieferung_rohdaten: removeMetadataFromDataset({
        dataset: sammelLieferung,
        foreignKeys: [
          'art',
          'garten',
          'herkunft',
          'kultur_option',
          'lieferungsByNachKulturId',
          'lieferungsByVonKulturId',
          'teilkulturs',
          'zaehlungs',
        ],
      }),
      art_id: l.art_id,
      art_ae_id: aeArt?.id ?? '',
      art_ae_name: artLabelFromLieferung({ lieferung: l, store }),
      person_id: l.person_id,
      person_name: lieferungPerson?.fullname ?? '',
      person_rohdaten: removeMetadataFromDataset({
        dataset: lieferungPerson,
        foreignKeys: [],
      }),
      von_sammlung_id: l.von_sammlung_id,
      von_sammlung_datum: vonSammlung?.datum ?? '',
      von_sammlung_herkunft_id: vonSammlung?.herkunft_id ?? '',
      von_sammlung_herkunft_nr: vonSammlungHerkunft?.nr ?? '',
      von_sammlung_person_id: vonSammlung?.person_id ?? '',
      von_sammlung_person_name: vonSammlungPerson?.fullname ?? '',
      von_sammlung_rohdaten: removeMetadataFromDataset({
        dataset: vonSammlung,
        foreignKeys: [],
      }),
      von_kultur_id: l.von_kultur_id,
      von_kultur_garten_id: vonKultur?.garten_id ?? '',
      von_kultur_garten_name: vonKulturGarten?.name ?? '',
      von_kultur_herkunft_id: vonKultur?.herkunft_id ?? '',
      von_kultur_herkunft_nr: vonKulturHerkunft?.nr ?? '',
      von_kultur_rohdaten: removeMetadataFromDataset({
        dataset: vonKultur,
        foreignKeys: [
          'art',
          'garten',
          'herkunft',
          'kultur_option',
          'lieferungsByNachKulturId',
          'lieferungsByVonKulturId',
          'teilkulturs',
          'zaehlungs',
        ],
      }),
      datum: l.datum,
      nach_kultur_id: l.nach_kultur_id,
      nach_kultur_garten_id: nachKultur?.garten_id ?? '',
      nach_kultur_garten_name: nachKulturGarten?.name ?? '',
      nach_kultur_herkunft_id: nachKultur?.herkunft_id ?? '',
      nach_kultur_herkunft_nr: nachKulturHerkunft?.nr ?? '',
      nach_kultur_rohdaten: removeMetadataFromDataset({
        dataset: nachKultur,
        foreignKeys: [
          'art',
          'garten',
          'herkunft',
          'kultur_option',
          'lieferungsByNachKulturId',
          'lieferungsByVonKulturId',
          'teilkulturs',
          'zaehlungs',
        ],
      }),
      nach_ausgepflanzt: l.nach_ausgepflanzt,
      von_anzahl_individuen: l.von_anzahl_individuen,
      anzahl_pflanzen: l.anzahl_pflanzen,
      anzahl_auspflanzbereit: l.anzahl_auspflanzbereit,
      gramm_samen: l.gramm_samen,
      andere_menge: l.andere_menge,
      geplant: l.geplant,
      bemerkungen: l.bemerkungen,
      changed: l.changed,
      changed_by: l.changed_by,
    }
    return newZ
  })
  if (auslieferungen.length) {
    addWorksheetToExceljsWorkbook({
      workbook,
      title: calledFromHigherUp
        ? `Kultur_${kultur_name}_Auslieferungen`
        : 'Auslieferungen',
      data: auslieferungen,
    })
  }
  // 6. Get Events
  const eventsArray = eventsSorted.filter((e) => e.kultur_id === kultur_id)
  const events = eventsArray.map((e) => {
    const teilkultur = e.teilkultur_id
      ? store.teilkulturs.get(e.teilkultur_id)
      : {}
    const person = e.person_id ? store.persons.get(e.person_id) : {}

    const newZ = {
      id: e.id,
      kultur_id: e.kultur_id,
      teilkultur_id: e.teilkultur_id,
      teilkultur_name: teilkultur?.name ?? '',
      teilkultur_rohdaten: removeMetadataFromDataset({
        dataset: teilkultur,
        foreignKeys: [],
      }),
      person_id: e.person_id,
      person_name: person?.fullname ?? '',
      person_rohdaten: removeMetadataFromDataset({
        dataset: person,
        foreignKeys: [],
      }),
      beschreibung: e.beschreibung,
      geplant: e.geplant,
      datum: e.datum,
      changed: e.changed,
      changed_by: e.changed_by,
    }
    delete e.teilkultur
    return newZ
  })
  if (events.length) {
    addWorksheetToExceljsWorkbook({
      workbook,
      title: calledFromHigherUp ? `Kultur_${kultur_name}_Events` : 'Events',
      data: events,
    })
  }
  return
}

export default buildExceljsWorksheets
