import React, { useContext, useState, useEffect, useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import styled from '@emotion/styled'
import IconButton from '@mui/material/IconButton'
import { IoMdInformationCircleOutline } from 'react-icons/io'
import { Q } from '@nozbe/watermelondb'
import { first as first$ } from 'rxjs/operators'
import uniqBy from 'lodash/uniqBy'

import { MobxStoreContext } from '../../../../../mobxStoreContext.js'
import { Select } from '../../../../shared/Select/index.jsx'
import { TextField } from '../../../../shared/TextField.jsx'
import { constants } from '../../../../../utils/constants.js'
import { artsSortedFromArts } from '../../../../../utils/artsSortedFromArts.js'

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
`
const FieldRow = styled.div`
  display: flex;
  justify-content: space-between;
  > div:not(:last-of-type) {
    padding-right: 8px;
  }
  > div > button {
    margin-top: 8px;
  }
`

export const LieferungWas = observer(
  ({ showFilter, row, saveToDb, ifNeeded }) => {
    const store = useContext(MobxStoreContext)

    const { db, errors, filter } = store

    const [artWerte, setArtWerte] = useState([])
    useEffect(() => {
      const artDelQuery =
        filter.art._deleted === false ? Q.where('_deleted', false)
        : filter.art._deleted === true ? Q.where('_deleted', true)
        : Q.or(
            Q.where('_deleted', false),
            Q.where('_deleted', true),
            Q.where('_deleted', null),
          )
      const subscription = db
        .get('art')
        .query(artDelQuery)
        .observe()
        .subscribe(async (arts) => {
          let art
          try {
            art = await row.art.fetch()
          } catch {}
          const artsIncludingChoosen = uniqBy(
            [...arts, ...(art && !showFilter ? [art] : [])],
            'id',
          )
          const artsSorted = await artsSortedFromArts(artsIncludingChoosen)
          const artWerte = await Promise.all(
            artsSorted.map(async (el) => {
              let label
              try {
                label = await el.label.pipe(first$()).toPromise()
              } catch {}

              return {
                value: el.id,
                label,
                link: ['Arten', el.id],
              }
            }),
          )

          setArtWerte(artWerte)
        })

      return () => subscription?.unsubscribe?.()
    }, [db, filter.art._deleted, row?.art, showFilter])

    const openGenVielfaldDocs = useCallback(() => {
      const url = `${constants?.getAppUri()}/Dokumentation/genetische-vielfalt`
      if (window.matchMedia('(display-mode: standalone)').matches) {
        return window.open(url, '_blank', 'toolbar=no')
      }
      window.open(url)
    }, [])

    return (
      <>
        <TitleRow data-filter={showFilter}>
          <Title>was</Title>
        </TitleRow>
        {ifNeeded('art_id') && (
          <Select
            key={`${row.id}art_id`}
            name="art_id"
            value={row.art_id}
            field="art_id"
            label="Art"
            options={artWerte}
            saveToDb={saveToDb}
            error={errors?.lieferung?.art_id}
          />
        )}
        <FieldRow>
          {ifNeeded('anzahl_pflanzen') && (
            <TextField
              key={`${row.id}anzahl_pflanzen`}
              name="anzahl_pflanzen"
              label="Anzahl Pflanzen"
              value={row.anzahl_pflanzen}
              saveToDb={saveToDb}
              error={errors?.lieferung?.anzahl_pflanzen}
              type="number"
            />
          )}
          {ifNeeded('anzahl_auspflanzbereit') && (
            <TextField
              key={`${row.id}anzahl_auspflanzbereit`}
              name="anzahl_auspflanzbereit"
              label="Anzahl auspflanzbereit"
              value={row.anzahl_auspflanzbereit}
              saveToDb={saveToDb}
              error={errors?.lieferung?.anzahl_auspflanzbereit}
              type="number"
            />
          )}
        </FieldRow>
        <FieldRow>
          {ifNeeded('gramm_samen') && (
            <TextField
              key={`${row.id}gramm_samen`}
              name="gramm_samen"
              label="Gramm Samen"
              value={row.gramm_samen}
              saveToDb={saveToDb}
              error={errors?.lieferung?.gramm_samen}
              type="number"
            />
          )}
          {ifNeeded('andere_menge') && (
            <TextField
              key={`${row.id}andere_menge`}
              name="andere_menge"
              label={`Andere Menge (z.B. "3 Zwiebeln")`}
              value={row.andere_menge}
              saveToDb={saveToDb}
              error={errors?.lieferung?.andere_menge}
              type="text"
            />
          )}
        </FieldRow>
        {ifNeeded('von_anzahl_individuen') && (
          <FieldRow>
            <TextField
              key={`${row.id}von_anzahl_individuen`}
              name="von_anzahl_individuen"
              label="von Anzahl Individuen"
              value={row.von_anzahl_individuen}
              saveToDb={saveToDb}
              error={errors?.lieferung?.von_anzahl_individuen}
              type="number"
            />
            <div>
              <IconButton
                aria-label="Anleitung öffnen"
                title="Anleitung öffnen"
                onClick={openGenVielfaldDocs}
                size="large"
              >
                <IoMdInformationCircleOutline />
              </IconButton>
            </div>
          </FieldRow>
        )}
      </>
    )
  },
)
