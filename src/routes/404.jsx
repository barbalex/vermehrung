import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router'

import { ErrorBoundary } from '../components/shared/ErrorBoundary.jsx'
import image from '../images/puls_vulg_2500.webp'
import placeholderSrc from '../images/puls_vulg_500.webp' // TODO: build small placeholder
import { ProgressiveImg } from '../components/shared/ProgressiveImg.tsx'

import {
  outerContainer,
  scrollContainer,
  textContainer,
  pageTitle,
  text,
  button,
} from './404.module.css'

export const FourOhFour = () => {
  const navigate = useNavigate()
  const onClickBack = () => navigate('/')

  return (
    <>
      <ErrorBoundary>
        <div className={styles.outerContainer}>
          <ProgressiveImg
            src={image}
            placeholderSrc={placeholderSrc}
          />
          <div className={styles.scrollContainer}>
            <div className={styles.textContainer}>
              <Typography
                align="center"
                variant="h6"
                className={styles.pageTitle}
              >
                Oh je
              </Typography>
            </div>
            <div className={styles.textContainer}>
              <Typography
                align="center"
                variant="h6"
                className={styles.text}
              >
                Diese Seite ist nicht verfügbar
              </Typography>
            </div>
            <div className={styles.textContainer}>
              <Button
                variant="outlined"
                onClick={onClickBack}
                color="inherit"
                className={styles.button}
              >
                Zurück zur Startseite
              </Button>
            </div>
          </div>
        </div>
      </ErrorBoundary>
    </>
  )
}
