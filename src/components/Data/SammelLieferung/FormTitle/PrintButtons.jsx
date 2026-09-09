import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'
import { FaEnvelopeOpenText, FaEdit } from 'react-icons/fa'
import { MdPrint } from 'react-icons/md'

import { setIsPrint } from '../../../../store/index.js'

export const SammelLieferungPrint = ({
  printPreview,
  setPrintPreview,
  asMenu,
}) => {
  const showLieferschein = () => setPrintPreview(!printPreview)

  const printLieferschein = () => {
    setIsPrint(true)
    setTimeout(() => {
      window.print()
      setIsPrint(false)
    })
  }

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
