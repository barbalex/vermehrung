/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useCallback, useState } from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'
import uniq from 'lodash/uniq'
import uniqBy from 'lodash/uniqBy'
import { IoMdInformationCircleOutline } from 'react-icons/io'
import IconButton from '@mui/material/IconButton'
import { first as first$ } from 'rxjs/operators'
import { Q } from '@nozbe/watermelondb'
import { combineLatest, of as $of } from 'rxjs'

import StoreContext from '../../../../storeContext'
import Select from '../../../shared/Select'
import TextField from '../../../shared/TextField'
import Checkbox2States from '../../../shared/Checkbox2States'
import JesNo from '../../../shared/JesNo'
import ifIsNumericAsNumber from '../../../../utils/ifIsNumericAsNumber'
import Files from '../../Files'
import Timeline from './Timeline'
import QK from './QK'
import ErrorBoundary from '../../../shared/ErrorBoundary'
import ConflictList from '../../../shared/ConflictList'
import herkunftLabelFromHerkunft from '../../../../utils/herkunftLabelFromHerkunft'
import constants from '../../../../utils/constants'
import gartensSortedFromGartens from '../../../../utils/gartensSortedFromGartens'
import herkunftSort from '../../../../utils/herkunftSort'

const Container = styled.div`
  padding: 10px;
  height: 100%;
  overflow-y: auto;
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
const CaseConflictTitle = styled.h4`
  margin-bottom: 10px;
`
const Rev = styled.span`
  font-weight: normal;
  padding-left: 7px;
  color: rgba(0, 0, 0, 0.4);
  font-size: 0.8em;
