import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react-lite'
import { IoMdInformationCircleOutline } from 'react-icons/io'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'
import IconButton from '@material-ui/core/IconButton'
import ErrorBoundary from 'react-error-boundary'

import QkContent from './QkContent'

const TitleRow = styled.div`
  background-color: rgba(74, 20, 140, 0.1);
  flex-shrink: 0;
  display: flex;
  height: 48px;
  justify-content: space-between;
  margin-left: -10px;
  margin-right: -10px;
  margin-bottom: 10px;
  padding: 0 10px;
  cursor: pointer;
  &:first-of-type {
    margin-top: -10px;
  }
`
const Title = styled.div`
  font-weight: bold;
  margin-top: auto;
  margin-bottom: auto;
`

const ApQk = ({ art }) => {
  const [open, setOpen] = useState(false)

  const openDocs = useCallback(e => {
    e.stopPropagation()
    typeof window !== 'undefined' &&
      window.open(
        'https://vermehrung.apflora.ch/Dokumentation/Qualitaets-Kontrollen',
      )
  }, [])
  const onClickToggle = useCallback(
    e => {
      e.stopPropagation()
      setOpen(!open)
    },
    [open],
  )

  return (
    <ErrorBoundary>
      <TitleRow onClick={onClickToggle} title={open ? 'schliessen' : 'öffnen'}>
        <Title>Qualitäts-Kontrollen</Title>
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
      {open && <QkContent art={art} />}
    </ErrorBoundary>
  )
}

export default observer(ApQk)
