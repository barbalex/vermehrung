import React, {
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'
import last from 'lodash/last'
import IconButton from '@material-ui/core/IconButton'
import { IoMdInformationCircleOutline } from 'react-icons/io'
import isUuid from 'is-uuid'
import SplitPane from 'react-split-pane'

import { StoreContext } from '../../../../models/reactUtils'
import Checkbox2States from '../../../shared/Checkbox2States'
import Checkbox3States from '../../../shared/Checkbox3States'
import FilterTitle from '../../../shared/FilterTitle'
import exists from '../../../../utils/exists'
import ifIsNumericAsNumber from '../../../../utils/ifIsNumericAsNumber'
import Settings from './Settings'
import AddButton from './AddButton'
import DeleteButton from './DeleteButton'
import getConstants from '../../../../utils/constants'
import ErrorBoundary from '../../../shared/ErrorBoundary'
import Conflict from './Conflict'
import FilterNumbers from '../../../shared/FilterNumbers'
import UpSvg from '../../../../svg/to_up.inline.svg'
import KuDownSvg from '../../../../svg/to_ku_down.inline.svg'
import Was from './Was'
import Von from './Von'
import Nach from './Nach'
import Wann from './Wann'
import Wer from './Wer'

const constants = getConstants()

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${(props) => (props.showfilter ? '#fff3e0' : 'unset')};
`
const TitleContainer = styled.div`
  background-color: rgba(74, 20, 140, 0.1);
  flex-shrink: 0;
  display: flex;
  @media print {
    display: none !important;
  }
  height: 48px;
  justify-content: space-between;
  padding 0 10px;
`
const Title = styled.div`
  font-weight: bold;
  margin-top: auto;
  margin-bottom: auto;
`
const TitleSymbols = styled.div`
  display: flex;
  margin-top: auto;
  margin-bottom: auto;
`
const FieldsContainer = styled.div`
  padding: 10px;
  overflow: auto !important;
  height: 100%;
`
const StyledSplitPane = styled(SplitPane)`
  height: calc(100vh - 64px - 48px) !important;
  .Resizer {
    background: rgba(74, 20, 140, 0.1);
    opacity: 1;
    z-index: 1;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 7px;
    cursor: col-resize;
  }
  .Resizer:hover {
    -webkit-transition: all 0.5s ease;
    transition: all 0.5s ease;
    background-color: #fff59d !important;
  }
  .Resizer.disabled {
    cursor: not-allowed;
  }
  .Resizer.disabled:hover {
    border-color: transparent;
  }
  .Pane {
    overflow: hidden;
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

const Lieferung = ({ showFilter, sammelLieferung = {} }) => {
  const existsSammelLieferung = !!sammelLieferung?.id
  const store = useContext(StoreContext)

  const {
    errors,
    filter,
    kulturIdInActiveNodeArray,
    lieferungsFiltered,
    lieferungsSorted,
    online,
    personIdInActiveNodeArray,
    sammelLieferungIdInActiveNodeArray,
    sammlungIdInActiveNodeArray,
    showDeleted,
    unsetError,
    userPersonOption,
  } = store
  const { activeNodeArray, setActiveNodeArray } = store.tree

  const id = showFilter
    ? '99999999-9999-9999-9999-999999999999'
    : last(activeNodeArray.filter((e) => isUuid.v1(e)))

  const hierarchyFilter = (e) => {
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
  }

  const row = useMemo(
    () => (showFilter ? filter.lieferung : store.lieferungs.get(id) ?? {}),
    [filter.lieferung, id, showFilter, store.lieferungs],
  )

  const totalNr = lieferungsSorted.filter(hierarchyFilter).length
  const filteredNr = lieferungsFiltered.filter(hierarchyFilter).length

  const [activeConflict, setActiveConflict] = useState(null)
  const callbackAfterVerwerfen = useCallback(() => setActiveConflict(null), [])
  const callbackAfterUebernehmen = useCallback(
    () => setActiveConflict(null),
    [],
  )

  const { li_show_sl_felder } = userPersonOption

  const ifNeeded = useCallback(
    (field) => {
      if (existsSammelLieferung && li_show_sl_felder) return true
      if (!exists(sammelLieferung[field]) || sammelLieferung[field] === false) {
        return true
      } else if (sammelLieferung[field] !== row[field]) {
        return true
      }
      return false
    },
    [existsSammelLieferung, li_show_sl_felder, row, sammelLieferung],
  )
  const ifSomeNeeded = useCallback(
    (fields) => fields.some((f) => ifNeeded(f)),
    [ifNeeded],
  )

  useEffect(() => {
    unsetError('lieferung')
  }, [id, unsetError])

  const saveToDb = useCallback(
    async (event) => {
      const field = event.target.name
      let value = ifIsNumericAsNumber(event.target.value)
      if (event.target.value === undefined) value = null
      if (event.target.value === '') value = null

      if (showFilter) {
        return filter.setValue({ table: 'lieferung', key: field, value })
      }

      const previousValue = row[field]
      // only update if value has changed
      if (value === previousValue) return
      row.edit({ field, value })
    },
    [filter, row, showFilter],
  )
  const openLieferungDocs = useCallback(() => {
    const url = `${constants?.appUri}/Dokumentation/Lieferungen`
    if (typeof window !== 'undefined') {
      if (window.matchMedia('(display-mode: standalone)').matches) {
        return window.open(url, '_blank', 'toolbar=no')
      }
      window.open(url)
    }
  }, [])

  const onClickUp = useCallback(
    () => setActiveNodeArray(activeNodeArray.slice(0, -1)),
    [activeNodeArray, setActiveNodeArray],
  )
  const nachKulturId = row?.nach_kultur_id
  const onClickToKultur = useCallback(
    () =>
      setActiveNodeArray([
        ...activeNodeArray.filter((n) => n !== 'Kulturen'),
        'Kulturen',
        nachKulturId,
      ]),
    [activeNodeArray, nachKulturId, setActiveNodeArray],
  )
  const showToKu = activeNodeArray[0] === 'Sammlungen'

  if (!row || (!showFilter && filter.show)) return null

  const firstPaneWidth = activeConflict ? '50%' : '100%'
  // hide resizer when tree is hidden
  const resizerStyle = !activeConflict ? { width: 0 } : {}

  return (
    <ErrorBoundary>
      <Container showfilter={showFilter}>
        {showFilter ? (
          <FilterTitle
            title="Lieferung"
            table="lieferung"
            totalNr={totalNr}
            filteredNr={filteredNr}
          />
        ) : (
          <TitleContainer>
            <Title>Lieferung</Title>
            <TitleSymbols>
              <IconButton title="Zur Liste" onClick={onClickUp}>
                <UpSvg />
              </IconButton>
              {showToKu && (
                <IconButton title="Zur Kultur" onClick={onClickToKultur}>
                  <KuDownSvg />
                </IconButton>
              )}
              <AddButton />
              <DeleteButton row={row} />
              <Settings />
              <IconButton
                aria-label="Anleitung öffnen"
                title="Anleitung öffnen"
                onClick={openLieferungDocs}
              >
                <IoMdInformationCircleOutline />
              </IconButton>
              <FilterNumbers filteredNr={filteredNr} totalNr={totalNr} />
            </TitleSymbols>
          </TitleContainer>
        )}
        <Container>
          <StyledSplitPane
            split="vertical"
            size={firstPaneWidth}
            minSize={200}
            resizerStyle={resizerStyle}
          >
            <FieldsContainer>
              {activeConflict && (
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
                      error={errors?.kultur?._deleted}
                    />
                  ) : (
                    <Checkbox2States
                      key={`${row.id}_deleted`}
                      label="gelöscht"
                      name="_deleted"
                      value={row._deleted}
                      saveToDb={saveToDb}
                      error={errors?.kultur?._deleted}
                    />
                  )}
                </>
              )}
              {ifSomeNeeded([
                'art_id',
                'anzahl_pflanzen',
                'anzahl_auspflanzbereit',
                'gramm_samen',
                'andere_menge',
                'von_anzahl_individuen',
              ]) && (
                <Was
                  showFilter={showFilter}
                  row={row}
                  saveToDb={saveToDb}
                  ifNeeded={ifNeeded}
                />
              )}
              <Von
                showFilter={showFilter}
                row={row}
                saveToDb={saveToDb}
                ifNeeded={ifNeeded}
              />
              <Nach
                showFilter={showFilter}
                row={row}
                saveToDb={saveToDb}
                ifNeeded={ifNeeded}
              />
              {ifSomeNeeded(['datum', 'geplant']) && (
                <Wann
                  showFilter={showFilter}
                  row={row}
                  saveToDb={saveToDb}
                  ifNeeded={ifNeeded}
                />
              )}
              {ifSomeNeeded(['person_id', 'bemerkungen']) && (
                <Wer
                  showFilter={showFilter}
                  row={row}
                  saveToDb={saveToDb}
                  ifNeeded={ifNeeded}
                />
              )}
            </FieldsContainer>
            <>
              {online && !!activeConflict && (
                <Conflict
                  rev={activeConflict}
                  id={id}
                  row={row}
                  callbackAfterVerwerfen={callbackAfterVerwerfen}
                  callbackAfterUebernehmen={callbackAfterUebernehmen}
                  setActiveConflict={setActiveConflict}
                />
              )}
            </>
          </StyledSplitPane>
        </Container>
      </Container>
    </ErrorBoundary>
  )
}

export default observer(Lieferung)
