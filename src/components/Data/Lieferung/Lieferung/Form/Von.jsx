import { useContext, useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { Q } from '@nozbe/watermelondb'
import { first as first$ } from 'rxjs/operators'
import { combineLatest } from 'rxjs'
import { uniqBy } from 'es-toolkit'

import { MobxStoreContext } from '../../../../../mobxStoreContext.js'
import { Select } from '../../../../shared/Select/index.jsx'
import { exists } from '../../../../../utils/exists.js'
import { kultursSortedFromKulturs } from '../../../../../utils/kultursSortedFromKulturs.js'
import { sammlungsSortedFromSammlungs } from '../../../../../utils/sammlungsSortedFromSammlungs.js'
import { herkunftLabelFromHerkunft } from '../../../../../utils/herkunftLabelFromHerkunft.js'

import vonStyles from './Von.module.css'
import wannStyles from './Wann.module.css'

export const LieferungVon = observer(
  ({ showFilter, row, saveToDb, ifNeeded, herkunft, herkunftQuelle }) => {
    const store = useContext(MobxStoreContext)
    const { errors, db, filter } = store

    const [dataState, setDataState] = useState({
      herkunftLabel: undefined,
      vonKulturWerte: [],
      sammlungWerte: [],
    })
    useEffect(() => {
      const kulturDelQuery =
        filter.kultur._deleted === false ? Q.where('_deleted', false)
        : filter.kultur._deleted === true ? Q.where('_deleted', true)
        : Q.or(
            Q.where('_deleted', false),
            Q.where('_deleted', true),
            Q.where('_deleted', null),
          )
      // BEWARE: need to include inactive kulturs, persons
      const kultursObservable = db.get('kultur').query(kulturDelQuery).observe()
      const sammlungDelQuery =
        filter.sammlung._deleted === false ? Q.where('_deleted', false)
        : filter.sammlung._deleted === true ? Q.where('_deleted', true)
        : Q.or(
            Q.where('_deleted', false),
            Q.where('_deleted', true),
            Q.where('_deleted', null),
          )
      const sammlungsObservable = db
        .get('sammlung')
        .query(sammlungDelQuery)
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
            (e) => e.id,
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
                inaktiv: el.aktiv === false,
                link: ['Kulturen', el.id],
              }
            }),
          )
          let sammlung
          try {
            sammlung = await db.get('sammlung').find(row.von_sammlung_id)
          } catch {}
          const sammlungsIncludingChoosen = uniqBy(
            [...sammlungs, ...(sammlung && !showFilter ? [sammlung] : [])],
            (e) => e.id,
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
                link: ['Sammlungen', el.id],
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
        <div
          className={wannStyles.titleRow}
          style={{
            backgroundColor: showFilter ? '#ffe0b2' : 'rgba(248, 243, 254, 1)',
          }}
        >
          <div className={wannStyles.title}>von</div>
        </div>
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
        <div
          className={vonStyles.herkunftClass}
          style={{ ...(herkunft ? { color: '#c1c1c1' } : {}) }}
        >
          <div className={vonStyles.herkunftLabelClass}>
            {herkunft ? `Herkunft (aus ${herkunftQuelle})` : 'Herkunft'}
          </div>
          {herkunftLabel}
        </div>
      </>
    )
  },
)
