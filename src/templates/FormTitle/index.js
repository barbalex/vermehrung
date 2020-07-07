import React from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'
import { withResizeDetector } from 'react-resize-detector'

import FilterNumbers from '../../components/shared/FilterNumbers'

const TitleContainer = styled.div`
  background-color: rgba(74, 20, 140, 0.1);
  margin: -25px -25px 20px -25px;
  padding: 0 10px;
  flex-shrink: 0;
  display: flex;
  @media print {
    display: none !important;
  }
  height: 48px;
  justify-content: space-between;
`
const Title = styled.div`
  font-weight: bold;
  margin-top: auto;
  margin-bottom: auto;
  padding-left: 10px;
`
const TitleSymbols = styled.div`
  display: flex;
  margin-top: auto;
  margin-bottom: auto;
`

const KulturFormTitle = ({ totalNr, filteredNr, width }) => {
  return (
    <TitleContainer>
      <Title>Dokumentation</Title>
      <TitleSymbols>
        <FilterNumbers filteredNr={filteredNr} totalNr={totalNr} />
      </TitleSymbols>
    </TitleContainer>
  )
}

export default withResizeDetector(observer(KulturFormTitle))
