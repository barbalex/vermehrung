import { useContext } from 'react'
import IconButton from '@mui/material/IconButton'
import styled from '@emotion/styled'
import { observer } from 'mobx-react-lite'

import { MobxStoreContext } from '../../../mobxStoreContext.js'

const StyledIconButton = styled(IconButton)`
  ${(props) => props['data-active'] && 'border: 1px solid #9762d9 !important;'}
`

export const HeaderNavTree = observer(() => {
  const store = useContext(MobxStoreContext)
  const {
    setShowTreeInSingleColumnView,
    showTreeInSingleColumnView,
    singleColumnView,
  } = store

  const onClickTreeMenu = () =>
    setShowTreeInSingleColumnView(!showTreeInSingleColumnView)

  if (!singleColumnView) return null

  return (
    <StyledIconButton
      color="inherit"
      aria-label="Navigations-Baum öffnen"
      onClick={onClickTreeMenu}
      title={
        showTreeInSingleColumnView ?
          'Navigations-Baum schliessen'
        : 'Navigations-Baum öffnen'
      }
      data-active={showTreeInSingleColumnView}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 512 512"
      >
        <path
          fill="none"
          stroke="#fff"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="29.322"
          d="M236.17 198h241.81"
        />
        <g fill="#fff">
          <path
            stroke="#fff"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="35.157"
            d="M131.36 432h347.63"
          />
          <g stroke-width=".374">
            <path d="m199.46 202.39-56.47 45.729c-3.903 3.16-10.215 3.16-14.076 0l-9.384-7.6c-3.903-3.16-3.903-8.27 0-11.398l40.028-32.414-40.028-32.414c-3.903-3.16-3.903-8.272 0-11.4l9.342-7.666c3.904-3.16 10.215-3.16 14.076 0l56.47 45.73c3.945 3.16 3.945 8.271.042 11.431zM308.89 326.76l-56.47 45.729c-3.903 3.16-10.215 3.16-14.076 0l-9.384-7.6c-3.903-3.16-3.903-8.27 0-11.398l40.028-32.414-40.028-32.414c-3.903-3.16-3.903-8.272 0-11.4l9.343-7.666c3.903-3.16 10.215-3.16 14.076 0l56.47 45.73c3.944 3.16 3.944 8.271.041 11.431zM91.574 439.05l-56.47 45.729c-3.903 3.16-10.215 3.16-14.076 0l-9.384-7.6c-3.903-3.16-3.903-8.27 0-11.398l40.028-32.414-40.028-32.414c-3.903-3.16-3.903-8.272 0-11.4l9.342-7.666c3.903-3.16 10.215-3.16 14.076 0l56.47 45.73c3.945 3.16 3.945 8.271.042 11.431z" />
          </g>
        </g>
        <path
          fill="none"
          stroke="#fff"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="35.176"
          d="M131.01 73.556h348.01"
        />
        <path
          fill="#fff"
          d="m89.117 77.947-56.47 45.729c-3.903 3.16-10.215 3.16-14.076 0l-9.384-7.6c-3.903-3.16-3.903-8.27 0-11.398l40.028-32.414L9.187 39.85c-3.903-3.16-3.903-8.272 0-11.4l9.342-7.666c3.904-3.16 10.215-3.16 14.076 0l56.47 45.73c3.945 3.16 3.945 8.271.042 11.431z"
        />
        <path
          fill="#fff"
          stroke="#fff"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="22.888"
          d="M334.39 319.59h147.34"
        />
      </svg>
    </StyledIconButton>
  )
})
