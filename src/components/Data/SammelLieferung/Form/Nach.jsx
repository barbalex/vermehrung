import React, { useContext, useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import styled from '@emotion/styled'
import { Q } from '@nozbe/watermelondb'
import { first as first$ } from 'rxjs/operators'
import { combineLatest } from 'rxjs'
import uniqBy from 'lodash/uniqBy'

import { MobxStoreContext } from '../../../../mobxStoreContext.js'
import { Select } from '../../../shared/Select/index.jsx'
import Checkbox2States from '../../../shared/Checkbox2States.jsx'
import JesNo from '../../../shared/JesNo.jsx'
import exists from '../../../../utils/exists.js'
import kultursSortedFromKulturs from '../../../../utils/kultursSortedFromKulturs.js'

const Title = styled.div`
  font-weight: bold;
  margin-top: auto;
  margin-bottom: auto;
`
const TitleRow = styled.div`
  background-color: ${(props) =>
    props['data-filter'] ? '#ffe0b2' : 'rgba(248, 243, 254, 1)'};
  flex-shrink: 0;
  display: flex;
  height: 40px;
  justify-content: space-between;
  margin-left: -10px;
  margin-right: -10px;
  margin-bottom: 10px;
  padding: 0 10px;
  position: sticky;
  top: 0;
  user-select: none;
  z-index: 1;
  &:first-of-type {
    margin-top: -10px;
  }
`

const SammelLieferungNach = ({
  showFilter,
  row,
  ifNeeded,
  saveToDb,
  herkunft,
}) => {
  const store = useContext(MobxStoreContext)
  const { db, errors, filter } = store

  const [dataState, setDataState] = useState({
    nachKulturWerte: [],
  })
  useEffect(() => {
    const kulturDelQuery =
      filter.kultur._deleted === false
        ? Q.where('_deleted', false)
        : filter.kultur._deleted === true
        ? Q.where('_deleted', true)
        : Q.or(
            Q.where('_deleted', false),
            Q.where('_deleted', true),
            Q.where('_deleted', null),
          )
    const sammlungDelQuery =
      filter.sammlung._deleted === false
        ? Q.where('_deleted', false)
        : filter.sammlung._deleted === true
        ? Q.where('_deleted', true)
        : Q.or(
            Q.where('_deleted', false),
            Q.where('_deleted', true),
            Q.where('_deleted', null),
          )
    // BEWARE: need to include inactive kulturs
    const kultursObservable = db.get('kultur').query(kulturDelQuery).observe()
    const sammlungsObservable = db
      .get('sammlung')
      .query(sammlungDelQuery)
      .observe()
    const combinedObservables = combineLatest([
      kultursObservable,
      sammlungsObservable,
    ])
    const subscription = combinedObservables.subscribe(async ([kulturs]) => {
      const kultursFiltered = kulturs
        // show only kulturen of art_id
        .filter((k) => {
          if (row?.art_id) return k.art_id === row.art_id
          return true
        })
        // show only kulturen with same herkunft
        .filter((k) => {
          if (herkunft?.id) return k.herkunft_id === herkunft.id
          return true
        })
        // shall not be delivered to same kultur it came from
        .filter((k) => {
          if (
            row?.von_kultur_id &&
            row?.von_kultur_id !== row?.nach_kultur_id
          ) {
            return k.id !== row.von_kultur_id
          }
          return true
        })
      let kultur
      try {
        kultur = await db.get('kultur').find(row.von_kultur_id)
      } catch {}
      const kultursIncludingChoosen = uniqBy(
        [...kultursFiltered, ...(kultur && !showFilter ? [kultur] : [])],
        'id',
      )
      const kultursSorted = await kultursSortedFromKulturs(
        kultursIncludingChoosen,
      )
      const nachKulturWerte = await Promise.all(
        kultursSorted.map(async (el) => {
          let label
          try {
            label = await el.label.pipe(first$()).toPromise()
          } catch {}

          return {
            value: el.id,
            label,
            inaktiv: el.aktiv === false,
            link: ['Kulturen', el.id],
          }
        }),
      )

      setDataState({
        nachKulturWerte,
      })
    })

    return () => subscription?.unsubscribe?.()
  }, [
    db,
    filter.kultur._deleted,
    filter.sammlung._deleted,
    herkunft?.id,
    row?.art_id,
    row?.nach_kultur_id,
    row?.von_kultur_id,
    showFilter,
  ])
  const { nachKulturWerte } = dataState

  return (
    <>
      <TitleRow data-filter={showFilter}>
        <Title>nach</Title>
      </TitleRow>
      {ifNeeded('nach_kultur_id') && (
        <Select
          key={`${row.id}${row.nach_kultur_id}nach_kultur_id`}
          name="nach_kultur_id"
          value={row.nach_kultur_id}
          field="nach_kultur_id"
          label={`Kultur${
            exists(row.art_id)
              ? ` (Kulturen derselben Art und Herkunft${
                  row.von_kultur_id ? ', ohne die von-Kultur' : ''
                })`
              : ''
          }`}
          options={nachKulturWerte}
          saveToDb={saveToDb}
          error={errors?.sammel_lieferung?.nach_kultur_id}
        />
      )}
      {ifNeeded('nach_ausgepflanzt') && (
        <>
          {showFilter ? (
            <JesNo
              key={`${row.id}nach_ausgepflanzt`}
              label="Ausgepflanzt"
              name="nach_ausgepflanzt"
              value={row.nach_ausgepflanzt}
              saveToDb={saveToDb}
              error={errors?.sammel_lieferung?.nach_ausgepflanzt}
            />
          ) : (
            <Checkbox2States
              key={`${row.id}nach_ausgepflanzt`}
              label="Ausgepflanzt"
              name="nach_ausgepflanzt"
              value={row.nach_ausgepflanzt}
              saveToDb={saveToDb}
              error={errors?.sammel_lieferung?.nach_ausgepflanzt}
            />
          )}
        </>
      )}
    </>
  )
}

export default observer(SammelLieferungNach)
