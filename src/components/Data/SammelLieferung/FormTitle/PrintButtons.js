import React, { useContext, useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import IconButton from '@material-ui/core/IconButton'
import MenuItem from '@material-ui/core/MenuItem'
import { FaEnvelopeOpenText, FaEdit } from 'react-icons/fa'
import { MdPrint } from 'react-icons/md'

import { StoreContext } from '../../../../models/reactUtils'

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
      <IconButton
        aria-label={printPreview ? 'Formular' : 'Lieferschein'}
        title={printPreview ? 'Formular' : 'Lieferschein'}
        onClick={showLieferschein}
      >
        {printPreview ? <FaEdit /> : <FaEnvelopeOpenText />}
      </IconButton>
      {printPreview && (
        <IconButton
          aria-label="Lieferschein drucken"
          title="Lieferschein drucken"
          onClick={printLieferschein}
        >
          <MdPrint />
        </IconButton>
      )}
    </>
  )
}

export default observer(SlPrint)
