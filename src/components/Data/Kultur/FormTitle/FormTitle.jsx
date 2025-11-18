import { useResizeDetector } from 'react-resize-detector'

import { KulturSettings as Settings } from './Settings/index.jsx'
import { KulturDeleteButton as Delete } from './Delete/index.jsx'
import { KulturAddButton as Add } from './Add.jsx'
import { HistoryButton } from '../../../shared/HistoryButton.jsx'
import { FilterNumbers } from '../../../shared/FilterNumbers.jsx'
import { Menu } from '../../../shared/Menu.jsx'
import { KulturDownload as Download } from './Download.jsx'
import { KulturAnleitung as Anleitung } from './Anleitung.jsx'
import { KulturNavButtons as NavButtons } from './NavButtons.jsx'

import {
  container,
  title,
  symbols,
} from '../../Art/FormTitle/FormTitle.module.css'

export const KulturFormTitle = ({
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
      <div className={title}>Kultur</div>
      <div className={symbols}>
        <NavButtons row={row} />
        {width < 520 ?
          <Menu white={false}>
            <Add asMenu />
            <Delete
              asMenu
              row={row}
            />
            <Download
              row={row}
              asMenu
            />
            <HistoryButton
              table="kultur"
              id={row.id}
              showHistory={showHistory}
              setShowHistory={setShowHistory}
              asMenu
            />
            <Anleitung asMenu />
            <Settings
              kulturId={row.id}
              asMenu
            />
            <FilterNumbers
              filteredCount={filteredCount}
              totalCount={totalCount}
              asMenu
            />
          </Menu>
        : width < 567 ?
          <>
            <Add />
            <Delete row={row} />
            <Menu white={false}>
              <Download
                row={row}
                asMenu
              />
              <HistoryButton
                table="kultur"
                id={row.id}
                showHistory={showHistory}
                setShowHistory={setShowHistory}
                asMenu
              />
              <Anleitung asMenu />
              <Settings
                kulturId={row.id}
                asMenu
              />
              <FilterNumbers
                filteredCount={filteredCount}
                totalCount={totalCount}
                asMenu
              />
            </Menu>
          </>
        : width < 613 ?
          <>
            <Add />
            <Delete row={row} />
            <Settings kulturId={row.id} />
            <Menu white={false}>
              <Download
                row={row}
                asMenu
              />
              <HistoryButton
                table="kultur"
                id={row.id}
                showHistory={showHistory}
                setShowHistory={setShowHistory}
                asMenu
              />
              <Anleitung asMenu />
              <FilterNumbers
                filteredCount={filteredCount}
                totalCount={totalCount}
                asMenu
              />
            </Menu>
          </>
        : width < 660 ?
          <>
            <Add />
            <Delete row={row} />
            <Settings kulturId={row.id} />
            <FilterNumbers
              filteredCount={filteredCount}
              totalCount={totalCount}
            />
            <Menu white={false}>
              <Download
                row={row}
                asMenu
              />
              <HistoryButton
                table="kultur"
                id={row.id}
                showHistory={showHistory}
                setShowHistory={setShowHistory}
                asMenu
              />
              <Anleitung asMenu />
            </Menu>
          </>
        : width < 703 ?
          <>
            <Add />
            <Delete row={row} />
            <Download row={row} />
            <Settings kulturId={row.id} />
            <FilterNumbers
              filteredCount={filteredCount}
              totalCount={totalCount}
            />
            <Menu white={false}>
              <HistoryButton
                table="kultur"
                id={row.id}
                showHistory={showHistory}
                setShowHistory={setShowHistory}
                asMenu
              />
              <Anleitung asMenu />
            </Menu>
          </>
        : <>
            <Add />
            <Delete row={row} />
            <Download row={row} />
            <HistoryButton
              table="kultur"
              id={row.id}
              showHistory={showHistory}
              setShowHistory={setShowHistory}
            />
            <Anleitung />
            <Settings kulturId={row.id} />
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
