import { useContext } from 'react'
import { FaTimes } from 'react-icons/fa'
import IconButton from '@mui/material/IconButton'
import { IoMdInformationCircleOutline } from 'react-icons/io'
import { observer } from 'mobx-react-lite'
import { useNavigate } from 'react-router'

import { ErrorBoundary } from '../shared/ErrorBoundary.jsx'
import { MobxStoreContext } from '../../mobxStoreContext.js'
import { QueuedQuery } from './QueuedQuery.jsx'
import { constants } from '../../utils/constants.js'

import {
  titleRow,
  title,
  noOpsContainer,
  container,
  outerContainer,
  queriesContainer,
  heading,
  revertHeading,
  closeIcon,
} from './index.module.css'

export const QueuedQueries = observer(() => {
  const store = useContext(MobxStoreContext)
  const navigate = useNavigate()
  const { queuedQueries } = store

  // ISSUE: cant use navigate(-1) as that can navigate to same url and user has to click twice to go back
  const onClickCloseIcon = () => navigate('/Vermehrung')

  const openDocs = () => {
    const url = `${constants?.getAppUri()}/Dokumentation/offline`
    if (window.matchMedia('(display-mode: standalone)').matches) {
      return window.open(url, '_blank', 'toolbar=no')
    }
    window.open(url)
  }

  if (!queuedQueries.size) {
    return (
      <div className={container}>
        <div className={titleRow}>
          <h3 className={title}>Ausstehende Operationen</h3>
          <div>
            <IconButton
              aria-label={`Dokumentation zu "offline arbeiten" lesen`}
              title={`Dokumentation zu "offline arbeiten" lesen`}
              onClick={openDocs}
              size="large"
            >
              <IoMdInformationCircleOutline />
            </IconButton>
            <IconButton
              title="schliessen"
              aria-label="schliessen"
              onClick={onClickCloseIcon}
              className={closeIcon}
            >
              <FaTimes />
            </IconButton>
          </div>
        </div>
        <div className={noOpsContainer}>
          Es gibt momentan keine pendenten Operationen
        </div>
      </div>
    )
  }

  return (
    <ErrorBoundary>
      <div className={container}>
        <div className={titleRow}>
          <h3 className={title}>Ausstehende Operationen</h3>
          <div>
            <IconButton
              aria-label="Anleitung öffnen"
              title="Anleitung öffnen"
              onClick={openDocs}
              size="large"
            >
              <IoMdInformationCircleOutline />
            </IconButton>
            <IconButton
              title="schliessen"
              aria-label="schliessen"
              onClick={onClickCloseIcon}
              className={closeIcon}
            >
              <FaTimes />
            </IconButton>
          </div>
        </div>
        <div className={outerContainer}>
          <div className={queriesContainer}>
            <div className={heading}>Zeit</div>
            <div className={heading}>Tabelle</div>
            <div className={heading}>ID</div>
            <div className={heading}>Feld / Operation</div>
            <div className={heading}>vorher</div>
            <div className={heading}>nachher</div>
            <div className={revertHeading}>widerrufen</div>
            {[...queuedQueries.values()].reverse().map((qq, i) => (
              <QueuedQuery
                key={qq.id}
                qq={qq}
                index={i}
              />
            ))}
          </div>
        </div>
      </div>
    </ErrorBoundary>
  )
})
