import React from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'
import { withResizeDetector } from 'react-resize-detector'

import Settings from './Settings'
import Delete from './Delete'
import Add from './Add'
import FilterNumbers from '../../../shared/FilterNumbers'
import Menu from '../../../shared/Menu'
import Download from './Download'
import Anleitung from './Anleitung'
import NavButtons from './NavButtons'

const TitleContainer = styled.div`
  background-color: rgba(74, 20, 140, 0.1);
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

const KulturFormTitle = ({ row, totalNr, filteredNr, width }) => {
  if (width < 520) {
    return (
      <TitleContainer>
        <Title>Kultur</Title>
        <TitleSymbols>
          <NavButtons row={row} />
          <Menu white={false}>
            <Add asMenu />
            <Delete asMenu row={row} />
            <Download row={row} asMenu />
            <Anleitung asMenu />
            <Settings kulturId={row.id} asMenu />
            <FilterNumbers filteredNr={filteredNr} totalNr={totalNr} asMenu />
          </Menu>
        </TitleSymbols>
      </TitleContainer>
    )
  }

  if (width < 567) {
    return (
      <TitleContainer>
        <Title>Kultur</Title>
        <TitleSymbols>
          <NavButtons row={row} />
          <Add />
          <Delete row={row} />
          <Menu white={false}>
            <Download row={row} asMenu />
            <Anleitung asMenu />
            <Settings kulturId={row.id} asMenu />
            <FilterNumbers filteredNr={filteredNr} totalNr={totalNr} asMenu />
          </Menu>
        </TitleSymbols>
      </TitleContainer>
    )
  }

  if (width < 613) {
    return (
      <TitleContainer>
        <Title>Kultur</Title>
        <TitleSymbols>
          <NavButtons row={row} />
          <Add />
          <Delete row={row} />
          <Settings kulturId={row.id} />
          <Menu white={false}>
            <Download row={row} asMenu />
            <Anleitung asMenu />
            <FilterNumbers filteredNr={filteredNr} totalNr={totalNr} asMenu />
          </Menu>
        </TitleSymbols>
      </TitleContainer>
    )
  }

  if (width < 660) {
    return (
      <TitleContainer>
        <Title>Kultur</Title>
        <TitleSymbols>
          <NavButtons row={row} />
          <Add />
          <Delete row={row} />
          <Settings kulturId={row.id} />
          <FilterNumbers filteredNr={filteredNr} totalNr={totalNr} />
          <Menu white={false}>
            <Download row={row} asMenu />
            <Anleitung asMenu />
          </Menu>
        </TitleSymbols>
      </TitleContainer>
    )
  }

  return (
    <TitleContainer>
      <Title>Kultur</Title>
      <TitleSymbols>
        <NavButtons row={row} />
        <Add />
        <Delete row={row} />
        <Download row={row} />
        <Anleitung />
        <Settings kulturId={row.id} />
        <FilterNumbers filteredNr={filteredNr} totalNr={totalNr} />
      </TitleSymbols>
    </TitleContainer>
  )
}

export default withResizeDetector(observer(KulturFormTitle))
