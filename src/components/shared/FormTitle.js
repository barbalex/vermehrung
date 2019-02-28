import React from 'react'
import styled from 'styled-components'
import { MdDeleteSweep } from 'react-icons/md'

const Container = styled.div`
  background-color: rgba(74, 20, 140, 0.1);
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
  font-weight: bold;
`
const Symbols = styled.div`
  display: flex;
`

const FormTitle = ({ title, rowsLength, rowsFilteredLength }) => (
  <Container>
    <TitleRow>
      <Title>{title}</Title>
    </TitleRow>
  </Container>
)

export default FormTitle
