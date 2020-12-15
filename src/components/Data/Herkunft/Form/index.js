import React, { useContext, useEffect, useCallback, useState } from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'
import SimpleBar from 'simplebar-react'
import { combineLatest, of as $of } from 'rxjs'
import { Q } from '@nozbe/watermelondb'

import { StoreContext } from '../../../../models/reactUtils'
import TextField from '../../../shared/TextField'
import Checkbox2States from '../../../shared/Checkbox2States'
import Checkbox3States from '../../../shared/Checkbox3States'
import ifIsNumericAsNumber from '../../../../utils/ifIsNumericAsNumber'
import getUserPersonOption from '../../../../utils/getUserPersonOption'
import exists from '../../../../utils/exists'
import Files from '../../Files'
import Coordinates from '../../../shared/Coordinates'
import ConflictList from '../../../shared/ConflictList'

const Container = styled.div`
  padding: 10px;
  height: 100%;
`
const CaseConflictTitle = styled.h4`
  margin-bottom: 10px;
`
const Rev = styled.span`
  font-weight: normal;
  padding-left: 7px;
  color: rgba(0, 0, 0, 0.4);
  font-size: 0.8em;
`

const Herkunft = ({
  showFilter,
  id,
  row,
  rawRow,
  activeConflict,
  setActiveConflict,
  showHistory,
}) => {
  const store = useContext(StoreContext)
  const { filter, online, errors, setError, unsetError, db, user } = store

  // ensure that activeConflict is reset
  // when changing dataset
  useEffect(() => {
    setActiveConflict(null)
  }, [id, setActiveConflict])

  const rowNr = row?.nr
  const [dataState, setDataState] = useState({
    userPersonOption: undefined,
  })
  useEffect(() => {
    const herkunftsNrCountObservable =
      showFilter || !exists(rowNr)
        ? $of(0)
        : db.collections
            .get('herkunft')
            .query(Q.where('_deleted', false), Q.where('nr', rowNr))
            .observeCount()
    const allCollectionsObservable = combineLatest([herkunftsNrCountObservable])
    const allSubscription = allCollectionsObservable.subscribe(
      async ([nrCount]) => {
        const userPersonOption = await getUserPersonOption({ user, db })
        if (!showFilter && nrCount > 1) {
          setError({
            path: 'herkunft.nr',
            value: `Diese Nummer wird ${nrCount} mal verwendet. Sie sollte aber über alle Herkünfte eindeutig sein`,
          })
        }
        setDataState({
          userPersonOption,
        })
      },
    )

    return () => allSubscription.unsubscribe()
  }, [db, db.collections, filter.herkunft, rowNr, setError, showFilter, user])
  const { userPersonOption } = dataState

  const { hk_kanton, hk_land, hk_bemerkungen, hk_geom_point } =
    userPersonOption ?? {}

  useEffect(() => {
    unsetError('herkunft')
  }, [id, unsetError])

  const saveToDb = useCallback(
    async (event) => {
      const field = event.target.name
      let value = ifIsNumericAsNumber(event.target.value)
      if (event.target.value === undefined) value = null
      if (event.target.value === '') value = null

      if (showFilter) {
        return filter.setValue({ table: 'herkunft', key: field, value })
      }

      const previousValue = row._raw[field]
      // only update if value has changed
      if (value === previousValue) return
      await row.edit({ field, value, store })
    },
    [filter, row, showFilter, store],
  )

  const showDeleted =
    showFilter || filter.herkunft._deleted !== false || row?._deleted

  return (
    <SimpleBar style={{ maxHeight: '100%', height: '100%' }}>
      <Container>
        {(activeConflict || showHistory) && (
          <CaseConflictTitle>
            Aktuelle Version<Rev>{row._rev}</Rev>
          </CaseConflictTitle>
        )}
        {showDeleted && (
          <>
            {showFilter ? (
              <Checkbox3States
                key={`${row.id}_deleted`}
                label="gelöscht"
                name="_deleted"
                value={row._deleted}
                saveToDb={saveToDb}
                error={errors?.herkunft?._deleted}
              />
            ) : (
              <Checkbox2States
                key={`${row.id}_deleted`}
                label="gelöscht"
                name="_deleted"
                value={row._deleted}
                saveToDb={saveToDb}
                error={errors?.herkunft?._deleted}
              />
            )}
          </>
        )}
        <TextField
          key={`${row.id}nr`}
          name="nr"
          label="Nr"
          value={row.nr}
          saveToDb={saveToDb}
          error={errors?.herkunft?.nr}
        />
        <TextField
          key={`${row.id}lokalname`}
          name="lokalname"
          label="Lokalname"
          value={row.lokalname}
          saveToDb={saveToDb}
          error={errors?.herkunft?.lokalname}
        />
        <TextField
          key={`${row.id}gemeinde`}
          name="gemeinde"
          label="Gemeinde"
          value={row.gemeinde}
          saveToDb={saveToDb}
          error={errors?.herkunft?.gemeinde}
        />
        {hk_kanton && (
          <TextField
            key={`${row.id}kanton`}
            name="kanton"
            label="Kanton"
            value={row.kanton}
            saveToDb={saveToDb}
            error={errors?.herkunft?.kanton}
          />
        )}
        {hk_land && (
          <TextField
            key={`${row.id}land`}
            name="land"
            label="Land"
            value={row.land}
            saveToDb={saveToDb}
            error={errors?.herkunft?.land}
          />
        )}
        {!showFilter && hk_geom_point && (
          <Coordinates row={row} rawRow={rawRow} saveToDb={saveToDb} />
        )}
        {hk_bemerkungen && (
          <TextField
            key={`${row.id}bemerkungen`}
            name="bemerkungen"
            label="Bemerkungen"
            value={row.bemerkungen}
            saveToDb={saveToDb}
            error={errors?.herkunft?.bemerkungen}
            multiLine
          />
        )}
        {online && !showFilter && row?._conflicts?.map && (
          <ConflictList
            conflicts={row._conflicts}
            activeConflict={activeConflict}
            setActiveConflict={setActiveConflict}
          />
        )}
        {!showFilter && row.id && <Files parentTable="herkunft" parent={row} />}
      </Container>
    </SimpleBar>
  )
}

export default observer(Herkunft)
