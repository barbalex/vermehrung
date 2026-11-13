import { useElementWidth } from '../../../shared/useElementWidth.ts'

import { BedarfAddButton as AddButton } from './AddButton.tsx'
import { BedarfDeleteButton as DeleteButton } from './DeleteButton.tsx'
import { FilterNumbers } from '../../../shared/FilterNumbers.tsx'
import { HistoryButton } from '../../../shared/HistoryButton.tsx'
import { Menu } from '../../../shared/Menu.tsx'

import artStyles from '../../Art/FormTitle/FormTitle.module.css'

export const BedarfFormTitle = ({
  row,
  totalCount,
  filteredCount,
  showHistory,
}: {
  row?: import('../../../../dbModel.ts').Bedarf | null | undefined
  totalCount: number
  filteredCount: number
  showHistory: boolean
}) => {
  const { width, ref } = useElementWidth<HTMLDivElement>()

  return (
    <div
      className={artStyles.container}
      ref={ref}
    >
      <div className={artStyles.title}>Bedarf</div>
      <div className={artStyles.symbols}>
        <AddButton />
        <DeleteButton row={row} />
        {(width ?? 0) < 520 ?
          <Menu white={false}>
            <HistoryButton
              table="bedarf"
              id={row?.id}
              showHistory={showHistory}
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
              table="bedarf"
              id={row?.id}
              showHistory={showHistory}
            />
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
