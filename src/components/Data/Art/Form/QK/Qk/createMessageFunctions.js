import format from 'date-fns/format'
import groupBy from 'lodash/groupBy'

import exists from '../../../../../../utils/exists'
import artLabelFromArt from '../../../../../../utils/artLabelFromArt'
import gartenLabelFromGarten from '../../../../../../utils/gartenLabelFromGarten'
import treeLabelKultur from '../../../../../../utils/treeLabelKultur'
import treeLabelSammlung from '../../../../../../utils/treeLabelSammlung'

export default ({ artId, store }) => {
  const {
    artsSorted,
    eventsSorted,
    gartensSorted,
    herkunftsSorted,
    kultursSorted,
    lieferungsSorted,
    personsSorted,
    sammlungsSorted,
    teilkultursSorted,
    zaehlungsSorted,
  } = store
  const year = +format(new Date(), 'yyyy')
  const startYear = `${year}-01-01`
  const startNextYear = `${year + 1}-01-01`
  const now = new Date()

  return {
    personsWithNonUniqueNr: () => {
      const pGroupedByNr = groupBy(personsSorted, (h) => h.nr)
      return Object.values(pGroupedByNr)
        .filter((v) => v.length > 1)
        .flatMap((vs) =>
          vs.map((v) => ({
            url: ['Personen', v.id],
            text: `${v.nr}${v.fullname ? `, ${v.fullname}` : ''}`,
          })),
        )
    },
    herkunftsWithNonUniqueNr: () => {
      const hkGroupedByNr = groupBy(herkunftsSorted, (h) => h.nr)
      return Object.values(hkGroupedByNr)
        .filter((v) => v.length > 1)
        .flatMap((vs) =>
          vs.map((v) => ({
            url: ['Herkuenfte', v.id],
            text: `${v.nr}${v.lokalname ? `, ${v.lokalname}` : ''}${
              v.gemeinde ? `, ${v.gemeinde}` : ''
            }`,
          })),
        )
    },
    artsOhneAv: () =>
      artsSorted
        .filter((a) => a.id === artId)
        .filter(
          (a) =>
            ![...store.avs.values()]
              .filter((av) => av.art_id === a.id)
              .filter((av) => !av._deleted).length,
        )
        .map((a) => ({
          url: ['Arten', a.id],
          text: artLabelFromArt({ art: a, store }),
        })),
    sammlungsWithoutLieferung: () =>
      sammlungsSorted
        .filter((s) => s.art_id === artId)
        .filter(
          (s) => !lieferungsSorted.find((l) => l.von_sammlung_id === s.id),
        )
        .map((s) => ({
          url: ['Sammlungen', s.id],
          text: treeLabelSammlung({ sammlung: s, store }),
        })),
    sammlungsWithNonUniqueNr: () => {
      const sGroupedByNr = groupBy(
        sammlungsSorted.filter((s) => s.art_id === artId),
        (h) => h.nr,
      )
      return Object.values(sGroupedByNr)
        .filter((s) => s.length > 1)
        .flatMap((vs) =>
          vs.map((s) => ({
            url: ['Sammlungen', s.id],
            text: treeLabelSammlung({ sammlung: s, store }),
          })),
        )
    },
    sammlungsWithoutNr: () =>
      sammlungsSorted
        .filter((s) => s.art_id === artId)
        .filter((s) => !exists(s.nr))
        .map((s) => ({
          url: ['Arten', artId, 'Sammlungen', s.id],
          text: treeLabelSammlung({ sammlung: s, store }),
        })),
    sammlungsWithoutHerkunft: () =>
      sammlungsSorted
        .filter((s) => s.art_id === artId)
        .filter((s) => !s.herkunft_id)
        .map((s) => ({
          url: ['Arten', artId, 'Sammlungen', s.id],
          text: treeLabelSammlung({ sammlung: s, store }),
        })),
    sammlungsWithoutPerson: () =>
      sammlungsSorted
        .filter((s) => s.art_id === artId)
        .filter((s) => !s.person_id)
        .map((s) => ({
          url: ['Arten', artId, 'Sammlungen', s.id],
          text: treeLabelSammlung({ sammlung: s, store }),
        })),
    sammlungsWithoutDatum: () =>
      sammlungsSorted
        .filter((s) => s.art_id === artId)
        .filter((s) => !s.datum)
        .map((s) => ({
          url: ['Arten', artId, 'Sammlungen', s.id],
          text: treeLabelSammlung({ sammlung: s, store }),
        })),
    sammlungsWithoutAnzahlPflanzen: () =>
      sammlungsSorted
        .filter((s) => s.art_id === artId)
        .filter((s) => !exists(s.anzahl_pflanzen))
        .map((s) => ({
          url: ['Arten', artId, 'Sammlungen', s.id],
          text: treeLabelSammlung({ sammlung: s, store }),
        })),
    sammlungsWithoutVonAnzahlIdividuen: () =>
      sammlungsSorted
        .filter((s) => s.art_id === artId)
        .filter((s) => !exists(s.von_anzahl_individuen))
        .map((s) => ({
          url: ['Arten', artId, 'Sammlungen', s.id],
          text: treeLabelSammlung({ sammlung: s, store }),
        })),
    gartensAllKultursInactive: () =>
      gartensSorted
        .filter((g) => {
          const kulturs = [...store.kulturs.values()]
            .filter((k) => k.garten_id === g.id)
            .filter((k) => !k._deleted)
          const kultursCount = kulturs.length
          const activeKultursCount = kulturs.filter((k) => k.aktiv).length
          return !!kultursCount && !activeKultursCount
        })
        .map((g) => ({
          url: ['Gaerten', g.id],
          text: gartenLabelFromGarten({ garten: g, store }),
        })),
    kultursWithoutVonAnzahlIndividuen: () =>
      kultursSorted
        .filter((s) => s.art_id === artId)
        .filter((s) => !exists(s.von_anzahl_individuen))
        .map((k) => ({
          url: ['Arten', artId, 'Kulturen', k.id],
          text: treeLabelKultur({ kultur: k, store }),
        })),
    kultursWithoutGarten: () =>
      kultursSorted
        .filter((s) => s.art_id === artId)
        .filter((s) => !s.garten_id)
        .map((k) => ({
          url: ['Arten', artId, 'Kulturen', k.id],
          text: treeLabelKultur({ kultur: k, store }),
        })),
    kultursWithoutHerkunft: () =>
      kultursSorted
        .filter((s) => s.art_id === artId)
        .filter((s) => !s.herkunft_id)
        .map((k) => ({
          url: ['Arten', artId, 'Kulturen', k.id],
          text: treeLabelKultur({ kultur: k, store }),
        })),
    kultursWithoutZaehlungThisYear: () =>
      kultursSorted
        .filter((s) => s.art_id === artId)
        .filter(
          (k) =>
            [...store.zaehlungs.values()]
              .filter((z) => z.id === k.zaehlung_id)
              .filter((z) => !z._deleted)
              .filter(
                (z) =>
                  z.datum && z.datum > startYear && z.datum < startNextYear,
              ).length === 0,
        )
        .map((k) => ({
          url: ['Arten', artId, 'Kulturen', k.id],
          text: treeLabelKultur({ kultur: k, store }),
        })),
    teilkultursWithoutName: () =>
      teilkultursSorted
        .filter((tk) => {
          const kultur = tk.kultur_id ? store.kulturs.get(tk.kultur_id) : {}

          return kultur?.art_id === artId
        })
        .filter((tk) => !tk.name)
        .map((tk) => {
          const kultur = tk.kultur_id ? store.kulturs.get(tk.kultur_id) : {}
          const kulturLabel = treeLabelKultur({
            kultur,
            store,
          })
          const text = `${kulturLabel}, Teilkultur-ID: ${tk.id}`

          return {
            url: [
              'Arten',
              artId,
              'Kulturen',
              kultur?.id,
              'Teilkulturen',
              tk.id,
            ],
            text,
          }
        }),
    zaehlungsInFutureNotPrognose: () =>
      zaehlungsSorted
        .filter((z) => {
          const kultur = z.kultur_id ? store.kulturs.get(z.kultur_id) : {}
          return kultur?.art_id === artId
        })
        .filter((z) => !!z.datum)
        .filter((z) => new Date(z.datum).getTime() > now)
        .map((z) => {
          const kultur = z.kultur_id ? store.kulturs.get(z.kultur_id) : {}
          const kulturLabel = treeLabelKultur({
            kultur,
            store,
          })
          const text = `${kulturLabel}, Zählung-ID: ${z.id}`

          return {
            url: ['Arten', artId, 'Kulturen', z.id, 'Zaehlungen', z.id],
            text,
          }
        }),
    zaehlungsWithoutDatum: () =>
      zaehlungsSorted
        .filter((z) => {
          const kultur = z.kultur_id ? store.kulturs.get(z.kultur_id) : {}
          return kultur?.art_id === artId
        })
        .filter((z) => !z.datum)
        .map((z) => {
          const kultur = z.kultur_id ? store.kulturs.get(z.kultur_id) : {}
          const kulturLabel = treeLabelKultur({
            kultur,
            store,
          })
          const text = `${kulturLabel}, Zählung-ID: ${z.id}`

          return {
            url: ['Arten', artId, 'Kulturen', z.id, 'Zaehlungen', z.id],
            text,
          }
        }),
    zaehlungsWithoutAnzahlPflanzen: () =>
      zaehlungsSorted
        .filter((z) => {
          const kultur = z.kultur_id ? store.kulturs.get(z.kultur_id) : {}
          return kultur?.art_id === artId
        })
        .filter(
          (z) =>
            [...store.teilzaehlungs.values()]
              .filter((tz) => tz.zaehlung_id === z.id)
              .filter((tz) => !tz._deleted)
              .filter((tz) => !exists(tz.anzahl_pflanzen)).length,
        )
        .map((z) => {
          const kultur = z.kultur_id ? store.kulturs.get(z.kultur_id) : {}
          const kulturLabel = treeLabelKultur({
            kultur,
            store,
          })
          const zaehlung = z.datum
            ? `Zählung vom ${format(new Date(z.datum), 'yyyy.MM.dd')}`
            : `Zählung-ID: ${z.id}`
          const anzTz = [...store.teilzaehlungs.values()]
            .filter((tz) => tz.zaehlung_id === z.id)
            .filter((tz) => !tz._deleted).length
          const teilzaehlung = anzTz > 1 ? ` (${anzTz} Teilzählungen)` : ''
          const text = `${kulturLabel}, ${zaehlung}${teilzaehlung}`

          return {
            url: ['Arten', artId, 'Kulturen', kultur.id, 'Zaehlungen', z.id],
            text,
          }
        }),
    zaehlungsWithoutAnzahlAuspflanzbereit: () =>
      zaehlungsSorted
        .filter((z) => {
          const kultur = z.kultur_id ? store.kulturs.get(z.kultur_id) : {}
          return kultur?.art_id === artId
        })
        .filter(
          (z) =>
            [...store.teilzaehlungs.values()]
              .filter((tz) => tz.zaehlung_id === z.id)
              .filter((tz) => !tz._deleted)
              .filter((tz) => !exists(tz.anzahl_auspflanzbereit)).length,
        )
        .map((z) => {
          const kultur = z.kultur_id ? store.kulturs.get(z.kultur_id) : {}
          const kulturLabel = treeLabelKultur({
            kultur,
            store,
          })
          const zaehlung = z.datum
            ? `Zählung vom ${format(new Date(z.datum), 'yyyy.MM.dd')}`
            : `Zählung-ID: ${z.id}`
          const anzTz = [...store.teilzaehlungs.values()]
            .filter((tz) => tz.zaehlung_id === z.id)
            .filter((tz) => !tz._deleted).length
          const teilzaehlung = anzTz > 1 ? ` (${anzTz} Teilzählungen)` : ''
          const text = `${kulturLabel}, ${zaehlung}${teilzaehlung}`

          return {
            url: ['Arten', artId, 'Kulturen', kultur.id, 'Zaehlungen', z.id],
            text,
          }
        }),
    zaehlungsWithoutAnzahlMutterpflanzen: () =>
      zaehlungsSorted
        .filter((z) => {
          const kultur = z.kultur_id ? store.kulturs.get(z.kultur_id) : {}
          return kultur?.art_id === artId
        })
        .filter(
          (z) =>
            [...store.teilzaehlungs.values()]
              .filter((tz) => tz.zaehlung_id === z.id)
              .filter((tz) => !tz._deleted)
              .filter((tz) => !exists(tz.anzahl_mutterpflanzen)).length,
        )
        .map((z) => {
          const kultur = z.kultur_id ? store.kulturs.get(z.kultur_id) : {}
          const kulturLabel = treeLabelKultur({
            kultur,
            store,
          })
          const zaehlung = z.datum
            ? `Zählung vom ${format(new Date(z.datum), 'yyyy.MM.dd')}`
            : `Zählung-ID: ${z.id}`
          const anzTz = [...store.teilzaehlungs.values()]
            .filter((tz) => tz.zaehlung_id === z.id)
            .filter((tz) => !tz._deleted).length
          const teilzaehlung = anzTz > 1 ? ` (${anzTz} Teilzählungen)` : ''
          const text = `${kulturLabel}, ${zaehlung}${teilzaehlung}`

          return {
            url: ['Arten', artId, 'Kulturen', kultur?.id, 'Zaehlungen', z.id],
            text,
          }
        }),
    zaehlungsWithTeilzaehlungsWithoutTeilkulturThoughTeilkulturIsChoosen: () =>
      zaehlungsSorted
        .filter((z) => {
          const kultur = z.kultur_id ? store.kulturs.get(z.kultur_id) : {}
          const kulturOption = z.kultur_id
            ? store.kultur_options.get(z.kultur_id)
            : {}
          return kultur?.art_id === artId && !!kulturOption?.tk
        })
        .filter((z) => {
          const tz = [...store.teilzaehlungs.values()]
            .filter((tz) => tz.zaehlung_id === z.id)
            .filter((tz) => !tz._deleted)
          return tz.length && tz.filter((tz) => !tz.teilkultur_id).length
        })
        .map((z) => {
          const kultur = z.kultur_id ? store.kulturs.get(z.kultur_id) : {}
          const kulturLabel = treeLabelKultur({
            kultur,
            store,
          })
          const zaehlung = z.datum
            ? `Zählung vom ${format(new Date(z.datum), 'yyyy.MM.dd')}`
            : `Zählung-ID: ${z.id}`
          const anzTz = [...store.teilzaehlungs.values()]
            .filter((tz) => tz.zaehlung_id === z.id)
            .filter((tz) => !tz._deleted).length
          const teilzaehlung = anzTz > 1 ? ` (${anzTz} Teilzählungen)` : ''
          const text = `${kulturLabel}, ${zaehlung}${teilzaehlung}`

          return {
            url: ['Arten', artId, 'Kulturen', kultur?.id, 'Zaehlungen', z.id],
            text,
          }
        }),
    lieferungsWithMultipleVon: () =>
      lieferungsSorted
        .filter((l) => l.art_id === artId)
        .filter((l) => !!l.von_sammlung_id)
        .filter((l) => !!l.von_kultur_id)
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
        .filter((l) => l.art_id === artId)
        .filter((l) => l.nach_ausgepflanzt)
        .filter((l) => !!l.nach_kultur_id)
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
    lieferungsWithoutAnzahlPflanzen: () =>
      lieferungsSorted
        .filter((l) => l.art_id === artId)
        .filter((l) => !exists(l.anzahl_pflanzen))
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
    lieferungsWithoutAnzahlAuspflanzbereit: () =>
      lieferungsSorted
        .filter((l) => l.art_id === artId)
        .filter((l) => !exists(l.anzahl_auspflanzbereit))
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
    lieferungsWithoutVonAnzahlIndividuen: () =>
      lieferungsSorted
        .filter((l) => l.art_id === artId)
        .filter((l) => !exists(l.von_anzahl_individuen))
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
    lieferungsWithoutVon: () =>
      lieferungsSorted
        .filter((l) => l.art_id === artId)
        .filter((l) => !l.von_kultur_id)
        .filter((l) => !l.von_sammlung_id)
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
    lieferungsWithoutNach: () =>
      lieferungsSorted
        .filter((l) => l.art_id === artId)
        .filter((l) => !!l.von_kultur_id || !!l.von_sammlung_id)
        .filter((l) => !l.nach_kultur_id)
        .filter((l) => !l.nach_ausgepflanzt)
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
    lieferungsWithoutDatum: () =>
      lieferungsSorted
        .filter((l) => l.art_id === artId)
        .filter((l) => !l.datum)
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
    lieferungsWithoutPerson: () =>
      lieferungsSorted
        .filter((l) => l.art_id === artId)
        .filter((l) => !l.person_id)
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
    eventsWithoutBeschreibung: () =>
      eventsSorted
        .filter((e) => {
          const kultur = e.kultur_id ? store.kulturs.get(e.kultur_id) : {}
          return kultur?.art_id === artId
        })
        .filter((e) => !e.beschreibung)
        .map((e) => {
          const kultur = e.kultur_id ? store.kulturs.get(e.kultur_id) : {}
          const kulturLabel = treeLabelKultur({
            kultur,
            store,
          })
          const text = `${kulturLabel}, Event-ID: ${e.id}`

          return {
            url: ['Arten', artId, 'Kulturen', kultur?.id, 'Events', e.id],
            text,
          }
        }),
    eventsWithoutDatum: () =>
      eventsSorted
        .filter((e) => {
          const kultur = e.kultur_id ? store.kulturs.get(e.kultur_id) : {}
          return kultur?.art_id === artId
        })
        .filter((e) => !e.datum)
        .map((e) => {
          const kultur = e.kultur_id ? store.kulturs.get(e.kultur_id) : {}
          const kulturLabel = treeLabelKultur({
            kultur,
            store,
          })
          const text = `${kulturLabel}, Event-ID: ${e.id}`

          return {
            url: ['Arten', artId, 'Kulturen', kultur.id, 'Events', e.id],
            text,
          }
        }),
  }
}
