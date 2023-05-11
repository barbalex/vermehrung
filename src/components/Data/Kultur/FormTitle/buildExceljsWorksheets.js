import sum from 'lodash/sum'
import { Q } from '@nozbe/watermelondb'
import { first as first$ } from 'rxjs/operators'

import addWorksheetToExceljsWorkbook from '../../../../utils/addWorksheetToExceljsWorkbook'
import removeMetadataFromDataset from '../../../../utils/removeMetadataFromDataset'
import exists from '../../../../utils/exists'
import teilzaehlungsSortByTk from '../../../../utils/teilzaehlungsSortByTk'
import zaehlungSort from '../../../../utils/zaehlungSort'
import lieferungSort from '../../../../utils/lieferungSort'
import eventSort from '../../../../utils/eventSort'
import personFullname from '../../../../utils/personFullname'

/**
 * this function cann be used from higher up
 * that is why it receives a workbook and _can_ recieve calledFromHigherUp
 */
const buildExceljsWorksheets = async ({
  store,
  kultur_id,
  kultur_name,
  workbook,
  calledFromHigherUp,
}) => {
  const { db } = store

  // 1. Get Kultur
  if (!calledFromHigherUp) {
    let kultur
    try {
      kultur = await db.get('kultur').find(kultur_id)
    } catch {}
    let art
    try {
      art = await kultur.art.fetch()
    } catch {}
    let artName
    try {
      artName = await art.label.pipe(first$()).toPromise()
    } catch {}
    let herkunft
    try {
      herkunft = await kultur.herkunft.fetch()
    } catch {}
    let garten
    try {
      garten = await kultur.garten.fetch()
    } catch {}

    const newK = {
      id: kultur.id,
      art_id: kultur.art_id,
      art_name: artName,
      herkunft_id: kultur.herkunft_id,
      herkunft_nr: herkunft?.nr,
      herkunft_rohdaten: removeMetadataFromDataset({
        dataset: herkunft?._raw,
        foreignKeys: ['sammlungs'],
      }),
      garten_id: kultur.garten_id,
      garten_name: garten?.name,
      garten_rohdaten: removeMetadataFromDataset({
        dataset: garten?._raw,
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
  const zaehlungs = await db
    .get('zaehlung')
    .query(Q.where('_deleted', false), Q.where('kultur_id', kultur_id))
    .fetch()
  const zaehlungsSorted = zaehlungs.sort(zaehlungSort)
  const zaehlungen = await Promise.all(
    zaehlungsSorted.map(async (z) => {
      const tzs = await z.teilzaehlungs
        .extend(Q.where('_deleted', false))
        .fetch()
      const tzsSorted = await teilzaehlungsSortByTk(tzs)
      const newZ = {
        id: z.id,
        kultur_id: z.kultur_id,
        datum: z.datum,
        prognose: z.prognose,
        bemerkungen: z.bemerkungen,
        teilzaehlungen_anzahl: tzsSorted
          .map((tz) => tz.anzahl_pflanzen)
          .filter((a) => exists(a)).length,
        teilzaehlungen_anzahl_pflanzen: sum(
          tzsSorted.map((tz) => tz.anzahl_pflanzen).filter((a) => exists(a)),
        ),
        teilzaehlungen_anzahl_auspflanzbereit: sum(
          tzsSorted
            .map((tz) => tz.anzahl_auspflanzbereit)
            .filter((a) => exists(a)),
        ),
        teilzaehlungen_anzahl_mutterpflanzen: sum(
          tzsSorted
            .map((tz) => tz.anzahl_mutterpflanzen)
            .filter((a) => exists(a)),
        ),
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
    }),
  )
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
  const teilzaehlungs = await db
    .get('teilzaehlung')
    .query(
      Q.where('_deleted', false),
      Q.on('zaehlung', Q.where('kultur_id', kultur_id)),
    )
    .fetch()
  const teilzaehlungsSorted = await teilzaehlungsSortByTk(teilzaehlungs)
  const teilzaehlungData = await Promise.all(
    teilzaehlungsSorted.map(async (t) => {
      const teilkultur = t.teilkultur_id ? await t.kultur.fetch() : {}
      const newZ = {
        id: t.id,
        zaehlung_id: t.zaehlung_id,
        teilkultur_id: t.teilkultur_id,
        teilkultur_name: teilkultur?.name,
        anzahl_pflanzen: t.anzahl_pflanzen,
        anzahl_auspflanzbereit: t.anzahl_auspflanzbereit,
        anzahl_mutterpflanzen: t.anzahl_mutterpflanzen,
        andere_menge: t.andere_menge,
        auspflanzbereit_beschreibung: t.auspflanzbereit_beschreibung,
        bemerkungen: t.bemerkungen,
      }
      return newZ
    }),
  )
  if (teilzaehlungData.length) {
    addWorksheetToExceljsWorkbook({
      workbook,
      title: calledFromHigherUp
        ? `Kultur_${kultur_name}_Teilzaehlungen`
        : 'Teilzaehlungen',
      data: teilzaehlungData,
    })
  }
  // 4. Get An-Lieferungen
  const anlieferungs = await db
    .get('lieferung')
    .query(Q.where('_deleted', false), Q.where('nach_kultur_id', kultur_id))
    .fetch()
  const lieferungsSorted = anlieferungs.sort(lieferungSort)
  const anlieferungData = await Promise.all(
    lieferungsSorted.map(async (l) => {
      let art
      try {
        art = await l.art.fetch()
      } catch {}
      let artName
      try {
        artName = await art.label.pipe(first$()).toPromise()
      } catch {}
      let aeArt
      try {
        aeArt = await art.ae_art.fetch()
      } catch {}
      let lieferungPerson
      try {
        lieferungPerson = await l.person.fetch()
      } catch {}
      let vonSammlung
      try {
        vonSammlung = await db.get('sammlung').find(l.von_sammlung_id)
      } catch {}
      let vonSammlungPerson
      try {
        vonSammlungPerson = await vonSammlung.person.fetch()
      } catch {}
      let vonSammlungHerkunft
      try {
        vonSammlungHerkunft = await vonSammlung.herkunft.fetch()
      } catch {}
      let vonKultur
      try {
        vonKultur = await db.get('kultur').find(l.von_kultur_id)
      } catch {}
      let vonKulturGarten
      try {
        vonKulturGarten = await vonKultur.garten.fetch()
      } catch {}
      let vonKulturHerkunft
      try {
        vonKulturHerkunft = await vonKultur.herkunft.fetch()
      } catch {}
      let nachKultur
      try {
        nachKultur = await db.get('kultur').find(l.nach_kultur_id)
      } catch {}
      let nachKulturGarten
      try {
        nachKulturGarten = await nachKultur.garten.fetch()
      } catch {}
      let nachKulturHerkunft
      try {
        nachKulturHerkunft = await nachKultur.herkunft.fetch()
      } catch {}
      let sammelLieferung
      try {
        sammelLieferung = await l.sammel_lieferung.fetch()
      } catch {}

      const newZ = {
        id: l.id,
        sammel_lieferung_id: l.sammel_lieferung_id,
        sammel_lieferung_rohdaten: removeMetadataFromDataset({
          dataset: sammelLieferung?._raw,
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
        art_set: art?.set,
        art_ae_id: aeArt?.id,
        art_ae_name: artName,
        person_id: l.person_id,
        person_name: personFullname(lieferungPerson),
        person_rohdaten: removeMetadataFromDataset({
          dataset: lieferungPerson?._raw,
          foreignKeys: [],
        }),
        von_sammlung_id: l.von_sammlung_id,
        von_sammlung_datum: vonSammlung?.datum,
        von_sammlung_herkunft_id: vonSammlung?.herkunft_id,
        von_sammlung_herkunft_nr: vonSammlungHerkunft?.nr,
        von_sammlung_person_id: vonSammlung?.person_id,
        von_sammlung_person_name: personFullname(vonSammlungPerson),
        von_sammlung_rohdaten: removeMetadataFromDataset({
          dataset: vonSammlung?._raw,
          foreignKeys: [],
        }),
        von_kultur_id: l.von_kultur_id,
        von_kultur_garten_id: vonKultur?.garten_id,
        von_kultur_garten_name: vonKulturGarten?.name,
        von_kultur_herkunft_id: vonKultur?.herkunft_id,
        von_kultur_herkunft_nr: vonKulturHerkunft?.nr,
        von_kultur_rohdaten: removeMetadataFromDataset({
          dataset: vonKultur?._raw,
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
        nach_kultur_garten_id: nachKultur?.garten_id,
        nach_kultur_garten_name: nachKulturGarten?.name,
        nach_kultur_herkunft_id: nachKultur?.herkunft_id,
        nach_kultur_herkunft_nr: nachKulturHerkunft?.nr,
        nach_kultur_rohdaten: removeMetadataFromDataset({
          dataset: nachKultur?._raw,
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
    }),
  )
  if (anlieferungData.length) {
    addWorksheetToExceljsWorkbook({
      workbook,
      title: calledFromHigherUp
        ? `Kultur_${kultur_name}_Anlieferungen`
        : 'Anlieferungen',
      data: anlieferungData,
    })
  }
  // 5. Get Aus-Lieferungen
  let auslieferungs = []
  try {
    auslieferungs = await db
      .get('lieferung')
      .query(Q.where('_deleted', false), Q.where('von_kultur_id', kultur_id))
      .fetch()
  } catch {}
  const auslieferungsSorted = auslieferungs.sort(lieferungSort)
  const auslieferungen = await Promise.all(
    auslieferungsSorted.map(async (l) => {
      let art
      try {
        art = await l.art.fetch()
      } catch {}
      let artName
      try {
        artName = await art.label.pipe(first$()).toPromise()
      } catch {}
      let aeArt
      try {
        aeArt = await art.ae_art.fetch()
      } catch {}
      let lieferungPerson
      try {
        lieferungPerson = await l.person.fetch()
      } catch {}
      let vonSammlung
      try {
        vonSammlung = await db.get('sammlung').find(l.von_sammlung_id)
      } catch {}
      let vonSammlungPerson
      try {
        vonSammlungPerson = await vonSammlung.person.fetch()
      } catch {}
      let vonSammlungHerkunft
      try {
        vonSammlungHerkunft = await vonSammlung.herkunft.fetch()
      } catch {}
      let vonKultur
      try {
        vonKultur = await db.get('kultur').find(l.von_kultur_id)
      } catch {}
      let vonKulturGarten
      try {
        vonKulturGarten = await vonKultur.garten.fetch()
      } catch {}
      let vonKulturHerkunft
      try {
        vonKulturHerkunft = await vonKultur.herkunft.fetch()
      } catch {}
      let nachKultur
      try {
        nachKultur = await db.get('kultur').find(l.nach_kultur_id)
      } catch {}
      let nachKulturGarten
      try {
        nachKulturGarten = await nachKultur.garten.fetch()
      } catch {}
      let nachKulturHerkunft
      try {
        nachKulturHerkunft = await nachKultur.herkunft.fetch()
      } catch {}
      let sammelLieferung
      try {
        sammelLieferung = await l.sammel_lieferung.fetch()
      } catch {}

      const newZ = {
        id: l.id,
        sammel_lieferung_id: l.sammel_lieferung_id,
        sammel_lieferung_rohdaten: removeMetadataFromDataset({
          dataset: sammelLieferung?._raw,
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
        art_set: art?.set,
        art_ae_id: aeArt?.id,
        art_ae_name: artName,
        person_id: l.person_id,
        person_name: personFullname(lieferungPerson),
        person_rohdaten: removeMetadataFromDataset({
          dataset: lieferungPerson?._raw,
          foreignKeys: [],
        }),
        von_sammlung_id: l.von_sammlung_id,
        von_sammlung_datum: vonSammlung?.datum,
        von_sammlung_herkunft_id: vonSammlung?.herkunft_id,
        von_sammlung_herkunft_nr: vonSammlungHerkunft?.nr,
        von_sammlung_person_id: vonSammlung?.person_id,
        von_sammlung_person_name: personFullname(vonSammlungPerson),
        von_sammlung_rohdaten: removeMetadataFromDataset({
          dataset: vonSammlung?._raw,
          foreignKeys: [],
        }),
        von_kultur_id: l.von_kultur_id,
        von_kultur_garten_id: vonKultur?.garten_id,
        von_kultur_garten_name: vonKulturGarten?.name,
        von_kultur_herkunft_id: vonKultur?.herkunft_id,
        von_kultur_herkunft_nr: vonKulturHerkunft?.nr,
        von_kultur_rohdaten: removeMetadataFromDataset({
          dataset: vonKultur?._raw,
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
        nach_kultur_garten_id: nachKultur?.garten_id,
        nach_kultur_garten_name: nachKulturGarten?.name,
        nach_kultur_herkunft_id: nachKultur?.herkunft_id,
        nach_kultur_herkunft_nr: nachKulturHerkunft?.nr,
        nach_kultur_rohdaten: removeMetadataFromDataset({
          dataset: nachKultur?._raw,
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
    }),
  )
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
  let events = []
  try {
    events = await db
      .get('event')
      .query(Q.where('_deleted', false), Q.where('kultur_id', kultur_id))
      .fetch()
  } catch {}
  const eventsSorted = events.sort(eventSort)
  const eventsData = await Promise.all(
    eventsSorted.map(async (e) => {
      let teilkultur
      try {
        teilkultur = await db.get('teilkultur').find(e.teilkultur_id)
      } catch {}
      let person
      try {
        person = await e.person.fetch()
      } catch {}

      const newZ = {
        id: e.id,
        kultur_id: e.kultur_id,
        teilkultur_id: e.teilkultur_id,
        teilkultur_name: teilkultur?.name,
        teilkultur_rohdaten: removeMetadataFromDataset({
          dataset: teilkultur?._raw,
          foreignKeys: [],
        }),
        person_id: e.person_id,
        person_name: personFullname(person),
        person_rohdaten: removeMetadataFromDataset({
          dataset: person?._raw,
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
    }),
  )
  if (eventsData.length) {
    addWorksheetToExceljsWorkbook({
      workbook,
      title: calledFromHigherUp ? `Kultur_${kultur_name}_Events` : 'Events',
      data: eventsData,
    })
  }
  return
}

export default buildExceljsWorksheets
