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
        <div className={outerContainer}>
          <ProgressiveImg
            src={image}
            placeholderSrc={placeholderSrc}
          />
          <div className={scrollContainer}>
            <div className={textContainer}>
              <Typography
                align="center"
                variant="h6"
                className={pageTitle}
              >
                Oh je
              </Typography>
            </div>
            <div className={textContainer}>
              <Typography
                align="center"
                variant="h6"
                className={text}
              >
                Diese Seite ist nicht verfügbar
              </Typography>
            </div>
            <div className={textContainer}>
              <Button
                variant="outlined"
                onClick={onClickBack}
                color="inherit"
                className={button}
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
