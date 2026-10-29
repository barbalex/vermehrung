import { useAtom } from 'jotai'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'
import { MdBrightnessAuto, MdLightMode, MdDarkMode } from 'react-icons/md'

import { themeModeAtom } from '../../store/index.ts'

// cycling order: system > light > dark > system
const NEXT_MODE = {
  system: 'light',
  light: 'dark',
  dark: 'system',
}

const MODE_ICONS = {
  system: MdBrightnessAuto,
  light: MdLightMode,
  dark: MdDarkMode,
}

const MODE_LABELS = {
  system: 'Darstellung: wie System',
  light: 'Darstellung: hell',
  dark: 'Darstellung: dunkel',
}

export const ThemeChooser = ({ asMenu }: { asMenu?: boolean }) => {
  const [themeMode, setThemeMode] = useAtom(themeModeAtom)

  const label = MODE_LABELS[themeMode as keyof typeof MODE_LABELS]
  const ModeIcon = MODE_ICONS[themeMode as keyof typeof MODE_ICONS]
  const onClick = () =>
    setThemeMode(NEXT_MODE[themeMode as keyof typeof NEXT_MODE])

  if (asMenu) {
    // intentionally does not close the surrounding menu:
    // the label shows the new mode while the theme changes behind it
    return (
      <MenuItem onClick={onClick} aria-label={label} title={label}>
        <ModeIcon size={24} style={{ marginRight: 12 }} />
        {label}
      </MenuItem>
    )
  }

  return (
    <IconButton
      title={label}
      aria-label={label}
      onClick={onClick}
      color="inherit"
    >
      <ModeIcon size={24} />
    </IconButton>
  )
}
