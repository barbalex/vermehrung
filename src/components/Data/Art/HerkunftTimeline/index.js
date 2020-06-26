import React, { useCallback, useState, useContext } from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react-lite'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'
import IconButton from '@material-ui/core/IconButton'
import uniq from 'lodash/uniq'

import Pflanzen from './Pflanzen'
import ErrorBoundary from '../../../shared/ErrorBoundary'
import { StoreContext } from '../../../../models/reactUtils'

const TitleRow = styled.div`
  background-color: rgba(237, 230, 244, 1);
  flex-shrink: 0;
  display: flex;
  height: 48px;
  justify-content: space-between;
  margin-left: -10px;
  margin-right: -10px;
  margin-bottom: 10px;
  padding: 0 10px;
  cursor: pointer;
  user-select: none;
  ${(props) => props['data-open'] && 'position: sticky;'}
  top: -10px;
  z-index: 1;
  &:first-of-type {
    margin-top: -10px;
  }
`
const Title = styled.div`
  font-weight: bold;
  margin-top: auto;
  margin-bottom: auto;
`

const TimelineArea = ({ artId = '99999999-9999-9999-9999-999999999999' }) => {
  const store = useContext(StoreContext)

  const herkunftIds = uniq(
    store.sammlungsSorted
      .filter((s) => s.art_id === artId)
      .map((s) => s.herkunft_id)
      .filter((i) => !!i),
  )
  const herkunftsSorted = store.herkunftsSorted.filter((h) =>
    herkunftIds.includes(h.id),
  )

  const [open, setOpen] = useState(false)
  const onClickToggle = useCallback(
    (e) => {
      e.stopPropagation()
      setOpen(!open)
    },
    [open],
  )

  return (
    <ErrorBoundary>
      <TitleRow
        onClick={onClickToggle}
        title={open ? 'schliessen' : 'öffnen'}
        data-open={open}
      >
        <Title>{`Zeit-Achsen ${herkunftsSorted.length} Herkünfte`}</Title>
        <div>
          <IconButton
            aria-label={open ? 'schliessen' : 'öffnen'}
            title={open ? 'schliessen' : 'öffnen'}
            onClick={onClickToggle}
          >
            {open ? <FaChevronUp /> : <FaChevronDown />}
          </IconButton>
        </div>
      </TitleRow>
      {open &&
        herkunftsSorted.map((herkunft) => (
          <Pflanzen key={herkunft.id} artId={artId} herkunft={herkunft} />
        ))}
    </ErrorBoundary>
  )
}

export default observer(TimelineArea)
