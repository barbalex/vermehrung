import { useContext } from 'react'
import Button from '@mui/material/Button'
import { observer } from 'mobx-react-lite'
import {
  FaTimes,
  FaExchangeAlt,
  FaRegTrashAlt,
  FaArrowsAltH,
} from 'react-icons/fa'

import DoubleArrowCrossed from '../../../svg/double_arrow_crossed.svg?react'
import { Explainer } from './Explainer.jsx'
import { Data } from './Data.jsx'
import { MobxStoreContext } from '../../../mobxStoreContext.js'

import {
  container,
  title,
  revClass,
  button,
  buttonRow,
} from './index.module.css'

export const Conflict = observer(
  ({
    name,
    rev,
    dataArray,
    loading,
    error,
    onClickAktuellUebernehmen,
    onClickWiderspruchUebernehmen,
    onClickSchliessen,
  }) => {
    const store = useContext(MobxStoreContext)
    const { diffConflict, setDiffConflict } = store

    const onClickToggleDiff = () => setDiffConflict(!diffConflict)

    if (error) {
      console.log('shared/Conflict/index.jsx error:', error)
      return <div className={container}>{error.message}</div>
    }

    return (
      <div className={container}>
        <h4 className={title}>
          Widersprüchliche Version<span className={revClass}>{rev}</span>
        </h4>
        <Explainer name={name} />
        <Data
          dataArray={dataArray}
          loading={loading}
        />
        <div className={buttonRow}>
          <Button
            className={button}
            onClick={onClickAktuellUebernehmen}
            variant="outlined"
            title="Die widersprüchliche Version wird verworfen, die aktuelle beibehalten. Der Konflikt gilt als gelöst und erscheint nicht mehr"
            startIcon={<FaRegTrashAlt />}
            color="inherit"
          >
            {diffConflict ?
              'grüne (= aktuelle) Version übernehmen'
            : 'aktuelle Version übernehmen'}
          </Button>
          <Button
            className={button}
            onClick={onClickWiderspruchUebernehmen}
            variant="outlined"
            title="Die widersprüchliche Version wird übernommen, die aktuelle verworfen. Der Konflikt gilt als gelöst und erscheint nicht mehr"
            startIcon={<FaExchangeAlt />}
            color="inherit"
          >
            {diffConflict ?
              'rote (= widersprüchliche) Version übernehmen'
            : 'widersprüchliche Version übernehmen'}
          </Button>
          <Button
            className={button}
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
          <Button
            className={button}
            onClick={onClickSchliessen}
            variant="outlined"
            title="Die Spalte mit dem Konflikt wird geschlossen. Der Konflikt bleibt erhalten"
            startIcon={<FaTimes />}
            color="inherit"
          >
            schliessen
          </Button>
        </div>
      </div>
    )
  },
)
