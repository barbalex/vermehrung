import { useEffect, useState } from 'react'
import { useAtomValue } from 'jotai'
import { Q } from 'nitromelondb'
import { from, of, type Observable } from 'rxjs'
import { map, switchMap, catchError } from 'rxjs/operators'

import { dbAtom } from '../../store/index.ts'
import { herkunftLabelFromHerkunft } from '../../utils/herkunftLabelFromHerkunft.ts'
import { personLabelFromPerson } from '../../utils/personLabelFromPerson.ts'
import { teilkulturLabelFromTeilkultur } from '../../utils/teilkulturLabelFromTeilkultur.ts'
import { zaehlungLabelFromZaehlung } from '../../utils/zaehlungLabelFromZaehlung.ts'

import type {
  Art,
  Bedarf,
  Garten,
  Herkunft,
  Kultur,
  Lieferung,
  Person,
  SammelLieferung,
  Sammlung,
  Teilkultur,
  Teilzaehlung,
  Zaehlung,
} from '../../dbModel.ts'

// url folder name -> table
const tableByFolder: Record<string, string> = {
  Arten: 'art',
  Herkuenfte: 'herkunft',
  Sammlungen: 'sammlung',
  Gaerten: 'garten',
  Kulturen: 'kultur',
  Teilkulturen: 'teilkultur',
  Zaehlungen: 'zaehlung',
  Lieferungen: 'lieferung',
  'An-Lieferungen': 'lieferung',
  'Aus-Lieferungen': 'lieferung',
  'Sammel-Lieferungen': 'sammel_lieferung',
  Personen: 'person',
  Bedarf: 'bedarf',
}

// most labels are Observable<Promise<string>> - flatten whatever arrives
const resolveLabel = (
  observable: Observable<string | Promise<string> | undefined>,
) =>
  observable.pipe(
    switchMap((value) =>
      typeof (value as Promise<string>)?.then === 'function'
        ? from(value as Promise<string>)
        : of(value as string | undefined),
    ),
    // queries emit [] while the local db has not loaded the row yet -
    // undefined keeps the lookup alive until the row appears
    catchError(() => of(undefined)),
  )

// resolves the label of the row id'd in the url after the given folder,
// reactively from the local db.
// the row is observed itself (not via a by-id query): plain query
// observation only re-emits when the result set changes, so field edits
// would never refresh the crumb.
// parentFolder selects the context-dependent label variants
// (kultur under art/garten, sammlung under herkunft)
export const useRowLabel = ({
  folder,
  parentFolder,
  id,
}: {
  folder: string
  parentFolder?: string | number
  id: string | number
}) => {
  const db = useAtomValue(dbAtom)
  const [label, setLabel] = useState<string | undefined>(undefined)

  useEffect(() => {
    setLabel(undefined)
    const table = tableByFolder[folder]
    const idString = String(id)
    let observable: Observable<string | Promise<string> | undefined> | undefined
    if (db && table) {
      switch (table) {
        case 'art':
          observable = db
            .get<Art>('art')
            .findAndObserveOrNull(idString)
            .pipe(
              switchMap((row) => (row ? row.label : of(undefined))),
            )
          break
        case 'herkunft':
          observable = db
            .get<Herkunft>('herkunft')
            .findAndObserveOrNull(idString)
            .pipe(
              map((row) =>
                row ? herkunftLabelFromHerkunft({ herkunft: row }) : undefined,
              ),
            )
          break
        case 'sammlung':
          observable = db
            .get<Sammlung>('sammlung')
            .findAndObserveOrNull(idString)
            .pipe(
              switchMap((row) =>
                row
                  ? parentFolder === 'Herkuenfte'
                    ? row.labelUnderHerkunft
                    : row.label
                  : of(undefined),
              ),
            )
          break
        case 'garten':
          observable = db
            .get<Garten>('garten')
            .findAndObserveOrNull(idString)
            .pipe(
              switchMap((row) => (row ? row.label : of(undefined))),
            )
          break
        case 'kultur':
          observable = db
            .get<Kultur>('kultur')
            .findAndObserveOrNull(idString)
            .pipe(
              switchMap((row) =>
                row
                  ? parentFolder === 'Arten'
                    ? row.labelUnderArt
                    : parentFolder === 'Gaerten'
                      ? row.labelUnderGarten
                      : row.label
                  : of(undefined),
              ),
            )
          break
        case 'teilkultur':
          observable = db
            .get<Teilkultur>('teilkultur')
            .findAndObserveOrNull(idString)
            .pipe(
              map((row) =>
                row
                  ? teilkulturLabelFromTeilkultur({ teilkultur: row })
                  : undefined,
              ),
            )
          break
        case 'zaehlung':
          // the label sums the teilzaehlungs' numbers - observe them too,
          // editing a teilzaehlung must refresh the crumb
          observable = db
            .get<Zaehlung>('zaehlung')
            .findAndObserveOrNull(idString)
            .pipe(
              switchMap((row) =>
                row
                  ? db
                      .get<Teilzaehlung>('teilzaehlung')
                      .query(Q.where('zaehlung_id', row.id))
                      .observeWithColumns([
                        'anzahl_pflanzen',
                        'anzahl_auspflanzbereit',
                        'anzahl_mutterpflanzen',
                      ])
                      .pipe(
                        map((teilzaehlungs) =>
                          zaehlungLabelFromZaehlung({
                            zaehlung: row,
                            teilzaehlungs,
                          }),
                        ),
                      )
                  : of(undefined),
              ),
            )
          break
        case 'lieferung':
          observable = db
            .get<Lieferung>('lieferung')
            .findAndObserveOrNull(idString)
            .pipe(
              switchMap((row) => (row ? row.label : of(undefined))),
            )
          break
        case 'sammel_lieferung':
          observable = db
            .get<SammelLieferung>('sammel_lieferung')
            .findAndObserveOrNull(idString)
            .pipe(
              switchMap((row) => (row ? row.label : of(undefined))),
            )
          break
        case 'person':
          observable = db
            .get<Person>('person')
            .findAndObserveOrNull(idString)
            .pipe(
              map((row) =>
                row ? personLabelFromPerson({ person: row }) : undefined,
              ),
            )
          break
        case 'bedarf':
          observable = db
            .get<Bedarf>('bedarf')
            .findAndObserveOrNull(idString)
            .pipe(
              switchMap((row) => (row ? row.label : of(undefined))),
            )
          break
      }
    }
    const subscription = observable
      ? resolveLabel(observable).subscribe((label) => setLabel(label))
      : undefined
    return () => subscription?.unsubscribe()
  }, [db, folder, parentFolder, id])

  return label
}
