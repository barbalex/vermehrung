import format from 'date-fns/format'

import exists from '../../../../../../utils/exists'
import herkunftLabelFromKultur from '../../../../../../utils/herkunftLabelFromKultur'
import gartenLabelFromKultur from '../../../../../../utils/gartenLabelFromKultur'

const createMessageFunctions = ({ kulturId, store }) => {
  const {
    lieferungsSorted,
    kultursSorted,
    teilkultursSorted,
    eventsSorted,
    zaehlungsSorted,
  } = store
  const year = +format(new Date(), 'yyyy')
  const startYear = `${year}-01-01`
  const startNextYear = `${year + 1}-01-01`
  const now = new Date()

  return {
    kultursWithoutVonAnzahlIndividuen: () =>
      kultursSorted
        .filter((k) => k.id === kulturId)
        .filter((k) => !exists(k.von_anzahl_individuen))
        .map((k) => {
          const gartenLabel = gartenLabelFromKultur({ kultur: k, store })
          const herkunftLabel = herkunftLabelFromKultur({ kultur: k, store })

          return {
            url: ['Kulturen', kulturId],
            text: `von: ${herkunftLabel}, in: ${gartenLabel}`,
          }
        }),
    kultursWithoutGarten: () =>
      kultursSorted
        .filter((k) => k.id === kulturId)
        .filter((k) => !k.garten_id)
        .map((k) => {
          const herkunftLabel = herkunftLabelFromKultur({ kultur: k, store })
          const text = `ID: ${k.id}, von: ${herkunftLabel}`

          return {
            url: ['Kulturen', kulturId],
            text,
          }
        }),
    kultursWithoutHerkunft: () =>
      kultursSorted
        .filter((k) => k.id === kulturId)
        .filter((k) => !k.herkunft_id)
        .map((k) => {
          const gartenLabel = gartenLabelFromKultur({ kultur: k, store })

          return {
            url: ['Kulturen', kulturId],
            text: `ID: ${k.id}, in: ${gartenLabel}`,
          }
        }),
    kultursWithoutZaehlungThisYear: () =>
      kultursSorted
        .filter((k) => k.id === kulturId)
        .filter(
          (k) =>
            [...store.zaehlungs.values()]
              .filter((z) => z.kultur_id === k.id)
              .filter((z) => !z._deleted)
              .filter(
                (z) =>
                  z.datum && z.datum > startYear && z.datum < startNextYear,
              ).length === 0,
        )
        .map((k) => {
          const gartenLabel = gartenLabelFromKultur({ kultur: k, store })
          const herkunftLabel = herkunftLabelFromKultur({ kultur: k, store })

          return {
            url: ['Kulturen', kulturId],
            text: `von: ${herkunftLabel}, in: ${gartenLabel}`,
          }
        }),
    teilkultursWithoutName: () =>
      teilkultursSorted
        .filter((tk) => tk.kultur_id === kulturId)
        .filter((tk) => !tk.name)
        .map((tk) => {
          const kultur = tk?.kultur_id ? store.kulturs.get(tk.kultur_id) : {}
          const gartenLabel = gartenLabelFromKultur({ kultur, store })
          const herkunftLabel = herkunftLabelFromKultur({ kultur, store })

          return {
            url: ['Kulturen', kulturId, 'Teilkulturen', tk.id],
            text: `von: ${herkunftLabel}, in: ${gartenLabel}, Teilkultur-ID: ${tk.id}`,
          }
        }),
    zaehlungsInFutureNotPrognose: () =>
      zaehlungsSorted
        .filter((z) => z.kultur_id === kulturId)
        .filter((z) => !!z.datum)
        .filter((z) => new Date(z.datum).getTime() > now)
        .map((z) => {
          const kultur = z?.kultur_id ? store.kulturs.get(z.kultur_id) : {}
          const gartenLabel = gartenLabelFromKultur({ kultur, store })
          const herkunftLabel = herkunftLabelFromKultur({ kultur, store })

          return {
            url: [
              'Arten',
              kultur?.art_id,
              'Kulturen',
              z.id,
              'Zaehlungen',
              z.id,
            ],
            text: `von: ${herkunftLabel}, in: ${gartenLabel}, Zählung-ID: ${z.id}`,
          }
        }),
    zaehlungsWithoutDatum: () =>
      zaehlungsSorted
        .filter((z) => z.kultur_id === kulturId)
        .filter((z) => !z.datum)
        .map((z) => {
          const kultur = z?.kultur_id ? store.kulturs.get(z.kultur_id) : {}
          const gartenLabel = gartenLabelFromKultur({ kultur, store })
          const herkunftLabel = herkunftLabelFromKultur({ kultur, store })

          return {
            url: [
              'Arten',
              kultur?.art_id,
              'Kulturen',
              kulturId,
              'Zaehlungen',
              z.id,
            ],
            text: `von: ${herkunftLabel}, in: ${gartenLabel}, Zählung-ID: ${z.id}`,
          }
        }),
    zaehlungsWithoutAnzahlPflanzen: () =>
      zaehlungsSorted
        .filter((z) => z.kultur_id === kulturId)
        .filter(
          (z) =>
            [...store.teilzaehlungs.values()]
              .filter((tz) => tz.zaehlung_id === z.id)
              .filter((tz) => !tz._deleted)
              .filter((tz) => !exists(tz.anzahl_pflanzen)).length,
        )
        .map((z) => {
          const kultur = z?.kultur_id ? store.kulturs.get(z.kultur_id) : {}
          const gartenLabel = gartenLabelFromKultur({ kultur, store })
          const herkunftLabel = herkunftLabelFromKultur({ kultur, store })
          const zaehlungLabel = z.datum
            ? `Zählung vom ${format(new Date(z.datum), 'yyyy.MM.dd')}`
            : `Zählung-ID: ${z.id}`
          const tzs = [...store.teilzaehlungs.values()]
            .filter((tz) => tz.zaehlung_id === z.id)
            .filter((tz) => !tz._deleted)
          const anzTz = tzs.length
          const teilzaehlung = anzTz > 1 ? ` (${anzTz} Teilzählungen)` : ''
          const text = `von: ${herkunftLabel}, in: ${gartenLabel}, ${zaehlungLabel}${teilzaehlung}`

          return {
            url: [
              'Arten',
              kultur?.art_id,
              'Kulturen',
              kulturId,
              'Zaehlungen',
              z.id,
            ],
            text,
          }
        }),
    zaehlungsWithoutAnzahlAuspflanzbereit: () =>
      zaehlungsSorted
        .filter((z) => z.kultur_id === kulturId)
        .filter(
          (z) =>
            [...store.teilzaehlungs.values()]
              .filter((tz) => tz.zaehlung_id === z.id)
              .filter((tz) => !tz._deleted)
              .filter((tz) => !exists(tz.anzahl_auspflanzbereit)).length,
        )
        .map((z) => {
          const kultur = z?.kultur_id ? store.kulturs.get(z.kultur_id) : {}
          const gartenLabel = gartenLabelFromKultur({ kultur, store })
          const herkunftLabel = herkunftLabelFromKultur({ kultur, store })
          const zaehlung = z.datum
            ? `Zählung vom ${format(new Date(z.datum), 'yyyy.MM.dd')}`
            : `Zählung-ID: ${z.id}`
          const anzTz = [...store.teilzaehlungs.values()]
            .filter((tz) => tz.zaehlung_id === z.id)
            .filter((tz) => !tz._deleted).length
          const teilzaehlung = anzTz > 1 ? ` (${anzTz} Teilzählungen)` : ''
          const text = `von: ${herkunftLabel}, in: ${gartenLabel}, ${zaehlung}${teilzaehlung}`

          return {
            url: [
              'Arten',
              kultur?.art_id,
              'Kulturen',
              kulturId,
              'Zaehlungen',
              z.id,
            ],
            text,
          }
        }),
    zaehlungsWithoutAnzahlMutterpflanzen: () =>
      zaehlungsSorted
        .filter((z) => z.kultur_id === kulturId)
        .filter(
          (z) =>
            [...store.teilzaehlungs.values()]
              .filter((tz) => tz.zaehlung_id === z.id)
              .filter((tz) => !tz._deleted)
              .filter((tz) => !exists(tz.anzahl_mutterpflanzen)).length,
        )
        .map((z) => {
          const kultur = z?.kultur_id ? store.kulturs.get(z.kultur_id) : {}
          const gartenLabel = gartenLabelFromKultur({ kultur, store })
          const herkunftLabel = herkunftLabelFromKultur({ kultur, store })
          const zaehlung = z.datum
            ? `Zählung vom ${format(new Date(z.datum), 'yyyy.MM.dd')}`
            : `Zählung-ID: ${z.id}`
          const anzTz = [...store.teilzaehlungs.values()]
            .filter((tz) => tz.zaehlung_id === z.id)
            .filter((tz) => !tz._deleted).length
          const teilzaehlung = anzTz > 1 ? ` (${anzTz} Teilzählungen)` : ''
          const text = `von: ${herkunftLabel}, in: ${gartenLabel}, ${zaehlung}${teilzaehlung}`

          return {
            url: [
              'Arten',
              kultur?.art_id,
              'Kulturen',
              kulturId,
              'Zaehlungen',
              z.id,
            ],
            text,
          }
        }),
    zaehlungsWithTeilzaehlungsWithoutTeilkulturThoughTeilkulturIsChoosen: () =>
      zaehlungsSorted
        .filter((z) => z.kultur_id === kulturId)
        .filter((z) => {
          const kulturOption = z.kultur_id
            ? store.kultur_options.get(z.kultur_id)
            : {}
          return !!kulturOption?.tk
        })
        .filter((z) => {
          const tzs = [...store.teilzaehlungs.values()]
            .filter((tz) => tz.zaehlung_id === z.id)
            .filter((tz) => !tz._deleted)
          return tzs.length && tzs.filter((tz) => !tz.teilkultur_id).length
        })
        .map((z) => {
          const kultur = z?.kultur_id ? store.kulturs.get(z.kultur_id) : {}
          const gartenLabel = gartenLabelFromKultur({ kultur, store })
          const herkunftLabel = herkunftLabelFromKultur({ kultur, store })
          const zaehlung = z.datum
            ? `Zählung vom ${format(new Date(z.datum), 'yyyy.MM.dd')}`
            : `Zählung-ID: ${z.id}`
          const anzTz = [...store.teilzaehlungs.values()]
            .filter((tz) => tz.zaehlung_id === z.id)
            .filter((tz) => !tz._deleted).length
          const teilzaehlung = anzTz > 1 ? ` (${anzTz} Teilzählungen)` : ''

          return {
            url: [
              'Arten',
              kultur?.art_id,
              'Kulturen',
              kultur?.id,
              'Zaehlungen',
              z.id,
            ],
            text: `von: ${herkunftLabel}, in: ${gartenLabel}, ${zaehlung}${teilzaehlung}`,
          }
        }),
    lieferungsWithMultipleVon: () =>
      lieferungsSorted
        .filter((l) => l.von_kultur_id === kulturId)
        .filter((l) => !!l.von_sammlung_id)
        .map((l) => {
          const datum = l.datum
            ? format(new Date(l.datum), 'yyyy.MM.dd')
            : `kein Datum`
          const geplant = l.geplant ? ', (geplant)' : ''
          const text = `${datum}, ID: ${l.id}${geplant}`

          return {
            url: ['Lieferungen', l.id],
            text,
          }
        }),
    lieferungsWithMultipleNach: () =>
      lieferungsSorted
        .filter((l) => l.nach_kultur_id === kulturId)
        .filter((l) => l.nach_ausgepflanzt)
        .map((l) => {
          const datum = l.datum
            ? format(new Date(l.datum), 'yyyy.MM.dd')
            : `kein Datum`
          const geplant = l.geplant ? ', (geplant)' : ''
          const text = `${datum}, ID: ${l.id}${geplant}`

          return {
            url: ['Lieferungen', l.id],
            text,
          }
        }),
    anLieferungsWithoutAnzahlPflanzen: () =>
      lieferungsSorted
        .filter((l) => l.nach_kultur_id === kulturId)
        .filter((l) => !exists(l.anzahl_pflanzen))
        .map((l) => {
          const datum = l.datum
            ? format(new Date(l.datum), 'yyyy.MM.dd')
            : `kein Datum`
          const geplant = l.geplant ? ', (geplant)' : ''
          const text = `${datum}, ID: ${l.id}${geplant}`

          return {
            url: ['Kulturen', kulturId, 'An-Lieferungen', l.id],
            text,
          }
        }),
    ausLieferungsWithoutAnzahlPflanzen: () =>
      lieferungsSorted
        .filter((l) => l.von_kultur_id === kulturId)
        .filter((l) => !exists(l.anzahl_pflanzen))
        .map((l) => {
          const datum = l.datum
            ? format(new Date(l.datum), 'yyyy.MM.dd')
            : `kein Datum`
          const geplant = l.geplant ? ', (geplant)' : ''
          const text = `${datum}, ID: ${l.id}${geplant}`

          return {
            url: ['Kulturen', kulturId, 'Aus-Lieferungen', l.id],
            text,
          }
        }),
    anLieferungsWithoutAnzahlAuspflanzbereit: () =>
      lieferungsSorted
        .filter((l) => l.nach_kultur_id === kulturId)
        .filter((l) => !exists(l.anzahl_auspflanzbereit))
        .map((l) => {
          const datum = l.datum
            ? format(new Date(l.datum), 'yyyy.MM.dd')
            : `kein Datum`
          const geplant = l.geplant ? ', (geplant)' : ''
          const text = `${datum}, ID: ${l.id}${geplant}`

          return {
            url: ['Kulturen', kulturId, 'An-Lieferungen', l.id],
            text,
          }
        }),
    ausLieferungsWithoutAnzahlAuspflanzbereit: () =>
      lieferungsSorted
        .filter((l) => l.von_kultur_id === kulturId)
        .filter((l) => !exists(l.anzahl_auspflanzbereit))
        .map((l) => {
          const datum = l.datum
            ? format(new Date(l.datum), 'yyyy.MM.dd')
            : `kein Datum`
          const geplant = l.geplant ? ', (geplant)' : ''
          const text = `${datum}, ID: ${l.id}${geplant}`

          return {
            url: ['Kulturen', kulturId, 'Aus-Lieferungen', l.id],
            text,
          }
        }),
    anLieferungsWithoutVonAnzahlIndividuen: () =>
      lieferungsSorted
        .filter((l) => l.nach_kultur_id === kulturId)
        .filter((l) => !exists(l.von_anzahl_individuen))
        .map((l) => {
          const datum = l.datum
            ? format(new Date(l.datum), 'yyyy.MM.dd')
            : `kein Datum`
          const geplant = l.geplant ? ', (geplant)' : ''
          const text = `${datum}, ID: ${l.id}${geplant}`

          return {
            url: ['Kulturen', kulturId, 'An-Lieferungen', l.id],
            text,
          }
        }),
    ausLieferungsWithoutVonAnzahlIndividuen: () =>
      lieferungsSorted
        .filter((l) => l.von_kultur_id === kulturId)
        .filter((l) => !exists(l.von_anzahl_individuen))
        .map((l) => {
          const datum = l.datum
            ? format(new Date(l.datum), 'yyyy.MM.dd')
            : `kein Datum`
          const geplant = l.geplant ? ', (geplant)' : ''
          const text = `${datum}, ID: ${l.id}${geplant}`

          return {
            url: ['Kulturen', kulturId, 'Aus-Lieferungen', l.id],
            text,
          }
        }),
    anLieferungsWithoutVon: () =>
      lieferungsSorted
        .filter((l) => l.nach_kultur_id === kulturId)
        .filter((l) => !l.von_kultur_id)
        .filter((l) => !l.von_sammlung_id)
        .map((l) => {
          const datum = l.datum
            ? format(new Date(l.datum), 'yyyy.MM.dd')
            : `kein Datum`
          const geplant = l.geplant ? ', (geplant)' : ''
          const text = `${datum}, ID: ${l.id}${geplant}`

          return {
            url: ['Kulturen', kulturId, 'An-Lieferungen', l.id],
            text,
          }
        }),
    ausLieferungsWithoutNach: () =>
      lieferungsSorted
        .filter((l) => l.von_kultur_id === kulturId)
        .filter((l) => !l.nach_kultur_id)
        .filter((l) => !l.nach_ausgepflanzt)
        .map((l) => {
          const datum = l.datum
            ? format(new Date(l.datum), 'yyyy.MM.dd')
            : `kein Datum`
          const geplant = l.geplant ? ', (geplant)' : ''
          const text = `${datum}, ID: ${l.id}${geplant}`

          return {
            url: ['Kulturen', kulturId, 'Aus-Lieferungen', l.id],
            text,
          }
        }),
    anLieferungsWithoutDatum: () =>
      lieferungsSorted
        .filter((l) => l.von_kultur_id === kulturId)
        .filter((l) => !l.datum)
        .map((l) => {
          const datum = l.datum
            ? format(new Date(l.datum), 'yyyy.MM.dd')
            : `kein Datum`
          const geplant = l.geplant ? ', (geplant)' : ''
          const text = `${datum}, ID: ${l.id}${geplant}`

          return {
            url: ['Kulturen', kulturId, 'An-Lieferungen', l.id],
            text,
          }
        }),
    ausLieferungsWithoutDatum: () =>
      lieferungsSorted
        .filter((l) => l.von_kultur_id === kulturId)
        .filter((l) => !l.datum)
        .map((l) => {
          const datum = l.datum
            ? format(new Date(l.datum), 'yyyy.MM.dd')
            : `kein Datum`
          const geplant = l.geplant ? ', (geplant)' : ''
          const text = `${datum}, ID: ${l.id}${geplant}`

          return {
            url: ['Kulturen', kulturId, 'Aus-Lieferungen', l.id],
            text,
          }
        }),
    anLieferungsWithoutPerson: () =>
      lieferungsSorted
        .filter((l) => l.nach_kultur_id === kulturId)
        .filter((l) => !l.person_id)
        .map((l) => {
          const datum = l.datum
            ? format(new Date(l.datum), 'yyyy.MM.dd')
            : `kein Datum`
          const geplant = l.geplant ? ', (geplant)' : ''
          const text = `${datum}, ID: ${l.id}${geplant}`

          return {
            url: ['Kulturen', kulturId, 'An-Lieferungen', l.id],
            text,
          }
        }),
    ausLieferungsWithoutPerson: () =>
      lieferungsSorted
        .filter((l) => l.von_kultur_id === kulturId)
        .filter((l) => !l.person_id)
        .map((l) => {
          const datum = l.datum
            ? format(new Date(l.datum), 'yyyy.MM.dd')
            : `kein Datum`
          const geplant = l.geplant ? ', (geplant)' : ''
          const text = `${datum}, ID: ${l.id}${geplant}`

          return {
            url: ['Kulturen', kulturId, 'Aus-Lieferungen', l.id],
            text,
          }
        }),
    eventsWithoutBeschreibung: () =>
      eventsSorted
        .filter((e) => e.kultur_id === kulturId)
        .filter((e) => !e.beschreibung)
        .map((ev) => {
          const kultur = ev?.kultur_id ? store.kulturs.get(ev.kultur_id) : {}
          const gartenLabel = gartenLabelFromKultur({ kultur, store })
          const herkunftLabel = herkunftLabelFromKultur({ kultur, store })

          return {
            url: ['Kulturen', kulturId, 'Events', ev.id],
            text: `von: ${herkunftLabel}, in: ${gartenLabel}, Event-ID: ${ev.id}`,
          }
        }),
    eventsWithoutDatum: () =>
      eventsSorted
        .filter((e) => e.kultur_id === kulturId)
        .filter((e) => !e.datum)
        .map((ev) => {
          const kultur = ev?.kultur_id ? store.kulturs.get(ev.kultur_id) : {}
          const gartenLabel = gartenLabelFromKultur({ kultur, store })
          const herkunftLabel = herkunftLabelFromKultur({ kultur, store })

          return {
            url: ['Kulturen', kulturId, 'Events', ev.id],
            text: `von: ${herkunftLabel}, in: ${gartenLabel}, Event-ID: ${ev.id}`,
          }
        }),
  }
}

export default createMessageFunctions