`

const KulturForm = ({
  showFilter,
  id,
  row,
  rawRow,
  activeConflict,
  setActiveConflict,
  showHistory,
}) => {
  const store = useContext(StoreContext)
  const { errors, filter, online, unsetError, user, db } = store

  // From all collected combinations of art and herkunft show only arten of those not present in this garten
  // => find all combinations of art and herkunft in sammlungen
  // => substract the ones existing in this garden
  // => substract the ones with two existing in this garden?
  // => present arten of the rest

  const art_id = row?.art_id
  const herkunft_id = row?.herkunft_id

  // TODO:
  // if art was choosen: remove gartens where this art has two kulturs for every herkunft?
  // if herkunft was choosen: remove gartens where this herkunft has two kulturs
  const [dataState, setDataState] = useState({
    gartenWerte: [],
    userPersonOption: {},
    artsToChoose: [],
    herkunftsToChoose: [],
  })
  useEffect(() => {
    const userPersonOptionsObservable = user.uid
      ? db
          .get('person_option')
          .query(Q.on('person', Q.where('account_id', user.uid)))
          .observeWithColumns(['ku_zwischenlager', 'ku_erhaltungskultur'])
      : $of({})
    const gartensObservable = db
      .get('garten')
      .query(
        Q.where(
          '_deleted',
          Q.oneOf(
            filter.garten._deleted === false
              ? [false]
              : filter.garten._deleted === true
              ? [true]
              : [true, false, null],
          ),
        ),
        Q.where(
          'aktiv',
          Q.oneOf(
            filter.garten.aktiv === true
              ? [true]
              : filter.garten.aktiv === false
              ? [false]
              : [true, false, null],
          ),
        ),
      )
      .observe()
    const gartenObservable = row?.garten
      ? row?.garten?.observe()
      : $of(filter.garten)
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
        Q.where('art_id', Q.notEq(null)),
        Q.where('herkunft_id', Q.notEq(null)),
      )
      .observe()
    const combinedObservables = combineLatest([
      userPersonOptionsObservable,
      gartensObservable,
      gartenObservable,
      sammlungsObservable,
    ])
    const subscription = combinedObservables.subscribe(
      async ([userPersonOptions, gartens, garten, sammlungs]) => {
        const gartensSorted = await gartensSortedFromGartens(gartens)
        // need to show a choosen garten even if inactive but not if deleted
        const gartensIncludingChoosen = uniqBy(
          [...gartensSorted, ...(garten && !showFilter ? [garten] : [])],
          'id',
        )
        const gartenWerte = await Promise.all(
          gartensIncludingChoosen.map(async (garten) => {
            let label
            try {
              label = await garten.label.pipe(first$()).toPromise()
            } catch {}

            return {
              value: garten.id,
              label,
            }
          }),
        )
        // only consider kulturen with both art and herkunft chosen
        let thisGartenKulturs = []
        try {
          await garten.kulturs
            .extend(
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
              Q.where(
                'aktiv',
                Q.oneOf(
                  filter.kultur.aktiv === true
                    ? [true]
                    : filter.kultur.aktiv === false
                    ? [false]
                    : [true, false, null],
                ),
              ),
              Q.where('art_id', Q.notEq(null)),
              Q.where('herkunft_id', Q.notEq(null)),
            )
            .fetch()
        } catch {}
        const artHerkuenfte = uniqBy(
          sammlungs.map((a) => ({
            art_id: a.art_id,
            herkunft_id: a.herkunft_id,
          })),
          (ah) => `${ah.art_id}/${ah.herkunft_id}`,
        )
        const artHerkunftInGartenNichtZl = thisGartenKulturs
          .filter((k) => (filter.garten.aktiv === true ? k.aktiv : true))
          .filter((k) => !k.zwischenlager)
        const artHerkunftZwischenlagerInGarten = thisGartenKulturs
          .filter((k) => (filter.garten.aktiv === true ? k.aktiv : true))
          // only consider kulturen with both art and herkunft chosen
          .filter((k) => k.zwischenlager)
        const artsToChoose = uniq([
          ...artHerkuenfte
            // only arten with herkunft
            .filter((ah) =>
              herkunft_id ? ah.herkunft_id === herkunft_id : true,
            )
            .filter((s) => {
              // do not filter if no garten choosen
              if (!row.garten_id) return true
              // do not return if exists nicht zl AND zl
              return !(
                !!artHerkunftInGartenNichtZl.find(
                  (a) =>
                    a.art_id === s.art_id && a.herkunft_id === s.herkunft_id,
                ) &&
                !!artHerkunftZwischenlagerInGarten.find(
                  (a) =>
                    a.art_id === s.art_id && a.herkunft_id === s.herkunft_id,
                )
              )
            })
            // only arten
            .map((a) => a.art_id),
          // do show own art
          ...(art_id ? [art_id] : []),
        ])
        const herkunftsToChoose = uniq([
          ...artHerkuenfte
            .filter((s) => (art_id ? s.art_id === art_id : true))
            .filter((s) => {
              // do not filter if no garten choosen
              if (!row.garten_id) return true
              // do not return if exists nicht zl AND zl
              return !(
                !!artHerkunftInGartenNichtZl.find(
                  (a) =>
                    a.art_id === s.art_id && a.herkunft_id === s.herkunft_id,
                ) &&
                !!artHerkunftZwischenlagerInGarten.find(
                  (a) =>
                    a.art_id === s.art_id && a.herkunft_id === s.herkunft_id,
                )
              )
            })
            .map((a) => a.herkunft_id),
          // do show own herkunft
          ...(herkunft_id ? [herkunft_id] : []),
        ])
        setDataState({
          gartenWerte,
          userPersonOption: userPersonOptions?.[0],
          artsToChoose,
          herkunftsToChoose,
        })
      },
    )

    return () => subscription?.unsubscribe?.()
  }, [
    user.uid,
    row?.garten,
    ...Object.values(filter.garten),
    herkunft_id,
    art_id,
    row.garten_id,
    showFilter,
  ])
  const { gartenWerte, userPersonOption, artsToChoose, herkunftsToChoose } =
    dataState

  const { ku_zwischenlager, ku_erhaltungskultur } = userPersonOption ?? {}

  useEffect(() => {
    unsetError('kultur')
  }, [id, unsetError])

  // artForArtWerte not used because too complicated
  /*const artForArtWerte = artsSorted.filter(
    (a) => !!a.ae_id && artsToChoose.includes(a.id),
  )*/
  const [dataState2, setDataState2] = useState({
    artWerte: [],
    herkunftWerte: [],
  })
  useEffect(() => {
    const artsObservable = db
      .get('art')
      .query(
        Q.where(
          '_deleted',
          Q.oneOf(
            filter.art._deleted === false
              ? [false]
              : filter.art._deleted === true
              ? [true]
              : [true, false, null],
          ),
        ),
        Q.where('ae_id', Q.notEq(null)),
        Q.where('id', Q.oneOf(artsToChoose)),
      )
      .observe()
    const herkunftsObservable = db
      .get('herkunft')
      .query(
        Q.where(
          '_deleted',
          Q.oneOf(
            filter.herkunft._deleted === false
              ? [false]
              : filter.herkunft._deleted === true
              ? [true]
              : [true, false, null],
          ),
        ),
        Q.where('id', Q.oneOf(herkunftsToChoose)),
      )
      .observe()
    const combinedObservables = combineLatest([
      artsObservable,
      herkunftsObservable,
    ])
    const subscription = combinedObservables.subscribe(
      async ([arts, herkunfts]) => {
        let art
        try {
          art = await row.art.fetch()
        } catch {}
        const artsIncludingChoosen = uniqBy(
          [...arts, ...(art && !showFilter ? [art] : [])],
          'id',
        )
        const artWerte = await Promise.all(
          artsIncludingChoosen.map(async (art) => {
            let label
            try {
              label = await art.label.pipe(first$()).toPromise()
            } catch {}

            return {
              value: art.id,
              label,
            }
          }),
        )
        let herkunft
        try {
          herkunft = await row.herkunft.fetch()
        } catch {}
        const herkunftsIncludingChoosen = uniqBy(
          [...herkunfts, ...(herkunft && !showFilter ? [herkunft] : [])],
          'id',
        )
        const herkunftWerte = herkunftsIncludingChoosen
          .sort(herkunftSort)
          .map((herkunft) => ({
            value: herkunft.id,
            label: herkunftLabelFromHerkunft({ herkunft }),
          }))

        setDataState2({
          artWerte,
          herkunftWerte,
        })
      },
    )

    return () => subscription?.unsubscribe?.()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [db, user, artsToChoose.length, herkunftsToChoose.length])
  const { artWerte, herkunftWerte } = dataState2

  const saveToDb = useCallback(
    async (event) => {
      const field = event.target.name
      let value = ifIsNumericAsNumber(event.target.value)
      if (event.target.value === undefined) value = null
      if (event.target.value === '') value = null

      if (showFilter) {
        return filter.setValue({ table: 'kultur', key: field, value })
      }

      const previousValue = ifIsNumericAsNumber(row[field])
      // only update if value has changed
      if (value === previousValue) return
      row.edit({ field, value, store })
    },
    [filter, row, showFilter, store],
  )
  const openGenVielfaldDocs = useCallback(() => {
    const url = `${constants?.getAppUri()}/Dokumentation/Genetische-Vielfalt`
    if (typeof window !== 'undefined') {
      if (window.matchMedia('(display-mode: standalone)').matches) {
        return window.open(url, '_blank', 'toolbar=no')
      }
      window.open(url)
    }
  }, [])

  const zwischenlagerError = errors.kultur?.zwischenlager?.includes(
    'Unique-Constraint',
  )
    ? 'Von einer Herkunft einer Art darf in einem Garten maximal ein aktives Zwischenlager existieren'
    : errors.kultur?.zwischenlager
  const artError = errors.kultur?.art_id?.includes('Unique-Constraint')
    ? 'Von einer Herkunft einer Art dürfen in einem Garten maximal zwei aktive Kulturen existieren: eine "normale" und ein Zwischenlager'
    : errors.kultur?.art_id
  const herkunftError = errors.kultur?.herkunft_id?.includes(
    'Unique-Constraint',
  )
    ? 'Von einer Herkunft einer Art dürfen in einem Garten maximal zwei aktive Kulturen existieren: eine "normale" und ein Zwischenlager'
    : errors.kultur?.herkunft_id

  const showDeleted = filter.kultur._deleted !== false || row?._deleted

  //console.log('Kultur rendering')

  return (
    <ErrorBoundary>
      <Container>
        {(activeConflict || showHistory) && (
          <CaseConflictTitle>
            Aktuelle Version<Rev>{row._rev}</Rev>
          </CaseConflictTitle>
        )}
        {showDeleted && (
          <>
            {showFilter ? (
              <JesNo
                key={`${row.id}_deleted`}
                label="gelöscht"
                name="_deleted"
                value={row._deleted}
                saveToDb={saveToDb}
                error={errors.kultur?._deleted}
              />
            ) : (
              <Checkbox2States
                key={`${row.id}_deleted`}
                label="gelöscht"
                name="_deleted"
                value={row._deleted}
                saveToDb={saveToDb}
                error={errors.kultur?._deleted}
              />
            )}
          </>
        )}
        <Select
          key={`${row.id}${art_id}art_id`}
          name="art_id"
          value={art_id}
          field="art_id"
          label="Art"
          options={artWerte}
          saveToDb={saveToDb}
          error={artError}
        />
        <Select
          key={`${row.id}${herkunft_id}herkunft_id`}
          name="herkunft_id"
          value={herkunft_id}
          field="herkunft_id"
          label="Herkunft"
          options={herkunftWerte}
          saveToDb={saveToDb}
          error={herkunftError}
        />
        <Select
          key={`${row.id}${row.garten_id}garten_id`}
          name="garten_id"
          value={row.garten_id}
          field="garten_id"
          label="Garten"
          options={gartenWerte}
          saveToDb={saveToDb}
          error={errors.kultur?.garten_id}
        />
        {(ku_zwischenlager || !!row?.zwischenlager) && (
          <>
            {showFilter ? (
              <JesNo
                key={`${row.id}zwischenlager`}
                label="Zwischenlager"
                name="zwischenlager"
                value={row.zwischenlager}
                saveToDb={saveToDb}
                error={zwischenlagerError}
              />
            ) : (
              <Checkbox2States
                key={`${row.id}zwischenlager`}
                label="Zwischenlager"
                name="zwischenlager"
                value={row.zwischenlager}
                saveToDb={saveToDb}
                error={zwischenlagerError}
              />
            )}
          </>
        )}
        {(ku_erhaltungskultur || !!row?.erhaltungskultur) && (
          <>
            {showFilter ? (
              <JesNo
                key={`${row.id}erhaltungskultur`}
                label="Erhaltungskultur"
                name="erhaltungskultur"
                value={row.erhaltungskultur}
                saveToDb={saveToDb}
                error={errors.kultur?.erhaltungskultur}
              />
            ) : (
              <Checkbox2States
                key={`${row.id}erhaltungskultur`}
                label="Erhaltungskultur"
                name="erhaltungskultur"
                value={row.erhaltungskultur}
                saveToDb={saveToDb}
                error={errors.kultur?.erhaltungskultur}
              />
            )}
          </>
        )}
        <FieldRow>
          <TextField
            key={`${row.id}von_anzahl_individuen`}
            name="von_anzahl_individuen"
            label="von Anzahl Individuen"
            value={row.von_anzahl_individuen}
            saveToDb={saveToDb}
            error={errors.kultur?.von_anzahl_individuen}
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
        {showFilter ? (
          <JesNo
            key={`${row.id}aktiv`}
            label="aktiv"
            name="aktiv"
            value={row.aktiv}
            saveToDb={saveToDb}
            error={errors.kultur?.aktiv}
          />
        ) : (
          <Checkbox2States
            key={`${row.id}aktiv`}
            label="aktiv"
            name="aktiv"
            value={row.aktiv}
            saveToDb={saveToDb}
            error={errors.kultur?.aktiv}
          />
        )}
        <TextField
          key={`${row.id}bemerkungen`}
          name="bemerkungen"
          label="Bemerkungen"
          value={row.bemerkungen}
          saveToDb={saveToDb}
          error={errors.kultur?.bemerkungen}
          multiLine
        />
        {online && !showFilter && row?._conflicts?.map && (
          <ConflictList
            conflicts={row._conflicts}
            activeConflict={activeConflict}
            setActiveConflict={setActiveConflict}
          />
        )}
        {!showFilter && row.id && (
          <>
            <Timeline row={row} rawRow={rawRow} />
            <QK kultur={row} />
            <Files parentTable="kultur" parent={row} />
          </>
        )}
      </Container>
    </ErrorBoundary>
  )
}

export default observer(KulturForm)
