import { useEffect, useState } from 'react'
import { useAtomValue } from 'jotai'
import { Q } from '@nozbe/watermelondb'

import {
  activeNodeArrayAtom,
  dbAtom,
  setActiveNodeArray,
} from '../../store/index.ts'
import { singularOfFolder, labelOfSingular } from '../../utils/singularOfFolder.ts'
import { useRowLabel } from '../Breadcrumbs/useRowLabel.ts'
import { useChildCount } from './useChildCount.ts'
import { ErrorBoundary } from '../shared/ErrorBoundary.tsx'

import styles from './ObjectList.module.css'

interface ChildFolder {
  folder: string
  label: string
}

// the child folders of an object, in nav tree order.
// replaces the down navigation of the removed form header nav buttons
const childrenOf = ({
  table,
  activeNodeArray,
  tk,
}: {
  table: string
  activeNodeArray: (string | number)[]
  tk?: boolean
}): ChildFolder[] => {
  const underArt = activeNodeArray.includes('Arten')
  const topLevel = activeNodeArray[0]
  switch (table) {
    case 'art':
      return [
        { folder: 'Herkuenfte', label: 'Herkünfte' },
        { folder: 'Sammlungen', label: 'Sammlungen' },
        { folder: 'Kulturen', label: 'Kulturen' },
      ]
    case 'herkunft':
      // under an art, the tree also builds kulturen
      return underArt
        ? [
            { folder: 'Sammlungen', label: 'Sammlungen' },
            { folder: 'Kulturen', label: 'Kulturen' },
          ]
        : [{ folder: 'Sammlungen', label: 'Sammlungen' }]
    case 'sammlung':
      return topLevel === 'Sammlungen'
        ? [
            { folder: 'Herkuenfte', label: 'Herkünfte' },
            { folder: 'Aus-Lieferungen', label: 'Aus-Lieferungen' },
          ]
        : [{ folder: 'Aus-Lieferungen', label: 'Aus-Lieferungen' }]
    case 'garten':
      return [{ folder: 'Kulturen', label: 'Kulturen' }]
    case 'kultur':
      return [
        // teilkulturen only exist when the kultur's option says so
        ...(tk ? [{ folder: 'Teilkulturen', label: 'Teilkulturen' }] : []),
        { folder: 'Zaehlungen', label: 'Zählungen' },
        { folder: 'An-Lieferungen', label: 'An-Lieferungen' },
        { folder: 'Aus-Lieferungen', label: 'Aus-Lieferungen' },
        { folder: 'Bedarf', label: 'Bedarf' },
      ]
    case 'person':
      return [
        { folder: 'Sammlungen', label: 'Sammlungen' },
        { folder: 'Gaerten', label: 'Gärten' },
        { folder: 'Lieferungen', label: 'Lieferungen' },
      ]
    case 'sammel_lieferung':
      return [{ folder: 'Lieferungen', label: 'Lieferungen' }]
    default:
      return []
  }
}

// a child table row with its count, like the nav tree folders
const ChildRow = ({
  table,
  id,
  folder,
  label,
  onClick,
}: {
  table: string
  id?: string
  folder: string
  label: string
  onClick: () => void
}) => {
  const count = useChildCount({ ownerTable: table, ownerId: id, folder })

  return (
    <div
      className={styles.row}
      onClick={onClick}
      title={count === undefined ? label : `${label} (${count})`}
    >
      <div>{count === undefined ? label : `${label} (${count})`}</div>
    </div>
  )
}

// rendered at an object's url when breadcrumbs are enabled:
// the object itself (leading to its form) plus its child tables,
// like apf2's object menus
export const ObjectList = ({
  table,
  id,
}: {
  table: string
  id?: string
}) => {
  const activeNodeArray = useAtomValue(activeNodeArrayAtom)
  const db = useAtomValue(dbAtom)

  const ownerFolder = activeNodeArray.at(-2)
  const parentFolder = activeNodeArray.at(-3)
  const objectName = singularOfFolder[ownerFolder as string] ?? table
  const objectLabel = labelOfSingular[objectName] ?? objectName
  const label = useRowLabel({
    folder: ownerFolder as string,
    parentFolder: parentFolder as string | undefined,
    id: id ?? activeNodeArray.at(-1) ?? '',
  })

  // teilkulturen exist depending on the kultur's option (tk)
  const [tk, setTk] = useState(false)
  useEffect(() => {
    if (table !== 'kultur' || !db) return
    const collection =
      db.get<import('../../dbModel.ts').KulturOption>('kultur_option')
    // query().observe() emits [] until the option is loaded,
    // findAndObserve would error and dead-end
    const subscription = collection
      .query(Q.where('id', String(id)))
      .observe()
      .subscribe((kulturOptions) => setTk(!!kulturOptions[0]?.tk))
    return () => subscription.unsubscribe()
  }, [db, table, id])

  const children = childrenOf({ table, activeNodeArray, tk })

  const onClickRow = (url: string[]) =>
    setActiveNodeArray([...activeNodeArray, ...url])

  return (
    <ErrorBoundary>
      <div className={styles.container}>
        <div className={styles.titleContainer}>
          <div className={styles.title}>{label ?? id}</div>
        </div>
        <div className={styles.rowsContainer}>
          <div
            className={styles.row}
            onClick={() => onClickRow([objectName])}
            title={objectLabel}
          >
            <div>{objectLabel}</div>
          </div>
          {children.map((child) => (
            <ChildRow
              key={child.folder}
              table={table}
              id={id}
              folder={child.folder}
              label={child.label}
              onClick={() => onClickRow([child.folder])}
            />
          ))}
        </div>
      </div>
    </ErrorBoundary>
  )
}
