import { useElementWidth } from '../../../shared/useElementWidth.ts'

import { GartenSettings as Settings } from './Settings/index.tsx'
import { GartenDeleteButton as DeleteButton } from './DeleteButton.tsx'
import { GartenAddButton as AddButton } from './AddButton.tsx'
import { GartenDownload as Download } from './Download/index.tsx'
import { FilterNumbers } from '../../../shared/FilterNumbers.tsx'
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
  const { width, ref } = useElementWidth<HTMLDivElement>()

  return (
    <div
      className={artStyles.container}
      ref={ref}
    >
      <div className={artStyles.title}>Garten</div>
      <div className={artStyles.symbols}>
        <AddButton />
        <DeleteButton row={row} />
        <Download gartenId={row?.id} />
        {(width ?? 0) < 520 ?
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
        : <>
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
        }
      </div>
    </div>
  )
}
