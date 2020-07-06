import React, { useContext, useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'
import IconButton from '@material-ui/core/IconButton'
import { IoMdInformationCircleOutline } from 'react-icons/io'
import { FaEnvelopeOpenText, FaEdit } from 'react-icons/fa'
import { MdPrint } from 'react-icons/md'

import { StoreContext } from '../../../../models/reactUtils'
import Settings from './Settings'
import Copy from './Copy'
import Add from './Add'
import Delete from './Delete'
import getConstants from '../../../../utils/constants'
import FilterNumbers from '../../../shared/FilterNumbers'
import NavButtons from './NavButtons'

const constants = getConstants()

const TitleContainer = styled.div`
  background-color: rgba(74, 20, 140, 0.1);
  flex-shrink: 0;
  display: flex;
  @media print {
    display: none !important;
  }
  height: 48px;
  justify-content: space-between;
  padding 0 10px;
`
const Title = styled.div`
  font-weight: bold;
  margin-top: auto;
  margin-bottom: auto;
`
const TitleSymbols = styled.div`
  display: flex;
  margin-top: auto;
  margin-bottom: auto;
`

const SammelLieferungFormTitle = ({
  showFilter,
  row,
  totalNr,
  filteredNr,
  lieferungId,
  printPreview,
  setPrintPreview,
}) => {
  const store = useContext(StoreContext)

  const { filter, setIsPrint, userPersonOption } = store
  const { activeNodeArray } = store.tree

  const { sl_auto_copy_edits } = userPersonOption

  const openSettingsDocs = useCallback(() => {
    const url = `${constants?.appUri}/Dokumentation/Sammel-Lieferungen`
    if (typeof window !== 'undefined') {
      if (window.matchMedia('(display-mode: standalone)').matches) {
        return window.open(url, '_blank', 'toolbar=no')
      }
      window.open(url)
    }
  }, [])
  const shownAsSammelLieferung =
    activeNodeArray.length === 2 && activeNodeArray[0] === 'Sammel-Lieferungen'

  const showLieferschein = useCallback(() => {
    setPrintPreview(!printPreview)
  }, [printPreview, setPrintPreview])
  const printLieferschein = useCallback(() => {
    setIsPrint(true)
    setTimeout(() => {
      window.print()
      setIsPrint(false)
    })
  }, [setIsPrint])

  if (!row || (!showFilter && filter.show)) return null

  return (
    <TitleContainer>
      <Title>Sammel-Lieferung</Title>
      <TitleSymbols>
        {shownAsSammelLieferung && (
          <>
            <NavButtons />
            <Add />
            <Delete row={row} />
            <IconButton
              aria-label={printPreview ? 'Formular' : 'Lieferschein'}
              title={printPreview ? 'Formular' : 'Lieferschein'}
              onClick={showLieferschein}
            >
              {printPreview ? <FaEdit /> : <FaEnvelopeOpenText />}
            </IconButton>
            {printPreview && (
              <IconButton
                aria-label="drucken"
                title="drucken"
                onClick={printLieferschein}
              >
                <MdPrint />
              </IconButton>
            )}
          </>
        )}
        {!sl_auto_copy_edits && (
          <Copy sammelLieferung={row} lieferungId={lieferungId} />
        )}
        <>
          {row.id && <Settings />}
          <IconButton
            aria-label="Anleitung öffnen"
            title="Anleitung öffnen"
            onClick={openSettingsDocs}
          >
            <IoMdInformationCircleOutline />
          </IconButton>
          {shownAsSammelLieferung && (
            <FilterNumbers filteredNr={filteredNr} totalNr={totalNr} />
          )}
        </>
      </TitleSymbols>
    </TitleContainer>
  )
}

export default observer(SammelLieferungFormTitle)
