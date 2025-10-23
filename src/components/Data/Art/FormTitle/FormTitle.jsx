import { observer } from 'mobx-react-lite'
import styled from '@emotion/styled'
import { useResizeDetector } from 'react-resize-detector'

import { DeleteButton } from './DeleteButton.jsx'
import { AddButton } from './AddButton.jsx'
import { NavButtons } from './NavButtons.jsx'
import { FilterNumbers } from '../../../shared/FilterNumbers.jsx'
import { Menu } from '../../../shared/Menu.jsx'
import { HistoryButton } from '../../../shared/HistoryButton.jsx'
import { constants } from '../../../../utils/constants.js'

const TitleContainer = styled.div`
  background-color: rgba(74, 20, 140, 0.1);
  flex-shrink: 0;
  display: flex;
  @media print {
    display: none !important;
  }
  height: ${constants.titleRowHeight}px;
  justify-content: space-between;
  padding 0 10px;
`
const Title = styled.div`
  font-weight: bold;
  margin-top: auto;
  margin-bottom: auto;
  margin-left: 10px;
`
const TitleSymbols = styled.div`
  display: flex;
  margin-top: auto;
  margin-bottom: auto;
`

export const FormTitle = observer(
  ({ row, totalCount, filteredCount, showHistory, setShowHistory }) => {
    const { width, ref } = useResizeDetector()

    return (
      <TitleContainer ref={ref}>
        <Title>Art</Title>
        <TitleSymbols>
          <NavButtons />
          <AddButton />
          <DeleteButton row={row} />
          {width < 520 ?
            <Menu white={false}>
              <HistoryButton
                table="art"
                id={row.id}
                showHistory={showHistory}
                setShowHistory={setShowHistory}
                asMenu
              />
              <FilterNumbers
                filteredCount={filteredCount}
                totalCount={totalCount}
                asMenu
              />
            </Menu>
          : <>
              <HistoryButton
                table="art"
                id={row.id}
                showHistory={showHistory}
                setShowHistory={setShowHistory}
              />
              <FilterNumbers
                filteredCount={filteredCount}
                totalCount={totalCount}
              />
            </>
          }
        </TitleSymbols>
      </TitleContainer>
    )
  },
)
