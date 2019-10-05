import React, { useCallback, useMemo, useState } from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react-lite'
import { IoMdInformationCircleOutline } from 'react-icons/io'
import IconButton from '@material-ui/core/IconButton'

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
  &:first-of-type {
    margin-top: -10px;
  }
`
const Title = styled.div`
  font-weight: bold;
  margin-top: auto;
  margin-bottom: auto;
`

const ApQk = () => {
  const openDocs = useCallback(() => {
    typeof window !== 'undefined' &&
      window.open(
        'https://vermehrung.apflora.ch/Dokumentation/Benutzer/Qualitaets-Kontrollen',
      )
  }, [])

  return (
    <TitleRow>
      <Title>Qualitäts-Kontrollen</Title>
      <div>
        <IconButton
          aria-label="Anleitung öffnen"
          title="Anleitung öffnen"
          onClick={openDocs}
        >
          <IoMdInformationCircleOutline />
        </IconButton>
      </div>
    </TitleRow>
  )
}

export default observer(ApQk)
