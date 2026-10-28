import { useState, useEffect } from 'react'
import { useAtomValue } from 'jotai'
import { useResizeDetector } from 'react-resize-detector'
import { of as $of } from 'rxjs'
import { Q } from '@nozbe/watermelondb'

import {
  activeNodeArrayAtom,
  dbAtom,
  filterShowAtom,
  userAtom,
} from '../../../../store/index.ts'
import { SammelLieferungSettings as Settings } from './Settings/index.tsx'
import { SammelLieferungCopyMenu as Copy } from './Copy/index.tsx'
import { SammelLieferungAddButton as Add } from './Add.tsx'
import { SammelLieferungDeleteButton as Delete } from './Delete.tsx'
import { FilterNumbers } from '../../../shared/FilterNumbers.tsx'
import { Menu } from '../../../shared/Menu.tsx'
import { HistoryButton } from '../../../shared/HistoryButton.tsx'
import { SammelLieferungNavButtons as NavButtons } from './NavButtons.tsx'
import { SammelLieferungPrint as PrintButtons } from './PrintButtons.tsx'
import { SammelLieferungAnleitung as Anleitung } from './Anleitung.tsx'

import artStyles from '../../Art/FormTitle/FormTitle.module.css'

export const SammelLieferungFormTitle = ({
  showFilter,
  row,
  totalCount,
  filteredCount,
  lieferung,
  printPreview,
  setPrintPreview,
  showHistory,
}: {
  showFilter: boolean
  row?: import('../../../../dbModel.ts').SammelLieferung | null | undefined
  totalCount: number
  filteredCount: number
  lieferung: import('../../../shared/types.ts').WmRow | null | undefined
  printPreview: boolean
  setPrintPreview: (val: unknown) => void
  showHistory: boolean
}) => {
  const db = useAtomValue(dbAtom)
  const user = useAtomValue(userAtom)
  const activeNodeArray = useAtomValue(activeNodeArrayAtom)
  const filterShow = useAtomValue(filterShowAtom)

  const { width, ref } = useResizeDetector()

  const [userPersonOption, setUserPersonOption] = useState()
  useEffect(() => {
    const userPersonOptionsObservable = user.uid
      ? db
          ?.get<import('../../../../dbModel.ts').PersonOption>('person_option')
          .query(Q.on('person', Q.where('account_id', user.uid)))
          .observeWithColumns(['sl_auto_copy_edits'])
      : $of({})
    const subscription = userPersonOptionsObservable?.subscribe(
      ([userPersonOption]) => setUserPersonOption(userPersonOption),
    )

    return () => subscription?.unsubscribe?.()
  }, [db, user])
  const { sl_auto_copy_edits } = userPersonOption ?? {}

  const shownAsSammelLieferung =
    activeNodeArray.length === 2 && activeNodeArray[0] === 'Sammel-Lieferungen'

  if (!row || (!showFilter && filterShow)) return null

  return (
    <div className={artStyles.container} ref={ref}>
      <div className={artStyles.title}>Sammel-Lieferung</div>
      <div className={artStyles.symbols}>
        {shownAsSammelLieferung && (
          <>
            <NavButtons />
            <Add />
            <Delete row={row} />
          </>
        )}
        {!sl_auto_copy_edits && (
          <Copy sammelLieferung={row} lieferung={lieferung} asMenu />
        )}
        <>
          {width < 515 ? (
            <Menu white={false}>
              <PrintButtons
                printPreview={printPreview}
                setPrintPreview={setPrintPreview}
                asMenu
              />
              <Anleitung asMenu />
              <HistoryButton
                table="sammel_lieferung"
                id={row.id}
                showHistory={showHistory}
                asMenu
              />
              {row.id && <Settings asMenu />}
              {shownAsSammelLieferung && (
                <FilterNumbers
                  filteredCount={filteredCount}
                  totalCount={totalCount}
                  asMenu
                />
              )}
            </Menu>
          ) : width < 563 ? (
            <>
              <PrintButtons
                printPreview={printPreview}
                setPrintPreview={setPrintPreview}
              />
              <Menu white={false}>
                <HistoryButton
                  table="sammel_lieferung"
                  id={row.id}
                  showHistory={showHistory}
                  asMenu
                />
                {row.id && <Settings asMenu />}
                <Anleitung asMenu />
                {shownAsSammelLieferung && (
                  <FilterNumbers
                    filteredCount={filteredCount}
                    totalCount={totalCount}
                    asMenu
                  />
                )}
              </Menu>
            </>
          ) : width < 610 ? (
            <>
              <PrintButtons
                printPreview={printPreview}
                setPrintPreview={setPrintPreview}
              />
              <HistoryButton
                table="sammel_lieferung"
                id={row.id}
                showHistory={showHistory}
              />
              <>
                <Menu white={false}>
                  {row.id && <Settings asMenu />}
                  <Anleitung asMenu />
                  {shownAsSammelLieferung && (
                    <FilterNumbers
                      filteredCount={filteredCount}
                      totalCount={totalCount}
                      asMenu
                    />
                  )}
                </Menu>
              </>
            </>
          ) : width < 657 ? (
            <>
              <HistoryButton
                table="sammel_lieferung"
                id={row.id}
                showHistory={showHistory}
              />
              {row.id && <Settings />}
              <>
                <Menu white={false}>
                  <Anleitung asMenu />
                  {shownAsSammelLieferung && (
                    <FilterNumbers
                      filteredCount={filteredCount}
                      totalCount={totalCount}
                      asMenu
                    />
                  )}
                </Menu>
              </>
            </>
          ) : (
            <>
              <HistoryButton
                table="sammel_lieferung"
                id={row.id}
                showHistory={showHistory}
              />
              {row.id && <Settings />}
              <Anleitung />
              {shownAsSammelLieferung && (
                <FilterNumbers
                  filteredCount={filteredCount}
                  totalCount={totalCount}
                />
              )}
            </>
          )}
        </>
      </div>
    </div>
  )
}
