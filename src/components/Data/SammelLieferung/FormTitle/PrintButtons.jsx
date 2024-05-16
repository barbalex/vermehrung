import React, { useContext, useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'
import { FaEnvelopeOpenText, FaEdit } from 'react-icons/fa'
import { MdPrint } from 'react-icons/md'

import StoreContext from '../../../../storeContext.js'

const SlPrint = ({ printPreview, setPrintPreview, asMenu }) => {
  const store = useContext(StoreContext)
  const { setIsPrint } = store

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

  if (asMenu) {
    return (
      <>
        <MenuItem onClick={showLieferschein}>
          {printPreview ? 'Formular' : 'Lieferschein'}
        </MenuItem>
        {printPreview && (
          <MenuItem onClick={printLieferschein}>Lieferschein drucken</MenuItem>
        )}
      </>
    )
  }

  return (
    <>
      {printPreview && (
        <IconButton
          aria-label="Lieferschein drucken"
          title="Lieferschein drucken"
          onClick={printLieferschein}
          size="large"
        >
          <MdPrint />
        </IconButton>
      )}
      <IconButton
        aria-label={printPreview ? 'Formular' : 'Lieferschein'}
        title={printPreview ? 'Formular' : 'Lieferschein'}
        onClick={showLieferschein}
        size="large"
      >
        {printPreview ? <FaEdit /> : <FaEnvelopeOpenText />}
      </IconButton>
    </>
  )
}

export default observer(SlPrint)
