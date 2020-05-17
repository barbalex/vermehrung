import React, { useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'

const Konflikt = styled.div`
  color: #d84315;
  font-weight: ${(props) => (props['data-active'] ? 500 : 400)};
  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`

const Conflict = ({ conflict, activeConflict, setActiveConflict }) => {
  const onClick = useCallback(() => {
    setActiveConflict(
      !activeConflict
        ? conflict
        : activeConflict !== conflict
        ? conflict
        : null,
    )
  }, [activeConflict, conflict, setActiveConflict])

  return (
    <Konflikt
      key={conflict}
      data-active={activeConflict === conflict}
      onClick={onClick}
    >{`Konflikt mit Version ${conflict}`}</Konflikt>
  )
}

export default observer(Conflict)
