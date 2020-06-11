import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react-lite'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'
import IconButton from '@material-ui/core/IconButton'
import groupBy from 'lodash/groupBy'

import { useQuery } from '../../../../models/reactUtils'
import Timeline from './Timeline'
import query from './query'
import ErrorBoundary from '../../../shared/ErrorBoundary'

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

const HerkunftTimelineArea = ({
  artId = '99999999-9999-9999-9999-999999999999',
}) => {
  const [open, setOpen] = useState(false)

  const onClickToggle = useCallback(
    (e) => {
      e.stopPropagation()
      setOpen(!open)
    },
    [open],
  )

  const { data, error, loading } = useQuery(query, {
    variables: { id: artId ?? '99999999-9999-9999-9999-999999999999' },
  })
  const herkunftSums = data?.herkunft_sums ?? []
  const herkunftSumsGrouped = groupBy(herkunftSums, 'herkunft_id')

  return (
    <ErrorBoundary>
      <TitleRow
        onClick={onClickToggle}
        title={open ? 'schliessen' : 'öffnen'}
        data-open={open}
      >
        <Title>Zeit-Achsen Herkünfte</Title>
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
      {open && (
        <>
          {loading
            ? 'Lade Daten...'
            : error
            ? `Fehler: ${error.message}`
            : Object.entries(
                herkunftSumsGrouped,
              ).map(([herkunftId, herkunftSums]) => (
                <Timeline
                  key={herkunftId}
                  herkunftId={herkunftId}
                  herkunftSums={herkunftSums}
                />
              ))}
        </>
      )}
    </ErrorBoundary>
  )
}

export default observer(HerkunftTimelineArea)
