import { useNavigate, useLocation } from 'react-router'
import styled from '@emotion/styled'
import IconButton from '@mui/material/IconButton'

import UpSvg from '../../../svg/to_up.svg?react'
import { constants } from '../../../utils/constants.js'

const TitleContainer = styled.div`
  background-color: rgba(74, 20, 140, 0.1);
  padding: 0 10px;
  flex-shrink: 0;
  display: flex;
  @media print {
    display: none !important;
  }
  height: ${constants.titleRowHeight}px;
  justify-content: space-between;
`
const Title = styled.div`
  font-weight: bold;
  margin-top: auto;
  margin-bottom: auto;
  padding-left: 10px;
`
const TitleSymbols = styled.div`
  display: flex;
  margin-top: auto;
  margin-bottom: auto;
`

export const DocumentationFormTitle = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const onClickUp = () => {
    const path = pathname.split('/').filter((e) => !!e)
    const newPath = `/${path.slice(0, -1).join('/')}`
    navigate(newPath)
  }

  return (
    <TitleContainer>
      <Title>Dokumentation</Title>
      <TitleSymbols>
        <IconButton
          title="zurück"
          onClick={onClickUp}
          size="large"
        >
          <UpSvg />
        </IconButton>
      </TitleSymbols>
    </TitleContainer>
  )
}
