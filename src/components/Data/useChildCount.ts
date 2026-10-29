import { useEffect, useState } from 'react'
import { useAtomValue } from 'jotai'
import { Q, type Query, type Model } from 'nitromelondb'
import { of } from 'rxjs'
import { switchMap } from 'rxjs/operators'

import { activeNodeArrayAtom, dbAtom } from '../../store/index.ts'
import { tableFilter } from '../../utils/tableFilter.ts'
import { isId } from '../../utils/isId.ts'

import type {
  Art,
  Garten,
  Herkunft,
  Kultur,
  Person,
  SammelLieferung,
  Sammlung,
} from '../../dbModel.ts'

// the count a child table row shows in an object list, with the same
// semantics as the nav tree's folder counts (nodes/index.ts)
const countQueryFor = ({
  ownerTable,
  ownerRow,
  folder,
  activeNodeArray,
}: {
  ownerTable: string
  ownerRow: Model
  folder: string
  activeNodeArray: (string | number)[]
}): unknown => {
  // herkunft/sammlung children are scoped by the art when under one
  const artIdIndex = activeNodeArray.indexOf('Arten')
  const artIdRaw = artIdIndex > -1 ? activeNodeArray[artIdIndex + 1] : undefined
  const artId = isId(artIdRaw as string) ? (artIdRaw as string) : undefined

  switch (`${ownerTable}:${folder}`) {
    case 'art:Herkuenfte':
      return (ownerRow as Art).herkunfts.extend(
        ...tableFilter({ table: 'herkunft' }),
      )
    case 'art:Sammlungen':
      return (ownerRow as Art).sammlungs.extend(
        ...tableFilter({ table: 'sammlung' }),
      )
    case 'art:Kulturen':
      return (ownerRow as Art).kulturs.extend(...tableFilter({ table: 'kultur' }))
    case 'herkunft:Sammlungen':
      return artId
        ? (ownerRow as Herkunft).sammlungs.extend(
            ...tableFilter({ table: 'sammlung' }),
            Q.experimentalJoinTables(['art']),
            Q.on('art', 'id', artId),
          )
        : (ownerRow as Herkunft).sammlungs.extend(
            ...tableFilter({ table: 'sammlung' }),
          )
    case 'herkunft:Kulturen':
      return (
        ownerRow as unknown as {
          collections: {
            get<T extends Model>(tableName: 'kultur'): {
              query: (...args: unknown[]) => Query<T>
            }
          }
        }
      ).collections
        .get('kultur')
        .query(
          ...tableFilter({ table: 'kultur' }),
          Q.experimentalJoinTables(['art']),
          Q.on('art', 'id', artId ?? ''),
          Q.experimentalJoinTables(['herkunft']),
          Q.on('herkunft', 'id', ownerRow.id),
        ) as Query<Model>
    case 'sammlung:Herkuenfte':
      // a sammlung has at most one herkunft
      return (ownerRow as Sammlung).herkunft.id ? 1 : 0
    case 'sammlung:Aus-Lieferungen':
      return artId
        ? (ownerRow as Sammlung).lieferungs.extend(
            ...tableFilter({ table: 'lieferung' }),
            Q.experimentalJoinTables(['art']),
            Q.on('art', 'id', artId),
          )
        : (ownerRow as Sammlung).lieferungs.extend(
            ...tableFilter({ table: 'lieferung' }),
          )
    case 'garten:Kulturen':
      return (ownerRow as Garten).kulturs.extend(
        ...tableFilter({ table: 'kultur' }),
      )
    case 'kultur:Teilkulturen':
      return (ownerRow as Kultur).teilkulturs.extend(
        ...tableFilter({ table: 'teilkultur' }),
      )
    case 'kultur:Zaehlungen':
      return (ownerRow as Kultur).zaehlungs.extend(
        ...tableFilter({ table: 'zaehlung' }),
      )
    case 'kultur:An-Lieferungen':
      return (ownerRow as Kultur).anlieferungs.extend(
        ...tableFilter({ table: 'lieferung' }),
      )
    case 'kultur:Aus-Lieferungen':
      return (ownerRow as Kultur).auslieferungs.extend(
        ...tableFilter({ table: 'lieferung' }),
      )
    case 'kultur:Bedarf':
      return (ownerRow as Kultur).bedarfs.extend(
        ...tableFilter({ table: 'bedarf' }),
      )
    case 'person:Sammlungen':
      return (ownerRow as Person).sammlungs.extend(
        ...tableFilter({ table: 'sammlung' }),
      )
    case 'person:Gaerten':
      return (ownerRow as Person).gartens.extend(
        ...tableFilter({ table: 'garten' }),
      )
    case 'person:Lieferungen':
      return (ownerRow as Person).lieferungs.extend(
        ...tableFilter({ table: 'lieferung' }),
      )
    case 'sammel_lieferung:Lieferungen':
      return (ownerRow as SammelLieferung).lieferungs?.extend(
        ...tableFilter({ table: 'lieferung' }),
      )
    default:
      return undefined
  }
}

export const useChildCount = ({
  ownerTable,
  ownerId,
  folder,
}: {
  ownerTable: string
  ownerId?: string
  folder: string
}) => {
  const db = useAtomValue(dbAtom)
  const activeNodeArray = useAtomValue(activeNodeArrayAtom)
  const [count, setCount] = useState<number | undefined>(undefined)

  useEffect(() => {
    setCount(undefined)
    const collection = db?.get(ownerTable as 'art')
    if (!collection || !ownerId) return
    const subscription = collection
      .query(Q.where('id', ownerId))
      .observe()
      .pipe(
        switchMap((rows) => {
          if (!rows.length) return of<number | undefined>(undefined)
          // watermelon's Query<T> is invariant in T - one union cast
          const countQuery = countQueryFor({
            ownerTable,
            ownerRow: rows[0],
            folder,
            activeNodeArray,
          }) as Query<Model> | number | undefined
          if (typeof countQuery === 'number') return of(countQuery)
          return (
            countQuery?.observeCount() ?? of<number | undefined>(undefined)
          )
        }),
      )
      .subscribe((count) => setCount(count))
    return () => subscription.unsubscribe()
  }, [db, ownerTable, ownerId, folder, activeNodeArray])

  return count
}
