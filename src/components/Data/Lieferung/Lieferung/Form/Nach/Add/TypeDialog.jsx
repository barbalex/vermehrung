import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'

const TypeDialog = ({ open, onClose, onChange }) => (
  <Dialog open={open} onClose={onClose}>
    <DialogTitle>Typ der Kultur wählen:</DialogTitle>
    <DialogContent>
      <FormControl>
        <RadioGroup name="type_waehlen" onChange={onChange}>
          <FormControlLabel
            value="zwischenlager"
            control={<Radio />}
            label="Zwischenlager"
          />
          <FormControlLabel
            value="anders"
            control={<Radio />}
            label="Andere Kultur"
          />
        </RadioGroup>
      </FormControl>
    </DialogContent>
  </Dialog>
)

export default TypeDialog
