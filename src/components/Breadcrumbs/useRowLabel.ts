import { useEffect, useState } from 'react'
import { useAtomValue } from 'jotai'
import { Q } from 'nitromelondb'
import { from, of, type Observable } from 'rxjs'
import { map, switchMap, catchError } from 'rxjs/operators'

import { dbAtom } from '../../store/index.ts'
import { herkunftLabelFromHerkunft } from '../../utils/herkunftLabelFromHerkunft.ts'
import { personLabelFromPerson } from '../../utils/personLabelFromPerson.ts'
import { teilkulturLabelFromTeilkultur } from '../../utils/teilkulturLabelFromTeilkultur.ts'

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
            .query(Q.where('id', idString))
            .observe()
            .pipe(
              switchMap((rows) => (rows.length ? rows[0].label : of(undefined))),
            )
          break
        case 'herkunft':
          observable = db
            .get<Herkunft>('herkunft')
            .query(Q.where('id', idString))
            .observe()
            .pipe(
              map((rows) =>
                rows.length
                  ? herkunftLabelFromHerkunft({ herkunft: rows[0] })
                  : undefined,
              ),
            )
          break
        case 'sammlung':
          observable = db
            .get<Sammlung>('sammlung')
            .query(Q.where('id', idString))
            .observe()
            .pipe(
              switchMap((rows) =>
                rows.length
                  ? parentFolder === 'Herkuenfte'
                    ? rows[0].labelUnderHerkunft
                    : rows[0].label
                  : of(undefined),
              ),
            )
          break
        case 'garten':
          observable = db
            .get<Garten>('garten')
            .query(Q.where('id', idString))
            .observe()
            .pipe(
              switchMap((rows) => (rows.length ? rows[0].label : of(undefined))),
            )
          break
        case 'kultur':
          observable = db
            .get<Kultur>('kultur')
            .query(Q.where('id', idString))
            .observe()
            .pipe(
              switchMap((rows) =>
                rows.length
                  ? parentFolder === 'Arten'
                    ? rows[0].labelUnderArt
                    : parentFolder === 'Gaerten'
                      ? rows[0].labelUnderGarten
                      : rows[0].label
                  : of(undefined),
              ),
            )
          break
        case 'teilkultur':
          observable = db
            .get<Teilkultur>('teilkultur')
            .query(Q.where('id', idString))
            .observe()
            .pipe(
              map((rows) =>
                rows.length
                  ? teilkulturLabelFromTeilkultur({ teilkultur: rows[0] })
                  : undefined,
              ),
            )
          break
        case 'zaehlung':
          observable = db
            .get<Zaehlung>('zaehlung')
            .query(Q.where('id', idString))
            .observe()
            .pipe(
              switchMap((rows) => (rows.length ? rows[0].label : of(undefined))),
            )
          break
        case 'lieferung':
          observable = db
            .get<Lieferung>('lieferung')
            .query(Q.where('id', idString))
            .observe()
            .pipe(
              switchMap((rows) => (rows.length ? rows[0].label : of(undefined))),
            )
          break
        case 'sammel_lieferung':
          observable = db
            .get<SammelLieferung>('sammel_lieferung')
            .query(Q.where('id', idString))
            .observe()
            .pipe(
              switchMap((rows) => (rows.length ? rows[0].label : of(undefined))),
            )
          break
        case 'person':
          observable = db
            .get<Person>('person')
            .query(Q.where('id', idString))
            .observe()
            .pipe(
              map((rows) =>
                rows.length ? personLabelFromPerson({ person: rows[0] }) : undefined,
              ),
            )
          break
        case 'bedarf':
          observable = db
            .get<Bedarf>('bedarf')
            .query(Q.where('id', idString))
            .observe()
            .pipe(
              switchMap((rows) => (rows.length ? rows[0].label : of(undefined))),
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
