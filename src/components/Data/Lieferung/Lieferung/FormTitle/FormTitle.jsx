import { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import IconButton from '@mui/material/IconButton'
import { useResizeDetector } from 'react-resize-detector'

import { MobxStoreContext } from '../../../../../mobxStoreContext.js'
import { LieferungSettings as Settings } from './Settings/index.jsx'
import { LieferungAddButton as AddButton } from './AddButton.jsx'
import { LieferungDeleteButton as DeleteButton } from './DeleteButton.jsx'
import { LieferungAnleitung as Anleitung } from './Anleitung.jsx'
import { FilterNumbers } from '../../../../shared/FilterNumbers.jsx'
import { HistoryButton } from '../../../../shared/HistoryButton.jsx'
import { Menu } from '../../../../shared/Menu.jsx'
import UpSvg from '../../../../../svg/to_up.svg?react'
import KuDownSvg from '../../../../../svg/to_ku_down.svg?react'

import artStyles from '../../../Art/FormTitle/FormTitle.module.css'

export const LieferungFormTitle = observer(
  ({ row, totalCount, filteredCount, showHistory, setShowHistory }) => {
    const store = useContext(MobxStoreContext)
    const { activeNodeArray, setActiveNodeArray, removeOpenNode } = store.tree

    const { width, ref } = useResizeDetector()

    const onClickUp = () => {
      removeOpenNode(activeNodeArray)
      setActiveNodeArray(activeNodeArray.slice(0, -1))
    }

    const nachKulturId = row?.nach_kultur_id
    const onClickToKultur = () =>
      setActiveNodeArray([
        ...activeNodeArray.filter((n) => n !== 'Kulturen'),
        'Kulturen',
        nachKulturId,
      ])
    // to kulturen is not implemented in nodes, so turned off
    const showToKu = false && activeNodeArray[0] === 'Sammlungen'

    return (
      <div
        className={artStyles.container}
        ref={ref}
      >
        <div className={artStyles.title}>Lieferung</div>
        <div className={artStyles.symbols}>
          <IconButton
            title="Zur Liste"
            onClick={onClickUp}
            size="large"
          >
            <UpSvg />
          </IconButton>
          {showToKu && (
            <IconButton
              title="Zur Kultur"
              onClick={onClickToKultur}
              size="large"
            >
              <KuDownSvg />
            </IconButton>
          )}
          <AddButton />
          <DeleteButton row={row} />
          {width < 520 ?
            <Menu white={false}>
              <HistoryButton
                table="lieferung"
                id={row.id}
                showHistory={showHistory}
                setShowHistory={setShowHistory}
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
                id={row.id}
                showHistory={showHistory}
                setShowHistory={setShowHistory}
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
  },
)
