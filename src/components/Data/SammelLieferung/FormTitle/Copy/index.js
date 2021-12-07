import React, { useContext, useCallback, useState, useMemo } from 'react'
import { observer } from 'mobx-react-lite'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { FaRegCopy } from 'react-icons/fa'
import styled from 'styled-components'

import StoreContext from '../../../../../storeContext'
import exists from '../../../../../utils/exists'
import updateLieferung from './updateLieferung'
import updateAllLieferungen from './updateAllLieferungen'
import ErrorBoundary from '../../../../shared/ErrorBoundary'

const TitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding-right: 16px;
  user-select: none;
`
const Title = styled.div`
  padding: 12px 16px;
  color: rgba(0, 0, 0, 0.6);
  font-weight: 700;
  user-select: none;
`

const sammelLieferungFields = [
  'id',
  'art_id',
  'person_id',
  'von_sammlung_id',
  'von_kultur_id',
  'datum',
  'nach_kultur_id',
  'nach_ausgepflanzt',
  'von_anzahl_individuen',
  'anzahl_pflanzen',
  'anzahl_auspflanzbereit',
  'gramm_samen',
  'andere_menge',
  'geplant',
  'bemerkungen',
  '_rev',
  '_parent_rev',
  '_revisions',
  '_depth',
  '_conflicts',
  '_deleted',
]

const CopySammelLieferungMenu = ({ sammelLieferung, lieferung }) => {
  //console.log('CopySammelLieferungMenu', { sammelLieferung, lieferung })
  const store = useContext(StoreContext)
  const { addNotification } = store

  const [anchorEl, setAnchorEl] = useState(null)
  const onClose = useCallback(() => setAnchorEl(null), [])
  const onClickConfig = useCallback(
    (event) => setAnchorEl(event.currentTarget),
    [],
  )
  const containsData = useMemo(
    () =>
      Object.entries(sammelLieferung)
        .filter(
          // only accept lieferung's fields
          // eslint-disable-next-line no-unused-vars
          ([key, value]) =>
            sammelLieferungFields.filter((f) => f !== 'id').includes(key),
        )
        // only update with existing values
        // eslint-disable-next-line no-unused-vars
        .filter(([key, val]) => exists(val) && val !== false).length > 0,
    [sammelLieferung],
  )
  const onClickActiveLieferung = useCallback(async () => {
    setAnchorEl(null)
    try {
      await updateLieferung({
        lieferung,
        sammelLieferung,
        store,
      })
    } catch (error) {
      return
    }
    addNotification({
      message: 'Lieferung aktualisiert',
      type: 'info',
    })
  }, [addNotification, lieferung, sammelLieferung, store])
  const onClickAllLieferung = useCallback(async () => {
    setAnchorEl(null)
    updateAllLieferungen({
      sammelLieferung,
      store,
    })
  }, [sammelLieferung, store])

  return (
    <ErrorBoundary>
      <IconButton
        aria-label="Daten kopieren"
        aria-owns={anchorEl ? 'long-menu' : null}
        aria-haspopup="true"
        title="Daten kopieren"
        onClick={onClickConfig}
        disabled={!containsData}
        size="large"
      >
        <FaRegCopy />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={onClose}
      >
        <TitleRow>
          <Title>Die Daten der Sammel-Lieferung kopieren:</Title>
        </TitleRow>
        {lieferung && (
          <MenuItem onClick={onClickActiveLieferung}>
            in die links angezeigte Lieferung
          </MenuItem>
        )}
        <MenuItem onClick={onClickAllLieferung}>in alle Lieferungen</MenuItem>
      </Menu>
    </ErrorBoundary>
  )
}

export default observer(CopySammelLieferungMenu)
