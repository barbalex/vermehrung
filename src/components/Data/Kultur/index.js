import React, { useContext, useState, useCallback, useMemo } from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'
import uniq from 'lodash/uniq'
import SplitPane from 'react-split-pane'

import { StoreContext } from '../../../models/reactUtils'
import ErrorBoundary from '../../shared/ErrorBoundary'
import Conflict from './Conflict'
import FormTitle from './FormTitle'
import Form from './Form'

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${(props) => (props.showfilter ? '#fff3e0' : 'unset')};
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

const Kultur = ({
  filter: showFilter,
  id = '99999999-9999-9999-9999-999999999999',
}) => {
  const store = useContext(StoreContext)
  const { filter, online, hideInactive, artHerkuenfte } = store

  const row = useMemo(
    () => (showFilter ? filter.kultur : store.kulturs.get(id) ?? {}),
    [filter.kultur, id, showFilter, store.kulturs],
  )

  // From all collected combinations of art and herkunft show only arten of those not present in this garten
  // => find all combinations of art and herkunft in sammlungen
  // => substract the ones existing in this garden
  // => substract the ones with two existing in this garden?
  // => present arten of the rest

  const garten_id = row?.garten?.id
  const art_id = row?.art_id
  const herkunft_id = row?.herkunft_id
  const artHerkunftInGartenNichtZl = (row?.garten?.kulturs ?? [])
    .filter((k) => (hideInactive ? k.aktiv : true))
    // only consider kulturen with both art and herkunft chosen
    .filter((o) => !!o.art_id && !!o.herkunft_id)
    .filter((k) => !k.zwischenlager)
  const artHerkunftZwischenlagerInGarten = (row?.garten?.kulturs ?? [])
    .filter((k) => (hideInactive ? k.aktiv : true))
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

  const [activeConflict, setActiveConflict] = useState(null)
  const callbackAfterVerwerfen = useCallback(() => setActiveConflict(null), [])
  const callbackAfterUebernehmen = useCallback(
    () => setActiveConflict(null),
    [],
  )

  if (!row || (!showFilter && filter.show)) return null

  const firstPaneWidth = activeConflict ? '50%' : '100%'
  // hide resizer when tree is hidden
  const resizerStyle = !activeConflict ? { width: 0 } : {}

  console.log('Kultur', { row, online, activeConflict })

  return (
    <ErrorBoundary>
      <Container showfilter={showFilter}>
        <FormTitle row={row} showFilter={showFilter} />
        <Container>
          <StyledSplitPane
            split="vertical"
            size={firstPaneWidth}
            minSize={200}
            resizerStyle={resizerStyle}
          >
            <Form
              showFilter={showFilter}
              id={id}
              activeConflict={activeConflict}
              setActiveConflict={setActiveConflict}
            />
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

export default observer(Kultur)
