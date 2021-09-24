import React, { useContext, useCallback, useState } from 'react'
import { observer } from 'mobx-react-lite'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { FaDownload } from 'react-icons/fa'
import styled from 'styled-components'
import * as ExcelJs from 'exceljs/dist/exceljs.min.js'

import StoreContext from '../../../../../storeContext'
import buildExceljsWorksheetsForDaten from './buildExceljsWorksheetsForDaten'
import buildExceljsWorksheetsForTzSums from './buildExceljsWorksheetsForTzSums'
import downloadExceljsWorkbook from '../../../../../utils/downloadExceljsWorkbook'
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

const GartenDownload = ({ gartenId }) => {
  const store = useContext(StoreContext)

  const onClickData = useCallback(async () => {
    const workbook = new ExcelJs.Workbook()
    await buildExceljsWorksheetsForDaten({
      store,
      garten_id: gartenId,
      workbook,
    })
    downloadExceljsWorkbook({
      store,
      fileName: `Garten_${gartenId}_rohdaten`,
      workbook,
    })
    setAnchorEl(null)
  }, [gartenId, store])
  const onClickTzSums = useCallback(async () => {
    const workbook = new ExcelJs.Workbook()
    await buildExceljsWorksheetsForTzSums({
      store,
      garten_id: gartenId,
      workbook,
    })
    downloadExceljsWorkbook({
      store,
      fileName: `Garten_${gartenId}_teilzaehlungen_summen`,
      workbook,
    })
    setAnchorEl(null)
  }, [gartenId, store])

  const [anchorEl, setAnchorEl] = useState(null)
  const onClose = useCallback(() => setAnchorEl(null), [])
  const onClickOpenMenu = useCallback(
    (event) => setAnchorEl(event.currentTarget),
    [],
  )

  return (
    <ErrorBoundary>
      <IconButton
        aria-label="Daten herunterladen"
        aria-owns={anchorEl ? 'long-menu' : null}
        aria-haspopup="true"
        title="Daten herunterladen"
        onClick={onClickOpenMenu}
        size="large">
        <FaDownload />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={onClose}
      >
        <TitleRow>
          <Title>herunterladen:</Title>
        </TitleRow>
        <MenuItem onClick={onClickData}>{`(Roh-)Daten`}</MenuItem>
        <MenuItem
          onClick={onClickTzSums}
        >{`Auswertung der Teil-Zählungen`}</MenuItem>
      </Menu>
    </ErrorBoundary>
  );
}

export default observer(GartenDownload)
