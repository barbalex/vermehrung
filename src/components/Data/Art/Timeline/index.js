import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react-lite'
import { IoMdInformationCircleOutline } from 'react-icons/io'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'
import IconButton from '@material-ui/core/IconButton'
import ErrorBoundary from 'react-error-boundary'
import get from 'lodash/get'
import { useQuery } from '@apollo/react-hooks'

import Timeline from './Timeline'
import query from './query'

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
  position: sticky;
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

const TimelineArea = ({ artId }) => {
  const [open, setOpen] = useState(false)

  const openDocs = useCallback(() => {
    typeof window !== 'undefined' &&
      window.open('https://vermehrung.apflora.ch/Dokumentation/Zeitachse-Art')
  }, [])
  const onClickToggle = useCallback(
    e => {
      e.stopPropagation()
      setOpen(!open)
    },
    [open],
  )

  const { data, error, loading } = useQuery(query, {
    variables: { id: artId },
  })
  const artSums = get(data, 'art_sums', [])

  return (
    <ErrorBoundary>
      <TitleRow onClick={onClickToggle} title={open ? 'schliessen' : 'öffnen'}>
        <Title>Zeit-Achse</Title>
        <div>
          <IconButton
            aria-label="Anleitung öffnen"
            title="Anleitung öffnen"
            onClick={openDocs}
          >
            <IoMdInformationCircleOutline />
          </IconButton>
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
          {loading ? (
            'Lade Daten...'
          ) : error ? (
            `Fehler: ${error.message}`
          ) : (
            <Timeline artSums={artSums} />
          )}
        </>
      )}
    </ErrorBoundary>
  )
}

export default observer(TimelineArea)
