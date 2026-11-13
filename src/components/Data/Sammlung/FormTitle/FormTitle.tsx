import { useElementWidth } from '../../../shared/useElementWidth.ts'

import { SammlungDeleteButton as DeleteButton } from './DeleteButton.tsx'
import { SammlungAddButton as AddButton } from './AddButton.tsx'
import { SammlungAnleitung as Anleitung } from './Anleitung.tsx'
import { FilterNumbers } from '../../../shared/FilterNumbers.tsx'
import { HistoryButton } from '../../../shared/HistoryButton.tsx'
import { Menu } from '../../../shared/Menu.tsx'

import artStyles from '../../Art/FormTitle/FormTitle.module.css'

export const SammlungFormTitle = ({
  row,
  totalCount,
  filteredCount,
  showHistory,
}: {
  row?: import('../../../../dbModel.ts').Sammlung | null | undefined
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
      <div className={artStyles.title}>Sammlung</div>
      <div className={artStyles.symbols}>
        <AddButton />
        <DeleteButton row={row} />
        {(width ?? 0) < 520 ?
          <Menu white={false}>
            <HistoryButton
              table="sammlung"
              id={row?.id}
              showHistory={showHistory}
              asMenu
            />
            <Anleitung asMenu />
            <FilterNumbers
              filteredCount={filteredCount}
              totalCount={totalCount}
              asMenu
            />
          </Menu>
        : <>
            <HistoryButton
              table="sammlung"
              id={row?.id}
              showHistory={showHistory}
            />
            <Anleitung />
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
