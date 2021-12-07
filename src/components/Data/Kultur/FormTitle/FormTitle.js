import React from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'
import { withResizeDetector } from 'react-resize-detector'

import Settings from './Settings'
import Delete from './Delete'
import Add from './Add'
import HistoryButton from '../../../shared/HistoryButton'
import FilterNumbers from '../../../shared/FilterNumbers'
import Menu from '../../../shared/Menu'
import Download from './Download'
import Anleitung from './Anleitung'
import NavButtons from './NavButtons'
import constants from '../../../../utils/constants'

const TitleContainer = styled.div`
  background-color: rgba(74, 20, 140, 0.1);
  padding: 0 10px;
  flex-shrink: 0;
  display: flex;
  @media print {
    display: none !important;
  }
  height: ${constants.titleRowHeight}px;
  justify-content: space-between;
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

const KulturFormTitle = ({
  row,
  totalCount,
  filteredCount,
  width,
  showHistory,
  setShowHistory,
}) => {
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
            <HistoryButton
              table="kultur"
              id={row.id}
              showHistory={showHistory}
              setShowHistory={setShowHistory}
              asMenu
            />
            <Anleitung asMenu />
            <Settings kulturId={row.id} asMenu />
            <FilterNumbers
              filteredCount={filteredCount}
              totalCount={totalCount}
              asMenu
            />
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
            <HistoryButton
              table="kultur"
              id={row.id}
              showHistory={showHistory}
              setShowHistory={setShowHistory}
              asMenu
            />
            <Anleitung asMenu />
            <Settings kulturId={row.id} asMenu />
            <FilterNumbers
              filteredCount={filteredCount}
              totalCount={totalCount}
              asMenu
            />
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
            <HistoryButton
              table="kultur"
              id={row.id}
              showHistory={showHistory}
              setShowHistory={setShowHistory}
              asMenu
            />
            <Anleitung asMenu />
            <FilterNumbers
              filteredCount={filteredCount}
              totalCount={totalCount}
              asMenu
            />
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
          <FilterNumbers
            filteredCount={filteredCount}
            totalCount={totalCount}
          />
          <Menu white={false}>
            <Download row={row} asMenu />
            <HistoryButton
              table="kultur"
              id={row.id}
              showHistory={showHistory}
              setShowHistory={setShowHistory}
              asMenu
            />
            <Anleitung asMenu />
          </Menu>
        </TitleSymbols>
      </TitleContainer>
    )
  }

  if (width < 703) {
    return (
      <TitleContainer>
        <Title>Kultur</Title>
        <TitleSymbols>
          <NavButtons row={row} />
          <Add />
          <Delete row={row} />
          <Download row={row} />
          <Settings kulturId={row.id} />
          <FilterNumbers
            filteredCount={filteredCount}
            totalCount={totalCount}
          />
          <Menu white={false}>
            <HistoryButton
              table="kultur"
              id={row.id}
              showHistory={showHistory}
              setShowHistory={setShowHistory}
              asMenu
            />
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
        <HistoryButton
          table="kultur"
          id={row.id}
          showHistory={showHistory}
          setShowHistory={setShowHistory}
        />
        <Anleitung />
        <Settings kulturId={row.id} />
        <FilterNumbers filteredCount={filteredCount} totalCount={totalCount} />
      </TitleSymbols>
    </TitleContainer>
  )
}

export default withResizeDetector(observer(KulturFormTitle))
