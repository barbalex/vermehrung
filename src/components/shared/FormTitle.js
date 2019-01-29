import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  background-color: #4a148c;
  padding-bottom: 10px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  @media print {
    display: none !important;
  }
`
const TitleRow = styled.div`
  display: flex;
  justify-content: space-between;
`
const Title = styled.div`
  padding: 8px 8px 0 8px;
  color: white;
  font-weight: bold;
`

const FormTitle = ({ title }) => (
  <Container>
    <TitleRow>
      <Title>{title}</Title>
    </TitleRow>
  </Container>
)

export default FormTitle
