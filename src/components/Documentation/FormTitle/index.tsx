import { useNavigate, useLocation } from 'react-router'
import IconButton from '@mui/material/IconButton'

import UpSvg from '../../../svg/to_up.svg?react'
import styles from './index.module.css'

export const DocumentationFormTitle = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const onClickUp = () => {
    const path = pathname.split('/').filter((e) => !!e)
    const newPath = `/${path.slice(0, -1).join('/')}`
    navigate(newPath)
  }

  return (
    <div className={styles.container}>
      <div className={styles.title}>Dokumentation</div>
      <div className={styles.symbols}>
        <IconButton
          title="zurück"
          onClick={onClickUp}
          size="large"
        >
          <UpSvg />
        </IconButton>
      </div>
    </div>
  )
}
