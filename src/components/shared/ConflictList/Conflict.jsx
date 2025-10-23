import styled from '@emotion/styled'

const Konflikt = styled.div`
  color: #d84315;
  font-weight: ${(props) => (props['data-active'] ? 500 : 400)};
  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`

export const Conflict = ({ conflict, activeConflict, setActiveConflict }) => {
  const onClick = () =>
    setActiveConflict(
      !activeConflict ? conflict
      : activeConflict !== conflict ? conflict
      : null,
    )

  const title =
    activeConflict ?
      'Klicken um den Konflikt zu schliessen'
    : 'Klicken um den Konflikt zu lösen'

  return (
    <Konflikt
      key={conflict}
      data-active={activeConflict === conflict}
      onClick={onClick}
      title={title}
    >{`Konflikt mit Version ${conflict}`}</Konflikt>
  )
}
