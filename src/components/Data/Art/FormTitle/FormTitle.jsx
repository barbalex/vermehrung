import { useResizeDetector } from 'react-resize-detector'

import { DeleteButton } from './DeleteButton.jsx'
import { AddButton } from './AddButton.jsx'
import { NavButtons } from './NavButtons.jsx'
import { FilterNumbers } from '../../../shared/FilterNumbers.jsx'
import { Menu } from '../../../shared/Menu.jsx'
import { HistoryButton } from '../../../shared/HistoryButton.jsx'

import { container, title, symbols } from './FormTitle.module.css'

export const FormTitle = ({
  row,
  totalCount,
  filteredCount,
  showHistory,
  setShowHistory,
}) => {
  const { width, ref } = useResizeDetector()

  return (
    <div
      className={container}
      ref={ref}
    >
      <div className={title}>Art</div>
      <div className={symbols}>
        <NavButtons />
        <AddButton />
        <DeleteButton row={row} />
        {width < 520 ?
          <Menu white={false}>
            <HistoryButton
              table="art"
              id={row.id}
              showHistory={showHistory}
              setShowHistory={setShowHistory}
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
              table="art"
              id={row.id}
              showHistory={showHistory}
              setShowHistory={setShowHistory}
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
