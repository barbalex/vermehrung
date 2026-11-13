import { useElementWidth } from '../../../../shared/useElementWidth.ts'

import { LieferungSettings as Settings } from './Settings/index.tsx'
import { LieferungAddButton as AddButton } from './AddButton.tsx'
import { LieferungDeleteButton as DeleteButton } from './DeleteButton.tsx'
import { LieferungAnleitung as Anleitung } from './Anleitung.tsx'
import { FilterNumbers } from '../../../../shared/FilterNumbers.tsx'
import { HistoryButton } from '../../../../shared/HistoryButton.tsx'
import { Menu } from '../../../../shared/Menu.tsx'

import artStyles from '../../../Art/FormTitle/FormTitle.module.css'

export const LieferungFormTitle = ({
  row,
  totalCount,
  filteredCount,
  showHistory,
}: {
  row?: import('../../../../../dbModel.ts').Lieferung | null | undefined
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
      <div className={artStyles.title}>Lieferung</div>
      <div className={artStyles.symbols}>
        <AddButton />
        <DeleteButton row={row} />
        {(width ?? 0) < 520 ?
          <Menu white={false}>
            <HistoryButton
              table="lieferung"
              id={row?.id}
              showHistory={showHistory}
              asMenu
            />
            <Settings asMenu />
            <Anleitung asMenu />
            <FilterNumbers
              filteredCount={filteredCount}
              totalCount={totalCount}
              asMenu
            />
          </Menu>
        : <>
            <HistoryButton
              table="lieferung"
              id={row?.id}
              showHistory={showHistory}
            />
            <Settings />
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
