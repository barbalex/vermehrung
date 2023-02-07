import React, { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import styled from '@emotion/styled'
import IconButton from '@mui/material/IconButton'

import UpSvg from '../../../svg/to_up.inline.svg'
import constants from '../../../utils/constants'

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

const DocumentationFormTitle = ({ location }) => {
  const navigate = useNavigate()

  const onClickUp = useCallback(() => {
    const path = location.pathname.split('/').filter((e) => !!e)
    const newPath = `/${path.slice(0, -1).join('/')}`
    navigate(newPath)
  }, [location.pathname, navigate])

  return (
    <TitleContainer>
      <Title>Dokumentation</Title>
      <TitleSymbols>
        <IconButton title="zurück" onClick={onClickUp} size="large">
          <UpSvg />
        </IconButton>
      </TitleSymbols>
    </TitleContainer>
  )
}

export default observer(DocumentationFormTitle)
