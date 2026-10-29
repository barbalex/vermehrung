import { useEffect, useState } from 'react'
import { useAtomValue } from 'jotai'
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
const resolveLabel = (observable: Observable<string | Promise<string>>) =>
  observable.pipe(
    switchMap((value) =>
      typeof (value as Promise<string>)?.then === 'function'
        ? from(value as Promise<string>)
        : of(value as string),
    ),
    catchError(() => of('(nicht gefunden)')),
  )

export const RowCrumb = ({
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
    let observable: Observable<string | Promise<string>> | undefined
    if (db && table) {
      switch (table) {
        case 'art':
          observable = db
            .get<Art>('art')
            .findAndObserve(idString)
            .pipe(switchMap((art) => art.label))
          break
        case 'herkunft':
          observable = db
            .get<Herkunft>('herkunft')
            .findAndObserve(idString)
            .pipe(
              map((herkunft) =>
                herkunftLabelFromHerkunft({ herkunft }),
              ),
            )
          break
        case 'sammlung':
          observable = db
            .get<Sammlung>('sammlung')
            .findAndObserve(idString)
            .pipe(
              switchMap((sammlung) =>
                parentFolder === 'Herkuenfte'
                  ? sammlung.labelUnderHerkunft
                  : sammlung.label,
              ),
            )
          break
        case 'garten':
          observable = db
            .get<Garten>('garten')
            .findAndObserve(idString)
            .pipe(switchMap((garten) => garten.label))
          break
        case 'kultur':
          observable = db
            .get<Kultur>('kultur')
            .findAndObserve(idString)
            .pipe(
              switchMap((kultur) =>
                parentFolder === 'Arten'
                  ? kultur.labelUnderArt
                  : parentFolder === 'Gaerten'
                    ? kultur.labelUnderGarten
                    : kultur.label,
              ),
            )
          break
        case 'teilkultur':
          observable = db
            .get<Teilkultur>('teilkultur')
            .findAndObserve(idString)
            .pipe(
              map((teilkultur) =>
                teilkulturLabelFromTeilkultur({ teilkultur }),
              ),
            )
          break
        case 'zaehlung':
          observable = db
            .get<Zaehlung>('zaehlung')
            .findAndObserve(idString)
            .pipe(switchMap((zaehlung) => zaehlung.label))
          break
        case 'lieferung':
          observable = db
            .get<Lieferung>('lieferung')
            .findAndObserve(idString)
            .pipe(switchMap((lieferung) => lieferung.label))
          break
        case 'sammel_lieferung':
          observable = db
            .get<SammelLieferung>('sammel_lieferung')
            .findAndObserve(idString)
            .pipe(
              switchMap((sammelLieferung) => sammelLieferung.label),
            )
          break
        case 'person':
          observable = db
            .get<Person>('person')
            .findAndObserve(idString)
            .pipe(map((person) => personLabelFromPerson({ person })))
          break
        case 'bedarf':
          observable = db
            .get<Bedarf>('bedarf')
            .findAndObserve(idString)
            .pipe(switchMap((bedarf) => bedarf.label))
          break
      }
    }
    const subscription = observable
      ? resolveLabel(observable).subscribe((label) => setLabel(label))
      : undefined
    return () => subscription?.unsubscribe()
  }, [db, folder, parentFolder, id])

  return <>{label ?? String(id)}</>
}
