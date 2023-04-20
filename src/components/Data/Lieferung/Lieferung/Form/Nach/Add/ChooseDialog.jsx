import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'

const ChooseDialog = ({ open, onClose, onChange, kulturType }) => (
  <Dialog open={open} onClose={onClose}>
    <DialogTitle>Garten wählen:</DialogTitle>
    <DialogContent>TODO:</DialogContent>
  </Dialog>
)

export default ChooseDialog
