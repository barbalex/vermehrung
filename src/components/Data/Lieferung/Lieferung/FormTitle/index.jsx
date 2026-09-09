import { useState, useEffect } from 'react'
import { useAtomValue } from 'jotai'
import { Q } from '@nozbe/watermelondb'
import { combineLatest } from 'rxjs'

import {
  activeNodeArrayAtom,
  dbAtom,
  filterLieferungAtom,
  kulturIdInActiveNodeArrayAtom,
  personIdInActiveNodeArrayAtom,
  sammelLieferungIdInActiveNodeArrayAtom,
  sammlungIdInActiveNodeArrayAtom,
} from '../../../../../store/index.js'
import { FilterTitle } from '../../../../shared/FilterTitle.jsx'
import { LieferungFormTitle as FormTitle } from './FormTitle.jsx'
import { tableFilter } from '../../../../../utils/tableFilter.js'

export const LieferungTitleChooser = ({
  row,
  rawRow,
  showFilter,
  showHistory,
  setShowHistory,
}) => {
  const db = useAtomValue(dbAtom)
  const activeNodeArray = useAtomValue(activeNodeArrayAtom)
  const kulturIdInActiveNodeArray = useAtomValue(kulturIdInActiveNodeArrayAtom)
  const personIdInActiveNodeArray = useAtomValue(personIdInActiveNodeArrayAtom)
  const sammelLieferungIdInActiveNodeArray = useAtomValue(
    sammelLieferungIdInActiveNodeArrayAtom,
  )
  const sammlungIdInActiveNodeArray = useAtomValue(
    sammlungIdInActiveNodeArrayAtom,
  )
  const lieferungFilter = useAtomValue(filterLieferungAtom)

  const [countState, setCountState] = useState({
    totalCount: 0,
    filteredCount: 0,
  })
  useEffect(() => {
    const hierarchyQuery =
      kulturIdInActiveNodeArray && activeNodeArray.includes('Aus-Lieferungen')
        ? [Q.where('von_kultur_id', kulturIdInActiveNodeArray)]
        : kulturIdInActiveNodeArray &&
            activeNodeArray.includes('An-Lieferungen')
          ? [Q.where('nach_kultur_id', kulturIdInActiveNodeArray)]
          : sammelLieferungIdInActiveNodeArray && !kulturIdInActiveNodeArray
            ? [
                Q.experimentalJoinTables(['sammel_lieferung']),
                Q.on(
                  'sammel_lieferung',
                  'id',
                  sammelLieferungIdInActiveNodeArray,
                ),
              ]
            : personIdInActiveNodeArray && !kulturIdInActiveNodeArray
              ? [
                  Q.experimentalJoinTables(['person']),
                  Q.on('person', 'id', personIdInActiveNodeArray),
                ]
              : sammlungIdInActiveNodeArray && !kulturIdInActiveNodeArray
                ? [
                    Q.experimentalJoinTables(['sammlung']),
                    Q.on('sammlung', 'id', sammlungIdInActiveNodeArray),
                  ]
                : []
    const collection = db.get('lieferung')
    const lieferungDelQuery =
      lieferungFilter._deleted === false
        ? Q.where('_deleted', false)
        : lieferungFilter._deleted === true
          ? Q.where('_deleted', true)
          : Q.or(
              Q.where('_deleted', false),
              Q.where('_deleted', true),
              Q.where('_deleted', null),
            )
    const totalCountObservable = collection
      .query(lieferungDelQuery, ...hierarchyQuery)
      .observeCount()
    const filteredCountObservable = collection
      .query(...tableFilter({ table: 'lieferung' }), ...hierarchyQuery)
      .observeCount()
    const combinedObservables = combineLatest([
      totalCountObservable,
      filteredCountObservable,
    ])
    const subscription = combinedObservables.subscribe(
      ([totalCount, filteredCount]) =>
        setCountState({ totalCount, filteredCount }),
    )

    return () => subscription?.unsubscribe?.()
  }, [
    db,
    kulturIdInActiveNodeArray,
    sammelLieferungIdInActiveNodeArray,
    personIdInActiveNodeArray,
    sammlungIdInActiveNodeArray,
    activeNodeArray,
    // need to rerender if any of the values of lieferungFilter changes
    lieferungFilter,
  ])

  const { totalCount, filteredCount } = countState

  /*const hierarchyFilter = (e) => {
    if (kulturIdInActiveNodeArray) {
      if (activeNodeArray.includes('Aus-Lieferungen')) {
        return e.von_kultur_id === kulturIdInActiveNodeArray
      }
      if (activeNodeArray.includes('An-Lieferungen')) {
        return e.nach_kultur_id === kulturIdInActiveNodeArray
      }
    }
    if (sammelLieferungIdInActiveNodeArray && !kulturIdInActiveNodeArray) {
      return e.sammel_lieferung_id === sammelLieferungIdInActiveNodeArray
    }
    if (personIdInActiveNodeArray && !kulturIdInActiveNodeArray) {
      return e.person_id === personIdInActiveNodeArray
    }
    if (sammlungIdInActiveNodeArray && !kulturIdInActiveNodeArray) {
      return e.von_sammlung_id === sammlungIdInActiveNodeArray
    }
    return true
  }*/

  if (showFilter) {
    return (
      <FilterTitle
        title="Lieferung"
        table="lieferung"
        totalCount={totalCount}
        filteredCount={filteredCount}
      />
    )
  }

  return (
    <FormTitle
      row={row}
      rawRow={rawRow}
      totalCount={totalCount}
      filteredCount={filteredCount}
      showHistory={showHistory}
      setShowHistory={setShowHistory}
    />
  )
}
