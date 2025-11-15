import { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import IconButton from '@mui/material/IconButton'
import { useResizeDetector } from 'react-resize-detector'

import { MobxStoreContext } from '../../../../mobxStoreContext.js'
import { GartenSettings as Settings } from './Settings/index.jsx'
import { GartenDeleteButton as DeleteButton } from './DeleteButton.jsx'
import { GartenAddButton as AddButton } from './AddButton.jsx'
import { GartenDownload as Download } from './Download/index.jsx'
import { FilterNumbers } from '../../../shared/FilterNumbers.jsx'
import UpSvg from '../../../../svg/to_up.svg?react'
import KuDownSvg from '../../../../svg/to_ku_down.svg?react'
import { HistoryButton } from '../../../shared/HistoryButton.jsx'
import { Menu } from '../../../shared/Menu.jsx'

import {
  container,
  title,
  symbols,
} from '../../Art/FormTitle/FormTitle.module.css'

export const GartenFormTitle = observer(
  ({ row, rawRow, showHistory, setShowHistory, totalCount, filteredCount }) => {
    const store = useContext(MobxStoreContext)
    const { activeNodeArray, setActiveNodeArray, removeOpenNode } = store.tree

    const { width, ref } = useResizeDetector()

    const onClickUp = () => {
      removeOpenNode(activeNodeArray)
      setActiveNodeArray(activeNodeArray.slice(0, -1))
    }

    const onClickToKulturen = () =>
      setActiveNodeArray([...activeNodeArray, 'Kulturen'])

    return (
      <div
        className={container}
        ref={ref}
      >
        <div className={title}>Garten</div>
        <div className={symbols}>
          <IconButton
            title="Zur Liste"
            onClick={onClickUp}
            size="large"
          >
            <UpSvg />
          </IconButton>
          <IconButton
            title="Zu den Kulturen"
            onClick={onClickToKulturen}
            size="large"
          >
            <KuDownSvg />
          </IconButton>
          <AddButton />
          <DeleteButton
            row={row}
            rawRow={rawRow}
          />
          <Download gartenId={row.id} />
          {width < 520 ?
            <Menu white={false}>
              <HistoryButton
                table="garten"
                id={row.id}
                showHistory={showHistory}
                setShowHistory={setShowHistory}
                asMenu
              />
              <Settings asMenu />
              <FilterNumbers
                filteredCount={filteredCount}
                totalCount={totalCount}
                asMenu
              />
            </Menu>
          : <>
              <HistoryButton
                table="garten"
                id={row.id}
                showHistory={showHistory}
                setShowHistory={setShowHistory}
              />
              <Settings />
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
