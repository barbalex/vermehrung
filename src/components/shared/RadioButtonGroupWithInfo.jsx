import React from 'react'
import styled from '@emotion/styled'
import { observer } from 'mobx-react-lite'

import { RadioButtonGroup } from './RadioButtonGroup.jsx'
import { InfoWithPopover } from './InfoWithPopover.jsx'

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  break-inside: avoid;
`

const RadioButtonGroupWithInfo = ({
  label,
  name,
  value = '',
  error,
  dataSource,
  saveToDb,
  popover,
}) => (
  <Container>
    <RadioButtonGroup
      value={value}
      name={name}
      dataSource={dataSource}
      saveToDb={saveToDb}
      label={label}
      error={error}
    />
    <InfoWithPopover>{popover}</InfoWithPopover>
  </Container>
)

export default observer(RadioButtonGroupWithInfo)
