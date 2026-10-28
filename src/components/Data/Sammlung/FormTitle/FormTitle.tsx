import { useAtomValue } from 'jotai'
import IconButton from '@mui/material/IconButton'
import { useResizeDetector } from 'react-resize-detector'

import {
  activeNodeArrayAtom,
  setActiveNodeArray,
  removeOpenNode,
} from '../../../../store/index.ts'
import { SammlungDeleteButton as DeleteButton } from './DeleteButton.tsx'
import { SammlungAddButton as AddButton } from './AddButton.tsx'
import { SammlungAnleitung as Anleitung } from './Anleitung.tsx'
import { FilterNumbers } from '../../../shared/FilterNumbers.tsx'
import { HistoryButton } from '../../../shared/HistoryButton.tsx'
import { Menu } from '../../../shared/Menu.tsx'
import UpSvg from '../../../../svg/to_up.svg?react'
import LiDownSvg from '../../../../svg/to_ausli_down.svg?react'
import HeDownSvg from '../../../../svg/to_he_down.svg?react'

import artStyles from '../../Art/FormTitle/FormTitle.module.css'

export const SammlungFormTitle = ({
  row,
  totalCount,
  filteredCount,
  showHistory,
}) => {
  const activeNodeArray = useAtomValue(activeNodeArrayAtom)

  const { width, ref } = useResizeDetector()

  const onClickUp = () => {
    removeOpenNode(activeNodeArray)
    setActiveNodeArray(activeNodeArray.slice(0, -1))
  }

  const onClickToLieferungen = () =>
    setActiveNodeArray([...activeNodeArray, 'Aus-Lieferungen'])

  const onClickToHerkuenfte = () =>
    setActiveNodeArray([...activeNodeArray, 'Herkuenfte'])

  const showToHe = activeNodeArray[0] === 'Sammlungen'
  const showToLi = activeNodeArray[0] !== 'Personen'

  return (
    <div className={artStyles.container} ref={ref}>
      <div className={artStyles.title}>Sammlung</div>
      <div className={artStyles.symbols}>
        <IconButton
          title="Zur Sammlungs-Liste"
          onClick={onClickUp}
          size="large"
        >
          <UpSvg />
        </IconButton>
        {showToHe && (
          <IconButton
            title="Zu den Herkünften dieser Sammlung"
            onClick={onClickToHerkuenfte}
            size="large"
          >
            <HeDownSvg />
          </IconButton>
        )}
        {showToLi && (
          <IconButton
            title="Zu den Aus-Lieferungen dieser Sammlung"
            onClick={onClickToLieferungen}
            size="large"
          >
            <LiDownSvg />
          </IconButton>
        )}
        <AddButton />
        <DeleteButton row={row} />
        {width < 520 ? (
          <Menu white={false}>
            <HistoryButton
              table="sammlung"
              id={row.id}
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
        ) : (
          <>
            <HistoryButton
              table="sammlung"
              id={row.id}
              showHistory={showHistory}
            />
            <Anleitung />
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
