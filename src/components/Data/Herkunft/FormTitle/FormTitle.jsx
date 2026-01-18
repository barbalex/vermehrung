import { useContext } from 'react'
import { observer } from 'mobx-react-lite'
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

import artStyles from '../../Art/FormTitle/FormTitle.module.css'

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
      <div
        className={artStyles.container}
        ref={ref}
      >
        <div
          className={artStyles.title}
        >{`Herkunft${activeConflict ? ': Konflikt lösen' : ''}`}</div>
        <div className={artStyles.symbols}>
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
        </div>
      </div>
    )
  },
)
