import React, { useContext, useCallback, useState, useMemo } from 'react'
import { observer } from 'mobx-react-lite'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { FaRegCopy } from 'react-icons/fa'
import styled from 'styled-components'

import { StoreContext } from '../../../../models/reactUtils'
import { sammelLieferung as sammelLieferungFragment } from '../../../../utils/fragments'
import exists from '../../../../utils/exists'
import fieldsFromFragment from '../../../../utils/fieldsFromFragment'
import updateLieferung from './updateLieferung'
import updateAllLieferungen from './updateAllLieferungen'
import ErrorBoundary from '../../../shared/ErrorBoundary'

const TitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding-right: 16px;
  user-select: none;
`
const Title = styled.div`
  padding: 12px 16px;
  color: rgba(0, 0, 0, 0.6);
  font-weight: 800;
  user-select: none;
`

const sammelLieferungFields = fieldsFromFragment(sammelLieferungFragment)

const CopySammelLieferungMenu = ({ sammelLieferung, lieferungId }) => {
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
        lieferungId,
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
  }, [addNotification, lieferungId, sammelLieferung, store])
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
        {lieferungId && (
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
