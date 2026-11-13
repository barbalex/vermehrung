import { useElementWidth } from '../../../shared/useElementWidth.ts'

import { ZaehlungSettings as Settings } from './Settings/index.tsx'
import { ZaehlungAddButton as AddButton } from './AddButton.tsx'
import { ZaehlungDeleteButton as DeleteButton } from './DeleteButton.tsx'
import { FilterNumbers } from '../../../shared/FilterNumbers.tsx'
import { HistoryButton } from '../../../shared/HistoryButton.tsx'
import { Menu } from '../../../shared/Menu.tsx'
import { ZaehlungAnleitung as Anleitung } from './Anleitung.tsx'

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
  const { width, ref } = useElementWidth<HTMLDivElement>()

  return (
    <div
      className={artStyles.container}
      ref={ref}
    >
      <div className={artStyles.title}>Zählung</div>
      <div className={artStyles.symbols}>
        <AddButton />
        <DeleteButton row={row} />
        {(width ?? 0) < 520 ?
          <Menu white={false}>
            <HistoryButton
              table="zaehlung"
              id={row?.id}
              showHistory={showHistory}
              asMenu
            />
            {row?.kultur_id && (
              <Settings
                kulturId={row?.kultur_id}
                asMenu
              />
            )}
            <Anleitung asMenu />
            <FilterNumbers
              filteredCount={filteredCount}
              totalCount={totalCount}
              asMenu
            />
          </Menu>
        : <>
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
        }
      </div>
    </div>
  )
}
