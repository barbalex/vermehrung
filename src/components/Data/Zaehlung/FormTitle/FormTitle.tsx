import IconButton from '@mui/material/IconButton'
import { useResizeDetector } from 'react-resize-detector'

import {
  store,
  activeNodeArrayAtom,
  setActiveNodeArray,
  removeOpenNode,
} from '../../../../store/index.ts'
import { ZaehlungSettings as Settings } from './Settings/index.tsx'
import { ZaehlungAddButton as AddButton } from './AddButton.tsx'
import { ZaehlungDeleteButton as DeleteButton } from './DeleteButton.tsx'
import { FilterNumbers } from '../../../shared/FilterNumbers.tsx'
import { HistoryButton } from '../../../shared/HistoryButton.tsx'
import { Menu } from '../../../shared/Menu.tsx'
import { ZaehlungAnleitung as Anleitung } from './Anleitung.tsx'
import UpSvg from '../../../../svg/to_up.svg?react'

import artStyles from '../../Art/FormTitle/FormTitle.module.css'

export const ZaehlungFormTitle = ({
  row,
  totalCount,
  filteredCount,
  showHistory,
}: {
  row?: import('../../../../dbModel.ts').Zaehlung | null | undefined
  totalCount: number
  filteredCount: number
  showHistory: boolean
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
        {(width ?? 0) < 520 ? (
          <Menu white={false}>
            <HistoryButton
              table="zaehlung"
              id={row?.id}
              showHistory={showHistory}
              asMenu
            />
            {row?.kultur_id && <Settings kulturId={row?.kultur_id} asMenu />}
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
              id={row?.id}
              showHistory={showHistory}
            />
            {row?.kultur_id && <Settings kulturId={row?.kultur_id} />}
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
