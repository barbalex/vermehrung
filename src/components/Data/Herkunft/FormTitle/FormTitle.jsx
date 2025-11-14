import { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import styled from '@emotion/styled'
import IconButton from '@mui/material/IconButton'
import { useResizeDetector } from 'react-resize-detector'

import { MobxStoreContext } from '../../../../mobxStoreContext.js'
import { HerkunftDeleteButton as DeleteButton } from './DeleteButton.jsx'
import { HerkunftAddButton as AddButton } from './AddButton.jsx'
import { HerkunftSettings as Settings } from './Settings/index.jsx'
import { HerkunftAnleitung as Anleitung } from './Anleitung.jsx'
import { FilterNumbers } from '../../../shared/FilterNumbers.jsx'
import { HistoryButton } from '../../../shared/HistoryButton.jsx'
import { Menu } from '../../../shared/Menu.jsx'
import UpSvg from '../../../../svg/to_up.svg?react'
import SaDownSvg from '../../../../svg/to_sa_down.svg?react'

const TitleContainer = styled.div`
  background-color: rgba(74, 20, 140, 0.1);
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
  margin-left: 10px;
`
const TitleSymbols = styled.div`
  display: flex;
  margin-top: auto;
  margin-bottom: auto;
`

export const HerkunftFormTitle = observer(
  ({
    row,
    totalCount,
    filteredCount,
    showHistory,
    setShowHistory,
    activeConflict,
  }) => {
    const store = useContext(MobxStoreContext)
    const {
      activeNodeArray: anaRaw,
      setActiveNodeArray,
      removeOpenNode,
    } = store.tree
    const activeNodeArray = anaRaw.toJSON()

    const { width, ref } = useResizeDetector()

    const onClickUp = () => {
      removeOpenNode(activeNodeArray)
      setActiveNodeArray(activeNodeArray.slice(0, -1))
    }

    const onClickToSammlungen = () =>
      setActiveNodeArray([...activeNodeArray, 'Sammlungen'])
    const showToSa = activeNodeArray[0] === 'Herkuenfte'

    // herkunft is top node
    // never enable adding below that
    const editingAllowed = activeNodeArray.length <= 2

    return (
      <TitleContainer ref={ref}>
        <Title>{`Herkunft${activeConflict ? ': Konflikt lösen' : ''}`}</Title>
        <TitleSymbols>
          <IconButton
            title="Zur Liste"
            onClick={onClickUp}
            size="large"
          >
            <UpSvg />
          </IconButton>
          {showToSa && (
            <IconButton
              title="Zu den Sammlungen"
              onClick={onClickToSammlungen}
              size="large"
            >
              <SaDownSvg />
            </IconButton>
          )}
          {editingAllowed && (
            <>
              <AddButton />
              <DeleteButton row={row} />
            </>
          )}
          {width < 520 ?
            <Menu white={false}>
              <HistoryButton
                table="herkunft"
                id={row.id}
                showHistory={showHistory}
                setShowHistory={setShowHistory}
                asMenu
              />
              <Anleitung asMenu />
              <Settings asMenu />
              <FilterNumbers
                filteredCount={filteredCount}
                totalCount={totalCount}
                asMenu
              />
            </Menu>
          : <>
              <HistoryButton
                table="herkunft"
                id={row.id}
                showHistory={showHistory}
                setShowHistory={setShowHistory}
              />
              <Anleitung />
              <Settings />
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
