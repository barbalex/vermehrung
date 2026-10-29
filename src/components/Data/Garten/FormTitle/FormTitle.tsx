import IconButton from '@mui/material/IconButton'
import { useResizeDetector } from 'react-resize-detector'

import {
  store,
  activeNodeArrayAtom,
  setActiveNodeArray,
  removeOpenNode,
} from '../../../../store/index.ts'
import { GartenSettings as Settings } from './Settings/index.tsx'
import { GartenDeleteButton as DeleteButton } from './DeleteButton.tsx'
import { GartenAddButton as AddButton } from './AddButton.tsx'
import { GartenDownload as Download } from './Download/index.tsx'
import { FilterNumbers } from '../../../shared/FilterNumbers.tsx'
import UpSvg from '../../../../svg/to_up.svg?react'
import KuDownSvg from '../../../../svg/to_ku_down.svg?react'
import { breadcrumbsEnabled } from '../../../../utils/breadcrumbsEnabled.ts'
import { HistoryButton } from '../../../shared/HistoryButton.tsx'
import { Menu } from '../../../shared/Menu.tsx'

import artStyles from '../../Art/FormTitle/FormTitle.module.css'

export const GartenFormTitle = ({
  row,
  showHistory,
  totalCount,
  filteredCount,
}: {
  row?: import('../../../../dbModel.ts').Garten | null | undefined
  showHistory: boolean
  totalCount: number
  filteredCount: number
}) => {
  const { width, ref } = useResizeDetector()

  const onClickUp = () => {
    const activeNodeArray = store.get(activeNodeArrayAtom)
    removeOpenNode(activeNodeArray)
    setActiveNodeArray(activeNodeArray.slice(0, -1))
  }

  const onClickToKulturen = () => {
    const activeNodeArray = store.get(activeNodeArrayAtom)
    setActiveNodeArray([...activeNodeArray, 'Kulturen'])
  }

  return (
    <div className={artStyles.container} ref={ref}>
      <div className={artStyles.title}>Garten</div>
      <div className={artStyles.symbols}>
        {!breadcrumbsEnabled && (
          <>
            <IconButton title="Zur Liste" onClick={onClickUp} size="large">
              <UpSvg />
            </IconButton>
            <IconButton
              title="Zu den Kulturen"
              onClick={onClickToKulturen}
              size="large"
            >
              <KuDownSvg />
            </IconButton>
          </>
        )}
        <AddButton />
        <DeleteButton row={row} />
        <Download gartenId={row?.id} />
        {(width ?? 0) < 520 ? (
          <Menu white={false}>
            <HistoryButton
              table="garten"
              id={row?.id}
              showHistory={showHistory}
              asMenu
            />
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
              table="garten"
              id={row?.id}
              showHistory={showHistory}
            />
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
