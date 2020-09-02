import React, { useContext, useEffect, useCallback, useMemo } from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'
import uniq from 'lodash/uniq'
import { IoMdInformationCircleOutline } from 'react-icons/io'
import IconButton from '@material-ui/core/IconButton'

import { StoreContext } from '../../../../models/reactUtils'
import Select from '../../../shared/Select'
import TextField from '../../../shared/TextField'
import Checkbox2States from '../../../shared/Checkbox2States'
import Checkbox3States from '../../../shared/Checkbox3States'
import ifIsNumericAsNumber from '../../../../utils/ifIsNumericAsNumber'
import Files from '../../Files'
import Timeline from './Timeline'
import QK from './QK'
import ErrorBoundary from '../../../shared/ErrorBoundary'
import ConflictList from '../../../shared/ConflictList'
import herkunftLabelFromHerkunft from './herkunftLabelFromHerkunft'
import gartenLabelFromGarten from './gartenLabelFromGarten'
import getConstants from '../../../../utils/constants'

const constants = getConstants()

const Container = styled.div`
  padding: 10px;
  overflow: auto !important;
  height: 100%;
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

const Kultur = ({
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
    artsSorted,
    gartensSorted,
    herkunftsSorted,
    errors,
    unsetError,
    artHerkuenfte,
  } = store

  // From all collected combinations of art and herkunft show only arten of those not present in this garten
  // => find all combinations of art and herkunft in sammlungen
  // => substract the ones existing in this garden
  // => substract the ones with two existing in this garden?
  // => present arten of the rest

  const garten_id = row?.garten?.id
  const art_id = row?.art_id
  const herkunft_id = row?.herkunft_id
  const artHerkunftInGartenNichtZl = (row?.garten?.kulturs ?? [])
    .filter((k) => (filter.garten.aktiv === true ? k.aktiv : true))
    // only consider kulturen with both art and herkunft chosen
    .filter((o) => !!o.art_id && !!o.herkunft_id)
    .filter((k) => !k.zwischenlager)
  const artHerkunftZwischenlagerInGarten = (row?.garten?.kulturs ?? [])
    .filter((k) => (filter.garten.aktiv === true ? k.aktiv : true))
    // only consider kulturen with both art and herkunft chosen
    .filter((o) => !!o.art_id && !!o.herkunft_id)
    .filter((k) => k.zwischenlager)
  const artenToChoose = useMemo(
    () =>
      uniq(
        artHerkuenfte
          // only arten with herkunft
          .filter((ah) => (herkunft_id ? ah.herkunft_id === herkunft_id : true))
          .filter((s) => {
            // do not filter if no garten choosen
            if (!garten_id) return true
            // do not return if exists nicht zl AND zl
            return !(
              !!artHerkunftInGartenNichtZl.find(
                (a) => a.art_id === s.art_id && a.herkunft_id === s.herkunft_id,
              ) &&
              !!artHerkunftZwischenlagerInGarten.find(
                (a) => a.art_id === s.art_id && a.herkunft_id === s.herkunft_id,
              )
            )
          }),
      )
        // only arten
        .map((a) => a.art_id),
    [
      artHerkuenfte,
      artHerkunftInGartenNichtZl,
      artHerkunftZwischenlagerInGarten,
      garten_id,
      herkunft_id,
    ],
  )
  // do show own art
  if (art_id && !artenToChoose.includes(art_id)) {
    artenToChoose.push(art_id)
  }
  const herkunftToChoose = useMemo(
    () =>
      uniq(
        artHerkuenfte
          .filter((s) => (art_id ? s.art_id === art_id : true))
          .filter((s) => {
            // do not filter if no garten choosen
            if (!garten_id) return true
            // do not return if exists nicht zl AND zl
            return !(
              !!artHerkunftInGartenNichtZl.find(
                (a) => a.art_id === s.art_id && a.herkunft_id === s.herkunft_id,
              ) &&
              !!artHerkunftZwischenlagerInGarten.find(
                (a) => a.art_id === s.art_id && a.herkunft_id === s.herkunft_id,
              )
            )
          })
          .map((a) => a.herkunft_id),
      ),
    [
      artHerkuenfte,
      artHerkunftInGartenNichtZl,
      artHerkunftZwischenlagerInGarten,
      garten_id,
      art_id,
    ],
  )
  // do show own herkunft
  if (herkunft_id && !herkunftToChoose.includes(herkunft_id)) {
    herkunftToChoose.push(herkunft_id)
  }

  useEffect(() => {
    unsetError('kultur')
  }, [id, unsetError])

  // artForArtWerte not used because too complicated
  /*const artForArtWerte = artsSorted.filter(
    (a) => !!a.ae_id && artenToChoose.includes(a.id),
  )*/
  const artWerte = useMemo(
    () =>
      artsSorted
        .filter((a) => !!a.ae_id && artenToChoose.includes(a.id))
        .map((el) => ({
          value: el.id,
          label: el?.art_ae_art?.name ?? '...',
        })),
    [artenToChoose, artsSorted],
  )

  // TODO:
  // if art was choosen: remove gartens where this art has two kulturs for every herkunft?
  // if herkunft was choosen: remove gartens where this herkunft has two kulturs
  const gartenWerte = useMemo(
    () =>
      gartensSorted.map((el) => ({
        value: el.id,
        label: gartenLabelFromGarten(el),
      })),
    [gartensSorted],
  )

  const herkunftWerteData = herkunftsSorted.filter((h) =>
    herkunftToChoose.includes(h.id),
  )
  const herkunftWerte = useMemo(
    () =>
      herkunftWerteData.map((el) => ({
        value: el.id,
        label: herkunftLabelFromHerkunft(el),
      })),
    [herkunftWerteData],
  )

  const saveToDb = useCallback(
    async (event) => {
      const field = event.target.name
      let value = ifIsNumericAsNumber(event.target.value)
      if (event.target.value === undefined) value = null
      if (event.target.value === '') value = null

      if (showFilter) {
        return filter.setValue({ table: 'kultur', key: field, value })
      }

      const previousValue = row[field]
      // only update if value has changed
      if (value === previousValue) return
      row.edit({ field, value })
    },
    [filter, row, showFilter],
  )
  const openGenVielfaldDocs = useCallback(() => {
    const url = `${constants?.appUri}/Dokumentation/Genetische-Vielfalt`
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

  const showDeleted = showFilter || row._deleted

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
              <Checkbox3States
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
          key={`${row.id}${garten_id}garten_id`}
          name="garten_id"
          value={garten_id}
          field="garten_id"
          label="Garten"
          options={gartenWerte}
          saveToDb={saveToDb}
          error={errors.kultur?.garten_id}
        />
        {showFilter ? (
          <Checkbox3States
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
        {showFilter ? (
          <Checkbox3States
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
            >
              <IoMdInformationCircleOutline />
            </IconButton>
          </div>
        </FieldRow>
        {showFilter ? (
          <Checkbox3States
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
        {online && !showFilter && row._conflicts && row._conflicts.map && (
          <ConflictList
            conflicts={row._conflicts}
            activeConflict={activeConflict}
            setActiveConflict={setActiveConflict}
          />
        )}
        {!showFilter && row.id && (
          <>
            <Timeline row={row} />
            <QK kultur={row} />
            <Files parentId={row.id} parent="kultur" />
          </>
        )}
      </Container>
    </ErrorBoundary>
  )
}

export default observer(Kultur)
