import { useContext, useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { useResizeDetector } from 'react-resize-detector'
import { of as $of } from 'rxjs'
import { Q } from '@nozbe/watermelondb'

import { MobxStoreContext } from '../../../../mobxStoreContext.js'
import { SammelLieferungSettings as Settings } from './Settings/index.jsx'
import { SammelLieferungCopyMenu as Copy } from './Copy/index.jsx'
import { SammelLieferungAddButton as Add } from './Add.jsx'
import { SammelLieferungDeleteButton as Delete } from './Delete.jsx'
import { FilterNumbers } from '../../../shared/FilterNumbers.jsx'
import { Menu } from '../../../shared/Menu.jsx'
import { HistoryButton } from '../../../shared/HistoryButton.jsx'
import { SammelLieferungNavButtons as NavButtons } from './NavButtons.jsx'
import { SammelLieferungPrint as PrintButtons } from './PrintButtons.jsx'
import { SammelLieferungAnleitung as Anleitung } from './Anleitung.jsx'

import artStyles from '../../Art/FormTitle/FormTitle.module.css'

export const SammelLieferungFormTitle = observer(
  ({
    showFilter,
    row,
    totalCount,
    filteredCount,
    lieferung,
    printPreview,
    setPrintPreview,
    showHistory,
    setShowHistory,
  }) => {
    const store = useContext(MobxStoreContext)
    const { filter, user, db } = store
    const { activeNodeArray } = store.tree

    const { width, ref } = useResizeDetector()

    const [userPersonOption, setUserPersonOption] = useState()
    useEffect(() => {
      const userPersonOptionsObservable =
        user.uid ?
          db
            .get('person_option')
            .query(Q.on('person', Q.where('account_id', user.uid)))
            .observeWithColumns(['sl_auto_copy_edits'])
        : $of({})
      const subscription = userPersonOptionsObservable.subscribe(
        ([userPersonOption]) => setUserPersonOption(userPersonOption),
      )

      return () => subscription?.unsubscribe?.()
    }, [db, user])
    const { sl_auto_copy_edits } = userPersonOption ?? {}

    const shownAsSammelLieferung =
      activeNodeArray.length === 2 &&
      activeNodeArray[0] === 'Sammel-Lieferungen'

    if (!row || (!showFilter && filter.show)) return null

    return (
      <div
        className={artStyles.container}
        ref={ref}
      >
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
            <Copy
              sammelLieferung={row}
              lieferung={lieferung}
              asMenu
            />
          )}
          <>
            {width < 515 ?
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
                  setShowHistory={setShowHistory}
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
            : width < 563 ?
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
                    setShowHistory={setShowHistory}
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
            : width < 610 ?
              <>
                <PrintButtons
                  printPreview={printPreview}
                  setPrintPreview={setPrintPreview}
                />
                <HistoryButton
                  table="sammel_lieferung"
                  id={row.id}
                  showHistory={showHistory}
                  setShowHistory={setShowHistory}
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
            : width < 657 ?
              <>
                <HistoryButton
                  table="sammel_lieferung"
                  id={row.id}
                  showHistory={showHistory}
                  setShowHistory={setShowHistory}
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
            : <>
                <HistoryButton
                  table="sammel_lieferung"
                  id={row.id}
                  showHistory={showHistory}
                  setShowHistory={setShowHistory}
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
            }
          </>
        </div>
      </div>
    )
  },
)
