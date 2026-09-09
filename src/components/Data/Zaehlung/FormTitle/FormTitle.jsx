import IconButton from '@mui/material/IconButton'
import { useResizeDetector } from 'react-resize-detector'

import {
  store,
  activeNodeArrayAtom,
  setActiveNodeArray,
  removeOpenNode,
} from '../../../../store/index.js'
import { ZaehlungSettings as Settings } from './Settings/index.jsx'
import { ZaehlungAddButton as AddButton } from './AddButton.jsx'
import { ZaehlungDeleteButton as DeleteButton } from './DeleteButton.jsx'
import { FilterNumbers } from '../../../shared/FilterNumbers.jsx'
import { HistoryButton } from '../../../shared/HistoryButton.jsx'
import { Menu } from '../../../shared/Menu.jsx'
import { ZaehlungAnleitung as Anleitung } from './Anleitung.jsx'
import UpSvg from '../../../../svg/to_up.svg?react'

import artStyles from '../../Art/FormTitle/FormTitle.module.css'

export const ZaehlungFormTitle = ({
  row,
  totalCount,
  filteredCount,
  showHistory,
  setShowHistory,
}) => {
  const { width, ref } = useResizeDetector()

  const onClickUp = () => {
    const activeNodeArray = store.get(activeNodeArrayAtom)
    removeOpenNode(activeNodeArray)
    setActiveNodeArray(activeNodeArray.slice(0, -1))
  }

  return (
    <div className={artStyles.container} ref={ref}>
      <div className={artStyles.title}>Zählung</div>
      <div className={artStyles.symbols}>
        <IconButton title="Zur Liste" onClick={onClickUp} size="large">
          <UpSvg />
        </IconButton>
        <AddButton />
        <DeleteButton row={row} />
        {width < 520 ? (
          <Menu white={false}>
            <HistoryButton
              table="zaehlung"
              id={row.id}
              showHistory={showHistory}
              setShowHistory={setShowHistory}
              asMenu
            />
            {row.kultur_id && <Settings kulturId={row.kultur_id} asMenu />}
            <Anleitung asMenu />
            <FilterNumbers
              filteredCount={filteredCount}
              totalCount={totalCount}
              asMenu
            />
          </Menu>
        ) : (
          <>
            <HistoryButton
              table="zaehlung"
              id={row.id}
              showHistory={showHistory}
              setShowHistory={setShowHistory}
            />
            {row.kultur_id && <Settings kulturId={row.kultur_id} />}
            <Anleitung />
            <FilterNumbers
              filteredCount={filteredCount}
              totalCount={totalCount}
            />
          </>
        )}
      </div>
    </div>
  )
}
