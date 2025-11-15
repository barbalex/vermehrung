import { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import IconButton from '@mui/material/IconButton'
import { useResizeDetector } from 'react-resize-detector'

import { MobxStoreContext } from '../../../../mobxStoreContext.js'
import { TeilkulturSettings as Settings } from './Settings/index.jsx'
import { TeilkulturDeleteButton as DeleteButton } from './DeleteButton.jsx'
import { TeilkulturAddButton as AddButton } from './AddButton.jsx'
import { TeilkulturAnleitung as Anleitung } from './Anleitung.jsx'
import { FilterNumbers } from '../../../shared/FilterNumbers.jsx'
import { HistoryButton } from '../../../shared/HistoryButton.jsx'
import { Menu } from '../../../shared/Menu.jsx'
import UpSvg from '../../../../svg/to_up.svg?react'

import {
  container,
  title,
  symbols,
} from '../../Art/FormTitle/FormTitle.module.css'

export const TeilkulturFormTitle = observer(
  ({ row, totalCount, filteredCount, showHistory, setShowHistory }) => {
    const store = useContext(MobxStoreContext)
    const { activeNodeArray, setActiveNodeArray, removeOpenNode } = store.tree

    const { width, ref } = useResizeDetector()

    const onClickUp = () => {
      removeOpenNode(activeNodeArray)
      setActiveNodeArray(activeNodeArray.slice(0, -1))
    }

    return (
      <div
        className={container}
        ref={ref}
      >
        <div className={title}>Teilkultur</div>
        <div className={symbols}>
          <IconButton
            title="Zur Liste"
            onClick={onClickUp}
            size="large"
          >
            <UpSvg />
          </IconButton>
          <AddButton />
          <DeleteButton row={row} />
          {width < 520 ?
            <Menu white={false}>
              <HistoryButton
                table="teilkultur"
                id={row.id}
                showHistory={showHistory}
                setShowHistory={setShowHistory}
                asMenu
              />
              <Settings
                kulturId={row.kultur_id}
                asMenu
              />
              <Anleitung asMenu />
              <FilterNumbers
                filteredCount={filteredCount}
                totalCount={totalCount}
                asMenu
              />
            </Menu>
          : <>
              <HistoryButton
                table="teilkultur"
                id={row.id}
                showHistory={showHistory}
                setShowHistory={setShowHistory}
              />
              <Settings kulturId={row.kultur_id} />
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
