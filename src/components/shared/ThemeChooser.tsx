import { useAtom } from 'jotai'
import IconButton from '@mui/material/IconButton'
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

export const ThemeChooser = () => {
  const [themeMode, setThemeMode] = useAtom(themeModeAtom)

  const label = MODE_LABELS[themeMode as keyof typeof MODE_LABELS]
  const ModeIcon = MODE_ICONS[themeMode as keyof typeof MODE_ICONS]

  return (
    <IconButton
      title={label}
      aria-label={label}
      onClick={() => setThemeMode(NEXT_MODE[themeMode as keyof typeof NEXT_MODE])}
      color="inherit"
    >
      <ModeIcon size={24} />
    </IconButton>
  )
}
