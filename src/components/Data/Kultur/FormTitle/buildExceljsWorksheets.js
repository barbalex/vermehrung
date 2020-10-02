import addWorksheetToExceljsWorkbook from '../../../../utils/addWorksheetToExceljsWorkbook'
import removeMetadataFromDataset from '../../../../utils/removeMetadataFromDataset'
import artLabelFromKultur from '../../../../utils/artLabelFromKultur'
import artLabelFromLieferung from '../../../../utils/artLabelFromLieferung'

/**
 * this function cann be used from higher up
 * that is why it receives a workbook and _can_ recieve calledFromHigherUp
 */
export default async ({
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
    const newK = {
      id: kultur.id,
      art_id: kultur.art_id,
      art_ae_id: aeArt?.id ?? '',
      art_ae_name: artLabelFromKultur({ kultur, store }),
      herkunft_id: kultur.herkunft_id,
      herkunft_nr: kultur?.herkunft?.nr ?? '',
      herkunft_rohdaten: removeMetadataFromDataset({
        dataset: kultur?.herkunft,
        foreignKeys: ['sammlungs'],
      }),
      garten_id: kultur.garten_id,
      garten_name: kultur?.garten?.name ?? '',
      garten_rohdaten: removeMetadataFromDataset({
        dataset: kultur?.garten,
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
    const tknodes = z?.teilzaehlungs_aggregate?.nodes ?? []
    const newZ = {
      id: z.id,
      kultur_id: z.kultur_id,
      datum: z.datum,
      prognose: z.prognose,
      bemerkungen: z.bemerkungen,
      teilzaehlungen_anzahl: z?.teilzaehlungs_aggregate?.aggregate?.count ?? '',
      teilzaehlungen_anzahl_pflanzen:
        z?.teilzaehlungs_aggregate?.aggregate?.sum?.anzahl_pflanzen ?? '',
      teilzaehlungen_anzahl_auspflanzbereit:
        z?.teilzaehlungs_aggregate?.aggregate?.sum?.anzahl_auspflanzbereit ??
        '',
      teilzaehlungen_anzahl_mutterpflanzen:
        z?.teilzaehlungs_aggregate?.aggregate?.sum?.anzahl_mutterpflanzen ?? '',
      teilzaehlungen_ids: tknodes
        .filter((tk) => !!tk?.id)
        .map((tk) => tk?.id)
        .join(', '),
      teilzaehlungen_teilkulturen: tknodes
        .filter((tk) => !!tk?.teilkultur?.name)
        .map((tk) => tk?.teilkultur?.name)
        .join(', '),
      teilzaehlungen_andere_mengen: tknodes
        .filter((tk) => !!tk?.andere_menge)
        .map((tk) => tk?.andere_menge)
        .join(', '),
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
  const teilzaehlungenArray = teilzaehlungsSorted.filter(
    (t) => t?.zaehlung?.kultur_id === kultur_id,
  )
  const teilzaehlungen = teilzaehlungenArray.map((z) => {
    const newZ = {
      id: z.id,
      zaehlung_id: z.zaehlung_id,
      teilkultur_id: z.teilkultur_id,
      teilkultur_name: z?.teilkultur?.name ?? '',
      anzahl_pflanzen: z.anzahl_pflanzen,
      anzahl_auspflanzbereit: z.anzahl_auspflanzbereit,
      anzahl_mutterpflanzen: z.anzahl_mutterpflanzen,
      andere_menge: z.andere_menge,
      auspflanzbereit_beschreibung: z.auspflanzbereit_beschreibung,
      bemerkungen: z.bemerkungen,
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
  const anlieferungen = anlieferungenArray.map((z) => {
    const art = z.art_id ? store.arts.get(z.art_id) : {}
    const aeArt = art?.ae_id ? store.ae_arts.get(art.ae_id) : {}
    const newZ = {
      id: z.id,
      sammel_lieferung_id: z.sammel_lieferung_id,
      sammel_lieferung_rohdaten: removeMetadataFromDataset({
        dataset: z?.sammel_lieferung,
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
      art_id: z.art_id,
      art_ae_id: aeArt?.id ?? '',
      art_ae_name: artLabelFromLieferung({ lieferung: z, store }),
      person_id: z.person_id,
      person_name: z?.person?.fullname ?? '',
      person_rohdaten: removeMetadataFromDataset({
        dataset: z?.person,
        foreignKeys: [],
      }),
      von_sammlung_id: z.von_sammlung_id,
      von_sammlung_datum: z?.sammlung?.datum ?? '',
      von_sammlung_herkunft_id: z?.sammlung?.herkunft_id ?? '',
      von_sammlung_herkunft_nr: z?.sammlung?.herkunft?.nr ?? '',
      von_sammlung_person_id: z?.sammlung?.person_id ?? '',
      von_sammlung_person_name: z?.sammlung?.person?.fullname ?? '',
      von_sammlung_rohdaten: removeMetadataFromDataset({
        dataset: z?.sammlung,
        foreignKeys: [],
      }),
      von_kultur_id: z.von_kultur_id,
      von_kultur_garten_id: z?.kulturByVonKulturId?.garten_id ?? '',
      von_kultur_garten_name: z?.kulturByVonKulturId?.garten?.name ?? '',
      von_kultur_herkunft_id: z?.kulturByVonKulturId?.herkunft_id ?? '',
      von_kultur_herkunft_nr: z?.kulturByVonKulturId?.herkunft?.nr ?? '',
      von_kultur_rohdaten: removeMetadataFromDataset({
        dataset: z?.kulturByVonKulturId,
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
      datum: z.datum,
      nach_kultur_id: z.nach_kultur_id,
      nach_kultur_garten_id: z?.kulturByNachKulturId?.garten_id ?? '',
      nach_kultur_garten_name: z?.kulturByNachKulturId?.garten?.name ?? '',
      nach_kultur_herkunft_id: z?.kulturByNachKulturId?.herkunft_id ?? '',
      nach_kultur_herkunft_nr: z?.kulturByNachKulturId?.herkunft?.nr ?? '',
      nach_kultur_rohdaten: removeMetadataFromDataset({
        dataset: z?.kulturByNachKulturId,
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
      nach_ausgepflanzt: z.nach_ausgepflanzt,
      von_anzahl_individuen: z.von_anzahl_individuen,
      anzahl_pflanzen: z.anzahl_pflanzen,
      anzahl_auspflanzbereit: z.anzahl_auspflanzbereit,
      gramm_samen: z.gramm_samen,
      andere_menge: z.andere_menge,
      geplant: z.geplant,
      bemerkungen: z.bemerkungen,
      changed: z.changed,
      changed_by: z.changed_by,
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
  const auslieferungen = auslieferungenArray.map((z) => {
    const art = z.art_id ? store.arts.get(z.art_id) : {}
    const aeArt = art?.ae_id ? store.ae_arts.get(art.ae_id) : {}
    const newZ = {
      id: z.id,
      sammel_lieferung_id: z.sammel_lieferung_id,
      sammel_lieferung_rohdaten: removeMetadataFromDataset({
        dataset: z?.sammel_lieferung,
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
      art_id: z.art_id,
      art_ae_id: aeArt?.id ?? '',
      art_ae_name: artLabelFromLieferung({ lieferung: z, store }),
      person_id: z.person_id,
      person_name: z?.person?.fullname ?? '',
      person_rohdaten: removeMetadataFromDataset({
        dataset: z?.person,
        foreignKeys: [],
      }),
      von_sammlung_id: z.von_sammlung_id,
      von_sammlung_datum: z?.sammlung?.datum ?? '',
      von_sammlung_herkunft_id: z?.sammlung?.herkunft_id ?? '',
      von_sammlung_herkunft_nr: z?.sammlung?.herkunft?.nr ?? '',
      von_sammlung_person_id: z?.sammlung?.person_id ?? '',
      von_sammlung_person_name: z?.sammlung?.person?.fullname ?? '',
      von_sammlung_rohdaten: removeMetadataFromDataset({
        dataset: z?.sammlung,
        foreignKeys: [],
      }),
      von_kultur_id: z.von_kultur_id,
      von_kultur_garten_id: z?.kulturByVonKulturId?.garten_id ?? '',
      von_kultur_garten_name: z?.kulturByVonKulturId?.garten?.name ?? '',
      von_kultur_herkunft_id: z?.kulturByVonKulturId?.herkunft_id ?? '',
      von_kultur_herkunft_nr: z?.kulturByVonKulturId?.herkunft?.nr ?? '',
      von_kultur_rohdaten: removeMetadataFromDataset({
        dataset: z?.kulturByVonKulturId,
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
      datum: z.datum,
      nach_kultur_id: z.nach_kultur_id,
      nach_kultur_garten_id: z?.kulturByNachKulturId?.garten_id ?? '',
      nach_kultur_garten_name: z?.kulturByNachKulturId?.garten?.name ?? '',
      nach_kultur_herkunft_id: z?.kulturByNachKulturId?.herkunft_id ?? '',
      nach_kultur_herkunft_nr: z?.kulturByNachKulturId?.herkunft?.nr ?? '',
      nach_kultur_rohdaten: removeMetadataFromDataset({
        dataset: z?.kulturByNachKulturId,
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
      nach_ausgepflanzt: z.nach_ausgepflanzt,
      von_anzahl_individuen: z.von_anzahl_individuen,
      anzahl_pflanzen: z.anzahl_pflanzen,
      anzahl_auspflanzbereit: z.anzahl_auspflanzbereit,
      gramm_samen: z.gramm_samen,
      andere_menge: z.andere_menge,
      geplant: z.geplant,
      bemerkungen: z.bemerkungen,
      changed: z.changed,
      changed_by: z.changed_by,
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
  const events = eventsArray.map((z) => {
    const newZ = {
      id: z.id,
      kultur_id: z.kultur_id,
      teilkultur_id: z.teilkultur_id,
      teilkultur_name: z?.teilkultur?.name ?? '',
      teilkultur_rohdaten: removeMetadataFromDataset({
        dataset: z?.teilkultur,
        foreignKeys: [],
      }),
      person_id: z.person_id,
      person_name: z?.person?.fullname ?? '',
      person_rohdaten: removeMetadataFromDataset({
        dataset: z?.person,
        foreignKeys: [],
      }),
      beschreibung: z.beschreibung,
      geplant: z.geplant,
      datum: z.datum,
      changed: z.changed,
      changed_by: z.changed_by,
    }
    delete z.teilkultur
    delete z.person
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
