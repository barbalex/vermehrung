import { useResizeDetector } from 'react-resize-detector'

import { KulturSettings as Settings } from './Settings/index.tsx'
import { KulturDeleteButton as Delete } from './Delete/index.tsx'
import { KulturAddButton as Add } from './Add.tsx'
import { HistoryButton } from '../../../shared/HistoryButton.tsx'
import { FilterNumbers } from '../../../shared/FilterNumbers.tsx'
import { Menu } from '../../../shared/Menu.tsx'
import { KulturDownload as Download } from './Download.tsx'
import { KulturAnleitung as Anleitung } from './Anleitung.tsx'
import { KulturNavButtons as NavButtons } from './NavButtons.tsx'

import artStyles from '../../Art/FormTitle/FormTitle.module.css'

export const KulturFormTitle = ({
  row,
  totalCount,
  filteredCount,
  showHistory,
}: {
  row?: import('../../../../dbModel.ts').Kultur | null | undefined
  totalCount: number
  filteredCount: number
  showHistory: boolean
}) => {
  const { width, ref } = useResizeDetector()

  return (
    <div className={artStyles.container} ref={ref}>
      <div className={artStyles.title}>Kultur</div>
      <div className={artStyles.symbols}>
        <NavButtons row={row} />
        {(width ?? 0) < 520 ? (
          <Menu white={false}>
            <Add asMenu />
            <Delete asMenu row={row} />
            <Download row={row} asMenu />
            <HistoryButton
              table="kultur"
              id={row?.id}
              showHistory={showHistory}
              asMenu
            />
            <Anleitung asMenu />
            <Settings kulturId={row?.id} asMenu />
            <FilterNumbers
              filteredCount={filteredCount}
              totalCount={totalCount}
              asMenu
            />
          </Menu>
        ) : (width ?? 0) < 567 ? (
          <>
            <Add />
            <Delete row={row} />
            <Menu white={false}>
              <Download row={row} asMenu />
              <HistoryButton
                table="kultur"
                id={row?.id}
                showHistory={showHistory}
                asMenu
              />
              <Anleitung asMenu />
              <Settings kulturId={row?.id} asMenu />
              <FilterNumbers
                filteredCount={filteredCount}
                totalCount={totalCount}
                asMenu
              />
            </Menu>
          </>
        ) : (width ?? 0) < 613 ? (
          <>
            <Add />
            <Delete row={row} />
            <Settings kulturId={row?.id} />
            <Menu white={false}>
              <Download row={row} asMenu />
              <HistoryButton
                table="kultur"
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
          </>
        ) : (width ?? 0) < 660 ? (
          <>
            <Add />
            <Delete row={row} />
            <Settings kulturId={row?.id} />
            <FilterNumbers
              filteredCount={filteredCount}
              totalCount={totalCount}
            />
            <Menu white={false}>
              <Download row={row} asMenu />
              <HistoryButton
                table="kultur"
                id={row?.id}
                showHistory={showHistory}
                asMenu
              />
              <Anleitung asMenu />
            </Menu>
          </>
        ) : (width ?? 0) < 703 ? (
          <>
            <Add />
            <Delete row={row} />
            <Download row={row} />
            <Settings kulturId={row?.id} />
            <FilterNumbers
              filteredCount={filteredCount}
              totalCount={totalCount}
            />
            <Menu white={false}>
              <HistoryButton
                table="kultur"
                id={row?.id}
                showHistory={showHistory}
                asMenu
              />
              <Anleitung asMenu />
            </Menu>
          </>
        ) : (
          <>
            <Add />
            <Delete row={row} />
            <Download row={row} />
            <HistoryButton
              table="kultur"
              id={row?.id}
              showHistory={showHistory}
            />
            <Anleitung />
            <Settings kulturId={row?.id} />
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
