import React, { useContext, useEffect, useCallback, useMemo } from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'
import SimpleBar from 'simplebar-react'

import { StoreContext } from '../../../../models/reactUtils'
import TextField from '../../../shared/TextField'
import Checkbox2States from '../../../shared/Checkbox2States'
import Checkbox3States from '../../../shared/Checkbox3States'
import ifIsNumericAsNumber from '../../../../utils/ifIsNumericAsNumber'
import Files from '../../Files'
import Coordinates from '../../../shared/Coordinates'
import ConflictList from '../../../shared/ConflictList'
import exists from '../../../../utils/exists'

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
  activeConflict,
  setActiveConflict,
  showHistory,
}) => {
  const store = useContext(StoreContext)
  const {
    filter,
    online,
    userPersonOption,
    herkunftsSorted,
    errors,
    setError,
    unsetError,
  } = store

  // ensure that activeConflict is reset
  // when changing dataset
  useEffect(() => {
    setActiveConflict(null)
  }, [id, setActiveConflict])

  const { hk_kanton, hk_land, hk_bemerkungen, hk_geom_point } = userPersonOption

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

      const previousValue = row[field]
      // only update if value has changed
      if (value === previousValue) return
      row.edit({ field, value })
    },
    [filter, row, showFilter],
  )

  const rowNr = row?.nr
  const nrCount = useMemo(() => {
    if (!exists(rowNr)) return 0
    return herkunftsSorted.filter((h) => h.nr === rowNr).length
  }, [herkunftsSorted, rowNr])
  useEffect(() => {
    if (nrCount > 1) {
      setError({
        path: 'herkunft.nr',
        value: `Diese Nummer wird ${nrCount} mal verwendet. Sie sollte aber über alle Herkünfte eindeutig sein`,
      })
    }
  }, [nrCount, setError])

  const showDeleted = showFilter || row._deleted

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
          <Coordinates row={row} saveToDb={saveToDb} />
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
        {!showFilter && row.id && <Files parentId={row.id} parent="herkunft" />}
      </Container>
    </SimpleBar>
  )
}

export default observer(Herkunft)
