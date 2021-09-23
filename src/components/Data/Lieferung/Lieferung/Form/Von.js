import React, { useContext, useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'
import { Q } from '@nozbe/watermelondb'
import { first as first$ } from 'rxjs/operators'
import { combineLatest } from 'rxjs'
import uniqBy from 'lodash/uniqBy'

import StoreContext from '../../../../../storeContext'
import Select from '../../../../shared/Select'
import exists from '../../../../../utils/exists'
import kultursSortedFromKulturs from '../../../../../utils/kultursSortedFromKulturs'
import sammlungsSortedFromSammlungs from '../../../../../utils/sammlungsSortedFromSammlungs'
import herkunftLabelFromHerkunft from '../../../../../utils/herkunftLabelFromHerkunft'

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
const Herkunft = styled.div`
  height: 54px;
  user-select: none;
  ${(props) => !props['data-active'] && 'color: #c1c1c1;'}
`
const HerkunftLabel = styled.div`
  color: rgb(0, 0, 0, 0.54);
  font-size: 12px;
  padding-bottom: 2px;
`

const LieferungVon = ({
  showFilter,
  row,
  saveToDb,
  ifNeeded,
  herkunft,
  herkunftQuelle,
}) => {
  const store = useContext(StoreContext)
  const { errors, db, filter } = store

  const [dataState, setDataState] = useState({
    herkunftLabel: undefined,
    vonKulturWerte: [],
    sammlungWerte: [],
  })
  useEffect(() => {
    // BEWARE: need to include inactive kulturs, persons
    const kultursObservable = db
      .get('kultur')
      .query(
        Q.where(
          '_deleted',
          Q.oneOf(
            filter.kultur._deleted === false
              ? [false]
              : filter.kultur._deleted === true
              ? [true]
              : [true, false, null],
          ),
        ),
      )
      .observe()
    const sammlungsObservable = db
      .get('sammlung')
      .query(
        Q.where(
          '_deleted',
          Q.oneOf(
            filter.sammlung._deleted === false
              ? [false]
              : filter.sammlung._deleted === true
              ? [true]
              : [true, false, null],
          ),
        ),
      )
      .observe()
    const combinedObservables = combineLatest([
      kultursObservable,
      sammlungsObservable,
    ])
    const subscription = combinedObservables.subscribe(
      async ([kulturs, sammlungs]) => {
        const herkunftLabel =
          herkunftLabelFromHerkunft({ herkunft }) ??
          '(verfügbar, wenn Sammlung oder Kultur gewählt)'
        const kultursFiltered = kulturs
          // show only kulturen of art_id
          .filter((k) => {
            if (row?.art_id) return k.art_id === row.art_id
            return true
          })
          // show only kulturen with same herkunft
          .filter((k) => {
            if (herkunft) return k?.herkunft_id === herkunft.id
            return true
          })
          // shall not be delivered to same kultur it came from
          .filter((k) => {
            if (
              row?.nach_kultur_id &&
              row?.von_kultur_id !== row?.nach_kultur_id
            ) {
              return k.id !== row.nach_kultur_id
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
        const vonKulturWerte = await Promise.all(
          kultursSorted.map(async (el) => {
            let label
            try {
              label = await el.label.pipe(first$()).toPromise()
            } catch {}

            return {
              value: el.id,
              label,
            }
          }),
        )
        let sammlung
        try {
          sammlung = await db.get('sammlung').find(row.von_sammlung_id)
        } catch {}
        const sammlungsIncludingChoosen = uniqBy(
          [...sammlungs, ...(sammlung && !showFilter ? [sammlung] : [])],
          'id',
        )
        const sammlungsSorted = await sammlungsSortedFromSammlungs(
          sammlungsIncludingChoosen,
        )
        const sammlungWerte = await Promise.all(
          sammlungsSorted.map(async (el) => {
            let label
            try {
              label = await el.label.pipe(first$()).toPromise()
            } catch {}

            return {
              value: el.id,
              label,
            }
          }),
        )

        setDataState({
          herkunftLabel,
          vonKulturWerte,
          sammlungWerte,
        })
      },
    )

    return () => subscription?.unsubscribe?.()
  }, [
    db,
    filter.kultur._deleted,
    filter.sammlung._deleted,
    herkunft,
    row?.art_id,
    row?.nach_kultur_id,
    row?.von_kultur_id,
    row?.von_sammlung_id,
    showFilter,
  ])
  const { herkunftLabel, vonKulturWerte, sammlungWerte } = dataState

  return (
    <>
      <TitleRow data-filter={showFilter}>
        <Title>von</Title>
      </TitleRow>
      {ifNeeded('von_sammlung_id') && (
        <Select
          key={`${row.id}${row.von_sammlung_id}von_sammlung_id`}
          name="von_sammlung_id"
          value={row.von_sammlung_id}
          field="von_sammlung_id"
          label={`Sammlung${
            exists(row.art_id) ? ' (nur solche derselben Art)' : ''
          }`}
          options={sammlungWerte}
          saveToDb={saveToDb}
          error={errors?.lieferung?.von_sammlung_id}
        />
      )}
      {ifNeeded('von_kultur_id') && (
        <Select
          key={`${row.id}${row.von_kultur_id}von_kultur_id`}
          name="von_kultur_id"
          value={row.von_kultur_id}
          field="von_kultur_id"
          label={`Kultur${
            exists(row.art_id) ? ' (nur solche derselben Art)' : ''
          }`}
          options={vonKulturWerte}
          saveToDb={saveToDb}
          error={errors?.lieferung?.von_kultur_id}
        />
      )}
      <Herkunft data-active={!!herkunft}>
        <HerkunftLabel>
          {herkunft ? `Herkunft (aus ${herkunftQuelle})` : 'Herkunft'}
        </HerkunftLabel>
        {herkunftLabel}
      </Herkunft>
    </>
  )
}

export default observer(LieferungVon)
