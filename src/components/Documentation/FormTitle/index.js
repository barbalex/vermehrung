import React, { useCallback } from 'react'
import { navigate } from 'gatsby'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'
import IconButton from '@material-ui/core/IconButton'

import UpSvg from '../../../svg/to_up.inline.svg'

const TitleContainer = styled.div`
  background-color: rgba(74, 20, 140, 0.1);
  margin: -25px -25px 20px -25px;
  padding: 0 10px;
  flex-shrink: 0;
  display: flex;
  @media print {
    display: none !important;
  }
  height: 48px;
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
  const onClickUp = useCallback(() => {
    const path = location.pathname.split('/').filter((e) => !!e)
    const newPath = `/${path.slice(0, -1).join('/')}`
    navigate(newPath)
  }, [location.pathname])

  return (
    <TitleContainer>
      <Title>Dokumentation</Title>
      <TitleSymbols>
        <IconButton title="zurück" onClick={onClickUp}>
          <UpSvg />
        </IconButton>
      </TitleSymbols>
    </TitleContainer>
  )
}

export default observer(DocumentationFormTitle)
