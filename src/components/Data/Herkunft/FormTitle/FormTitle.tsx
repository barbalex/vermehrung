import { useAtomValue } from 'jotai'
import IconButton from '@mui/material/IconButton'
import { useResizeDetector } from 'react-resize-detector'

import {
  activeNodeArrayAtom,
  setActiveNodeArray,
  removeOpenNode,
} from '../../../../store/index.ts'
import { HerkunftDeleteButton as DeleteButton } from './DeleteButton.tsx'
import { HerkunftAddButton as AddButton } from './AddButton.tsx'
import { HerkunftSettings as Settings } from './Settings/index.tsx'
import { HerkunftAnleitung as Anleitung } from './Anleitung.tsx'
import { FilterNumbers } from '../../../shared/FilterNumbers.tsx'
import { HistoryButton } from '../../../shared/HistoryButton.tsx'
import { Menu } from '../../../shared/Menu.tsx'
import UpSvg from '../../../../svg/to_up.svg?react'
import SaDownSvg from '../../../../svg/to_sa_down.svg?react'
import { breadcrumbsEnabled } from '../../../../utils/breadcrumbsEnabled.ts'

import artStyles from '../../Art/FormTitle/FormTitle.module.css'

export const HerkunftFormTitle = ({
  row,
  totalCount,
  filteredCount,
  showHistory,
  activeConflict,
}: {
  row?: import('../../../../dbModel.ts').Herkunft | null | undefined
  totalCount: number
  filteredCount: number
  showHistory: boolean
  activeConflict: string | null
}) => {
  const activeNodeArray = useAtomValue(activeNodeArrayAtom)

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
    <div className={artStyles.container} ref={ref}>
      <div
        className={artStyles.title}
      >{`Herkunft${activeConflict ? ': Konflikt lösen' : ''}`}</div>
      <div className={artStyles.symbols}>
        {!breadcrumbsEnabled && (
          <>
            <IconButton title="Zur Liste" onClick={onClickUp} size="large">
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
          </>
        )}
        {editingAllowed && (
          <>
            <AddButton />
            <DeleteButton row={row} />
          </>
        )}
        {(width ?? 0) < 520 ? (
          <Menu white={false}>
            <HistoryButton
              table="herkunft"
              id={row?.id}
              showHistory={showHistory}
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
        ) : (
          <>
            <HistoryButton
              table="herkunft"
              id={row?.id}
              showHistory={showHistory}
            />
            <Anleitung />
            <Settings />
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
