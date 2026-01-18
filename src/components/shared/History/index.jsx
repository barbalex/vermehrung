import { useContext } from 'react'
import Button from '@mui/material/Button'
import { observer } from 'mobx-react-lite'
import { FaUndoAlt, FaArrowsAltH } from 'react-icons/fa'
import { IoMdInformationCircleOutline } from 'react-icons/io'
import IconButton from '@mui/material/IconButton'

import DoubleArrowCrossed from '../../../svg/double_arrow_crossed.svg?react'
import { Data } from '../Conflict/Data.jsx'
import { MobxStoreContext } from '../../../mobxStoreContext.js'
import { constants } from '../../../utils/constants.js'

import styles from './index.module.css'

export const History = observer(
  ({ rev, dataArray, onClickWiderspruchUebernehmen }) => {
    const store = useContext(MobxStoreContext)
    const { diffConflict, setDiffConflict } = store

    const onClickToggleDiff = () => setDiffConflict(!diffConflict)

    const openDocs = () => {
      const url = `${constants?.getAppUri()}/Dokumentation/historisierung`
      if (window.matchMedia('(display-mode: standalone)').matches) {
        return window.open(url, '_blank', 'toolbar=no')
      }
      window.open(url)
    }

    return (
      <div className={styles.container}>
        <div className={styles.titleRow}>
          <h4 className={styles.title}>
            Historische Version<span className={styles.revClass}>{rev}</span>
          </h4>
          <IconButton
            aria-label="Anleitung öffnen"
            title="Anleitung öffnen"
            onClick={openDocs}
            size="small"
            className={styles.iconButton}
          >
            <IoMdInformationCircleOutline />
          </IconButton>
        </div>
        <Data dataArray={dataArray} />
        <div className={styles.buttonRow}>
          <Button
            className={styles.button}
            onClick={onClickWiderspruchUebernehmen}
            variant="outlined"
            title="Diese Version wiederherstellen"
            startIcon={<FaUndoAlt />}
            color="inherit"
          >
            {diffConflict ? 'grüne Werte wiederherstellen' : 'wiederherstellen'}
          </Button>
          <Button
            className={styles.button}
            onClick={onClickToggleDiff}
            variant="outlined"
            title={
              diffConflict ?
                'Versionen nicht vergleichen'
              : 'Versionen vergleichen'
            }
            startIcon={diffConflict ? <DoubleArrowCrossed /> : <FaArrowsAltH />}
            color="inherit"
          >
            {diffConflict ? 'nicht vergleichen' : 'vergleichen'}
          </Button>
        </div>
      </div>
    )
  },
)
