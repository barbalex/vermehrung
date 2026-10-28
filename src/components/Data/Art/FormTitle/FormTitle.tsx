import { useResizeDetector } from 'react-resize-detector'

import { DeleteButton } from './DeleteButton.tsx'
import { AddButton } from './AddButton.tsx'
import { NavButtons } from './NavButtons.tsx'
import { FilterNumbers } from '../../../shared/FilterNumbers.tsx'
import { Menu } from '../../../shared/Menu.tsx'
import { HistoryButton } from '../../../shared/HistoryButton.tsx'

import styles from './FormTitle.module.css'

export const FormTitle = ({ row, totalCount, filteredCount, showHistory }) => {
  const { width, ref } = useResizeDetector()

  return (
    <div className={styles.container} ref={ref}>
      <div className={styles.title}>Art</div>
      <div className={styles.symbols}>
        <NavButtons />
        <AddButton />
        <DeleteButton row={row} />
        {width < 520 ? (
          <Menu white={false}>
            <HistoryButton
              table="art"
              id={row.id}
              showHistory={showHistory}
              asMenu
            />
            <FilterNumbers
              filteredCount={filteredCount}
              totalCount={totalCount}
              asMenu
            />
          </Menu>
        ) : (
          <>
            <HistoryButton table="art" id={row.id} showHistory={showHistory} />
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
